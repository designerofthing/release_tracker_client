describe("User can track multiple people", () => {
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

  describe("user click on track", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/v1/movie_person/*",
        response: { message: "Person tracked" },
      });
      cy.get("#track-1").click();
      cy.get("#track-2").click();
    });
    it("User track first person", () => {
      cy.get("#track-1").should("contain", "tracked");
    });
    it("User can track second person", () => {
      cy.get("#track-2").should("contain", "tracked");
    });
  })
})



describe("User can view tracked results", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/user/*",
      response: "fixture:tracked_page_response.json",
    });
    cy.visit("/");
    cy.get("button").contains("View Your Tracker").click();
  });

  it("User can see tracked people list", () => {
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













  describe("user click on track", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/v1/movie_person/*",
        response: { message: "Person tracked" },
      });
      cy.get("#track-1").click();
      cy.get("#track-2").click();
    });
    it("User track first person", () => {
      cy.get("#track-1").should("contain", "tracked");
    });
    it("User can track second person", () => {
      cy.get("#track-2").should("contain", "tracked");
    });
  })
})
