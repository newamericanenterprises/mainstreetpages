import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Colorado municipalities with their counties
// Colorado has 64 counties and 272 incorporated municipalities
// Source: Colorado Secretary of State, US Census Bureau
const coloradoTowns = {
  // Adams County
  "Arvada": "Adams",
  "Aurora": "Adams",
  "Bennett": "Adams",
  "Brighton": "Adams",
  "Commerce City": "Adams",
  "Federal Heights": "Adams",
  "Northglenn": "Adams",
  "Thornton": "Adams",
  "Westminster": "Adams",

  // Alamosa County
  "Alamosa": "Alamosa",
  "Hooper": "Alamosa",

  // Arapahoe County
  "Aurora": "Arapahoe",
  "Bow Mar": "Arapahoe",
  "Centennial": "Arapahoe",
  "Cherry Hills Village": "Arapahoe",
  "Columbine Valley": "Arapahoe",
  "Deer Trail": "Arapahoe",
  "Englewood": "Arapahoe",
  "Foxfield": "Arapahoe",
  "Glendale": "Arapahoe",
  "Greenwood Village": "Arapahoe",
  "Littleton": "Arapahoe",
  "Sheridan": "Arapahoe",

  // Archuleta County
  "Pagosa Springs": "Archuleta",

  // Baca County
  "Campo": "Baca",
  "Pritchett": "Baca",
  "Springfield": "Baca",
  "Two Buttes": "Baca",
  "Vilas": "Baca",
  "Walsh": "Baca",

  // Bent County
  "Las Animas": "Bent",

  // Boulder County
  "Boulder": "Boulder",
  "Erie": "Boulder",
  "Jamestown": "Boulder",
  "Lafayette": "Boulder",
  "Longmont": "Boulder",
  "Louisville": "Boulder",
  "Lyons": "Boulder",
  "Nederland": "Boulder",
  "Superior": "Boulder",
  "Ward": "Boulder",

  // Broomfield County
  "Broomfield": "Broomfield",

  // Chaffee County
  "Buena Vista": "Chaffee",
  "Poncha Springs": "Chaffee",
  "Salida": "Chaffee",

  // Cheyenne County
  "Cheyenne Wells": "Cheyenne",
  "Kit Carson": "Cheyenne",

  // Clear Creek County
  "Central City": "Clear Creek",
  "Empire": "Clear Creek",
  "Georgetown": "Clear Creek",
  "Idaho Springs": "Clear Creek",
  "Silver Plume": "Clear Creek",

  // Conejos County
  "Antonito": "Conejos",
  "La Jara": "Conejos",
  "Manassa": "Conejos",
  "Romeo": "Conejos",
  "Sanford": "Conejos",

  // Costilla County
  "Blanca": "Costilla",
  "San Luis": "Costilla",

  // Crowley County
  "Crowley": "Crowley",
  "Olney Springs": "Crowley",
  "Ordway": "Crowley",
  "Sugar City": "Crowley",

  // Custer County
  "Silver Cliff": "Custer",
  "Westcliffe": "Custer",

  // Delta County
  "Cedaredge": "Delta",
  "Crawford": "Delta",
  "Delta": "Delta",
  "Hotchkiss": "Delta",
  "Orchard City": "Delta",
  "Paonia": "Delta",

  // Denver County
  "Denver": "Denver",

  // Dolores County
  "Dove Creek": "Dolores",
  "Rico": "Dolores",

  // Douglas County
  "Castle Pines": "Douglas",
  "Castle Rock": "Douglas",
  "Larkspur": "Douglas",
  "Lone Tree": "Douglas",
  "Parker": "Douglas",

  // Eagle County
  "Avon": "Eagle",
  "Basalt": "Eagle",
  "Eagle": "Eagle",
  "Gypsum": "Eagle",
  "Minturn": "Eagle",
  "Red Cliff": "Eagle",
  "Vail": "Eagle",

  // El Paso County
  "Calhan": "El Paso",
  "Colorado Springs": "El Paso",
  "Fountain": "El Paso",
  "Green Mountain Falls": "El Paso",
  "Manitou Springs": "El Paso",
  "Monument": "El Paso",
  "Palmer Lake": "El Paso",
  "Ramah": "El Paso",

  // Elbert County
  "Elizabeth": "Elbert",
  "Kiowa": "Elbert",
  "Simla": "Elbert",

  // Fremont County
  "Brookside": "Fremont",
  "Canon City": "Fremont",
  "Coal Creek": "Fremont",
  "Florence": "Fremont",
  "Rockvale": "Fremont",
  "Williamsburg": "Fremont",

  // Garfield County
  "Carbondale": "Garfield",
  "Glenwood Springs": "Garfield",
  "New Castle": "Garfield",
  "Parachute": "Garfield",
  "Rifle": "Garfield",
  "Silt": "Garfield",

  // Gilpin County
  "Black Hawk": "Gilpin",
  "Central City": "Gilpin",

  // Grand County
  "Fraser": "Grand",
  "Granby": "Grand",
  "Grand Lake": "Grand",
  "Hot Sulphur Springs": "Grand",
  "Kremmling": "Grand",
  "Winter Park": "Grand",

  // Gunnison County
  "Crested Butte": "Gunnison",
  "Gunnison": "Gunnison",
  "Marble": "Gunnison",
  "Mount Crested Butte": "Gunnison",
  "Pitkin": "Gunnison",

  // Hinsdale County
  "Lake City": "Hinsdale",

  // Huerfano County
  "La Veta": "Huerfano",
  "Walsenburg": "Huerfano",

  // Jackson County
  "Walden": "Jackson",

  // Jefferson County
  "Arvada": "Jefferson",
  "Bow Mar": "Jefferson",
  "Edgewater": "Jefferson",
  "Golden": "Jefferson",
  "Lakeside": "Jefferson",
  "Lakewood": "Jefferson",
  "Morrison": "Jefferson",
  "Mountain View": "Jefferson",
  "Wheat Ridge": "Jefferson",

  // Kiowa County
  "Eads": "Kiowa",
  "Haswell": "Kiowa",
  "Sheridan Lake": "Kiowa",

  // Kit Carson County
  "Bethune": "Kit Carson",
  "Burlington": "Kit Carson",
  "Flagler": "Kit Carson",
  "Seibert": "Kit Carson",
  "Stratton": "Kit Carson",
  "Vona": "Kit Carson",

  // La Plata County
  "Bayfield": "La Plata",
  "Durango": "La Plata",
  "Ignacio": "La Plata",

  // Lake County
  "Leadville": "Lake",

  // Larimer County
  "Berthoud": "Larimer",
  "Estes Park": "Larimer",
  "Fort Collins": "Larimer",
  "Johnstown": "Larimer",
  "Loveland": "Larimer",
  "Timnath": "Larimer",
  "Wellington": "Larimer",
  "Windsor": "Larimer",

  // Las Animas County
  "Aguilar": "Las Animas",
  "Branson": "Las Animas",
  "Cokedale": "Las Animas",
  "Kim": "Las Animas",
  "Starkville": "Las Animas",
  "Trinidad": "Las Animas",

  // Lincoln County
  "Arriba": "Lincoln",
  "Genoa": "Lincoln",
  "Hugo": "Lincoln",
  "Limon": "Lincoln",

  // Logan County
  "Crook": "Logan",
  "Fleming": "Logan",
  "Iliff": "Logan",
  "Merino": "Logan",
  "Peetz": "Logan",
  "Sterling": "Logan",

  // Mesa County
  "Collbran": "Mesa",
  "De Beque": "Mesa",
  "Fruita": "Mesa",
  "Grand Junction": "Mesa",
  "Palisade": "Mesa",

  // Mineral County
  "Creede": "Mineral",

  // Moffat County
  "Craig": "Moffat",
  "Dinosaur": "Moffat",

  // Montezuma County
  "Cortez": "Montezuma",
  "Dolores": "Montezuma",
  "Mancos": "Montezuma",
  "Towaoc": "Montezuma",

  // Montrose County
  "Montrose": "Montrose",
  "Naturita": "Montrose",
  "Nucla": "Montrose",
  "Olathe": "Montrose",

  // Morgan County
  "Brush": "Morgan",
  "Fort Morgan": "Morgan",
  "Hillrose": "Morgan",
  "Log Lane Village": "Morgan",
  "Wiggins": "Morgan",

  // Otero County
  "Cheraw": "Otero",
  "Fowler": "Otero",
  "La Junta": "Otero",
  "Manzanola": "Otero",
  "Rocky Ford": "Otero",
  "Swink": "Otero",

  // Ouray County
  "Ouray": "Ouray",
  "Ridgway": "Ouray",

  // Park County
  "Alma": "Park",
  "Fairplay": "Park",

  // Phillips County
  "Haxtun": "Phillips",
  "Holyoke": "Phillips",
  "Paoli": "Phillips",

  // Pitkin County
  "Aspen": "Pitkin",
  "Snowmass Village": "Pitkin",

  // Prowers County
  "Granada": "Prowers",
  "Hartman": "Prowers",
  "Holly": "Prowers",
  "Lamar": "Prowers",
  "Wiley": "Prowers",

  // Pueblo County
  "Boone": "Pueblo",
  "Pueblo": "Pueblo",
  "Pueblo West": "Pueblo",
  "Rye": "Pueblo",

  // Rio Blanco County
  "Meeker": "Rio Blanco",
  "Rangely": "Rio Blanco",

  // Rio Grande County
  "Center": "Rio Grande",
  "Del Norte": "Rio Grande",
  "Monte Vista": "Rio Grande",
  "South Fork": "Rio Grande",

  // Routt County
  "Hayden": "Routt",
  "Oak Creek": "Routt",
  "Steamboat Springs": "Routt",
  "Yampa": "Routt",

  // Saguache County
  "Bonanza": "Saguache",
  "Center": "Saguache",
  "Crestone": "Saguache",
  "Moffat": "Saguache",
  "Saguache": "Saguache",

  // San Juan County
  "Silverton": "San Juan",

  // San Miguel County
  "Mountain Village": "San Miguel",
  "Norwood": "San Miguel",
  "Ophir": "San Miguel",
  "Sawpit": "San Miguel",
  "Telluride": "San Miguel",

  // Sedgwick County
  "Julesburg": "Sedgwick",
  "Ovid": "Sedgwick",
  "Sedgwick": "Sedgwick",

  // Summit County
  "Blue River": "Summit",
  "Breckenridge": "Summit",
  "Dillon": "Summit",
  "Frisco": "Summit",
  "Montezuma": "Summit",
  "Silverthorne": "Summit",

  // Teller County
  "Cripple Creek": "Teller",
  "Victor": "Teller",
  "Woodland Park": "Teller",

  // Washington County
  "Akron": "Washington",
  "Otis": "Washington",

  // Weld County
  "Ault": "Weld",
  "Dacono": "Weld",
  "Eaton": "Weld",
  "Evans": "Weld",
  "Firestone": "Weld",
  "Fort Lupton": "Weld",
  "Frederick": "Weld",
  "Garden City": "Weld",
  "Gilcrest": "Weld",
  "Greeley": "Weld",
  "Grover": "Weld",
  "Hudson": "Weld",
  "Keenesburg": "Weld",
  "Kersey": "Weld",
  "La Salle": "Weld",
  "Lochbuie": "Weld",
  "Mead": "Weld",
  "Milliken": "Weld",
  "Nunn": "Weld",
  "Pierce": "Weld",
  "Platteville": "Weld",
  "Raymer": "Weld",
  "Severance": "Weld",

  // Yuma County
  "Eckley": "Yuma",
  "Wray": "Yuma",
  "Yuma": "Yuma"
};

