import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";
import axios from "axios";
import HomeHero from "./Home/Hero";
import HomeFeaturedInformations from "./Home/FeaturedInformations";
import HomeServices from "./Home/Services";
import HomeCta from "./Home/cta";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [featureddestinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "https://backend-1-cek6.onrender.com/api/featured/?api-key=Gajraj@0905"
        );
        setDestinations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!featureddestinations.length) {
    return (
      <main className="home-page">
        <HomeHero />

        <section className="home-featured-destinations">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured Infromations
            </motion.h2>
            <div>
              No Informations found. Please try again later.
            </div>
          </div>
        </section>
        <HomeServices />
        <HomeCta 
        setIsHovered={setIsHovered}
        isHovered={isHovered}
        />
      </main>
    );
  }

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % featureddestinations.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + featureddestinations.length) %
        featureddestinations.length
    );
  };

  const visibleDestinations = [
    featureddestinations[
      (currentIndex - 1 + featureddestinations.length) %
        featureddestinations.length
    ],
    featureddestinations[currentIndex],
    featureddestinations[(currentIndex + 1) % featureddestinations.length],
    featureddestinations[(currentIndex + 2) % featureddestinations.length],
  ];

  return (
    <main className="home-page">
      <HomeHero />
      <HomeFeaturedInformations
        handleNext={handleNext}
        handlePrev={handlePrev}
        visibleDestinations={visibleDestinations}
      />
      <HomeServices />
      <HomeCta 
        setIsHovered={setIsHovered}
        isHovered={isHovered}
      />
    </main>
  );
};

export default Home;
