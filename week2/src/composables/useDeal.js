import { reactive, inject } from 'vue'

/**
 * 牌組功能
 */

export default function useDeal() {
  const _ = inject('_')

  let unOrderDeckCopy = []
  const unOrderDeck = reactive([[], [], [], [], [], [], [], []])
  const tempDeck = reactive([[], [], [], []])
  const orderDeck = reactive({
    S: [],
    H: [],
    D: [],
    C: []
  })
  const types = ['S', 'H', 'D', 'C']

  // 重置
  const reset = () => {
    unOrderDeck.length = 0
    tempDeck.length = 0

    unOrderDeck.push([], [], [], [], [], [], [], [])
    tempDeck.push([], [], [], [])

    for (const key in orderDeck) {
      orderDeck[key].length = 0
      orderDeck[key].push([])
    }
  }

  // 開始新遊戲
  const newGame = () => {
    reset()
    init()

    // 記住當前牌局，當按下重新開始時回復此牌組設定
    unOrderDeckCopy = _.cloneDeep(unOrderDeck)
  }

  // 重新開始
  const restart = () => {
    reset()

    const oldArr = _.cloneDeep(unOrderDeckCopy)
    unOrderDeck.length = 0
    unOrderDeck.push(...oldArr)
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
    unOrderDeck.forEach((item, i) => {
      const length = i < 4 ? 7 : 6
      const slice = cards.slice(0, length)

      item.push(...slice)
      cards.splice(0, length)
    })
  }

  return { tempDeck, orderDeck, unOrderDeck, newGame, restart }
}
