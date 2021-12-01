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

    // function sortByMonth(arr) {

    //     arr.sort(function(a, b){
    //         return Months.indexOf(a.values.Month.displayValue)
    //              - Months.indexOf(b.values.Month.displayValue);
    //     });
    //   }

    useEffect(() => {
        const ctx = procurement.current;
        const sortTypes = "totalPrice";

        //*Sort data from highest to lowest
        // const sortedData = updatedData.sort(
        //     (a, b) => a[sortTypes] - b[sortTypes]
        // );

        const sortedDate = updatedData.sort((a, b) => {
            return new Date(a.procurementDate) - new Date(b.procurementDate)
        });

        const labels = sortedDate.map((labels) => {
            const date = new Date(labels.procurementDate);
            return Months[date.getMonth()]
        })

        const data = updatedData.map((data) => data[sortTypes]);


        if (data.length > 0) {
            const textTitle = "Procurement Chart";
            var myBarChart = new Chart(ctx, {
                data: {
                    labels,
                    datasets: [
                        {
                            type: chartType,
                            data,
                            backgroundColor,
                            borderColor,
                            borderWidth: 1,
                        },
                        {
                            type: "line",
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
