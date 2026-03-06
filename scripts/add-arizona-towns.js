import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Arizona municipalities with their counties
// Arizona has 15 counties and 91 incorporated municipalities plus CDPs
// Source: Arizona State Government, US Census Bureau
const arizonaTowns = {
  // Apache County
  "Alpine": "Apache",
  "Chinle": "Apache",
  "Concho": "Apache",
  "Eagar": "Apache",
  "Fort Defiance": "Apache",
  "Ganado": "Apache",
  "Greer": "Apache",
  "Houck": "Apache",
  "Lukachukai": "Apache",
  "Lupton": "Apache",
  "McNary": "Apache",
  "Many Farms": "Apache",
  "Mexican Water": "Apache",
  "Nutrioso": "Apache",
  "Puerco": "Apache",
  "Red Mesa": "Apache",
  "Rock Point": "Apache",
  "Round Rock": "Apache",
  "St. Johns": "Apache",
  "Sanders": "Apache",
  "Springerville": "Apache",
  "Steamboat": "Apache",
  "Teec Nos Pos": "Apache",
  "Tsaile": "Apache",
  "Vernon": "Apache",
  "White Mountain Lake": "Apache",
  "Whiteriver": "Apache",
  "Wide Ruins": "Apache",
  "Window Rock": "Apache",

  // Cochise County
  "Benson": "Cochise",
  "Bisbee": "Cochise",
  "Bowie": "Cochise",
  "Cochise": "Cochise",
  "Douglas": "Cochise",
  "Dragoon": "Cochise",
  "Elfrida": "Cochise",
  "Fort Huachuca": "Cochise",
  "Hereford": "Cochise",
  "Huachuca City": "Cochise",
  "McNeal": "Cochise",
  "Miracle Valley": "Cochise",
  "Naco": "Cochise",
  "Palominas": "Cochise",
  "Pearce": "Cochise",
  "Pirtleville": "Cochise",
  "Pomerene": "Cochise",
  "Portal": "Cochise",
  "San Jose": "Cochise",
  "San Simon": "Cochise",
  "Sierra Vista": "Cochise",
  "Sierra Vista Southeast": "Cochise",
  "St. David": "Cochise",
  "Sunsites": "Cochise",
  "Tombstone": "Cochise",
  "Whetstone": "Cochise",
  "Willcox": "Cochise",

  // Coconino County
  "Bellemont": "Coconino",
  "Blue Ridge": "Coconino",
  "Cameron": "Coconino",
  "Chino Valley": "Coconino",
  "Doney Park": "Coconino",
  "Flagstaff": "Coconino",
  "Forest Lakes": "Coconino",
  "Fredonia": "Coconino",
  "Grand Canyon Village": "Coconino",
  "Gray Mountain": "Coconino",
  "Kaibab": "Coconino",
  "Kachina Village": "Coconino",
  "Leupp": "Coconino",
  "Marble Canyon": "Coconino",
  "Mountainaire": "Coconino",
  "Munds Park": "Coconino",
  "Page": "Coconino",
  "Parks": "Coconino",
  "Sedona": "Coconino",
  "Supai": "Coconino",
  "Tonalea": "Coconino",
  "Tuba City": "Coconino",
  "Tusayan": "Coconino",
  "Williams": "Coconino",

  // Gila County
  "Claypool": "Gila",
  "Globe": "Gila",
  "Hayden": "Gila",
  "Kohl's Ranch": "Gila",
  "Miami": "Gila",
  "Payson": "Gila",
  "Pine": "Gila",
  "San Carlos": "Gila",
  "Star Valley": "Gila",
  "Strawberry": "Gila",
  "Tonto Basin": "Gila",
  "Wheatfields": "Gila",
  "Winkelman": "Gila",
  "Young": "Gila",

  // Graham County
  "Bylas": "Graham",
  "Central": "Graham",
  "Fort Thomas": "Graham",
  "Pima": "Graham",
  "Safford": "Graham",
  "San Jose": "Graham",
  "Solomon": "Graham",
  "Thatcher": "Graham",

  // Greenlee County
  "Clifton": "Greenlee",
  "Duncan": "Greenlee",
  "Franklin": "Greenlee",
  "Morenci": "Greenlee",
  "York": "Greenlee",

  // La Paz County
  "Bouse": "La Paz",
  "Cienega Springs": "La Paz",
  "Ehrenberg": "La Paz",
  "Parker": "La Paz",
  "Parker Strip": "La Paz",
  "Poston": "La Paz",
  "Quartzsite": "La Paz",
  "Salome": "La Paz",
  "Wenden": "La Paz",

  // Maricopa County
  "Anthem": "Maricopa",
  "Apache Junction": "Maricopa",
  "Avondale": "Maricopa",
  "Black Canyon City": "Maricopa",
  "Buckeye": "Maricopa",
  "Carefree": "Maricopa",
  "Casa Grande": "Maricopa",
  "Cave Creek": "Maricopa",
  "Chandler": "Maricopa",
  "Citrus Park": "Maricopa",
  "El Mirage": "Maricopa",
  "Fountain Hills": "Maricopa",
  "Gila Bend": "Maricopa",
  "Gilbert": "Maricopa",
  "Glendale": "Maricopa",
  "Gold Canyon": "Maricopa",
  "Goodyear": "Maricopa",
  "Guadalupe": "Maricopa",
  "Laveen": "Maricopa",
  "Litchfield Park": "Maricopa",
  "Luke Air Force Base": "Maricopa",
  "Maricopa": "Maricopa",
  "Mesa": "Maricopa",
  "Morristown": "Maricopa",
  "New River": "Maricopa",
  "Paradise Valley": "Maricopa",
  "Peoria": "Maricopa",
  "Phoenix": "Maricopa",
  "Queen Creek": "Maricopa",
  "Rio Verde": "Maricopa",
  "San Tan Valley": "Maricopa",
  "Scottsdale": "Maricopa",
  "Sun City": "Maricopa",
  "Sun City West": "Maricopa",
  "Sun Lakes": "Maricopa",
  "Surprise": "Maricopa",
  "Tempe": "Maricopa",
  "Tolleson": "Maricopa",
  "Tonopah": "Maricopa",
  "Waddell": "Maricopa",
  "Wickenburg": "Maricopa",
  "Wittmann": "Maricopa",
  "Youngtown": "Maricopa",

  // Mohave County
  "Beaver Dam": "Mohave",
  "Bullhead City": "Mohave",
  "Centennial Park": "Mohave",
  "Chloride": "Mohave",
  "Colorado City": "Mohave",
  "Dolan Springs": "Mohave",
  "Fort Mohave": "Mohave",
  "Golden Shores": "Mohave",
  "Golden Valley": "Mohave",
  "Hackberry": "Mohave",
  "Kaibab": "Mohave",
  "Kingman": "Mohave",
  "Lake Havasu City": "Mohave",
  "Lake Montezuma": "Mohave",
  "Littlefield": "Mohave",
  "Meadview": "Mohave",
  "Mohave Valley": "Mohave",
  "New Kingman-Butler": "Mohave",
  "Oatman": "Mohave",
  "Peach Springs": "Mohave",
  "Scenic": "Mohave",
  "Temple Bar Marina": "Mohave",
  "Topock": "Mohave",
  "Valentine": "Mohave",
  "White Hills": "Mohave",
  "Wikieup": "Mohave",
  "Willow Valley": "Mohave",
  "Yucca": "Mohave",

  // Navajo County
  "Aripine": "Navajo",
  "Clay Springs": "Navajo",
  "Dilkon": "Navajo",
  "Holbrook": "Navajo",
  "Heber-Overgaard": "Navajo",
  "Indian Wells": "Navajo",
  "Joseph City": "Navajo",
  "Jeddito": "Navajo",
  "Kayenta": "Navajo",
  "Keams Canyon": "Navajo",
  "Kykotsmovi Village": "Navajo",
  "Lakeside": "Navajo",
  "Linden": "Navajo",
  "Low Mountain": "Navajo",
  "Pinetop-Lakeside": "Navajo",
  "Pinedale": "Navajo",
  "Pinetop": "Navajo",
  "Polacca": "Navajo",
  "Second Mesa": "Navajo",
  "Shonto": "Navajo",
  "Show Low": "Navajo",
  "Snowflake": "Navajo",
  "Sun Valley": "Navajo",
  "Taylor": "Navajo",
  "Winslow": "Navajo",
  "Woodruff": "Navajo",

  // Pima County
  "Ajo": "Pima",
  "Arivaca": "Pima",
  "Casas Adobes": "Pima",
  "Catalina": "Pima",
  "Catalina Foothills": "Pima",
  "Corona de Tucson": "Pima",
  "Drexel Heights": "Pima",
  "Elephant Head": "Pima",
  "Flowing Wells": "Pima",
  "Green Valley": "Pima",
  "Littletown": "Pima",
  "Marana": "Pima",
  "Oro Valley": "Pima",
  "Picture Rocks": "Pima",
  "Rincon Valley": "Pima",
  "Rillito": "Pima",
  "Sahuarita": "Pima",
  "Sells": "Pima",
  "South Tucson": "Pima",
  "Summerhaven": "Pima",
  "Summit": "Pima",
  "Tanque Verde": "Pima",
  "Three Points": "Pima",
  "Tortolita": "Pima",
  "Tucson": "Pima",
  "Tucson Estates": "Pima",
  "Valencia West": "Pima",
  "Vail": "Pima",
  "Why": "Pima",

  // Pinal County
  "Apache Junction": "Pinal",
  "Arizona City": "Pinal",
  "Casa Grande": "Pinal",
  "Coolidge": "Pinal",
  "Eloy": "Pinal",
  "Florence": "Pinal",
  "Gold Camp": "Pinal",
  "Kearny": "Pinal",
  "Mammoth": "Pinal",
  "Maricopa": "Pinal",
  "Oracle": "Pinal",
  "Picacho": "Pinal",
  "Queen Creek": "Pinal",
  "Queen Valley": "Pinal",
  "Red Rock": "Pinal",
  "San Manuel": "Pinal",
  "San Tan Valley": "Pinal",
  "Stanfield": "Pinal",
  "Superior": "Pinal",
  "Toltec": "Pinal",

  // Santa Cruz County
  "Amado": "Santa Cruz",
  "Carmen": "Santa Cruz",
  "Kino Springs": "Santa Cruz",
  "Nogales": "Santa Cruz",
  "Patagonia": "Santa Cruz",
  "Rio Rico": "Santa Cruz",
  "Sonoita": "Santa Cruz",
  "Tubac": "Santa Cruz",
  "Tumacacori-Carmen": "Santa Cruz",

  // Yavapai County
  "Ash Fork": "Yavapai",
  "Bagdad": "Yavapai",
  "Black Canyon City": "Yavapai",
  "Camp Verde": "Yavapai",
  "Chino Valley": "Yavapai",
  "Clarkdale": "Yavapai",
  "Congress": "Yavapai",
  "Cornville": "Yavapai",
  "Cordes Lakes": "Yavapai",
  "Cottonwood": "Yavapai",
  "Cottonwood-Verde Village": "Yavapai",
  "Dewey-Humboldt": "Yavapai",
  "Jerome": "Yavapai",
  "Lake Montezuma": "Yavapai",
  "Mayer": "Yavapai",
  "Paulden": "Yavapai",
  "Prescott": "Yavapai",
  "Prescott Valley": "Yavapai",
  "Rimrock": "Yavapai",
  "Sedona": "Yavapai",
  "Seligman": "Yavapai",
  "Spring Valley": "Yavapai",
  "Williamson": "Yavapai",
  "Wilhoit": "Yavapai",
  "Yarnell": "Yavapai",

  // Yuma County
  "Dateland": "Yuma",
  "Fortuna Foothills": "Yuma",
  "Gadsden": "Yuma",
  "Ligurta": "Yuma",
  "Martinez Lake": "Yuma",
  "Roll": "Yuma",
  "San Luis": "Yuma",
  "Somerton": "Yuma",
  "Tacna": "Yuma",
  "Wellton": "Yuma",
  "Yuma": "Yuma"
};

