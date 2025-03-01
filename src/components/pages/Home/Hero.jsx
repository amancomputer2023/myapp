import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomeHero() {
  return (
      <section className="home-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Empowering Your Tech – One Click at a Time!</h1>
            <p>
            Upgrade, repair, and optimize with Aman Computer Sells & Services! From the latest computers to expert repairs, we ensure speed, reliability, and top-notch service—because your tech deserves the best.
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Explore Products
              </Link>
              <Link to="/contact" className="btn btn-secondary">
              🛠️ Get a Free Diagnosis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
  )
}
