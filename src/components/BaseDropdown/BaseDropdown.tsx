import { TfiClose } from 'react-icons/tfi';
import { IconContext } from 'react-icons';

import styles from './styles.module.scss';

const BaseDropdown = ({ options, onSelected }: any) => (
  <div className={styles.dd}>
    <IconContext.Provider
      value={{ color: 'var(--white)', className: styles.dd__closeWrapper }}
    >
      <button className={styles.dd__closeBtn} onClick={() => onSelected('')}>
        <TfiClose />
      </button>
    </IconContext.Provider>
    {options.map((option: any) => (
      <button
        key={option}
        className={styles.dd__btn}
        onClick={() => onSelected(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

export default BaseDropdown;
