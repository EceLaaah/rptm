import { DollarSign, Activity, Package, Box } from "react-feather";
import { DashboardCard, BarChart } from '../../components'
import { useContext } from 'react';
import { ProcurementContext } from '../../Context/ProcurementProvider'
import { DistributionContext } from '../../Context/DistributionProvider'

export default function Dashboard() {

  const { distribution } = useContext(DistributionContext);
  const { fetchProcurement } = useContext(ProcurementContext);

  const cardData = [
    {
      title: "Procurement",
      numberData: fetchProcurement.length,
      icon: <DollarSign color="#FFF" size="25" />,
      iconColor: "bg-red-300",
      cardColor: "bg-red-400",
    },
    {
      title: "Distribution",
      numberData: distribution.length,
      icon: <Package color="#FFF" size="25" />,
      iconColor: "bg-green-300",
      cardColor: "bg-green-400",
    },
    //**Still static */
    {
      title: "Inventory",
      numberData: 500,
      icon: <Activity color="#FFF" size="25" />,
      iconColor: "bg-pink-300",
      cardColor: "bg-pink-400",
    },
    //**Still static */
    {
      title: "Rice Milled",
      numberData: 500,
      icon: <Box color="#FFF" size="25" />,
      iconColor: "bg-blue-300",
      cardColor: "bg-blue-400",
    },
  ];

  return <div>
    <div className="grid grid-rows gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {cardData.map((data, index) => (
        <DashboardCard
          key={index}
          icon={data.icon}
          title={data.title}
          numberData={data.numberData}
          iconColor={data.iconColor}
          cardColor={data.cardColor}
        />
      ))}
    </div>
    <div className="lg:flex lg:justify-between">
      <div className="lg:w-11/12 lg:mr-4 w-full shadow-lg rounded-sm">
        {fetchProcurement.length > 0 ? (
          <BarChart
            dataArray={fetchProcurement}
            width="40vw"
            height="70vw"
            axes={true}
            legend={false}
            chartType="bar"
          />
        ) : (
          <div className="text-center py-4">
            <span className="text-lg">Empty Table</span>
          </div>
        )}
      </div>
      {/* <div className="lg:w-3/6 w-full shadow-lg rounded-sm">
        {monthlySales.length ? (
          <DoughnutChart
            soldProduct={monthlySales}
            width="35vw"
            height="30vw"
            axes={false}
            legend={false}
            chartType="doughnut"
          />
        ) : (
          <div className="text-center py-4">
            <span className="text-lg">
              Monthly Sales Analytics is Empty
            </span>
          </div>
        )}
      </div>
    </div>
    <div>
      <div className="mt-4 shadow-lg py-6 px-6">
        <div className="px-4 mb-2">
          <span className="text-lg font-bold">Order Top Sales</span>
        </div>
        <TopSalesTable searchFilter={null} paidOrders={paidOrders} />
      </div> */}
    </div>
  </div>
}
