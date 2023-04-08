import { useState } from 'react';
import BaseButton from '../BaseButton/BaseButton';
import BaseInput from '../BaseInput/BaseInput';
import styles from './styles.module.css';

type SearchProps = {
  initialValue: string,
  onSearch:  (str: string) => void;
};

const SearchForm = ({ initialValue = 'Search...', onSearch }: SearchProps) => {
  const [term, setTerm] = useState(initialValue);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <BaseInput
        id="search"
        placeholder="What do you want to watch?"
        value={term}
        onChangeHandler={setTerm}
        data-testid="search-input"
      />
      <BaseButton
        type="submit"
        classNames='button--search'
        disabled={term.length === 0}
        data-testid="search-submit"
      >
        Search
      </BaseButton>
    </form>
  );
};

export default SearchForm;
