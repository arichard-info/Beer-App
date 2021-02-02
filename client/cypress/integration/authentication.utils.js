export const loginForm = "login-form";
export const loginFieldEmail = "field-email";
export const loginFieldPassword = "field-password";

export const login = () => {
  cy.visit("/");
  cy.fixture("authentication/user").then((user) => {
    cy.intercept("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(loginFieldEmail).find("input").type(user.username);
      cy.getNrt(loginFieldPassword)
        .find("input")
        .type(`${user.password}{enter}`);
    });
    cy.wait("@loginRequest");
  });
};
