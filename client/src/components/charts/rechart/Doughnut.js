import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ chartData }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Doughnut Chart",
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
      display: true,
      position: "right",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },
    // tooltips: {
    //   displayColors: false,
    //   titleFontSize: 12,
    //   bodyFontSize: 14,
    //   xPadding: 10,
    //   yPadding: 10,
    //   callbacks: {
    //     label: (tooltipItem, data) => {
    //       return ` ${tooltipItem.value} $`;
    //     },
    //   },
    // },
  };
  const data = {
    labels: ["Approved", "Submitted", "Rejected", "Processed"],
    datasets: [
      {
        label: "Invoice",
        //data: [25, 24, 25, 25],
        data: [
          chartData.ApprovedInvoices,
          chartData.ReviewPending,
          chartData.RejectedInvoices,
          chartData.ProcessedInvoices,
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
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
