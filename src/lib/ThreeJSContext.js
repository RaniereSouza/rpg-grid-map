import * as THREE from 'three'

export const defaultCameraOptions = {
  type:             'PerspectiveCamera',
  initialZDistance: 30,
  config: {
    fieldOfView: 75,
    ratio:       window.innerWidth / window.innerHeight,
    near:        0.1,
    far:         1000,
  },
}

export const defaultLightsOptions = [{
  type:             'PointLight',
  color:            0xFFFFFF,
  initialYDistance: 60,
  initialZDistance: 60,
}]

export const defaultRendererOptions = {
  pixelRatio: window.devicePixelRatio,
  width:      window.innerWidth,
  height:     window.innerHeight,
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
    this.__scene.background = new THREE.Color(0x30383F)

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

    this.__demo()

    return new Proxy(this, {})
  }

  __demo() {
    const torusGeometry = new THREE.TorusGeometry(16, 3, 16, 100)
    const torusMaterial = new THREE.MeshStandardMaterial({color: 0xFF6347})
    const torus         = new THREE.Mesh(torusGeometry, torusMaterial)

    const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
    const cubeMaterial = new THREE.MeshStandardMaterial({color: 0x66FFCC})
    const cube         = new THREE.Mesh(cubeGeometry, cubeMaterial)

    this.__scene.add(torus)
    this.__scene.add(cube)
    
    const animate = () => {
      this.__renderer.render(this.__scene, this.__camera)

      torus.rotation.x += 0.01
      torus.rotation.y += 0.005
      torus.rotation.z += 0.01

      cube.rotation.x -= 0.04
      cube.rotation.y -= 0.02
      cube.rotation.z -= 0.04

      requestAnimationFrame(animate)
    }

    animate()
  }

  static create(canvasSelector, options) {
    const canvas = document.querySelector(canvasSelector)
    return new ThreeJSContext(canvas, options)
  }
}

export default ThreeJSContext
