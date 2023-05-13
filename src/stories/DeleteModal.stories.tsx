import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import DeleteModal from '@components/modals/DeleteModal';
import BaseButton from '@components/BaseButton';

const meta: Meta<typeof DeleteModal> = {
  title: 'Components/Modals/DeleteModal',
  component: DeleteModal,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 40px)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DeleteModal>;

const ModalExample = ({ isOpen = false }: { isOpen?: boolean }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  return (
    <>
      <BaseButton onClick={() => setModalOpen(true)}>Open Modal</BaseButton>
      {modalOpen && <DeleteModal handleClose={() => setModalOpen(false)} />}
    </>
  );
};

export const Default: Story = {
  render: () => <ModalExample />,
};

export const ModalOpen: Story = {
  render: () => <ModalExample isOpen={true} />,
};
