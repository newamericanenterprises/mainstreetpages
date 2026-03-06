import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// States that need fixing (from Indiana onwards)
const statesToFix = ['in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv'];

const contentDir = path.join(__dirname, '..', 'content', 'towns');

let fixedCount = 0;

for (const stateAbbr of statesToFix) {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(`-${stateAbbr}.md`));

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if already has correct format
    if (content.includes('type: "towns"') && content.includes('town_data:')) {
      continue;
    }

    // Extract slug from filename (remove .md)
    const slug = file.replace('.md', '');

    // Extract town name from old content
    const townMatch = content.match(/town: "([^"]+)"/);
    const townName = townMatch ? townMatch[1] : slug.replace(`-${stateAbbr}`, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Create new content with correct format
    const newContent = `---
title: "${townName}, ${stateAbbr.toUpperCase()} Business Directory"
type: "towns"
slug: "${slug}"
state: "${stateAbbr}"
town_data: "${slug}"
---
`;

    fs.writeFileSync(filePath, newContent);
    fixedCount++;
  }

  console.log(`Fixed ${files.length} files for ${stateAbbr.toUpperCase()}`);
}

console.log(`\nTotal files fixed: ${fixedCount}`);
