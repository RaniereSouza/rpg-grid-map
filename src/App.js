import Router from './router'

class App {
  constructor(root) {
    this.__root   = root
    this.__router = Router.create(this.__root)
    return new Proxy(this, {})
  }

  static create(selector) {
    const root = document.querySelector(selector)
    return new App(root)
  }
}

export default App
