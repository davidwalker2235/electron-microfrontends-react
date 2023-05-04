import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  info?: {total: number, used: number}
}

const PieChart = ({info = {total: 0, used: 0}}: PieChartProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Total', 'Used'],
    datasets: [
      {
        label: '# of Votes',
        data: [info.total, info.used],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
