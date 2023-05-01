// @vitest-environment jsdom
import { describe, it, should as initShouldSyntax } from 'vitest'

import View from '../View'

import { isRoutesValid } from './routesValidation'

describe('function #isRoutesValid', () => {
  initShouldSyntax()

  // @happy_path
  it('should pass for an empty array', () => {
    // Given
    const input = []
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.true
  })

  // @happy_path
  it('should pass for a correctly formed array of routes', () => {
    // Given
    class ViewSubclass extends View {
      constructor() { super() }
    }
    const input = [
      {path: '/foo',  view: () => {}},
      {path: '/bar',  view: new View()},
      {path: '/nono', view: new ViewSubclass()},
    ]
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.true
  })

  // @sad_path
  it.todo('should not pass for an array with some route missing the path')

  // @sad_path
  it.todo('should not pass for an array with some route missing the view')

  // @sad_path
  it.todo('should not pass for an array with some route with a path that is not a string')

  // @sad_path
  it.todo('should not pass for an array with some route with a view that is not an instance of View')

  // @sad_path
  it.todo('should not pass for an array with some route with a view that is not a function')
})
