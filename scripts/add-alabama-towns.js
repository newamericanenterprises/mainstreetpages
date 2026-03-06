import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alabama municipalities with their counties
// Source: Official Alabama municipal data
const alabamaTowns = {
  // Autauga County
  "Autaugaville": "Autauga",
  "Billingsley": "Autauga",
  "Booth": "Autauga",
  "Jones": "Autauga",
  "Marbury": "Autauga",
  "Pine Level": "Autauga",
  "Prattville": "Autauga",

  // Baldwin County
  "Bay Minette": "Baldwin",
  "Daphne": "Baldwin",
  "Elberta": "Baldwin",
  "Fairhope": "Baldwin",
  "Foley": "Baldwin",
  "Gulf Shores": "Baldwin",
  "Loxley": "Baldwin",
  "Magnolia Springs": "Baldwin",
  "Orange Beach": "Baldwin",
  "Robertsdale": "Baldwin",
  "Silverhill": "Baldwin",
  "Spanish Fort": "Baldwin",
  "Summerdale": "Baldwin",

  // Barbour County
  "Blue Springs": "Barbour",
  "Clio": "Barbour",
  "Clayton": "Barbour",
  "Eufaula": "Barbour",
  "Louisville": "Barbour",

  // Bibb County
  "Brent": "Bibb",
  "Centreville": "Bibb",
  "West Blocton": "Bibb",
  "Woodstock": "Bibb",

  // Blount County
  "Allgood": "Blount",
  "Blountsville": "Blount",
  "Cleveland": "Blount",
  "Hayden": "Blount",
  "Highland Lake": "Blount",
  "Locust Fork": "Blount",
  "Nectar": "Blount",
  "Oneonta": "Blount",
  "Rosa": "Blount",
  "Snead": "Blount",
  "Susan Moore": "Blount",

  // Bullock County
  "Midway": "Bullock",
  "Union Springs": "Bullock",

  // Butler County
  "Georgiana": "Butler",
  "Greenville": "Butler",
  "McKenzie": "Butler",

  // Calhoun County
  "Anniston": "Calhoun",
  "Hobson City": "Calhoun",
  "Jacksonville": "Calhoun",
  "Ohatchee": "Calhoun",
  "Oxford": "Calhoun",
  "Piedmont": "Calhoun",
  "Weaver": "Calhoun",
  "Wellington": "Calhoun",

  // Chambers County
  "Cusseta": "Chambers",
  "Five Points": "Chambers",
  "Lafayette": "Chambers",
  "Lanett": "Chambers",
  "Valley": "Chambers",
  "Waverly": "Chambers",

  // Cherokee County
  "Cedar Bluff": "Cherokee",
  "Centre": "Cherokee",
  "Gaylesville": "Cherokee",
  "Leesburg": "Cherokee",
  "Sand Rock": "Cherokee",

  // Chilton County
  "Clanton": "Chilton",
  "Jemison": "Chilton",
  "Maplesville": "Chilton",
  "Thorsby": "Chilton",

  // Choctaw County
  "Butler": "Choctaw",
  "Gilbertown": "Choctaw",
  "Lisman": "Choctaw",
  "Needham": "Choctaw",
  "Pennington": "Choctaw",
  "Silas": "Choctaw",
  "Toxey": "Choctaw",

  // Clarke County
  "Coffeeville": "Clarke",
  "Fulton": "Clarke",
  "Grove Hill": "Clarke",
  "Jackson": "Clarke",
  "Thomasville": "Clarke",

  // Clay County
  "Ashland": "Clay",
  "Lineville": "Clay",

  // Cleburne County
  "Fruithurst": "Cleburne",
  "Heflin": "Cleburne",
  "Ranburne": "Cleburne",

  // Coffee County
  "Elba": "Coffee",
  "Enterprise": "Coffee",
  "Kinston": "Coffee",
  "New Brockton": "Coffee",

  // Colbert County
  "Cherokee": "Colbert",
  "Leighton": "Colbert",
  "Littleville": "Colbert",
  "Muscle Shoals": "Colbert",
  "Sheffield": "Colbert",
  "Tuscumbia": "Colbert",

  // Conecuh County
  "Castleberry": "Conecuh",
  "Evergreen": "Conecuh",
  "Repton": "Conecuh",

  // Coosa County
  "Goodwater": "Coosa",
  "Kellyton": "Coosa",
  "Rockford": "Coosa",

  // Covington County
  "Andalusia": "Covington",
  "Florala": "Covington",
  "Lockhart": "Covington",
  "Opp": "Covington",
  "Red Level": "Covington",
  "River Falls": "Covington",
  "Sanford": "Covington",

  // Crenshaw County
  "Brantley": "Crenshaw",
  "Dozier": "Crenshaw",
  "Glenwood": "Crenshaw",
  "Luverne": "Crenshaw",

  // Cullman County
  "Baileyton": "Cullman",
  "Colony": "Cullman",
  "Cullman": "Cullman",
  "Dodge City": "Cullman",
  "Fairview": "Cullman",
  "Garden City": "Cullman",
  "Good Hope": "Cullman",
  "Hanceville": "Cullman",
  "Holly Pond": "Cullman",
  "South Vinemont": "Cullman",
  "West Point": "Cullman",

  // Dale County
  "Ariton": "Dale",
  "Daleville": "Dale",
  "Grimes": "Dale",
  "Level Plains": "Dale",
  "Midland City": "Dale",
  "Newton": "Dale",
  "Ozark": "Dale",
  "Pinckard": "Dale",

  // Dallas County
  "Orrville": "Dallas",
  "Selma": "Dallas",
  "Valley Grande": "Dallas",

  // DeKalb County
  "Collinsville": "DeKalb",
  "Crossville": "DeKalb",
  "Fort Payne": "DeKalb",
  "Fyffe": "DeKalb",
  "Geraldine": "DeKalb",
  "Henagar": "DeKalb",
  "Ider": "DeKalb",
  "Mentone": "DeKalb",
  "Pine Ridge": "DeKalb",
  "Powell": "DeKalb",
  "Rainsville": "DeKalb",
  "Shiloh": "DeKalb",
  "Sylvania": "DeKalb",
  "Valley Head": "DeKalb",

  // Elmore County
  "Coosada": "Elmore",
  "Deatsville": "Elmore",
  "Eclectic": "Elmore",
  "Elmore": "Elmore",
  "Millbrook": "Elmore",
  "Tallassee": "Elmore",
  "Wetumpka": "Elmore",

  // Escambia County
  "Atmore": "Escambia",
  "Brewton": "Escambia",
  "East Brewton": "Escambia",
  "Flomaton": "Escambia",
  "Pollard": "Escambia",
  "Riverview": "Escambia",

  // Etowah County
  "Altoona": "Etowah",
  "Attalla": "Etowah",
  "Gadsden": "Etowah",
  "Glencoe": "Etowah",
  "Hokes Bluff": "Etowah",
  "Rainbow City": "Etowah",
  "Reece City": "Etowah",
  "Ridgeville": "Etowah",
  "Sardis City": "Etowah",
  "Southside": "Etowah",
  "Walnut Grove": "Etowah",

  // Fayette County
  "Fayette": "Fayette",
  "Berry": "Fayette",
  "Glen Allen": "Fayette",

  // Franklin County
  "Hodges": "Franklin",
  "Phil Campbell": "Franklin",
  "Red Bay": "Franklin",
  "Russellville": "Franklin",
  "Vina": "Franklin",

  // Geneva County
  "Geneva": "Geneva",
  "Hartford": "Geneva",
  "Malvern": "Geneva",
  "Samson": "Geneva",
  "Slocomb": "Geneva",

  // Greene County
  "Eutaw": "Greene",
  "Forkland": "Greene",
  "Union": "Greene",

  // Hale County
  "Akron": "Hale",
  "Greensboro": "Hale",
  "Moundville": "Hale",
  "Newbern": "Hale",

  // Henry County
  "Abbeville": "Henry",
  "Headland": "Henry",
  "Newville": "Henry",

  // Houston County
  "Ashford": "Houston",
  "Columbia": "Houston",
  "Cottonwood": "Houston",
  "Cowarts": "Houston",
  "Dothan": "Houston",
  "Gordon": "Houston",
  "Kinsey": "Houston",
  "Madrid": "Houston",
  "Rehobeth": "Houston",
  "Taylor": "Houston",
  "Webb": "Houston",

  // Jackson County
  "Bridgeport": "Jackson",
  "Dutton": "Jackson",
  "Flat Rock": "Jackson",
  "Hollywood": "Jackson",
  "Hytop": "Jackson",
  "Pisgah": "Jackson",
  "Pleasant Groves": "Jackson",
  "Scottsboro": "Jackson",
  "Section": "Jackson",
  "Skyline": "Jackson",
  "Stevenson": "Jackson",
  "Woodville": "Jackson",

  // Jefferson County
  "Adamsville": "Jefferson",
  "Argo": "Jefferson",
  "Birmingham": "Jefferson",
  "Brighton": "Jefferson",
  "Brookside": "Jefferson",
  "Cardiff": "Jefferson",
  "Center Point": "Jefferson",
  "Clay": "Jefferson",
  "Fairfield": "Jefferson",
  "Fultondale": "Jefferson",
  "Gardendale": "Jefferson",
  "Graysville": "Jefferson",
  "Homewood": "Jefferson",
  "Hoover": "Jefferson",
  "Hueytown": "Jefferson",
  "Irondale": "Jefferson",
  "Kimberly": "Jefferson",
  "Leeds": "Jefferson",
  "Lipscomb": "Jefferson",
  "Maytown": "Jefferson",
  "Midfield": "Jefferson",
  "Morris": "Jefferson",
  "Mountain Brook": "Jefferson",
  "Mulga": "Jefferson",
  "North Johns": "Jefferson",
  "Pinson": "Jefferson",
  "Pleasant Grove": "Jefferson",
  "Sylvan Springs": "Jefferson",
  "Tarrant": "Jefferson",
  "Trafford": "Jefferson",
  "Trussville": "Jefferson",
  "Vestavia Hills": "Jefferson",
  "Warrior": "Jefferson",
  "West Jefferson": "Jefferson",

  // Lamar County
  "Detroit": "Lamar",
  "Kennedy": "Lamar",
  "Millport": "Lamar",
  "Sulligent": "Lamar",
  "Vernon": "Lamar",

  // Lauderdale County
  "Anderson": "Lauderdale",
  "Florence": "Lauderdale",
  "Killen": "Lauderdale",
  "Lexington": "Lauderdale",
  "Rogersville": "Lauderdale",
  "St. Florian": "Lauderdale",
  "Waterloo": "Lauderdale",

  // Lawrence County
  "Courtland": "Lawrence",
  "Hillsboro": "Lawrence",
  "Moulton": "Lawrence",
  "North Courtland": "Lawrence",
  "Town Creek": "Lawrence",

  // Lee County
  "Auburn": "Lee",
  "Beauregard": "Lee",
  "Loachapoka": "Lee",
  "Notasulga": "Lee",
  "Opelika": "Lee",
  "Phenix City": "Lee",
  "Smiths Station": "Lee",

  // Limestone County
  "Ardmore": "Limestone",
  "Athens": "Limestone",
  "Elkmont": "Limestone",
  "Lester": "Limestone",
  "Mooresville": "Limestone",

  // Lowndes County
  "Fort Deposit": "Lowndes",
  "Gordonville": "Lowndes",
  "Hayneville": "Lowndes",
  "Lowndesboro": "Lowndes",
  "Mosses": "Lowndes",
  "White Hall": "Lowndes",

  // Macon County
  "Franklin": "Macon",
  "Notasulga": "Macon",
  "Shorter": "Macon",
  "Tuskegee": "Macon",

  // Madison County
  "Gurley": "Madison",
  "Harvest": "Madison",
  "Huntsville": "Madison",
  "Madison": "Madison",
  "New Hope": "Madison",
  "Owens Cross Roads": "Madison",
  "Triana": "Madison",

  // Marengo County
  "Demopolis": "Marengo",
  "Faunsdale": "Marengo",
  "Linden": "Marengo",
  "Myrtlewood": "Marengo",
  "Sweet Water": "Marengo",
  "Thomaston": "Marengo",

  // Marion County
  "Bear Creek": "Marion",
  "Brilliant": "Marion",
  "Glen Allen": "Marion",
  "Guin": "Marion",
  "Hackleburg": "Marion",
  "Hamilton": "Marion",
  "Winfield": "Marion",

  // Marshall County
  "Albertville": "Marshall",
  "Arab": "Marshall",
  "Boaz": "Marshall",
  "Douglas": "Marshall",
  "Grant": "Marshall",
  "Guntersville": "Marshall",
  "Union Grove": "Marshall",

  // Mobile County
  "Bayou La Batre": "Mobile",
  "Chickasaw": "Mobile",
  "Citronelle": "Mobile",
  "Creola": "Mobile",
  "Dauphin Island": "Mobile",
  "Mobile": "Mobile",
  "Mount Vernon": "Mobile",
  "Prichard": "Mobile",
  "Saraland": "Mobile",
  "Satsuma": "Mobile",
  "Semmes": "Mobile",

  // Monroe County
  "Beatrice": "Monroe",
  "Excel": "Monroe",
  "Frisco City": "Monroe",
  "Monroeville": "Monroe",
  "Uriah": "Monroe",

  // Montgomery County
  "Montgomery": "Montgomery",
  "Pike Road": "Montgomery",

  // Morgan County
  "Decatur": "Morgan",
  "Eva": "Morgan",
  "Falkville": "Morgan",
  "Hartselle": "Morgan",
  "Laceys Spring": "Morgan",
  "Priceville": "Morgan",
  "Somerville": "Morgan",
  "Trinity": "Morgan",

  // Perry County
  "Marion": "Perry",
  "Uniontown": "Perry",

  // Pickens County
  "Aliceville": "Pickens",
  "Carrollton": "Pickens",
  "Ethelsville": "Pickens",
  "Gordo": "Pickens",
  "McMullen": "Pickens",
  "Reform": "Pickens",

  // Pike County
  "Banks": "Pike",
  "Brundidge": "Pike",
  "Goshen": "Pike",
  "Troy": "Pike",

  // Randolph County
  "Roanoke": "Randolph",
  "Wadley": "Randolph",
  "Wedowee": "Randolph",
  "Woodland": "Randolph",

  // Russell County
  "Hurtsboro": "Russell",
  "Phenix City": "Russell",
  "Seale": "Russell",

  // St. Clair County
  "Ashville": "St. Clair",
  "Margaret": "St. Clair",
  "Moody": "St. Clair",
  "Odenville": "St. Clair",
  "Pell City": "St. Clair",
  "Ragland": "St. Clair",
  "Riverside": "St. Clair",
  "Springville": "St. Clair",
  "Steele": "St. Clair",
  "Wattsville": "St. Clair",

  // Shelby County
  "Alabaster": "Shelby",
  "Calera": "Shelby",
  "Chelsea": "Shelby",
  "Columbiana": "Shelby",
  "Harpersville": "Shelby",
  "Helena": "Shelby",
  "Indian Springs Village": "Shelby",
  "Montevallo": "Shelby",
  "Pelham": "Shelby",
  "Shelby": "Shelby",
  "Vincent": "Shelby",
  "Westover": "Shelby",
  "Wilsonville": "Shelby",
  "Wilton": "Shelby",

  // Sumter County
  "Cuba": "Sumter",
  "Emelle": "Sumter",
  "Epes": "Sumter",
  "Gainesville": "Sumter",
  "Geiger": "Sumter",
  "Livingston": "Sumter",
  "Payneville": "Sumter",
  "York": "Sumter",

  // Talladega County
  "Bon Air": "Talladega",
  "Childersburg": "Talladega",
  "Lincoln": "Talladega",
  "Munford": "Talladega",
  "Oak Grove": "Talladega",
  "Sylacauga": "Talladega",
  "Talladega": "Talladega",
  "Talladega Springs": "Talladega",
  "Waldo": "Talladega",

  // Tallapoosa County
  "Alexander City": "Tallapoosa",
  "Camp Hill": "Tallapoosa",
  "Dadeville": "Tallapoosa",
  "Daviston": "Tallapoosa",
  "Goldville": "Tallapoosa",
  "Jackson's Gap": "Tallapoosa",
  "New Site": "Tallapoosa",
  "Our Town": "Tallapoosa",
  "Reeltown": "Tallapoosa",

  // Tuscaloosa County
  "Brookwood": "Tuscaloosa",
  "Coaling": "Tuscaloosa",
  "Coker": "Tuscaloosa",
  "Lake View": "Tuscaloosa",
  "Northport": "Tuscaloosa",
  "Tuscaloosa": "Tuscaloosa",
  "Vance": "Tuscaloosa",

  // Walker County
  "Carbon Hill": "Walker",
  "Cordova": "Walker",
  "Dora": "Walker",
  "Eldridge": "Walker",
  "Jasper": "Walker",
  "Kansas": "Walker",
  "Nauvoo": "Walker",
  "Oakman": "Walker",
  "Parrish": "Walker",
  "Sipsey": "Walker",
  "Sumiton": "Walker",

  // Washington County
  "Chatom": "Washington",
  "McIntosh": "Washington",
  "Millry": "Washington",

  // Wilcox County
  "Camden": "Wilcox",
  "Oak Hill": "Wilcox",
  "Pine Apple": "Wilcox",
  "Pine Hill": "Wilcox",
  "Yellow Bluff": "Wilcox",

  // Winston County
  "Addison": "Winston",
  "Arley": "Winston",
  "Double Springs": "Winston",
  "Haleyville": "Winston",
  "Lynn": "Winston",
  "Natural Bridge": "Winston"
};

