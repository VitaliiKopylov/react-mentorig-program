import type { Meta, StoryObj } from '@storybook/react';

import MovieDetails from '../components/MovieDetails';
import styles from '../components/MovieDetails/styles.module.scss';

const meta: Meta<typeof MovieDetails> = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  decorators: [
    (Story) => (
      <div style={{ margin: 'auto', maxWidth: '960px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MovieDetails>;

export const Default: Story = {
  args: {
    movie: {
      imageUrl: 'https://picsum.photos/322/455',
      name: 'The Shining',
      releaseYear: 1980,
      genres: ['Horror'],
      rating: 8.4,
      duration: '2h 26m',
      description:
        'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
    },
  },
};
