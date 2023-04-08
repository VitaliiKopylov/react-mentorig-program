import type { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHandler: (str: string) => void;
};

const BaseInput = ({
  labelText,
  id,
  onChangeHandler,
  placeholder,
  value,
  ...props
}: InputProps) => (
  <div>
    {labelText && (
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
    )}
    <input
      type={props.type || 'text'}
      id={id}
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      {...props}
    />
  </div>
);

export default BaseInput;
