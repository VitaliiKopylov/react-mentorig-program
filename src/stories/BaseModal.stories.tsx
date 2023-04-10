import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import BaseModal from '../components/BaseModal/BaseModal';
// import BaseButton from '../components/BaseButton/BaseButton';
// import { IMovieDetails } from '../types';
import styles from '../components/BaseModal/styles.module.css';

const meta: Meta<typeof BaseModal> = {
  title: 'Components/Modals/BaseModal',
  component: BaseModal,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 40px)' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BaseModal>;

export const Default: Story = {
  args: {
    title: <><h4>Base Modal</h4><p>Test</p></>,
    children: 'Some content'
  },
};
