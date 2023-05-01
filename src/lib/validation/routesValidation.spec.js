// @vitest-environment jsdom
import { describe, it, should } from 'vitest'

import View from '../View'

import { isRoutesValid } from './routesValidation'

describe('function #isRoutesValid', () => {
  should()

  // @happy-path
  it('should check for an empty array', () => {
    // Given
    const input = []
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.true
  })

  // @happy-path
  it('should check for a correctly formed array of routes', () => {
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

  // @sad-path
  it.todo('should not check for an array with some route missing the path')

  // @sad-path
  it.todo('should not check for an array with some route missing the view')

  // @sad-path
  it.todo('should not check for an array with some route with a path that is not a string')

  // @sad-path
  it.todo('should not check for an array with some route with a view that is not an instance of View')

  // @sad-path
  it.todo('should not check for an array with some route with a view that is not a function')
})
