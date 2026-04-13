import { uiElements } from './ui.js';



/* --------------- feedback copy ---------------*/

const showCopyFeedback = (generatedPassword) => {

  const originalPlaceholder = uiElements.passwordDisplay.placeholder;
  uiElements.passwordDisplay.value = "";
  uiElements.passwordDisplay.placeholder = "Copied!";
  uiElements.copyBtn.classList.add('password-generator__copy-btn--success');
  uiElements.passwordDisplay.classList.add('password-generator__password-display--success');

  setTimeout(() => {
    uiElements.copyBtn.classList.remove('password-generator__copy-btn--success');
    uiElements.passwordDisplay.classList.remove('password-generator__password-display--success');
    uiElements.passwordDisplay.value = generatedPassword;
    uiElements.passwordDisplay.placeholder = originalPlaceholder;
  }, 800);
};


/* --------------- copy password ---------------*/

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handleCopyClick = async () => {
  const passwordToCopy = uiElements.passwordDisplay.value;
  if (!passwordToCopy) return;
  const isSuccessful = await copyToClipboard(passwordToCopy);
  if (isSuccessful) showCopyFeedback(passwordToCopy);

};



const initCopyPassword = () => {
  uiElements.copyBtn.addEventListener('click', handleCopyClick);
};

export { copyToClipboard, initCopyPassword };