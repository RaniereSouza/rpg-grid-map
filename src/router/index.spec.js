// @vitest-environment jsdom
import { describe, it, should as initShouldSyntax, vi, expect } from 'vitest'
import userEvent from '@testing-library/user-event'


import View from '../lib/View'

import Router from '.'

describe('class #Router', () => {
  initShouldSyntax()

  describe('(static) method #create', () => {
    // @happy_path
    it('should instantiate correctly with an HTMLElement as viewContainer', () => {
      // Arrange
      const viewContainer = document.createElement('div'),
            createRouter = () => Router.create(viewContainer)
      // Assert
      createRouter.should.not.throw
      createRouter().should.be.an.instanceof(Router)
    })

    // @happy_path
    it('should instantiate correctly with a valid array of routes', () => {
      // Arrange
      const viewContainer = document.createElement('div'),
            routes = [{path: '/', view: () => {}}],
            createRouter = () => Router.create(viewContainer, routes)
      // Assert
      createRouter.should.not.throw
      createRouter().should.be.an.instanceof(Router)
    })

    // @sad_path
    it('should not instantiate correctly with a viewContainer that isn\'t an HTMLElement', () => {
      // Arrange
      const viewContainer = {},
            createRouter = () => Router.create(viewContainer)
      // Assert
      createRouter.should.throw(TypeError, 'viewContainer argument must be an HTMLElement')
    })

    // @sad_path
    it('should not instantiate correctly with routes that that are not a valid array of routes', () => {
      // Arrange
      const viewContainer = document.createElement('div'),
            badRoutesA = {},
            badRoutesB = ['NaR', null, 42],
            createRouterA = () => Router.create(viewContainer, badRoutesA),
            createRouterB = () => Router.create(viewContainer, badRoutesB)
      // Assert
      createRouterA.should.throw(TypeError, 'routes argument must be a valid array of routes')
      createRouterB.should.throw(TypeError, 'routes argument must be a valid array of routes')
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
    it('should load the correct content in the viewContainer when navigating to the correct path', () => {
      // Arrange
      const htmlTemplateA = '<ul><li>Show</li><li>Foo</li></ul>',
            htmlTemplateB = '<h1>Show</h1><h2>Bar</h2>'
      class ViewSubclassA extends View {
        constructor() { super() } __htmlTemplate() { return htmlTemplateA }
      }
      class ViewSubclassB extends View {
        constructor() { super() } __htmlTemplate() { return htmlTemplateB }
      }
      const viewContainer = document.createElement('div'),
            routes = [
              {path: '/foo', view: new ViewSubclassA()},
              {path: '/bar', view: new ViewSubclassB()},
            ],
            router = Router.create(viewContainer, routes)
      // Act
      router.navigateTo('/foo')
      // Assert
      viewContainer.innerHTML.should.contain(htmlTemplateA)
      // Act
      router.navigateTo('/bar')
      // Assert
      viewContainer.innerHTML.should.contain(htmlTemplateB)
    })

    // @happy_path
    it('should pass the correct route params to the view when navigating to the correct path', () => {
      // Arrange
      class ViewSubclass extends View { constructor() { super() } }
      const viewA = new ViewSubclass(),
            viewARenderSpy = vi.spyOn(viewA, 'render'),
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
      expect(viewARenderSpy).toHaveBeenCalledWith(viewContainer, {param1: 'value1', param2: 'value2'})
      // Act
      router.navigateTo('/bar/value3/bli/value4')
      // Assert
      expect(viewB).toHaveBeenCalledWith(viewContainer, {param1: 'value3', param2: 'value4'})
    })

    // @happy_path
    it.only('should call the method when some <a> in the body with the "data-link" attr is clicked', async () => {
      // Arrange
      const user = userEvent.setup({document}),
            viewContainer = document.createElement('div'),
            routes = [{path: '/foo', view: () => {}}],
            router = Router.create(viewContainer, routes),
            routerNavigateToSpy = vi.spyOn(router, 'navigateTo'),
            navigationLink = document.createElement('a')
      navigationLink.setAttribute('href', '/foo')
      navigationLink.setAttribute('data-link', '')
      document.body.appendChild(navigationLink)
      // Act
      await user.click(navigationLink)
      // Assert
      expect(routerNavigateToSpy).toHaveBeenCalled()
    })

    // @sad_path
    it('should log "404: Not Found" when trying to navigate to an unknown path, and nothing else', () => {
      // Arrange
      const consoleLogSpy = vi.spyOn(console, 'log'),
            viewContainer = document.createElement('div'),
            routes = [{path: '/foo', view: () => {}}],
            router = Router.create(viewContainer, routes)
      // Act
      router.navigateTo('/bar')
      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith('404: Not Found')
    })
  })
})
