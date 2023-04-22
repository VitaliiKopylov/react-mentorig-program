import { TfiClose } from 'react-icons/tfi';
import { IconContext } from 'react-icons';

import { IOption } from 'types';
import styles from './styles.module.scss';

interface IBaseDropdown {
  options: IOption[];
  onSelected: (val: IOption) => void;
}

const BaseDropdown = ({ options, onSelected }: IBaseDropdown) => (
  <div className={styles.dd}>
    <IconContext.Provider
      value={{ color: 'var(--white)', className: styles.dd__closeWrapper }}
    >
      <button
        className={styles.dd__closeBtn}
        onClick={() => onSelected({ name: '', value: '' })}
      >
        <TfiClose />
      </button>
    </IconContext.Provider>
    {options.map((option: IOption) => (
      <button
        key={option.value}
        className={styles.dd__btn}
        onClick={() => onSelected(option)}
        data-testid={option.value}
      >
        {option.name}
      </button>
    ))}
  </div>
);

export default BaseDropdown;
