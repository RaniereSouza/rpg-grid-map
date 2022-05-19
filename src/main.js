import './styles/global.css'

document.querySelector('#app').innerHTML = `
  <style>
    h1 {
      animation: fade-in 1.5s linear;
    }
  </style>
  <h1 data-testid="home-title">Hello, adventurer!</h1>
  <div>
    <p>What do you want to do?</p>
    <button data-testid="home-map-creaction-button">Create grid maps</maps>
  </div>
`
