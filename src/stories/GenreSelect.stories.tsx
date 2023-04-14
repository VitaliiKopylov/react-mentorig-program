import type { Meta, StoryObj } from '@storybook/react';
import GenreSelect from '../components/GenreSelect';
import { Genres } from '../types';

const genres = Object.values(Genres);

const meta: Meta<typeof GenreSelect> = {
  title: 'Components/GenreSelect',
  component: GenreSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GenreSelect>;

export const Default: Story = {
  args: {
    genres,
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};

export const ActiveGenre: Story = {
  args: {
    genres,
    activeGenre: Genres.Comedy,
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};
