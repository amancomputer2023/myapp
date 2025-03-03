import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, FileText, Package, UserCircle, Wrench } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.jsx";
import { useToast } from "../ui/use-toast";
import ProfileContent from "./Profile/ProfileContent";
import SidebarContent from "./Profile/SidebarContent";
import Services from './Profile/Services';
import Product from './Profile/Product';
import Invoice from './Profile/Invoice';


export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast({
      title: "Changes saved",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert("Profile updated successfully!");
  };

  const style = { backgroundColor: "aliceblue" };

  const navItemsUser = [
    { id: "profile", label: "Profile", icon: UserCircle },
    // { id: "account", label: "Account Settings", icon: Settings },
    // { id: "privacy", label: "Privacy", icon: Lock },
    // { id: "notifications", label: "Notifications", icon: Bell },
    // { id: "security", label: "Security", icon: Shield },
    // { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const navItemsAdmin = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "services", label: "Services", icon: Wrench },
    { id: "product", label: "Product", icon: Package },
    { id: "billBook", label: "BillBook", icon: FileText}
  ];
  const navItems = user.role === "user" ? navItemsUser : navItemsAdmin;

  return (
    <div className=" bg-muted/40">
      <div className="flex">
        {/* Mobile Header */}
        <header className="fixed bg-background">
          <Sheet modal={false}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" style={style} className="w-72 p-0">
              <SheetHeader className="border-b p-6">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <SidebarContent
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                navItems={navItems}
              />
            </SheetContent>
          </Sheet>
        </header>

        {/* Desktop Sidebar */}
        <aside className="flow left-0 hidden w-72 border-r bg-white lg:block">
          <SidebarContent
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navItems={navItems}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-24 ">
          <div className="container max-w-4xl py-6 lg:py-10">
            {activeTab === "profile" && (
              <ProfileContent
                user={user}
                handleChange={handleChange}
                handleSubmit={handleSave}
              />
            )}
            {activeTab === "product" && (<Product />) }
            {activeTab === "services" && (<Services />) }
            {activeTab === "billBook" && (<Invoice />)}
            {/* {activeTab === "privacy" && <PrivacyContent />}
              {activeTab === "notifications" && <NotificationsContent />}
              {activeTab === "security" && <SecurityContent />}
              {activeTab === "billing" && <BillingContent />} */}
              {/* {activeTab === "account" && (
              <AccountContent user={user} handleChange={handleChange} />
            )} */}
          </div>
        </main>

        {/* Mobile Navigation */}
        {/* <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      </div>
    </div>
  );
}
