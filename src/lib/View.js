import Component from './Component'

class View extends Component {
  __title = ''

  constructor() {
    super()
  }

  __setDocumentTitle() {
    document.title = this.__title
  }

  __render(parent, routeParams) {
    this.__routeParams = routeParams
    this.__setDocumentTitle()
    super.__render.apply(this, [parent])
  }
}

export default View
