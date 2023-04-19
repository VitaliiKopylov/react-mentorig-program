import { VscTriangleDown } from 'react-icons/vsc';
import { IconContext } from 'react-icons';

import { useState } from 'react';

import BaseDropdown from '../BaseDropdown';

import { IOption } from 'types';
import { sortingOptions } from '../../constants';
import styles from './styles.module.scss';

interface ISortControlProps {
  options?: IOption[];
  onSelected: (option: IOption) => void;
}

const SortControl = ({
  options = sortingOptions,
  onSelected,
}: ISortControlProps) => {
  const [activeSortOption, setActiveSortOption] = useState(
    sortingOptions[0]
  );
  const [open, setOpen] = useState(false);

  function optionSelected(option: IOption) {
    if (option) {
      setActiveSortOption(option);
      onSelected(option);
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
          {activeSortOption.name}
          <IconContext.Provider
            value={{
              color: 'var(--accent_color)',
              className: styles.sort__arrow,
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
