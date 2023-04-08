import BaseModal from "../BaseModal/BaseModal"
import MovieForm from "./MovieForm"

interface IMovieModal {
  handleClose: () => void;
}

const MovieModal = ({ handleClose }: IMovieModal) => {
  return (
    <BaseModal handleClose={handleClose} title={'Add Movie'}>
      <MovieForm />
    </BaseModal>
  )
}

export default MovieModal