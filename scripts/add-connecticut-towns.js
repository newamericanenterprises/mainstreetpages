import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Connecticut municipalities with their counties
// Connecticut has 8 counties and 169 towns (all municipalities are towns)
// Source: Connecticut Secretary of State, US Census Bureau
const connecticutTowns = {
  // Fairfield County
  "Bethel": "Fairfield",
  "Bridgeport": "Fairfield",
  "Brookfield": "Fairfield",
  "Danbury": "Fairfield",
  "Darien": "Fairfield",
  "Easton": "Fairfield",
  "Fairfield": "Fairfield",
  "Greenwich": "Fairfield",
  "Monroe": "Fairfield",
  "New Canaan": "Fairfield",
  "New Fairfield": "Fairfield",
  "Newtown": "Fairfield",
  "Norwalk": "Fairfield",
  "Redding": "Fairfield",
  "Ridgefield": "Fairfield",
  "Shelton": "Fairfield",
  "Sherman": "Fairfield",
  "Stamford": "Fairfield",
  "Stratford": "Fairfield",
  "Trumbull": "Fairfield",
  "Weston": "Fairfield",
  "Westport": "Fairfield",
  "Wilton": "Fairfield",

  // Hartford County
  "Avon": "Hartford",
  "Berlin": "Hartford",
  "Bloomfield": "Hartford",
  "Bristol": "Hartford",
  "Burlington": "Hartford",
  "Canton": "Hartford",
  "East Granby": "Hartford",
  "East Hartford": "Hartford",
  "East Windsor": "Hartford",
  "Enfield": "Hartford",
  "Farmington": "Hartford",
  "Glastonbury": "Hartford",
  "Granby": "Hartford",
  "Hartford": "Hartford",
  "Hartland": "Hartford",
  "Manchester": "Hartford",
  "Marlborough": "Hartford",
  "New Britain": "Hartford",
  "Newington": "Hartford",
  "Plainville": "Hartford",
  "Rocky Hill": "Hartford",
  "Simsbury": "Hartford",
  "South Windsor": "Hartford",
  "Southington": "Hartford",
  "Suffield": "Hartford",
  "West Hartford": "Hartford",
  "Wethersfield": "Hartford",
  "Windsor": "Hartford",
  "Windsor Locks": "Hartford",

  // Litchfield County
  "Barkhamsted": "Litchfield",
  "Bethlehem": "Litchfield",
  "Bridgewater": "Litchfield",
  "Canaan": "Litchfield",
  "Colebrook": "Litchfield",
  "Cornwall": "Litchfield",
  "Goshen": "Litchfield",
  "Harwinton": "Litchfield",
  "Kent": "Litchfield",
  "Litchfield": "Litchfield",
  "Morris": "Litchfield",
  "New Hartford": "Litchfield",
  "New Milford": "Litchfield",
  "Norfolk": "Litchfield",
  "North Canaan": "Litchfield",
  "Plymouth": "Litchfield",
  "Roxbury": "Litchfield",
  "Salisbury": "Litchfield",
  "Sharon": "Litchfield",
  "Thomaston": "Litchfield",
  "Torrington": "Litchfield",
  "Warren": "Litchfield",
  "Washington": "Litchfield",
  "Watertown": "Litchfield",
  "Winchester": "Litchfield",
  "Woodbury": "Litchfield",

  // Middlesex County
  "Chester": "Middlesex",
  "Clinton": "Middlesex",
  "Cromwell": "Middlesex",
  "Deep River": "Middlesex",
  "Durham": "Middlesex",
  "East Haddam": "Middlesex",
  "East Hampton": "Middlesex",
  "Essex": "Middlesex",
  "Haddam": "Middlesex",
  "Killingworth": "Middlesex",
  "Middlefield": "Middlesex",
  "Middletown": "Middlesex",
  "Old Saybrook": "Middlesex",
  "Portland": "Middlesex",
  "Westbrook": "Middlesex",

  // New Haven County
  "Ansonia": "New Haven",
  "Beacon Falls": "New Haven",
  "Bethany": "New Haven",
  "Branford": "New Haven",
  "Cheshire": "New Haven",
  "Derby": "New Haven",
  "East Haven": "New Haven",
  "Guilford": "New Haven",
  "Hamden": "New Haven",
  "Madison": "New Haven",
  "Meriden": "New Haven",
  "Middlebury": "New Haven",
  "Milford": "New Haven",
  "Naugatuck": "New Haven",
  "New Haven": "New Haven",
  "North Branford": "New Haven",
  "North Haven": "New Haven",
  "Orange": "New Haven",
  "Oxford": "New Haven",
  "Prospect": "New Haven",
  "Seymour": "New Haven",
  "Southbury": "New Haven",
  "Wallingford": "New Haven",
  "Waterbury": "New Haven",
  "West Haven": "New Haven",
  "Wolcott": "New Haven",
  "Woodbridge": "New Haven",

  // New London County
  "Bozrah": "New London",
  "Colchester": "New London",
  "East Lyme": "New London",
  "Franklin": "New London",
  "Griswold": "New London",
  "Groton": "New London",
  "Lebanon": "New London",
  "Ledyard": "New London",
  "Lisbon": "New London",
  "Lyme": "New London",
  "Montville": "New London",
  "New London": "New London",
  "North Stonington": "New London",
  "Norwich": "New London",
  "Old Lyme": "New London",
  "Preston": "New London",
  "Salem": "New London",
  "Sprague": "New London",
  "Stonington": "New London",
  "Voluntown": "New London",
  "Waterford": "New London",

  // Tolland County
  "Andover": "Tolland",
  "Bolton": "Tolland",
  "Columbia": "Tolland",
  "Coventry": "Tolland",
  "Ellington": "Tolland",
  "Hebron": "Tolland",
  "Mansfield": "Tolland",
  "Somers": "Tolland",
  "Stafford": "Tolland",
  "Tolland": "Tolland",
  "Union": "Tolland",
  "Vernon": "Tolland",
  "Willington": "Tolland",

  // Windham County
  "Ashford": "Windham",
  "Brooklyn": "Windham",
  "Canterbury": "Windham",
  "Chaplin": "Windham",
  "Eastford": "Windham",
  "Hampton": "Windham",
  "Killingly": "Windham",
  "Plainfield": "Windham",
  "Pomfret": "Windham",
  "Putnam": "Windham",
  "Scotland": "Windham",
  "Sterling": "Windham",
  "Thompson": "Windham",
  "Windham": "Windham",
  "Woodstock": "Windham"
};

