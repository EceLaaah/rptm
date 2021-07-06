import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  const fetchProduct = () => {
    const document = app.firestore().collection("product");

    return document.onSnapshot((onsnapshot) => {
      const productData = [];
      onsnapshot.forEach((item) => {
        productData.push({ ...item.data(), id: item.id });
      });
      setProduct(productData);
    });
  };

  useEffect(fetchProduct, []);

  return (
    <ProductContext.Provider value={{ product }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
