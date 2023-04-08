import { VscTriangleDown } from 'react-icons/vsc';
import { IconContext } from 'react-icons';

import { useState } from 'react';

import { SortOptions } from '../../types';
import BaseDropdown from '../BaseDropdown/BaseDropdown';

import styles from './styles.module.scss';

interface ISortControlProps {
  options?: SortOptions[];
  onSelected?: () => void;
}

const SortControl = ({
  options = Object.values(SortOptions),
  onSelected,
}: ISortControlProps) => {
  const [activeSortOption, setActiveSortOption] = useState(
    SortOptions.ReleaseDate,
  );
  const [open, setOpen] = useState(false);

  function optionSelected(option: any) {
    if (option) {
      setActiveSortOption(option);
    }
    setOpen(false);
  }

  return (
    <div className={styles.sort}>
      <div className={styles.sort__label}>SORT BY</div>
      <div className={styles.sort__select}>
        <button
          className={styles.sort__trigger}
          onClick={() => setOpen(true)}
          data-testid="sort-trigger"
        >
          {activeSortOption}
          <IconContext.Provider
            value={{
              color: 'var(--accent_color)',
              className: styles.sort__triangle,
            }}
          >
            <VscTriangleDown />
          </IconContext.Provider>
        </button>
        {open && (
          <div className={styles.sort__dd} data-testid="sort-dd">
            <BaseDropdown options={options} onSelected={optionSelected} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortControl;
