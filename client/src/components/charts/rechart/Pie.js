import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Pie Chart",
        color: "blue",
        font: {
          size: 34,
        },
        padding: {
          top: 30,
          bottom: 30,
        },
        responsive: true,
        animation: {
          animateScale: true,
        },
      },
    },
    legend: {
      display: false,
      position: "right",
      align: "start",
      labels: {
        usePointStyle: true,
      },
    },
  };

  const data = {
    labels: ["Approved", "Submitted", "Rejected", "Processed"],
    datasets: [
      {
        label: "Invoice",
        //data: [25, 24, 25, 25],
        data: [
          chartData.ApprovedTotal,
          chartData.SubmittedTotal,
          chartData.RejectedTotal,
          chartData.ProcessedTotal,
        ],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: [
          "rgba(140, 217, 179)",
          "rgba(102, 102, 255)",
          "rgba(255, 102, 102)",
          "rgba(255, 224, 102)",
        ],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
      },
    ],
  };
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
