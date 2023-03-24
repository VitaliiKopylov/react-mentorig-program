import styles from './styles.module.css';

type InputProps = {
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange: (str: string) => void;
};

const BaseInput = ({
  labelText,
  id,
  onChange,
  placeholder,
  value,
}: InputProps) => (
  <>
    {labelText && <label htmlFor={id}>{labelText}</label>}
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </>
);

export default BaseInput;
