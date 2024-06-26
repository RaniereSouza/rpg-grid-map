// @vitest-environment jsdom
import { describe, it, should as useShouldSyntax } from 'vitest'

import { isRoutesValid } from './routesValidation'

describe('function #isRoutesValid', () => {
  useShouldSyntax()

  class ViewClass { render() {} }

  // @happy_path
  it('should pass for an empty array', () => {
    // Arrange
    const input = []
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.true
  })

  // @happy_path
  it('should pass for a correctly formed array of routes', () => {
    // Arrange
    class ViewSubclass extends ViewClass { constructor() { super() } }
    const input = [
      {path: '/foo',  view: () => {}},
      {path: '/bar',  view: new ViewClass()},
      {path: '/nono', view: new ViewSubclass()},
    ]
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.true
  })

  // @sad_path
  it('should not pass for an array with some route missing the path', () => {
    // Arrange
    const input = [
      {path: '/foo', view: () => {}},
      {view: () => {}},
    ]
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route missing the view', () => {
    // Arrange
    const input = [
      {path: '/foo', view: () => {}},
      {path: '/bar'},
    ]
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route with a path that is not a string', () => {
    // Arrange
    const input = [
      {path: '/foo',  view: () => {}},
      {path: /\/bar/, view: () => {}},
    ]
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route with a view that doesn\'t implement a render method', () => {
    // Arrange
    class NotAView {}
    const input = [
      {path: '/foo', view: new ViewClass()},
      {path: '/bar', view: new NotAView()},
    ]
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.false
  })

  // @sad_path
  it('should not pass for an array with some route with a view that is not a function', () => {
    // Arrange
    const input = [
      {path: '/foo', view: () => {}},
      {path: '/bar', view: 'function notAFunction() {}'},
    ]
    // Act
    const result = isRoutesValid(input)
    // Assert
    result.should.be.false
  })
})
