import { useContext, useState, useEffect } from 'react';
import {
  TargetProcurementModal,
} from "../../components";
import { filteredByNFA, palayMonths, filtered } from '../../Utils/ReusableSyntax'
import { DollarSign, Truck, Package, Folder, Plus } from "react-feather";
import { DashboardCard, BarChart, PieChart, DisributionChart, ProcuredPalayTable } from '../../components'
import { ProcurementContext } from '../../Context/ProcurementProvider'
import { DistributionContext } from '../../Context/DistributionProvider'
import { TransactionContext } from '../../Context/TransactionProvider'
import UseTargetPocurement from "../../lib/UseTargetPocurement";
import { AuthContext } from '../../Context/auth'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Divider, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function Dashboard() {

  const { distribution } = useContext(DistributionContext);
  const { fetchProcurement } = useContext(ProcurementContext);
  const { finishTransaction, riceMilled } = useContext(TransactionContext);
  const history = useHistory();
  const context = useContext(AuthContext);

  const [isTarget, setTarget] = useState(false);

  const { getTarget } = UseTargetPocurement();

  const filteredNFA = filteredByNFA(finishTransaction, context);

  //**Palay that is equal or more than 9 months notification */
  const palayAge = palayMonths(filteredNFA)

  const filterProcurement = filtered(fetchProcurement, context);
  const filterDistribution = filtered(distribution, context);
  const filterRiceMilled = filtered(riceMilled, context);

  const goToInventory = (event) => {
    event.preventDefault();
    history.push("/inventory");
  }

  const openNotification = () => {
    const btn = (
      <button onClick={goToInventory} type="primary" size="small" className="bg-blue-500 hover:bg-blue-400 py-1 px-4 rounded-lg text-white">
        inventory
      </button>
    );
    notification.open({
      message: 'Palay that is ready to distribute',
      description:
        `You already have ${palayAge.length} ready to distribute`,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      btn
    });
  };

  useEffect(openNotification, []);

  const onTarget = () => setTarget((isTarget) => !isTarget);

  const cardData = [
    {
      title: "Procurement",
      numberData: filterProcurement.length,
      icon: <DollarSign color="#FFF" size="25" />,
      iconColor: "bg-red-300",
      cardColor: "bg-red-400",
    },
    {
      title: "Distribution",
      numberData: filterDistribution.length,
      icon: <Truck color="#FFF" size="25" />,
      iconColor: "bg-green-300",
      cardColor: "bg-green-400",
    },
    {
      title: "Inventory",
      numberData: filteredNFA.length,
      icon: <Folder color="#FFF" size="25" />,
      iconColor: "bg-pink-300",
      cardColor: "bg-pink-400",
    },
    {
      title: "Rice Milled",
      numberData: filterRiceMilled.length,
      icon: <Package color="#FFF" size="25" />,
      iconColor: "bg-blue-300",
      cardColor: "bg-blue-400",
    },
  ];

  return (
    <div>
      <TargetProcurementModal isOpen={isTarget} isClose={onTarget} />
      <h1 className="font-bold text-2xl text-primary">Dashboard</h1>
      <span className="text-gray-400">Procured Rice Data Summary</span>
      <Divider />
      <div className="grid grid-rows gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4 w-full">
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
      <div className="lg:flex gap-4">
        {filterDistribution.length > 0 && (
          <div className="lg:w-3/6 w-full bg-white rounded-lg">
            <PieChart
              distribution={filterDistribution}
            />
          </div>
        )}

        {filteredNFA.length > 0 && (
          <div className="lg:w-11/12 w-full bg-white rounded-lg">
            <BarChart
              dataArray={filteredNFA}
              width="40vw"
              height="70vw"
              axes={true}
              legend={false}
              chartType="bar"
            />
          </div>
        )}
      </div>
      {/**Barchart and number of distributions */}
      <div className="lg:flex gap-4">
        {filterDistribution.length > 0 && (
          <div className="lg:w-11/12  w-full rounded-lg bg-white mt-4">
            <DisributionChart
              dataArray={filterDistribution}
              width="20vw"
              height="35vw"
              axes={true}
              legend={false}
              chartType="line"
            />
          </div>
        )}

        {filteredNFA.length > 0 && (
          <div className="rounded-lg lg:w-1/2 bg-white pt-8 pb-4 px-8 mt-4">
            <div className="mb-7 flex justify-between">
              <h1 className="text-sm flex items-center gap-2">
                <span className="text-lg">Target :</span>
                <strong className="bg-primary py-1 px-2 font-bold rounded-full text-white">
                  {getTarget.targetNumber}
                </strong>
              </h1>
              <button
                onClick={onTarget}
                type="button"
                id="add"
                className="flex items-center text-sm gap-2 p-2 bg-primary hover:bg-primary-slight text-white font-semibold rounded-full shadow-lg"
              >
                <Plus size="15" />
              </button>
            </div>

            <section className="py-2 flex flex-col gap-6 h-56 overflow-auto">
              {filteredNFA.map((type, index) => (
                <div className="flex items-center justify-between">
                  <div>filteredTransaction
                    <h1 className="text-sm text-primary">{type.riceVariety}</h1>
                    <span className="text-xl font-bold text-primary">{type.socks}</span>
                  </div>
                  <strong className="bg-primary py-3 px-4 text-white font-bold rounded-lg shadow-lg">{index + 1}</strong>
                </div>
              ))}
            </section>

            <div className="text-right">
              <Link to="/marketplace">
                <button
                  className="my-4 text-sm gap-2 py-2 w-full bg-primary hover:bg-primary-slight text-white font-semibold rounded-lg shadow-lg"
                >
                  Market
                </button></Link>
            </div>
          </div>
        )}
      </div>

      <div className="my-4 py-6 px-8 bg-white rounded-lg">
        {filterRiceMilled.length > 0 && (
          <div className="flex items-center justify-between mb-4 mt-2 ">
            <h1 className="font-bold text-primary text-2xl">Rice Milled Summary</h1>
            <Link
              to="/inventory"
              className="flex items-center text-sm gap-2 py-2 px-4 bg-primary hover:bg-primary-slight text-white font-semibold rounded-lg shadow-lg"
            >
              <span className="text-white">Inventory</span>
            </Link>
          </div>
        )}
        <ProcuredPalayTable riceMilled={filterRiceMilled} />
      </div>
    </div >
  )
}

export default withRouter(Dashboard);