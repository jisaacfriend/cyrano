import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

const SETTINGS_PATH = join(homedir(), '.claude', 'settings.json');

export async function updateSpinnerVerbs(verbs: string[], mode: 'replace' | 'append'): Promise<void> {
  let settings: Record<string, unknown> = {};

  try {
    const content = await readFile(SETTINGS_PATH, 'utf-8');
    settings = JSON.parse(content) as Record<string, unknown>;
  } catch {
    // settings.json missing or malformed — start fresh
  }

  settings.spinnerVerbs = { mode, verbs };

  await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n', 'utf-8');
}
