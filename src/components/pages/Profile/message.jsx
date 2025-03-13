import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function Message() {
  const [messageItems, setmessageItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchmessage = async () => {
      try {
        const response = await fetch(
          "https://backend-1-cek6.onrender.com/api/message",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "api-key": "Gajraj@0905",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch message");
        }
        const data = await response.json();
        setmessageItems(data);
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchmessage();
  }, []);

  if (loading) {
    return <p className="text-center">Loading message...</p>;
  }

  return (
    <div className="space-y-4">
      {messageItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No message submitted yet.
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
              Recent {messageItems.length} messages
            </p>
            {messageItems.map((item, index) => (
              <Card key={index} className="text-left mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p>{item.contact}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{item.message}</p>
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
