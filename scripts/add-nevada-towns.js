import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nevada municipalities with their counties
const nevadaTowns = {
  "Alamo": "Lincoln",
  "Austin": "Lander",
  "Baker": "White Pine",
  "Battle Mountain": "Lander",
  "Beatty": "Nye",
  "Blue Diamond": "Clark",
  "Boulder City": "Clark",
  "Bunkerville": "Clark",
  "Caliente": "Lincoln",
  "Carlin": "Elko",
  "Carson City": "Carson City",
  "Cold Springs": "Washoe",
  "Crystal Bay": "Washoe",
  "Dayton": "Lyon",
  "Dyer": "Esmeralda",
  "East Las Vegas": "Clark",
  "Elko": "Elko",
  "Ely": "White Pine",
  "Empire": "Washoe",
  "Enterprise": "Clark",
  "Eureka": "Eureka",
  "Fallon": "Churchill",
  "Fernley": "Lyon",
  "Gardnerville": "Douglas",
  "Gardnerville Ranchos": "Douglas",
  "Genoa": "Douglas",
  "Gerlach": "Washoe",
  "Glenbrook": "Douglas",
  "Golconda": "Humboldt",
  "Goldfield": "Esmeralda",
  "Goodsprings": "Clark",
  "Hawthorne": "Mineral",
  "Henderson": "Clark",
  "Incline Village": "Washoe",
  "Indian Hills": "Douglas",
  "Indian Springs": "Clark",
  "Jackpot": "Elko",
  "Johnson Lane": "Douglas",
  "Kingsbury": "Douglas",
  "Las Vegas": "Clark",
  "Laughlin": "Clark",
  "Lemmon Valley": "Washoe",
  "Lovelock": "Pershing",
  "Lund": "White Pine",
  "McDermitt": "Humboldt",
  "McGill": "White Pine",
  "Mesquite": "Clark",
  "Mina": "Mineral",
  "Minden": "Douglas",
  "Moapa": "Clark",
  "Moapa Valley": "Clark",
  "Montello": "Elko",
  "Mount Charleston": "Clark",
  "Nellis AFB": "Clark",
  "Nixon": "Washoe",
  "North Las Vegas": "Clark",
  "Oasis": "Elko",
  "Overton": "Clark",
  "Owyhee": "Elko",
  "Pahrump": "Nye",
  "Panaca": "Lincoln",
  "Paradise": "Clark",
  "Pioche": "Lincoln",
  "Rachel": "Lincoln",
  "Reno": "Washoe",
  "Round Hill Village": "Douglas",
  "Ruth": "White Pine",
  "Sandy Valley": "Clark",
  "Searchlight": "Clark",
  "Silver Peak": "Esmeralda",
  "Silver Springs": "Lyon",
  "Smith": "Lyon",
  "Smith Valley": "Lyon",
  "Spanish Springs": "Washoe",
  "Sparks": "Washoe",
  "Spring Creek": "Elko",
  "Spring Valley": "Clark",
  "Stagecoach": "Lyon",
  "Stateline": "Douglas",
  "Summerlin South": "Clark",
  "Sun Valley": "Washoe",
  "Sunrise Manor": "Clark",
  "Sutcliffe": "Washoe",
  "Tonopah": "Nye",
  "Topaz Lake": "Douglas",
  "Unionville": "Pershing",
  "Verdi": "Washoe",
  "Virginia City": "Storey",
  "Wadsworth": "Washoe",
  "Wellington": "Lyon",
  "Wells": "Elko",
  "West Wendover": "Elko",
  "Whitney": "Clark",
  "Winchester": "Clark",
  "Winnemucca": "Humboldt",
  "Yerington": "Lyon",
  "Zephyr Cove": "Douglas"
};

