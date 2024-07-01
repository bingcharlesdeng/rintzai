describe('CBT E2E', () => {
    beforeEach(() => {
      cy.login('testuser@example.com', 'password123');
    });
  
    it('completes a CBT workflow', () => {
      cy.visit('/cbt');
  
      // Add a thought record
      cy.contains('Thought Record').click();
      cy.get('#situation').type('Feeling anxious about a presentation');
      cy.get('#thoughts').type('I will mess up and everyone will laugh at me');
      cy.get('#emotions').type('Anxiety, fear');
      cy.get('#behaviors').type('Avoiding preparation');
      cy.get('#alternativeThoughts').type('I have prepared well and can handle challenges');
      cy.contains('Save Thought Record').click();
  
      // Verify thought record is saved
      cy.contains('Feeling anxious about a presentation').should('be.visible');
  
      // Add a cognitive distortion
      cy.contains('Cognitive Distortions').click();
      cy.get('select').select('Catastrophizing');
      cy.get('textarea').type('Assuming the presentation will be a total disaster');
      cy.contains('Save Example').click();
  
      // Complete a CBT exercise
      cy.contains('CBT Exercises').click();
      cy.contains('Mindful Breathing').parent().contains('Start Exercise').click();
      cy.contains('Mark as Complete').click();
  
      // Check progress
      cy.contains('Progress').click();
      cy.contains('Your CBT Progress').should('be.visible');
      cy.get('.progress-stats').should('contain', '1');
    });
  });