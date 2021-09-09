import { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";

const DistributionContext = createContext();

const DistributionProvider = ({ children }) => {
  const [distribution, setDistribution] = useState([]);

  const fetchDistribution = () => {
    const document = app.firestore();
    const documentDistribution = document.collection("distribution")

    return documentDistribution.onSnapshot((snapshot) => {
      const distributionArray = [];

      snapshot.forEach((distributionData) => {
        distributionArray.push({
          ...distributionData.data(),
          id: distributionData.id,
        });
      });

      setDistribution(distributionArray);
    });
  };

  useEffect(fetchDistribution, []);

  return (
    <DistributionContext.Provider value={{ distribution }}>
      {children}
    </DistributionContext.Provider>
  );
};

export { DistributionProvider, DistributionContext };
