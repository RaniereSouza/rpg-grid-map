import * as THREE        from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const defaultSceneBgColor = 0x30383F

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
}

export const defaultGridOptions = {
  bgColor:           0xFFFFFF,
  squareFillColor:   0xF0F8FF,
  squareBorderColor: 0x000000,
  gridLift:          0.125, // distance between the background and the squares
}

class ThreeJSContext {
  constructor(canvas, {
    cameraOptions   = {},
    lightsOptions   = [],
    rendererOptions = {},
  }) {
    cameraOptions   = {...defaultCameraOptions,   ...cameraOptions}
    lightsOptions   = [...defaultLightsOptions,   ...lightsOptions]
    rendererOptions = {...defaultRendererOptions, ...rendererOptions}

    this.__initScene({defaultSceneBgColor})
    this.__initLights(lightsOptions)
    this.__initCamera(cameraOptions)
    this.__initRenderer({...rendererOptions, canvas})
    this.__initHelpers()

    this.__animateScene()

    return new Proxy(this, {})
  }

  static create(canvasSelector, options) {
    const canvas = document.querySelector(canvasSelector)
    return new ThreeJSContext(canvas, options)
  }

  __initScene(sceneOptions) {
    this.__scene = new THREE.Scene()
    this.__scene.background = new THREE.Color(sceneOptions.defaultSceneBgColor)
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

  createGridObject(width, height) {
    const {
      bgColor, squareFillColor,
      squareBorderColor, gridLift,
    } = defaultGridOptions

    const background = this.__createPlaneObject({
      geometryOptions: {width, height, widthSegments: 1, heightSegments: 1},
      materialOptions: {color: bgColor},
    })

    const square = this.__createPlaneObject({
      geometryOptions: {width: 1, height: 1, widthSegments: 1, heightSegments: 1},
      materialOptions: {color: squareFillColor},
    })

    const border = this.__createEdgesObject({
      geometryObject:  square.geometry,
      materialOptions: {color: squareBorderColor},
    })
    square.add(border)

    function createGridSquareObject({ row, column, positionX, positionY }) {
      const squareCopy       = square.clone()
      const squareCopyBorder = squareCopy.children[0]

      squareCopy.position.setX(positionX)
      squareCopy.position.setY(positionY)
      squareCopy.position.setZ(gridLift)

      return {
        row,
        column,
        fill:   squareCopy,
        border: squareCopyBorder,
      }
    }

    let squares = []
    let row     = 0
    let column  = 0
    for (let positionX = -(width / 2) + 0.5; positionX < (width / 2); positionX++) {
      row++

      for (let positionY = -(height / 2) + 0.5; positionY < (height / 2); positionY++) {
        column++

        const gridSquareObject = createGridSquareObject({
          row, column, positionX, positionY,
        })

        background.add(gridSquareObject.fill)
        squares.push(gridSquareObject)
      }
    }

    this.__scene.add(background)

    return {width, height, background, squares}
  }

  __createPlaneObject({ geometryOptions, materialOptions }) {
    const planeGeometry = new THREE.PlaneGeometry(
      geometryOptions.width,
      geometryOptions.height,
      geometryOptions.widthSegments,
      geometryOptions.heightSegments,
    )
    const planeMaterial = new THREE.MeshBasicMaterial(materialOptions)
    return new THREE.Mesh(planeGeometry, planeMaterial)
  }

  __createEdgesObject({ geometryObject, materialOptions }) {
    const edgesGeometry = new THREE.EdgesGeometry(geometryObject)
    return new THREE.LineSegments(
      edgesGeometry,
      new THREE.LineBasicMaterial(materialOptions),
    )
  }
}

export default ThreeJSContext
