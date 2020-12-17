<template>
  <div class="container mx-auto flex flex-col h-full">
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
            :move="move"
            @start="onDrag()"
            @end="end"
          >
            <template #item="{ element, index }">
              <VCard
                :file-name="element.fileName"
                :style="{ top: `${index * 35}px` }"
                class="cursor-pointer"
              ></VCard>
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
            :list="deck"
            :group="{ name: 'deck' }"
            :sort="false"
            item-key="fileName"
            :force-fallback="true"
            :fallback-on-body="true"
            :move="move"
            @start="onDrag()"
            @end="end"
          >
            <template #item="{ element }">
              <VCard
                :file-name="element.fileName"
                class="absolute top-0 left-0 cursor-pointer"
              ></VCard>
            </template>
          </draggable>
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
          :group="{ name: 'deck' }"
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
              :class="{
                'disabled-drag': element.disabled,
                'cursor-pointer': !element.disabled
              }"
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
    // 發牌、拖曳
    const { tempDeck, orderDeck, unOrderDeck } = useDeal()
    const { start, onDrag, add, end, move } = useDrag(tempDeck, orderDeck, unOrderDeck)

    return {
      start,
      onDrag,
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

  const unOrderDeck = reactive([[], [], [], [], [], [], [], []])
  const tempDeck = reactive([[], [], [], []])
  const orderDeck = reactive({
    S: [],
    H: [],
    D: [],
    C: []
  })
  const types = ['S', 'H', 'D', 'C']

  let cards = []

  // 建立牌組
  types.forEach((item) => {
    for (let i = 0; i < 13; i++) {
      const fileName = `${item}${i + 1}`

      cards.push({
        fileName,
        type: item,
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
function useDrag(tempDeck, orderDeck, unOrderDeck) {
  const onDragSource = reactive({
    deckIdx: null,
    cardIdx: null
  })

  // 將 unOrderDeck 區分可拖曳與否
  const handleCardDisabled = () => {
    unOrderDeck.forEach((item) => {
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

    // 隱藏當前拖曳卡片後面的卡並將該張卡加入拖曳清單
    const cards = []

    if (idx !== sourceLength - 1) {
      for (let i = idx + 1; i < sourceLength; i++) {
        const card = sourceContent.children[i]
          .getElementsByTagName('img')[0]
          .cloneNode(true)

        sourceContent.children[i].style.opacity = '0'
        cards.push(card)
      }
    }

    onDrag(cards)
  }

  const onDrag = (arr = []) => {
    const dragContent = document.getElementsByClassName('sortable-fallback')[0]
    const position = { top: 0, bottom: 0 }

    arr.forEach((card, i) => {
      dragContent.appendChild(card)
    })

    dragContent.children.forEach((img, i, arr) => {
      img.style.position = 'absolute'
      img.style.top = `${i * 35}px`
      img.classList.add('border', 'border-gray', 'rounded-md', 'bg-white')

      if (i === 0) {
        position.top = img.getBoundingClientRect().top
      }

      if (i === dragContent.children.length - 1) {
        position.bottom = img.getBoundingClientRect().bottom
      }
    })

    dragContent.classList.remove('border', 'bg-white', 'border-gray')
    dragContent.style.height = `${position.bottom - position.top + 2}px`

    // 嵌入邊框效果
    const div = document.createElement('div')
    div.classList.add(
      'absolute',
      'w-full',
      'h-full',
      'border-2',
      'border-yellow',
      'rounded-md'
    )

    dragContent.appendChild(div)
  }

  const add = (e, targetList) => {
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

  const end = (e) => {
    handleCardDisabled()

    // 初始化拖曳中牌組
    onDragSource.cardIdx = null
    onDragSource.deckIdx = null

    // 結束拖曳時將原先隱藏的卡片恢復顯示
    e.from.children.forEach((item) => {
      item.style.opacity = '1'
    })
  }

  const move = (e) => {
    const source = e.draggedContext
    const target = e.relatedContext

    const sourceColor = source.element.color
    const sourceNumber = source.element.number
    const sourceType = source.element.type

    /**
     * 目標若為 unOrderDeck
     * 若 target List 跟原本移除的相同則直接允許
     * 檢查未排序牌組間移動時比對牌色是否不同、數字是否遞減
     */
    if (unOrderDeck.includes(target.list)) {
      const targetColor = target.element.color
      const targetNumber = target.element.number

      if (target.list === unOrderDeck[onDragSource.deckIdx]) {
        return 1
      }

      if (sourceColor === targetColor || sourceNumber !== targetNumber - 1) {
        return false
      } else {
        return 1
      }
    }

    /**
     * 目標若為 tempDeck
     * 檢查目標陣列長度是否小於 1
     */
    if (tempDeck.includes(target.list)) {
      return target.list.length < 1 ? 1 : false
    }

    /**
     * 目標若為 orderDeck
     * 花色必須相同、號碼必須遞增
     */
    for (const [key, value] of Object.entries(orderDeck)) {
      let targetNumber = 0

      if (target.list.length) {
        targetNumber = target.element.number
      }

      if (value === target.list) {
        return sourceType === key && sourceNumber === targetNumber + 1 ? 1 : false
      }
    }
  }

  onMounted(() => {
    handleCardDisabled()
  })

  return {
    start,
    onDrag,
    add,
    end,
    move
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
