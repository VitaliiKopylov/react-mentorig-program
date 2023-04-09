import { motion } from 'framer-motion';
import { TfiClose } from 'react-icons/tfi';
import { IconContext } from 'react-icons';

import { ReactNode, useEffect } from 'react';

import styles from './styles.module.scss';

interface IBaseModalProps {
  children: ReactNode;
  title: string | ReactNode;
  handleClose: () => void;
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const BaseModal = ({ children, title, handleClose }: IBaseModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      const clean = () => (document.body.style.overflow = 'unset');
      clean();
    };
  }, []);

  return (
    <motion.div
      onClick={handleClose}
      className={styles.modal__backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal__main}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <>
          <IconContext.Provider
            value={{
              color: 'var(--white)',
            }}
          >
            <button className={styles.modal__closeBtn} onClick={handleClose}>
              <TfiClose />
            </button>
          </IconContext.Provider>
          {typeof title === 'string' ? (
            <h2 className="hero-title">{title}</h2>
          ) : (
            { title }
          )}
          {children}
        </>
      </motion.div>
    </motion.div>
  );
};

export default BaseModal;
