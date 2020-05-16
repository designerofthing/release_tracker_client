
describe("User can view upcoming releases from tracked people", () => {
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

  it("list of first tracked person releases", () => {
    cy.get("#release-item-1").within(() => {
      cy.contains("Tom Hank's New Drama Movie");
      cy.contains("Tracked people: Tom Hanks");
      cy.contains("Tracked genres: Drama, Musical");
      cy.contains("2023-11-02");
      cy.contains("Actor");
      cy.contains("stuff happened");
      cy.get("img").should("be.visible");
    });
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

  it("list of second tracked person releases", () => {
    cy.get("#release-item-3").within(() => {
      cy.contains("Will Smith's New Drama Movie");
      cy.contains("Tracked people: Will Smith");
      cy.contains("Tracked genres: thriller, Musical");
      cy.contains("2022-18-02");
      cy.contains("Actor");
      cy.contains("crazy stuff happened");
      cy.get("img").should("be.visible");
    });
    cy.get("#release-item-4").within(() => {
      cy.contains("Will smith's New Comedy Movie");
      cy.contains("Tracked people: Will Smith");
      cy.contains("Tracked genres: Comedy, Musical");
      cy.contains("2021-11-12");
      cy.contains("Actor");
      cy.contains("Awesome stuff happened");
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
