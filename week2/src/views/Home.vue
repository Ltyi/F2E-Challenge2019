<template>
  <div class="container mx-auto flex flex-col justify-between h-full">
    <div class="flex justify-between my-8">
      <div
        v-for="(deck, deckIdx) in tempDeck"
        :key="deckIdx"
        class="flex flex-col items-center"
      >
        <div class="w-card h-card relative">
          <div
            class="absolute w-full h-full top-0 left-0 rounded-md border-2 border-white"
          ></div>

          <draggable
            class="absolute w-full h-full"
            :list="deck"
            :group="{ name: 'deck' }"
            :sort="false"
            item-key="fileName"
            :force-fallback="true"
            :fallback-on-body="true"
            :move="dragMove"
            @start="onDrag()"
            @add="dragAdd"
            @end="dragEnd"
          >
            <template #item="{ element, index }">
              <v-card
                :file-name="element.fileName"
                :style="{ top: `${index * 25}px` }"
                class="cursor-pointer"
              ></v-card>
            </template>
          </draggable>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center select-none">
        <img :src="require('@/assets/kings/king_happy.png')" class="w-king" />
        <div class="tracking-widest text-black font-bold text-sm">
          FREECELL
        </div>
      </div>

      <div
        v-for="(deck, key) in orderDeck"
        :key="key"
        class="flex flex-col items-center"
      >
        <div class="w-card h-card relative">
          <div
            class="absolute w-full h-full top-0 left-0 rounded-md bg-white opacity-60 bg-no-repeat bg-center bg-35"
            :class="{
              'bg-S': key === 'S',
              'bg-H': key === 'H',
              'bg-D': key === 'D',
              'bg-C': key === 'C'
            }"
          ></div>

          <draggable
            class="absolute w-full h-full"
            :list="orderDeck[key]"
            :group="{ name: 'deck' }"
            :sort="false"
            item-key="fileName"
            :force-fallback="true"
            :fallback-on-body="true"
            :move="dragMove"
            @start="onDrag()"
            @end="dragEnd"
          >
            <template #item="{ element }">
              <v-card
                :file-name="element.fileName"
                class="absolute top-0 left-0 cursor-pointer"
              ></v-card>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <div class="flex justify-between h-full overflow-auto">
      <div
        v-for="(deck, deckIdx) in unOrderDeck"
        :key="deckIdx"
        class="flex flex-col items-center"
      >
        <draggable
          class="relative h-full w-card"
          :list="deck"
          :group="{ name: 'deck' }"
          :sort="false"
          item-key="fileName"
          filter=".disabled-drag"
          :force-fallback="true"
          :fallback-on-body="true"
          :move="dragMove"
          @start="dragStart($event, deckIdx)"
          @add="dragAdd($event, deck)"
          @end="dragEnd"
        >
          <template #item="{ element, index }">
            <v-card
              :file-name="element.fileName"
              :style="{ top: `${index * 25}px` }"
              class="absolute mx-auto"
              :class="{
                'disabled-drag': element.disabled,
                'cursor-pointer': !element.disabled,
                'hinting': element.hint,
              }"
            ></v-card>
          </template>
        </draggable>
      </div>
    </div>

    <footer class="flex justify-between items-center border-t border-cccccc py-5">
      <!-- <div class="flex items-center">
        <div class="flex justify-center items-center w-10 h-10 rounded-full border-2 cursor-pointer">
          <img :src="require('@/assets/footer/info.svg')">
        </div>

        <div class="font-bold text-sm">
          <span class="ml-4">TIME: 00:00</span>
          <span class="ml-4">SCORE</span>
        </div>
      </div> -->
      <div class="flex items-center">
        <!-- <div class="flex justify-center items-center w-10 h-10 rounded-full border-2 cursor-pointer">
          <img :src="require('@/assets/footer/info.svg')">
        </div> -->
      </div>

      <div>
        <v-btn class="mr-4" @click="newGameModalHandle">
          NEW GAME
        </v-btn>

        <!-- <v-btn class="mr-4" @click="restart(), handleCardDisabled()">
          RESTART
        </v-btn>

        <v-btn class="mr-4" @click="hint">
          HINT
        </v-btn>

        <v-btn @click="undo(record, removeRecord)">
          UNDO
        </v-btn> -->
      </div>
    </footer>

    <!-- New Game Modal -->
    <modal-new-game v-model="newGameModal" @newGame="newGameClick"></modal-new-game>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'

// 可組合
import useDeal from '@/composables/useDeal'
import useDrag from '@/composables/useDrag'

// 組件
import VCard from '@/components/VCard'
import VBtn from '@/components/VBtn'
import ModalNewGame from '@/components/ModalNewGame'

export default {
  name: 'Home',

  components: {
    VCard,
    VBtn,
    ModalNewGame,
    draggable
  },

  setup() {
    // 牌組功能、拖曳
    const { tempDeck, orderDeck, unOrderDeck, newGame, restart, undo, hint } = useDeal()

    const {
      dragStart,
      onDrag,
      dragAdd,
      dragEnd,
      dragMove,
      handleCardDisabled,
      record,
      removeRecord
    } = useDrag(tempDeck, orderDeck, unOrderDeck)

    // Modals
    const newGameModal = ref(false)

    const newGameModalHandle = () => {
      newGameModal.value = !newGameModal.value
    }

    const newGameClick = () => {
      newGame()
      handleCardDisabled()
      newGameModal.value = false
    }

    onMounted(() => {
      newGame()
      handleCardDisabled()
    })

    return {
      newGameModal,
      newGameModalHandle,
      newGameClick,
      restart,
      record,
      removeRecord,
      undo,
      hint,
      dragStart,
      dragAdd,
      dragEnd,
      dragMove,
      onDrag,
      handleCardDisabled,
      tempDeck,
      orderDeck,
      unOrderDeck
    }
  }
}
</script>

<style lang="postcss" scoped>
.sortable-fallback {
  opacity: 1 !important;
}

.sortable-ghost {
  opacity: 0 !important;
}
</style>
