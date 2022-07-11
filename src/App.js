export default class App {
  constructor(root, { router }) {
    this.__root   = root
    this.__router = router(this.__root)
    return new Proxy(this, {})
  }

  static create(selector, options) {
    const root = document.querySelector(selector)
    return new App(root, options)
  }
}
