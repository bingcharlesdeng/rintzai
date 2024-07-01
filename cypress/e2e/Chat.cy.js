describe('Chat E2E', () => {
    beforeEach(() => {
      cy.login('testuser@example.com', 'password123');
    });
  
    it('completes a chat workflow', () => {
      cy.visit('/chat');
  
      // Start a new chat
      cy.contains('New Chat').click();
      cy.get('input[placeholder="Search by name, email, or handle"]').type('John Doe');
      cy.contains('John Doe').click();
  
      // Send a message
      cy.get('input[placeholder="Type your message..."]').type('Hello, John!');
      cy.contains('Send').click();
  
      // Verify message is sent
      cy.contains('Hello, John!').should('be.visible');
  
      // Search for a message
      cy.get('input[placeholder="Search conversations..."]').type('Hello');
      cy.contains('Hello, John!').should('be.visible');
  
      // Switch between conversations
      cy.contains('New Chat').click();
      cy.get('input[placeholder="Search by name, email, or handle"]').type('Jane Smith');
      cy.contains('Jane Smith').click();
      cy.get('input[placeholder="Type your message..."]').type('Hi Jane!');
      cy.contains('Send').click();
  
      // Verify multiple conversations
      cy.contains('John Doe').should('be.visible');
      cy.contains('Jane Smith').should('be.visible');
    });
  });