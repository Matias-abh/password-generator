import { uiElements } from './ui.js';
import { renderHistory } from './history.js';


/* --------------- switch view ---------------*/

const switchView = (viewName) => {
    uiElements.views.forEach((view) => view.classList.add('hidden'));
    document.querySelector(`[data-view="${viewName}"]`).classList.remove('hidden');
    if (viewName === 'history') renderHistory();

    uiElements.navButtons.forEach((btn) => {
        btn.classList.remove('button-nav__btn--active');
        document.querySelector(`[data-target="${viewName}"]`).classList.add('button-nav__btn--active');
    });
};

const handleBtnNav = (event) => {
    const viewName = event.target.dataset.target;
    if (!viewName) return;
    switchView(viewName);
};

const initNavigation = () => {
    uiElements.buttonNav.addEventListener('click', handleBtnNav);
};



export { switchView, initNavigation };