import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface IReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const ReactPortal = ({ children, wrapperId = "react-portal-wrapper" }: IReactPortalProps) => {
  let element = document.getElementById(wrapperId);
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }
  return createPortal(children, element);
}

export default ReactPortal;