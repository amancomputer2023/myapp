import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AlertCircle, LogOut } from "lucide-react";
import { Badge } from "../ui/badge.jsx";
import Admin from './Profile/Admin';
import Users from './Profile/Users';

export default function ProfileForm(props) {
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!props.user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load user profile</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-5">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={"https://backend-1-cek6.onrender.com/images/gajju"}
                alt={props.user.username}
              />
              <AvatarFallback>
                {props.user.firstName[0] + " " + props.user.lastName[0] ||
                  props.user.username[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle>
                {props.user.firstName
                  ? props.user.firstName + " " + props.user.lastName
                  : props.user.username}
              </CardTitle>
              <CardDescription>{props.user.email}</CardDescription>
              <div className="flex gap-2">
                <Badge
                  variant={props.user.isVerified ? "default" : "secondary"}
                >
                  {props.user.isVerified ? "Verified" : "Unverified"}
                </Badge>
                <Badge
                  variant={props.user.isActive ? "default" : "destructive"}
                >
                  {props.user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        {(props.user.role) === ("admin") ? (<Admin />) : (<Users />)}
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            // onClick={navi("/logout")}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
