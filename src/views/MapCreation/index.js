import View from '../../lib/View'

import ThreeJSContext from '../../lib/ThreeJSContext'

class MapCreationView extends View {
  __title = 'Map Creation'
  
  constructor() {
    super()
  }

  __style() {
    return `
      * {
        z-index: 20;
      }

      body {
        display: inline-block;
        width:   100vw;
        height:  100vh;
      }

      h1 {
        margin:    0;
        padding:   1.25rem 0;
        animation: fade-in 1.5s linear;
        color:     #fff;
      }

      fieldset {
        margin:                     0 auto;
        max-width:                  fit-content;
        border:                     none;
        padding:                    0 .75rem .625rem;
        background-color:           #fff;
        border-bottom-left-radius:  .25rem;
        border-bottom-right-radius: .25rem;
      }

      legend {
        margin-left:             -0.75rem;
        width:                   calc(100% + 1.5rem);
        padding:                 .625rem .75rem;
        background-color:        #fff;
        border-top-left-radius:  .25rem;
        border-top-right-radius: .25rem;
      }

      canvas {
        position:         absolute;
        top:              0;
        left:             0;
        width:            100vw;
        height:           100vh;
        z-index:          10;
        background-color: #30383f;
      }
    `
  }

  __htmlTemplate() {
    return `
      <h1>Map Creation</h1>
      <fieldset>
        <legend>What dimensions do you want for your grid?</legend>

        <label for="map-creation-width">Width</label>
        <input id="map-creation-width" type="number" step="1" data-testid="map-creation-width-input" />

        <label for="map-creation-height">Height</label>
        <input id="map-creation-height" type="number" step="1" data-testid="map-creation-height-input" />

        <button data-testid="map-creation-confirm-button">Create</button>
      </fieldset>
      <canvas id="map-creation-canvas"></canvas>
    `
  }

  __afterRender() {
    console.log(ThreeJSContext.create('#map-creation-canvas', {}))
  }
}

export default MapCreationView
