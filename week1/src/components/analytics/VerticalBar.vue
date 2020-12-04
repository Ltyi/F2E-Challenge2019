<template>
  <canvas ref="ctx" width="400" height="100"></canvas>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import Chart from 'chart.js'

// 可複用功能
import useMissionList from '@/composables/useMissionList'

export default {
  name: 'VerticalBar',

  setup() {
    const dayjs = inject('dayjs')

    const { missionWeekList } = useMissionList()
    const { ctx } = useChart(dayjs, missionWeekList)

    return { ctx }
  }
}

function useChart(dayjs, missionWeekList) {
  const ctx = ref(null)
  const chart = ref(null)

  const labels = getLabels()
  const data = getData()

  function getLabels() {
    // 當週區間
    const labels = []
    const start = dayjs().startOf('week')

    for (let i = 0; i < 7; i++) {
      labels.push({
        date: start.add(i, 'd').format('MM/DD'),
        missions: []
      })
    }

    return labels
  }

  function getData() {
    const doneList = missionWeekList.value.filter(x => x.done)

    doneList.forEach(x => {
      const idx = labels.findIndex(o => o.date === dayjs(x.createdDate).format('MM/DD'))
      if (idx !== -1) labels[idx].missions.push(x)
    })

    return labels.map(item => item.missions.length)
  }

  onMounted(() => {
    const context = ctx.value.getContext('2d')

    chart.value = new Chart(context, {
      type: 'bar',
      data: {
        labels: labels.map(item => item.date),
        datasets: [
          {
            data: data,
            backgroundColor: '#ff6d6d'
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1
              }
            }
          ]
        }
      }
    })
  })

  return { ctx }
}
</script>
