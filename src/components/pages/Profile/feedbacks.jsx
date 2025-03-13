import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function Feedbacks() {
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
        <>
          <motion.div
            className="contact-form-container text-left "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl text-bold text-black text-left">
              Recent {feedbackItems.length} feedbacks
            </p>
            {feedbackItems.map((item, index) => (
              <Card key={index} className="text-left mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p>{item.contact}</p>
                    </div>
                    <Badge className="bg-blue-50">{item.feedbackType}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{item.feedback}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(item.createdAt).toLocaleString("en-gb")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
