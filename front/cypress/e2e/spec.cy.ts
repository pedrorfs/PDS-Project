describe('Principais histórias de usuário', () => {
    const nameMock: string = "Joao";

    beforeEach(() => {
        cy.intercept("POST", "/api/user/buy", {
            statusCode: 200, 
            body: []
        }).as('buy-stock');

        cy.intercept("GET", "/api/user/favorites", {
            statusCode: 200, 
            body: []
        }).as('favorites');

        cy.intercept("POST", "/api/user/new", {
            statusCode: 200, 
            body: {
                msg: "User successfully created"
            }
        }).as('cadastro');

        cy.intercept("POST", "/api/login", {
            statusCode: 200,
            body: {
                msg: "Validated successfully"
            }
        }).as('login');
        
        cy.intercept("GET", "/api/user/buy/list", {
            statusCode: 200,
            body: [
                {'Code': "AMER3", 'Name': "Americanas", 'Quantity': 1, 'Price': 100}
            ]
        }).as('list');

        cy.intercept("GET", "/api/user", {
            statusCode: 200,
            body: {
                data: {
                    balance: 15000,
                    name: nameMock
                }
            }
        }).as('user');

        cy.intercept("POST", "/api/user/favorite", {
            statusCode: 200,
            body: {
                data: {
                    balance: 15000,
                    name: nameMock
                }
            }
        }).as('favorite');
        cy.visit('/')
    })

    it('cadastro', () => {
        cy.get('.initial__content__create-account').click()
        cy.get('#name_input').type(nameMock)
        cy.get('#cpf_input').type('33333333333')
        cy.get('#email_input').type('joaoteste@email.com')
        cy.get('#password_input').type('123456')
        cy.get('#confirm_password_input').type('123456')
        
        cy.get('.register__button').click()
        cy.wait('@cadastro');
    })

    it('login', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')

        cy.get('.login__button button').click()
        cy.wait('@login');
    })

    it('dados pessoais', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.wait('@login');
        cy.get('.topbar__dropdown').click()
        cy.get('.topbar__dropdown__options #topdar_dropdown_option_config').click()
        cy.wait('@user');
        cy.get('#name_input').type('{selectall}{backspace}').type('Joao Vitor Bicalho')
        cy.get('.personal-data__button').click()
    })

    it('depósito', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('.sidebar #deposit').click()
        cy.get('.deposit input').type('500')
        cy.get('.deposit__block').click()
    })

    it('logout', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('.topbar__dropdown').click()
        cy.get('.topbar__dropdown__options #topdar_dropdown_option_logout').click()
    })

    it('listar ações', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('[data-cy="sidebar-option__invest"]').click()
        cy.get('[data-cy="stock-market"]').click()
        cy.url().should('include', '/investir/bolsa-de-valores')
    })

    it('favoritar', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('[data-cy="sidebar-option__invest"]').click()
        cy.get('[data-cy="stock-market"]').click()
        cy.get('[data-cy="favorite-stock"]').eq(0).click()
    })

    it('comprar ação', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('[data-cy="sidebar-option__invest"]').click()
        cy.get('[data-cy="stock-market"]').click()
        cy.get('[data-cy="buy-stock"]').eq(0).click()
        cy.get('[data-cy="input-investment-value"]').type('100')
        cy.get('[data-cy="confirm-investment"]').click()
        cy.url().should('include', '/carteira')
    })

    it('ver investimentos', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('[data-cy="sidebar-option__wallet"]').click()
        cy.url().should('include', '/carteira')
    })
})