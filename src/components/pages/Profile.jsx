import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, FileText, Package, UserCircle, Wrench } from "lucide-react";
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

  const style = { backgroundColor: "aliceblue" };

  const navItemsUser = [
    { id: "profile", label: "Profile", icon: UserCircle },
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
                <ChevronRight  className="w-8 h-8 text-gray-700 hover:text-blue-500 transition-all"/>
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

        <aside className="flow left-0 hidden w-72 border-r bg-white lg:block">
          <SidebarContent
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navItems={navItems}
          />
        </aside>
        <main className="flex-1 pb-24 ">
          <div className="container max-w-4xl py-6 lg:py-10">
            {activeTab === "profile" && (
              <ProfileContent
                user={user}
              />
            )}
            {activeTab === "product" && (<Product />) }
            {activeTab === "services" && (<Services />) }
            {activeTab === "billBook" && (<Invoice />)}
          </div>
        </main>
      </div>
    </div>
  );
}
