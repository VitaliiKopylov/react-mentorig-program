import { useState } from 'react';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import styles from './styles.module.scss';

type SearchProps = {
  initialValue: string;
  onSearch: (str: string) => void;
};

const SearchForm = ({ initialValue = '', onSearch }: SearchProps) => {
  const [term, setTerm] = useState(initialValue);

  const setSearchTerm = (term: string) => {
    if (term === '') {
      onSearch('');
    }
    setTerm(term);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles.input}>
        <BaseInput
          id="search"
          placeholder="What do you want to watch?"
          value={term}
          onChange={setSearchTerm}
          data-testid="search-input"
        />
      </div>
      <BaseButton
        type="submit"
        classNames="button--search"
        disabled={term.length === 0}
        data-testid="search-submit"
      >
        Search
      </BaseButton>
    </form>
  );
};

export default SearchForm;
