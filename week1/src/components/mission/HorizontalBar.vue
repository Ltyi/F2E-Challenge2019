<template>
  <canvas ref="ctx" width="400" height="400"></canvas>
</template>

<script setup>
import Chart from 'chart.js'
import { inject, onMounted, ref } from 'vue'

// 可複用功能
import useMissionList from '@/composables/useMissionList'

const dayjs = inject('dayjs')

export default {
  name: 'HorizontalBar'
}

// 任務完成列表
const { missionDoneList } = useMissionList()

// 圖表
export const { ctx } = useChart()

function useChart() {
  const ctx = ref(null)
  const chart = ref(null)

  // 當週區間
  const labels = []
  const start = dayjs().startOf('week')

  for (let i = 0; i < 7; i++) {
    labels.push(start.add(i, 'd'))
  }

  // 工作區間圖表資料
  const backgroundColor = '#ff6d6d'
  const borderColor = '#e54343'
  const borderWidth = 1
  const datasets = []

  labels.forEach(label => {
    missionDoneList.value.forEach(item => {
      const labelFormat = label.format('YYYY-MM-DD')
      const start = dayjs(item.startDate).format('YYYY-MM-DD')
      const end = dayjs(item.endDate).format('YYYY-MM-DD')

      if (labelFormat === start && labelFormat === end) {
        datasets.push({
          data: [[dayjs(item.startDate), dayjs(item.endDate)]],
          backgroundColor,
          borderColor,
          borderWidth
        })
      }
    })
  })

  console.log(datasets)

  // const datasets = [
  //   {
  //     data: [['2020-11-20 17:27:21', '2020-11-20 17:27:45']],
  //     backgroundColor,
  //     borderColor,
  //     borderWidth
  //   },
  //   {
  //     data: [[dayjs('2020-11-20 17:00'), dayjs('2020-11-20 21:00')]],
  //     backgroundColor,
  //     borderColor,
  //     borderWidth
  //   }
  // ]

  onMounted(() => {
    const context = ctx.value.getContext('2d')

    chart.value = new Chart(context, {
      type: 'horizontalBar',
      data: {
        labels: labels.map(item => item.format('MM/DD')),
        datasets: datasets
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'HH:mm',
                stepSize: 2,
                tooltipFormat: 'YYYY-MM-DD HH:mm',
                displayFormats: {
                  hour: 'HH:mm'
                }
              },
              ticks: {
                min: '00:00',
                max: '24:00'
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              const datasetIndex = item.datasetIndex
              const index = item.index
              const start = data.datasets[datasetIndex].data[index][0].format('HH:mm')
              const end = data.datasets[datasetIndex].data[index][1].format('HH:mm')

              console.log(item, data)

              return `${start} ~ ${end}`
            }
          }
        }
      }
    })
  })

  return {
    ctx
  }
}
</script>
