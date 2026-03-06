import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Montana municipalities with their counties
const montanaTowns = {
  "Absarokee": "Stillwater",
  "Alberton": "Mineral",
  "Alder": "Madison",
  "Anaconda": "Deer Lodge",
  "Antelope": "Sheridan",
  "Arlee": "Lake",
  "Ashland": "Rosebud",
  "Augusta": "Lewis and Clark",
  "Avon": "Powell",
  "Bainville": "Roosevelt",
  "Baker": "Fallon",
  "Ballantine": "Yellowstone",
  "Basin": "Jefferson",
  "Bearcreek": "Carbon",
  "Belfry": "Carbon",
  "Belgrade": "Gallatin",
  "Belt": "Cascade",
  "Big Arm": "Lake",
  "Big Sandy": "Chouteau",
  "Big Sky": "Gallatin",
  "Big Timber": "Sweet Grass",
  "Bigfork": "Flathead",
  "Billings": "Yellowstone",
  "Black Eagle": "Cascade",
  "Bonner-West Riverside": "Missoula",
  "Boulder": "Jefferson",
  "Box Elder": "Hill",
  "Boyd": "Carbon",
  "Bozeman": "Gallatin",
  "Brady": "Pondera",
  "Bridger": "Carbon",
  "Broadus": "Powder River",
  "Broadview": "Yellowstone",
  "Brockton": "Roosevelt",
  "Browning": "Glacier",
  "Busby": "Big Horn",
  "Butte": "Silver Bow",
  "Bynum": "Teton",
  "Camas": "Sanders",
  "Cardwell": "Jefferson",
  "Carlin": "Chouteau",
  "Cascade": "Cascade",
  "Centerville": "Butte-Silver Bow",
  "Chester": "Liberty",
  "Chinook": "Blaine",
  "Choteau": "Teton",
  "Circle": "McCone",
  "Clancy": "Jefferson",
  "Clinton": "Missoula",
  "Clyde Park": "Park",
  "Coburg": "Powell",
  "Cohagen": "Garfield",
  "Colstrip": "Rosebud",
  "Columbia Falls": "Flathead",
  "Columbus": "Stillwater",
  "Condon": "Missoula",
  "Conrad": "Pondera",
  "Cooke City": "Park",
  "Coram": "Flathead",
  "Corvallis": "Ravalli",
  "Crow Agency": "Big Horn",
  "Culbertson": "Roosevelt",
  "Custer": "Yellowstone",
  "Cut Bank": "Glacier",
  "Darby": "Ravalli",
  "Dayton": "Lake",
  "Deer Lodge": "Powell",
  "Dell": "Beaverhead",
  "Denton": "Fergus",
  "Dillon": "Beaverhead",
  "Dodson": "Phillips",
  "Drummond": "Granite",
  "Dupuyer": "Pondera",
  "Dutton": "Teton",
  "East Glacier Park": "Glacier",
  "East Helena": "Lewis and Clark",
  "East Missoula": "Missoula",
  "Edgar": "Carbon",
  "Ekalaka": "Carter",
  "Elliston": "Powell",
  "Emigrant": "Park",
  "Ennis": "Madison",
  "Eureka": "Lincoln",
  "Evergreen": "Flathead",
  "Fairfield": "Teton",
  "Fairview": "Richland",
  "Fallon": "Prairie",
  "Finley Point": "Lake",
  "Fishtail": "Stillwater",
  "Flaxville": "Daniels",
  "Florence": "Ravalli",
  "Forsyth": "Rosebud",
  "Fort Benton": "Chouteau",
  "Fort Peck": "Valley",
  "Fort Shaw": "Cascade",
  "Four Corners": "Gallatin",
  "Frazer": "Valley",
  "Frenchtown": "Missoula",
  "Froid": "Roosevelt",
  "Fromberg": "Carbon",
  "Gallatin Gateway": "Gallatin",
  "Gardiner": "Park",
  "Garrison": "Powell",
  "Geraldine": "Chouteau",
  "Geyser": "Judith Basin",
  "Gildford": "Hill",
  "Glasgow": "Valley",
  "Glendive": "Dawson",
  "Gold Creek": "Powell",
  "Grantsdale": "Ravalli",
  "Grass Range": "Fergus",
  "Great Falls": "Cascade",
  "Greycliff": "Sweet Grass",
  "Hamilton": "Ravalli",
  "Hardin": "Big Horn",
  "Harlem": "Blaine",
  "Harlowton": "Wheatland",
  "Harrison": "Madison",
  "Havre": "Hill",
  "Heart Butte": "Pondera",
  "Heath": "Fergus",
  "Helena": "Lewis and Clark",
  "Helena Flats": "Flathead",
  "Helena Valley Northeast": "Lewis and Clark",
  "Helena Valley Northwest": "Lewis and Clark",
  "Helena Valley Southeast": "Lewis and Clark",
  "Helena Valley West Central": "Lewis and Clark",
  "Helmville": "Powell",
  "Heron": "Sanders",
  "Highwood": "Chouteau",
  "Hilger": "Fergus",
  "Hingham": "Hill",
  "Hinsdale": "Valley",
  "Hobson": "Judith Basin",
  "Hot Springs": "Sanders",
  "Hungry Horse": "Flathead",
  "Huntley": "Yellowstone",
  "Huson": "Missoula",
  "Hysham": "Treasure",
  "Inverness": "Hill",
  "Ismay": "Custer",
  "Joplin": "Liberty",
  "Jordan": "Garfield",
  "Judith Gap": "Wheatland",
  "Kalispell": "Flathead",
  "Kremlin": "Hill",
  "Lakeside": "Flathead",
  "Lame Deer": "Rosebud",
  "Larslan": "Valley",
  "Laurel": "Yellowstone",
  "Lavina": "Golden Valley",
  "Ledger": "Pondera",
  "Lewistown": "Fergus",
  "Libby": "Lincoln",
  "Lima": "Beaverhead",
  "Lincoln": "Lewis and Clark",
  "Lindsay": "Dawson",
  "Livingston": "Park",
  "Lockwood": "Yellowstone",
  "Lodge Grass": "Big Horn",
  "Lolo": "Missoula",
  "Loma": "Chouteau",
  "Lonepine": "Sanders",
  "Malmstrom AFB": "Cascade",
  "Malta": "Phillips",
  "Manhattan": "Gallatin",
  "Marion": "Flathead",
  "Martin City": "Flathead",
  "Marysville": "Lewis and Clark",
  "Mc Allister": "Madison",
  "Mc Leod": "Sweet Grass",
  "Medicine Lake": "Sheridan",
  "Melrose": "Silver Bow",
  "Melstone": "Musselshell",
  "Miles City": "Custer",
  "Milltown": "Missoula",
  "Missoula": "Missoula",
  "Moccasin": "Judith Basin",
  "Montana City": "Jefferson",
  "Moore": "Fergus",
  "Nashua": "Valley",
  "Neihart": "Cascade",
  "Norris": "Madison",
  "North Browning": "Glacier",
  "Noxon": "Sanders",
  "Nye": "Stillwater",
  "Oilmont": "Toole",
  "Olney": "Flathead",
  "Opheim": "Valley",
  "Orchard Homes": "Missoula",
  "Outlook": "Sheridan",
  "Ovando": "Powell",
  "Pablo": "Lake",
  "Paradise": "Sanders",
  "Park City": "Stillwater",
  "Peerless": "Daniels",
  "Pendroy": "Teton",
  "Philipsburg": "Granite",
  "Pinesdale": "Ravalli",
  "Plains": "Sanders",
  "Plentywood": "Sheridan",
  "Plevna": "Fallon",
  "Polaris": "Beaverhead",
  "Polson": "Lake",
  "Pompeys Pillar": "Yellowstone",
  "Pony": "Madison",
  "Poplar": "Roosevelt",
  "Power": "Teton",
  "Pray": "Park",
  "Pryor": "Big Horn",
  "Radersburg": "Broadwater",
  "Ramsay": "Butte-Silver Bow",
  "Ravalli": "Lake",
  "Red Lodge": "Carbon",
  "Reed Point": "Stillwater",
  "Reserve": "Sheridan",
  "Richey": "Dawson",
  "Rimini": "Lewis and Clark",
  "Roberts": "Carbon",
  "Rocker": "Silver Bow",
  "Rollins": "Lake",
  "Ronan": "Lake",
  "Roscoe": "Carbon",
  "Rosebud": "Rosebud",
  "Roundup": "Musselshell",
  "Roy": "Fergus",
  "Rudyard": "Hill",
  "Ryegate": "Golden Valley",
  "Saco": "Phillips",
  "Saint Ignatius": "Lake",
  "Saint Marie": "Valley",
  "Saint Regis": "Mineral",
  "Saint Xavier": "Big Horn",
  "Sand Coulee": "Cascade",
  "Sanders": "Treasure",
  "Savage": "Richland",
  "Scobey": "Daniels",
  "Seeley Lake": "Missoula",
  "Shawmut": "Wheatland",
  "Shelby": "Toole",
  "Shepherd": "Yellowstone",
  "Sheridan": "Madison",
  "Sidney": "Richland",
  "Silver Gate": "Park",
  "Simms": "Cascade",
  "Somers": "Flathead",
  "South Browning": "Glacier",
  "Spring Hill": "Gallatin",
  "Stanford": "Judith Basin",
  "Stevensville": "Ravalli",
  "Stockett": "Cascade",
  "Sula": "Ravalli",
  "Sumatra": "Rosebud",
  "Sun Prairie": "Chouteau",
  "Sun River": "Cascade",
  "Sunburst": "Toole",
  "Superior": "Mineral",
  "Swan Lake": "Lake",
  "Sweet Grass": "Toole",
  "Tampico": "Valley",
  "Terry": "Prairie",
  "Thompson Falls": "Sanders",
  "Three Forks": "Gallatin",
  "Toston": "Broadwater",
  "Townsend": "Broadwater",
  "Trout Creek": "Sanders",
  "Troy": "Lincoln",
  "Turner": "Blaine",
  "Twin Bridges": "Madison",
  "Ulm": "Cascade",
  "Utica": "Judith Basin",
  "Valier": "Pondera",
  "Vandalia": "Valley",
  "Vaughn": "Cascade",
  "Victor": "Ravalli",
  "Virginia City": "Madison",
  "Walkerville": "Butte-Silver Bow",
  "Warm Springs": "Deer Lodge",
  "West Glacier": "Flathead",
  "West Glendive": "Dawson",
  "West Yellowstone": "Gallatin",
  "Westby": "Sheridan",
  "White Sulphur Springs": "Meagher",
  "Whitefish": "Flathead",
  "Whitehall": "Jefferson",
  "Whitetail": "Daniels",
  "Wibaux": "Wibaux",
  "Willow Creek": "Gallatin",
  "Wilsall": "Park",
  "Windham": "Judith Basin",
  "Winnett": "Petroleum",
  "Wisdom": "Beaverhead",
  "Wise River": "Beaverhead",
  "Wolf Creek": "Lewis and Clark",
  "Wolf Point": "Roosevelt",
  "Woods Bay": "Lake",
  "Worden": "Yellowstone",
  "Wyola": "Big Horn",
  "Zurich": "Blaine"
};

