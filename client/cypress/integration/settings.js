const navItem = "nav-main-settings";

const profileOverview = "profile-overview";
const profileOverviewName = "profile-overview-name";
const profileOverviewDate = "profile-overview-date";

const userSetting = "user-setting-row";
const userSettingName = "user-setting-name";
const userSettingEmail = "user-setting-email";
const userSettingPassword = "user-setting-password";
const userSettingPanel = "user-setting-panel";

const userFormSubmit = "user-form-submit";
const userNameFormCurrent = "user-name-current";
const userEmailFormCurrent = "user-email-current";
const userNameField = "field-name";
const userEmailField = "field-email";
const userPasswordField = "field-password";
const userPasswordConfirmField = "field-passwordConfirm";

context("Settings", () => {
  beforeEach(function () {
    cy.login();
    cy.get("@user").then((user) => {
      this.user = user;
    });
  });
  it("shows default information", function () {
    cy.visit("/");
    cy.getNrt(navItem).click();
    cy.url().should("include", "/settings");

    cy.getNrt(profileOverview).within(() => {
      cy.get("img").should("be.visible");
      cy.getNrt(profileOverviewName).should("have.text", this.user.name);
      cy.getNrt(profileOverviewDate).should("be.visible");
    });

    cy.getNrt(userSetting).should("have.length", 3);
    cy.getNrt(userSettingName).should("have.text", this.user.name);
    cy.getNrt(userSettingEmail).should("have.text", this.user.email);
    cy.getNrt(userSettingPassword).should("have.text", "***");
  });
  context("user settings", function () {
    beforeEach(() => {
      cy.intercept("POST", "/api/user/update").as("updateUser");
      cy.intercept("POST", "/api/user/update-password").as("updatePassword");
    });
    it("opens panels with form elements", function () {
      cy.visit("/");
      cy.getNrt(navItem).click();

      cy.getNrt(userSettingName).click();
      cy.getNrt(userSettingPanel).should("be.visible");
      cy.getNrt(userNameFormCurrent).should("have.text", this.user.name);
      cy.getNrt(userNameField).should("be.visible");
      cy.getNrt(userFormSubmit).should("be.visible");

      cy.getNrt(userSettingPanel).findNrt("back-button").click();
      cy.getNrt(userSettingPanel).should("not.exist");

      cy.getNrt(userSettingEmail).click();
      cy.getNrt(userSettingPanel).should("be.visible");
      cy.getNrt(userEmailFormCurrent).should("have.text", this.user.email);
      cy.getNrt(userEmailField).should("be.visible");
      cy.getNrt(userFormSubmit).should("be.visible");

      cy.getNrt(userSettingPanel).findNrt("back-button").click();
      cy.getNrt(userSettingPanel).should("not.exist");

      cy.getNrt(userSettingPassword).click();
      cy.getNrt(userSettingPanel).should("be.visible");
      cy.getNrt(userPasswordField).should("be.visible");
      cy.getNrt(userPasswordConfirmField).should("be.visible");
      cy.getNrt(userFormSubmit).should("be.visible");

      cy.getNrt(userSettingPanel).findNrt("back-button").click();
      cy.getNrt(userSettingPanel).should("not.exist");
    });
    it("can't edit name with same value", function () {
      cy.visit("/");
      cy.getNrt(navItem).click();
      cy.getNrt(userSettingName).click();
      cy.getNrt(userNameField).find("input").type(this.user.name);
      cy.getNrt(userFormSubmit).click();
      cy.getNrt(userNameField)
        .findNrt("validation-message-error")
        .should("be.visible");
    });
    it("can edit username", function () {
      cy.visit("/");
      cy.getNrt(navItem).click();
      cy.getNrt(userSettingName).click();
      cy.getNrt(userNameField).find("input").type("Test Name");
      cy.getNrt(userFormSubmit).click();
      cy.wait("@updateUser");
      cy.getNrt(userSettingPanel).should("not.exist");
      cy.getNrt(userSettingName).should("have.text", "Test Name");

      cy.getNrt(userSettingName).click();
      cy.getNrt(userNameField).find("input").type(this.user.name);
      cy.getNrt(userFormSubmit).click();
      cy.wait("@updateUser");
    });
    it("can't edit email with same value", function () {
      cy.visit("/");
      cy.getNrt(navItem).click();
      cy.getNrt(userSettingEmail).click();
      cy.getNrt(userEmailField).find("input").type(this.user.email);
      cy.getNrt(userFormSubmit).click();
      cy.getNrt(userEmailField)
        .findNrt("validation-message-error")
        .should("be.visible");
    });
    it("can't edit email with invalid address", function () {
      cy.visit("/");
      cy.getNrt(navItem).click();
      cy.getNrt(userSettingEmail).click();
      cy.getNrt(userEmailField).find("input").type("zzzzzzzzz");
      cy.getNrt(userFormSubmit).click();
      cy.getNrt(userEmailField)
        .findNrt("validation-message-error")
        .should("be.visible");
    });
    it("can edit email", function () {
      cy.visit("/");
      cy.getNrt(navItem).click();
      cy.getNrt(userSettingEmail).click();
      cy.getNrt(userEmailField).find("input").type("test123@mail.com");
      cy.getNrt(userFormSubmit).click();
      cy.wait("@updateUser");
      cy.getNrt(userSettingPanel).should("not.exist");
      cy.getNrt(userSettingEmail).should("have.text", "test123@mail.com");

      cy.getNrt(userSettingEmail).click();
      cy.getNrt(userEmailField).find("input").type(this.user.email);
      cy.getNrt(userFormSubmit).click();
      cy.wait("@updateUser");
    });
  });
});
