import {
  Home,
  User,
  ShoppingCart,
  FilePlus,
  Archive,
  Truck,
  Folder,
  Navigation,
  DollarSign,
} from "react-feather";

const NFA = [
  {
    id: 1,
    name: "Dashboard",
    icon: <Home className="w-4 h-4" />,
    links: "/dashboard",
  },
  {
    id: 2,
    name: "Profile",
    icon: <User className="w-4 h-4" />,
    links: "/profile",
  },
  {
    id: 3,
    name: "Procurement",
    icon: <Navigation className="w-4 h-4" />,
    links: "/procurement",
  },
  {
    id: 4,
    name: "Distribution",
    icon: <Folder className="w-4 h-4" />,
    links: "/distribution",
  },
  {
    id: 5,
    name: "Transportation",
    icon: <Truck className="w-4 h-4" />,
    links: "/transportation",
  },
];

const TraderLinks = [
  {
    id: 1,
    name: "Marketplace",
    icon: <Archive className="w-4 h-4" />,
    link: "/marketplace",
  },
  {
    id: 2,
    name: "Profile",
    icon: <User className="w-4 h-4" />,
    link: "/profile",
  },
  {
    id: 5,
    name: "Transaction",
    icon: <ShoppingCart className="w-4 h-4" />,
    link: "/transaction",
  },
];

const farmerLinks = [
  {
    id: 1,
    name: "Home",
    icon: <Home className="w-4 h-4" />,
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Profile",
    icon: <User className="w-4 h-4" />,
    link: "/profile",
  },
  {
    id: 3,
    name: "Marketplace",
    icon: <Archive className="w-4 h-4" />,
    link: "/marketplace",
  },
  {
    id: 4,
    name: "Post Bidding",
    icon: <FilePlus className="w-4 h-4" />,
    link: "/Post",
  },
  {
    id: 5,
    name: "Products",
    icon: <ShoppingCart className="w-4 h-4" />,
    link: "/products",
  },
  {
    id: 6,
    name: "Transaction",
    icon: <DollarSign className="w-4 h-4" />,
    link: "/transaction",
  },
];

export { farmerLinks, TraderLinks, NFA };
