import { uiElements } from './ui.js';


/* --------------- strength indicator ---------------*/

const updateStrengthIndicator = () => {
    let score = 0;

    const length = parseInt(uiElements.lengthSlider.value, 10);        
    if (length >= 4) score++;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (length >= 20) score++;

    if (uiElements.lowercaseCheckbox.checked) score++;
    if (uiElements.uppercaseCheckbox.checked) score++;
    if (uiElements.numberCheckbox.checked) score++;
    if (uiElements.symbolCheckbox.checked) score++;

    let strengthLabel;
    if (score <= 2) strengthLabel = 'weak';
    else if (score <= 4) strengthLabel = 'fair';
    else if (score <= 7 ) strengthLabel = 'strong';
    else strengthLabel = 'very-strong';

    uiElements.strengthContainer.classList.remove(
        'weak',
        'fair', 
        'strong',
        'very-strong'
    );
    uiElements.strengthContainer.classList.add(strengthLabel);

    uiElements.strengthLabel.textContent = strengthLabel === 'very-strong'
    ? 'Very Strong'
    : strengthLabel.charAt(0).toUpperCase() + strengthLabel.slice(1);

    // if (strengthLabel === "Weak") uiElements.strengthLabel.classList.add('weak-strength');
    // else if (strengthLabel === "Fair") uiElements.strengthLabel.classList.add('fair-strength');
    // else if (strengthLabel === "Strong") uiElements.strengthLabel.classList.add('strong-strength');
    // else uiElements.strengthLabel.classList.add('very-strong-strength');

    // uiElements.strengthLabel.textContent = strengthLabel;
    // return strengthLabel;
};


export { updateStrengthIndicator };