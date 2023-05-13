import BaseModal from '../BaseModal';
import MovieForm from '../MovieForm';
import { IMovieDetails } from '../../types';

interface IMovieModal {
  formData?: IMovieDetails;
  handleClose: () => void;
  formType: 'add' | 'edit';
}

const MovieModal = ({ formData, handleClose, formType }: IMovieModal) => (
  <BaseModal handleClose={handleClose} title={`${formType} Movie`}>
    <MovieForm initialFormData={formData} formType={formType}/>
  </BaseModal>
);

export default MovieModal;
