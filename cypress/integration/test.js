describe("User can search for actor/movie", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/search",
      response: "fixture:search_response.json",
    });
  });
  it("User enter search param and clicks on Search", () => {
    cy.visit("/");
    cy.get("input#search").type("Tom Hanks");
    cy.get("button").click();
  });
});
