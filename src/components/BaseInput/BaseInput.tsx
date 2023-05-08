import type { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorField from '@components/ErrorField/ErrorField';

type InputProps = {
  onChange: (val: string) => void;
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
  error?: FieldError;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const BaseInput = ({
  labelText,
  id,
  onChange,
  placeholder,
  value,
  error,
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
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
    {error && <ErrorField error={error} />}
  </div>
);

export default BaseInput;
