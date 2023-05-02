import { useSearchParams, Outlet } from 'react-router-dom';

import SearchForm from '@components/SearchForm';
import styles from './styles.module.scss';

const AppHero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const setSearchTerm = (term: string) => {
    searchParams.set('search', term);
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className="hero-title">Find your movie</h1>
        <SearchForm initialValue={searchParams.get('search') || ''} onSearch={setSearchTerm} />
      </div>
    </div>
  );
};

export default AppHero;
