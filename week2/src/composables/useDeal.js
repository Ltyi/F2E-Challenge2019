import { reactive, inject, nextTick } from 'vue'
import { removeHintBorder, insertHintBorder } from '@/util/hintBorder'

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
      orderDeck[key] = []
    }

    nextTick(() => {
      removeHintBorder()
    })
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

  // UNDO
  const undo = (record, removeRecord) => {
    if (!record.length) return

    unOrderDeck.length = 0
    tempDeck.length = 0

    unOrderDeck.push(...record[0].unOrderDeck)
    tempDeck.push(...record[0].tempDeck)
    Object.assign(orderDeck, record[0].orderDeck)

    removeRecord()
  }

  // HINT
  const hint = () => {
    // 檢查 unOrderDeck 可排序的號碼
    for (let i = 0; i < unOrderDeck.length; i++) {
      const arr = unOrderDeck[i].filter((item) => !item.disabled)

      for (let j = 0; j < arr.length; j++) {
        const from = arr[j]
        const to = findHintCard(from)

        if (to) {
          if (!from.hint && !to.hint) {
            showHint(from, to)
          }
          return
        }
      }
    }
  }

  const findHintCard = (from) => {
    for (let i = 0; i < unOrderDeck.length; i++) {
      const idx = unOrderDeck[i].length - 1
      const currentCard = unOrderDeck[i][idx]

      if (from.fileName === currentCard.fileName) {
        continue
      }

      if (from.color !== currentCard.color && from.number === currentCard.number - 1) {
        return currentCard
      }
    }
  }

  const showHint = (from, to) => {
    unOrderDeck.forEach((item) => {
      const fromIdx = item.findIndex((x) => x.fileName === from.fileName)
      const toIdx = item.findIndex((x) => x.fileName === to.fileName)

      if (fromIdx !== -1) {
        item[fromIdx].hint = true
      }

      if (toIdx !== -1) {
        item[toIdx].hint = true
      }
    })

    nextTick(() => {
      insertHintBorder()
    })
  }

  // const closeHint = () => {
  //   unOrderDeck.forEach((item) => {
  //     item.forEach((card) => {
  //       card.hint = false
  //     })
  //   })
  // }

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

  return { tempDeck, orderDeck, unOrderDeck, newGame, restart, undo, hint }
}
