import ThreeJSContext       from './ThreeJSContext'
import ThreeJSObjectCreator from './ThreeJSObjectCreator'

export default class GridMap {
  static __objectCreator = null

  constructor(canvasSelector) {
    if (!GridMap.__objectCreator) {
      GridMap.__objectCreator = ThreeJSObjectCreator.create({})
    }

    this.__graphicContext = ThreeJSContext.create(canvasSelector, {})
  }

  static create(canvasSelector) {
    return new GridMap(canvasSelector)
  }

  initBlankGrid(width, height) {
    this.__grid = GridMap.__objectCreator.createGridObject(width, height)
    this.__graphicContext.addObjectToScene(this.__grid.wrapper)
  }
}
