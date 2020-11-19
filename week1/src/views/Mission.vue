<template>
  <div class="flex h-full font-noto font-medium">
    <div class="flex flex-col w-4/12 p-16 h-full">
      <div class="flex items-center h-10 mb-12">
        <fa-icon
          fixed-width
          :icon="['fas', 'list-ul']"
          class="text-2xl mt-1 mr-6 text-gray-300"
        ></fa-icon>
        <span class="text-3xl font-bold text-gray-600">計畫任務</span>
      </div>

      <div class="flex-grow">
        <div
          class="flex items-center text-white text-lg py-3 px-6 bg-red-300 rounded-t-md"
        >
          <span>今日任務</span>

          <fa-icon
            fixed-width
            :icon="['fas', 'plus']"
            class="ml-auto cursor-pointer"
            @click="dialog.missionAdd = true"
          ></fa-icon>
        </div>

        <!-- 任務列表 -->
        <ul class="flex-grow">
          <li
            v-for="item in missionToDoList"
            :key="item.id"
            class="flex items-center py-4 px-6 bg-red-100 group leading-5 hover:bg-red-ffcdcd"
          >
            <span>{{ item.title }}</span>

            <!-- 移除 -->
            <span
              class="cursor-pointer hidden ml-auto group-hover:block"
              @click="missionRemove(item.id)"
            >
              <fa-icon :icon="['fas', 'times']" class="text-gray-500"></fa-icon>
            </span>
          </li>

          <li
            v-for="item in missionDoneList"
            :key="item.id"
            class="flex items-center py-4 px-6 bg-gray-200"
          >
            <span>{{ item.title }}</span>
            <span class="ml-auto text-green-base text-sm">已完成</span>
          </li>

          <li
            v-for="item in missionSkipList"
            :key="item.id"
            class="flex items-center py-4 px-6 bg-gray-200"
          >
            <span>{{ item.title }}</span>
            <span class="ml-auto text-red-base text-sm">已作廢</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="w-8/12 py-16 px-24 h-full bg-gray-100">
      <div
        class="flex items-center mb-12 text-lg text-gray-500 font-bold cursor-pointer"
        @click="dialog.planAdd = true"
      >
        <span>
          <fa-icon :icon="['fas', 'plus']" class="mr-4"></fa-icon>
        </span>
        <span>新增計畫</span>
      </div>

      <!-- 計畫列表 -->
      <div v-for="item in planList" :key="item.planID" class="mb-8">
        <div
          class="flex items-center font-medium text-white text-lg py-3 px-6 rounded-t-md"
          :class="{
            'bg-yellow-base': item.color === 'yellow',
            'bg-green-600': item.color === 'green'
          }"
        >
          <span>{{ item.title }}</span>

          <span class="ml-auto">
            <fa-icon
              fixed-width
              :icon="['fas', 'plus']"
              class="mr-2 cursor-pointer"
              @click="planMissionAdd(item.planID)"
            ></fa-icon>

            <fa-icon
              fixed-width
              :icon="['fas', 'times']"
              class="mr-2 cursor-pointer"
              @click="planRemove(item.planID)"
            ></fa-icon>
          </span>
        </div>

        <!-- 計畫任務列表 -->
        <ul>
          <li
            v-for="mission in item.missions"
            :key="mission.id"
            class="flex items-center py-4 px-6 group"
            :class="
              item.color === 'yellow'
                ? 'bg-yellow-100 hover:bg-yellow-200'
                : 'bg-green-300 hover:bg-green-400'
            "
          >
            <span>{{ mission.title }}</span>

            <!-- 匯入任務 / 移除 -->
            <div class="items-center hidden ml-auto group-hover:inline-flex">
              <span class="cursor-pointer text-gray-500" @click="missionImport(mission)">
                <fa-icon :icon="['fas', 'file-export']"></fa-icon>
                <span class="text-sm ml-3">匯入任務</span>
              </span>

              <span
                class="cursor-pointer text-gray-500 ml-5"
                @click="planMissionRemove(mission.planID, mission.id)"
              >
                <fa-icon :icon="['fas', 'times']"></fa-icon>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <!-- 新增任務 -->
      <MissionAdd v-model="dialog.missionAdd"></MissionAdd>

      <!-- 新增計畫 -->
      <PlanAdd v-model="dialog.planAdd"></PlanAdd>

      <!-- 新增計畫任務 -->
      <PlanMissionAdd
        v-model="dialog.planMissionAdd.show"
        v-model:planID="dialog.planMissionAdd.planID"
      ></PlanMissionAdd>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'

// 組件
import MissionAdd from '@/components/mission/MissionAdd'
import PlanAdd from '@/components/mission/PlanAdd'
import PlanMissionAdd from '@/components/mission/PlanMissionAdd'

// 可複用功能
import useMissionHandler from '@/composables/useMissionHandler'
import useMissionList from '@/composables/useMissionList'
import usePlanList from '@/composables/usePlanList'

export default {
  name: 'Mission',

  components: {
    PlanAdd,
    MissionAdd,
    PlanMissionAdd
  }
}

const store = useStore()

// 彈窗控制
export const dialog = reactive({
  planAdd: false,
  missionAdd: false,
  planMissionAdd: { show: false, planID: '' }
})

// 任務列表/處理
export const { missionImport, missionRemove } = useMissionHandler()
export const { missionToDoList, missionDoneList, missionSkipList } = useMissionList()

// 計畫列表
export const { planList } = usePlanList()
export const {
  planRemove,
  planMissionAdd,
  planMissionExport,
  planMissionRemove
} = usePlanHandler()

// 組件功能
function usePlanHandler() {
  const planRemove = planID => store.commit('plans/planRemove', planID)

  const planMissionAdd = planID => {
    dialog.planMissionAdd.show = true
    dialog.planMissionAdd.planID = planID
  }

  // 計畫任務刪除
  const planMissionRemove = (planID, id) => {
    const payload = { planID, id }
    store.commit('plans/planMissionRemove', payload)
  }

  return {
    planRemove,
    planMissionAdd,
    planMissionExport,
    planMissionRemove
  }
}
</script>
