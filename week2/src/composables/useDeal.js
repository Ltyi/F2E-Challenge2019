import { ref, inject } from 'vue'

/**
 * 牌組功能
 */

export default function useDeal() {
  const _ = inject('_')

  let unOrderDeckCopy = []
  const unOrderDeck = ref([[], [], [], [], [], [], [], []])
  const tempDeck = ref([[], [], [], []])
  const orderDeck = ref({
    S: [],
    H: [],
    D: [],
    C: []
  })
  const types = ['S', 'H', 'D', 'C']

  // 重置
  const reset = () => {
    unOrderDeck.value = [[], [], [], [], [], [], [], []]
    tempDeck.value = [[], [], [], []]
    orderDeck.value = {
      S: [],
      H: [],
      D: [],
      C: []
    }
  }

  // 開始新遊戲
  const newGame = () => {
    reset()
    init()

    // 記住當前牌局，當按下重新開始時回復此牌組設定
    unOrderDeckCopy = _.cloneDeep(unOrderDeck.value)
  }

  // 重新開始
  const restart = () => {
    unOrderDeck.value = _.cloneDeep(unOrderDeckCopy)
    tempDeck.value = [[], [], [], []]
    orderDeck.value = {
      S: [],
      H: [],
      D: [],
      C: []
    }
  }

  // 發牌
  const init = () => {
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
    unOrderDeck.value.forEach((item, i) => {
      const length = i < 4 ? 7 : 6
      const slice = cards.slice(0, length)

      item.push(...slice)
      cards.splice(0, length)
    })
  }

  return { tempDeck, orderDeck, unOrderDeck, newGame, restart }
}
