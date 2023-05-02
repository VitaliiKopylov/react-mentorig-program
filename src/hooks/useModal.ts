import { useState } from 'react';

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState<boolean>(initialMode);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  return { modalOpen, open, close };
};
