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

async function insert(formData, image) {
  try {
    if (!image) return alert("Please select an image");
    var dataimage = new FormData();
    dataimage.append("image", image);
    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        headers: {
          "api-key":"Gajraj@0905"
        },
        body: dataimage,
      });

      const dataFile = await response.json();
      console.log(dataFile);
      
      alert(`Image uploaded: ${dataFile.filename}`);
      formData.image = `http://localhost:3001/images/${dataFile.filename}`;
    } catch (error) {
      console.error("Upload error:", error);
    }
    const response = await fetch("http://localhost:3001/api/product", {
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

export default function Product() {
  const [formData, setFormData] = useState({
    name: "",
    highlights: "",
    featured: false,
    image:"",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      formData.highlights = formData.highlights.split(",").map(value => value.trim());
      formData.featured = formData.featured == "true"? true : false;
      let data = await insert(formData, image);
      if (data) {
        alert("Insert successfully.");
        setFormData({ name: "", highlights: "", featured: false, image: ""});
        setImage(null);
        setPreview(null);
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
          <CardTitle>Product</CardTitle>
          <CardDescription>Insert a new product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights</Label>
              <Input
                id="highlights"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="Enter values separated by commas"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured">Featured</Label>
              <select
                id="featured"
                name="featured"
                value={formData.featured}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="false">false</option>
                <option value="true">true</option>                
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {preview && <img src={preview} alt="Preview" width="100" />}
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
