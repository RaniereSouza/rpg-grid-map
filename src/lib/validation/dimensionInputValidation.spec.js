// @vitest-environment jsdom
import { describe, it, should } from 'vitest'

import { isDimensionValueValid } from './dimensionInputValidation'

describe('function #isDimensionValueValid', () => {
  should()

  // @happy-path
  it('should check for a positive integer number', () => {
    // Given
    const inputA = 42,
          inputB = 69
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Then
    resultA.should.be.true
    resultB.should.be.true
  })

  // @happy-path
  it('should check for a string representing a positive integer number', () => {
    // Given
    const inputA = '042',
          inputB = '0069'
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Then
    resultA.should.be.true
    resultB.should.be.true
  })

  // @sad-path
  it('should not check for an input that is not a number nor a string', () => {
    // Given
    const inputA = null,
          inputB = {},
          inputC = true
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB),
          resultC = isDimensionValueValid(inputC)
    // Then
    resultA.should.be.false
    resultB.should.be.false
    resultC.should.be.false
  })

  // @sad-path
  it('should not check for a string that doesn\'t represent a number', () => {
    // Given
    const inputA = '',
          inputB = 'NaN',
          inputC = '1,000'
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB),
          resultC = isDimensionValueValid(inputC)
    // Then
    resultA.should.be.false
    resultB.should.be.false
    resultC.should.be.false
  })

  // @sad-path
  it('should not check for a number zero input (number or string)', () => {
    // Given
    const inputA = 0,
          inputB = '0'
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Then
    resultA.should.be.false
    resultB.should.be.false
  })

  // @sad-path
  it('should not check for a negative number input (number or string)', () => {
    // Given
    const inputA = -42,
          inputB = '-69'
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Then
    resultA.should.be.false
    resultB.should.be.false
  })

  // @sad-path
  it('should not check for a decimal/float input (number or string)', () => {
    // Given
    const inputA = 4.2,
          inputB = '6.9'
    // When
    const resultA = isDimensionValueValid(inputA),
          resultB = isDimensionValueValid(inputB)
    // Then
    resultA.should.be.false
    resultB.should.be.false
  })
})
