import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const sets = [
  { name: "Base Set", id: 604 },
  { name: "Jungle", id: 605 },
  // ✅ add all your set IDs here
];

async function generateTopCards() {
  const top10PerSet = {};

  for (const set of sets) {
    const url = `https://tcgcsv.com/tcgplayer/3/${set.id}/ProductsAndPrices.csv`;
    console.log(`🔄 Fetching ${set.name} from ${url}`);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`❌ Failed to fetch ${set.name}:`, res.status);
        continue;
      }

      const csvText = await res.text();

      const records = parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        bom: true
      });

      console.log(`📊 Processing ${set.name}, ${records.length} cards found.`);

const cards = records.map(card => ({
  name: card.name || card['product name'],
  number: card.extNumber || card['number'],
  rarity: card.extRarity || card['rarity'],
  price: parseFloat(card.marketPrice || card['market price'])
})).filter(c =>
  !isNaN(c.price) &&
  c.number // ✅ only include entries with a card number
);

      const sorted = cards.sort((a, b) => b.price - a.price).slice(0, 10);

      top10PerSet[set.name] = sorted;

    } catch (err) {
      console.error(`❌ Error processing ${set.name}:`, err);
    }
  }

  console.log("💾 Saving top-cards.json...");
  const outputPath = path.resolve('./src/data/top-cards.json');
  fs.writeFileSync(outputPath, JSON.stringify(top10PerSet, null, 2));

  console.log("✅ Done! Data saved to src/data/top-cards.json");
}

generateTopCards().catch(console.error);
