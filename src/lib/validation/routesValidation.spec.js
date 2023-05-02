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
    class ViewSubclass extends View { constructor() { super() } }
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
  it('should not pass for an array with some route missing the path', () => {
    // Given
    const input = [
      {path: '/foo', view: () => {}},
      {view: () => {}},
    ]
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route missing the view', () => {
    // Given
    const input = [
      {path: '/foo', view: () => {}},
      {path: '/bar'},
    ]
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route with a path that is not a string', () => {
    // Given
    const input = [
      {path: '/foo',  view: () => {}},
      {path: /\/bar/, view: () => {}},
    ]
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route with a view that is not an instance of View', () => {
    // Given
    class NotAView {}
    const input = [
      {path: '/foo', view: new View()},
      {path: '/bar', view: new NotAView()},
    ]
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route with a view that is not a function', () => {
    // Given
    const input = [
      {path: '/foo', view: () => {}},
      {path: '/bar', view: 'function notAFunction() {}'},
    ]
    // When
    const result = isRoutesValid(input)
    // Then
    result.should.be.false
  })
})
