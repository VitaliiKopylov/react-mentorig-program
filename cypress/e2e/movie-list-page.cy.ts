/// <reference types="Cypress" />

describe('MovieListPage spec', () => {
  it('should display empty state when there are no movies', () => {
    cy.visit('/');
    cy.intercept('GET', 'http://localhost:4000/movies', { data: [] });
    cy.get('[data-cy="empty-title"]').contains('No movies found');
  });

  it('should display correct movies amount and correct first movie title', () => {
    cy.visit('/');
    cy.intercept('GET', 'http://localhost:4000/movies', {
      fixture: 'allMovies.json',
    });
    cy.get('[data-cy="movies-amount"]').contains(`24 movies found`);
    cy.get('[class^=styles_movieTile__title]')
      .first()
      .contains('The Gold Rush');
  });

  it('should change query params after search submitted', () => {
    cy.visit('/');
    cy.get('[data-testid="search-input"]').type('Metropolis{enter}');
    cy.intercept('GET', 'http://localhost:4000/movies', (req) => {
      expect(req.url).to.include('search=Metropolis');
    });
  });

  it('should change query params after genre selected', () => {
    cy.visit('/');
    cy.get('[data-cy="Comedy-genre-select"]').click();
    cy.intercept('GET', 'http://localhost:4000/movies', (req) => {
      expect(req.url).to.include('filter=Comedy');
    });
  });
});
