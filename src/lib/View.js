import Component from './Component'

export default class View extends Component {
  __title = ''

  constructor() {
    super()
  }

  __setDocumentTitle() {
    document.title = this.__title
  }

  render(parent, routeParams) {
    this.__routeParams = routeParams
    this.__setDocumentTitle()
    super.render.apply(this, [parent])
  }
}