// Populations for Arizona communities
const populations = {
  "Phoenix": 1608139,
  "Tucson": 542629,
  "Mesa": 504258,
  "Chandler": 261165,
  "Scottsdale": 241361,
  "Glendale": 248325,
  "Gilbert": 267918,
  "Tempe": 180587,
  "Peoria": 175961,
  "Surprise": 143148,
  "Yuma": 106895,
  "Avondale": 89558,
  "Goodyear": 95294,
  "Flagstaff": 75038,
  "Buckeye": 91502,
  "Lake Havasu City": 57144,
  "Casa Grande": 57240,
  "Maricopa": 58972,
  "Sierra Vista": 45147,
  "Oro Valley": 47070,
  "Prescott": 45827,
  "Prescott Valley": 48360,
  "Bullhead City": 41500,
  "Apache Junction": 43187,
  "Marana": 52137,
  "El Mirage": 36330,
  "Kingman": 32157,
  "Queen Creek": 60889,
  "San Luis": 35257,
  "Sahuarita": 32679,
  "Fountain Hills": 24495,
  "Nogales": 20188,
  "Douglas": 16604,
  "Eloy": 19026,
  "Payson": 15778,
  "Coolidge": 13421,
  "Cottonwood": 12898,
  "Florence": 27447,
  "Paradise Valley": 14502,
  "Sedona": 10336,
  "Show Low": 12099,
  "Somerton": 16898,
  "Tolleson": 7801,
  "Winslow": 9005,
  "Camp Verde": 12147,
  "Chino Valley": 13020,
  "Clarkdale": 4512,
  "Globe": 7486,
  "Holbrook": 4986,
  "Page": 7590,
  "Safford": 10189,
  "Snowflake": 5943,
  "Thatcher": 5441,
  "Williams": 3239,
  "Benson": 4711,
  "Bisbee": 5209,
  "Clifton": 4026,
  "Eagar": 4885,
  "Jerome": 467,
  "Litchfield Park": 7258,
  "Miami": 1827,
  "Parker": 3083,
  "Quartzsite": 2364,
  "St. Johns": 3535,
  "Springerville": 2016,
  "Superior": 2837,
  "Taylor": 4265,
  "Tombstone": 1312,
  "Wickenburg": 7690,
  "Willcox": 3510,
  "Youngtown": 6834,
  "San Tan Valley": 104936,
  "Fortuna Foothills": 29334,
  "Green Valley": 21391,
  "Sun City": 39539,
  "Sun City West": 26343,
  "Anthem": 23191,
  "Gold Canyon": 12610,
  "Sun Lakes": 14972,
  "New River": 18088,
  "Casas Adobes": 70516,
  "Catalina Foothills": 50890,
  "Flowing Wells": 17235,
  "Drexel Heights": 30656,
  "Tanque Verde": 16909,
  "Picture Rocks": 8867,
  "Corona de Tucson": 9413,
  "Vail": 15050,
  "Catalina": 7025,
  "Tucson Estates": 12665,
  "Valencia West": 13513,
  "Fort Mohave": 15813,
  "Golden Valley": 9403,
  "Mohave Valley": 4285,
  "Dewey-Humboldt": 4279,
  "Pinetop-Lakeside": 4599,
  "Heber-Overgaard": 2913,
  "Cave Creek": 5892,
  "Carefree": 3690,
  "Rio Verde": 2246,
  "Guadalupe": 6626,
  "Laveen": 6498,
  "Waddell": 9918,
  "Morristown": 227,
  "Kearny": 1953,
  "Mammoth": 1426,
  "Oracle": 3686,
  "San Manuel": 3551,
  "Fort Huachuca": 5768,
  "Huachuca City": 1754,
  "Tuba City": 8225,
  "Chinle": 4518,
  "Window Rock": 2716,
  "Kayenta": 5189,
  "Whiteriver": 4104,
  "Sells": 2799,
  "Ajo": 2750,
  "Rio Rico": 18962,
  "Tubac": 1191,
  "Patagonia": 821,
  "Sonoita": 818
};

