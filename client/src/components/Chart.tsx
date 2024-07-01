// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Chart = (props: { success: number; failed: number; processing: number; queued: number }) => {
  const { success, failed, processing, queued } = props
  const total = success + failed + processing + queued

  const data = total
    ? {
        labels: ['Processed', 'Failed', 'Processing', 'Queued'],
        datasets: [
          {
            label: '# of Votes',
            data: [success, failed, processing, queued],
            backgroundColor: [
              'rgba(34, 202, 180, 1)',
              'rgba(255, 0, 0, 0.9)',
              'rgb(255,183,0, 0.9)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(34, 202, 236, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    : {
        labels: ['0 Video'],
        datasets: [
          {
            label: '0 Video',
            data: [1],
            backgroundColor: ['rgba(255, 255, 255, 0.8)'],
            borderColor: ['rgba(169, 169, 169, 1)'],
            borderWidth: 1,
          },
        ],
      }

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: { raw: number }) {
            const value = tooltipItem.raw as number
            const percentage = total ? ((value / total) * 100).toFixed(2) : '100.00'
            return `${value} (${percentage}%)`
          },
        },
      },
    },
    maintainAspectRatio: false,
  }
  return (
    <div className="h-full">
      <Doughnut type="doughnut" data={data} options={options} />
    </div>
  )
}

export default Chart
