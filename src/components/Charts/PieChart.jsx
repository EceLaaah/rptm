import { useRef, useEffect } from "react";
import Chart from 'chart.js/auto'
import { buildScales, buildLegend, filterDistribution } from '../../Utils/ReusableSyntax'
import { colors } from "../../Utils";

export default function PieChart({
    distribution,
    width,
    height,
    axes,
    legend,
    chartType,
}) {


    const distributionChart = useRef(null);

    useEffect(async () => {
        const ctx = distributionChart.current;

        const filteredData = distribution.filter((thing, index, self) => {
            return index === self.findIndex((t) => (
                t.distributionType === thing.distributionType
            ))
        })

        const police = filterDistribution(distribution, "Police")
        const market = filterDistribution(distribution, "Market")
        const relief = filterDistribution(distribution, "Relief Operation")

        const totalPercent = 100;

        const policeTotal = (totalPercent * police.length) / totalPercent;
        const marketTotal = (totalPercent * market.length) / totalPercent;
        const reliefTotal = (totalPercent * relief.length) / totalPercent;

        const data = await Promise.all([policeTotal, marketTotal, reliefTotal]);

        //const sampleData = distribution.map((obj) => obj.quantity);

        const labels = filteredData.map((obj) => obj.distributionType);

        console.log(labels)

        const borderColor = labels.map((type) => colors[type]);
        const backgroundColor = borderColor.map((color) => `${color}D3`);

        if (data.length > 0) {
            const textTitle = "Distribution Chart";
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
    }, [distribution]);


    return (
        <div className="container mx-auto px-8 py-4 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center py-3 text-primary">Distribution Pie Chart</h1>
            <div className="">
                <canvas ref={distributionChart} height={width} width={height} />
            </div>
        </div>
    )
}