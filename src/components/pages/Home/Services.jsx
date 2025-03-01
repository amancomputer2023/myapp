import React, { useEffect, useState } from "react";
import {
  Plane,
  Hotel,
  Compass,
  Users,
  Monitor,
  Headphones,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP = {
  Plane: Plane,
  Hotel: Hotel,
  Compass: Compass,
  Users: Users,
  Monitor: Monitor,
  Headphones: Headphones,
  Code:Code,
};

async function getServices() {
  try {
    const response = await fetch("https://backend-1-cek6.onrender.com/api/services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": "Gajraj@0905",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "can't find service");
      return null;
    }
    return data;
  } catch (error) {
    alert("Error:", error);
    return null;
  }
}

export default function HomeServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      const data = await getServices();
      setServices(data);
    }
    fetchServices();
  }, []);

  return (
    <section className="home-services">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="service-grid"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {services?.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Monitor;
            return (
              <motion.div
                key={index}
                className="service-card"
                variants={{
                  initial: { opacity: 1, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <IconComponent className="service-icon" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
