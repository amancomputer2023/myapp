import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function HomeFeaturedInformations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const slideInterval = 5000; // Auto-slide every 5s

  const fetchDestinations = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, status } = await axios.get(
        "https://backend-1-cek6.onrender.com/api/featured/?api-key=Gajraj@0905"
      );

      if (status === 200 && Array.isArray(data) && data.length > 0) {
        setDestinations(data);
      } else {
        setError("No featured information found.");
      }
    } catch (err) {
      setError("Failed to load data. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (autoSlide && destinations.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
      }, slideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, destinations]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    setAutoSlide(false);
  }, [destinations]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
    setAutoSlide(false);
  }, [destinations]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  if (loading) {
    return (
      <section className="home-featured-destinations">
        <div className="container">
          <motion.div
            className="loading-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="home-featured-destinations">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Information
          </motion.h2>
          <div className="error-message">{error}</div>
          <button onClick={fetchDestinations} className="retry-button">
            Retry
          </button>
        </div>
      </section>
    );
  }

  const visibleDestinations = [
    destinations[(currentIndex - 1 + destinations.length) % destinations.length],
    destinations[currentIndex],
    destinations[(currentIndex + 1) % destinations.length],
  ];

  return (
    <section
      className="home-featured-destinations"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Information
        </motion.h2>
        <div className="destination-carousel">
          <button className="carousel-arrow left" onClick={handlePrev}>
            <ChevronLeft />
          </button>
          <motion.div
            className="destination-grid"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visibleDestinations.map(({ name, highlights, image }, index) => (
              <motion.div
                key={name}
                className="destination-card"
                initial={{ opacity: 0, x: index === 1 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {image ? (
                  <img src={image} alt={name} loading="lazy" />
                ) : (
                  <div className="image-placeholder">No Image</div>
                )}
                <h3>{name}</h3>
                <p>{highlights}</p>
              </motion.div>
            ))}
          </motion.div>
          <button className="carousel-arrow right" onClick={handleNext}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
