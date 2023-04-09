import BaseModal from "../BaseModal/BaseModal"
import MovieForm from "../MovieForm/MovieForm"
import { IMovieDetails } from "../../types"

import styles from './styles.module.scss';

interface IMovieModal {
  formData?: IMovieDetails,
  handleClose: () => void;
}

const MovieModal = ({ formData, handleClose }: IMovieModal) => {
  return (
    <BaseModal handleClose={handleClose} title={'Add Movie'}>
      <MovieForm initialFormData={formData} />
    </BaseModal>
  )
}

export default MovieModal