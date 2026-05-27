import { select } from '@inquirer/prompts';
import type { LoadedVerbList } from './verbLists.js';

export async function selectVerbList(lists: LoadedVerbList[]): Promise<LoadedVerbList> {
  return select({
    message: 'Select a verb list:',
    choices: lists.map(list => ({ name: list.title, value: list })),
  });
}

export async function selectMode(): Promise<'replace' | 'append'> {
  return select({
    message: 'How should these verbs be applied?',
    choices: [
      { name: 'Replace  (use only these verbs)', value: 'replace' as const },
      { name: 'Append   (add to existing verbs)', value: 'append' as const },
    ],
  });
}
