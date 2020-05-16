describe('logged in users can track people', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/search*',
      response: 'fixture:search_response.json',
    })
    cy.visit('/')
  })

  describe('visitor', () => {
    it('cannot see track button', () => {
      cy.get("input#search").type("Will Smith");
      cy.get("button").contains("Search").click();
      cy.get('#result-item-2888').should('not.contain',"untrack")
      cy.get('#result-item-234120').should('not.contain',"track")
    })
  })
  
  describe('user', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/auth/sign_in',
        response: 'fixture:login.json',
        headers: {
          status: 200
        }
      })
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/trackers',
        response: { message: "Successfully tracked!" }, 
        headers: {
          status: 200
        }
      })
      cy.get('#login-link').click()
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
      });
      cy.get("input#search").type("Will Smith");
      cy.get("button").contains("Search").click();
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
        cy.get('button').should('contain', 'untrack')
      })
    })

    it('already tracked person has button saying "untrack"', () => {
      cy.get('#result-item-2888').within(() => {
        cy.get('button').should('contain', 'untrack')
      })
    })
    
    it('with no more space to track people get another response', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/trackers',
        status: 402,
        response: { 
          message: "You have reached your track limit",
          errors: ["You have reached your track limit"]
        },          
      })
      cy.get('#result-item-234120').within(() => {
        cy.get('button').contains('track').click()
      })
      cy.get('#result-item-234120').first().within(() => {
        cy.get('button').should('contain', 'track')
      })
      cy.get('#message').should('contain', 'You have reached your track limit')
    })
  })
})