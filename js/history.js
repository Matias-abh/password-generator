import { uiElements } from './ui.js';
import { showToast } from './utils.js';
import { copyToClipboard } from './copy-password.js';
import { openDeleteHistoryModal, closeDeleteHistoryModal } from './modal.js';


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




/* --------------- create history item ---------------*/

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',     // "Jan"
  day: 'numeric',     // "3"
  hour: 'numeric',    // "10"
  minute: '2-digit',  // "42"
  hour12: true        // AM/PM
});

const createHistoryItem = (passwordEntry) => {
  const date = formatter.format(new Date(passwordEntry.createdAt));
  const strength = passwordEntry.strength;

  const li = document.createElement('li');
  li.classList.add('history-item');

  li.innerHTML = `
    <div class="history-item__main">
      <span class="history-item__password">${passwordEntry.password}</span>
      <button class="history-item__copy-btn" data-password="${passwordEntry.password}" aria-label="Copy password">
          <i class="fa-regular fa-copy"></i>
      </button>
    </div>
    <div class="history-item__meta">
      <span class="history-item__strength ${strength.toLowerCase().replace(' ', '-')}">${strength}</span>
      <span class="history-item__date">${date}</span>
    </div>
  `;
  return li;
};



/* --------------- render history ---------------*/

const renderHistory = () => {
  uiElements.ulPasswordHistory.replaceChildren();
  uiElements.historyCount.textContent = `${passwordHistory.length} password${passwordHistory.length !== 1 ? 's' : ''}`;

  if (!passwordHistory.length) {
    uiElements.deleteHistoryBtn.classList.add('hidden');
    uiElements.ulPasswordHistory.innerHTML = `
    <li class="history__empty">No history yet</li>
    `;
    return;
  }

  uiElements.deleteHistoryBtn.classList.remove('hidden');
  passwordHistory.forEach((entry) => uiElements.ulPasswordHistory.appendChild(createHistoryItem(entry)));
};



/* --------------- history copy click ---------------*/

const handleHistoryCopyClick = async (event) => {
  const copyBtn = event.target.closest('.history-item__copy-btn');
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
  closeDeleteHistoryModal();
};




const initHistory = () => {
  getPasswordHistory();
  uiElements.deleteHistoryBtn.addEventListener('click', openDeleteHistoryModal);
  uiElements.ulPasswordHistory.addEventListener('click', handleHistoryCopyClick);
  uiElements.cancelDeleteBtn.addEventListener('click', closeDeleteHistoryModal);
  uiElements.confirmDeleteBtn.addEventListener('click', handleDeleteHistoryClick);
};



export { savePasswordToHistory, renderHistory, initHistory };