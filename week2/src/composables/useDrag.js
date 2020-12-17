import { reactive } from 'vue'

/**
* 牌組拖曳功能
*/

export default function useDrag(tempDeck, orderDeck, unOrderDeck) {
  const onDragSource = reactive({
    deckIdx: null,
    cardIdx: null
  })

  // 將 unOrderDeck 區分可拖曳與否
  const handleCardDisabled = () => {
    unOrderDeck.value.forEach((item) => {
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

  const dragStart = (e, deckIdx) => {
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
      img.style.top = `${i * 25}px`
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

  const dragAdd = (e, targetList) => {
    // 來源牌組
    const sourceList = unOrderDeck.value[onDragSource.deckIdx]
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

  const dragEnd = (e) => {
    handleCardDisabled()

    // 初始化拖曳中牌組
    onDragSource.cardIdx = null
    onDragSource.deckIdx = null

    // 結束拖曳時將原先隱藏的卡片恢復顯示
    e.from.children.forEach((item) => {
      item.style.opacity = '1'
    })
  }

  const dragMove = (e) => {
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
    if (unOrderDeck.value.includes(target.list)) {
      const targetColor = target.element.color
      const targetNumber = target.element.number

      if (target.list === unOrderDeck.value[onDragSource.deckIdx]) {
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
    if (tempDeck.value.includes(target.list)) {
      return target.list.length < 1 ? 1 : false
    }

    /**
    * 目標若為 orderDeck
    * 花色必須相同、號碼必須遞增
    */
    for (const [key, value] of Object.entries(orderDeck.value)) {
      let targetNumber = 0

      if (target.list.length) {
        targetNumber = target.element.number
      }

      if (value === target.list) {
        return sourceType === key && sourceNumber === targetNumber + 1 ? 1 : false
      }
    }
  }

  return {
    dragStart,
    onDrag,
    dragAdd,
    dragEnd,
    dragMove,
    handleCardDisabled
  }
}
