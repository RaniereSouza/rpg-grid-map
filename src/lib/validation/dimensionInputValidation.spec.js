// @vitest-environment jsdom
import { describe, it, should as useShouldSyntax } from 'vitest'

import { isDimensionValueValid } from './dimensionInputValidation'

describe('function #isDimensionValueValid', () => {
  useShouldSyntax()

  // @happy_path
  it('should pass for a positive integer number', () => {
    // Arrange
    const inputA = 42,
          inputB = 69
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Assert
    resultA.should.be.true
    resultB.should.be.true
  })

  // @happy_path
  it('should pass for a string representing a positive integer number', () => {
    // Arrange
    const inputA = '042',
          inputB = '0069'
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Assert
    resultA.should.be.true
    resultB.should.be.true
  })

  // @sad_path
  it('should not pass for an input that is not a number nor a string', () => {
    // Arrange
    const inputA = null,
          inputB = {},
          inputC = true
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB),
          resultC = isDimensionValueValid(inputC)
    // Assert
    resultA.should.be.false
    resultB.should.be.false
    resultC.should.be.false
  })

  // @sad_path
  it('should not pass for a string that doesn\'t represent a number', () => {
    // Arrange
    const inputA = '',
          inputB = 'NaN',
          inputC = '1,000'
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB),
          resultC = isDimensionValueValid(inputC)
    // Assert
    resultA.should.be.false
    resultB.should.be.false
    resultC.should.be.false
  })

  // @sad_path
  it('should not pass for a number zero input (number or string)', () => {
    // Arrange
    const inputA = 0,
          inputB = '0'
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Assert
    resultA.should.be.false
    resultB.should.be.false
  })

  // @sad_path
  it('should not pass for a negative number input (number or string)', () => {
    // Arrange
    const inputA = -42,
          inputB = '-69'
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Assert
    resultA.should.be.false
    resultB.should.be.false
  })

  // @sad_path
  it('should not pass for a decimal/float input (number or string)', () => {
    // Arrange
    const inputA = 4.2,
          inputB = '6.9'
    // Act
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Assert
    resultA.should.be.false
    resultB.should.be.false
  })
})
