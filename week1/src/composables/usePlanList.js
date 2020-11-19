import store from '@/store'
import { computed } from 'vue'

export default function usePlanList() {
  const planList = computed(() => store.state.plans.planList)

  return {
    planList
  }
}
