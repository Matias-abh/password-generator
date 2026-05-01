import { uiElements } from './ui.js';
import { renderHistory } from './history.js';
import { switchView } from './navigation.js';

const desktopQuery = window.matchMedia('(min-width: 1024px)');

const isDesktop = () => desktopQuery.matches;

const handleViewportChange = (event) => {
  if (event.matches) {
    uiElements.views.forEach((view) => view.classList.remove('hidden'));
    renderHistory();
  } else {
    switchView('generator');
  }
};

const initViewport = () => {
  if (isDesktop()) {
    uiElements.views.forEach((view) => view.classList.remove('hidden'));
    renderHistory();
  } else {
    switchView('generator');
  }

  desktopQuery.addEventListener('change', handleViewportChange);
};


export { desktopQuery, isDesktop, initViewport };