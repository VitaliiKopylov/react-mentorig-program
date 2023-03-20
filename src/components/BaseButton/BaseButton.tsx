import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

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
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.btn, classNames)}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
