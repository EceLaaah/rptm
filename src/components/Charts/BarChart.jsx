import React, { useRef, useEffect } from "react";
import Chart from 'chart.js/auto'
import { buildScales, buildLegend, updated } from '../../Utils/ReusableSyntax'
import { backgroundColor, borderColor, Months } from "../../Utils/index";

const Analytics = ({
    dataArray,
    width,
    height,
    axes,
    legend,
    chartType,
}) => {
    const procurement = useRef(null);

    const updatedData = updated(dataArray);

    useEffect(() => {
        const ctx = procurement.current;
        const sortTypes = "totalPrice";

        //*Sort data from highest to lowest
        const sortedData = updatedData.sort(
            (a, b) => a[sortTypes] - b[sortTypes]
        );

        const labels = sortedData.map((label) => {
            const date = new Date(label.procurementDate)
            return Months[date.getMonth()]
        });

        const data = sortedData.map((data) => data[sortTypes]);


        if (data.length > 0) {
            const textTitle = "Procurement Chart";
            var myBarChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor,
                            borderColor,
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    plugins: {
                        scales: buildScales(axes),
                        legend: buildLegend(legend),
                        title: {
                            display: false,
                            text: textTitle,
                            fontSize: 25,
                        },
                    },
                }
            });

            return () => {
                myBarChart.destroy()
            }
        }
    }, []);

    return (
        <div className="container mx-auto px-8 py-6 sm:block hidden bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center text-primary">Procurement Chart</h1>
            <div className="">
                <canvas ref={procurement} height={width} width={height} key={dataArray.length} />
            </div>
        </div>
    );
};

export default Analytics;
