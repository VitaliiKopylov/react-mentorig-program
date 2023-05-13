import BaseButton from '@components/BaseButton/BaseButton';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="hero-title">Not Found Page</h1>
      <BaseButton onClick={() => navigate('/')}>Go to home page</BaseButton>
    </div>
  );
};

export default PageNotFound;
