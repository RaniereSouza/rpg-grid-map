class MapCreationComponent {
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

  __template() {
    return `
      <style>
        h1 {
          animation: fade-in 1.5s linear;
        }

        fieldset {
          margin:    0 auto;
          max-width: 720px;
        }
      </style>
      <h1>Map Creation</h1>
      <fieldset>
        <legend>What dimensions do you want for your grid?</legend>

        <label for="map-creation-width">Width</label>
        <input id="map-creation-width" type="number" step="1" data-testid="map-creation-width-input" />

        <label for="map-creation-height">Height</label>
        <input id="map-creation-height" type="number" step="1" data-testid="map-creation-height-input" />

        <button>Create</button>
      </fieldset>
    `
  }

  __render(parent) {
    console.log('MapCreationComponent render parent:', parent)
    parent.innerHTML = this.__template()
  }
}

export default MapCreationComponent
