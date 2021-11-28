import {
  Home,
  User,
  ShoppingCart,
  Archive,
  Truck,
  Folder,
  Navigation,
  DollarSign,
  FileText,
  ShoppingBag,
  File
} from "react-feather";

const NFA = [
  {
    id: 1,
    name: "Dashboard",
    icon: <Home className="w-4 h-4" />,
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Marketplace",
    icon: <Archive className="w-4 h-4" />,
    link: "/marketplace",
  },
  {
    id: 3,
    name: "Target Procurement",
    icon: <ShoppingBag className="w-4 h-4" />,
    link: "/targetProcurement",
  },
  {
    id: 4,
    name: "Procurement",
    icon: <Navigation className="w-4 h-4" />,
    link: "/procurement",
  },
  {
    id: 5,
    name: "Distribution",
    icon: <Truck className="w-4 h-4" />,
    link: "/distribution",
  },
  {
    id: 6,
    name: "Inventory",
    icon: <Folder className="w-4 h-4" />,
    link: "/inventory",
  },
  {
    id: 7,
    name: "Price Monitoring",
    icon: <File className="w-4 h-4" />,
    link: "/priceMonitoring"
  }
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
    id: 3,
    name: "Transaction",
    icon: <ShoppingCart className="w-4 h-4" />,
    link: "/transaction",
  },
  {
    id: 7,
    name: "Price Monitoring",
    icon: <File className="w-4 h-4" />,
    link: "/priceMonitoring"
  }
];

const farmerLinks = [
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
    id: 3,
    name: "Rice Variety",
    icon: <FileText className="w-4 h-4" />,
    link: "/rice",
  },
  {
    id: 4,
    name: "Products",
    icon: <ShoppingCart className="w-4 h-4" />,
    link: "/products",
  },
  {
    id: 5,
    name: "Transaction",
    icon: <DollarSign className="w-4 h-4" />,
    link: "/transaction",
  },
  {
    id: 7,
    name: "Price Monitoring",
    icon: <File className="w-4 h-4" />,
    link: "/priceMonitoring"
  }
];

// const ProcurementData = [
//   {
//     nfaId: 1,
//     procurementID: "9CD11AC7-4290-9658-4EC4-BDD1B015368A",
//     procurementDate: "04/04/2020",
//     riceVariety: " sinandomeng",
//     quantity: 11,
//     price: 22,
//     totalPrice: 242,
//     farmerName: "Brady Lindsey",
//     date_created: "07/15/21",
//   },
//   {
//     nfaId: 2,
//     procurementID: "9CD11AC7-4290-9658-4EC4-BDD1B015368A",
//     procurementDate: "04/04/2020",
//     riceVariety: " sinandomeng",
//     quantity: 11,
//     price: 22,
//     totalPrice: 242,
//     farmerName: "Brady Lindsey",
//     date_created: "07/15/21",
//   },
//   {
//     nfaId: 3,
//     procurementID: "9CD11AC7-4290-9658-4EC4-BDD1B015368A",
//     procurementDate: "04/04/2020",
//     riceVariety: " sinandomeng",
//     quantity: 11,
//     price: 22,
//     totalPrice: 242,
//     farmerName: "Brady Lindsey",
//     date_created: "07/15/21",
//   },
//   {
//     nfaId: 4,
//     procurementID: "9CD11AC7-4290-9658-4EC4-BDD1B015368A",
//     procurementDate: "04/04/2020",
//     riceVariety: " sinandomeng",
//     quantity: 11,
//     price: 22,
//     totalPrice: 242,
//     farmerName: "Brady Lindsey",
//     date_created: "07/15/21",
//   },
//   {
//     nfaId: 5,
//     procurementID: "9CD11AC7-4290-9658-4EC4-BDD1B015368A",
//     procurementDate: "04/04/2020",
//     riceVariety: " sinandomeng",
//     quantity: 11,
//     price: 22,
//     totalPrice: 242,
//     farmerName: "Brady Lindsey",
//     date_created: "07/15/21",
//   },
// ];

// const transactionFarmer = [
//   {
//     id: 1,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 2,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 3,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 4,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
//   {
//     id: 5,
//     ownersName: "Hilary Cambell",
//     quantity: 37,
//     pricePerKilo: 43,
//     totalPrice: 1591,
//     variety: "Dinorado",
//     buyerName: "Wayne George",
//     transactionDate: "12/30/2121",
//   },
// ];

export { farmerLinks, TraderLinks, NFA };
