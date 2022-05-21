class Component {
  constructor() {
    this.__template = this.__template.bind(this)
    this.__render   = this.__render.bind(this)

    return new Proxy(this, {
      get: (target, key) => {
        const keyString   = String(key)
        const visibleKeys = ['render']
        if (!visibleKeys.includes(keyString)) return undefined

        if (keyString === 'render') return function() {
          target.__render.apply(target, arguments)
        }
      }
    })
  }

  __template(context) {
    return `<></>`
  }

  __render(parent) {
    parent.innerHTML = this.__template(this)
  }
}

export default Component