// Populations for Connecticut communities
const populations = {
  "Bridgeport": 148654,
  "New Haven": 134023,
  "Stamford": 135470,
  "Hartford": 121054,
  "Waterbury": 114403,
  "Norwalk": 91184,
  "Danbury": 86518,
  "New Britain": 74135,
  "West Hartford": 64083,
  "Greenwich": 63518,
  "Fairfield": 61512,
  "Hamden": 61169,
  "Bristol": 60039,
  "Meriden": 60850,
  "Manchester": 59713,
  "West Haven": 55584,
  "Milford": 54503,
  "Stratford": 52355,
  "East Hartford": 51045,
  "Middletown": 47717,
  "Wallingford": 44396,
  "Enfield": 43778,
  "Southington": 43501,
  "Norwich": 40125,
  "Shelton": 41164,
  "Torrington": 34259,
  "Trumbull": 36601,
  "Glastonbury": 35159,
  "Naugatuck": 31519,
  "Newington": 30536,
  "Vernon": 30215,
  "Cheshire": 29261,
  "Branford": 28273,
  "Newtown": 28488,
  "Windsor": 29871,
  "Groton": 38411,
  "South Windsor": 26918,
  "New Milford": 27601,
  "East Haven": 28490,
  "Darien": 21499,
  "Simsbury": 25032,
  "Guilford": 22375,
  "Ridgefield": 25033,
  "Farmington": 26712,
  "North Haven": 24253,
  "Bethel": 20358,
  "Bloomfield": 21535,
  "Monroe": 19479,
  "Avon": 18932,
  "Rocky Hill": 21006,
  "Wethersfield": 27298,
  "Westport": 27141,
  "Waterford": 19517,
  "Berlin": 20175,
  "Orange": 14280,
  "Stonington": 18545,
  "New Canaan": 20622,
  "Wilton": 18503,
  "Ledyard": 14685,
  "East Lyme": 18693,
  "Brookfield": 17528,
  "Madison": 18269,
  "Plainville": 17779,
  "Seymour": 16540,
  "Old Saybrook": 10481,
  "Cromwell": 14225,
  "Derby": 12902,
  "Ansonia": 18918,
  "Killingly": 17752,
  "Montville": 18387,
  "Colchester": 16068,
  "Wolcott": 16680,
  "Prospect": 9405,
  "Ellington": 16426,
  "East Windsor": 11510,
  "Plainfield": 15405,
  "Suffield": 15752,
  "Granby": 11182,
  "Stafford": 12087,
  "Somers": 10255,
  "Canton": 10292,
  "Burlington": 9301,
  "East Granby": 5214,
  "Tolland": 14563,
  "Hebron": 9686,
  "Coventry": 12435,
  "Plymouth": 11671,
  "Portland": 9508,
  "Mansfield": 25892,
  "East Hampton": 12717,
  "Clinton": 13185,
  "Deep River": 4629,
  "East Haddam": 9126,
  "Durham": 7388,
  "Chester": 3994,
  "Haddam": 8452,
  "Essex": 6733,
  "Killingworth": 6525,
  "Middlefield": 4203,
  "Westbrook": 6939,
  "Oxford": 13017,
  "Beacon Falls": 6049,
  "Bethany": 5563,
  "Middlebury": 7574,
  "North Branford": 14407,
  "Southbury": 19879,
  "Woodbridge": 9087,
  "Putnam": 9764,
  "Thompson": 9458,
  "Brooklyn": 8450,
  "Woodstock": 8221,
  "Pomfret": 4266,
  "Canterbury": 5132,
  "Sterling": 3830,
  "Eastford": 1749,
  "Hampton": 1826,
  "Chaplin": 2305,
  "Scotland": 1672,
  "Ashford": 4317,
  "Bozrah": 2627,
  "Franklin": 1922,
  "Griswold": 11951,
  "Lebanon": 7308,
  "Lisbon": 4338,
  "Lyme": 2406,
  "North Stonington": 5297,
  "Old Lyme": 7628,
  "Preston": 4726,
  "Salem": 4151,
  "Sprague": 2967,
  "Voluntown": 2603,
  "Andover": 3303,
  "Bolton": 4858,
  "Columbia": 5485,
  "Willington": 6041,
  "Union": 785,
  "Weston": 10354,
  "Easton": 7605,
  "Redding": 9158,
  "Sherman": 3527,
  "New Fairfield": 13881,
  "Windsor Locks": 12613,
  "Hartland": 2114,
  "Marlborough": 6133,
  "Barkhamsted": 3799,
  "Bethlehem": 3607,
  "Bridgewater": 1727,
  "Canaan": 1234,
  "Colebrook": 1485,
  "Cornwall": 1434,
  "Goshen": 2871,
  "Harwinton": 5642,
  "Kent": 2979,
  "Litchfield": 8192,
  "Morris": 2388,
  "New Hartford": 6970,
  "Norfolk": 1588,
  "North Canaan": 3315,
  "Roxbury": 2136,
  "Salisbury": 4194,
  "Sharon": 2782,
  "Thomaston": 7442,
  "Warren": 1461,
  "Washington": 3646,
  "Watertown": 22514,
  "Winchester": 10224,
  "Woodbury": 9975
};

