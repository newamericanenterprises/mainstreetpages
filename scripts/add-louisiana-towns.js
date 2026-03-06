import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Louisiana municipalities with their parishes (64 parishes)
const louisianaTowns = {
  // Orleans Parish (New Orleans area)
  "New Orleans": "Orleans",

  // Jefferson Parish
  "Metairie": "Jefferson",
  "Kenner": "Jefferson",
  "Gretna": "Jefferson",
  "Harvey": "Jefferson",
  "Marrero": "Jefferson",
  "Terrytown": "Jefferson",
  "River Ridge": "Jefferson",
  "Estelle": "Jefferson",
  "Westwego": "Jefferson",
  "Jean Lafitte": "Jefferson",
  "Grand Isle": "Jefferson",
  "Lafitte": "Jefferson",
  "Harahan": "Jefferson",
  "Jefferson": "Jefferson",

  // East Baton Rouge Parish
  "Baton Rouge": "East Baton Rouge",
  "Zachary": "East Baton Rouge",
  "Baker": "East Baton Rouge",
  "Central": "East Baton Rouge",
  "Greenwell Springs": "East Baton Rouge",
  "Pride": "East Baton Rouge",
  "Merrydale": "East Baton Rouge",
  "Brownfields": "East Baton Rouge",
  "Shenandoah": "East Baton Rouge",
  "Westminster": "East Baton Rouge",

  // Caddo Parish (Shreveport area)
  "Shreveport": "Caddo",
  "Blanchard": "Caddo",
  "Greenwood": "Caddo",
  "Mooringsport": "Caddo",
  "Oil City": "Caddo",
  "Rodessa": "Caddo",
  "Hosston": "Caddo",
  "Ida": "Caddo",
  "Gilliam": "Caddo",
  "Belcher": "Caddo",
  "Vivian": "Caddo",

  // Calcasieu Parish (Lake Charles area)
  "Lake Charles": "Calcasieu",
  "Sulphur": "Calcasieu",
  "Moss Bluff": "Calcasieu",
  "Westlake": "Calcasieu",
  "DeQuincy": "Calcasieu",
  "Vinton": "Calcasieu",
  "Iowa": "Calcasieu",
  "Carlyss": "Calcasieu",

  // Lafayette Parish
  "Lafayette": "Lafayette",
  "Scott": "Lafayette",
  "Broussard": "Lafayette",
  "Youngsville": "Lafayette",
  "Carencro": "Lafayette",
  "Duson": "Lafayette",
  "Milton": "Lafayette",
  "Maurice": "Lafayette",

  // Ouachita Parish (Monroe area)
  "Monroe": "Ouachita",
  "West Monroe": "Ouachita",
  "Sterlington": "Ouachita",
  "Richwood": "Ouachita",
  "Brownsville": "Ouachita",
  "Swartz": "Ouachita",
  "Claiborne": "Ouachita",

  // Rapides Parish (Alexandria area)
  "Alexandria": "Rapides",
  "Pineville": "Rapides",
  "Ball": "Rapides",
  "Boyce": "Rapides",
  "Woodworth": "Rapides",
  "Lecompte": "Rapides",
  "Tioga": "Rapides",
  "Forest Hill": "Rapides",
  "Cheneyville": "Rapides",
  "Deville": "Rapides",
  "Glenmora": "Rapides",

  // Bossier Parish
  "Bossier City": "Bossier",
  "Barksdale AFB": "Bossier",
  "Haughton": "Bossier",
  "Benton": "Bossier",
  "Plain Dealing": "Bossier",
  "Princeton": "Bossier",

  // Terrebonne Parish (Houma area)
  "Houma": "Terrebonne",
  "Gray": "Terrebonne",
  "Schriever": "Terrebonne",
  "Chauvin": "Terrebonne",
  "Cocodrie": "Terrebonne",
  "Dulac": "Terrebonne",
  "Montegut": "Terrebonne",

  // Lafourche Parish
  "Thibodaux": "Lafourche",
  "Raceland": "Lafourche",
  "Galliano": "Lafourche",
  "Golden Meadow": "Lafourche",
  "Cut Off": "Lafourche",
  "Larose": "Lafourche",
  "Lockport": "Lafourche",
  "Mathews": "Lafourche",

  // St. Tammany Parish
  "Slidell": "St. Tammany",
  "Mandeville": "St. Tammany",
  "Covington": "St. Tammany",
  "Abita Springs": "St. Tammany",
  "Pearl River": "St. Tammany",
  "Madisonville": "St. Tammany",
  "Folsom": "St. Tammany",
  "Sun": "St. Tammany",
  "Lacombe": "St. Tammany",
  "Eden Isle": "St. Tammany",

  // Tangipahoa Parish
  "Hammond": "Tangipahoa",
  "Ponchatoula": "Tangipahoa",
  "Amite City": "Tangipahoa",
  "Independence": "Tangipahoa",
  "Natalbany": "Tangipahoa",
  "Kentwood": "Tangipahoa",
  "Tickfaw": "Tangipahoa",
  "Roseland": "Tangipahoa",
  "Loranger": "Tangipahoa",

  // Iberia Parish
  "New Iberia": "Iberia",
  "Jeanerette": "Iberia",
  "Delcambre": "Iberia",
  "Loreauville": "Iberia",

  // St. Landry Parish (Opelousas area)
  "Opelousas": "St. Landry",
  "Eunice": "St. Landry",
  "Port Barre": "St. Landry",
  "Sunset": "St. Landry",
  "Grand Coteau": "St. Landry",
  "Arnaudville": "St. Landry",
  "Church Point": "St. Landry",
  "Melville": "St. Landry",
  "Krotz Springs": "St. Landry",
  "Leonville": "St. Landry",
  "Palmetto": "St. Landry",
  "Washington": "St. Landry",

  // St. Martin Parish
  "Breaux Bridge": "St. Martin",
  "St. Martinville": "St. Martin",
  "Henderson": "St. Martin",
  "Catahoula": "St. Martin",
  "Cecilia": "St. Martin",
  "Parks": "St. Martin",

  // Acadia Parish
  "Crowley": "Acadia",
  "Rayne": "Acadia",
  "Church Point": "Acadia",
  "Iota": "Acadia",
  "Estherwood": "Acadia",
  "Egan": "Acadia",
  "Morse": "Acadia",
  "Mermentau": "Acadia",

  // Vermilion Parish
  "Abbeville": "Vermilion",
  "Kaplan": "Vermilion",
  "Gueydan": "Vermilion",
  "Erath": "Vermilion",
  "Delcambre": "Vermilion",

  // St. Mary Parish
  "Morgan City": "St. Mary",
  "Patterson": "St. Mary",
  "Franklin": "St. Mary",
  "Berwick": "St. Mary",
  "Baldwin": "St. Mary",
  "Centerville": "St. Mary",
  "Charenton": "St. Mary",

  // Livingston Parish
  "Denham Springs": "Livingston",
  "Walker": "Livingston",
  "Livingston": "Livingston",
  "Albany": "Livingston",
  "Springfield": "Livingston",
  "French Settlement": "Livingston",
  "Holden": "Livingston",
  "Killian": "Livingston",
  "Port Vincent": "Livingston",
  "Maurepas": "Livingston",

  // Ascension Parish
  "Gonzales": "Ascension",
  "Donaldsonville": "Ascension",
  "Prairieville": "Ascension",
  "Sorrento": "Ascension",
  "St. Amant": "Ascension",
  "Galvez": "Ascension",
  "Darrow": "Ascension",

  // St. Bernard Parish
  "Chalmette": "St. Bernard",
  "Arabi": "St. Bernard",
  "Meraux": "St. Bernard",
  "Violet": "St. Bernard",
  "St. Bernard": "St. Bernard",

  // Plaquemines Parish
  "Belle Chasse": "Plaquemines",
  "Port Sulphur": "Plaquemines",
  "Buras": "Plaquemines",
  "Empire": "Plaquemines",
  "Pointe a la Hache": "Plaquemines",
  "Boothville": "Plaquemines",
  "Venice": "Plaquemines",

  // St. Charles Parish
  "Luling": "St. Charles",
  "Destrehan": "St. Charles",
  "Boutte": "St. Charles",
  "Paradis": "St. Charles",
  "Hahnville": "St. Charles",
  "Ama": "St. Charles",
  "St. Rose": "St. Charles",
  "Norco": "St. Charles",

  // St. John the Baptist Parish
  "LaPlace": "St. John the Baptist",
  "Reserve": "St. John the Baptist",
  "Edgard": "St. John the Baptist",
  "Garyville": "St. John the Baptist",
  "Wallace": "St. John the Baptist",

  // St. James Parish
  "Gramercy": "St. James",
  "Lutcher": "St. James",
  "St. James": "St. James",
  "Paulina": "St. James",
  "Convent": "St. James",
  "Vacherie": "St. James",

  // Assumption Parish
  "Napoleonville": "Assumption",
  "Pierre Part": "Assumption",
  "Labadieville": "Assumption",
  "Plattenville": "Assumption",
  "Paincourtville": "Assumption",

  // West Baton Rouge Parish
  "Port Allen": "West Baton Rouge",
  "Addis": "West Baton Rouge",
  "Brusly": "West Baton Rouge",
  "Erwinville": "West Baton Rouge",

  // Iberville Parish
  "Plaquemine": "Iberville",
  "White Castle": "Iberville",
  "Grosse Tete": "Iberville",
  "Maringouin": "Iberville",
  "Rosedale": "Iberville",
  "St. Gabriel": "Iberville",

  // Pointe Coupee Parish
  "New Roads": "Pointe Coupee",
  "Livonia": "Pointe Coupee",
  "Morganza": "Pointe Coupee",
  "Lettsworth": "Pointe Coupee",
  "Fordoche": "Pointe Coupee",
  "Lakeland": "Pointe Coupee",

  // Avoyelles Parish
  "Marksville": "Avoyelles",
  "Bunkie": "Avoyelles",
  "Mansura": "Avoyelles",
  "Simmesport": "Avoyelles",
  "Hessmer": "Avoyelles",
  "Cottonport": "Avoyelles",
  "Evergreen": "Avoyelles",
  "Moreauville": "Avoyelles",
  "Plaucheville": "Avoyelles",
  "Fifth Ward": "Avoyelles",

  // Evangeline Parish
  "Ville Platte": "Evangeline",
  "Mamou": "Evangeline",
  "Basile": "Evangeline",
  "Turkey Creek": "Evangeline",
  "Chataignier": "Evangeline",
  "Pine Prairie": "Evangeline",

  // Allen Parish
  "Oberlin": "Allen",
  "Kinder": "Allen",
  "Oakdale": "Allen",
  "Elizabeth": "Allen",
  "Reeves": "Allen",

  // Beauregard Parish
  "DeRidder": "Beauregard",
  "Merryville": "Beauregard",
  "Singer": "Beauregard",
  "Fields": "Beauregard",

  // Cameron Parish
  "Cameron": "Cameron",
  "Grand Lake": "Cameron",
  "Hackberry": "Cameron",
  "Holly Beach": "Cameron",
  "Grand Chenier": "Cameron",
  "Creole": "Cameron",

  // Jefferson Davis Parish
  "Jennings": "Jefferson Davis",
  "Welsh": "Jefferson Davis",
  "Lake Arthur": "Jefferson Davis",
  "Elton": "Jefferson Davis",
  "Fenton": "Jefferson Davis",

  // Vernon Parish
  "Leesville": "Vernon",
  "Fort Polk": "Vernon",
  "New Llano": "Vernon",
  "Rosepine": "Vernon",
  "Hornbeck": "Vernon",
  "Simpson": "Vernon",
  "Anacoco": "Vernon",
  "Pitkin": "Vernon",

  // Natchitoches Parish
  "Natchitoches": "Natchitoches",
  "Robeline": "Natchitoches",
  "Campti": "Natchitoches",
  "Clarence": "Natchitoches",
  "Provencal": "Natchitoches",
  "Goldonna": "Natchitoches",
  "Powhatan": "Natchitoches",

  // Sabine Parish
  "Many": "Sabine",
  "Zwolle": "Sabine",
  "Pleasant Hill": "Sabine",
  "Florien": "Sabine",
  "Converse": "Sabine",
  "Fisher": "Sabine",

  // DeSoto Parish
  "Mansfield": "DeSoto",
  "Logansport": "DeSoto",
  "Stonewall": "DeSoto",
  "Grand Cane": "DeSoto",
  "South Mansfield": "DeSoto",
  "Stanley": "DeSoto",

  // Red River Parish
  "Coushatta": "Red River",
  "Edgefield": "Red River",
  "Hall Summit": "Red River",
  "Martin": "Red River",

  // Webster Parish
  "Minden": "Webster",
  "Springhill": "Webster",
  "Sibley": "Webster",
  "Cotton Valley": "Webster",
  "Sarepta": "Webster",
  "Heflin": "Webster",
  "Doyline": "Webster",
  "Dixie Inn": "Webster",
  "Cullen": "Webster",
  "Shongaloo": "Webster",
  "Dubberly": "Webster",

  // Bienville Parish
  "Arcadia": "Bienville",
  "Ringgold": "Bienville",
  "Gibsland": "Bienville",
  "Castor": "Bienville",
  "Saline": "Bienville",
  "Mount Lebanon": "Bienville",
  "Lucky": "Bienville",

  // Claiborne Parish
  "Homer": "Claiborne",
  "Haynesville": "Claiborne",
  "Athens": "Claiborne",
  "Lisbon": "Claiborne",
  "Summerfield": "Claiborne",

  // Lincoln Parish
  "Ruston": "Lincoln",
  "Grambling": "Lincoln",
  "Choudrant": "Lincoln",
  "Simsboro": "Lincoln",
  "Vienna": "Lincoln",
  "Dubach": "Lincoln",

  // Jackson Parish
  "Jonesboro": "Jackson",
  "Hodge": "Jackson",
  "Chatham": "Jackson",
  "Quitman": "Jackson",
  "Eros": "Jackson",
  "Weston": "Jackson",

  // Union Parish
  "Farmerville": "Union",
  "Bernice": "Union",
  "Spearsville": "Union",
  "Marion": "Union",
  "Downsville": "Union",
  "Junction City": "Union",
  "Lillie": "Union",
  "D'Arbonne": "Union",

  // Morehouse Parish
  "Bastrop": "Morehouse",
  "Mer Rouge": "Morehouse",
  "Collinston": "Morehouse",
  "Bonita": "Morehouse",
  "Oak Ridge": "Morehouse",

  // West Carroll Parish
  "Oak Grove": "West Carroll",
  "Epps": "West Carroll",
  "Pioneer": "West Carroll",
  "Forest": "West Carroll",
  "Kilbourne": "West Carroll",

  // East Carroll Parish
  "Lake Providence": "East Carroll",
  "Transylvania": "East Carroll",

  // Madison Parish
  "Tallulah": "Madison",
  "Delta": "Madison",
  "Richmond": "Madison",
  "Mound": "Madison",

  // Tensas Parish
  "St. Joseph": "Tensas",
  "Newellton": "Tensas",
  "Waterproof": "Tensas",

  // Concordia Parish
  "Vidalia": "Concordia",
  "Ferriday": "Concordia",
  "Monterey": "Concordia",
  "Clayton": "Concordia",
  "Ridgecrest": "Concordia",

  // Catahoula Parish
  "Harrisonburg": "Catahoula",
  "Jonesville": "Catahoula",
  "Sicily Island": "Catahoula",

  // LaSalle Parish
  "Jena": "LaSalle",
  "Olla": "LaSalle",
  "Urania": "LaSalle",
  "Tullos": "LaSalle",
  "Trout": "LaSalle",

  // Grant Parish
  "Colfax": "Grant",
  "Dry Prong": "Grant",
  "Montgomery": "Grant",
  "Pollock": "Grant",
  "Georgetown": "Grant",

  // Winn Parish
  "Winnfield": "Winn",
  "Dodson": "Winn",
  "Atlanta": "Winn",
  "Calvin": "Winn",
  "Sikes": "Winn",

  // Caldwell Parish
  "Columbia": "Caldwell",
  "Grayson": "Caldwell",
  "Clarks": "Caldwell",

  // Franklin Parish
  "Winnsboro": "Franklin",
  "Wisner": "Franklin",
  "Gilbert": "Franklin",
  "Baskin": "Franklin",

  // Richland Parish
  "Rayville": "Richland",
  "Delhi": "Richland",
  "Mangham": "Richland",
  "Alto": "Richland",
  "Start": "Richland",

  // Washington Parish
  "Bogalusa": "Washington",
  "Franklinton": "Washington",
  "Angie": "Washington",
  "Varnado": "Washington",
  "Mount Hermon": "Washington",

  // St. Helena Parish
  "Greensburg": "St. Helena",
  "Montpelier": "St. Helena",
  "Pine Grove": "St. Helena",

  // East Feliciana Parish
  "Jackson": "East Feliciana",
  "Clinton": "East Feliciana",
  "Slaughter": "East Feliciana",
  "Norwood": "East Feliciana",

  // West Feliciana Parish
  "St. Francisville": "West Feliciana",
  "Bains": "West Feliciana"
};

