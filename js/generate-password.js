import { uiElements } from './ui.js';
import { updateStrengthIndicator } from './strength-indicator.js';
import { savePasswordToHistory } from './history.js';

const UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARACTERS = "0123456789";
const SYMBOL_CHARACTERS = "!@#$%^&*()_+?:{}[]<>/";


/* --------------- generate password ---------------*/

const generatePassword = (passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbol) => {

  let allowed = "";

  if (includeUppercase) allowed += UPPERCASE_CHARACTERS;
  if (includeLowercase) allowed += LOWERCASE_CHARACTERS;
  if (includeNumber) allowed += NUMBER_CHARACTERS;
  if (includeSymbol) allowed += SYMBOL_CHARACTERS;

  let generatedPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * allowed.length);
    generatedPassword += allowed[randomIndex];
  }
  return generatedPassword;
};



/* --------------- active generate button ---------------*/

const updateGenerateBtnState = () => {
  const isAtLeastOneChecked = Array.from(uiElements.optionCheckboxes).some((checkbox) => {
    return checkbox.checked;
  });
  uiElements.generateBtn.disabled = !isAtLeastOneChecked;
  uiElements.generateBtn.classList.toggle('generate-btn-active', isAtLeastOneChecked);
};



/* --------------- handle generate button ---------------*/

const handleGenerateClick = () => {

  const passwordLength = parseInt(uiElements.lengthSlider.value, 10);
  const includeUppercase = uiElements.uppercaseCheckbox.checked;
  const includeLowercase = uiElements.lowercaseCheckbox.checked;
  const includeNumber = uiElements.numberCheckbox.checked;
  const includeSymbol = uiElements.symbolCheckbox.checked;

  const generatedPassword = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbol);
  uiElements.passwordDisplay.value = generatedPassword;
  const strength = updateStrengthIndicator();

  const passwordEntry = { password: generatedPassword, strength, createdAt: new Date() };
  savePasswordToHistory(passwordEntry);
};



/* --------------- feedback password length ---------------*/


const handleLengthSlider = (e) => {
  const lengthPassword = e.target.value;
  uiElements.passwordLengthLabel.textContent = lengthPassword;
};





/* --------------- listeners generate password ---------------*/

const initGeneratePassword = () => {
  uiElements.passwordLengthLabel.textContent = uiElements.lengthSlider.value;
  uiElements.optionCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateGenerateBtnState);
  });
  uiElements.generateBtn.addEventListener('click', handleGenerateClick);
  uiElements.lengthSlider.addEventListener('input', handleLengthSlider);
};

export { initGeneratePassword };