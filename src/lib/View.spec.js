// @vitest-environment jsdom
import { describe, it, should as initShouldSyntax } from 'vitest'

import View from './View'

describe('class #View', () => {
  initShouldSyntax()

  describe('method #render', () => {
    // @happy_path
    it('should update the document title when rendered', () => {
      // Arrange
      const viewTitle = 'Lorem Ipsum'
      class TestView extends View {
        __title = viewTitle
        constructor() { super() }
      }
      const testView = new TestView(),
            parent = document.createElement('div')
      // Act
      testView.render(parent)
      // Assert
      document.title.should.be.equal(viewTitle)
    })

    // @sad_path
    it('should not update the document title if the __title is not set', () => {
      // Arrange
      const previousTitle = 'Lorem Ipsum'
      class TestView extends View {
        constructor() { super() }
      }
      const testView = new TestView(),
            parent = document.createElement('div')
      document.title = previousTitle
      // Act
      testView.render(parent)
      // Assert
      document.title.should.be.equal(previousTitle)
    })
  })
})
