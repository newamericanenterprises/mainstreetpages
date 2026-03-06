import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// New Mexico municipalities with their counties
const newMexicoTowns = {
  "Alamogordo": "Otero",
  "Albuquerque": "Bernalillo",
  "Angel Fire": "Colfax",
  "Artesia": "Eddy",
  "Aztec": "San Juan",
  "Bayard": "Grant",
  "Belen": "Valencia",
  "Bernalillo": "Sandoval",
  "Bloomfield": "San Juan",
  "Bosque Farms": "Valencia",
  "Capitan": "Lincoln",
  "Carlsbad": "Eddy",
  "Carrizozo": "Lincoln",
  "Chama": "Rio Arriba",
  "Cimarron": "Colfax",
  "Clayton": "Union",
  "Cloudcroft": "Otero",
  "Clovis": "Curry",
  "Columbus": "Luna",
  "Corrales": "Sandoval",
  "Cuba": "Sandoval",
  "Deming": "Luna",
  "Des Moines": "Union",
  "Dexter": "Chaves",
  "Dora": "Roosevelt",
  "Eagle Nest": "Colfax",
  "Edgewood": "Santa Fe",
  "Elephant Butte": "Sierra",
  "Elida": "Roosevelt",
  "Espanola": "Rio Arriba",
  "Estancia": "Torrance",
  "Eunice": "Lea",
  "Farmington": "San Juan",
  "Floyd": "Roosevelt",
  "Folsom": "Union",
  "Fort Sumner": "De Baca",
  "Gallup": "McKinley",
  "Grady": "Curry",
  "Grants": "Cibola",
  "Grenville": "Union",
  "Hagerman": "Chaves",
  "Hatch": "Dona Ana",
  "Hobbs": "Lea",
  "Hope": "Eddy",
  "House": "Quay",
  "Hurley": "Grant",
  "Jal": "Lea",
  "Jemez Springs": "Sandoval",
  "Lake Arthur": "Chaves",
  "Las Cruces": "Dona Ana",
  "Las Vegas": "San Miguel",
  "Lordsburg": "Hidalgo",
  "Los Alamos": "Los Alamos",
  "Los Lunas": "Valencia",
  "Los Ranchos de Albuquerque": "Bernalillo",
  "Loving": "Eddy",
  "Lovington": "Lea",
  "Magdalena": "Socorro",
  "Maxwell": "Colfax",
  "Melrose": "Curry",
  "Mesilla": "Dona Ana",
  "Milan": "Cibola",
  "Moriarty": "Torrance",
  "Mosquero": "Harding",
  "Mountainair": "Torrance",
  "Pecos": "San Miguel",
  "Peralta": "Valencia",
  "Portales": "Roosevelt",
  "Questa": "Taos",
  "Raton": "Colfax",
  "Red River": "Taos",
  "Reserve": "Catron",
  "Rio Rancho": "Sandoval",
  "Roswell": "Chaves",
  "Roy": "Harding",
  "Ruidoso": "Lincoln",
  "Ruidoso Downs": "Lincoln",
  "San Jon": "Quay",
  "San Ysidro": "Sandoval",
  "Santa Clara": "Grant",
  "Santa Fe": "Santa Fe",
  "Santa Rosa": "Guadalupe",
  "Silver City": "Grant",
  "Socorro": "Socorro",
  "Springer": "Colfax",
  "Sunland Park": "Dona Ana",
  "Taos": "Taos",
  "Taos Ski Valley": "Taos",
  "Tatum": "Lea",
  "Texico": "Curry",
  "Tijeras": "Bernalillo",
  "Truth or Consequences": "Sierra",
  "Tucumcari": "Quay",
  "Tularosa": "Otero",
  "Vaughn": "Guadalupe",
  "Virden": "Hidalgo",
  "Wagon Mound": "Mora",
  "Willard": "Torrance",
  "Williamsburg": "Sierra"
};