// Approximate populations for major cities (others will get default)
const populations = {
  "Birmingham": 200733,
  "Huntsville": 215006,
  "Montgomery": 200603,
  "Mobile": 187041,
  "Tuscaloosa": 99600,
  "Hoover": 92606,
  "Auburn": 76143,
  "Dothan": 71072,
  "Decatur": 57938,
  "Madison": 56933,
  "Florence": 40184,
  "Vestavia Hills": 39815,
  "Prattville": 37464,
  "Phenix City": 36168,
  "Gadsden": 33685,
  "Alabaster": 33284,
  "Opelika": 30809,
  "Northport": 29550,
  "Enterprise": 28711,
  "Homewood": 25167,
  "Anniston": 21518,
  "Bessemer": 26019,
  "Athens": 25973,
  "Pelham": 23902,
  "Fairhope": 22477,
  "Oxford": 21348,
  "Albertville": 21160,
  "Selma": 17762,
  "Daphne": 28951,
  "Mountain Brook": 20963,
  "Troy": 18033,
  "Helena": 20127,
  "Trussville": 22454,
  "Cullman": 16653,
  "Gulf Shores": 12156,
  "Foley": 19258,
  "Jasper": 13857,
  "Gardendale": 16069,
  "Millbrook": 16542,
  "Ozark": 14219,
  "Eufaula": 11878,
  "Fort Payne": 14605,
  "Talladega": 15214,
  "Center Point": 15465,
  "Hueytown": 15364,
  "Scottsboro": 14770,
  "Hartselle": 14879,
  "Saraland": 14640,
  "Rainbow City": 10008,
  "Atmore": 10194,
  "Arab": 8602,
  "Pell City": 14555,
  "Jacksonville": 12754,
  "Alexander City": 14739,
  "Sylacauga": 12478,
  "Calera": 15005,
  "Spanish Fort": 9516,
  "Muscle Shoals": 14671,
  "Irondale": 13218,
  "Sheffield": 8782,
  "Chelsea": 14837,
  "Wetumpka": 8695,
  "Guntersville": 8638,
  "Boaz": 9706
};

