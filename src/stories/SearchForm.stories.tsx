import type { Meta, StoryObj } from '@storybook/react';

import SearchForm from '../components/SearchForm/SearchForm';
import styles from '../components/SearchForm/styles.module.css';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchForm> = {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {};
