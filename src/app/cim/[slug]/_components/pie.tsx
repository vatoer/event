"use client";
// components/AttendancePieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and the data labels plugin
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// Define the shape of the data props
export interface AttendanceData {
  attending: number;
  notattending: number;
}

// Define the props for the component
interface AttendancePieChartProps {
  data: AttendanceData;
}

const AttendancePieChart = ({ data }:AttendancePieChartProps) => {
  const chartData: ChartData<'pie'> = {
    labels: ['Attending', 'Not Attending'],
    datasets: [
      {
        data: [data.attending, data.notattending],
        backgroundColor: [
          'rgba(0, 255, 0, 0.5)',
          'rgba(100, 0, 0, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
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

export default AttendancePieChart;
