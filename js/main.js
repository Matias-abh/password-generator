const uiElements = {
    generateBtn: document.querySelector(".password-generator__generate-btn"),
    passwordDisplay: document.querySelector(".password-generator__password-display"),
    copyBtn: document.querySelector(".password-generator__copy-btn"),
    displayPasswordLength: document.querySelector(".display-password-length"),
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

};

uiElements.generateBtn.addEventListener('click', handleGenerateClick);

/* ********************* feedback password length *************************** */

uiElements.displayPasswordLength.textContent = uiElements.lengthSlider.value;
const handleLengthSlider = (e) => {
    const lengthPassword = e.target.value;
    uiElements.displayPasswordLength.textContent = lengthPassword;

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

