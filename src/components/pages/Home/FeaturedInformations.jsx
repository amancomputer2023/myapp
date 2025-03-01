import React from 'react'
import { motion } from "framer-motion";
import {ChevronLeft, ChevronRight} from 'lucide-react';


export default function HomeFeaturedInformations(props) {
  return (
    <section className="home-featured-destinations">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Information
          </motion.h2>
          <div className="destination-carousel">
            <button className="carousel-arrow left" onClick={props.handlePrev}>
              <ChevronLeft />
            </button>
            <motion.div
              className="destination-grid"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                animate: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {props.visibleDestinations.map(({ name, highlights, image }) => (
                <motion.div
                  key={name}
                  className="destination-card"
                >
                  <img src={image} alt={name} />
                  <h3>{name}</h3>
                  <p>{highlights}</p>
                </motion.div>
              ))}
            </motion.div>
            <button className="carousel-arrow right" onClick={props.handleNext}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
  )
}
