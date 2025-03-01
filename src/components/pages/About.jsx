import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Smile,
  Rocket,
  ChevronDown,
  Wrench,
  Package,
  Settings,
} from "lucide-react";
import "../styles/About.css";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="about-page">
      <motion.section className="about-hero" {...fadeIn}>
        <div className="about-container">
          <h1>About Us</h1>
          <p>Our Vision: Powering the Future of Technology</p>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </motion.section>

      <section className="about-container">
        <motion.div className="about-content-block" {...fadeIn}>
          <h2>Our Story</h2>
          <p>
            Founded in 2010, Travel Friend has been helping adventurers discover
            the wonders of our world for over a decade. What started as a small
            local travel agency has grown into a global network of passionate
            travel experts, serving wanderlust-filled souls from all walks of
            life.
          </p>
          <p>
            Our journey has been built on a foundation of curiosity, respect for
            diverse cultures, and a deep love for the planet we call home. As
            we've grown, we've never lost sight of our mission: to create
            unforgettable experiences that broaden horizons and bring people
            together.
          </p>
        </motion.div>

        <motion.div className="about-content-block" {...fadeIn}>
          <h2>Our Mission</h2>
          <p>
            We are more than just a tech store. We are your trusted partner in
            innovation. With a passion for cutting-edge technology,
          </p>
          <div className="about-values-grid">
          {[
            {
              title: "Top-Quality Computers & Accessories",
              icon: Package,
              description: "Handpicked for performance and reliability",
            },
            {
              title: "Expert Repairs & Maintenance",
              icon: Wrench,
              description: "Fast, efficient, and handled by professionals.",
            },
            {
              title: "Custom Solutions",
              icon: Settings,
              description: "Tailored to your personal and business needs.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="about-value-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <value.icon className="about-value-icon" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
          </div>
        </motion.div>

        <motion.div className="about-values-block" {...fadeIn}>
          <h2>Why Choose Us?</h2>
          <div className="about-values-grid">
            {[
              {
                title: "Tech Expertise",
                icon: Cpu,
                description: "Years of experience in sales and service.",
              },
              {
                title: "Customer-Centric Approach",
                icon: Smile,
                description: "Your satisfaction is our priority.",
              },
              {
                title: "Future-Ready Solutions",
                icon: Rocket,
                description: "Stay ahead with the latest innovations.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="about-value-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <value.icon className="about-value-icon" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="about-team-block" >
          <h2>Our Team</h2>
          <p>
          Tech Experts Dedicated to Powering Your Digital World.
          </p>
          <p>Behind every successful tech solution is a team of passionate professionals. At [New Business Name], we combine expertise, innovation, and customer-focused service to ensure your devices perform at their best. From cutting-edge sales to expert repairs, our team is committed to providing top-notch technology solutions.</p>
          <div className="about-team-grid">
            {[
              {
                name: "Aman Kumar Jhariya",
                role: "Founder & CEO",
                image: "https://backend-1-cek6.onrender.com/images/About",
                disc: "Leading with a vision to simplify and enhance technology for everyone.",
              },
              {
                name: "Michael Chen",
                role: "Head of IT & Services",
                image: "https://backend-1-cek6.onrender.com/images/About",
                disc: " Ensuring seamless computer repairs, upgrades, and custom tech solutions.",
              },
              {
                name: "Null",
                role: "Customer Experience Manager",
                image: "https://backend-1-cek6.onrender.com/images/About",
                disc: "Providing dedicated support to keep your tech running smoothly.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="about-team-member"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="team-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.disc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="about-cta-block" {...fadeIn}>
          <h2>Ready to Elevate Your Tech Experience?</h2>
          <p>
          At Aman Computer Sells & Services, we don’t just sell computers—we provide cutting-edge solutions to keep you connected, productive, and ahead of the curve. Whether you need the latest tech gadgets, expert repairs, or custom IT solutions, we’re here to ensure your technology works seamlessly.
          </p>
          <a href="/contact" className="about-cta-button">
          Join us in shaping the future—one device at a time!
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
