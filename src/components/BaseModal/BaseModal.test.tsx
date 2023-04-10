import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import BaseModal from './BaseModal';

interface IBaseModalProps {
  children?: ReactNode;
  title?: string | ReactNode;
  handleClose?: () => void;
}

const setup = ({
  title = 'Modal Title',
  children = <div>Modal Content</div>,
  handleClose = () => {},
}: IBaseModalProps) => {
  const handleCloseMock = jest.fn();
  const utils = render(
    <BaseModal handleClose={handleCloseMock} title={title}>
      {children}
    </BaseModal>,
  );
  return {
    ...utils,
    handleCloseMock,
  };
};

describe.only('BaseModal component', () => {
  it('renders title as string', () => {
    const { getByText } = setup({ title: 'String title' });

    expect(getByText('String title')).toBeInTheDocument();
  });

  // it('renders title as react node', () => {
  //   const { getByTestId } = setup({
  //     title: <div data-testid="title">Modal Title</div>,
  //   });

  //   expect(getByTestId('title')).toBeInTheDocument();
  // });

  it('renders children', () => {
    const { getByText } = setup({
      children: <div>Modal Content Extended</div>,
    });

    expect(getByText('Modal Content Extended')).toBeInTheDocument();
  });

  // it('calls handleClose when backdrop is clicked', () => {
  //   const { getByTestId, handleCloseMock } = setup({});

  //   fireEvent.click(getByTestId('modal-backdrop'));

  //   expect(handleCloseMock).toHaveBeenCalledTimes(1);
  // });

  // it('calls handleClose when close button is clicked', () => {
  //   const { getByTestId, handleCloseMock } = setup({});

  //   fireEvent.click(getByTestId('modal-close'));

  //   expect(handleCloseMock).toHaveBeenCalledTimes(1);
  // });

  // it('does not call handleClose when main content is clicked', () => {
  //   const { getByText, handleCloseMock } = setup({});

  //   fireEvent.click(getByText('Modal Title'));

  //   expect(handleCloseMock).not.toHaveBeenCalled();
  // });
});
