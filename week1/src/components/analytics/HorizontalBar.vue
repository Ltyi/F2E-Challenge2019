<template>
  <canvas ref="ctx" width="400" height="100"></canvas>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import Chart from 'chart.js'

// 可複用功能
import useMissionList from '@/composables/useMissionList'

export default {
  name: 'HorizontalBar',

  setup() {
    // 圖表處理
    const { ctx } = useChart()

    return { ctx }
  }
}

function useChart() {
  const dayjs = inject('dayjs')
  const ctx = ref(null)
  const chart = ref(null)

  // 任務完成列表
  const { missionDoneAllList } = useMissionList()

  // 圖表資料
  const labels = getLabels()
  const datasets = getDatasets()

  function getLabels() {
    // 當週區間
    const labels = []
    const start = dayjs().startOf('week')

    for (let i = 0; i < 7; i++) {
      labels.push(start.add(i, 'd'))
    }

    return labels
  }

  function getDatasets() {
    const backgroundColor = '#ff6d6d'
    const borderColor = '#e54343'
    const borderWidth = 1
    const weekData = []
    const datasets = []

    labels.forEach(label => {
      const labelFormat = label.format('YYYY-MM-DD')

      missionDoneAllList.value.forEach(item => {
        const start = dayjs(item.startDate).format('YYYY-MM-DD')
        const end = dayjs(item.endDate).format('YYYY-MM-DD')

        if (start === labelFormat && end === labelFormat) {
          const idx = weekData.findIndex(x => x.date === labelFormat)
          const from = dayjs(item.startDate).format('YYYY-MM-DD 00:00:00')
          const a = dayjs.duration(dayjs(item.startDate).diff(from)).asSeconds()
          const b = dayjs.duration(dayjs(item.endDate).diff(from)).asSeconds()

          if (idx === -1) {
            weekData.push({
              date: labelFormat,
              data: [[a, b]]
            })
          } else {
            weekData[idx].data.push([a, b])
          }
        }
      })
    })

    weekData.forEach(item => {
      const labelIdx = labels.findIndex(x => dayjs(x).format('YYYY-MM-DD') === item.date)

      item.data.forEach((data, dataIdx) => {
        if (datasets[dataIdx]) {
          datasets[dataIdx].data[labelIdx] = data
        } else {
          const arr = []
          arr[labelIdx] = data

          datasets.push({
            data: arr,
            backgroundColor,
            borderColor,
            borderWidth
          })
        }
      })
    })

    return datasets
  }

  // 圖表資料嵌入
  onMounted(() => {
    const context = ctx.value.getContext('2d')

    chart.value = new Chart(context, {
      type: 'horizontalBar',
      data: {
        labels: labels.map(item => item.format('MM/DD')),
        datasets: datasets
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
                max: 86400,
                stepSize: 7200,
                callback: label => {
                  return `${dayjs.duration(label * 1000).asHours()}:00`
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              const datasetIndex = item.datasetIndex
              const index = item.index
              const start = data.datasets[datasetIndex].data[index][0]
              const end = data.datasets[datasetIndex].data[index][1]

              const a = new Date(start * 1000).toISOString().substr(11, 5)
              const b = new Date(end * 1000).toISOString().substr(11, 5)

              return `${a} ~ ${b}`
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
