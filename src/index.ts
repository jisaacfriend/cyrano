import { loadVerbLists } from './verbLists.js';
import { selectVerbList, selectMode } from './menu.js';
import { updateSpinnerVerbs } from './config.js';
import { installLists } from './install.js';

async function main(): Promise<void> {
  if (process.argv[2] === 'install') {
    await installLists();
    return;
  }

  const lists = await loadVerbLists();

  if (lists.length === 0) {
    console.error('No verb lists found in ~/.claude/spinner-verbs/');
    console.error('Run "cyrano install" to install the bundled lists, or add your own JSON files.');
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
