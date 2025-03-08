import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";

export default function FeedBack() {
  return (
    <main className="container mx-auto py-10 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        FeedBack System
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
          <FeedbackForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Feedback</h2>
          <FeedbackList />
        </div>
      </div>
    </main>
  );
}

function getBadgeVariant(type) {
  switch (type) {
    case "positive":
      return "success";
    case "negative":
      return "destructive";
    default:
      return "secondary";
  }
}

function formatFeedbackType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          "https://backend-1-cek6.onrender.com/api/feedback",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "api-key": "Gajraj@0905",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbackItems(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return <p className="text-center">Loading feedback...</p>;
  }

  return (
    <div className="space-y-4">
      {feedbackItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No feedback submitted yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        feedbackItems.map((item, index) => (
          <Card key={index} className="text-left">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </div>
                <Badge variant={getBadgeVariant(item.feedbackType)}>
                  {formatFeedbackType(item.feedbackType)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p>{item.feedback}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    feedbackType: "",
    feedback: "",
  });
  const [successfeedback, setSuccessfeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-1-cek6.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "Gajraj@0905",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send feedback");
      }
      setSuccessfeedback(
        "feedback Sent! We'll get back to you as soon as possible."
      );
      setFormData({ name: "", contact: "", feedbackType: "", feedback: "" });

      setTimeout(() => setSuccessfeedback(""), 5000);
    } catch (error) {
      console.error("Error:", error);
      setSuccessfeedback("Failed to send feedback. Please try again.");
    }
  };

  return (
    <motion.div
      className="contact-form-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>Send us a feedback</h2>
      <form onSubmit={handleSubmit} className="contact-form text-left">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="contact"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
              color: "#4a5568",
            }}
          >
            Feedback Type
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="feedbackType"
                value="Suggestion"
                checked={formData.feedbackType === "Suggestion"}
                onChange={handleChange}
              />
              Suggestion
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="feedbackType"
                value="Bug"
                checked={formData.feedbackType === "Bug"}
                onChange={handleChange}
              />
              Bug Report
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="feedbackType"
                value="Feature"
                checked={formData.feedbackType === "Feature"}
                onChange={handleChange}
              />
              Feature Request
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="feedbackType"
                value="Service & Product"
                checked={formData.feedbackType === "Service & Product"}
                onChange={handleChange}
              />
              Service & Product
            </label>
          </div>
          <div className="text-left">
            <label>
              <input
                type="radio"
                name="feedbackType"
                value="Other"
                checked={formData.feedbackType === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            rows={4}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send feedback
        </button>
      </form>
      {successfeedback && (
        <motion.div
          className="success-feedback"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {successfeedback}
        </motion.div>
      )}
    </motion.div>
  );
}
