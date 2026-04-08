const uiElements = {
    views: document.querySelectorAll('.view'),
    buttonNav: document.querySelector('.button-nav'),
    navButtons: document.querySelectorAll('.button-nav__btn'),

    ulPasswordHistory: document.querySelector('.history-password__ul'),
    toast: document.querySelector('.toast'),

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

    deleteHistoryBtn: document.querySelector('.delete-history-password'),
};

export { uiElements };