describe("User can search for actor/movie", () => {
  describe("User enter search param and clicks on Search", () => {
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

    it("User can see first result", () => {
      cy.get("#result-item-2888").within(() => {
        cy.contains("Will Smith");
        cy.contains("Suicide Squad");
        cy.contains("Acting");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see second result", () => {
      cy.get("#result-item-234120").within(() => {
        cy.contains("William Smith");
        cy.contains("Paddington");
        cy.contains("Acting");
        cy.get("img").should("be.visible");
      });
    });

    it("User can see third result", () => {
      cy.get("#result-item-102494").within(() => {
        cy.contains("William G. Smith");
        cy.contains("Skeleton Key 2");
        cy.contains("Acting");
        cy.get("img").should("be.visible");
      });
    });
  });

  describe("User dont get any result", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/search*",
        response: { error_message: "no results" },
        status: 400,
      });
      cy.visit("/");
      cy.get("input#search").type("dfgdfgdfgdfgd");
      cy.get("button").contains("Search").click();
    });

    it("User receives empty response", () => {
      cy.get("#message").should("contain", "no results");
    });
  });
  describe("Query must be provided", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/search*",
        response: { error_message: "query must be provided" },
        status: 400,
      });
      cy.visit("/");
      cy.get("button").contains("Search").click();
    });

    it("User receives empty response", () => {
      cy.get("#message").should("contain", "query must be provided");
    });
  });
  describe("Internal server error", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/search*",
        response: {},
        status: 400,
      });
      cy.visit("/");
      cy.get("button").contains("Search").click();
    });

    it("User receives empty response", () => {
      cy.get("#message").should(
        "contain",
        "Request failed with status code 400"
      );
    });
  });
});