// Population data
const populations = {
  "Albuquerque": 564559,
  "Las Cruces": 111385,
  "Rio Rancho": 104046,
  "Santa Fe": 87505,
  "Roswell": 48366,
  "Farmington": 45877,
  "Clovis": 39860,
  "Hobbs": 40508,
  "Alamogordo": 31384,
  "Carlsbad": 32238,
  "Gallup": 21899,
  "Deming": 14488,
  "Los Lunas": 16143,
  "Sunland Park": 18315,
  "Las Vegas": 13166,
  "Artesia": 12104,
  "Portales": 12280,
  "Lovington": 11374,
  "Espanola": 10224,
  "Grants": 9182,
  "Belen": 7269,
  "Ruidoso": 8029,
  "Silver City": 9553,
  "Bernalillo": 9566,
  "Socorro": 8906,
  "Raton": 6088,
  "Tucumcari": 5363,
  "Bloomfield": 7875,
  "Aztec": 6763,
  "Los Alamos": 13166,
  "Truth or Consequences": 6052,
  "Taos": 6193,
  "Corrales": 8799,
  "Los Ranchos de Albuquerque": 6024,
  "Edgewood": 6280,
  "Moriarty": 1910,
  "Eunice": 2991,
  "Jal": 2081,
  "Tatum": 891,
  "Lordsburg": 2797,
  "Bayard": 2380,
  "Santa Clara": 1750,
  "Hurley": 1188,
  "Hatch": 1648,
  "Mesilla": 2196,
  "Anthony": 9360,
  "Tularosa": 2842,
  "Cloudcroft": 674,
  "Carrizozo": 996,
  "Capitan": 1489,
  "Ruidoso Downs": 2815,
  "Fort Sumner": 1024,
  "Santa Rosa": 2848,
  "Vaughn": 446,
  "Clayton": 2980,
  "Springer": 1047,
  "Cimarron": 888,
  "Angel Fire": 1216,
  "Eagle Nest": 310,
  "Maxwell": 253,
  "Chama": 1022,
  "Questa": 1770,
  "Red River": 477,
  "Taos Ski Valley": 69,
  "Pecos": 1392,
  "Cuba": 731,
  "Jemez Springs": 266,
  "San Ysidro": 193,
  "Milan": 3328,
  "Estancia": 1655,
  "Mountainair": 908,
  "Willard": 253,
  "Bosque Farms": 3904,
  "Peralta": 3660,
  "Reserve": 289,
  "Magdalena": 913,
  "Elephant Butte": 1431,
  "Williamsburg": 507,
  "Dexter": 1266,
  "Hagerman": 1257,
  "Lake Arthur": 434,
  "Hope": 105,
  "Loving": 1413,
  "Texico": 1130,
  "Melrose": 640,
  "Grady": 107,
  "Elida": 180,
  "Dora": 133,
  "Floyd": 117,
  "House": 68,
  "San Jon": 216,
  "Mosquero": 93,
  "Roy": 234,
  "Wagon Mound": 324,
  "Des Moines": 143,
  "Folsom": 56,
  "Grenville": 27,
  "Columbus": 1664,
  "Virden": 138,
  "Tijeras": 541
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
  "Mexican Restaurant", "Southwestern Grill", "Chile Farm", "Art Gallery",
  "Native Crafts", "Turquoise Jewelry", "Adobe Construction", "Solar Installation",
  "RV Park", "Campground", "Hotel", "Motel", "Bed and Breakfast",
  "Ski Shop", "Outdoor Outfitter", "Saddle Shop", "Feed Store", "Farm Supply",
  "Tractor Dealer", "Well Drilling", "Septic Service", "Propane Supplier",
  "Liquor Store", "Convenience Store", "Dollar Store", "Thrift Store",
  "Antique Store", "Furniture Store", "Appliance Store", "Gift Shop"
];

const namePrefixes = [
  "Land of Enchantment", "New Mexico", "Southwest", "Desert", "High Desert",
  "Rio Grande", "Sandia", "Mesa", "Adobe", "Pueblo",
  "Turquoise", "Roadrunner", "Coyote", "Zia", "Sun"
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
      address: `${townName}, NM`,
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

const dataDir = path.join(__dirname, '..', 'data', 'towns');
const contentDir = path.join(__dirname, '..', 'content', 'towns');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

let totalBusinesses = 0;
let townCount = 0;
const counties = new Set();

for (const [town, county] of Object.entries(newMexicoTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "New Mexico",
    state_abbr: "NM",
    county: county,
    population: population,
    slug: `${slug}-nm`,
    businesses: businesses
  };

  fs.writeFileSync(path.join(dataDir, `${slug}-nm.json`), JSON.stringify(townData, null, 2));

  const mdContent = `---
title: "${town}, NM Business Directory"
type: "towns"
slug: "${slug}-nm"
state: "nm"
town_data: "${slug}-nm"
---
`;
  fs.writeFileSync(path.join(contentDir, `${slug}-nm.md`), mdContent);
}

const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) fs.mkdirSync(statesDir, { recursive: true });

const stateMd = `---
title: "New Mexico Business Directory"
slug: "nm"
state: "nm"
state_name: "New Mexico"
---
`;
fs.writeFileSync(path.join(statesDir, 'nm.md'), stateMd);

console.log(`Created New Mexico towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
