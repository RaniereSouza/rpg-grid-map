export default class Component {
  __style(context) {
    return `* {}`
  }

  __htmlTemplate(context) {
    return `<></>`
  }

  __afterRender() { }

  render(parent) {
    parent.innerHTML = `
      <style>
        ${this.__style(this)}
      </style>
      ${this.__htmlTemplate(this)}
    `
    this.__afterRender()
  }
}
