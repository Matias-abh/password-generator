import { initGeneratePassword } from './generate-password.js';
import { initNavigation, switchView } from './navigation.js';
import { initHistory } from './history.js';
import { initCopyPassword } from './copy-password.js';

initGeneratePassword();
initNavigation();
initHistory();
initCopyPassword();
switchView('generator');
