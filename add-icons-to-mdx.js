import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "src", "content");
const symbolsDir = path.join(__dirname, "public", "webp_symbols");

// Get all symbol filenames
const symbolFiles = fs.readdirSync(symbolsDir).filter(f => f.endsWith(".webp"));

// Helper to normalize set names for matching
const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Map normalized symbol names to filenames
const symbolMap = {};
symbolFiles.forEach(file => {
  const base = path.basename(file, ".webp");
  symbolMap[normalize(base)] = file;
});

fs.readdirSync(contentDir).forEach(file => {
  if (!file.endsWith(".mdx")) return;
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Extract frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;

  let frontmatter = match[1];
  const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
  if (!titleMatch) return;

  const title = titleMatch[1];
  const normalizedTitle = normalize(title);
  const symbolFile = symbolMap[normalizedTitle];

  if (!symbolFile) {
    console.warn(`No symbol found for "${title}"`);
    return;
  }

  const iconLine = `icon: "/webp_symbols/${symbolFile}"`;

  // Remove existing icon field if present
  let newFrontmatter;
  if (frontmatter.match(/icon:\s*["'][^"']*["']/)) {
    newFrontmatter = frontmatter.replace(/icon:\s*["'][^"']*["']/, iconLine);
  } else {
    // Insert after order: or after title: if order is not present
    if (frontmatter.match(/order:\s*\d+/)) {
      newFrontmatter = frontmatter.replace(/(order:\s*\d+)/, `$1\n${iconLine}`);
    } else {
      newFrontmatter = frontmatter.replace(/(title:\s*["'].*?["']\s*)/, `$1\n${iconLine}\n`);
    }
  }

  // Replace old frontmatter in content
  const newContent = content.replace(
    /^---\n([\s\S]*?)\n---/,
    `---\n${newFrontmatter}\n---`
  );

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`Updated ${file} with icon: ${iconLine}`);
});

console.log("All MDX files updated with icon field.");