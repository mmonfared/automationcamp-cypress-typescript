import * as users from '@fixtures/example.json'
const login = (user: string, password: "admin" | string) => {
    cy.get("#user").type(user)
    cy.get("#password").type(password)
    cy.get("#login").click()
}

it('Verify valid login', () => {
    cy.visit('https://play1.automationcamp.ir/login.html')
    login('admin', 'admin')
    cy.contains("Dinesh's Pizza House").should('be.visible')
})

it('Verify invalid login', () => {
    cy.visit('https://play1.automationcamp.ir/login.html')
    login('admin', '123')
    cy.get("#message").should('contain.text', 'Incorrect username or password.')
})

it('Verify order', () => {
    cy.visit('https://play1.automationcamp.ir/order_submit.html')
    cy.orderPizza('Large', ['Onions'], 3)
    cy.orderPizza('Small', ['Onions', 'Tomatoes'], 5)
})

it.only('Fixture', () => {
    cy.visit('https://play1.automationcamp.ir/order_submit.html')
    cy.log(users[0])
    cy.log(users[1])
    
})

