import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { CirclePlus } from "lucide-react";

async function insert(formData) {
  try {
    const response = await fetch("http://localhost:3001/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "Gajraj@0905",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default function Services() {
  const [formData, setFormData] = useState({
    icon: "",
    description: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data = await insert(formData);
      if (data) {
        alert("Insert successfully.");
        setFormData({ icon: "",  description: "",title: "" });
      }
    } catch (err) {
      alert(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>Insert a new services</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full btn-primary rounded-full"
              disabled={loading}
            >
              <CirclePlus className="h-4 w-4" />{" "}
              {loading ? "Inserting..." : "Insert"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center"></CardFooter>
      </Card>
    </div>
  );
}
