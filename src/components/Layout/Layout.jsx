import React, { useContext, useState, useEffect } from "react";
import { Spin } from "antd";
import { app } from "../../config/firebase";
import { UserContext } from "../../Context/UserProvider";
import { AuthContext } from "../../Context/auth";
import { farmerLinks, TraderLinks, NFA } from "../../mock/data";
import { LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { Menu, X } from "react-feather";
//import { Search } from "../";

const Layout = ({ children }) => {
  const userContext = useContext(UserContext);
  const context = useContext(AuthContext);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    role: "",
    imageUrl: null,
  });
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const isSidebar = (event) => {
    event.preventDefault();
    if (!sidebarToggle) {
      setSidebarToggle(true);
    } else {
      setSidebarToggle(false);
    }
  };

  const isToggle = (event) => {
    event.preventDefault();
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const fetchUserInformation = () => {
    userContext.userInformation.forEach((user) => {
      if (user.email === context.email) {
        user.role === "Farmer" && setLinks(farmerLinks);
        user.role === "Trader" && setLinks(TraderLinks);
        user.role === "NFA" && setLinks(NFA);
        setInfo({
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          role: user.role,
          imageUrl: user.imageUrl,
        });
      }
    });
  };

  useEffect(fetchUserInformation, [userContext.userInformation, context.email]);

  console.log(context.email);

  if (context.length > 0) {
    return setLoading(false);
  }

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen relative">
      {/**Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 transform z-50 ${
          sidebarToggle && "-translate-x-full "
        } md:relative md:translate-x-0 transition duration-200 ease-in-out py-8 px-2 flex flex-col h-full w-80 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800`}
      >
        <div
          onClick={(event) => isSidebar(event)}
          className="absolute right-0 top-0 p-4 block md:hidden cursor-pointer"
        >
          <X />
        </div>
        <Spin spinning={loading} delay={500}>
          <div className="flex items-center justify-center flex-col mb-5">
            {info.imageUrl ? (
              <img
                src={info.imageUrl}
                className="w-40 h-40 object-cover bg-no-repeat rounded-full cursor-pointer border-solid border-4"
                alt="profile"
              />
            ) : (
              <img
                src="/image/profile-test.jpg"
                className="w-40 h-40 object-cover bg-no-repeat rounded-full cursor-pointer border-solid border-4"
                alt="profile"
              />
            )}
            <div className="text-center mt-2">
              <span className="font-bold text-lg">{info.name}</span>
              <span className="text-sm block mb-2">{info.email}</span>
              <span className="text-sm bg-green-500 text-white py-1 px-4 rounded-full font-semibold">
                {info.role}
              </span>
            </div>
          </div>
          <nav className="flex-grow md:block md:overflow-auto">
            {links.map((type, index) => (
              <Link
                to={type.link}
                key={index}
                className="flex items-center block px-6 py-2 mt-2 text-sm font-semibold text-gray-800 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <i>{type.icon}</i>
                <span className="mx-2 focus:text-gray-500">{type.name}</span>
              </Link>
            ))}
          </nav>
        </Spin>
      </div>
      {/**Sidebar */}
      {/**Content*/}
      <section className="bg-gray-100 w-full">
        {/**Navbar */}
        <div className={`w-full bg-white h-14 flex items-center`}>
          {/* <div>
            <Search className="px-4" placeholder="Search..." />
          </div> */}
          <div
            className="px-4 py-4 cursor-pointer hover:bg-gray-100 block md:hidden"
            onClick={(event) => isSidebar(event)}
          >
            <Menu />
          </div>
          <div className="mx-4 absolute right-0">
            <div className="relative inline-block text-left">
              <span
                onClick={(event) => isToggle(event)}
                className="py-2 px-4 bg-gray-100 text-gray-600 rounded-full text-sm font-bold cursor-pointer"
              >
                {context.email}
              </span>
              {toggle && (
                <div
                  className="origin-top-right z-50 absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div
                    onClick={() => app.auth().signOut()}
                    className="py-1 px-3 hover:bg-gray-50 cursor-pointer rounded-md flex items-center"
                    role="none"
                  >
                    <LogOut className="text-gray-700 w-4 h-4" />
                    <button
                      href="#"
                      className="text-gray-700 block px-2 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Signout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </section>
    </div>
  );
};

export default Layout;
