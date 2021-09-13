import React, { useContext, useState, useEffect } from "react";
import { Spin, notification, Badge } from "antd";
import { app } from "../../config/firebase";
import { AuthContext } from "../../Context/auth";
import { LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { Menu, X, Smile, ShoppingCart } from "react-feather";
import { filteredTransaction, filteredPendingTransaction } from "../../Utils/ReusableSyntax";
import { TransactionContext } from "../../Context/TransactionProvider";
import RolesHook from '../../lib/RolesHook'

const Layout = ({ children }) => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const { transaction, finishTransaction } = useContext(TransactionContext);

  const pendingtransaction = filteredPendingTransaction(finishTransaction, context);

  const specificTransaction = filteredTransaction(transaction, context);

  const { info, links } = RolesHook();

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

  const openNotification = () => {
    info.role === "Farmer" && notification.open({
      message: 'Information',
      description: `You have a new ${specificTransaction.length} Transaction`,
      icon: <Smile className="text-blue-500" />,
    });
  };

  useEffect(openNotification, [specificTransaction.length, info.role])

  if (context.length > 0) {
    return setLoading(false);
  }

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen relative">
      {/**Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform z-50 ${sidebarToggle && "-translate-x-full "
          } md:sticky md:translate-x-0 transition duration-200 ease-in-out py-8 px-2 flex flex-col h-screen w-80 text-gray-700 bg-primary dark-mode:text-gray-200 dark-mode:bg-gray-800`}
      >
        <div
          onClick={(event) => isSidebar(event)}
          className="absolute right-0 top-0 p-4 block md:hidden cursor-pointer"
        >
          <X className="text-white" />
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
            <div className="text-center text-white mt-2">
              <span className="font-bold text-lg">{info.name}</span>
              <span className="text-sm block mb-2">{info.email}</span>
              <span className="text-sm bg-blue-500 text-white py-1 px-4 rounded-full font-semibold">
                {info.role}
              </span>
            </div>
          </div>
          <nav className="flex-grow md:block md:overflow-auto">
            {links.map((type, index) => (
              <Link
                to={type.link}
                key={index}
                className="flex items-center block px-6 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-blue-500 dark-mode:focus:bg-blue-500 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white hover:text-white focus:text-white hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:shadow-outline"
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
      <section className="bg-white w-full relative" style={{ backgroundColor: "#f6f6f8" }}>
        {/**Navbar */}
        <div className={`w-full bg-white h-14 flex items-center sticky top-0`}>
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
            <div className="flex items-center gap-4">
              {info.role === "NFA" && (
                <Badge count={pendingtransaction.length}>
                  <Link to="/nfacart">
                    <span>
                      <ShoppingCart className="hover:text-gray-600 text-gray-600" size="20" />
                    </span>
                  </Link>
                </Badge>
              )}
              <div className="inline-block text-left relative">
                <span
                  onClick={(event) => isToggle(event)}
                  className="py-2 px-4  text-primary bg-gray-100 rounded-full text-sm font-bold cursor-pointer"
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
        </div>
        <div className="px-8 py-6 max-w-7xl mx-auto" style={{ width: "1100px" }}>{children}</div>
      </section>
    </div>
  );
};

export default Layout;
