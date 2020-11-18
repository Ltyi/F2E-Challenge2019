<template>
  <div class="flex h-full font-noto">
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
          class="flex items-center font-medium text-white text-lg py-3 px-6 bg-red-300 rounded-t-md"
        >
          <span>今日任務</span>

          <fa-icon
            fixed-width
            :icon="['fas', 'plus']"
            class="ml-auto cursor-pointer"
            @click="missionDialog.add = true"
          ></fa-icon>
        </div>

        <ul class="flex-grow">
          <li
            v-for="item in missionToDoList"
            :key="item.id"
            class="flex items-center py-3 px-6 bg-red-100 group leading-5 hover:bg-red-ffcdcd"
          >
            <span>{{ item.title }}</span>
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
            class="flex items-center py-3 px-6 bg-gray-200"
          >
            <span>{{ item.title }}</span>
            <span class="ml-auto text-green-base text-sm">已完成</span>
          </li>

          <li
            v-for="item in missionSkipList"
            :key="item.id"
            class="flex items-center py-3 px-6 bg-gray-200"
          >
            <span>{{ item.title }}</span>
            <span class="ml-auto text-red-base text-sm">已作廢</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="w-8/12 p-16 h-full bg-gray-100">
      <div class="flex items-center mb-12 text-lg text-gray-500 font-bold cursor-pointer">
        <span>
          <fa-icon :icon="['fas', 'plus']" class="mr-4"></fa-icon>
        </span>
        <span>新增計畫</span>
      </div>
    </div>

    <div>
      <!-- 新增任務 Dialog -->
      <base-dialog v-model="missionDialog.add">
        <div class="font-noto">
          <input
            v-model="missionTitle"
            type="text"
            placeholder="請輸入任務名稱"
            class="outline-none border-2 rounded px-4 py-2 w-full mb-4"
          />

          <div class="flex justify-end">
            <base-btn class="mr-2" color="red" @click="missionAdd">新增任務</base-btn>
            <base-btn @click="missionDialog.add = false">取消</base-btn>
          </div>
        </div>
      </base-dialog>
    </div>
  </div>
</template>

<script setup>
import useMissionHandler from '@/composables/useMissionHandler'
import useMissionList from '@/composables/useMissionList'

export default {
  name: 'Mission'
}

export const {
  missionDialog,
  missionTitle,
  missionAdd,
  missionRemove
} = useMissionHandler()

export const { missionToDoList, missionDoneList, missionSkipList } = useMissionList()
</script>