// Population estimates for Louisiana cities
const populations = {
  "New Orleans": 383997,
  "Baton Rouge": 225128,
  "Shreveport": 187593,
  "Metairie": 143481,
  "Lafayette": 126185,
  "Lake Charles": 83137,
  "Kenner": 66702,
  "Bossier City": 68159,
  "Monroe": 47877,
  "Alexandria": 46342,
  "Houma": 33727,
  "Slidell": 28198,
  "New Iberia": 30617,
  "Central": 29787,
  "Hammond": 20019,
  "Sulphur": 20165,
  "Ruston": 21987,
  "Natchitoches": 18323,
  "Gretna": 17909,
  "Zachary": 17699,
  "Mandeville": 13166,
  "Opelousas": 16010,
  "Covington": 10471,
  "Pineville": 14428,
  "Thibodaux": 14431,
  "Minden": 12477,
  "Morgan City": 11560,
  "West Monroe": 12515,
  "Crowley": 12689,
  "Bastrop": 10187,
  "Abbeville": 12257,
  "Bogalusa": 11704,
  "Denham Springs": 10629,
  "Gonzales": 12231,
  "DeRidder": 10578,
  "Jennings": 9874,
  "Eunice": 9944,
  "Baker": 13233,
  "Leesville": 6628,
  "Donaldsonville": 7091,
  "Harahan": 9277,
  "Breaux Bridge": 8269,
  "Rayne": 8062,
  "Plaquemine": 6353,
  "Franklin": 7339,
  "Kaplan": 4466,
  "Scott": 8614,
  "Broussard": 12268,
  "Youngsville": 14068,
  "Carencro": 9188,
  "Ponchatoula": 7209,
  "Westwego": 8534,
  "Amite City": 4141,
  "Port Allen": 4942,
  "New Roads": 4831,
  "Marksville": 5432,
  "Ville Platte": 7255,
  "Patterson": 5952,
  "Vinton": 3049,
  "Winnfield": 4405,
  "Tallulah": 6758,
  "Vidalia": 3939,
  "Oakdale": 7653,
  "Many": 2686,
  "Mansfield": 4697,
  "Homer": 2987,
  "Farmerville": 3872,
  "St. Martinville": 5932,
  "Jonesboro": 4531,
  "Arcadia": 2919,
  "Coushatta": 1967,
  "Jena": 3398,
  "Colfax": 1543,
  "Columbia": 368,
  "Winnsboro": 4397,
  "Rayville": 3476,
  "Bunkie": 4075,
  "Ferriday": 3274,
  "Lake Providence": 3326,
  "Haynesville": 2337,
  "Plain Dealing": 928,
  "Springhill": 5031,
  "DeQuincy": 2998,
  "Kinder": 2477,
  "Oberlin": 1758,
  "Welsh": 3226,
  "Walker": 6623,
  "Chalmette": 28164,
  "LaPlace": 32147,
  "Belle Chasse": 12679,
  "Harvey": 20348,
  "Marrero": 31692,
  "Terrytown": 24866,
  "River Ridge": 13494,
  "Estelle": 17579,
  "Prairieville": 33197,
  "Moss Bluff": 13119
};

