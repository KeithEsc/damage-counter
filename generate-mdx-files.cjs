const fs = require("fs");
const path = require("path");

const sets = [
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
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const today = new Date().toISOString().slice(0, 10);

sets.forEach((set, i) => {
  const slug = slugify(set);
  const filename = `${slug}.mdx`;
  const mdx = `---
title: "${set}"
description: "Information about the ${set} Pokémon TCG set."
slug: "${slug}"
date: "${today}"
canonical: "/sets/${slug}"
---
${set} is a set in the Pokémon Trading Card Game. More information coming soon.
`;
  fs.writeFileSync(path.join(contentDir, filename), mdx, "utf8");
});

console.log("MDX files generated in src/content/");