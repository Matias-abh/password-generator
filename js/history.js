import { uiElements } from './ui.js';
import { showToast } from './utils.js';
import { copyToClipboard } from './copy-password.js';


/* --------------- password history ---------------*/

const STORAGE_KEY = 'passwordHistory';

let passwordHistory = [];

const getPasswordHistory = () => {
    try {
        passwordHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch (error) {
        console.error(`Error reading ${STORAGE_KEY} from localStorage:`, error);
    }
};


const savePasswordToHistory = (passwordEntry) => {
    try {
        passwordHistory.push(passwordEntry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(passwordHistory));
    } catch (error) {
        console.error(`Error saving ${STORAGE_KEY} to localStorage:`, error);
    }
};




/* --------------- render history ---------------*/

const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',     // "Jan"
    day: 'numeric',     // "3"
    hour: 'numeric',    // "10"
    minute: '2-digit',  // "42"
    hour12: true        // AM/PM
});

const renderHistory = () => {
    uiElements.ulPasswordHistory.replaceChildren();
        if (!passwordHistory.length) {
            uiElements.deleteHistoryBtn.classList.add('hidden');
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'No history yet';
            emptyMessage.classList.add('history-empty');
            uiElements.ulPasswordHistory.appendChild(emptyMessage);
        } else {            
            uiElements.deleteHistoryBtn.classList.remove('hidden');
            passwordHistory.forEach((passwordEntry) => {
                const li = document.createElement('li');
                const passwordSpan = document.createElement('span');
                const strengthSpan = document.createElement('span');
                const dateSpan = document.createElement('span');
                const copyBtn = document.createElement('i');
                copyBtn.classList.add('fa-regular', 'fa-copy', 'history-copy-btn');
                copyBtn.dataset.password = passwordEntry.password;
                li.classList.add('history-item');
                const date = formatter.format(new Date(passwordEntry.createdAt));        
                passwordSpan.textContent = passwordEntry.password;
                strengthSpan.textContent = passwordEntry.strength;
                dateSpan.textContent = date;
                li.appendChild(passwordSpan);
                li.appendChild(strengthSpan);
                li.appendChild(dateSpan);
                li.appendChild(copyBtn);
                uiElements.ulPasswordHistory.appendChild(li);
            });
        }
};



/* --------------- history copy click ---------------*/

const handleHistoryCopyClick = async (event) => {
    const copyBtn = event.target.closest('.history-copy-btn');
    if (!copyBtn) return;
    const passwordToCopy = copyBtn.dataset.password;
    const isSuccessful = await copyToClipboard(passwordToCopy);
    if (!isSuccessful) return;
    showToast();
};



/* --------------- delete history ---------------*/

const handleDeleteHistoryClick = () => {
    passwordHistory = [];
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
};


const initHistory = () => {
    getPasswordHistory();
    uiElements.deleteHistoryBtn.addEventListener('click', handleDeleteHistoryClick);
    uiElements.ulPasswordHistory.addEventListener('click', handleHistoryCopyClick);
};



export { savePasswordToHistory, renderHistory, initHistory };