
describe('Community E2E', () => {
    beforeEach(() => {
      cy.login('testuser@example.com', 'password123');
    });
  
    it('interacts with community features', () => {
      cy.visit('/community');
  
      // View coping strategies
      cy.contains('Coping Strategies').click();
      cy.contains('Deep Breathing').should('be.visible');
  
      // View journal prompts
      cy.contains('Journal Prompts').click();
      cy.contains('What are you grateful for today?').should('be.visible');
  
      // View motivational quotes
      cy.contains('Motivational Quotes').click();
      cy.contains('Believe you can and you\'re halfway there.').should('be.visible');
  
      // Add a contribution
      cy.contains('Contribute').click();
      cy.get('select').select('Coping Strategy');
      cy.get('input[placeholder="Title"]').type('Mindful Walking');
      cy.get('textarea').type('Take a walk and focus on your surroundings');
      cy.contains('Submit Contribution').click();
  
      // Verify new contribution
      cy.contains('Coping Strategies').click();
      cy.contains('Mindful Walking').should('be.visible');
    });
  });