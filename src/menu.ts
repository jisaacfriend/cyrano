import { select } from '@inquirer/prompts';
import type { LoadedVerbList } from './verbLists.js';

export async function selectVerbList(lists: LoadedVerbList[]): Promise<LoadedVerbList> {
  const choice = await select<LoadedVerbList | 'random'>({
    message: 'Select a verb list:',
    choices: [
      { name: 'Random', value: 'random' as const },
      ...lists.map(list => ({ name: list.title, value: list })),
    ],
  });

  if (choice === 'random') {
    return lists[Math.floor(Math.random() * lists.length)];
  }
  return choice;
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
