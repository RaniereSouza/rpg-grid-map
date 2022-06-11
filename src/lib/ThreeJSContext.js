import * as THREE from 'three'

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
  pixelRatio: window.devicePixelRatio,
  width:      window.innerWidth,
  height:     window.innerHeight,
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

    this.__scene = new THREE.Scene()
    this.__scene.background = new THREE.Color(defaultSceneBgColor)

    const axesHelper = new THREE.AxesHelper(100)
    this.__scene.add(axesHelper)

    this.__lights = lightsOptions.map(lightOptions => {
      const light = new THREE[lightOptions.type](lightOptions.color)
      light.position.setY(lightOptions.initialYDistance)
      light.position.setZ(lightOptions.initialZDistance)

      this.__scene.add(light)
      return light
    })

    this.__camera = new THREE[cameraOptions.type](...Object.values(cameraOptions.config))
    this.__camera.position.setZ(cameraOptions.initialZDistance)

    this.__renderer = new THREE.WebGLRenderer({canvas})
    this.__renderer.setPixelRatio(rendererOptions.pixelRatio)
    this.__renderer.setSize(rendererOptions.width, rendererOptions.height)
    this.__renderer.render(this.__scene, this.__camera)

    this.__animateScene()

    return new Proxy(this, {})
  }

  static create(canvasSelector, options) {
    const canvas = document.querySelector(canvasSelector)
    return new ThreeJSContext(canvas, options)
  }

  __animateScene() {
    this.__renderer.render(this.__scene, this.__camera)
    requestAnimationFrame(this.__animateScene.bind(this))
  }

  createGridObject(width, height) {
    const {
      bgColor, squareFillColor,
      squareBorderColor, gridLift,
    } = defaultGridOptions

    const backgroundGeometry = new THREE.PlaneGeometry(width, height, 1, 1)
    const backgroundMaterial = new THREE.MeshBasicMaterial({color: bgColor})
    const background         = new THREE.Mesh(backgroundGeometry, backgroundMaterial)

    const squareGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)
    const squareMaterial = new THREE.MeshBasicMaterial({color: squareFillColor})
    const square         = new THREE.Mesh(squareGeometry, squareMaterial)

    const edgesGeometry = new THREE.EdgesGeometry(square.geometry)
    const border        = new THREE.LineSegments(
      edgesGeometry, new THREE.LineBasicMaterial({color: squareBorderColor}),
    )
    square.add(border)

    let squares = []
    let row     = 0
    let column  = 0
    for (let positionX = -(width / 2) + 0.5; positionX < (width / 2); positionX++) {
      row++

      for (let positionY = -(height / 2) + 0.5; positionY < (height / 2); positionY++) {
        column++

        const squareCopy       = square.clone()
        const squareCopyBorder = squareCopy.children[0]

        squareCopy.position.setX(positionX)
        squareCopy.position.setY(positionY)
        squareCopy.position.setZ(gridLift)

        background.add(squareCopy)

        squares.push({
          row,
          column,
          fill:   squareCopy,
          border: squareCopyBorder,
        })
      }
    }

    this.__scene.add(background)

    return {width, height, background, squares}
  }
}

export default ThreeJSContext
