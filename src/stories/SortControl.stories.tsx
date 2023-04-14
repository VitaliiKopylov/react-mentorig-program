import type { Meta, StoryObj } from '@storybook/react';

import SortControl from '../components/SortControl/SortControl';
import styles from '../components/SortControl/styles.module.css';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SortControl> = {
  title: 'Components/SortControl',
  component: SortControl,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SortControl>;

export const Default: Story = {};
