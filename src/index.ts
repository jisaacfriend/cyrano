import { loadVerbLists } from './verbLists.js';
import { selectVerbList, selectMode } from './menu.js';
import { updateSpinnerVerbs } from './config.js';

async function main(): Promise<void> {
  const lists = await loadVerbLists();

  if (lists.length === 0) {
    console.error('No verb lists found in ~/.claude/spinner-verbs/');
    console.error('Add JSON files with { "title": "...", "verbs": [...] } to get started.');
    process.exit(1);
  }

  const selected = await selectVerbList(lists);
  const mode = await selectMode();

  await updateSpinnerVerbs(selected.verbs, mode);

  console.log(`Applied "${selected.title}" (${mode}).`);
}

main().catch(err => {
  console.error((err as Error).message ?? String(err));
  process.exit(1);
});