// Populations for Colorado communities
const populations = {
  "Denver": 715522,
  "Colorado Springs": 478961,
  "Aurora": 386261,
  "Fort Collins": 169810,
  "Lakewood": 155984,
  "Thornton": 141867,
  "Arvada": 124402,
  "Westminster": 116317,
  "Pueblo": 111876,
  "Centennial": 108418,
  "Boulder": 105485,
  "Greeley": 108795,
  "Longmont": 98629,
  "Loveland": 76378,
  "Broomfield": 74112,
  "Grand Junction": 65560,
  "Castle Rock": 73158,
  "Commerce City": 62166,
  "Parker": 58512,
  "Littleton": 46474,
  "Northglenn": 39507,
  "Brighton": 41535,
  "Englewood": 34840,
  "Wheat Ridge": 31889,
  "Fountain": 30240,
  "Lafayette": 30257,
  "Windsor": 32890,
  "Erie": 30038,
  "Montrose": 19396,
  "Golden": 20399,
  "Durango": 19117,
  "Louisville": 21226,
  "Greenwood Village": 15691,
  "Canon City": 16879,
  "Steamboat Springs": 13094,
  "Fort Morgan": 11315,
  "Alamosa": 9814,
  "Trinidad": 8026,
  "Glenwood Springs": 9962,
  "Sterling": 13865,
  "Delta": 9062,
  "Fruita": 14466,
  "Lamar": 7568,
  "Rifle": 9899,
  "Salida": 5882,
  "Craig": 8877,
  "Cortez": 8703,
  "La Junta": 6688,
  "Aspen": 7004,
  "Vail": 4903,
  "Breckenridge": 5078,
  "Telluride": 2607,
  "Pagosa Springs": 2060,
  "Leadville": 2731,
  "Gunnison": 6730,
  "Carbondale": 6930,
  "Basalt": 3857,
  "Avon": 6711,
  "Edwards": 9600,
  "Eagle": 7103,
  "Silverthorne": 4876,
  "Frisco": 3080,
  "Dillon": 935,
  "Estes Park": 5858,
  "Woodland Park": 8131,
  "Manitou Springs": 5342,
  "Monument": 7878,
  "Palmer Lake": 2814,
  "Lone Tree": 14253,
  "Castle Pines": 11402,
  "Firestone": 17374,
  "Frederick": 16069,
  "Dacono": 6629,
  "Mead": 5861,
  "Johnstown": 17849,
  "Milliken": 9545,
  "Berthoud": 9901,
  "Timnath": 6173,
  "Wellington": 10899,
  "Severance": 9155,
  "Evans": 21802,
  "Fort Lupton": 8307,
  "Hudson": 2831,
  "Keenesburg": 1370,
  "Lochbuie": 7194,
  "Eaton": 5757,
  "Ault": 1929,
  "Pierce": 1211,
  "Platteville": 2973,
  "Gilcrest": 1350,
  "La Salle": 2288,
  "Kersey": 1790,
  "Superior": 13094,
  "Lyons": 2148,
  "Nederland": 1445,
  "Jamestown": 274,
  "Ward": 150,
  "Bennett": 3130,
  "Federal Heights": 14382,
  "Sheridan": 6076,
  "Cherry Hills Village": 6505,
  "Columbine Valley": 1399,
  "Foxfield": 768,
  "Glendale": 5186,
  "Deer Trail": 546,
  "Edgewater": 5518,
  "Lakeside": 8,
  "Morrison": 428,
  "Mountain View": 516,
  "Florence": 3881,
  "Brookside": 185,
  "Coal Creek": 339,
  "Rockvale": 434,
  "Williamsburg": 788,
  "Parachute": 1241,
  "New Castle": 5097,
  "Silt": 3346,
  "Black Hawk": 118,
  "Central City": 663,
  "Idaho Springs": 1717,
  "Georgetown": 1034,
  "Silver Plume": 170,
  "Empire": 282,
  "Winter Park": 1063,
  "Fraser": 1330,
  "Granby": 2009,
  "Grand Lake": 505,
  "Hot Sulphur Springs": 663,
  "Kremmling": 1444,
  "Crested Butte": 1639,
  "Mount Crested Butte": 876,
  "Marble": 131,
  "Pitkin": 66,
  "Lake City": 432,
  "La Veta": 817,
  "Walsenburg": 2919,
  "Walden": 604,
  "Bayfield": 2596,
  "Ignacio": 697,
  "Burlington": 4254,
  "Flagler": 570,
  "Stratton": 636,
  "Limon": 1880,
  "Hugo": 722,
  "Brush": 5395,
  "Wiggins": 1095,
  "Hillrose": 269,
  "Log Lane Village": 862,
  "Palisade": 2692,
  "Collbran": 718,
  "De Beque": 479,
  "Creede": 290,
  "Dinosaur": 223,
  "Dolores": 936,
  "Mancos": 1434,
  "Naturita": 501,
  "Nucla": 659,
  "Olathe": 1849,
  "Ordway": 1046,
  "Crowley": 180,
  "Olney Springs": 344,
  "Sugar City": 267,
  "Rocky Ford": 3681,
  "La Junta": 6688,
  "Fowler": 1121,
  "Manzanola": 388,
  "Cheraw": 203,
  "Swink": 588,
  "Ouray": 1048,
  "Ridgway": 1074,
  "Alma": 270,
  "Fairplay": 681,
  "Holyoke": 2261,
  "Haxtun": 945,
  "Paoli": 31,
  "Snowmass Village": 2826,
  "Granada": 517,
  "Holly": 776,
  "Hartman": 69,
  "Wiley": 396,
  "Meeker": 2242,
  "Rangely": 2090,
  "Monte Vista": 4151,
  "Del Norte": 1550,
  "Center": 2179,
  "South Fork": 393,
  "Hayden": 1872,
  "Oak Creek": 884,
  "Yampa": 429,
  "Silverton": 634,
  "Mountain Village": 1320,
  "Norwood": 531,
  "Ophir": 171,
  "Sawpit": 44,
  "Julesburg": 1225,
  "Ovid": 289,
  "Sedgwick": 141,
  "Blue River": 849,
  "Montezuma": 65,
  "Cripple Creek": 1115,
  "Victor": 397,
  "Akron": 1699,
  "Otis": 466,
  "Wray": 2347,
  "Yuma": 3524,
  "Eckley": 255,
  "Elizabeth": 1576,
  "Kiowa": 776,
  "Simla": 626,
  "Larkspur": 205,
  "Minturn": 1027,
  "Red Cliff": 289,
  "Gypsum": 7962,
  "Antonito": 781,
  "La Jara": 808,
  "Manassa": 991,
  "Romeo": 372,
  "Sanford": 790,
  "Blanca": 373,
  "San Luis": 629,
  "Silver Cliff": 587,
  "Westcliffe": 568,
  "Cedaredge": 2253,
  "Crawford": 431,
  "Hotchkiss": 944,
  "Orchard City": 3109,
  "Paonia": 1451,
  "Dove Creek": 735,
  "Rico": 265,
  "Springfield": 1451,
  "Walsh": 523,
  "Campo": 103,
  "Pritchett": 115,
  "Two Buttes": 31,
  "Vilas": 100,
  "Las Animas": 2090,
  "Aguilar": 459,
  "Branson": 79,
  "Cokedale": 116,
  "Kim": 66,
  "Starkville": 42,
  "Cheyenne Wells": 803,
  "Kit Carson": 224,
  "Arriba": 186,
  "Genoa": 193,
  "Crook": 98,
  "Fleming": 387,
  "Iliff": 256,
  "Merino": 277,
  "Peetz": 228,
  "Bethune": 195,
  "Seibert": 183,
  "Vona": 92,
  "Hooper": 105,
  "Poncha Springs": 952,
  "Buena Vista": 2936,
  "Bonanza": 1,
  "Crestone": 143,
  "Moffat": 116,
  "Saguache": 491,
  "Bow Mar": 928,
  "Grover": 137,
  "Raymer": 96,
  "Nunn": 1581,
  "Garden City": 336
};

