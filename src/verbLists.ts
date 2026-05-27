import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

export interface VerbList {
  title: string;
  verbs: string[];
}

export interface LoadedVerbList extends VerbList {
  filePath: string;
}

const VERB_LISTS_DIR = join(homedir(), '.claude', 'spinner-verbs');

export async function loadVerbLists(): Promise<LoadedVerbList[]> {
  let files: string[];
  try {
    files = await readdir(VERB_LISTS_DIR);
  } catch {
    return [];
  }

  const results = await Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .map(async (file): Promise<LoadedVerbList | null> => {
        const filePath = join(VERB_LISTS_DIR, file);
        try {
          const content = await readFile(filePath, 'utf-8');
          const data = JSON.parse(content) as unknown;
          if (
            data !== null &&
            typeof data === 'object' &&
            'title' in data &&
            typeof (data as Record<string, unknown>).title === 'string' &&
            'verbs' in data &&
            Array.isArray((data as Record<string, unknown>).verbs)
          ) {
            const { title, verbs } = data as { title: string; verbs: unknown[] };
            return { title, verbs: verbs.filter((v): v is string => typeof v === 'string'), filePath };
          }
        } catch {
          // skip malformed files
        }
        return null;
      })
  );

  return results.filter((r): r is LoadedVerbList => r !== null);
}
