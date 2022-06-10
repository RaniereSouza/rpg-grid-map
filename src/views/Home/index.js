import View from '../../lib/View'

class HomeView extends View {
  __title = 'Home'

  constructor() {
    super()
  }

  __style() {
    return /* css */`
      h1 {
        animation: fade-in 1.5s linear;
      }

      a[data-link] {
        text-decoration: none;
        color:           inherit;
      }
    `
  }

  __htmlTemplate() {
    return /* html */`
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

export default HomeView
