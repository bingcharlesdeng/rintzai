module.exports = (on, config) => {
    return Object.assign({}, config, {
      integrationFolder: 'cypress/e2e',
      testFiles: '**/*.cy.js',
    })
  }