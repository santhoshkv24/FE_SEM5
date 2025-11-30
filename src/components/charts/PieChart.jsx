import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ data, title }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          'rgba(49, 151, 149, 0.7)',
          'rgba(237, 137, 54, 0.7)',
          'rgba(72, 187, 120, 0.7)',
          'rgba(159, 122, 234, 0.7)',
          'rgba(246, 173, 85, 0.7)',
          'rgba(245, 101, 101, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: title },
    },
  }

  return <Pie data={chartData} options={options} />
}

export default PieChart
