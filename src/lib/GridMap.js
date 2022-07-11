import ThreeJSContext, { ThreeJSObjectCreator } from './ThreeJSContext'

export default class GridMap {
  static __graphicContext = null
  static __objectCreator  = null

  constructor(canvasSelector) {
    if (!GridMap.__graphicContext) {
      GridMap.__graphicContext = ThreeJSContext.create(canvasSelector, {})
      GridMap.__objectCreator  = ThreeJSObjectCreator.create({})
    }
  }

  static create(canvasSelector) {
    return new GridMap(canvasSelector)
  }

  initBlankGrid(width, height) {
    this.__grid = GridMap.__objectCreator.createGridObject(width, height)
    GridMap.__graphicContext.addObjectToScene(this.__grid.wrapper)
  }
}
