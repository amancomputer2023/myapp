import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function HomeFeaturedInformations() {
  const [productss, setproductss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchproductss = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, status } = await axios.get(
        `https://backend-1-cek6.onrender.com/api/featured/?api-key=Gajraj@0905`
      );

      if (status === 200 && Array.isArray(data) && data.length > 0) {
        setproductss(data);
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
    fetchproductss();
  }, []);

  const handleNext = useCallback(() => {
    if (productss.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % productss.length);
    }
  }, [productss.length]);

  const handlePrev = useCallback(() => {
    if (productss.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + productss.length) % productss.length
      );
    }
  }, [productss.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (loading) {
    return (
      <section className="home-featured-productss">
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
      <section className="home-featured-productss">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Information
          </motion.h2>
          <div className="error-message">{error}</div>
          <button onClick={fetchproductss} className="retry-button">
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (productss.length === 0) {
    return (
      <section className="home-featured-productss">
        <div className="container">
          <h2>No featured productss available.</h2>
        </div>
      </section>
    );
  }

  const visibleproductss = [
    productss[
      (currentIndex - 1 + productss.length) % productss.length
    ],
    productss[currentIndex],
    productss[(currentIndex + 1) % productss.length],
  ];

  return (
    <section className="home-featured-productss">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Information
        </motion.h2>
        <div className="products-carousel">
          <button className="carousel-arrow left" onClick={handlePrev}>
            <ChevronLeft />
          </button>
          <motion.div
            className="products-grid"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visibleproductss.map((products, index) => {
              if (!products) return null;
              return (
                <motion.div
                  key={products.name}
                  className="products-card"
                  initial={{ opacity: 0, x: index === 1 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {products.image ? (
                    <img
                      src={products.image[0]}
                      alt={products.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                  <h3>{products.name}</h3>
                  {Object.entries(products.highlights)?.map(
                    ([key, value], index) => {
                      return <p className="m-0 p-0">{value}</p>;
                    }
                  )}
                </motion.div>
              );
            })}
          </motion.div>
          <button className="carousel-arrow right" onClick={handleNext}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
