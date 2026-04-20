import { uiElements } from './ui.js';


/* --------------- toast notification ---------------*/

let timer;

const showToast = () => {
  uiElements.toast.classList.add('active');
  uiElements.toast.classList.add('hide');
  
  // 1. Limpiamos cualquier estado previo por si el toast ya estaba visible
  clearTimeout(timer);
  uiElements.toast.classList.remove('active', 'out');
  uiElements.toast.style.display = 'block';

  // 2. Activamos la entrada
  // Usamos un pequeño delay para reiniciar la animación si ya existía
  void uiElements.toast.offsetWidth;
  uiElements.toast.classList.add('active');

  // 3. Programamos la salida tras 3 segundos
  timer = setTimeout(() => {
    uiElements.toast.classList.add('out');

    // 4. Cuando la animación de salida termine, lo ocultamos del todo
    uiElements.toast.addEventListener('animationend', () => {
      if (uiElements.toast.classList.contains('out')) {
        uiElements.toast.style.display = 'none';
        uiElements.toast.classList.remove('active', 'out');
      }
    }, { once: true });
  }, 1000);
};



export { showToast };