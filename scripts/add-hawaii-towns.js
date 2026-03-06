import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Hawaii communities with their counties
// Hawaii has 5 counties but only 1 incorporated city (Honolulu)
// Census Designated Places (CDPs) are included for comprehensive coverage
// Source: US Census Bureau, Hawaii State Data Center
const hawaiiTowns = {
  // Honolulu County (City and County of Honolulu - Oahu)
  "Honolulu": "Honolulu",
  "Aiea": "Honolulu",
  "Ahuimanu": "Honolulu",
  "Ewa Beach": "Honolulu",
  "Ewa Gentry": "Honolulu",
  "Ewa Villages": "Honolulu",
  "Halawa": "Honolulu",
  "Hauula": "Honolulu",
  "Hawaii Kai": "Honolulu",
  "Heeia": "Honolulu",
  "Hickam Housing": "Honolulu",
  "Iroquois Point": "Honolulu",
  "Kaaawa": "Honolulu",
  "Kahaluu": "Honolulu",
  "Kahuku": "Honolulu",
  "Kailua": "Honolulu",
  "Kaimuki": "Honolulu",
  "Kalihi": "Honolulu",
  "Kaneohe": "Honolulu",
  "Kapolei": "Honolulu",
  "Ko Olina": "Honolulu",
  "Laie": "Honolulu",
  "Makaha": "Honolulu",
  "Makakilo": "Honolulu",
  "Makiki": "Honolulu",
  "Manoa": "Honolulu",
  "Mililani": "Honolulu",
  "Mililani Mauka": "Honolulu",
  "Moanalua": "Honolulu",
  "Nanakuli": "Honolulu",
  "Ocean Pointe": "Honolulu",
  "Pearl City": "Honolulu",
  "Punaluu": "Honolulu",
  "Royal Kunia": "Honolulu",
  "Schofield Barracks": "Honolulu",
  "Wahiawa": "Honolulu",
  "Waialua": "Honolulu",
  "Waianae": "Honolulu",
  "Waikele": "Honolulu",
  "Waikiki": "Honolulu",
  "Waimanalo": "Honolulu",
  "Waipahu": "Honolulu",
  "Waipio": "Honolulu",
  "Wheeler AFB": "Honolulu",
  "Whitmore Village": "Honolulu",

  // Hawaii County (Big Island)
  "Hilo": "Hawaii",
  "Captain Cook": "Hawaii",
  "Discovery Harbour": "Hawaii",
  "Eden Roc": "Hawaii",
  "Fern Acres": "Hawaii",
  "Fern Forest": "Hawaii",
  "Hawi": "Hawaii",
  "Hawaiian Acres": "Hawaii",
  "Hawaiian Beaches": "Hawaii",
  "Hawaiian Ocean View": "Hawaii",
  "Hawaiian Paradise Park": "Hawaii",
  "Holualoa": "Hawaii",
  "Honalo": "Hawaii",
  "Honaunau-Napoopoo": "Hawaii",
  "Honokaa": "Hawaii",
  "Honomu": "Hawaii",
  "Kailua-Kona": "Hawaii",
  "Kapaau": "Hawaii",
  "Keaau": "Hawaii",
  "Kealakekua": "Hawaii",
  "Kohala": "Hawaii",
  "Kukuihaele": "Hawaii",
  "Kurtistown": "Hawaii",
  "Laupahoehoe": "Hawaii",
  "Leilani Estates": "Hawaii",
  "Mountain View": "Hawaii",
  "Naalehu": "Hawaii",
  "Nanawale Estates": "Hawaii",
  "Orchidlands Estates": "Hawaii",
  "Paauilo": "Hawaii",
  "Pahala": "Hawaii",
  "Pahoa": "Hawaii",
  "Papaikou": "Hawaii",
  "Pepeekeo": "Hawaii",
  "Volcano": "Hawaii",
  "Waimea": "Hawaii",
  "Waikoloa Village": "Hawaii",

  // Maui County (Maui, Molokai, Lanai)
  "Kahului": "Maui",
  "Haiku-Pauwela": "Maui",
  "Hana": "Maui",
  "Kaanapali": "Maui",
  "Kahului": "Maui",
  "Kapalua": "Maui",
  "Kihei": "Maui",
  "Kula": "Maui",
  "Lahaina": "Maui",
  "Lanai City": "Maui",
  "Makawao": "Maui",
  "Napili-Honokowai": "Maui",
  "Paia": "Maui",
  "Pukalani": "Maui",
  "Spreckelsville": "Maui",
  "Waihee-Waiehu": "Maui",
  "Wailuku": "Maui",
  "Wailea": "Maui",
  "Kaunakakai": "Maui",
  "Maunaloa": "Maui",

  // Kauai County
  "Lihue": "Kauai",
  "Anahola": "Kauai",
  "Eleele": "Kauai",
  "Hanalei": "Kauai",
  "Hanapepe": "Kauai",
  "Kalaheo": "Kauai",
  "Kapaa": "Kauai",
  "Kaumakani": "Kauai",
  "Kekaha": "Kauai",
  "Kilauea": "Kauai",
  "Koloa": "Kauai",
  "Lawai": "Kauai",
  "Omao": "Kauai",
  "Pakala Village": "Kauai",
  "Poipu": "Kauai",
  "Princeville": "Kauai",
  "Puhi": "Kauai",
  "Wailua Homesteads": "Kauai",
  "Waimea": "Kauai"
};

