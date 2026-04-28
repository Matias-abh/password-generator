import { uiElements } from './ui.js';

const openDeleteHistoryModal = () => {
  uiElements.deleteHistoryModal.classList.remove('hidden');
  focusTrap.activate(uiElements.deleteHistoryModal);
};

const closeDeleteHistoryModal = () => {
  uiElements.deleteHistoryModal.classList.add('hidden');
  focusTrap.deactivate(uiElements.deleteHistoryModal);
};

const focusTrap = (() => {
  const FOCUSABLE_SELECTORS = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  let previouslyFocusedElement = null;

  const getFocusableElements = (container) => {
    return [...container.querySelectorAll(FOCUSABLE_SELECTORS)];
  };

  const activate = (modalElement) => {
    previouslyFocusedElement = document.activeElement;

    const focusable = getFocusableElements(modalElement);
    if (!focusable.length) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    firstElement.focus();

    const handleKeydown = (event) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    modalElement.addEventListener('keydown', handleKeydown);

    modalElement._focusTrapHandler = handleKeydown;
  };

  const deactivate = (modalElement) => {
    if (modalElement._focusTrapHandler) {
      modalElement.removeEventListener('keydown', modalElement._focusTrapHandler);
      delete modalElement._focusTrapHandler;
    }

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      previouslyFocusedElement = null;
    }
  };

  return { activate, deactivate };
})();

const initModal = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' &&
      !uiElements.deleteHistoryModal.classList.contains('hidden')) {
      closeDeleteHistoryModal();
    }
  });
};

export { openDeleteHistoryModal, closeDeleteHistoryModal, initModal };