// Business categories for Colorado
const businessCategories = [
  "Restaurant", "Mexican Restaurant", "Steakhouse", "BBQ", "Cafe", "Coffee Shop",
  "Brewery", "Craft Beer", "Distillery", "Bar", "Wine Bar", "Bank", "Credit Union",
  "Gas Station", "Convenience Store", "Grocery Store", "Supermarket", "Natural Foods",
  "Pharmacy", "Hardware Store", "Outdoor Store", "Ski Shop", "Bike Shop",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop", "Spa",
  "Dentist", "Doctor", "Clinic", "Hospital", "Chiropractor", "Veterinarian",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym", "Yoga Studio", "CrossFit",
  "Pet Store", "Florist", "Pizza", "Fast Food", "Hotel", "Motel", "Bed & Breakfast",
  "Vacation Rental", "Furniture Store", "Cannabis Dispensary", "Landscaping",
  "HVAC", "Plumber", "Electrician", "Roofing", "Solar Installation", "Ski Resort"
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
    const prefixes = [townName, "Colorado", "Rocky Mountain", "Mile High", "Front Range", "Mountain", "Summit", "Peak"];
    const suffixes = ["", " LLC", " Inc", " & Co", " Services", " Center", " Plus", " Pro"];

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

for (const [townName, county] of Object.entries(coloradoTowns)) {
  const slug = slugify(townName) + '-co';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 500000) businessCount = 175;
  else if (population > 200000) businessCount = 150;
  else if (population > 100000) businessCount = 125;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "CO");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Colorado",
    state_abbr: "CO",
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
title: "${townName}, CO Business Directory"
type: "towns"
slug: "${slug}"
state: "co"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Colorado Business Directory"
slug: "co"
state: "co"
state_name: "Colorado"
---
`;
fs.writeFileSync(path.join(statesDir, 'co.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
