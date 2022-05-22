class Component {
  constructor() {
    this.__style        = this.__style.bind(this)
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

  __style(context) {
    return ``
  }

  __htmlTemplate(context) {
    return `<></>`
  }

  __render(parent) {
    parent.innerHTML = `
      <style>
        ${this.__style(this)}
      </style>
      ${this.__htmlTemplate(this)}
    `
  }
}

export default Component
