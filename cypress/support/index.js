import "./commands";
import "@cypress/code-coverage/support";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

Cypress.dayjs = dayjs;
Cypress.duration = duration;

beforeEach(() => {
  cy.visit("./");
  if (cy.get("button#rcc-confirm-button")) {
    cy.get("button#rcc-confirm-button").click();
  }
  if (cy.get("input[name=username]")) {
    cy.get("input[name=username]").type(Cypress.env("username"));
    cy.get("input[name=password]").type(`${Cypress.env("password")}{enter}`, {
      log: false
    });
  }
});
