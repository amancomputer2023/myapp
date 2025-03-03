import React from "react";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Check, Camera } from 'lucide-react';

export default function ProfileContent({ user, handleChange, handleSubmit }) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your public profile information</p>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>This is how others will recognize you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profilePictureUrl} alt={user.firstName + user.lastName} />
                  <AvatarFallback>{user.firstName[0] + " " + user.lastName[0]}</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Upload a new photo</h4>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Upload
                  </Button>
                  <Button size="sm" variant="outline">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={user.firstName + user.lastName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={user.username} onChange={handleChange} />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={user.email} onChange={handleChange} />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={user.bio} onChange={handleChange} rows={4} className="resize-none" />
                <p className="text-xs text-muted-foreground">
                  Write a brief description about yourself. This will be visible on your public profile.
                </p>
              </div>
  
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={user.location} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" value={user.website} onChange={handleChange} />
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
    )
  }