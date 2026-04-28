import { initGeneratePassword } from './generate-password.js';
import { initNavigation, switchView } from './navigation.js';
import { initHistory } from './history.js';
import { initCopyPassword } from './copy-password.js';
import { initModal } from './modal.js';

initGeneratePassword();
initNavigation();
initHistory();
initCopyPassword();
switchView('generator');
initModal();
