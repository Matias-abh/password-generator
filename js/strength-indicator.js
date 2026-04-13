import { uiElements } from './ui.js';


/* --------------- strength indicator ---------------*/

const STRENGTH_LABELS = {
  'weak': 'Weak',
  'fair': 'Fair',
  'strong': 'Strong',
  'very-strong': 'Very Strong',
};

const STRENGTH_CLASSES = Object.keys(STRENGTH_LABELS);

const updateStrengthIndicator = () => {
  let score = 0;

  const length = parseInt(uiElements.lengthSlider.value, 10);
  const lengthMilestones = [4, 8, 12, 16, 20];
  lengthMilestones.forEach(m => { if (length >= m) score++ });

  if (uiElements.lowercaseCheckbox.checked) score++;
  if (uiElements.uppercaseCheckbox.checked) score++;
  if (uiElements.numberCheckbox.checked) score++;
  if (uiElements.symbolCheckbox.checked) score++;

  let strengthKey;
  if (score <= 2) strengthKey = 'weak';
  else if (score <= 4) strengthKey = 'fair';
  else if (score <= 7) strengthKey = 'strong';
  else strengthKey = 'very-strong';

  const displayText = STRENGTH_LABELS[strengthKey] || strengthKey.charAt(0).toUpperCase() + strengthKey.slice(1);

  uiElements.strengthContainer.classList.remove(...STRENGTH_CLASSES);
  uiElements.strengthContainer.classList.add(strengthKey);
  console.log('strength--->', displayText);

  uiElements.strengthLabel.textContent = displayText;
  return displayText;
};


export { updateStrengthIndicator };