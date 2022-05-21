import View from '../../lib/View'

class MapCreationView extends View {
  __title = 'Map Creation'
  
  constructor() {
    super()
  }

  __htmlTemplate() {
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
}

export default MapCreationView
