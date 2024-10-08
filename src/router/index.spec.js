// @vitest-environment jsdom
import { describe, it, should as useShouldSyntax, vi, expect } from 'vitest'

import Router from '.'

describe('class #Router', () => {
  useShouldSyntax()

  describe('(static) method #create', () => {
    // @happy_path
    it('should instantiate correctly with an HTMLElement as viewContainer', () => {
      // Arrange
      const viewContainer = document.createElement('div'),
            routerCreation = () => Router.create(viewContainer)
      // Assert
      routerCreation.should.not.throw
      routerCreation().should.be.an.instanceof(Router)
    })

    // @happy_path
    it('should instantiate correctly with a valid array of routes', () => {
      // Arrange
      const viewContainer = document.createElement('div'),
            routes = [{path: '/', view: () => {}}],
            routerCreation = () => Router.create(viewContainer, routes)
      // Assert
      routerCreation.should.not.throw
      routerCreation().should.be.an.instanceof(Router)
    })

    // @sad_path
    it('should not instantiate correctly with a viewContainer that isn\'t an HTMLElement', () => {
      // Arrange
      const viewContainer = {},
            routerCreation = () => Router.create(viewContainer)
      // Assert
      routerCreation.should.throw(TypeError, 'viewContainer argument must be an HTMLElement')
    })

    // @sad_path
    it('should not instantiate correctly with routes that that are not a valid array of routes', () => {
      // Arrange
      const viewContainer = document.createElement('div'),
            badRoutesA = {},
            badRoutesB = ['NaR', null, 42],
            routerCreationA = () => Router.create(viewContainer, badRoutesA),
            routerCreationB = () => Router.create(viewContainer, badRoutesB)
      // Assert
      routerCreationA.should.throw(TypeError, 'routes argument must be a valid array of routes')
      routerCreationB.should.throw(TypeError, 'routes argument must be a valid array of routes')
    })
  })

  describe('method #navigateTo', () => {
    // @happy_path
    it('should execute the view function when navigating to the correct path', () => {
      // Arrange
      const viewFunc = vi.fn(() => {}),
            route = {path: '/foo', view: viewFunc},
            viewContainer = document.createElement('div'),
            router = Router.create(viewContainer, [route])
      // Act
      router.navigateTo('/foo')
      // Assert
      expect(viewFunc).toHaveBeenCalled()
    })

    // @happy_path
    it('should execute the view render method when navigating to the correct path', () => {
      // Arrange
      const viewA = { render: vi.fn(() => {}) }
      const viewB = { render: vi.fn(() => {}) }
      const viewContainer = document.createElement('div'),
            routes = [
              {path: '/foo', view: viewA},
              {path: '/bar', view: viewB},
            ],
            router = Router.create(viewContainer, routes)
      // Act
      router.navigateTo('/foo')
      // Assert
      expect(viewA.render).toHaveBeenCalledWith(viewContainer, undefined)
      // Act
      router.navigateTo('/bar')
      // Assert
      expect(viewB.render).toHaveBeenCalledWith(viewContainer, undefined)
    })

    // @happy_path
    it('should pass the correct route params to the view when navigating to the correct path', () => {
      // Arrange
      const viewA = { render: vi.fn(() => {}) },
            viewB = vi.fn(() => {}),
            viewContainer = document.createElement('div'),
            routes = [
              {path: '/foo/:param1/bli/:param2', view: viewA},
              {path: '/bar/:param1/bli/:param2', view: viewB},
            ],
            router = Router.create(viewContainer, routes)
      // Act
      router.navigateTo('/foo/value1/bli/value2')
      // Assert
      expect(viewA.render).toHaveBeenCalledWith(viewContainer, {param1: 'value1', param2: 'value2'})
      // Act
      router.navigateTo('/bar/value3/bli/value4')
      // Assert
      expect(viewB).toHaveBeenCalledWith(viewContainer, {param1: 'value3', param2: 'value4'})
    })

    // @sad_path
    it('should log "404: Not Found" when trying to navigate to an unknown path as default reaction', () => {
      // Arrange
      const consoleLog = vi.spyOn(console, 'log'),
            viewContainer = document.createElement('div'),
            routes = [{path: '/foo', view: () => {}}],
            router = Router.create(viewContainer, routes)
      // Act
      router.navigateTo('/bar')
      // Assert
      expect(consoleLog).toHaveBeenCalledWith('404: Not Found')
    })

    // @happy_path
    it('should call the method when some <a> in the body with the "data-link" attr is clicked', () => {
      // Arrange
      const viewContainer = document.createElement('div'), routePath = '/foo',
            routes = [{path: routePath, view: () => {}}], router = Router.create(viewContainer, routes),
            routerNavigateTo = vi.spyOn(router, 'navigateTo'), navigationLink = document.createElement('a')
      navigationLink.setAttribute('href', routePath); navigationLink.setAttribute('data-link', true)
      document.body.appendChild(navigationLink)
      document.dispatchEvent(new Event('DOMContentLoaded', {bubbles: true})) // needed to setup the watchers in the router
      // Act
      navigationLink.dispatchEvent(new MouseEvent('click', {bubbles: true}))
      // Assert
      expect(routerNavigateTo)
        .toHaveBeenCalledOnce()
        .and.toHaveBeenCalledWith(routePath)
    })
  })
})