// Business categories for Arizona
const businessCategories = [
  "Restaurant", "Mexican Restaurant", "Steakhouse", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Grocery Store",
  "Supermarket", "Hardware Store", "Home Depot", "Pharmacy", "CVS",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop",
  "Spa", "Dentist", "Doctor", "Urgent Care", "Hospital", "Veterinarian",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "CrossFit", "Yoga Studio",
  "Pet Store", "Florist", "Bakery", "Pizza", "Fast Food", "Ice Cream Shop",
  "Hotel", "Motel", "Resort", "RV Park", "Campground", "Golf Course",
  "Gun Shop", "Pawn Shop", "Thrift Store", "Furniture Store", "Appliance Store",
  "Electronics Store", "Cell Phone Store", "Jewelry Store", "Clothing Store",
  "Western Wear", "Outdoor Gear", "Sporting Goods", "Pool Service", "Landscaping",
  "HVAC", "Plumber", "Electrician", "Roofing", "Solar Installation"
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
    const prefixes = [townName, "Arizona", "Desert", "Southwest", "Sonoran", "Valley", "Mountain", "Copper State", "Grand Canyon"];
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

for (const [townName, county] of Object.entries(arizonaTowns)) {
  const slug = slugify(townName) + '-az';

  // Skip if already exists (some towns appear in multiple county entries)
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 5000) + 500;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population - Arizona has more businesses per capita
  let businessCount;
  if (population > 1000000) businessCount = 500;
  else if (population > 500000) businessCount = 350;
  else if (population > 200000) businessCount = 250;
  else if (population > 100000) businessCount = 175;
  else if (population > 50000) businessCount = 125;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "AZ");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Arizona",
    state_abbr: "AZ",
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
title: "${townName}, AZ Business Directory"
type: "towns"
slug: "${slug}"
state: "az"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Arizona Business Directory"
slug: "az"
state: "az"
state_name: "Arizona"
---
`;
fs.writeFileSync(path.join(statesDir, 'az.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
