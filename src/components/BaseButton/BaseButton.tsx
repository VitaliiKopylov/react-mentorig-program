import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './styles.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classNames?: string;
  onClick?: (params: any) => any;
}

const BaseButton = ({
  children,
  classNames,
  onClick,
  ...props
}: ButtonProps) => (
  <button onClick={onClick} className={clsx(styles.btn, classNames)} {...props}>
    {children}
  </button>
);
export default BaseButton;
