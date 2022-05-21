class Component {
  constructor() {
    this.__htmlTemplate = this.__htmlTemplate.bind(this)
    this.__render       = this.__render.bind(this)

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

  __htmlTemplate(context) {
    return `<></>`
  }

  __render(parent) {
    parent.innerHTML = this.__htmlTemplate(this)
  }
}

export default Component
