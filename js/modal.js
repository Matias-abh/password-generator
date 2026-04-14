import { uiElements } from './ui.js';

const openDeleteHistoryModal = () => {
  uiElements.deleteHistoryModal.classList.remove('hidden');
};

const closeDeleteHistoryModal = () => {
  uiElements.deleteHistoryModal.classList.add('hidden');
};

export { openDeleteHistoryModal, closeDeleteHistoryModal };