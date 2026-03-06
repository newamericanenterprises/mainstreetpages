import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Illinois municipalities with their counties
// Illinois has 102 counties and 1,298 incorporated municipalities
// This includes the major cities and towns - Source: IL Secretary of State, US Census
const illinoisTowns = {
  // Cook County
  "Chicago": "Cook",
  "Arlington Heights": "Cook",
  "Berwyn": "Cook",
  "Blue Island": "Cook",
  "Calumet City": "Cook",
  "Chicago Heights": "Cook",
  "Cicero": "Cook",
  "Des Plaines": "Cook",
  "Dolton": "Cook",
  "Elk Grove Village": "Cook",
  "Elmwood Park": "Cook",
  "Evanston": "Cook",
  "Franklin Park": "Cook",
  "Glenview": "Cook",
  "Harvey": "Cook",
  "Hoffman Estates": "Cook",
  "Lansing": "Cook",
  "Melrose Park": "Cook",
  "Mount Prospect": "Cook",
  "Niles": "Cook",
  "Northbrook": "Cook",
  "Oak Forest": "Cook",
  "Oak Lawn": "Cook",
  "Oak Park": "Cook",
  "Orland Park": "Cook",
  "Palatine": "Cook",
  "Park Forest": "Cook",
  "Park Ridge": "Cook",
  "Schaumburg": "Cook",
  "Skokie": "Cook",
  "Streamwood": "Cook",
  "Tinley Park": "Cook",
  "Wheeling": "Cook",
  "Wilmette": "Cook",

  // DuPage County
  "Addison": "DuPage",
  "Aurora": "DuPage",
  "Bensenville": "DuPage",
  "Bloomingdale": "DuPage",
  "Bolingbrook": "DuPage",
  "Carol Stream": "DuPage",
  "Darien": "DuPage",
  "Downers Grove": "DuPage",
  "Elmhurst": "DuPage",
  "Glen Ellyn": "DuPage",
  "Glendale Heights": "DuPage",
  "Hanover Park": "DuPage",
  "Hinsdale": "DuPage",
  "Lisle": "DuPage",
  "Lombard": "DuPage",
  "Naperville": "DuPage",
  "Oak Brook": "DuPage",
  "Villa Park": "DuPage",
  "West Chicago": "DuPage",
  "Westmont": "DuPage",
  "Wheaton": "DuPage",
  "Willowbrook": "DuPage",
  "Woodridge": "DuPage",

  // Lake County
  "Antioch": "Lake",
  "Buffalo Grove": "Lake",
  "Deerfield": "Lake",
  "Grayslake": "Lake",
  "Gurnee": "Lake",
  "Highland Park": "Lake",
  "Lake Bluff": "Lake",
  "Lake Forest": "Lake",
  "Lake Zurich": "Lake",
  "Libertyville": "Lake",
  "Lindenhurst": "Lake",
  "Mundelein": "Lake",
  "North Chicago": "Lake",
  "Round Lake": "Lake",
  "Round Lake Beach": "Lake",
  "Vernon Hills": "Lake",
  "Waukegan": "Lake",
  "Zion": "Lake",

  // Will County
  "Bolingbrook": "Will",
  "Channahon": "Will",
  "Crest Hill": "Will",
  "Frankfort": "Will",
  "Homer Glen": "Will",
  "Joliet": "Will",
  "Lockport": "Will",
  "Mokena": "Will",
  "New Lenox": "Will",
  "Plainfield": "Will",
  "Romeoville": "Will",
  "Shorewood": "Will",

  // Kane County
  "Aurora": "Kane",
  "Batavia": "Kane",
  "Carpentersville": "Kane",
  "Elgin": "Kane",
  "Geneva": "Kane",
  "North Aurora": "Kane",
  "St. Charles": "Kane",
  "South Elgin": "Kane",

  // McHenry County
  "Algonquin": "McHenry",
  "Cary": "McHenry",
  "Crystal Lake": "McHenry",
  "Harvard": "McHenry",
  "Huntley": "McHenry",
  "Lake in the Hills": "McHenry",
  "Marengo": "McHenry",
  "McHenry": "McHenry",
  "Woodstock": "McHenry",

  // Winnebago County
  "Loves Park": "Winnebago",
  "Machesney Park": "Winnebago",
  "Rockford": "Winnebago",
  "Rockton": "Winnebago",
  "Roscoe": "Winnebago",

  // Peoria County
  "Chillicothe": "Peoria",
  "East Peoria": "Peoria",
  "Peoria": "Peoria",
  "Peoria Heights": "Peoria",
  "West Peoria": "Peoria",

  // Sangamon County
  "Chatham": "Sangamon",
  "Rochester": "Sangamon",
  "Sherman": "Sangamon",
  "Springfield": "Sangamon",

  // Champaign County
  "Champaign": "Champaign",
  "Mahomet": "Champaign",
  "Rantoul": "Champaign",
  "Savoy": "Champaign",
  "Urbana": "Champaign",

  // Madison County
  "Alton": "Madison",
  "Collinsville": "Madison",
  "Edwardsville": "Madison",
  "Glen Carbon": "Madison",
  "Granite City": "Madison",
  "Highland": "Madison",
  "Maryville": "Madison",
  "Troy": "Madison",
  "Wood River": "Madison",

  // St. Clair County
  "Belleville": "St. Clair",
  "Cahokia": "St. Clair",
  "East St. Louis": "St. Clair",
  "Fairview Heights": "St. Clair",
  "O'Fallon": "St. Clair",
  "Swansea": "St. Clair",

  // McLean County
  "Bloomington": "McLean",
  "Normal": "McLean",

  // Tazewell County
  "East Peoria": "Tazewell",
  "Morton": "Tazewell",
  "Pekin": "Tazewell",
  "Washington": "Tazewell",

  // Rock Island County
  "East Moline": "Rock Island",
  "Milan": "Rock Island",
  "Moline": "Rock Island",
  "Rock Island": "Rock Island",
  "Silvis": "Rock Island",

  // Kendall County
  "Oswego": "Kendall",
  "Plano": "Kendall",
  "Yorkville": "Kendall",

  // DeKalb County
  "DeKalb": "DeKalb",
  "Genoa": "DeKalb",
  "Sandwich": "DeKalb",
  "Sycamore": "DeKalb",

  // Kankakee County
  "Bourbonnais": "Kankakee",
  "Bradley": "Kankakee",
  "Kankakee": "Kankakee",
  "Manteno": "Kankakee",

  // Williamson County
  "Carterville": "Williamson",
  "Herrin": "Williamson",
  "Marion": "Williamson",

  // Jackson County
  "Carbondale": "Jackson",
  "Murphysboro": "Jackson",

  // Macon County
  "Decatur": "Macon",
  "Forsyth": "Macon",
  "Mount Zion": "Macon",

  // Vermilion County
  "Danville": "Vermilion",
  "Georgetown": "Vermilion",
  "Hoopeston": "Vermilion",

  // LaSalle County
  "LaSalle": "LaSalle",
  "Marseilles": "LaSalle",
  "Mendota": "LaSalle",
  "Ottawa": "LaSalle",
  "Peru": "LaSalle",
  "Streator": "LaSalle",

  // Whiteside County
  "Morrison": "Whiteside",
  "Rock Falls": "Whiteside",
  "Sterling": "Whiteside",

  // Adams County
  "Quincy": "Adams",

  // Knox County
  "Galesburg": "Knox",

  // Grundy County
  "Coal City": "Grundy",
  "Minooka": "Grundy",
  "Morris": "Grundy",

  // Ogle County
  "Byron": "Ogle",
  "Oregon": "Ogle",
  "Rochelle": "Ogle",

  // Lee County
  "Dixon": "Lee",

  // Stephenson County
  "Freeport": "Stephenson",

  // Henry County
  "Geneseo": "Henry",
  "Kewanee": "Henry",

  // Bureau County
  "Princeton": "Bureau",
  "Spring Valley": "Bureau",

  // Fulton County
  "Canton": "Fulton",

  // Morgan County
  "Jacksonville": "Morgan",

  // Coles County
  "Charleston": "Coles",
  "Mattoon": "Coles",

  // Marion County
  "Centralia": "Marion",
  "Salem": "Marion",

  // Montgomery County
  "Hillsboro": "Montgomery",
  "Litchfield": "Montgomery",

  // Christian County
  "Taylorville": "Christian",

  // Effingham County
  "Effingham": "Effingham",

  // Macoupin County
  "Carlinville": "Macoupin",
  "Staunton": "Macoupin",

  // Franklin County
  "Benton": "Franklin",
  "West Frankfort": "Franklin",

  // Saline County
  "Harrisburg": "Saline",

  // Perry County
  "Du Quoin": "Perry",
  "Pinckneyville": "Perry",

  // Randolph County
  "Chester": "Randolph",
  "Sparta": "Randolph",

  // Jefferson County
  "Mount Vernon": "Jefferson",

  // Wayne County
  "Fairfield": "Wayne",

  // Massac County
  "Metropolis": "Massac",

  // Crawford County
  "Robinson": "Crawford",

  // Lawrence County
  "Lawrenceville": "Lawrence",

  // Richland County
  "Olney": "Richland",

  // Wabash County
  "Mount Carmel": "Wabash",

  // White County
  "Carmi": "White",

  // Gallatin County
  "Shawneetown": "Gallatin",

  // Hardin County
  "Rosiclare": "Hardin",

  // Pope County
  "Golconda": "Pope",

  // Johnson County
  "Vienna": "Johnson",

  // Pulaski County
  "Mound City": "Pulaski",

  // Alexander County
  "Cairo": "Alexander",

  // Union County
  "Anna": "Union",
  "Jonesboro": "Union",

  // Clinton County
  "Breese": "Clinton",
  "Carlyle": "Clinton",

  // Bond County
  "Greenville": "Bond",

  // Fayette County
  "Vandalia": "Fayette",

  // Shelby County
  "Shelbyville": "Shelby",

  // Moultrie County
  "Sullivan": "Moultrie",

  // Douglas County
  "Tuscola": "Douglas",

  // Edgar County
  "Paris": "Edgar",

  // Clark County
  "Marshall": "Clark",

  // Cumberland County
  "Toledo": "Cumberland",

  // Jasper County
  "Newton": "Jasper",

  // Clay County
  "Flora": "Clay",

  // Edwards County
  "Albion": "Edwards",

  // Hamilton County
  "McLeansboro": "Hamilton",

  // Piatt County
  "Monticello": "Piatt",

  // Ford County
  "Paxton": "Ford",

  // Iroquois County
  "Watseka": "Iroquois",

  // Livingston County
  "Pontiac": "Livingston",

  // Woodford County
  "Eureka": "Woodford",
  "El Paso": "Woodford",

  // Marshall County
  "Henry": "Marshall",
  "Lacon": "Marshall",

  // Putnam County
  "Hennepin": "Putnam",

  // Stark County
  "Toulon": "Stark",

  // Warren County
  "Monmouth": "Warren",

  // Henderson County
  "Oquawka": "Henderson",

  // Hancock County
  "Carthage": "Hancock",

  // McDonough County
  "Macomb": "McDonough",

  // Schuyler County
  "Rushville": "Schuyler",

  // Brown County
  "Mount Sterling": "Brown",

  // Cass County
  "Beardstown": "Cass",
  "Virginia": "Cass",

  // Pike County
  "Pittsfield": "Pike",

  // Scott County
  "Winchester": "Scott",

  // Greene County
  "Carrollton": "Greene",
  "White Hall": "Greene",

  // Jersey County
  "Jerseyville": "Jersey",

  // Calhoun County
  "Hardin": "Calhoun",

  // Mason County
  "Havana": "Mason",

  // Logan County
  "Lincoln": "Logan",

  // Menard County
  "Petersburg": "Menard",

  // Jo Daviess County
  "Galena": "Jo Daviess",

  // Carroll County
  "Mount Carroll": "Carroll",
  "Savanna": "Carroll",

  // Boone County
  "Belvidere": "Boone",

  // Mercer County
  "Aledo": "Mercer"
};

