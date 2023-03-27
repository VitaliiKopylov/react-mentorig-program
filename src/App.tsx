import { useState } from 'react';
import Counter from './components/Counter/Counter';
import SearchForm from './components/SearchForm/SearchForm';
import GenreSelect from './components/GenreSelect/GenreSelect';

import './assets/styles/vars.css';
import './assets/styles/typography.css';

function App() {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const [activeGenre, setActiveGenre] = useState(genres[0]);

  return (
    <div className='App'>
      <div>
        <h2 className='hero-title'>Counter component</h2>
        <Counter initialValue={3} />
      </div>
      <div style={{ maxWidth: '900px' }}>
        <h2 className='hero-title'>SearchForm component</h2>
        <SearchForm initialValue='Search...' onSearch={term => console.log(term)} />
      </div>
      <div style={{ maxWidth: '900px' }}>
        <h2 className='hero-title' data-cy="title">GenreSelect component</h2>
        <GenreSelect onSelect={genre => setActiveGenre(genre)} genres={genres} activeGenre={activeGenre} />
      </div>
    </div>
  );
}

export default App;
