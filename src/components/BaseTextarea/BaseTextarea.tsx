import type { TextareaHTMLAttributes } from 'react';

interface IBaseTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChangeHandler: (str: string) => void;
}

const BaseTextarea = ({
  labelText,
  id,
  onChangeHandler,
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
      onChange={(e) => onChangeHandler(e.target.value)}
      {...props}
    />
  </div>
);

export default BaseTextarea;
