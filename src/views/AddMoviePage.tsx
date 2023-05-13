import { useNavigate } from 'react-router-dom';
import { MovieModal } from '@components/modals';

const AddMoviePage = () => {
  const navigate = useNavigate();
  return <MovieModal handleClose={() => navigate('/')} formType="add" />;
};

export default AddMoviePage;
