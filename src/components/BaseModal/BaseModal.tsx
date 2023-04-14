import { motion } from 'framer-motion';
import { TfiClose } from 'react-icons/tfi';
import { IconContext } from 'react-icons';
import FocusTrap from 'focus-trap-react';

import { useEffect, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IBaseModalProps {
  children: ReactNode;
  title: string | ReactNode;
  handleClose: () => void;
}

const dropIn = {
  hidden: {
    y: '10vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '10vh',
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
      data-testid="modal-backdrop"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal__main}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <FocusTrap
          focusTrapOptions={{
            delayInitialFocus: false,
            initialFocus: false,
            tabbableOptions: {
              displayCheck: 'legacy-full',
            },
            fallbackFocus: '[data-testid="modal-close"]',
          }}
        >
          <div>
            <>
              <IconContext.Provider
                value={{
                  color: 'var(--white)',
                }}
              >
                <button
                  className={styles.modal__closeBtn}
                  onClick={handleClose}
                  data-testid="modal-close"
                >
                  <TfiClose />
                </button>
              </IconContext.Provider>

              {typeof title === 'string' ? (
                <h2 className="hero-title">{title}</h2>
              ) : (
                title
              )}
              {children}
            </>
          </div>
        </FocusTrap>
      </motion.div>
    </motion.div>
  );
};

export default BaseModal;