// Business categories for Connecticut
const businessCategories = [
  "Restaurant", "Italian Restaurant", "Pizza", "Seafood", "Diner", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "Hardware Store", "Antique Shop",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop", "Spa",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian", "Chiropractor",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym", "Yoga Studio",
  "Pet Store", "Florist", "Bakery", "Deli", "Fast Food",
  "Hotel", "Bed & Breakfast", "Furniture Store", "Landscaping", "Marina",
  "HVAC", "Plumber", "Electrician", "Roofing", "Snow Removal"
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
    const prefixes = [townName, "Connecticut", "New England", "Nutmeg State", "Yankee", "Colonial", "Harbor"];
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

for (const [townName, county] of Object.entries(connecticutTowns)) {
  const slug = slugify(townName) + '-ct';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 5000) + 1000;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 100000) businessCount = 125;
  else if (population > 50000) businessCount = 100;
  else if (population > 30000) businessCount = 75;
  else if (population > 20000) businessCount = 60;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else businessCount = 15;

  const businesses = generateBusinesses(townName, businessCount, "CT");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Connecticut",
    state_abbr: "CT",
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
title: "${townName}, CT Business Directory"
type: "towns"
slug: "${slug}"
state: "ct"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Connecticut Business Directory"
slug: "ct"
state: "ct"
state_name: "Connecticut"
---
`;
fs.writeFileSync(path.join(statesDir, 'ct.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
