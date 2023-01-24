describe("Checking forms", () => {
    //
    beforeEach(() => {
        cy.visit("/")
    })


    it("1. signin form fields", () => {
        cy.get("[data-testid=username]").should('exist').type('gabriel')
        cy.get("[data-testid=password]").should('exist').type('123456')
        cy.get("[data-testid=submit]").should('exist')
        cy.get("[data-testid=username]").should('exist').clear()
        cy.get("[data-testid=password]").should('exist').clear()
    })

    it("2. signup form fiels", () => {
        cy.contains("Cadastre-se").click()
        cy.contains("Cadastre-se").should('exist')
        cy.get("[data-testid=name]").should("exist").type("Junior")
        cy.get("[data-testid=username]").should("exist").type("Junin")
        cy.get("[data-testid=password]").should("exist").type("123456")
        cy.get("[data-testid=submit]").should('exist')
        cy.get("[data-testid=name]").should("exist").clear()
        cy.get("[data-testid=username]").should("exist").clear()
        cy.get("[data-testid=password]").should("exist").clear()

    })




})