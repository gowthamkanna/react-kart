import React from "react";
//import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  var SubmittedData = [];
  var ApprovedData = [];
  var RejectedData = [];

  if (
    chartData.Submitted != null &&
    chartData.Approved != null &&
    chartData.Rejected != null
  ) {
    // var result = chartData.Submitted.split(",");
    SubmittedData = Array.from(chartData.Submitted.split(","), Number);
    ApprovedData = Array.from(chartData.Approved.split(","), Number);
    RejectedData = Array.from(chartData.Rejected.split(","), Number);
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Stacked",
      },
    },
    responsive: true,
    offsetGridLines: true,
    drawTicks: true,
    layout: {
      padding: {
        top: 30,
        right: 40,
        bottom: 40,
      },
    },
    legend: {
      display: true,
      position: "top",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },

    maintainAspectRatio: false,
    scales: {
      // xAxes: [
      //   {
      //     stacked: true,
      //     ticks: {
      //       padding: 5,
      //     },
      //     gridLines: {
      //       display: false,
      //     },
      //   },
      // ],
      // yAxes: [
      //   {
      //     stacked: false,
      //     gridLines: {
      //       drawBorder: false,
      //     },
      //     ticks: {
      //       beginAtZero: true,
      //       maxTicksLimit: 6,
      //       padding: 20,
      //       // callback(n) {
      //       //   if (n < 1e3) return n;
      //       //   if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
      //       // },
      //       callback: function (label, index, labels) {
      //         //return label / 1000 + "k";
      //         return "$" + label + "K";
      //       },
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
    datasets: [
      {
        label: "Approved",
        // data: [65, 59, 80, 81, 56, 55, 40],
        data: ApprovedData,
        backgroundColor: "rgba(140, 217, 179)",
      },

      {
        label: "Submitted",
        //data: [25, 80, 90, 50, 55, 95, 30],
        data: SubmittedData,
        backgroundColor: "rgba(102, 102, 255)",
      },
      {
        label: "Rejected",
        //data: [45, 79, 50, 41, 16, 85, 20],
        data: RejectedData,
        backgroundColor: "rgba(255, 102, 102)",
      },
    ],
  };

  return (
    <div>
      <Bar data={data} height={360} options={options} />
    </div>
  );
};
export default BarChart;