// Populations for Hawaii communities
const populations = {
  "Honolulu": 350964,
  "Pearl City": 47698,
  "Hilo": 45703,
  "Kailua": 40514,
  "Waipahu": 38216,
  "Kaneohe": 34597,
  "Mililani": 28608,
  "Kahului": 29879,
  "Kapolei": 21541,
  "Ewa Gentry": 26269,
  "Ewa Beach": 15104,
  "Kihei": 24177,
  "Makakilo": 19980,
  "Aiea": 9338,
  "Wailuku": 17697,
  "Mililani Mauka": 21039,
  "Kailua-Kona": 14891,
  "Lahaina": 13151,
  "Waipio": 11455,
  "Kapaa": 11087,
  "Wahiawa": 17821,
  "Lihue": 7568,
  "Pukalani": 9039,
  "Nanakuli": 12666,
  "Waimea": 10839,
  "Haiku-Pauwela": 9107,
  "Makawao": 7653,
  "Waianae": 13177,
  "Hawaiian Paradise Park": 11404,
  "Keaau": 3041,
  "Royal Kunia": 14525,
  "Hawaii Kai": 21471,
  "Halawa": 14014,
  "Laie": 6445,
  "Kula": 8541,
  "Waikele": 7026,
  "Napili-Honokowai": 7960,
  "Ocean Pointe": 16127,
  "Waimanalo": 5451,
  "Ahuimanu": 9251,
  "Koloa": 2285,
  "Waikoloa Village": 7636,
  "Princeville": 2266,
  "Makaha": 9143,
  "Heeia": 5128,
  "Schofield Barracks": 17599,
  "Moanalua": 11298,
  "Kahuku": 2601,
  "Kaanapali": 1036,
  "Hauula": 4196,
  "Volcano": 2643,
  "Pahoa": 945,
  "Captain Cook": 3429,
  "Kealakekua": 2437,
  "Holualoa": 9259,
  "Kapaau": 1301,
  "Honokaa": 2258,
  "Hawi": 1036,
  "Kilauea": 2989,
  "Hanalei": 450,
  "Kalaheo": 5039,
  "Hanapepe": 2638,
  "Eleele": 2113,
  "Kekaha": 3551,
  "Poipu": 1197,
  "Waihee-Waiehu": 7296,
  "Lanai City": 3367,
  "Kaunakakai": 3449,
  "Paia": 2668,
  "Hana": 1325,
  "Wailea": 6296,
  "Kahaluu": 4738,
  "Papaikou": 1699,
  "Naalehu": 1034,
  "Pahala": 1347,
  "Mountain View": 3550,
  "Kurtistown": 1101,
  "Pepeekeo": 1822,
  "Honomu": 535,
  "Laupahoehoe": 491,
  "Kapolei": 21541,
  "Kaaawa": 1317,
  "Punaluu": 906,
  "Waialua": 3876,
  "Wailua Homesteads": 5785,
  "Anahola": 2231,
  "Lawai": 2424,
  "Omao": 1325,
  "Puhi": 1132,
  "Whitmore Village": 5131,
  "Wheeler AFB": 2213,
  "Hickam Housing": 5859,
  "Ewa Villages": 6808,
  "Iroquois Point": 3298,
  "Ko Olina": 1558,
  "Kaumakani": 865,
  "Pakala Village": 232,
  "Maunaloa": 262,
  "Eden Roc": 420,
  "Fern Acres": 1050,
  "Fern Forest": 998,
  "Discovery Harbour": 1458,
  "Hawaiian Acres": 2513,
  "Hawaiian Beaches": 4626,
  "Hawaiian Ocean View": 4611,
  "Honalo": 2534,
  "Honaunau-Napoopoo": 2303,
  "Kohala": 1250,
  "Kukuihaele": 392,
  "Leilani Estates": 1560,
  "Nanawale Estates": 5027,
  "Orchidlands Estates": 2756,
  "Paauilo": 583,
  "Spreckelsville": 567
};

