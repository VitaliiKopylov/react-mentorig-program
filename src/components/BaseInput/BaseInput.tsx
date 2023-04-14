import type { InputHTMLAttributes } from 'react';
// import styles from './styles.module.css';

type InputProps = {
  onChange: (val: string) => void;
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const BaseInput = ({
  labelText,
  id,
  onChange,
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
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  </div>
);

export default BaseInput;
