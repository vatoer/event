"use client";
// components/RSVPPieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and the data labels plugin
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// Define the shape of the data props
export interface RSVPData {
  accept: number;
  decline: number;
  represented: number;
  notresponding: number;
}

// Define the props for the component
interface RSVPPieChartProps {
  data: RSVPData;
}

const RSVPPieChart = ({ data }:RSVPPieChartProps) => {
  const chartData: ChartData<'pie'> = {
    labels: ['Accept', 'Decline', 'Represented',"Not Responding"],
    datasets: [
      {
        data: [data.accept, data.decline, data.represented, data.notresponding],
        backgroundColor: [
          'rgba(0, 255, 0, 0.5)',
          'rgba(100, 0, 0, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(0, 0, 0, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 0, 0.2)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || '';
            if (context.parsed !== null) {
              label += ': ' + context.parsed;
            }
            return label;
          }
        }
      },
      datalabels: {
        color: 'black',
        display: true,
        formatter: (value: number) => value.toString(),
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default RSVPPieChart;
