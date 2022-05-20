class HomeComponent {
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

  __render(parent) {
    console.log('HomeComponent render parent:', parent)
    parent.innerHTML = this.__template()
  }
}

export default HomeComponent
