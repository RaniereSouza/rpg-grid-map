import './styles/global.css'

document.querySelector('#app').innerHTML = `
  <style>
    h1 {
      animation: fade-in 1.5s linear;
    }
  </style>
  <h1 data-testid="home-title">Hello, adventurer!</h1>
`
