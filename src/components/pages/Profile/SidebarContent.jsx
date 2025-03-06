import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";

export default function SidebarContent({ user, navItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">User Settings</h2>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={user.profilePictureUrl}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        <Separator />
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={location.pathname.includes(item.id) ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => navigate(`/user/${item.id}`)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
        <Separator />
        <Button variant="outline" className="gap-2" onClick={()=>{navigate("/logout")}}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  );
}
