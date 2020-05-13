describe("User can search for actor/movie", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/search*",
      response: "fixture:search_response.json",
    });
    cy.visit("/");
  });
  describe("User enter search param and clicks on Search", () => {
    beforeEach(() => {
      cy.get("input#search").type("Tom Hanks");
      cy.get("button").contains("Search").click();
    });

    it("User can see first result", () => {
      cy.get("#result-item-1").within(() => {
        cy.contains("Tom Hanks");
        cy.contains("Cast Away");
        cy.contains("2000");
        cy.contains("Producer");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see second result", () => {
      cy.get("#result-item-2").within(() => {
        cy.contains("Tom Hand");
        cy.contains("Scream 2");
        cy.contains("1997");
        cy.contains("Actor");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see third result", () => {
      cy.get("#result-item-3").within(() => {
        cy.contains("Jim Hanks");
        cy.contains("Abnormal Attraction");
        cy.contains("2018");
        cy.contains("Actor");
        cy.get("img").should("be.visible");
      });
    });
  });
});