// Sample business categories
const businessCategories = [
  "Restaurant", "Cafe", "Bar", "Bank", "Gas Station", "Supermarket",
  "Hardware Store", "Pharmacy", "Auto Repair", "Hair Salon", "Dentist",
  "Insurance", "Real Estate", "Attorney", "Accountant", "Dry Cleaner",
  "Fitness Center", "Pet Store", "Florist", "Bakery", "Pizza"
];

function slugify(name) {
  return name.toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function generateBusinesses(townName, count) {
  const businesses = [];
  const usedNames = new Set();

  for (let i = 0; i < count; i++) {
    const category = businessCategories[i % businessCategories.length];
    let name;

    // Generate unique business names
    const prefixes = [townName, "Main Street", "Downtown", "Local", "City", "County", "Southern", "Alabama"];
    const suffixes = ["LLC", "Inc", "& Co", "Services", "Shop", "Store", "Center"];

    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = Math.random() > 0.5 ? " " + suffixes[Math.floor(Math.random() * suffixes.length)] : "";
      name = `${prefix} ${category}${suffix}`;
    } while (usedNames.has(name));

    usedNames.add(name);

    businesses.push({
      name: name,
      category: category,
      address: `${townName}, AL`,
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

// Ensure directories exist
if (!fs.existsSync(townsDir)) {
  fs.mkdirSync(townsDir, { recursive: true });
}
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

let townCount = 0;
let totalBusinesses = 0;

for (const [townName, county] of Object.entries(alabamaTowns)) {
  const slug = slugify(townName) + '-al';
  const population = populations[townName] || Math.floor(Math.random() * 8000) + 1000;

  // Generate businesses based on population
  let businessCount;
  if (population > 100000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 30;
  else businessCount = 15;

  const businesses = generateBusinesses(townName, businessCount);
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Alabama",
    state_abbr: "AL",
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
title: "${townName}, AL Business Directory"
type: "towns"
slug: "${slug}"
state: "al"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (${businesses.length} businesses)`);
}

console.log(`\nTotal: ${townCount} towns, ${totalBusinesses} businesses`);
