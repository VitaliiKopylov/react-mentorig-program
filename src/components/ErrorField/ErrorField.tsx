import { FieldError } from 'react-hook-form';

const ErrorField = ({ error }: { error: FieldError }) => {
  let errorMessage;
  switch (error.type) {
    case 'required':
      errorMessage = 'This is required field';
      break;
    default:
      errorMessage = error.message;
      break;
  }
  return <div className="error-message">{errorMessage}</div>;
};

export default ErrorField;
