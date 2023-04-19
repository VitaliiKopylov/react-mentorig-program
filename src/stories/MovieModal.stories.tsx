import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import MovieModal from '../components/modals/MovieModal';
import BaseButton from '../components/BaseButton';

const meta: Meta<typeof MovieModal> = {
  title: 'Components/Modals/MovieModal',
  component: MovieModal,
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

type Story = StoryObj<typeof MovieModal>;

const ModalExample = (formData: any) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <BaseButton onClick={() => setModalOpen(true)}>Open Modal</BaseButton>
      {modalOpen && (
        <MovieModal
          handleClose={() => setModalOpen(false)}
          formData={formData}
        />
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    formData: {
      poster_path: 'https://picsum.photos/322/455',
      title: 'The Silence of the Lambs',
      release_date: '1991',
      vote_average: '8.6',
      duration: '1h 58m',
      description:
        'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
      genres: ['Crime', 'Drama'],
    },
  },
  render: ({ formData }) => <ModalExample formData={formData} />,
};
