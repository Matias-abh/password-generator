const uiElements = {
    generateBtn: document.querySelector(".password-generator__generate-btn"),
    passwordDisplay: document.querySelector(".password-generator__password-display"),
    copyBtn: document.querySelector(".password-generator__copy-btn"),
    passwordLengthLabel: document.querySelector(".display-password-length"),
    strengthLabel: document.querySelector('.password-strength__display'),
    lengthSlider: document.getElementById('password-length'),

    uppercaseCheckbox: document.getElementById('include-uppercase'),
    lowercaseCheckbox: document.getElementById('include-lowercase'),
    numberCheckbox: document.getElementById('include-number'),
    symbolCheckbox: document.getElementById('include-symbol'),
    
    optionCheckboxes: document.querySelectorAll('.option-checkbox'),
};


const UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARACTERS = "0123456789";
const SYMBOL_CHARACTERS = "!@#$%^&*()_+?:{}[]<>/";


/* ****************** generate password ******************* */

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


/* ********************* active generate button ************************** */

const updateGenerateBtnState = () => {
    const isAtLeastOneChecked = Array.from(uiElements.optionCheckboxes).some((checkbox) => {
        return checkbox.checked;
    });
    uiElements.generateBtn.disabled = !isAtLeastOneChecked;
    uiElements.generateBtn.classList.toggle('generate-btn-active', isAtLeastOneChecked);
};

uiElements.optionCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateGenerateBtnState);
});





/* ************************** handle button **************************** */

const handleGenerateClick = () => {
    
    const passwordLength = parseInt(uiElements.lengthSlider.value, 10);
    const includeUppercase = uiElements.uppercaseCheckbox.checked;
    const includeLowercase = uiElements.lowercaseCheckbox.checked;
    const includeNumber = uiElements.numberCheckbox.checked;
    const includeSymbol = uiElements.symbolCheckbox.checked;
    
    const generatedPassword = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbol);
    uiElements.passwordDisplay.value = generatedPassword;
    const strength = updateStrengthIndicator();
    
    const passwordEntry = { password: generatedPassword, strength, createdAt: new Date()};
    savePasswordToHistory(passwordEntry);
};

uiElements.generateBtn.addEventListener('click', handleGenerateClick);



/* ********************* feedback password length *************************** */

uiElements.passwordLengthLabel.textContent = uiElements.lengthSlider.value;
const handleLengthSlider = (e) => {
    const lengthPassword = e.target.value;
    uiElements.passwordLengthLabel.textContent = lengthPassword;

};

uiElements.lengthSlider.addEventListener('input', handleLengthSlider);




/* *************** feedback copy **************** */


const showCopyFeedback = (generatedPassword) => {

    const originalPlaceholder = uiElements.passwordDisplay.placeholder;
    uiElements.passwordDisplay.value = "";
    uiElements.passwordDisplay.placeholder = "Copied!";
    uiElements.copyBtn.classList.add('copy-success');
    uiElements.passwordDisplay.classList.add('copy-success-input');

    
    setTimeout(() => {
        uiElements.copyBtn.classList.remove('copy-success');
        uiElements.passwordDisplay.classList.remove('copy-success-input');
        uiElements.passwordDisplay.value = generatedPassword;
        uiElements.passwordDisplay.placeholder = originalPlaceholder;
    }, 800);
};


/* *************** copy password **************** */

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

uiElements.copyBtn.addEventListener('click', handleCopyClick);





/* ***************** strength indicator ********************** */


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





/* *********************** password history ************************** */

let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) ?? [];

const savePasswordToHistory = (passwordEntry) => {

    passwordHistory.push(passwordEntry);
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
};
