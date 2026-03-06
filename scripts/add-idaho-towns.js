import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Idaho municipalities with their counties
// Idaho has 44 counties and 200 incorporated cities
// Source: Idaho Secretary of State, US Census Bureau
const idahoTowns = {
  // Ada County
  "Boise": "Ada",
  "Eagle": "Ada",
  "Garden City": "Ada",
  "Kuna": "Ada",
  "Meridian": "Ada",
  "Star": "Ada",

  // Adams County
  "Council": "Adams",
  "New Meadows": "Adams",

  // Bannock County
  "Arimo": "Bannock",
  "Chubbuck": "Bannock",
  "Downey": "Bannock",
  "Inkom": "Bannock",
  "Lava Hot Springs": "Bannock",
  "McCammon": "Bannock",
  "Pocatello": "Bannock",

  // Bear Lake County
  "Bloomington": "Bear Lake",
  "Fish Haven": "Bear Lake",
  "Georgetown": "Bear Lake",
  "Montpelier": "Bear Lake",
  "Paris": "Bear Lake",
  "St. Charles": "Bear Lake",

  // Benewah County
  "Plummer": "Benewah",
  "St. Maries": "Benewah",
  "Tensed": "Benewah",

  // Bingham County
  "Aberdeen": "Bingham",
  "Atomic City": "Bingham",
  "Basalt": "Bingham",
  "Blackfoot": "Bingham",
  "Firth": "Bingham",
  "Shelley": "Bingham",

  // Blaine County
  "Bellevue": "Blaine",
  "Carey": "Blaine",
  "Hailey": "Blaine",
  "Ketchum": "Blaine",
  "Sun Valley": "Blaine",

  // Boise County
  "Crouch": "Boise",
  "Horseshoe Bend": "Boise",
  "Idaho City": "Boise",
  "Placerville": "Boise",

  // Bonner County
  "Clark Fork": "Bonner",
  "Dover": "Bonner",
  "East Hope": "Bonner",
  "Hope": "Bonner",
  "Kootenai": "Bonner",
  "Oldtown": "Bonner",
  "Ponderay": "Bonner",
  "Priest River": "Bonner",
  "Sandpoint": "Bonner",

  // Bonneville County
  "Ammon": "Bonneville",
  "Idaho Falls": "Bonneville",
  "Iona": "Bonneville",
  "Irwin": "Bonneville",
  "Swan Valley": "Bonneville",
  "Ucon": "Bonneville",

  // Boundary County
  "Bonners Ferry": "Boundary",
  "Moyie Springs": "Boundary",

  // Butte County
  "Arco": "Butte",
  "Butte City": "Butte",
  "Moore": "Butte",

  // Camas County
  "Fairfield": "Camas",

  // Canyon County
  "Caldwell": "Canyon",
  "Greenleaf": "Canyon",
  "Melba": "Canyon",
  "Middleton": "Canyon",
  "Nampa": "Canyon",
  "Notus": "Canyon",
  "Parma": "Canyon",
  "Wilder": "Canyon",

  // Caribou County
  "Bancroft": "Caribou",
  "Grace": "Caribou",
  "Soda Springs": "Caribou",

  // Cassia County
  "Albion": "Cassia",
  "Burley": "Cassia",
  "Declo": "Cassia",
  "Malta": "Cassia",
  "Oakley": "Cassia",

  // Clark County
  "Dubois": "Clark",
  "Spencer": "Clark",

  // Clearwater County
  "Elk River": "Clearwater",
  "Orofino": "Clearwater",
  "Pierce": "Clearwater",
  "Weippe": "Clearwater",

  // Custer County
  "Challis": "Custer",
  "Clayton": "Custer",
  "Mackay": "Custer",
  "Stanley": "Custer",

  // Elmore County
  "Glenns Ferry": "Elmore",
  "Mountain Home": "Elmore",

  // Franklin County
  "Clifton": "Franklin",
  "Dayton": "Franklin",
  "Franklin": "Franklin",
  "Oxford": "Franklin",
  "Preston": "Franklin",
  "Weston": "Franklin",

  // Fremont County
  "Ashton": "Fremont",
  "Drummond": "Fremont",
  "Island Park": "Fremont",
  "Newdale": "Fremont",
  "Parker": "Fremont",
  "St. Anthony": "Fremont",
  "Teton": "Fremont",
  "Warm River": "Fremont",

  // Gem County
  "Emmett": "Gem",
  "Letha": "Gem",

  // Gooding County
  "Bliss": "Gooding",
  "Gooding": "Gooding",
  "Hagerman": "Gooding",
  "Wendell": "Gooding",

  // Idaho County
  "Cottonwood": "Idaho",
  "Ferdinand": "Idaho",
  "Grangeville": "Idaho",
  "Kooskia": "Idaho",
  "Riggins": "Idaho",
  "Stites": "Idaho",
  "White Bird": "Idaho",

  // Jefferson County
  "Lewisville": "Jefferson",
  "Menan": "Jefferson",
  "Mud Lake": "Jefferson",
  "Rigby": "Jefferson",
  "Roberts": "Jefferson",
  "Ririe": "Jefferson",

  // Jerome County
  "Eden": "Jerome",
  "Hazelton": "Jerome",
  "Jerome": "Jerome",

  // Kootenai County
  "Athol": "Kootenai",
  "Coeur d'Alene": "Kootenai",
  "Dalton Gardens": "Kootenai",
  "Fernan Lake Village": "Kootenai",
  "Harrison": "Kootenai",
  "Hauser": "Kootenai",
  "Hayden": "Kootenai",
  "Hayden Lake": "Kootenai",
  "Huetter": "Kootenai",
  "Post Falls": "Kootenai",
  "Rathdrum": "Kootenai",
  "Spirit Lake": "Kootenai",
  "State Line": "Kootenai",
  "Worley": "Kootenai",

  // Latah County
  "Bovill": "Latah",
  "Deary": "Latah",
  "Genesee": "Latah",
  "Juliaetta": "Latah",
  "Kendrick": "Latah",
  "Moscow": "Latah",
  "Onaway": "Latah",
  "Potlatch": "Latah",
  "Troy": "Latah",

  // Lemhi County
  "Leadore": "Lemhi",
  "Salmon": "Lemhi",
  "Tendoy": "Lemhi",

  // Lewis County
  "Craigmont": "Lewis",
  "Kamiah": "Lewis",
  "Nezperce": "Lewis",
  "Reubens": "Lewis",
  "Winchester": "Lewis",

  // Lincoln County
  "Dietrich": "Lincoln",
  "Richfield": "Lincoln",
  "Shoshone": "Lincoln",

  // Madison County
  "Rexburg": "Madison",
  "Sugar City": "Madison",

  // Minidoka County
  "Acequia": "Minidoka",
  "Heyburn": "Minidoka",
  "Minidoka": "Minidoka",
  "Paul": "Minidoka",
  "Rupert": "Minidoka",

  // Nez Perce County
  "Culdesac": "Nez Perce",
  "Lapwai": "Nez Perce",
  "Lewiston": "Nez Perce",
  "Peck": "Nez Perce",

  // Oneida County
  "Malad City": "Oneida",

  // Owyhee County
  "Grand View": "Owyhee",
  "Homedale": "Owyhee",
  "Marsing": "Owyhee",

  // Payette County
  "Fruitland": "Payette",
  "New Plymouth": "Payette",
  "Payette": "Payette",

  // Power County
  "American Falls": "Power",
  "Rockland": "Power",

  // Shoshone County
  "Kellogg": "Shoshone",
  "Mullan": "Shoshone",
  "Osburn": "Shoshone",
  "Pinehurst": "Shoshone",
  "Smelterville": "Shoshone",
  "Wallace": "Shoshone",
  "Wardner": "Shoshone",

  // Teton County
  "Driggs": "Teton",
  "Tetonia": "Teton",
  "Victor": "Teton",

  // Twin Falls County
  "Buhl": "Twin Falls",
  "Castleford": "Twin Falls",
  "Filer": "Twin Falls",
  "Hansen": "Twin Falls",
  "Hollister": "Twin Falls",
  "Kimberly": "Twin Falls",
  "Murtaugh": "Twin Falls",
  "Twin Falls": "Twin Falls",

  // Valley County
  "Cascade": "Valley",
  "Donnelly": "Valley",
  "McCall": "Valley",

  // Washington County
  "Cambridge": "Washington",
  "Midvale": "Washington",
  "Weiser": "Washington"
};

