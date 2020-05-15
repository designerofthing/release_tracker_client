describe("User can track one person", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/search*",
      response: "fixture:search_response.json",
    });
    cy.visit("/");
    cy.get("input#search").type("Tom Hanks");
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
      cy.get("#track-1").click();
    });
    it("User can see upcoming releases first result", () => {
      cy.get("#release-item-1").within(() => {
        cy.contains("Tom Hank's New Comedy Movie");
        cy.contains("Tracked people: Tom Hanks");
        cy.contains("Tracked genres: Comedy, Musical");
        cy.contains("2022-10-02");
        cy.contains("Actor");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see upcoming releases second result", () => {
      cy.get("#release-item-2").within(() => {
        cy.contains("Tom Hank's New Thriller Movie");
        cy.contains("Tracked people: Tom Hanks");
        cy.contains("Tracked genres: Thriller, Musical");
        cy.contains("2023-11-02");
        cy.contains("Actor");
        cy.contains("stuff happened");
        cy.get("img").should("be.visible");
      });
    });

    it("User can go back to previous page", () => {
      cy.get("#btn-back").click();
      cy.get("#header").should("contain", "Release Tracker");
      cy.get("button").should("contain", "Search");
    });
  });

  describe("with filtered selection of genres", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/movie_person/*",
        response: "fixture:genres_selection2_response.json",
      });
      cy.get("#drama").click();
      cy.get("#track-1").click();
    });
    it("User can see upcoming releases first result", () => {
      cy.get("#release-item-1").within(() => {
        cy.contains("Tom Hank's New Comedy Movie");
        cy.contains("Tracked people: Tom Hanks");
        cy.contains("Tracked genres: Comedy, Musical");
        cy.contains("2022-10-02");
        cy.contains("Actor");
        cy.contains("stuff happened");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see upcoming releases second result", () => {
      cy.get("#release-item-2").within(() => {
        cy.contains("Tom Hank's New Drama Movie");
        cy.contains("Tracked people: Tom Hanks");
        cy.contains("Tracked genres: Drama, Musical");
        cy.contains("2023-11-02");
        cy.contains("Actor");
        cy.contains("stuff happened");
        cy.get("img").should("be.visible");
      });
    });

    it("User can go back to previous page", () => {
      cy.get("#btn-back").click();
      cy.get("#header").should("contain", "Release Tracker");
      cy.get("button").should("contain", "Search");
    });
  });
});