// Populations for Illinois communities
const populations = {
  "Chicago": 2746388,
  "Aurora": 180542,
  "Naperville": 149104,
  "Joliet": 150362,
  "Rockford": 148655,
  "Springfield": 114394,
  "Elgin": 114797,
  "Peoria": 113150,
  "Champaign": 88302,
  "Waukegan": 89321,
  "Cicero": 83891,
  "Bloomington": 78902,
  "Arlington Heights": 75101,
  "Evanston": 78110,
  "Decatur": 70522,
  "Schaumburg": 74227,
  "Bolingbrook": 73936,
  "Palatine": 68557,
  "Skokie": 63348,
  "Des Plaines": 58899,
  "Orland Park": 58590,
  "Tinley Park": 56703,
  "Oak Lawn": 55245,
  "Berwyn": 54850,
  "Normal": 52736,
  "Mount Prospect": 54167,
  "Oak Park": 52233,
  "Downers Grove": 49670,
  "Wheaton": 53469,
  "Hoffman Estates": 52305,
  "Belleville": 42034,
  "Elmhurst": 46989,
  "DeKalb": 43849,
  "Moline": 42268,
  "Lombard": 44050,
  "Glenview": 47838,
  "Buffalo Grove": 40804,
  "Plainfield": 44762,
  "Crystal Lake": 40269,
  "Urbana": 42461,
  "Quincy": 40915,
  "Streamwood": 39858,
  "Carol Stream": 39904,
  "Romeoville": 39650,
  "Rock Island": 37730,
  "Hanover Park": 37607,
  "Carpentersville": 37691,
  "Wheeling": 38318,
  "Park Ridge": 37480,
  "Addison": 36942,
  "Calumet City": 36657,
  "Northbrook": 33729,
  "Elk Grove Village": 32749,
  "Woodridge": 33568,
  "Oswego": 35860,
  "Gurnee": 31295,
  "St. Charles": 33264,
  "Glen Ellyn": 28162,
  "Glendale Heights": 33996,
  "Pekin": 33063,
  "Huntley": 28544,
  "Lisle": 23437,
  "O'Fallon": 32279,
  "East St. Louis": 26047,
  "Granite City": 28676,
  "Crest Hill": 21036,
  "Highland Park": 29763,
  "McHenry": 26992,
  "Lake in the Hills": 29038,
  "Mundelein": 31719,
  "Carbondale": 25902,
  "Algonquin": 31089,
  "Danville": 30479,
  "Kankakee": 26200,
  "Vernon Hills": 26268,
  "Edwardsville": 25332,
  "Galesburg": 30497,
  "Lockport": 25816,
  "Geneva": 21695,
  "Collinsville": 25579,
  "Round Lake Beach": 29155,
  "New Lenox": 27515,
  "Lake Forest": 19374,
  "Batavia": 26479,
  "Libertyville": 20431,
  "Mattoon": 18006,
  "Freeport": 24462,
  "Ottawa": 18867,
  "Centralia": 12451,
  "Alton": 26490,
  "East Moline": 20726,
  "Morton": 16705,
  "Frankfort": 20482,
  "Mokena": 20431,
  "Zion": 24413,
  "Sterling": 15006,
  "Charleston": 20862,
  "Marion": 17912,
  "Peru": 9867,
  "Dixon": 15393,
  "Jacksonville": 19367,
  "LaSalle": 9440,
  "Herrin": 12733,
  "Mount Vernon": 15010,
  "Effingham": 12530,
  "Rantoul": 12941,
  "Macomb": 18141,
  "Lincoln": 13749,
  "Canton": 13468,
  "Streator": 12785,
  "Rochelle": 9574,
  "Sycamore": 18267,
  "Princeton": 7660,
  "Taylorville": 11033,
  "Litchfield": 6712,
  "Murphysboro": 7616,
  "Harrisburg": 9017,
  "Metropolis": 6069,
  "Mount Carmel": 6725,
  "Robinson": 7568,
  "Olney": 8631,
  "Salem": 7250,
  "Vandalia": 6892,
  "Paris": 8663,
  "Marshall": 3771,
  "Flora": 4873,
  "Lawrenceville": 4266,
  "Carmi": 5051,
  "Fairfield": 4933,
  "West Frankfort": 7861,
  "Benton": 7087,
  "Du Quoin": 5817,
  "Sparta": 4302,
  "Chester": 8586,
  "Anna": 4442,
  "Cairo": 2143,
  "Mound City": 501,
  "Vienna": 1357,
  "Golconda": 653,
  "Rosiclare": 1014,
  "Shawneetown": 1219,
  "Monmouth": 9096,
  "Carthage": 2390,
  "Rushville": 2995,
  "Beardstown": 5890,
  "Pittsfield": 4523,
  "Winchester": 1556,
  "Carrollton": 2471,
  "Jerseyville": 8469,
  "Havana": 3118,
  "Petersburg": 2234,
  "Galena": 3225,
  "Mount Carroll": 1658,
  "Savanna": 2976,
  "Belvidere": 25319,
  "Aledo": 3634,
  "Pontiac": 11931,
  "Eureka": 5295,
  "Watseka": 5075,
  "Paxton": 4525,
  "Monticello": 5648,
  "Tuscola": 4480,
  "Sullivan": 4440,
  "Shelbyville": 4700,
  "Greenville": 6955,
  "Carlyle": 3452,
  "Breese": 4492,
  "Hillsboro": 6207,
  "Carlinville": 5724,
  "Staunton": 5023,
  "Newton": 2851,
  "Albion": 1963,
  "McLeansboro": 2779,
  "Toledo": 1159,
  "Geneseo": 6586,
  "Kewanee": 12309,
  "Spring Valley": 5286,
  "Morris": 14848,
  "Minooka": 12316,
  "Coal City": 5587,
  "Byron": 3753,
  "Oregon": 3639,
  "Sandwich": 7421,
  "Genoa": 5234,
  "Morrison": 4188,
  "Rock Falls": 8809,
  "Yorkville": 21336,
  "Plano": 11907,
  "Bradley": 15895,
  "Bourbonnais": 19639,
  "Manteno": 9422,
  "Silvis": 7512,
  "Milan": 5099,
  "Washington": 16351,
  "Chatham": 13577,
  "Rochester": 3915,
  "Sherman": 4885,
  "Savoy": 8607,
  "Mahomet": 9432,
  "Wood River": 10657,
  "Troy": 10135,
  "Maryville": 8034,
  "Glen Carbon": 12885,
  "Highland": 10034,
  "Swansea": 14442,
  "Fairview Heights": 17078,
  "Cahokia": 14857,
  "South Elgin": 24198,
  "North Aurora": 18535,
  "Cary": 17984,
  "Woodstock": 25657,
  "Marengo": 7789,
  "Harvard": 9447,
  "Machesney Park": 23499,
  "Loves Park": 23996,
  "Rockton": 7685,
  "Roscoe": 10785,
  "Chillicothe": 6097,
  "Peoria Heights": 5792,
  "West Peoria": 4432,
  "East Peoria": 23402,
  "Forsyth": 3549,
  "Mount Zion": 6033,
  "Georgetown": 3403,
  "Hoopeston": 5106,
  "Mendota": 7275,
  "Marseilles": 5020,
  "Shorewood": 17691,
  "Homer Glen": 24403,
  "Channahon": 13358,
  "Carterville": 5802,
  "Deerfield": 19225,
  "Lindenhurst": 14495,
  "Lake Zurich": 20197,
  "Lake Bluff": 5778,
  "Grayslake": 21569,
  "Antioch": 14430,
  "Round Lake": 18590,
  "North Chicago": 29591,
  "Westmont": 24932,
  "Willowbrook": 8540,
  "Villa Park": 21904,
  "Oak Brook": 8058,
  "Hinsdale": 17349,
  "Darien": 22086,
  "Bensenville": 18056,
  "Bloomingdale": 22390,
  "West Chicago": 27086,
  "Franklin Park": 18333,
  "Melrose Park": 25411,
  "Elmwood Park": 24883,
  "Niles": 29803,
  "Dolton": 21982,
  "Harvey": 24295,
  "Lansing": 28331,
  "Park Forest": 21975,
  "Chicago Heights": 29564,
  "Blue Island": 23706,
  "Oak Forest": 27962,
  "Wilmette": 27087,
  "El Paso": 2827,
  "Henry": 2434,
  "Lacon": 1820,
  "Hennepin": 713,
  "Toulon": 1279,
  "Oquawka": 1323,
  "Mount Sterling": 1960,
  "Virginia": 1618,
  "White Hall": 2418,
  "Hardin": 916,
  "Jonesboro": 1821
};

// Business categories for Illinois
const businessCategories = [
  "Restaurant", "Italian Restaurant", "Pizza", "Steakhouse", "Diner", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "Hardware Store", "Farm Supply",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop", "Spa",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian", "Chiropractor",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym",
  "Pet Store", "Florist", "Bakery", "Fast Food",
  "Hotel", "Motel", "Furniture Store", "Electronics Store",
  "Landscaping", "HVAC", "Plumber", "Electrician", "Roofing", "Construction"
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
    const prefixes = [townName, "Illinois", "Prairie State", "Midwest", "Heartland", "Central", "Lincoln"];
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

for (const [townName, county] of Object.entries(illinoisTowns)) {
  const slug = slugify(townName) + '-il';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 5000) + 500;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 1000000) businessCount = 200;
  else if (population > 200000) businessCount = 175;
  else if (population > 100000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else businessCount = 15;

  const businesses = generateBusinesses(townName, businessCount, "IL");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Illinois",
    state_abbr: "IL",
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
title: "${townName}, IL Business Directory"
type: "towns"
slug: "${slug}"
state: "il"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Illinois Business Directory"
slug: "il"
state: "il"
state_name: "Illinois"
---
`;
fs.writeFileSync(path.join(statesDir, 'il.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
