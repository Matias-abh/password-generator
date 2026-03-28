const uiElements = {
    generateBtn: document.querySelector(".password-generator__generate-btn"),
    passwordDisplay: document.querySelector(".password-generator__password-display"),
    copyBtn: document.querySelector(".password-generator__copy-btn"),

    lengthSlider: document.getElementById('password-length'),
    uppercaseCheckbox: document.getElementById('include-uppercase'),
    lowercaseCheckbox: document.getElementById('include-lowercase'),
    numberCheckbox: document.getElementById('include-number'),
    symbolCheckbox: document.getElementById('include-symbol'),
    
};


const UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxtz";
const NUMBER_CHARACTERS = "0123456789";
const SYMBOL_CHARACTERS = "!@#$%^&*()_+?:{}[]<>/";

/*
MIN_PASSWORD_LENGTH: 8
MAX_PASSWORD_LENGTH: 32
*/


const generatePassword = (passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbol) => {
    
    let allowed = "";
    
    if (includeUppercase) allowed += UPPERCASE_CHARACTERS;
    if (includeLowercase) allowed += LOWERCASE_CHARACTERS;
    if (includeNumber) allowed += NUMBER_CHARACTERS;
    if (includeSymbol) allowed += SYMBOL_CHARACTERS;
    if (allowed === '') return alert('Debes seleccionar al menos una opción');
    
    let generatedPassword = "";
    
    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * allowed.length);
        generatedPassword += allowed[randomIndex];
    };
    return generatedPassword;
};


const handleGenerateClick = () => {
    
    const passwordLength = uiElements.lengthSlider.value;
    const includeUppercase = uiElements.uppercaseCheckbox.checked;
    const includeLowercase = uiElements.lowercaseCheckbox.checked;
    const includeNumber = uiElements.numberCheckbox.checked;
    const includeSymbol = uiElements.symbolCheckbox.checked;
    
    const generatedPassword = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbol);
    uiElements.passwordDisplay.value = generatedPassword;

};

uiElements.generateBtn.addEventListener('click', handleGenerateClick);


/* *************** copy logic **************** */

async function copyToClipboard (text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    };
};

async function handleCopyClick () {
    const passwordToCopy = uiElements.passwordDisplay.value;
    const isSuccessful = await copyToClipboard(passwordToCopy);
    
    

};

uiElements.copyBtn.addEventListener('click', handleCopyClick);

/* ********************************************************** */

// const createPassword = () => {
//     const chars = "0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const passwordLength = "14";
//     let password = "";
    
//     for (let i = 0; i < passwordLength; i++) {
//         const randomNum = Math.floor(Math.random() * chars.length);
//         password += chars[randomNum];
//     };
//     input.value = password;
// };


/* 
    const createPassword = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = "14";
    let password = "";
    
    for (let i = 0; i < passwordLength; i++) {
        const randomNum = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNum, randomNum + 1);
    };
    input.value = password; 
};

generateBtn.addEventListener('click', createPassword);


const copyPassword = () => {
    input.select();

    // selection on mobile
    input.setSelectionRange(0, 9999);

    // copy password to clipboard
    navigator.clipboard.writeText(input.value);
};

icon.addEventListener('click', copyPassword);
 */


/* *********************************** */

/* 
passwordDisplay: El campo donde se muestra la clave generada.

handleGenerateClick: Cuando el usuario presiona "Generar".
handleLengthChange: Cuando el usuario mueve el slider de longitud.
handleCopySuccess: Qué sucede después de copiar con éxito. */


