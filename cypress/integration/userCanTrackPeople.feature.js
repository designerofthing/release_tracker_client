describe('logged in users can track people', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/trackers',
      response: { message: "Successfully tracked!" }, 
      headers: {
        status: 200
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/search*',
      response: 'fixture:search_response.json',
    })
    cy.visit('/')
    cy.get("input#search").type("Will Smith");
    cy.get("button").contains("Search").click();
  })

  it('not logged in user cannot see track button', () => {
    cy.get('#result-item-2888').within(() => {
      cy.get('button').contains('track').should('not.exist')
    })
  })
  
  describe('successfully logged in user', () => {
    beforeEach(() => {
      cy.get('#account-bar').within(() => {
        cy.get('button').contains('Sign in').click()
      })
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
      });
      cy.get("#account-bar").should("contain", "Log out user@mail.com");
    })

    it('can see track button', () => {
      cy.get('#result-item-234120').within(() => {
        cy.get('button').contains('track').should('exist')
      })
    })
    
    it('can click the button and get a response from server', () => {
      cy.get('#result-item-234120').within(() => {
        cy.get('button').contains('track').click()
      })
      cy.get('#result-item-234120').within(() => {
        cy.get('button').should('contain', 'tracked')
      })
    })

    it('already tracked person has button saying "tracked"', () => {
      cy.get('#result-item-234120').within(() => {
        cy.get('button').contains('tracked').click()
      })
    })
    
    it('with no more space to track people get another response', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/trackers',
        response: { message: "You have reached your track limit" }, 
        headers: {
          status: 200
        }            
      })
      cy.get('#result-item-').first().within(() => {
        cy.get('button').contains('track').click()
      })
      cy.get('#result-item-').first().within(() => {
        cy.get('button').should('contain', 'track')
      })
      cy.get('#error-message').should('contain', 'You have reached your track limit')
    })
  })
})