// @vitest-environment jsdom
import { describe, it, should as initShouldSyntax } from 'vitest'

import Router from '.'

describe('class #Router', () => {
  initShouldSyntax()

  describe('(static) method #create', () => {
    // @happy_path
    it('should instantiate correctly with an HTMLElement as viewContainer', () => {
      // Given
      const viewContainer = document.createElement('div'),
            createRouter = () => Router.create(viewContainer)
      // Then
      createRouter.should.not.throw
      createRouter().should.be.an.instanceof(Router)
    })
  
    // @happy_path
    it('should instantiate correctly with a valid array of routes', () => {
      // Given
      const viewContainer = document.createElement('div'),
            routes = [{path: '/', view: () => {}}],
            createRouter = () => Router.create(viewContainer, routes)
      // Then
      createRouter.should.not.throw
      createRouter().should.be.an.instanceof(Router)
    })
  
    // @sad_path
    it('should not instantiate correctly with a viewContainer that isn\'t an HTMLElement', () => {
      // Given
      const viewContainer = {},
            createRouter = () => Router.create(viewContainer)
      // Then
      createRouter.should.throw(TypeError, 'viewContainer argument must be an HTMLElement')
    })
  
    // @sad_path
    it('should not instantiate correctly with routes that that are not a valid array of routes', () => {
      // Given
      const viewContainer = document.createElement('div'),
            badRoutesA = {},
            badRoutesB = ['NaR', null, 42],
            createRouterA = () => Router.create(viewContainer, badRoutesA),
            createRouterB = () => Router.create(viewContainer, badRoutesB)
      // Then
      createRouterA.should.throw(TypeError, 'routes argument must be a valid array of routes')
      createRouterB.should.throw(TypeError, 'routes argument must be a valid array of routes')
    })
  })
})
