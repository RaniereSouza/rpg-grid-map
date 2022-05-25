import ThreeJSContext from './ThreeJSContext'

class GridMap {
  static __threeJSContext = null

  constructor(canvasSelector) {
    if (!GridMap.__threeJSContext)
      GridMap.__threeJSContext = ThreeJSContext.create(canvasSelector, {})

    return new Proxy(this, {})
  }

  static create(canvasSelector) {
    return new GridMap(canvasSelector)
  }
}

export default GridMap
