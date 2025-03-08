import React from "react";
import "../styles/Home.css";
import HomeHero from "./Home/Hero";
import HomeFeaturedInformations from "./Home/FeaturedInformations";
import HomeServices from "./Home/Services";
import HomeCta from "./Home/cta";
import FeedBack from "./Home/FeedBack";

const Home = () => {

  return (
    <main className="home-page">
      <HomeHero />
      <HomeFeaturedInformations />
      <HomeServices />
      <FeedBack/>
      <HomeCta />
      
    </main>
  );
};

export default Home;
