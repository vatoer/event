"use client";
// components/RSVPChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


// Register Chart.js components and the data labels plugin
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

// Define the shape of the data props
interface RSVPData {
  accept: number[];
  decline: number[];
  represented: number[];
}

// Define the props for the component
interface RSVPChartProps {
  data: RSVPData;
}

const RSVPChart: React.FC<RSVPChartProps> = ({ data }) => {
    // Calculate the maximum value from the data
  const allData = [...data.accept, ...data.decline, ...data.represented];
  const maxValue = Math.max(...allData);
  const adjustedMaxValue = maxValue * 1.1; // Add 10% to the max value

  const chartData = {
    labels: ['Politik', 'Ekonomi', 'Pensosbud', 'Protkons',"UNESCO", "Athan","Atdag","Atdikbud"],
    datasets: [
      {
        label: 'Accept',
        data: data.accept,
        backgroundColor: 'rgba(0, 192, 0, 0.5)', // Green with 20% opacity
        borderColor: 'rgba(0, 128, 0, 1)', // Solid green
        borderWidth: 1,
        // Data labels configuration
        datalabels: {
          color: 'black',
          align: 'end' as const, // Use one of the allowed values
          anchor: 'end' as const, // Use one of the allowed values
          formatter: (value: number) => value.toString(),
        },
      },
      {
        label: 'Decline',
        data: data.decline,
        backgroundColor: 'rgba(128, 0, 0, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        // Data labels configuration
        datalabels: {
          color: 'black',
          align: 'end' as const, // Use one of the allowed values
          anchor: 'end' as const, // Use one of the allowed values
          formatter: (value: number) => value.toString(),
        },
      },
      {
        label: 'Represented',
        data: data.represented,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        // Data labels configuration
        datalabels: {
          color: 'black',
          align: 'end' as const, // Use one of the allowed values
          anchor: 'end' as const, // Use one of the allowed values
          formatter: (value: number) => value.toString(),
        },
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
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      },
      datalabels: {
        color: 'black',
        align: 'end' as const, // Use one of the allowed values
        anchor: 'end' as const, // Use one of the allowed values
        display: true,
      }
    },
    scales: {
        y: {
          beginAtZero: true,
          max: adjustedMaxValue, // Adjust this value to add more space on the y-axis
        },
      },
  };

  return <Bar data={chartData} options={options} />;
};

export default RSVPChart;
