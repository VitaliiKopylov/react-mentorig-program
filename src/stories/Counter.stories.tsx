import type { Meta, StoryObj } from '@storybook/react';
import Counter from '@components/Counter/Counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    initialValue: 5
  },
};
