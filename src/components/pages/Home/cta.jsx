import React, {useState} from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HomeCta() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className="home-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <h2>Ready to Upgrade Your Tech Experience?</h2>
            <p>
            Let us help you find the perfect tech solution. Whether you need a high-performance PC, expert repairs, or custom IT services, our specialists are here to assist you.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              🛠 Get Started Today!
              <ArrowRight
                className={`cta-icon ${isHovered ? "icon-hovered" : ""}`}
              />
            </Link>
          </motion.div>
        </div>
      </section>
  )
}