// Business categories for Hawaii
const businessCategories = [
  "Restaurant", "Hawaiian Restaurant", "Poke Shop", "Sushi", "Plate Lunch", "Cafe", "Coffee Shop",
  "Shave Ice", "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "ABC Store", "Surf Shop", "Beach Rentals",
  "Auto Repair", "Car Rental", "Tire Shop", "Hair Salon", "Barbershop", "Spa", "Massage",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym", "Yoga Studio",
  "Pet Store", "Florist", "Lei Shop", "Bakery", "Malasada Shop", "Fast Food",
  "Hotel", "Resort", "Vacation Rental", "Bed & Breakfast",
  "Dive Shop", "Snorkel Rental", "Boat Tours", "Helicopter Tours",
  "Landscaping", "HVAC", "Plumber", "Electrician", "Roofing"
];

function slugify(name) {
  return name.toLowerCase()
    .replace(/[''\.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function generateBusinesses(townName, count, stateAbbr) {
  const businesses = [];
  const usedNames = new Set();

  for (let i = 0; i < count; i++) {
    const category = businessCategories[i % businessCategories.length];
    let name;
    const prefixes = [townName, "Hawaii", "Aloha", "Island", "Pacific", "Ohana", "Paradise", "Tropical"];
    const suffixes = ["", " LLC", " Inc", " & Co", " Services", " Center", " Plus"];

    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      name = `${prefix} ${category}${suffix}`.trim();
    } while (usedNames.has(name) && usedNames.size < 200);

    usedNames.add(name);

    businesses.push({
      name: name,
      category: category,
      address: `${townName}, ${stateAbbr}`,
      phone: "",
      email: "",
      website: "",
      hours: "",
      rating: null,
      review_count: null,
      claimed: false,
      featured: false
    });
  }

  return businesses;
}

const townsDir = path.join(__dirname, '..', 'data', 'towns');
const contentDir = path.join(__dirname, '..', 'content', 'towns');
const statesDir = path.join(__dirname, '..', 'content', 'states');

// Ensure directories exist
[townsDir, contentDir, statesDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

let townCount = 0;
let totalBusinesses = 0;
const countyCounts = {};

for (const [townName, county] of Object.entries(hawaiiTowns)) {
  const slug = slugify(townName) + '-hi';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 3000) + 500;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 200000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "HI");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Hawaii",
    state_abbr: "HI",
    county: county,
    population: population,
    slug: slug,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(townsDir, `${slug}.json`),
    JSON.stringify(townData, null, 2)
  );

  // Create content markdown
  const content = `---
title: "${townName}, HI Business Directory"
type: "towns"
slug: "${slug}"
state: "hi"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Hawaii Business Directory"
slug: "hi"
state: "hi"
state_name: "Hawaii"
---
`;
fs.writeFileSync(path.join(statesDir, 'hi.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
