import React, { useRef, useEffect } from "react";
import { BuildChart, backgroundColor, borderColor, Months } from "../../Utils/index";

const Analytics = ({
    dataArray,
    totalPurchase,
    width,
    height,
    axes,
    legend,
    chartType,
}) => {
    const procurement = useRef(null);

    const initSalesChart = () => {
        const ctx = procurement.current;
        const sortTypes = "totalPrice";

        //*Sort data from highest to lowest
        const sortedData = dataArray.sort(
            (a, b) => a[sortTypes] - b[sortTypes]
        );

        const labels = sortedData.map((label) => {
            const date = new Date(label.procurementDate)
            return Months[date.getMonth()]
        });

        const data = sortedData.map((data) => data[sortTypes]);


        if (data.length > 0) {
            const textTitle = "Procurement Chart";
            const config = {
                ctx,
                chartType,
                labels,
                data,
                backgroundColor,
                borderColor,
                axes,
                legend,
                textTitle,
            };

            BuildChart(config);
        }
    };

    useEffect(initSalesChart, []);

    return (
        <div className="container mx-auto px-8 py-4 mt-4 sm:block hidden bg-white">
            {/* <div className="mb-4 flex items-center">
                {totalPurchase && (
                    <section>
                        <span className="font-bold md:text-xl text-lg">Total : </span>
                        <span className="font-bold md:text-xl text-lg text-red-500">
                            ₱{totalPurchase.toLocaleString()}
                        </span>
                    </section>
                )}
            </div> */}
            <div className="">
                <canvas ref={procurement} height={width} width={height} key={dataArray.length} />
            </div>
        </div>
    );
};

export default Analytics;