// Populations for Idaho communities
const populations = {
  "Boise": 235684,
  "Meridian": 117635,
  "Nampa": 100200,
  "Idaho Falls": 64597,
  "Caldwell": 59338,
  "Pocatello": 56320,
  "Coeur d'Alene": 54628,
  "Twin Falls": 51807,
  "Post Falls": 38401,
  "Lewiston": 34302,
  "Rexburg": 35438,
  "Eagle": 31367,
  "Kuna": 26720,
  "Moscow": 26090,
  "Ammon": 20227,
  "Chubbuck": 15696,
  "Mountain Home": 14802,
  "Hayden": 17152,
  "Blackfoot": 12297,
  "Garden City": 12308,
  "Burley": 11178,
  "Jerome": 13134,
  "Sandpoint": 9004,
  "Star": 12755,
  "Rathdrum": 10254,
  "Hailey": 9394,
  "Middleton": 10116,
  "Emmett": 7371,
  "Ketchum": 3003,
  "Payette": 7655,
  "Rupert": 5954,
  "Preston": 5592,
  "Fruitland": 5673,
  "Weiser": 5438,
  "Shelley": 5050,
  "Gooding": 3567,
  "Buhl": 4473,
  "Salmon": 3112,
  "Grangeville": 3141,
  "St. Anthony": 3542,
  "Orofino": 3082,
  "Soda Springs": 2989,
  "American Falls": 4559,
  "Kellogg": 2052,
  "Montpelier": 2597,
  "Bonners Ferry": 2655,
  "Filer": 2828,
  "Kimberly": 4011,
  "McCall": 3485,
  "Sun Valley": 1570,
  "Priest River": 1932,
  "Driggs": 2116,
  "Rigby": 4366,
  "Malad City": 2091,
  "Spirit Lake": 2494,
  "Ashton": 1107,
  "Victor": 2598,
  "Parma": 2113,
  "Homedale": 2633,
  "Challis": 1081,
  "Wallace": 784,
  "Arco": 879,
  "Glenns Ferry": 1260,
  "Cascade": 1049,
  "New Plymouth": 1679,
  "Aberdeen": 2022,
  "Wendell": 3151,
  "Kamiah": 1295,
  "Paul": 1275,
  "Heyburn": 3446,
  "Bellevue": 2593,
  "Marsing": 1220,
  "Cottonwood": 944,
  "Genesee": 964,
  "Grace": 905,
  "Mackay": 517,
  "Troy": 962,
  "Plummer": 1044,
  "St. Maries": 2587,
  "Wilder": 1902,
  "Oakley": 781,
  "Sugar City": 1514,
  "Greenleaf": 862,
  "Declo": 313,
  "Lapwai": 1137,
  "Council": 839,
  "Horseshoe Bend": 1123,
  "Potlatch": 826,
  "Hagerman": 903,
  "Nezperce": 483,
  "Craigmont": 501,
  "Idaho City": 485,
  "Pierce": 508,
  "Deary": 501,
  "Carey": 604,
  "Dubois": 672,
  "Shoshone": 1557,
  "Richfield": 531,
  "Tetonia": 283,
  "Donnelly": 152,
  "Stanley": 63,
  "Athol": 748,
  "Hayden Lake": 675,
  "Dalton Gardens": 2540,
  "Fernan Lake Village": 199,
  "Harrison": 203,
  "Hauser": 980,
  "Huetter": 145,
  "State Line": 66,
  "Worley": 257,
  "Ponderay": 1274,
  "Hope": 86,
  "East Hope": 216,
  "Clark Fork": 536,
  "Dover": 612,
  "Kootenai": 862,
  "Oldtown": 191,
  "Moyie Springs": 867,
  "Osburn": 1545,
  "Pinehurst": 1624,
  "Mullan": 688,
  "Smelterville": 625,
  "Wardner": 186,
  "Menan": 856,
  "Lewisville": 521,
  "Mud Lake": 312,
  "Roberts": 749,
  "Ririe": 704,
  "Iona": 2750,
  "Ucon": 1179,
  "Irwin": 195,
  "Swan Valley": 204,
  "Arimo": 327,
  "Downey": 622,
  "Inkom": 927,
  "Lava Hot Springs": 406,
  "McCammon": 807,
  "Bloomington": 250,
  "Fish Haven": 77,
  "Georgetown": 504,
  "Paris": 524,
  "St. Charles": 131,
  "Tensed": 93,
  "Firth": 534,
  "Atomic City": 29,
  "Basalt": 419,
  "Crouch": 259,
  "Placerville": 52,
  "Bancroft": 376,
  "Albion": 294,
  "Malta": 206,
  "Spencer": 34,
  "Elk River": 125,
  "Weippe": 350,
  "Clayton": 7,
  "Leadore": 70,
  "Tendoy": 55,
  "Reubens": 58,
  "Winchester": 291,
  "Dietrich": 324,
  "Acequia": 113,
  "Minidoka": 132,
  "Culdesac": 386,
  "Peck": 184,
  "Grand View": 472,
  "Rockland": 279,
  "Castleford": 207,
  "Hansen": 1220,
  "Hollister": 251,
  "Murtaugh": 137,
  "Cambridge": 328,
  "Midvale": 175,
  "Bliss": 318,
  "Eden": 428,
  "Hazelton": 753,
  "Ferdinand": 157,
  "Kooskia": 607,
  "Riggins": 419,
  "Stites": 210,
  "White Bird": 106,
  "Bovill": 261,
  "Juliaetta": 577,
  "Kendrick": 336,
  "Onaway": 95,
  "Clifton": 257,
  "Dayton": 463,
  "Franklin": 679,
  "Oxford": 59,
  "Weston": 409,
  "Drummond": 27,
  "Island Park": 286,
  "Newdale": 358,
  "Parker": 396,
  "Teton": 767,
  "Warm River": 3,
  "Letha": 10,
  "New Meadows": 496,
  "Melba": 676,
  "Notus": 547
};

// Business categories for Idaho
const businessCategories = [
  "Restaurant", "Steakhouse", "BBQ", "Cafe", "Coffee Shop", "Bakery",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "Hardware Store", "Farm Supply",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian", "Chiropractor",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym",
  "Pet Store", "Florist", "Pizza", "Fast Food",
  "Hotel", "Motel", "Bed & Breakfast", "Ski Resort", "Outfitter",
  "Outdoor Store", "Fishing Shop", "Hunting Store", "Rafting Tours",
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
    const prefixes = [townName, "Idaho", "Gem State", "Mountain", "Valley", "River", "Northwest"];
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

for (const [townName, county] of Object.entries(idahoTowns)) {
  const slug = slugify(townName) + '-id';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 1000) + 100;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 100000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "ID");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Idaho",
    state_abbr: "ID",
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
title: "${townName}, ID Business Directory"
type: "towns"
slug: "${slug}"
state: "id"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Idaho Business Directory"
slug: "id"
state: "id"
state_name: "Idaho"
---
`;
fs.writeFileSync(path.join(statesDir, 'id.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
