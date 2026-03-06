import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rhode Island municipalities with their counties (all 39 cities and towns)
const rhodeIslandTowns = {
  // Providence County (16 municipalities)
  "Providence": "Providence",
  "Pawtucket": "Providence",
  "Cranston": "Providence",
  "Woonsocket": "Providence",
  "East Providence": "Providence",
  "Central Falls": "Providence",
  "North Providence": "Providence",
  "Cumberland": "Providence",
  "Lincoln": "Providence",
  "Smithfield": "Providence",
  "North Smithfield": "Providence",
  "Johnston": "Providence",
  "Scituate": "Providence",
  "Foster": "Providence",
  "Glocester": "Providence",
  "Burrillville": "Providence",
  // Kent County (5 municipalities)
  "Warwick": "Kent",
  "West Warwick": "Kent",
  "Coventry": "Kent",
  "East Greenwich": "Kent",
  "West Greenwich": "Kent",
  // Washington County (9 municipalities)
  "South Kingstown": "Washington",
  "North Kingstown": "Washington",
  "Westerly": "Washington",
  "Narragansett": "Washington",
  "Hopkinton": "Washington",
  "Charlestown": "Washington",
  "Richmond": "Washington",
  "Exeter": "Washington",
  "New Shoreham": "Washington",
  // Newport County (6 municipalities)
  "Newport": "Newport",
  "Middletown": "Newport",
  "Portsmouth": "Newport",
  "Tiverton": "Newport",
  "Little Compton": "Newport",
  "Jamestown": "Newport",
  // Bristol County (3 municipalities)
  "Bristol": "Bristol",
  "Warren": "Bristol",
  "Barrington": "Bristol"
};

// Population data for Rhode Island municipalities
const populations = {
  "Providence": 190934,
  "Warwick": 82823,
  "Cranston": 82934,
  "Pawtucket": 75604,
  "East Providence": 47139,
  "Woonsocket": 44328,
  "Newport": 25163,
  "Central Falls": 22583,
  "West Warwick": 29078,
  "Coventry": 35525,
  "Cumberland": 36405,
  "North Providence": 34003,
  "South Kingstown": 31760,
  "North Kingstown": 27733,
  "Johnston": 29568,
  "Lincoln": 22529,
  "Smithfield": 22128,
  "Bristol": 22493,
  "Westerly": 22787,
  "Barrington": 17225,
  "Middletown": 17617,
  "Portsmouth": 17708,
  "Tiverton": 16359,
  "Narragansett": 15004,
  "East Greenwich": 13693,
  "North Smithfield": 13149,
  "Burrillville": 17341,
  "Scituate": 10582,
  "Warren": 11147,
  "Hopkinton": 8397,
  "Charlestown": 7859,
  "Richmond": 7924,
  "Glocester": 10063,
  "Foster": 4892,
  "Exeter": 6675,
  "West Greenwich": 6304,
  "Jamestown": 5559,
  "Little Compton": 3518,
  "New Shoreham": 1051
};

// Business categories
const businessCategories = [
  "Restaurant", "Auto Repair", "Hair Salon", "Gas Station", "Grocery Store",
  "Bank", "Pharmacy", "Hardware Store", "Dentist", "Doctor",
  "Veterinarian", "Insurance Agency", "Real Estate", "Law Office", "Accounting",
  "Plumber", "Electrician", "HVAC", "Landscaping", "Pest Control",
  "Auto Dealer", "Tire Shop", "Car Wash", "Pizza Place", "Coffee Shop",
  "Bakery", "Florist", "Dry Cleaner", "Laundromat", "Gym",
  "Daycare", "Pet Store", "Pet Grooming", "Barber Shop", "Nail Salon",
  "Spa", "Chiropractor", "Physical Therapy", "Optometrist", "Funeral Home",
  "Church", "School", "Library", "Hotel", "Motel",
  "Bed and Breakfast", "Marina", "Boat Dealer", "Yacht Club", "Sailing School",
  "Golf Course", "Bowling Alley", "Movie Theater", "Arcade", "Bar",
  "Brewery", "Liquor Store", "Convenience Store", "Dollar Store", "Thrift Store",
  "Antique Store", "Furniture Store", "Appliance Store", "Electronics Store", "Clothing Boutique",
  "Shoe Store", "Jewelry Store", "Gift Shop", "Bookstore", "Toy Store",
  "Sporting Goods", "Outdoor Store", "Fishing Supply", "Bait Shop", "Surf Shop",
  "Seafood Market", "Clam Shack", "Oyster Bar", "Fish Market", "Lobster Pound",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Rhode Island regions
const namePrefixes = [
  "Ocean State", "Rhode Island", "Little Rhody", "Colonial", "Narragansett", "Bay",
  "Providence", "Newport", "Coastal", "Atlantic", "New England",
  "Plantation", "Heritage", "Aquidneck", "Blackstone"
];

const nameSuffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Group", "Solutions"];

function generateSlug(name) {
  return name.toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateBusinesses(townName, population, county) {
  const businesses = [];

  let numBusinesses;
  if (population > 100000) numBusinesses = 150;
  else if (population > 50000) numBusinesses = 100;
  else if (population > 25000) numBusinesses = 75;
  else if (population > 10000) numBusinesses = 50;
  else if (population > 5000) numBusinesses = 35;
  else if (population > 2000) numBusinesses = 25;
  else if (population > 1000) numBusinesses = 15;
  else numBusinesses = 10;

  const usedCategories = new Set();

  for (let i = 0; i < numBusinesses; i++) {
    let category;
    do {
      category = businessCategories[Math.floor(Math.random() * businessCategories.length)];
    } while (usedCategories.has(category) && usedCategories.size < businessCategories.length);
    usedCategories.add(category);

    const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];

    const patterns = [
      `${townName} ${category} ${suffix}`,
      `${prefix} ${category} ${suffix}`,
      `${county} ${category} ${suffix}`,
      `${prefix} ${category} of ${townName}`
    ];
    const name = patterns[Math.floor(Math.random() * patterns.length)];

    businesses.push({
      name: name,
      category: category,
      address: `${townName}, RI`,
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

// Main execution
const dataDir = path.join(__dirname, '..', 'data', 'towns');
const contentDir = path.join(__dirname, '..', 'content', 'towns');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

let totalBusinesses = 0;
let townCount = 0;
const counties = new Set();

for (const [town, county] of Object.entries(rhodeIslandTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Rhode Island",
    state_abbr: "RI",
    county: county,
    population: population,
    slug: `${slug}-ri`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-ri.json`),
    JSON.stringify(townData, null, 2)
  );

  // CORRECT FORMAT for content files
  const mdContent = `---
title: "${town}, RI Business Directory"
type: "towns"
slug: "${slug}-ri"
state: "ri"
town_data: "${slug}-ri"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-ri.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Rhode Island Business Directory"
slug: "ri"
state: "ri"
state_name: "Rhode Island"
---
`;
fs.writeFileSync(path.join(statesDir, 'ri.md'), stateMd);

console.log(`Created Rhode Island towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
