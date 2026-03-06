import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wyoming municipalities with their counties (all 23 counties represented)
const wyomingTowns = {
  // Albany County
  "Laramie": "Albany",
  "Centennial": "Albany",
  "Rock River": "Albany",

  // Big Horn County
  "Basin": "Big Horn",
  "Byron": "Big Horn",
  "Cowley": "Big Horn",
  "Deaver": "Big Horn",
  "Frannie": "Big Horn",
  "Greybull": "Big Horn",
  "Lovell": "Big Horn",
  "Manderson": "Big Horn",
  "Burlington": "Big Horn",

  // Campbell County
  "Gillette": "Campbell",
  "Wright": "Campbell",

  // Carbon County
  "Rawlins": "Carbon",
  "Baggs": "Carbon",
  "Dixon": "Carbon",
  "Elk Mountain": "Carbon",
  "Encampment": "Carbon",
  "Hanna": "Carbon",
  "Medicine Bow": "Carbon",
  "Riverside": "Carbon",
  "Saratoga": "Carbon",
  "Sinclair": "Carbon",

  // Converse County
  "Douglas": "Converse",
  "Glenrock": "Converse",
  "Rolling Hills": "Converse",

  // Crook County
  "Hulett": "Crook",
  "Moorcroft": "Crook",
  "Pine Haven": "Crook",
  "Sundance": "Crook",

  // Fremont County
  "Riverton": "Fremont",
  "Lander": "Fremont",
  "Dubois": "Fremont",
  "Hudson": "Fremont",
  "Pavillion": "Fremont",
  "Shoshoni": "Fremont",
  "Crowheart": "Fremont",
  "Fort Washakie": "Fremont",
  "Ethete": "Fremont",
  "Arapahoe": "Fremont",

  // Goshen County
  "Torrington": "Goshen",
  "Fort Laramie": "Goshen",
  "Lingle": "Goshen",
  "Yoder": "Goshen",
  "La Grange": "Goshen",
  "Hawk Springs": "Goshen",

  // Hot Springs County
  "Thermopolis": "Hot Springs",
  "East Thermopolis": "Hot Springs",
  "Kirby": "Hot Springs",

  // Johnson County
  "Buffalo": "Johnson",
  "Kaycee": "Johnson",

  // Laramie County
  "Cheyenne": "Laramie",
  "Albin": "Laramie",
  "Burns": "Laramie",
  "Carpenter": "Laramie",
  "Pine Bluffs": "Laramie",
  "Warren AFB": "Laramie",

  // Lincoln County
  "Afton": "Lincoln",
  "Alpine": "Lincoln",
  "Bedford": "Lincoln",
  "Cokeville": "Lincoln",
  "Diamondville": "Lincoln",
  "Etna": "Lincoln",
  "Fairview": "Lincoln",
  "Freedom": "Lincoln",
  "Grover": "Lincoln",
  "Kemmerer": "Lincoln",
  "La Barge": "Lincoln",
  "Opal": "Lincoln",
  "Smoot": "Lincoln",
  "Star Valley Ranch": "Lincoln",
  "Thayne": "Lincoln",

  // Natrona County
  "Casper": "Natrona",
  "Bar Nunn": "Natrona",
  "Edgerton": "Natrona",
  "Evansville": "Natrona",
  "Midwest": "Natrona",
  "Mills": "Natrona",
  "Mountain View": "Natrona",

  // Niobrara County
  "Lusk": "Niobrara",
  "Manville": "Niobrara",
  "Van Tassell": "Niobrara",

  // Park County
  "Cody": "Park",
  "Powell": "Park",
  "Meeteetse": "Park",
  "Ralston": "Park",
  "Clark": "Park",
  "Wapiti": "Park",

  // Platte County
  "Wheatland": "Platte",
  "Chugwater": "Platte",
  "Glendo": "Platte",
  "Guernsey": "Platte",
  "Hartville": "Platte",

  // Sheridan County
  "Sheridan": "Sheridan",
  "Dayton": "Sheridan",
  "Ranchester": "Sheridan",
  "Clearmont": "Sheridan",
  "Big Horn": "Sheridan",
  "Parkman": "Sheridan",
  "Story": "Sheridan",

  // Sublette County
  "Pinedale": "Sublette",
  "Big Piney": "Sublette",
  "Marbleton": "Sublette",
  "Boulder": "Sublette",
  "Bondurant": "Sublette",
  "Daniel": "Sublette",

  // Sweetwater County
  "Rock Springs": "Sweetwater",
  "Green River": "Sweetwater",
  "Granger": "Sweetwater",
  "Farson": "Sweetwater",
  "James Town": "Sweetwater",
  "Superior": "Sweetwater",
  "Wamsutter": "Sweetwater",
  "Point of Rocks": "Sweetwater",
  "Reliance": "Sweetwater",

  // Teton County
  "Jackson": "Teton",
  "Wilson": "Teton",
  "Teton Village": "Teton",
  "Alta": "Teton",
  "Kelly": "Teton",
  "Moose": "Teton",
  "Moran": "Teton",

  // Uinta County
  "Evanston": "Uinta",
  "Bear River": "Uinta",
  "Lyman": "Uinta",
  "Mountain View": "Uinta",
  "Bridger Valley": "Uinta",
  "Fort Bridger": "Uinta",

  // Washakie County
  "Worland": "Washakie",
  "Ten Sleep": "Washakie",

  // Weston County
  "Newcastle": "Weston",
  "Upton": "Weston",
  "Osage": "Weston",
  "Four Corners": "Weston"
};

