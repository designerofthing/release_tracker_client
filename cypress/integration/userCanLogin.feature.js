describe("User can login", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
    cy.get("a#login-link").click();
  });

  it("with the correct credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:TODO.json",
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
  
  it("but not with incorrect credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:TODO",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("patsword");
      cy.get("#submit").click();
    });
    cy.get("#error-message");
  });
});
