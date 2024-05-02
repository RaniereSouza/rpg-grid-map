import * as THREE        from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
