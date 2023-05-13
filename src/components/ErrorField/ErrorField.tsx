import { FieldError } from 'react-hook-form';

const ErrorField = ({ error }: { error: FieldError }) => {
  const errorMessage =
    error.type === 'required' ? 'This is required field' : error.message;
  return <div className="error-message">{errorMessage}</div>;
};

export default ErrorField;