// Business categories
const businessCategories = [
  "Restaurant", "Cafe", "Bakery", "Pizza", "Bar & Grill", "Coffee Shop",
  "Auto Repair", "Car Wash", "Auto Parts", "Tire Shop", "Oil Change",
  "Hardware Store", "Grocery Store", "Convenience Store", "Pharmacy", "Florist",
  "Hair Salon", "Barber Shop", "Nail Salon", "Spa", "Gym", "Yoga Studio",
  "Dentist", "Doctor", "Chiropractor", "Veterinarian", "Optometrist",
  "Law Office", "Accounting", "Insurance Agency", "Real Estate", "Bank",
  "Plumber", "Electrician", "HVAC", "Roofing", "Landscaping", "Pest Control",
  "Daycare", "Tutoring", "Music Lessons", "Dance Studio", "Martial Arts",
  "Pet Store", "Pet Grooming", "Kennel", "Feed Store",
  "Furniture Store", "Appliance Store", "Electronics", "Clothing Boutique",
  "Jewelry Store", "Gift Shop", "Antique Store", "Thrift Store",
  "Dry Cleaner", "Laundromat", "Tailor", "Shoe Repair",
  "Print Shop", "Sign Shop", "Photography Studio",
  "Towing Service", "Moving Company", "Storage Facility",
  "Hotel", "Motel", "Bed and Breakfast",
  "Church", "Funeral Home", "Cemetery",
  "Farm Equipment", "Feed Mill", "Grain Elevator", "Farm Supply",
  "Cajun Restaurant", "Seafood Restaurant", "Po-Boy Shop"
];

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[.']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function generateBusinesses(townName, population, parish) {
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
    if (usedCategories.size < businessCategories.length) {
      do {
        category = businessCategories[Math.floor(Math.random() * businessCategories.length)];
      } while (usedCategories.has(category));
      usedCategories.add(category);
    } else {
      category = businessCategories[Math.floor(Math.random() * businessCategories.length)];
    }

    const prefixes = [townName, parish, "Cajun", "Louisiana", "Bayou", "Pelican", "Creole", "Gulf", "Southern", "Delta"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, LA`,
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

// Create town data files
const townsDir = path.join(__dirname, '..', 'data', 'towns');
const contentDir = path.join(__dirname, '..', 'content', 'towns');

let totalBusinesses = 0;
let townCount = 0;
const parishes = new Set();

for (const [townName, parish] of Object.entries(louisianaTowns)) {
  const slug = generateSlug(townName) + '-la';
  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;
  const businesses = generateBusinesses(townName, population, parish);

  parishes.add(parish);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Louisiana",
    state_abbr: "LA",
    county: parish,  // Using county field for parish
    population: population,
    slug: slug,
    businesses: businesses
  };

  // Check if file already exists
  const jsonPath = path.join(townsDir, `${slug}.json`);
  if (fs.existsSync(jsonPath)) {
    continue;
  }

  // Write JSON data file
  fs.writeFileSync(jsonPath, JSON.stringify(townData, null, 2));

  // Write content markdown file
  const mdContent = `---
title: "${townName}, Louisiana Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Louisiana"
state_abbr: "LA"
county: "${parish}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Louisiana Business Directory"
slug: "la"
state: "la"
state_name: "Louisiana"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'la.md'), stateContent);

console.log(`Created Louisiana towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Parishes: ${parishes.size}`);
