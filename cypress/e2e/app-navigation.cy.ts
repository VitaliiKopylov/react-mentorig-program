/// <reference types="Cypress" />

describe('App Navigation', () => {
  beforeEach(() => {
    cy.fixture('allMovies').then((movies) => {
      this.movies = movies.data;
    });
  });

  it('should show correct state of search / sorting / filtering controls when search query is empty', () => {
    cy.visit(`/`);
    cy.get('[data-testid="search-input"]').should('have.value', '');
    cy.get('[data-cy="All-genre-select-wrapper"]').should(($div) => {
      const className = $div[0].className;
      expect(className).to.match(/genresFiltersItemActive/);
    });
    cy.get('[data-testid="sort-trigger"]').contains('Release Date');
  });

  it('should show correct state of search / sorting / filtering controls when there is search query', () => {
    cy.visit(`/?search=big&filter=Comedy&sortBy=title`);
    cy.get('[data-testid="search-input"]').should('have.value', 'big');
    cy.get('[data-cy="Comedy-genre-select-wrapper"]').should(($div) => {
      const className = $div[0].className;
      expect(className).to.match(/genresFiltersItemActive/);
    });
    cy.get('[data-testid="sort-trigger"]').contains('Title');
  });

  it('should show MovieDetails component when page with correct /:movieId selected', () => {
    cy.visit(`/${this.movies[0].id}`);
    cy.get('[class^=styles_movieDetails__title]').contains(
      this.movies[0].title
    );
  });

  it('should show PageNotFound component when page with incorrect /:movieId selected', () => {
    cy.visit(`/11111111111`);
    cy.get('.hero-title').contains('Not Found Page');
  });

  it('should show PageNotFound component for not found page', () => {
    cy.visit(`/some/broken/page`);
    cy.get('.hero-title').contains('Not Found Page');
  });
});
