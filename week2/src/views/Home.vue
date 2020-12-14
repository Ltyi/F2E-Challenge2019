<template>
  <div class="container mx-auto flex flex-col h-full">
    <div class="flex justify-between my-8">
      <div
        v-for="(deck, deckIdx) in tempDeck"
        :key="deckIdx"
        class="flex flex-col items-center"
      >
        <div class="w-card h-card rounded-md border border-white">
        </div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <img :src="require('@/assets/kings/king_happy.png')" class="w-king">
        <div class="tracking-widest text-black font-bold text-sm">
          FREECELL
        </div>
      </div>

      <div
        v-for="(deck, deckIdx) in orderDeck"
        :key="deckIdx"
        class="flex flex-col items-center"
      >
        <div
          class="w-card h-card rounded-md bg-white opacity-60 bg-no-repeat bg-center bg-35"
          :class="{
            'bg-S': deckIdx === 0,
            'bg-H': deckIdx === 1,
            'bg-D': deckIdx === 2,
            'bg-C': deckIdx === 3
          }"
        >
        </div>
      </div>
    </div>

    <div class="flex justify-between h-full">
      <div
        v-for="(deck, deckIdx) in unOrderDeck"
        :key="deckIdx"
        class="flex flex-col items-center"
      >
        <draggable
          class="relative h-full w-card"
          :list="deck"
          :group="{ name: 'unOrder' }"
          :sort="false"
          item-key="fileName"
          filter=".disabled-drag"
          :force-fallback="true"
          :fallback-on-body="true"
          :move="move"
          @start="start($event, deckIdx)"
          @add="add($event, deck)"
          @end="end"
        >
          <template #item="{ element, index }">
            <VCard
              :file-name="element.fileName"
              :style="{ top: `${index * 35}px` }"
              class="absolute mx-auto"
              :class="{ 'disabled-drag': element.disabled, 'cursor-pointer': !element.disabled }"
            ></VCard>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, reactive } from 'vue'
import draggable from 'vuedraggable'

// 組件
import VCard from '@/components/VCard'

export default {
  name: 'Home',

  components: {
    VCard,
    draggable
  },

  setup() {
    // 發牌
    const { tempDeck, orderDeck, unOrderDeck } = useDeal()

    const onDragSource = reactive({
      deckIdx: null,
      cardIdx: null
    })

    // 將 unOrderDeck 區分可拖曳與否
    const handleCardDisabled = () => {
      unOrderDeck.forEach(item => {
        const range = { min: null, max: item.length }

        for (let i = item.length - 1; i >= 0; i--) {
          if (i - 1 === -1) break

          const curr = item[i].number
          const prev = item[i - 1].number

          if (prev === curr + 1) {
            range.min = i - 1
          } else {
            break
          }
        }

        if (range.min) {
          for (let i = range.min; i < range.max; i++) {
            item[i].disabled = false
          }
        } else {
          item[item.length - 1].disabled = false
        }
      })
    }

    const start = (e, deckIdx) => {
      onDragSource.deckIdx = deckIdx
      onDragSource.cardIdx = e.oldIndex

      // 當前拖曳卡片
      const idx = e.oldIndex

      // 來源牌組
      const sourceContent = e.from
      const sourceLength = e.from.children.length

      // 取得當前拖曳卡片後面的卡
      const cards = []

      if (idx !== sourceLength - 1) {
        for (let i = idx + 1; i < sourceLength; i++) {
          const card = sourceContent.children[i].getElementsByTagName('img')[0].cloneNode(true)
          // 將該張卡隱藏
          sourceContent.children[i].style.opacity = '0'
          // 將該張卡加入拖曳清單
          cards.push(card)
        }
      }

      // 將已排序的卡片一併拖曳
      const dragContent = document.getElementsByClassName('sortable-fallback')[0]

      cards.forEach((card, i) => {
        card.style.position = 'absolute'
        card.style.top = `${(i + 1) * 35}px`

        dragContent.appendChild(card)
      })
    }

    const add = (e, targetList) => {
      console.log('add', e)

      // 來源牌組
      const sourceList = unOrderDeck[onDragSource.deckIdx]
      const sourceLength = sourceList.length

      // 若當前拖曳卡片非牌組最後一張牌 (這邊 sourceContent 已經是移除後的陣列，所以 sourceLength 不用 -1)
      // 將拖曳的牌組一起加入目標牌組，來源牌組也需刪除
      if (onDragSource.cardIdx !== sourceLength) {
        const min = onDragSource.cardIdx
        const max = sourceLength

        for (let i = min; i < max; i++) {
          targetList.push(sourceList[i])
          sourceList.splice(i, 1)
        }
      }
    }

    const end = e => {
      handleCardDisabled()

      // 結束拖曳時將原先隱藏的卡片恢復顯示
      e.from.children.forEach(item => {
        item.style.opacity = '1'
      })
    }

    const move = e => {
      const source = e.draggedContext
      const target = e.relatedContext

      const sourceColor = source.element.color
      const sourceNumber = source.element.number

      const targetColor = target.element.color
      const targetNumber = target.element.number

      // Target List 跟原本移除的相同則允許
      if (target.list === unOrderDeck[onDragSource.deckIdx]) {
        return 1
      }

      // 比對牌色/數字
      if (sourceColor === targetColor || sourceNumber !== targetNumber - 1) {
        return false
      } else {
        return 1
      }
    }

    onMounted(() => {
      handleCardDisabled()
    })

    return {
      start,
      add,
      end,
      move,
      tempDeck,
      orderDeck,
      unOrderDeck
    }
  }
}

/**
 * 發牌功能
 * 建立52張牌組，洗牌後分別打進8個陣列
 * 前4個陣列7張牌，後4個陣列6張牌
 */
function useDeal() {
  const _ = inject('_')

  const tempDeck = reactive([[], [], [], []])
  const orderDeck = reactive([[], [], [], []])
  const unOrderDeck = reactive([[], [], [], [], [], [], [], []])
  const types = ['S', 'H', 'D', 'C']

  let cards = []

  // 建立牌組
  types.forEach((item) => {
    for (let i = 0; i < 13; i++) {
      const fileName = `${item}${i + 1}`

      cards.push({
        fileName,
        color: item === 'S' || item === 'C' ? 'black' : 'red',
        number: i + 1,
        disabled: true
      })
    }
  })

  // 洗牌
  cards = _.shuffle(cards)

  // 發牌
  unOrderDeck.forEach((item, i) => {
    const length = i < 4 ? 7 : 6
    const slice = cards.slice(0, length)

    item.push(...slice)
    cards.splice(0, length)
  })

  return { tempDeck, orderDeck, unOrderDeck }
}

/**
 * 牌組拖曳功能
 */
// function useDrag() {}
</script>

<style scoped>
/* [draggable="true"] {
  user-select: none;
} */

.sortable-fallback {
  opacity: 1 !important;
}

.sortable-ghost {
  opacity: 0 !important;
}
</style>
