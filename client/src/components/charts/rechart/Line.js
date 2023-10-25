import React from "react";
//import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  var options = {
    plugins: {
      title: {
        display: true,
      },
    },
    responsive: true,
    offsetGridLines: true,
    drawTicks: true,
    legend: {
      display: true,
      position: "top",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },
    scales: {
      // yAxes: [
      //   {
      //     ticks: {
      //       callback: function (label, index, labels) {
      //         //return label / 1000 + "k";
      //         return "$" + label + "K";
      //       },
      //     },
      //     scaleLabel: {
      //       display: true,
      //       //labelString: "1k = 1000",
      //     },
      //   },
      // ],
    },
  };
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    responsive: true,
    offset: true,
    datasets: [
      {
        label: "OSCA",
        //backgroundColor: "rgb(255, 99, 132)",
        opacity: 0.1,
        borderColor: "rgb(255, 99, 132)",
        // data: [0, 200.0, 400.0, 450.0, 600.0, 640.0, 800.0, 900.0, 0, 20],
        data: [
          chartData.JanCount,
          chartData.FebCount,
          chartData.MarCount,
          chartData.AprCount,
          chartData.MayCount,
          chartData.JunCount,
          chartData.JulCount,
          chartData.AugCount,
          chartData.SepCount,
          chartData.OctCount,
          chartData.NovCount,
          chartData.DesCount,
        ],
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};
export default LineChart;
