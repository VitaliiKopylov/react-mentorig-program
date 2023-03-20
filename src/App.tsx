import React from 'react';
import './assets/styles/vars.css';
import './assets/styles/typography.css';

import Counter from './components/Counter/Counter';
import SearchForm from './components/SearchForm/SearchForm';
import GenreSelect from './components/GenreSelect/GenreSelect';

function App() {
  return (
    <div className="App">
      <div>
        <h2 className="hero-title">Counter component</h2>
        <Counter initialValue={3} />
      </div>
      <div style={{ maxWidth: '900px' }}>
        <h2 className="hero-title">SearchForm component</h2>
        <SearchForm initialValue="Search..." />
      </div>
      <div style={{ maxWidth: '900px' }}>
        <h2 className="hero-title">GenreSelect component</h2>
        <GenreSelect />
      </div>
    </div>
  );
}

export default App;
