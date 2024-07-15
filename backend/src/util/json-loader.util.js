import fs from 'fs/promises';
import path from 'path';

export const loadJSON = async (filename) => {
  try {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, filename);
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading JSON ${filename}:`, error);
    throw error;
  }
}
