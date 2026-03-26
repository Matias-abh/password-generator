const generateBtn = document.querySelector(".password-generator__generate-btn");
const input = document.querySelector(".password-generator__input");
const icon = document.querySelector(".password-generator__icon");

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
