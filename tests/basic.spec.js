describe('Basic test', () => {
  it('should have a <h1> with the text "Hello RPG Grid!"', () => {
    cy.get('h1').should('contain', 'Hello RPG Grid!')
  })
})