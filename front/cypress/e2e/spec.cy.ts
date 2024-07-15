describe('Teste Cadastro', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('cadastro', () => {
    // cy.visit('/')
    cy.get('.initial__content__create-account').click()
    cy.get('#name_input').type('Joao')
    cy.get('#cpf_input').type('33333333333')
    cy.get('#email_input').type('joaoteste@email.com')
    cy.get('#password_input').type('123456')
    cy.get('#confirm_password_input').type('123456')
    cy.get('.register__button').click()

    // cy.get('#cpf_input_login').type('33333333333')
    // cy.get('#password_input_login').type('123456')
    // cy.get('.login__button').click()
  })

  it('login', () => {
    // cy.visit('/')
    cy.get('.initial__content__access-account').click()
    // cy.get('#name_input').type('Joao')
    // cy.get('#cpf_input').type('33333333333')
    // cy.get('#email_input').type('joaoteste@email.com')
    // cy.get('#password_input').type('123456')
    // cy.get('#confirm_password_input').type('123456')
    // cy.get('.register__button').click()

    cy.get('#cpf_input_login').type('33333333333')
    cy.get('#password_input_login').type('123456')
    cy.get('.login__button button').click()
    // cy.visit('/home')
  })

  // it('homepage', () => {
  //   cy.visit('/home')
  // })
})