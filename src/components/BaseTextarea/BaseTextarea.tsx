import type { TextareaHTMLAttributes } from 'react';


type IBaseTextareaProps = {
  onChange: (val: string) => void;
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
} & Omit <TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

const BaseTextarea = ({
  labelText,
  id,
  onChange,
  placeholder,
  value,
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  </div>
);

export default BaseTextarea;
