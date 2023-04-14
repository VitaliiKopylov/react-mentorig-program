import BaseModal from '../BaseModal';
import MovieForm from '../MovieForm';
import { IMovieDetails } from '../../types';

interface IMovieModal {
  formData?: IMovieDetails;
  handleClose: () => void;
}

const MovieModal = ({ formData, handleClose }: IMovieModal) => (
  <BaseModal handleClose={handleClose} title={'Add Movie'}>
    <MovieForm initialFormData={formData} />
  </BaseModal>
);

export default MovieModal;
