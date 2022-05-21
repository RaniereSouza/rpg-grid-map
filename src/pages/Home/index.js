import Component from '../../lib/Component'

class HomeComponent extends Component {
  constructor() {
    super()
  }

  __template() {
    return `
      <style>
        h1 {
          animation: fade-in 1.5s linear;
        }
    
        a[data-link] {
          text-decoration: none;
          color:           inherit;
        }
      </style>
      <h1 data-testid="home-title">Hello, adventurer!</h1>
      <div>
        <p>What do you want to do?</p>
        <a href="/map-creation" data-link>
          <button data-testid="home-map-creaction-button">Create grid maps</maps>
        </a>
      </div>
    `
  }
}

export default HomeComponent
