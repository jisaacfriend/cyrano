import { join } from 'path';
import { homedir } from 'os';

export const configDir = process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude');
export const settingsPath = join(configDir, 'settings.json');
export const verbListsDir = join(configDir, 'spinner-verbs');
