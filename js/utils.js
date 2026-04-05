import { uiElements } from './ui.js';


/* --------------- toast notification ---------------*/

const showToast = () => {

    uiElements.toast.classList.remove('hidden');

    setTimeout(() => {
        uiElements.toast.classList.add('hidden');
    }, 800);
};



export { showToast };