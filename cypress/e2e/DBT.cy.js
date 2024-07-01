describe('DBT E2E', () => {
    beforeEach(() => {
      cy.login('testuser@example.com', 'password123');
    });
  
    it('completes a DBT workflow', () => {
      cy.visit('/dbt');
  
      // Complete a DBT skill
      cy.contains('Skills').click();
      cy.contains('Mindfulness').click();
      cy.contains('Observe').click();
  
      // Fill out a diary card
      cy.contains('Diary Card').click();
      cy.get('input[type="date"]').type('2023-06-30');
      cy.get('textarea[name="emotions"]').type('Calm and focused');
      cy.get('textarea[name="urges"]').type('No strong urges');
      cy.get('textarea[name="skillsUsed"]').type('Mindful breathing, Observe skill');
      cy.get('input[name="selfHarmUrges"]').type('0');
      cy.get('input[name="suicidalIdeation"]').type('0');
      cy.contains('Submit Entry').click();
  
      // Complete a DBT exercise
      cy.contains('Exercises').click();
      cy.contains('Mindful Breathing').parent().contains('Start Exercise').click();
      cy.contains('Mark as Complete').click();
  
      // Check progress
      cy.contains('Progress').click();
      cy.contains('Your DBT Progress').should('be.visible');
      cy.get('.progress-stats').should('contain', '1');  // Completed skill
      cy.get('.progress-stats').should('contain', '1');  // Completed exercise
      cy.get('.progress-stats').should('contain', '1');  // Diary entry
  
      // View resources
      cy.contains('Resources').click();
      cy.contains('DBT Skills Training Manual').should('be.visible');
    });
  });