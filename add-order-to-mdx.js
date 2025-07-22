import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const orderList = [
  "Base Set",
  "Jungle",
  "Fossil",
  "Base Set 2",
  "Team Rocket",
  "Gym Heroes",
  "Gym Challenge",
  "Neo Genesis",
  "Neo Discovery",
  "Neo Revelation",
  "Neo Destiny",
  "Legendary Collection",
  "Expedition Base Set",
  "Aquapolis",
  "Skyridge",
  "EX Ruby & Sapphire",
  "EX Sandstorm",
  "EX Dragon",
  "EX Team Magma vs Team Aqua",
  "EX Hidden Legends",
  "EX FireRed & LeafGreen",
  "EX Team Rocket Returns",
  "EX Deoxys",
  "EX Emerald",
  "EX Unseen Forces",
  "EX Delta Species",
  "EX Legend Maker",
  "EX Holon Phantoms",
  "EX Crystal Guardians",
  "EX Dragon Frontiers",
  "EX Power Keepers",
  "Diamond & Pearl",
  "Mysterious Treasures",
  "Secret Wonders",
  "Great Encounters",
  "Majestic Dawn",
  "Legends Awakened",
  "Stormfront",
  "Platinum",
  "Rising Rivals",
  "Supreme Victors",
  "Arceus",
  "HeartGold & SoulSilver",
  "Unleashed",
  "Undaunted",
  "Triumphant",
  "Pokémon TCG: Call of Legends",
  "Black & White",
  "Emerging Powers",
  "Noble Victories",
  "Next Destinies",
  "Dark Explorers",
  "Dragons Exalted",
  "Dragon Vault",
  "Boundaries Crossed",
  "Plasma Storm",
  "Plasma Freeze",
  "Plasma Blast",
  "Legendary Treasures",
  "Kalos Starter Set",
  "XY",
  "Flashfire",
  "Furious Fists",
  "Phantom Forces",
  "Primal Clash",
  "Double Crisis",
  "Roaring Skies",
  "Ancient Origins",
  "BREAKthrough",
  "BREAKpoint",
  "Generations",
  "Fates Collide",
  "Steam Siege",
  "Evolutions",
  "Sun & Moon",
  "Guardians Rising",
  "Burning Shadows",
  "Shining Legends",
  "Crimson Invasion",
  "Ultra Prism",
  "Forbidden Light",
  "Celestial Storm",
  "Dragon Majesty",
  "Lost Thunder",
  "Team Up",
  "Detective Pikachu",
  "Unbroken Bonds",
  "Unified Minds",
  "Hidden Fates",
  "Cosmic Eclipse",
  "Sword & Shield",
  "Rebel Clash",
  "Darkness Ablaze",
  "Champion's Path",
  "Vivid Voltage",
  "Shining Fates",
  "Battle Styles",
  "Chilling Reign",
  "Evolving Skies",
  "Celebrations",
  "Fusion Strike",
  "Brilliant Stars",
  "Astral Radiance",
  "Pokémon TCG: Pokémon GO",
  "Lost Origin",
  "Silver Tempest",
  "Crown Zenith",
  "Scarlet & Violet",
  "Paldea Evolved",
  "Obsidian Flames",
  "151",
  "Paradox Rift",
  "Paldean Fates",
  "Temporal Forces",
  "Twilight Masquerade",
  "Shrouded Fable",
  "Stellar Crown",
  "Surging Sparks",
  "Prismatic Evolutions",
  "Journey Together",
  "Destined Rivals",
  "Black Bolt",
  "White Flare"
];

const contentDir = path.join(__dirname, "src", "content");

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
const normalize = s => s.toLowerCase().replace(/['’]/g, "");
const order = orderList.findIndex(set => normalize(set) === normalize(title)) + 1;
  if (order === 0) {
    console.warn(`No order found for "${title}" in ${file}`);
    return;
  }

  // Remove existing order field if present
  frontmatter = frontmatter.replace(/\norder:\s*\d+\s*/g, "\n");

  // Insert order after title
  const newFrontmatter = frontmatter.replace(
    /(title:\s*["'].*?["']\s*)/,
    `$1\norder: ${order}\n`
  );

  // Replace old frontmatter in content
  const newContent = content.replace(
    /^---\n([\s\S]*?)\n---/,
    `---\n${newFrontmatter}\n---`
  );

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`Updated ${file} with order: ${order}`);
});

console.log("All MDX files updated with order field.");