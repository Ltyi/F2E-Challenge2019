<template>
  <div class="flex h-full">
    <div
      v-for="(deck, i) in unOrderDeck"
      :key="i"
      class="flex flex-col items-center w-2/4 p-4"
    >
      <div
        v-for="card in deck"
        :key="`${card.type}${card.number}`"
        class="flex justify-center items-center text-white rounded-lg w-14 h-20 mb-4"
        :class="card.color === 'black' ? 'bg-warmGray-600' : 'bg-red-600'"
      >
        {{ card.type.substring(0, 1) }}
        <br />
        {{ card.number }}
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive } from 'vue'

export default {
  name: 'Home',

  setup() {
    // 發牌
    const { unOrderDeck } = useDeal()

    return {
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
  const types = ['spade', 'heart', 'diamond', 'club']

  let cards = []

  // 建立牌組
  types.forEach((item) => {
    for (let i = 0; i < 13; i++) {
      cards.push({
        type: item,
        color: item === 'spade' || item === 'club' ? 'black' : 'red',
        number: i + 1
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

  return { unOrderDeck }
}
</script>
