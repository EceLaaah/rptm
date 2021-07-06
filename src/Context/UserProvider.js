import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState([]);

  const fetchUserInformation = () => {
    const document = app.firestore().collection("user");

    return document.onSnapshot((onsnapshot) => {
      const userData = [];
      onsnapshot.forEach((item) => {
        userData.push({ ...item.data(), id: item.id });
      });
      setUserInformation(userData);
    });
  };

  useEffect(fetchUserInformation, []);

  return (
    <UserContext.Provider value={{ userInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