// Population data for Montana municipalities
const populations = {
  "Billings": 117116,
  "Missoula": 75516,
  "Great Falls": 60442,
  "Bozeman": 53293,
  "Butte": 34494,
  "Helena": 32091,
  "Kalispell": 26884,
  "Havre": 9846,
  "Anaconda": 9153,
  "Miles City": 8478,
  "Belgrade": 11370,
  "Livingston": 8370,
  "Laurel": 7282,
  "Whitefish": 8032,
  "Lewistown": 5813,
  "Sidney": 6844,
  "Glendive": 4935,
  "Columbia Falls": 5639,
  "Polson": 5149,
  "Dillon": 4257,
  "Hamilton": 4827,
  "Cut Bank": 2869,
  "Libby": 2758,
  "Conrad": 2570,
  "Hardin": 3818,
  "Shelby": 3216,
  "Deer Lodge": 2879,
  "Glasgow": 3364,
  "Colstrip": 2123,
  "Wolf Point": 2621,
  "Ronan": 2076,
  "Malta": 1896,
  "Forsyth": 1777,
  "Red Lodge": 2278,
  "Plentywood": 1718,
  "Stevensville": 2038,
  "East Helena": 2070,
  "Baker": 1737,
  "Chinook": 1203,
  "Three Forks": 2035,
  "Big Timber": 1716,
  "Choteau": 1721,
  "Roundup": 1788,
  "Boulder": 1183,
  "Eureka": 1517,
  "Thompson Falls": 1313,
  "Fort Benton": 1449,
  "White Sulphur Springs": 939,
  "Scobey": 1020,
  "Townsend": 2003,
  "Superior": 812,
  "Philipsburg": 820,
  "Hot Springs": 559,
  "Plains": 1048,
  "Manhattan": 2079,
  "Harlowton": 997,
  "Troy": 1016,
  "Twin Bridges": 375,
  "Ennis": 984,
  "West Yellowstone": 1353,
  "Big Sky": 3591,
  "Fairfield": 708,
  "Fairview": 840,
  "Culbertson": 714,
  "Stanford": 401,
  "Circle": 615,
  "Jordan": 343,
  "Terry": 605,
  "Ekalaka": 332,
  "Broadus": 462,
  "Wibaux": 589,
  "Augusta": 310,
  "Lincoln": 1038,
  "Seeley Lake": 1659,
  "Bigfork": 4875,
  "Corvallis": 972,
  "Darby": 754,
  "Florence": 804,
  "Victor": 778,
  "Frenchtown": 1900,
  "Lolo": 4015,
  "Orchard Homes": 5621,
  "Four Corners": 4690,
  "Lockwood": 8888,
  "Helena Valley West Central": 7883,
  "Evergreen": 8407,
  "Bonner-West Riverside": 1903,
  "East Missoula": 2485,
  "South Browning": 1034,
  "Browning": 1016,
  "Poplar": 806,
  "Box Elder": 113,
  "Heart Butte": 580,
  "Lame Deer": 2052,
  "Crow Agency": 1616,
  "Lodge Grass": 428,
  "Pryor": 628,
  "Saint Ignatius": 843,
  "Pablo": 2325,
  "Arlee": 778,
  "Valier": 509,
  "Dutton": 320,
  "Power": 179,
  "Brady": 144,
  "Cascade": 694,
  "Belt": 633,
  "Simms": 337,
  "Ulm": 738,
  "Black Eagle": 994,
  "Sun River": 413,
  "Vaughn": 586,
  "Neihart": 51,
  "Stockett": 203,
  "Sand Coulee": 192
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
  "Steakhouse", "Hunting Outfitter", "Fly Fishing Shop", "Ski Shop", "Ranch Supply",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Montana regions
const namePrefixes = [
  "Big Sky", "Montana", "Treasure State", "Mountain", "Rocky",
  "Heritage", "Prairie", "Glacier", "Yellowstone", "Western",
  "Pioneer", "Frontier", "Gold Rush", "Big Horn", "Lewis & Clark"
];

const nameSuffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Group", "Solutions"];

function generateSlug(name) {
  return name.toLowerCase()
    .replace(/\./g, '')
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
      address: `${townName}, MT`,
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

for (const [town, county] of Object.entries(montanaTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 500;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Montana",
    state_abbr: "MT",
    county: county,
    population: population,
    slug: `${slug}-mt`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-mt.json`),
    JSON.stringify(townData, null, 2)
  );

  const mdContent = `---
title: "${town}, Montana Business Directory"
slug: "${slug}-mt"
state: "MT"
county: "${county}"
population: ${population}
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-mt.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Montana Business Directory"
slug: "mt"
state: "mt"
state_name: "Montana"
---
`;
fs.writeFileSync(path.join(statesDir, 'mt.md'), stateMd);

console.log(`Created Montana towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
