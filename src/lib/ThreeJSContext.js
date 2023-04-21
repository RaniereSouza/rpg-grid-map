import * as THREE                     from 'three'
import { OrbitControls }              from 'three/examples/jsm/controls/OrbitControls'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

export const defaultSceneOptions = {
  bgColor: 0x30383F,
}

export const defaultLightsOptions = [{
  type:             'PointLight',
  color:            0xFFFFFF,
  initialYDistance: 60,
  initialZDistance: 60,
}]

export const defaultCameraOptions = {
  type:             'PerspectiveCamera',
  initialZDistance: 27.5,
  config: {
    fieldOfView: 75,
    ratio:       window.innerWidth / window.innerHeight,
    near:        0.1,
    far:         1000,
  },
}

export const defaultRendererOptions = {
  pixelRatio:            window.devicePixelRatio,
  width:                 window.innerWidth,
  height:                window.innerHeight,
  preserveDrawingBuffer: true,
  antialias:             true,
  alpha:                 true,
}

export default class ThreeJSContext {
  constructor(canvas, {
    sceneOptions = {}, cameraOptions = {}, lightsOptions = [], rendererOptions = {},
  }) {
    sceneOptions    = {...defaultSceneOptions,    ...sceneOptions}
    cameraOptions   = {...defaultCameraOptions,   ...cameraOptions}
    lightsOptions   = [...defaultLightsOptions,   ...lightsOptions]
    rendererOptions = {...defaultRendererOptions, ...rendererOptions}

    this.__initScene(sceneOptions)
    this.__initLights(lightsOptions)
    this.__initCamera(cameraOptions)
    this.__initRenderer({...rendererOptions, canvas})
    this.__initHelpers()

    this.__animateScene()
  }

  static create(canvasSelector, options) {
    const canvas = document.querySelector(canvasSelector)
    return new ThreeJSContext(canvas, options)
  }

  __initScene(sceneOptions) {
    this.__scene = new THREE.Scene()
    this.__scene.background = new THREE.Color(sceneOptions.bgColor)
  }

  __initLights(lightsOptions) {
    this.__lights = lightsOptions.map(lightOptions => {
      const light = new THREE[lightOptions.type](lightOptions.color)
      light.position.setY(lightOptions.initialYDistance)
      light.position.setZ(lightOptions.initialZDistance)

      this.__scene.add(light)
      return light
    })
  }

  __initCamera(cameraOptions) {
    this.__camera = new THREE[cameraOptions.type](...Object.values(cameraOptions.config))
    this.__camera.position.setZ(cameraOptions.initialZDistance)
  }

  __initRenderer(rendererOptions) {
    this.__renderer = new THREE.WebGLRenderer({
      canvas:                rendererOptions.canvas,
      preserveDrawingBuffer: rendererOptions.preserveDrawingBuffer,
    })
    this.__renderer.setPixelRatio(rendererOptions.pixelRatio)
    this.__renderer.setSize(rendererOptions.width, rendererOptions.height)
  }

  __initHelpers() {
    this.__helpers = {}

    this.__helpers.axes = new THREE.AxesHelper(100)
    this.__scene.add(this.__helpers.axes)

    this.__helpers.controls = new OrbitControls(this.__camera, this.__renderer.domElement)
  }

  __animateScene() {
    this.__renderer.render(this.__scene, this.__camera)
    this.__helpers.controls.update()
    requestAnimationFrame(this.__animateScene.bind(this))
  }

  addObjectToScene(object) {
    this.__scene.add(object)
  }
}

export const defaultGridOptions = {
  bgColor:           0xFFFFFF,
  squareFillColor:   0xF0F8FF,
  squareBorderColor: 0x000000,
  squareBorderWidth: 2,
  gridLift:          0.125, // distance between the background and the squares
}

export class ThreeJSObjectCreator {
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
    const edgesGeometry = new MeshLine()
    edgesGeometry.setGeometry(new THREE.EdgesGeometry(geometryObject))
    return new THREE.Mesh(
      edgesGeometry,
      new MeshLineMaterial({
        ...materialOptions,
        resolution:      new THREE.Vector2(window.innerWidth, window.innerHeight),
        sizeAttenuation: false,
        map:             null,
        useMap:          false,
        depthWrite:      false,
        depthTest:       false,
      }),
    )
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
      materialOptions: {color: squareBorderColor, lineWidth: squareBorderWidth},
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
