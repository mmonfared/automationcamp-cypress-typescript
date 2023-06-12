/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
export {}
declare global {
  namespace Cypress {
    interface Chainable {
        /**
         * This function orders pizza
         * @param size Size of the Pizza
         * @param toppings What do you want on your pizza?
         * @param quantity ...
         * @param flavor 
         * @param sauce 
         * @example
         * // This is an example
         * cy.orderPizza('Small', ['Onions', 'Tomatoes'], 5)
         * @
         */
        orderPizza(size:  'Large' | 'Medium' | 'Small',
        toppings: string[],
        quantity: number,
        flavor?: 'Cheese' | 'Pepperoni' | 'Supreme' | 'Veggie Delight',
        sauce?: string,): Chainable<void>

    }
  }
}

Cypress.Commands.add('orderPizza', (
    size: 'Large' | 'Medium' | 'Small',
    toppings: string[],
    quantity: number,
    flavor?: 'Cheese' | 'Pepperoni' | 'Supreme' | 'Veggie Delight',
    sauce?: string,
) => {
    cy.get('label').contains(size).siblings('input').check()
    if (flavor) {
        cy.get('#select_flavor').select(flavor)
    }
    if (sauce) {
        cy.contains(sauce).check()
    }
    toppings.forEach(topping => {
        cy.get('label').contains(topping).siblings('input').check()
    })
    cy.get('#quantity').type(quantity.toString())
    cy.get('#submit_button').click()
    cy.get("#added_message", { timeout: 6000 }).should('be.visible')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
