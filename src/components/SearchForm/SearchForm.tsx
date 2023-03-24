import { useState } from 'react';
import BaseButton from '../BaseButton/BaseButton';
import BaseInput from '../BaseInput/BaseInput';
import styles from './styles.module.css';

type SearchProps = {
  initialValue: string
};

const SearchForm = ({ initialValue }: SearchProps) => {
  const [term, setTerm] = useState(initialValue);

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(term);
  };

  return (
    <form className={styles.container} onSubmit={onSearch}>
      <BaseInput
        id="search"
        placeholder="What do you want to watch?"
        value={term}
        onChange={setTerm}
      />
      <BaseButton
        type="submit"
        classNames='button--search'
        disabled={term.length === 0}
      >
        Search
      </BaseButton>
    </form>
  );
};

export default SearchForm;
