export const removeHintBorder = () => {
  const elements = document.getElementsByClassName('hinting-content')

  while (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      const parentNode = elements[i].parentNode
      parentNode.removeChild(elements[i])
    }
  }
}

export const insertHintBorder = () => {
  const elements = document.getElementsByClassName('hinting')

  elements.forEach(item => {
    const indexs = {
      start: null,
      end: item.parentElement.children.length - 1
    }

    const position = {
      top: null,
      bottom: null
    }

    item.parentElement.children.forEach((card, idx) => {
      if (card.classList.contains('hinting')) {
        indexs.start = idx
      }
    })

    const startCard = item.parentElement.children[indexs.start]
    const endCard = item.parentElement.children[indexs.end]

    position.top = startCard.getBoundingClientRect().top
    position.bottom = endCard.getBoundingClientRect().bottom

    const div = document.createElement('div')

    div.style.height = `${position.bottom - position.top}px`
    div.style.top = startCard.style.top
    div.classList.add(
      'hinting-content',
      'absolute',
      'w-full',
      'border-2',
      'border-yellow',
      'rounded-md',
      'pointer-events-none'
    )

    item.parentElement.appendChild(div)
  })
}
