import React, { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { Home, User, ShoppingCart, FilePlus } from "react-feather";
import { Link } from "react-router-dom";
import Icon from "../Icon/Logo";
import { Search } from "../";

const Layout = ({ children }) => {
  const context = useContext(AuthContext);
  const links = [
    {
      id: 1,
      name: "Dashboard",
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
      name: "Post Bidding",
      icon: <FilePlus className="w-4 h-4" />,
      link: "/Post",
    },
    {
      id: 4,
      name: "Transaction",
      icon: <ShoppingCart className="w-4 h-4" />,
      link: "/transaction",
    },
  ];

  // const signOut = (event) => {
  //     event.preventDefault();
  //     app.auth().signOut();
  //   };

  return (
    <div>
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <div className="py-8 px-2 flex flex-col h-full w-80 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex items-center justify-center mb-5">
            <Icon />
            <span className="ml-2 text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              Procurement
            </span>
          </div>
          <nav className="flex-grow md:block md:overflow-y-auto">
            {links.map((type) => (
              <Link
                to={type.link}
                key={type.id}
                className="flex items-center block px-6 py-2 mt-2 text-sm font-semibold text-gray-800 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <i>{type.icon}</i>
                <span className="mx-2 focus:text-gray-500">{type.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        {/**Content*/}
        <section className="bg-gray-100 w-full">
          {/**Navbar */}
          <div className="w-full bg-white h-14 flex items-center justify-end">
            <div>
              <Search className="px-4" placeholder="Search..." />
            </div>
            <div className="mx-4">
              <span className="py-2 px-4 bg-gray-100 text-gray-600 rounded-full text-sm font-bold">
                {context.email}
              </span>
            </div>
          </div>
          <div className="p-8">{children}</div>
        </section>
      </div>
    </div>
  );
};

export default Layout;
