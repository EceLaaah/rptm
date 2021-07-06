import React from "react";
import { DashboardCards } from "../../components";
import { DollarSign, Activity, Package, Box } from "react-feather";

const Dashboard = () => {
  const cardData = [
    {
      title: "Daily Total Sales",
      numberData: 500,
      icon: <DollarSign color="#FFF" size="25" />,
      iconColor: "bg-red-300",
      cardColor: "bg-red-400",
    },
    {
      title: "Products",
      numberData: 500,
      icon: <Package color="#FFF" size="25" />,
      iconColor: "bg-green-300",
      cardColor: "bg-green-400",
    },
    {
      title: "Total Socks",
      numberData: 500,
      icon: <Activity color="#FFF" size="25" />,
      iconColor: "bg-pink-300",
      cardColor: "bg-pink-400",
    },
    {
      title: "Critical Items",
      numberData: 500,
      icon: <Box color="#FFF" size="25" />,
      iconColor: "bg-blue-300",
      cardColor: "bg-blue-400",
    },
  ];

  return (
    <>
      <div className="grid grid-rows gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        {cardData.map((data, index) => (
          <DashboardCards
            key={index}
            icon={data.icon}
            title={data.title}
            numberData={data.numberData}
            iconColor={data.iconColor}
            cardColor={data.cardColor}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
