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
    if (score <= 2) strengthLabel = 'Weak';
    else if (score <= 4) strengthLabel = 'Fair';
    else if (score <= 7 ) strengthLabel = 'Strong';
    else strengthLabel = 'Very Strong';

    uiElements.strengthLabel.classList.remove(
        'weak-strength',
        'fair-strength', 
        'strong-strength',
        'very-strong-strength'
    )

    if (strengthLabel === "Weak") uiElements.strengthLabel.classList.add('weak-strength');
    else if (strengthLabel === "Fair") uiElements.strengthLabel.classList.add('fair-strength');
    else if (strengthLabel === "Strong") uiElements.strengthLabel.classList.add('strong-strength');
    else uiElements.strengthLabel.classList.add('very-strong-strength');

    uiElements.strengthLabel.textContent = strengthLabel;
    return strengthLabel;
};


export { updateStrengthIndicator };