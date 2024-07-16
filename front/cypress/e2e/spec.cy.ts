describe('Teste Cadastro', () => {
    const nameMock: string = "Joao";

    beforeEach(() => {
        cy.intercept("POST", "/api/login", {
            statusCode: 200,
            body: {
                msg: "Validated successfully"
            }
        }).as('login');
        
        cy.intercept("GET", "/api/user/buy/list", {
            statusCode: 200,
            body: {
                name: nameMock,
                balance: 15007
            }
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
        cy.visit('/')
    })

    it('cadastro', () => {
        cy.get('.initial__content__create-account').click()
        cy.get('#name_input').type(nameMock)
        cy.get('#cpf_input').type('33333333333')
        cy.get('#email_input').type('joaoteste@email.com')
        cy.get('#password_input').type('123456')
        cy.get('#confirm_password_input').type('123456')
        cy.intercept("POST", "/api/user/new", {
            statusCode: 200
        }).as('cadastro');
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
        
        cy.intercept("POST", "/api/login", {
            statusCode: 200,
            body: {
                msg: "Validated successfully"
            }
        }).as('login');
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

    it('deposit', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('.sidebar #deposit').click()
        cy.get('.deposit input').type('500')
        cy.get('.deposit__block').click()
        // cy.visit('/home')
    })

    it('logout', () => {
        cy.get('.initial__content__access-account').click()
        cy.get('#cpf_input_login').type('33333333333')
        cy.get('#password_input_login').type('123456')
        cy.get('.login__button button').click()
        cy.get('.topbar__dropdown').click()
        cy.get('.topbar__dropdown__options #topdar_dropdown_option_logout').click()
    })


})