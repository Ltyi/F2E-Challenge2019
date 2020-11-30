<template>
  <canvas ref="ctx" width="100" height="100"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js'

// 可複用功能
import useMissionList from '@/composables/useMissionList'
import usePlanList from '@/composables/usePlanList'

export default {
  name: 'PieChart'
}

// 任務完成列表/計畫列表
const { missionWeekList } = useMissionList()
const { planList } = usePlanList()

// 圖表
export const { ctx } = useChart()

function useChart() {
  const ctx = ref(null)
  const chart = ref(null)

  // 圖表資料
  const labels = getLabels()
  const data = getData()

  function getLabels() {
    const labels = planList.value.map(item => {
      return {
        id: item.planID,
        title: item.title,
        color: item.color === 'yellow' ? '#ffc02a' : '#50e3c2',
        missions: []
      }
    })

    labels.push({
      id: '0',
      title: '其他',
      color: '#ff6d6d',
      missions: []
    })

    return labels
  }

  function getData() {
    const doneList = missionWeekList.value.filter(x => x.done)

    doneList.forEach(x => {
      const idx = labels.findIndex(o => o.id === x.planID)
      const otherIdx = labels.findIndex(o => o.id === '0')

      labels[idx === -1 ? otherIdx : idx].missions.push(x)
    })

    return labels.map(item => item.missions.length)
  }

  // 圖表資料嵌入
  onMounted(() => {
    const context = ctx.value.getContext('2d')

    chart.value = new Chart(context, {
      type: 'pie',
      data: {
        labels: labels.map(item => item.title),
        datasets: [
          {
            data: data,
            backgroundColor: labels.map(item => item.color)
          }
        ]
      },
      options: {
        responsive: true
      }
    })
  })

  return { ctx }
}
</script>
