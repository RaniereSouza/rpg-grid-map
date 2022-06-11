import View from '../../lib/View'

import GridMap from '../../lib/GridMap'

class MapCreationView extends View {
  __title = 'Map Creation'

  constructor() {
    super()
  }

  __style() {
    return /* css */`
      * {
        z-index: 20;
      }

      body {
        display: inline-block;
        width:   calc(100vw - (100vw - 100%));
        height:  100vh;
      }

      h1 {
        margin:      0;
        padding:     1.25rem 0;
        color:       #fff;
        text-shadow: 1px 4px 8px #000;
        animation:   fade-in 1.5s linear;
      }

      #map-creation-form {
        margin:           0 auto;
        max-width:        fit-content;
        box-shadow:       1px 4px 16px 1px #000;
        background-color: #fff;
        border-radius:    .25rem;
        opacity:          1;
        left:             0;
        transition:       opacity 1s linear,
                          left 1s linear,
                          z-index 0s linear 1s;
      }

      #map-creation-form.hidden {
        opacity: 0;
        left:    48px;
        z-index: -1;
      }

      #map-creation-form fieldset {
        border:  none;
        padding: 0 .75rem .625rem;
      }

      #map-creation-form legend {
        margin-left: -0.75rem;
        width:       calc(100% + 1.5rem);
        padding:     .625rem .75rem;
      }

      canvas {
        position:         absolute;
        top:              0;
        left:             0;
        width:            calc(100vw - (100vw - 100%)) !important;
        height:           100vh !important;
        z-index:          10;
        background-color: #30383f;
      }
    `
  }

  __htmlTemplate() {
    return /* html */`
      <h1>Map Creation</h1>
      <div id="map-creation-form" data-testid="map-creation-form">
        <fieldset>
          <legend>What dimensions do you want for your grid?</legend>

          <label for="map-creation-width">Width</label>
          <input id="map-creation-width" type="number" step="1" data-testid="map-creation-width-input" />

          <label for="map-creation-height">Height</label>
          <input id="map-creation-height" type="number" step="1" data-testid="map-creation-height-input" />

          <button id="map-creation-confirm-button" data-testid="map-creation-confirm-button">Create</button>
        </fieldset>
      </div>
      <canvas id="map-creation-canvas" data-testid="map-creation-canvas"></canvas>
    `
  }

  __afterRender() {
    this.__gridMap = GridMap.create('#map-creation-canvas')

    document.querySelector('#map-creation-confirm-button').addEventListener('click',
      event => {
        event.preventDefault()

        const width  = Number(document.querySelector('#map-creation-width').value)
        const height = Number(document.querySelector('#map-creation-height').value)

        this.__gridMap.initBlankGrid(width, height)
        document.querySelector('#map-creation-form').classList.add('hidden')
      }
    )
  }
}

export default MapCreationView
