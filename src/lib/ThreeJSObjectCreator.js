import * as THREE       from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { Line2 }        from 'three/examples/jsm/lines/Line2.js'

export const defaultGridOptions = {
  bgColor:           0xFFFFFF,
  squareFillColor:   0xF0F8FF,
  squareBorderColor: 0x000000,
  squareBorderWidth: 1,
  gridLift:          0.125, // distance between the background and the squares
}

export default class ThreeJSObjectCreator {
  constructor({ gridOptions = {} }) {
    this.__gridOptions = {...defaultGridOptions, ...gridOptions}
  }

  static create(options) {
    return new ThreeJSObjectCreator(options)
  }

  __createPlaneObject({ geometryOptions, materialOptions }) {
    const planeGeometry = new THREE.PlaneGeometry(
      geometryOptions.width, geometryOptions.height,
      geometryOptions.widthSegments, geometryOptions.heightSegments,
    )
    const planeMaterial = new THREE.MeshBasicMaterial(materialOptions)
    return new THREE.Mesh(planeGeometry, planeMaterial)
  }

  __createSquareObject({ size = 1, materialOptions }) {
    return this.__createPlaneObject({
      geometryOptions: {
        width: size, height: size,
        widthSegments: 1, heightSegments: 1
      },
      materialOptions,
    })
  }

  __createEdgesObject({ geometryObject, materialOptions }) {
    const edgesGeometry = new THREE.EdgesGeometry(geometryObject)

    const lineGeometry = new LineGeometry()
    lineGeometry.setPositions(edgesGeometry.attributes.position.array)

    const lineMaterial = new LineMaterial({
      ...materialOptions,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      dashed:     false,
    })
    return new Line2(lineGeometry, lineMaterial)
  }

  __createSquareBorderObject({ squareObject, materialOptions }) {
    const squareSize = squareObject.geometry.parameters.width
    const xByQuadrant = [
      -(squareSize / 2), squareSize / 2,
      squareSize / 2,    -(squareSize / 2),
    ]
    const yByQuadrant = [
      squareSize / 2,    squareSize / 2,
      -(squareSize / 2), -(squareSize / 2),
    ]
    const squareBorderShape = new THREE.Shape()

    let firstVertex = []
    for (let i = 0, len = 4; i < len; i++) {
      const vertex = [xByQuadrant[i], yByQuadrant[i], 0]
      if (i === 0) {
        firstVertex = vertex
        squareBorderShape.moveTo(...vertex)
      }
      else squareBorderShape.lineTo(...vertex)
    }
    squareBorderShape.lineTo(...firstVertex)

    const squareBorderGeometry = new THREE.ShapeGeometry(squareBorderShape)
    return this.__createEdgesObject({
      geometryObject: squareBorderGeometry,
      materialOptions,
    })
  }

  createGridObject(width, height) {
    const {
      bgColor,
      squareFillColor, squareBorderColor, squareBorderWidth,
      gridLift,
    } = this.__gridOptions

    const wrapper = this.__createPlaneObject({
      geometryOptions: {width, height, widthSegments: 1, heightSegments: 1},
      materialOptions: {color: bgColor},
    })

    const square = this.__createSquareObject({
      materialOptions: {color: squareFillColor},
    })

    const border = this.__createSquareBorderObject({
      squareObject:    square,
      materialOptions: {color: squareBorderColor, linewidth: squareBorderWidth},
    })
    square.add(border)

    function createGridSquareObject({ positionX, positionY }) {
      const squareCopy       = square.clone()
      const squareCopyBorder = squareCopy.children[0] // the border previously added to the square, first (and only) child of the square's ThreeJS object

      squareCopy.position.set(positionX, positionY, gridLift)

      return {row, column, fill: squareCopy, border: squareCopyBorder}
    }

    let squares = []
    let row     = 0
    let column  = 0
    for (let positionX = -(width / 2) + 0.5; positionX < (width / 2); positionX++) {
      row++

      for (let positionY = -(height / 2) + 0.5; positionY < (height / 2); positionY++) {
        column++

        const gridSquareObject = createGridSquareObject({positionX, positionY})
        wrapper.add(gridSquareObject.fill)
        squares.push(gridSquareObject)
      }
    }

    return {width, height, wrapper, squares}
  }
}