// Population data for Nevada municipalities
const populations = {
  "Las Vegas": 641903,
  "Henderson": 320189,
  "Reno": 264165,
  "North Las Vegas": 262527,
  "Sparks": 108445,
  "Enterprise": 228259,
  "Paradise": 193150,
  "Spring Valley": 214751,
  "Sunrise Manor": 205618,
  "Whitney": 44488,
  "Winchester": 28568,
  "Summerlin South": 67111,
  "Carson City": 58639,
  "Pahrump": 42196,
  "Elko": 20279,
  "Fernley": 20852,
  "Mesquite": 18244,
  "Boulder City": 15977,
  "Fallon": 8726,
  "Spanish Springs": 19285,
  "Sun Valley": 22622,
  "Spring Creek": 15280,
  "Dayton": 15263,
  "Gardnerville Ranchos": 11760,
  "Incline Village": 9255,
  "Cold Springs": 9152,
  "Lemmon Valley": 6280,
  "Indian Hills": 6139,
  "Johnson Lane": 6405,
  "Minden": 3480,
  "Gardnerville": 6211,
  "Winnemucca": 7902,
  "Ely": 4045,
  "Yerington": 3048,
  "Laughlin": 8534,
  "Moapa Valley": 7091,
  "Battle Mountain": 3635,
  "Carlin": 2367,
  "Wells": 1292,
  "West Wendover": 4721,
  "Hawthorne": 3095,
  "Lovelock": 1813,
  "Tonopah": 2478,
  "Caliente": 1040,
  "Pioche": 956,
  "Eureka": 1987,
  "Virginia City": 855,
  "Goldfield": 268,
  "Austin": 192,
  "Jackpot": 1195,
  "Baker": 68,
  "Beatty": 854,
  "Silver Springs": 6024,
  "Stagecoach": 2760,
  "Smith Valley": 1643,
  "Wellington": 3194,
  "Kingsbury": 2723,
  "Stateline": 1051,
  "Zephyr Cove": 1623,
  "Round Hill Village": 2442,
  "Topaz Lake": 1326,
  "Genoa": 935,
  "Glenbrook": 251,
  "Overton": 1845,
  "Bunkerville": 1288,
  "Moapa": 995,
  "Indian Springs": 1029,
  "Searchlight": 539,
  "Goodsprings": 232,
  "Sandy Valley": 2653,
  "Blue Diamond": 282,
  "Mount Charleston": 354,
  "Rachel": 54,
  "Alamo": 1080,
  "Panaca": 963,
  "McGill": 1148,
  "Ruth": 296,
  "Lund": 207,
  "Nixon": 362,
  "Sutcliffe": 135,
  "Wadsworth": 790,
  "Empire": 217,
  "Gerlach": 206,
  "Crystal Bay": 278,
  "Verdi": 1415,
  "Nellis AFB": 10018,
  "Oasis": 100,
  "Owyhee": 1054,
  "Montello": 74,
  "McDermitt": 513,
  "Golconda": 200,
  "Unionville": 26,
  "Mina": 155,
  "Dyer": 259,
  "Silver Peak": 107
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
  "Bed and Breakfast", "Campground", "RV Park", "Marina", "Boat Dealer",
  "Golf Course", "Bowling Alley", "Movie Theater", "Arcade", "Bar",
  "Brewery", "Liquor Store", "Convenience Store", "Dollar Store", "Thrift Store",
  "Antique Store", "Furniture Store", "Appliance Store", "Electronics Store", "Clothing Boutique",
  "Shoe Store", "Jewelry Store", "Gift Shop", "Bookstore", "Toy Store",
  "Sporting Goods", "Outdoor Store", "Farm Supply", "Feed Store", "Tractor Dealer",
  "Casino", "Wedding Chapel", "Pool Service", "Desert Tours", "Off-Road Shop",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Nevada regions
const namePrefixes = [
  "Silver State", "Nevada", "Desert", "High Desert", "Sierra",
  "Heritage", "Valley", "Frontier", "Wild West", "Sagebrush",
  "Comstock", "Battle Born", "Mountain", "Basin", "Pioneer"
];

const nameSuffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Group", "Solutions"];

function generateSlug(name) {
  return name.toLowerCase()
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
      address: `${townName}, NV`,
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

for (const [town, county] of Object.entries(nevadaTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 500;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Nevada",
    state_abbr: "NV",
    county: county,
    population: population,
    slug: `${slug}-nv`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-nv.json`),
    JSON.stringify(townData, null, 2)
  );

  const mdContent = `---
title: "${town}, Nevada Business Directory"
slug: "${slug}-nv"
state: "NV"
county: "${county}"
population: ${population}
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-nv.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Nevada Business Directory"
slug: "nv"
state: "nv"
state_name: "Nevada"
---
`;
fs.writeFileSync(path.join(statesDir, 'nv.md'), stateMd);

console.log(`Created Nevada towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
