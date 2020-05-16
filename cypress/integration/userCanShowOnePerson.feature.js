describe("User can show one person", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/search*",
      response: "fixture:search_response.json",
    });
    cy.visit("/");
    cy.get("input#search").type("Will Smith");
    cy.get("button").contains("Search").click();
  });

  describe("with all genres selected", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/movie_person/*",
        response: "fixture:genres_selection1_response.json",
      });
      cy.get("#track-2888").click();
    });
    it("User can see upcoming releases first result", () => {
      cy.get("#release-item-1").within(() => {
        cy.contains("Will Smith's New Comedy Movie");
        cy.contains("Tracked people: Will Smith");
        cy.contains("Tracked genres: Comedy, Musical");
        cy.contains("2022-10-02");
        cy.contains("Actor");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see upcoming releases second result", () => {
      cy.get("#release-item-2").within(() => {
        cy.contains("Will Smith's New Thriller Movie");
        cy.contains("Tracked people: Will Smith");
        cy.contains("Tracked genres: Thriller, Musical");
        cy.contains("2023-11-02");
        cy.contains("Actor");
        cy.contains("stuff happened");
        cy.get("img").should("be.visible");
      });
    });

    it("User can go back to previous page", () => {
      cy.get("#btn-back").click();
      cy.get("#release-header").should("not.contain", "Upcoming Releases");
      cy.get("button").should("contain", "Search");
    });
  });

  describe("with no result", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/movie_person/*",
        response: { error_message: "No content found for that person" },
        status: 400,
      });
      cy.get("#track-2888").click();
    });

    it("gives error message", () => {
      cy.get("#message").should("contain", "No content found for that person");
    });

    it("error message dissapears after a few seconds", () => {
      cy.wait(3000);
      cy.get("#message").should(
        "not.contain",
        "No content found for that person"
      );
    });
  });
});
