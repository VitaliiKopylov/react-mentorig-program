import type { TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import ErrorField from '@components/ErrorField/ErrorField';

type IBaseTextareaProps = {
  onChange: (val: string) => void;
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
  error?: FieldError;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

const BaseTextarea = ({
  labelText,
  id,
  onChange,
  placeholder,
  value,
  error,
  ...props
}: IBaseTextareaProps) => (
  <div>
    {labelText && (
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
    )}
    <textarea
      id={id}
      placeholder={placeholder}
      className="textarea"
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
    {error && <ErrorField error={error} />}
  </div>
);

export default BaseTextarea;
