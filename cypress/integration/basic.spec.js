describe('Basic test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8085')
  })

  it('should have a <h1> with the text "Hello RPG Grid!"', () => {
    cy.get('h1').should('contain', 'Hello RPG Grid!')
  })
})
