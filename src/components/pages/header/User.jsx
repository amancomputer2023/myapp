import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CreditCard,
  LogOut,
  Settings,
  UserIcon,
  User,
  LogIn,
  UserPlus,
  UserCircle,
  Wrench,
  Package,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

function UserDropDown(user) {
  const [open, setOpen] = useState(false);
  const styleDMC = { backgroundColor: "azure" };
  user = user.user;
  if (user == null) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild modal={false}>
          <button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <User />
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
          style={styleDMC}
          modal={false}
        >
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log In</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/register">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Register</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  const navItemsUser = [
    { to: "user/profile", label: "Profile", icon: UserCircle , className:"mr-2 h-4 w-4"},
  ];

  const navItemsAdmin = [
    { to: "user/profile", label: "Profile", icon: UserCircle ,className:"mr-2 h-4 w-4 " },
    { to: "user/services", label: "Services", icon: Wrench , className:"mr-2 h-4 w-4" },
    { to: "user/product", label: "Product", icon: Package ,className:"mr-2 h-4 w-4"},
    { to: "user/billBook", label: "BillBook", icon: FileText , className:"mr-2 h-4 w-4"}
  ];
  const navItems = user.role === "user" ? navItemsUser : navItemsAdmin;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.profilePictureUrl}
              alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
            />
            <AvatarFallback>
              {(user?.firstName?.[0] || "") + (user?.lastName?.[0] || "")}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        style={styleDMC}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <NavLink to={item.to}>
                <item.icon className={item.className}/>
                <span>{item.label}</span>
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropDown };
