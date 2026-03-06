import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Delaware municipalities with their counties
// Delaware has 3 counties and 57 incorporated municipalities
// Source: Delaware Secretary of State, US Census Bureau
const delawareTowns = {
  // Kent County
  "Bowers": "Kent",
  "Camden": "Kent",
  "Cheswold": "Kent",
  "Clayton": "Kent",
  "Dover": "Kent",
  "Farmington": "Kent",
  "Felton": "Kent",
  "Frederica": "Kent",
  "Harrington": "Kent",
  "Hartly": "Kent",
  "Houston": "Kent",
  "Kenton": "Kent",
  "Leipsic": "Kent",
  "Little Creek": "Kent",
  "Magnolia": "Kent",
  "Milford": "Kent",
  "Smyrna": "Kent",
  "Viola": "Kent",
  "Woodside": "Kent",
  "Wyoming": "Kent",

  // New Castle County
  "Arden": "New Castle",
  "Ardencroft": "New Castle",
  "Ardentown": "New Castle",
  "Bellefonte": "New Castle",
  "Delaware City": "New Castle",
  "Elsmere": "New Castle",
  "Middletown": "New Castle",
  "New Castle": "New Castle",
  "Newark": "New Castle",
  "Newport": "New Castle",
  "Odessa": "New Castle",
  "St. Georges": "New Castle",
  "Townsend": "New Castle",
  "Wilmington": "New Castle",

  // Sussex County
  "Bethany Beach": "Sussex",
  "Bethel": "Sussex",
  "Blades": "Sussex",
  "Bridgeville": "Sussex",
  "Dagsboro": "Sussex",
  "Delmar": "Sussex",
  "Dewey Beach": "Sussex",
  "Ellendale": "Sussex",
  "Fenwick Island": "Sussex",
  "Frankford": "Sussex",
  "Georgetown": "Sussex",
  "Greenwood": "Sussex",
  "Henlopen Acres": "Sussex",
  "Laurel": "Sussex",
  "Lewes": "Sussex",
  "Millsboro": "Sussex",
  "Millville": "Sussex",
  "Milton": "Sussex",
  "Ocean View": "Sussex",
  "Rehoboth Beach": "Sussex",
  "Seaford": "Sussex",
  "Selbyville": "Sussex",
  "Slaughter Beach": "Sussex",
  "South Bethany": "Sussex"
};

// Populations for Delaware communities
const populations = {
  "Wilmington": 70898,
  "Dover": 39403,
  "Newark": 33387,
  "Middletown": 22350,
  "Smyrna": 12883,
  "Milford": 11732,
  "Seaford": 8225,
  "Georgetown": 7436,
  "Elsmere": 5814,
  "New Castle": 5285,
  "Millsboro": 4448,
  "Lewes": 3266,
  "Laurel": 4115,
  "Harrington": 3708,
  "Camden": 3529,
  "Milton": 3391,
  "Bridgeville": 2678,
  "Clayton": 3454,
  "Selbyville": 2491,
  "Rehoboth Beach": 1327,
  "Townsend": 2607,
  "Delmar": 1897,
  "Bethany Beach": 1060,
  "Ocean View": 2637,
  "Felton": 1451,
  "Greenwood": 1006,
  "Blades": 1336,
  "Wyoming": 1532,
  "Frankford": 937,
  "Dagsboro": 815,
  "Delaware City": 1885,
  "Cheswold": 341,
  "Odessa": 450,
  "Newport": 1055,
  "Dewey Beach": 341,
  "Fenwick Island": 379,
  "Ellendale": 422,
  "Frederica": 881,
  "Magnolia": 237,
  "Viola": 182,
  "Houston": 535,
  "Woodside": 133,
  "Farmington": 111,
  "Leipsic": 223,
  "Little Creek": 181,
  "Bowers": 335,
  "Hartly": 74,
  "Kenton": 288,
  "Arden": 432,
  "Ardencroft": 273,
  "Ardentown": 268,
  "Bellefonte": 1234,
  "St. Georges": 176,
  "Bethel": 173,
  "Henlopen Acres": 135,
  "Slaughter Beach": 198,
  "South Bethany": 449,
  "Millville": 3451
};

// Business categories for Delaware
const businessCategories = [
  "Restaurant", "Seafood Restaurant", "Crab House", "Steakhouse", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "Hardware Store", "Beach Shop",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop", "Spa",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym",
  "Pet Store", "Florist", "Bakery", "Pizza", "Fast Food",
  "Hotel", "Motel", "Bed & Breakfast", "Vacation Rental", "Furniture Store",
  "Surf Shop", "Kayak Rental", "Marina", "Landscaping",
  "HVAC", "Plumber", "Electrician", "Roofing"
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
    const prefixes = [townName, "Delaware", "First State", "Diamond State", "Blue Hen", "Coastal", "Delmarva"];
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

for (const [townName, county] of Object.entries(delawareTowns)) {
  const slug = slugify(townName) + '-de';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 1000) + 200;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "DE");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Delaware",
    state_abbr: "DE",
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
title: "${townName}, DE Business Directory"
type: "towns"
slug: "${slug}"
state: "de"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Delaware Business Directory"
slug: "de"
state: "de"
state_name: "Delaware"
---
`;
fs.writeFileSync(path.join(statesDir, 'de.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