// Population data for Wyoming municipalities
const populations = {
  "Cheyenne": 65132,
  "Casper": 58793,
  "Laramie": 32857,
  "Gillette": 33403,
  "Rock Springs": 23191,
  "Sheridan": 18437,
  "Green River": 11808,
  "Evanston": 11728,
  "Riverton": 11352,
  "Cody": 10114,
  "Lander": 7806,
  "Rawlins": 8734,
  "Jackson": 10585,
  "Torrington": 6675,
  "Powell": 6458,
  "Douglas": 6698,
  "Worland": 4925,
  "Buffalo": 4645,
  "Wheatland": 3627,
  "Newcastle": 3562,
  "Thermopolis": 2897,
  "Pinedale": 2030,
  "Lusk": 1567,
  "Sundance": 1268,
  "Kemmerer": 2514,
  "Afton": 1960,
  "Lovell": 2411,
  "Greybull": 1867,
  "Basin": 1285,
  "Saratoga": 1690,
  "Glenrock": 2554,
  "Dubois": 986,
  "Bar Nunn": 3025,
  "Evansville": 2891,
  "Mills": 3699,
  "Wright": 1849,
  "Moorcroft": 1101,
  "Hulett": 383,
  "Pine Haven": 591,
  "Dayton": 820,
  "Ranchester": 919,
  "Big Horn": 490,
  "Story": 859,
  "Hudson": 518,
  "Shoshoni": 649,
  "Meeteetse": 327,
  "Ten Sleep": 260,
  "Byron": 593,
  "Cowley": 655,
  "Deaver": 178,
  "Frannie": 157,
  "Manderson": 114,
  "Burlington": 292,
  "Hanna": 841,
  "Medicine Bow": 284,
  "Elk Mountain": 191,
  "Encampment": 443,
  "Riverside": 52,
  "Sinclair": 382,
  "Dixon": 72,
  "Baggs": 440,
  "Fort Laramie": 229,
  "Lingle": 468,
  "Yoder": 151,
  "La Grange": 448,
  "Hawk Springs": 72,
  "East Thermopolis": 274,
  "Kirby": 92,
  "Kaycee": 263,
  "Albin": 181,
  "Burns": 307,
  "Carpenter": 94,
  "Pine Bluffs": 1129,
  "Warren AFB": 2785,
  "Alpine": 828,
  "Bedford": 203,
  "Cokeville": 535,
  "Diamondville": 716,
  "Etna": 124,
  "Fairview": 82,
  "Freedom": 227,
  "Grover": 148,
  "La Barge": 431,
  "Opal": 95,
  "Smoot": 184,
  "Star Valley Ranch": 1802,
  "Thayne": 365,
  "Edgerton": 195,
  "Midwest": 392,
  "Manville": 95,
  "Van Tassell": 16,
  "Ralston": 235,
  "Clark": 116,
  "Wapiti": 255,
  "Chugwater": 190,
  "Glendo": 205,
  "Guernsey": 1147,
  "Hartville": 62,
  "Clearmont": 142,
  "Parkman": 179,
  "Big Piney": 552,
  "Marbleton": 1079,
  "Boulder": 61,
  "Bondurant": 96,
  "Daniel": 149,
  "Granger": 139,
  "Farson": 293,
  "James Town": 252,
  "Superior": 336,
  "Wamsutter": 451,
  "Point of Rocks": 45,
  "Reliance": 495,
  "Wilson": 1612,
  "Teton Village": 325,
  "Alta": 388,
  "Kelly": 148,
  "Moose": 219,
  "Moran": 68,
  "Bear River": 570,
  "Lyman": 2115,
  "Bridger Valley": 439,
  "Fort Bridger": 298,
  "Upton": 1100,
  "Osage": 207,
  "Four Corners": 247,
  "Rolling Hills": 463,
  "Rock River": 228,
  "Centennial": 270,
  "Crowheart": 145,
  "Fort Washakie": 1759,
  "Ethete": 1553,
  "Arapahoe": 1638,
  "Pavillion": 231
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
  "Ranch Supply", "Hunting Outfitter", "Fishing Shop", "Western Wear", "Saddle Shop",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Wyoming regions
const namePrefixes = [
  "Cowboy State", "Wyoming", "Frontier", "High Plains", "Mountain",
  "Yellowstone", "Grand Teton", "Western", "Pioneer", "Rocky Mountain",
  "Prairie", "Wind River", "Big Horn", "Powder River", "Heritage"
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
      address: `${townName}, WY`,
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

for (const [town, county] of Object.entries(wyomingTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 500;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Wyoming",
    state_abbr: "WY",
    county: county,
    population: population,
    slug: `${slug}-wy`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-wy.json`),
    JSON.stringify(townData, null, 2)
  );

  const mdContent = `---
title: "${town}, WY Business Directory"
type: "towns"
slug: "${slug}-wy"
state: "wy"
town_data: "${slug}-wy"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-wy.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Wyoming Business Directory"
slug: "wy"
state: "wy"
state_name: "Wyoming"
---
`;
fs.writeFileSync(path.join(statesDir, 'wy.md'), stateMd);

console.log(`Created Wyoming towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
