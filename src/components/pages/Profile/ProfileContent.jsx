import React, { useState } from "react";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Check, Camera } from "lucide-react";

export default function ProfileContent({ user }) {
  const [userInformation, setUserInformation] = useState(user);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(userInformation.profilePictureUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreview(userInformation.profilePictureUrl); // Reset to default profile picture
    setImage(null); // Reset image file input
    const updatedUser = {
      ...userInformation,
      profilePictureUrl: "",
    };
    const result = updateUser(updatedUser);
    setIsRemoving(false);
    if (!result) {
      setError("Failed to remove image. Please try again.");
    }
  };

  const handleUploadImage = async () => {
    setIsUploading(true);
    setError(null);
    const result = await UploadImage(image, userInformation);
    setIsUploading(false);
    if (!result) {
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    updateUser(userInformation);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your public profile information
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            This is how others will recognize you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={preview}
                  alt={userInformation.firstName + userInformation.lastName}
                />
                <AvatarFallback>
                  {userInformation.firstName[0] +
                    " " +
                    userInformation.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => document.getElementById("image").click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                style={{ display: "none" }} // Hide the input file
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Upload a new photo</h4>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. 1MB max.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUploadImage}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRemoveImage}
                  disabled={isRemoving}
                >
                  {isRemoving ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-left">
            <p className="inline text-xl">Email : {userInformation.email}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 text-left">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={userInformation.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={userInformation.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={userInformation.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={userInformation.bio}
                onChange={handleChange}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Write a brief description about yourself. This will be visible
                on your public profile.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={userInformation.location}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={userInformation.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" className="gap-2">
                <Check className="h-4 w-4" /> Save Changes
              </Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

async function updateUser(updatedUser) {
  try {
    const response = await fetch(
      "https://backend-1-cek6.onrender.com/api/updateUser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": "Gajraj@0905",
        },
        body: JSON.stringify(updatedUser),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      window.location.reload();
      return null;
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.reload();
    alert("Update successfully.");
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function UploadImage(image, user) {
  try {
    if (!image) return alert("Please select an image");
    var dataimage = new FormData();
    dataimage.append("image", image);
    const response = await fetch(
      "https://backend-1-cek6.onrender.com/api/upload",
      {
        method: "POST",
        headers: {
          "api-key": "Gajraj@0905",
        },
        body: dataimage,
      }
    );
    const dataFile = await response.json();
    const updatedUser = {
      ...user,
      profilePictureUrl: `https://backend-1-cek6.onrender.com/images/${dataFile.filename}`,
    };
    const data = updateUser(updatedUser);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
