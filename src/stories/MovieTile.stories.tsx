import type { Meta, StoryObj } from '@storybook/react';

import MovieTile from '../components/MovieTile/MovieTile';
import styles from '../components/MovieTile/styles.module.scss';

const meta: Meta<typeof MovieTile> = {
  title: 'Components/MovieTile',
  component: MovieTile,
  decorators: [
    (Story) => (
      <div style={{ margin: 'auto', maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MovieTile>;

export const Default: Story = {
  args: {
    movie: {
      imageUrl: 'https://picsum.photos/322/455',
      name: 'The Shining',
      releaseYear: 1980,
      genres: ['Horror'],
    },
  },
};
