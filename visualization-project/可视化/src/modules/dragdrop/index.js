import $ from 'jquery'

class DragDrop {
  constructor(opts = {}) {
    this.opts = opts

    this.initDrag()
    this.initDrop()
  }

  initDrag() {
    let { elem, parentSelector } = this.opts.drag
    this.elemDrag = null

    if (parentSelector) {
      this.elemDrag = $(document.body)
      this.elemDrag.on('dragstart.dragdrop', `${parentSelector} ${elem}`,
        this.handleDragStart.bind(this))
    } else {
      this.elemDrag = $(elem)
      this.elemDrag.on('dragstart.dragdrop', this.handleDragStart.bind(this))
    }
  }

  handleDragStart(e) {
    if (this.opts.drag.onStart) {
      e.originalEvent.dataTransfer.effectAllowed = 'move'
      this.opts.drag.onStart(e.originalEvent, e.currentTarget)
    }
  }

  initDrop() {
    let $elem = $(this.opts.drop.elem)
    this.elemDrop = $elem
    let elem = $elem[0]

    $elem.on('dragover.dragdrop', (e) => {
      let event = e.originalEvent
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      elem.classList.add('over')
    })
      .on('drop', (e) => {
        let event = e.originalEvent
        let text = event.dataTransfer.getData('Text')
        this.opts.drop.onDrop(event, text)
      })
  }

  destroy() {
    this.elemDrag
      .off('dragstart.dragdrop')

    this.elemDrop
      .off('dragover.dragdrop')
      .off('drop.dragdrop')
  }
}

export default DragDrop
