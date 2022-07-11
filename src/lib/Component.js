export default class Component {
  constructor() {
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

  __afterRender() { }

  __render(parent) {
    parent.innerHTML = `
      <style>
        ${this.__style(this)}
      </style>
      ${this.__htmlTemplate(this)}
    `
    this.__afterRender()
  }
}
