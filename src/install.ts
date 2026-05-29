import { copyFile, mkdir, readdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const DEST_DIR = join(homedir(), '.claude', 'spinner-verbs');
const LISTS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'lists');

export async function installLists(): Promise<void> {
  await mkdir(DEST_DIR, { recursive: true });

  const files = (await readdir(LISTS_DIR)).filter(f => f.endsWith('.json'));
  let installed = 0;
  let skipped = 0;

  for (const file of files) {
    const dest = join(DEST_DIR, file);
    const exists = await access(dest).then(() => true).catch(() => false);
    if (exists) {
      console.log(`  skip  ${file} (already exists)`);
      skipped++;
    } else {
      await copyFile(join(LISTS_DIR, file), dest);
      console.log(`  install  ${file}`);
      installed++;
    }
  }

  console.log(`\nDone. ${installed} installed, ${skipped} skipped.`);
}
