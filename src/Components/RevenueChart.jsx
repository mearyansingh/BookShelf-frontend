// src/components/RevenueChart.jsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {

   const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];;

   const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
         {
            label: 'Revenue (USD)',
            data: revenueData,
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1,
         },
      ],
   };

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Monthly Revenue',
         },
      },
      scales: {
         y: {
            beginAtZero: true,
         },
      },
   };

   return (
      <div className=" mx-auto p-4">
         <h2 className="text-center font-bold mb-4">Monthly Revenue</h2>
         <div className=''>
            <Bar data={data} options={options} className='' />
         </div>
      </div>
   );
};

export default RevenueChart;