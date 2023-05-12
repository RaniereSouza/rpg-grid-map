export default class Component {
  __style(context) {
    return `* {}`
  }

  __htmlTemplate(context) {
    return `<></>`
  }

  __afterRender() { }

  render(parent) {
    if (!(parent instanceof HTMLElement))
      throw TypeError('parent argument must be an HTMLElement')

    parent.innerHTML = `
      <style>
        ${this.__style(this)}
      </style>
      ${this.__htmlTemplate(this)}
    `
    this.__afterRender()
  }
}
