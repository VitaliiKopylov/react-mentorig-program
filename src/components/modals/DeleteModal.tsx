import BaseButton from '../BaseButton';
import BaseModal from '../BaseModal';

import styles from './styles.module.scss';

interface IDeleteModal {
  handleClose: () => void;
}

const DeleteModal = ({ handleClose }: IDeleteModal) => (
  <BaseModal handleClose={handleClose} title={'Delete Movie'}>
    <p className={styles.deleteModal__descr}>
      Are you sure you want to delete this movie?
    </p>
    <div className={styles.deleteModal__btn}>
      <BaseButton>Confirm</BaseButton>
    </div>
  </BaseModal>
);

export default DeleteModal;
