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
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-container">
          <h1>About Us</h1>
          <p>Our Vision: Powering the Future of Technology</p>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Link to="#about-container">
              <ChevronDown size={32} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Sections */}
      <section className="about-container" id="about-container">
        {/* Our Story */}
        <motion.div
          className="about-content-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Story</h2>
          <p>
            Aman Computer Sells & Services started with a simple goal—providing
            reliable tech solutions. Over the years, we’ve grown into a trusted
            name for computers, accessories, and CCTV sales & installation.
            With a focus on quality service and customer satisfaction, we help
            individuals and businesses stay secure and connected in the digital
            world.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          className="about-content-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Mission</h2>
          <p>We are more than just a tech store. We are your trusted partner in innovation.</p>
          <div className="about-values-grid">
            {[
              {
                title: "Top-Quality Computers & Accessories",
                icon: Package,
                description: "Handpicked for performance and reliability.",
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

        {/* Why Choose Us */}
        <motion.div
          className="about-values-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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

        {/* Our Team */}
        <motion.div
          className="about-team-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Team</h2>
          <p>Tech Experts Dedicated to Powering Your Digital World.</p>
          <div className="about-team-grid">
            {[
              {
                name: "Aman Kumar Jhariya",
                role: "Founder & CEO",
                image: "https://backend-1-cek6.onrender.com/images/About.jpg",
                disc: "Leading with a vision to simplify and enhance technology for everyone.",
              },
              {
                name: "Michael Chen",
                role: "Head of IT & Services",
                image: "https://backend-1-cek6.onrender.com/images/About.jpg",
                disc: "Ensuring seamless computer repairs, upgrades, and custom tech solutions.",
              },
              {
                name: "Sophia Patel",
                role: "Customer Support Specialist",
                image: "https://backend-1-cek6.onrender.com/images/About.jpg",
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
                  <img src={member.image} alt={`${member.name} - ${member.role}`} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.disc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="about-cta-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Elevate Your Tech Experience?</h2>
          <p>
            At Aman Computer Sells & Services, we don’t just sell computers—we
            provide cutting-edge solutions to keep you connected, productive,
            and ahead of the curve. Whether you need the latest tech gadgets,
            expert repairs, or custom IT solutions, we’re here to ensure your
            technology works seamlessly.
          </p>
          <Link to="/contact" className="about-cta-button">
            Join us in shaping the future—one device at a time!
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
