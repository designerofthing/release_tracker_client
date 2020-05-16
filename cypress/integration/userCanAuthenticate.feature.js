describe('User can authenticate', () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  describe("User can login", () => {
    beforeEach(() => {
      cy.get("a#login-link").click();
    })

    it('successfully with the correct credentials', () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth/sign_in",
        response: "fixture:login.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
      });
      cy.get("#account-bar").should("contain", "Log out user@mail.com");
    });

    it("unsuccessfully with incorrect credentials", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth/sign_in",
        status: "401",
        response: {
          errors: ["Invalid login credentials. Please try again."],
          success: false,
        },
      });
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("patsword");
        cy.get("#submit").click();
      });
      cy.get("#login-message").should('contain', 'Invalid login credentials. Please try again.')
    })
  });

  describe("User can register", () => {
    beforeEach(() => {
      cy.get("a#signup-link").click();
    })

    it("successfully with good credentials", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth",
        status: "401",
        response: 'fixture:register.json',
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.get("#signup-form").within(() => {
        cy.get("#email").type("newuser@mail.com");
        cy.get("#password").type("password123");
        cy.get("#password_confirmation").type("password123")
        cy.get("#submit").click();
      });
      cy.get("#account-bar").should('contain', 'Log out newuser@mail.com')
    })
  })
});