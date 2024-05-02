// @vitest-environment jsdom
import { describe, it, should as useShouldSyntax } from 'vitest'

import Component from './Component'

describe('class #Component', () => {
  useShouldSyntax()

  describe('method #render', () => {
    // @happy_path
    it('should correctly render the Component into a parent element', () => {
      // Arrange
      const styleString = 'p { border: 1px solid #ccc; }',
            htmlString = '<p>Lorem Ipsum Dolor Sit Amet</p>'
      class TestComponent extends Component {
        constructor() { super() }
        __style() { return styleString }
        __htmlTemplate() { return htmlString }
      }
      const testComponent = new TestComponent(),
            parent = document.createElement('div')
      // Act
      testComponent.render(parent)
      // Assert
      parent.querySelector('style').textContent.should.contain(styleString)
      parent.innerHTML.should.contain(htmlString)
    })

    // @sad_path
    it('should not accept a parent argument that is not an HTMLElement', () => {
      // Arrange
      const testComponent = new Component(),
            parent = {},
            renderToParent = () => testComponent.render(parent)
      // Assert
      renderToParent.should.throw(TypeError, 'parent argument must be an HTMLElement')
    })
  })
})
