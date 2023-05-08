import { useNavigate, useOutletContext } from 'react-router-dom';
import { MovieModal } from '@components/modals';
import { IMovieDetails } from '../types';

const EditMoviePage = () => {
  const navigate = useNavigate();
  const movie = useOutletContext<IMovieDetails>();
  console.log(movie);
  return (
    <MovieModal
      handleClose={() => navigate('/')}
      formType="edit"
      formData={movie}
    />
  );
};

export default EditMoviePage;
