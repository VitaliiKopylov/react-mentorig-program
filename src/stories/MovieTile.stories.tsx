import type { Meta, StoryObj } from '@storybook/react';

import MovieTile from '@components/MovieTile';

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
      poster_path: 'https://picsum.photos/322/455',
      title: 'The Shining',
      release_date: '1980',
      genres: ['Horror'],
    },
  },
};
