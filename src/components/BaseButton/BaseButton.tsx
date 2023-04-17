import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classNames?: string;
  variant?: 'outlined';
  onClick?: () => void;
}

const BaseButton = ({
  children,
  classNames,
  variant,
  onClick,
  ...props
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={clsx(
      styles.btn,
      classNames,
      variant && styles[`btn_${variant}`]
    )}
    {...props}
  >
    {children}
  </button>
);
export default BaseButton;
