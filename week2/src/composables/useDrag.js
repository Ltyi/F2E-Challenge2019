import { reactive, inject, nextTick } from 'vue'
import { removeHintBorder } from '@/util/hintBorder'

/**
* 牌組拖曳功能
*/

export default function useDrag(tempDeck, orderDeck, unOrderDeck) {
  const _ = inject('_')

  const onDragSource = reactive({
    deckIdx: null,
    cardIdx: null
  })

  const record = reactive([])

  // 將 unOrderDeck 區分可拖曳與否
  const handleCardDisabled = () => {
    unOrderDeck.forEach((item) => {
      if (item.length) {
        const range = { min: null, max: item.length }

        for (let i = item.length - 1; i >= 0; i--) {
          if (i - 1 === -1) break

          const curr = {
            number: item[i].number,
            color: item[i].color
          }

          const prev = {
            number: item[i - 1].number,
            color: item[i - 1].color
          }

          if (prev.number === curr.number + 1 && prev.color !== curr.color) {
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
      }
    })
  }

  // @start for unOrderDeck
  const dragStart = (e, deckIdx) => {
    onDragSource.deckIdx = deckIdx
    onDragSource.cardIdx = e.oldIndex

    // 當前拖曳卡片
    const idx = e.oldIndex

    // 來源牌組
    const sourceContent = e.from
    const sourceLength = e.from.children.length

    // 隱藏 HINT 邊框
    const hintContent = sourceContent.getElementsByClassName('hinting-content')
    hintContent.forEach(item => (item.style.display = 'none'))

    // 隱藏當前拖曳卡片後面的卡並將該張卡加入拖曳清單
    const cards = []

    if (idx !== sourceLength - 1) {
      for (let i = idx + 1; i < sourceLength; i++) {
        const card = sourceContent.children[i]
          .getElementsByTagName('img')[0]

        if (card) {
          const cloneNode = card.cloneNode(true)
          sourceContent.children[i].style.opacity = '0'
          cards.push(cloneNode)
        }
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
    // 若來源排組為 unOrderDeck
    if (unOrderDeck.includes(unOrderDeck[onDragSource.deckIdx])) {
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
        }

        sourceList.splice(min)
      }
    }

    resetHint()
  }

  const dragEnd = (e) => {
    handleCardDisabled()

    // 若有 Hinting 中的卡片恢復顯示
    const elements = document.getElementsByClassName('hinting-content')
    elements.forEach(item => (item.style.display = 'block'))

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
    if (unOrderDeck.includes(target.list)) {
      if (!target.element) return 1

      const targetColor = target.element.color
      const targetNumber = target.element.number

      if (target.list === unOrderDeck[onDragSource.deckIdx]) {
        return 1
      }

      if (sourceColor === targetColor || sourceNumber !== targetNumber - 1) {
        return false
      } else {
        saveRecord()
        return 1
      }
    }

    /**
    * 目標若為 tempDeck
    * 檢查目標陣列長度是否小於 1
    */
    if (tempDeck.includes(target.list)) {
      const length = unOrderDeck[onDragSource.deckIdx].length

      if (onDragSource.cardIdx === length - 1) {
        if (target.list.length < 1) {
          saveRecord()
          return 1
        } else {
          return false
        }
      } else {
        return false
      }
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
        if (sourceType === key && sourceNumber === targetNumber + 1) {
          saveRecord()
          return 1
        } else {
          return false
        }
      }
    }
  }

  const saveRecord = () => {
    // 紀錄移動前的陣列狀態
    record.unshift({
      unOrderDeck: _.cloneDeep(unOrderDeck),
      orderDeck: _.cloneDeep(orderDeck),
      tempDeck: _.cloneDeep(tempDeck)
    })
  }

  const removeRecord = () => {
    record.splice(0, 1)
  }

  const resetHint = () => {
    unOrderDeck.forEach(item => {
      item.forEach(card => (card.hint = false))
    })

    tempDeck.forEach(item => {
      item.forEach(card => (card.hint = false))
    })

    nextTick(() => {
      removeHintBorder()
    })
  }

  return {
    record,
    removeRecord,
    dragStart,
    onDrag,
    dragAdd,
    dragEnd,
    dragMove,
    handleCardDisabled
  }
}
