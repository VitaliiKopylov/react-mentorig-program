import { VscTriangleDown } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import clsx from 'clsx';

import { useState } from 'react';

import styles from './styles.module.scss';

interface IOption {
  value: string;
  label: string;
}

interface IBaseSelectProps {
  labelText?: string;
  options: IOption[];
  onChange: (selected: string[]) => void;
  selected: string[];
}

const BaseSelect = ({
  labelText,
  options,
  onChange,
  selected,
}: IBaseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: IOption) => {
    
    const index = selected.indexOf(option.value);
    let newValue = [...selected];
    

    if (index === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(index, 1);
    }
    console.log(option, index, newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.bSelect}>
      {labelText && <div className="form-label">{labelText}</div>}
      <div className={styles.bSelect__header} onClick={handleToggle}>
        <div className={styles.bSelect__selected}>
          {selected.length === 0 ? 'Select Genre' : selected.join(', ')}
        </div>
        <IconContext.Provider
          value={{
            color: 'var(--accent_color)',
            className: clsx(styles.bSelect__arrow, isOpen && styles.bSelect__arrowRotated)
          }}
        >
          <VscTriangleDown />
        </IconContext.Provider>
      </div>
      {isOpen && (
        <div className={styles.bSelect__options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.bSelect__option}
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selected.indexOf(option.value) !== -1}
                readOnly
              />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseSelect;
