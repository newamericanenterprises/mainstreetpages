import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Alaska municipalities with their boroughs/census areas
// Alaska has 19 organized boroughs and 11 census areas
// Source: Alaska Division of Community and Regional Affairs
const alaskaTowns = {
  // Aleutians East Borough
  "Akutan": "Aleutians East",
  "Cold Bay": "Aleutians East",
  "False Pass": "Aleutians East",
  "King Cove": "Aleutians East",
  "Nelson Lagoon": "Aleutians East",
  "Sand Point": "Aleutians East",

  // Aleutians West Census Area
  "Adak": "Aleutians West",
  "Atka": "Aleutians West",
  "Nikolski": "Aleutians West",
  "St. George": "Aleutians West",
  "St. Paul": "Aleutians West",
  "Unalaska": "Aleutians West",

  // Anchorage Municipality
  "Anchorage": "Anchorage",
  "Chugiak": "Anchorage",
  "Eagle River": "Anchorage",
  "Eklutna": "Anchorage",
  "Girdwood": "Anchorage",
  "Indian": "Anchorage",
  "Joint Base Elmendorf-Richardson": "Anchorage",

  // Bethel Census Area
  "Akiachak": "Bethel",
  "Akiak": "Bethel",
  "Aniak": "Bethel",
  "Atmautluak": "Bethel",
  "Bethel": "Bethel",
  "Chefornak": "Bethel",
  "Chevak": "Bethel",
  "Chuathbaluk": "Bethel",
  "Crooked Creek": "Bethel",
  "Eek": "Bethel",
  "Goodnews Bay": "Bethel",
  "Hooper Bay": "Bethel",
  "Kasigluk": "Bethel",
  "Kipnuk": "Bethel",
  "Kongiganak": "Bethel",
  "Kotlik": "Bethel",
  "Kwethluk": "Bethel",
  "Kwigillingok": "Bethel",
  "Lime Village": "Bethel",
  "Lower Kalskag": "Bethel",
  "Marshall": "Bethel",
  "Mekoryuk": "Bethel",
  "Mountain Village": "Bethel",
  "Napakiak": "Bethel",
  "Napaskiak": "Bethel",
  "Newtok": "Bethel",
  "Nightmute": "Bethel",
  "Nunapitchuk": "Bethel",
  "Oscarville": "Bethel",
  "Pilot Station": "Bethel",
  "Pitkas Point": "Bethel",
  "Platinum": "Bethel",
  "Quinhagak": "Bethel",
  "Red Devil": "Bethel",
  "Russian Mission": "Bethel",
  "Scammon Bay": "Bethel",
  "Sleetmute": "Bethel",
  "St. Mary's": "Bethel",
  "Stony River": "Bethel",
  "Toksook Bay": "Bethel",
  "Tuluksak": "Bethel",
  "Tuntutuliak": "Bethel",
  "Tununak": "Bethel",
  "Upper Kalskag": "Bethel",

  // Bristol Bay Borough
  "King Salmon": "Bristol Bay",
  "Naknek": "Bristol Bay",
  "South Naknek": "Bristol Bay",

  // Denali Borough
  "Anderson": "Denali",
  "Cantwell": "Denali",
  "Denali Park": "Denali",
  "Healy": "Denali",
  "McKinley Park": "Denali",

  // Dillingham Census Area
  "Aleknagik": "Dillingham",
  "Clark's Point": "Dillingham",
  "Dillingham": "Dillingham",
  "Egegik": "Dillingham",
  "Ekwok": "Dillingham",
  "Igiugig": "Dillingham",
  "Iliamna": "Dillingham",
  "Kokhanok": "Dillingham",
  "Koliganek": "Dillingham",
  "Levelock": "Dillingham",
  "Manokotak": "Dillingham",
  "New Stuyahok": "Dillingham",
  "Newhalen": "Dillingham",
  "Nondalton": "Dillingham",
  "Pedro Bay": "Dillingham",
  "Perryville": "Dillingham",
  "Pilot Point": "Dillingham",
  "Port Alsworth": "Dillingham",
  "Port Heiden": "Dillingham",
  "Togiak": "Dillingham",
  "Twin Hills": "Dillingham",
  "Ugashik": "Dillingham",

  // Fairbanks North Star Borough
  "Fairbanks": "Fairbanks North Star",
  "North Pole": "Fairbanks North Star",
  "Eielson AFB": "Fairbanks North Star",
  "Fort Wainwright": "Fairbanks North Star",
  "Badger": "Fairbanks North Star",
  "Chena Ridge": "Fairbanks North Star",
  "College": "Fairbanks North Star",
  "Ester": "Fairbanks North Star",
  "Farmers Loop": "Fairbanks North Star",
  "Fox": "Fairbanks North Star",
  "Goldstream": "Fairbanks North Star",
  "Harding-Birch Lakes": "Fairbanks North Star",
  "Moose Creek": "Fairbanks North Star",
  "Pleasant Valley": "Fairbanks North Star",
  "Salcha": "Fairbanks North Star",
  "Steele Creek": "Fairbanks North Star",
  "Two Rivers": "Fairbanks North Star",

  // Haines Borough
  "Haines": "Haines",
  "Excursion Inlet": "Haines",
  "Mosquito Lake": "Haines",
  "Mud Bay": "Haines",

  // Hoonah-Angoon Census Area
  "Angoon": "Hoonah-Angoon",
  "Elfin Cove": "Hoonah-Angoon",
  "Game Creek": "Hoonah-Angoon",
  "Gustavus": "Hoonah-Angoon",
  "Hoonah": "Hoonah-Angoon",
  "Pelican": "Hoonah-Angoon",
  "Tenakee Springs": "Hoonah-Angoon",
  "Whitestone Logging Camp": "Hoonah-Angoon",

  // Juneau City and Borough
  "Juneau": "Juneau",
  "Auke Bay": "Juneau",
  "Douglas": "Juneau",
  "Lemon Creek": "Juneau",
  "Mendenhall Valley": "Juneau",

  // Kenai Peninsula Borough
  "Anchor Point": "Kenai Peninsula",
  "Bear Creek": "Kenai Peninsula",
  "Clam Gulch": "Kenai Peninsula",
  "Cooper Landing": "Kenai Peninsula",
  "Crown Point": "Kenai Peninsula",
  "Diamond Ridge": "Kenai Peninsula",
  "Fox River": "Kenai Peninsula",
  "Fritz Creek": "Kenai Peninsula",
  "Funny River": "Kenai Peninsula",
  "Halibut Cove": "Kenai Peninsula",
  "Happy Valley": "Kenai Peninsula",
  "Homer": "Kenai Peninsula",
  "Hope": "Kenai Peninsula",
  "Kachemak": "Kenai Peninsula",
  "Kasilof": "Kenai Peninsula",
  "Kenai": "Kenai Peninsula",
  "Moose Pass": "Kenai Peninsula",
  "Nanwalek": "Kenai Peninsula",
  "Nikiski": "Kenai Peninsula",
  "Ninilchik": "Kenai Peninsula",
  "Port Graham": "Kenai Peninsula",
  "Primrose": "Kenai Peninsula",
  "Ridgeway": "Kenai Peninsula",
  "Salamatof": "Kenai Peninsula",
  "Seldovia": "Kenai Peninsula",
  "Seldovia Village": "Kenai Peninsula",
  "Seward": "Kenai Peninsula",
  "Soldotna": "Kenai Peninsula",
  "Sterling": "Kenai Peninsula",
  "Sunrise": "Kenai Peninsula",
  "Tyonek": "Kenai Peninsula",

  // Ketchikan Gateway Borough
  "Ketchikan": "Ketchikan Gateway",
  "Loring": "Ketchikan Gateway",
  "Saxman": "Ketchikan Gateway",
  "Herring Cove": "Ketchikan Gateway",
  "Mountain Point": "Ketchikan Gateway",
  "North Tongass Highway": "Ketchikan Gateway",
  "Pennock Island": "Ketchikan Gateway",

  // Kodiak Island Borough
  "Akhiok": "Kodiak Island",
  "Chiniak": "Kodiak Island",
  "Karluk": "Kodiak Island",
  "Kodiak": "Kodiak Island",
  "Kodiak Station": "Kodiak Island",
  "Larsen Bay": "Kodiak Island",
  "Old Harbor": "Kodiak Island",
  "Ouzinkie": "Kodiak Island",
  "Port Lions": "Kodiak Island",
  "Womens Bay": "Kodiak Island",

  // Kusilvak Census Area
  "Alakanuk": "Kusilvak",
  "Emmonak": "Kusilvak",
  "Kotlik": "Kusilvak",
  "Nunam Iqua": "Kusilvak",
  "Stebbins": "Kusilvak",

  // Lake and Peninsula Borough
  "Chignik": "Lake and Peninsula",
  "Chignik Lagoon": "Lake and Peninsula",
  "Chignik Lake": "Lake and Peninsula",
  "Ivanof Bay": "Lake and Peninsula",
  "Kokhanok": "Lake and Peninsula",
  "Newhalen": "Lake and Peninsula",
  "Nondalton": "Lake and Peninsula",
  "Pedro Bay": "Lake and Peninsula",
  "Port Alsworth": "Lake and Peninsula",

  // Matanuska-Susitna Borough
  "Big Lake": "Matanuska-Susitna",
  "Buffalo Soapstone": "Matanuska-Susitna",
  "Butte": "Matanuska-Susitna",
  "Chase": "Matanuska-Susitna",
  "Chickaloon": "Matanuska-Susitna",
  "Farm Loop": "Matanuska-Susitna",
  "Fishhook": "Matanuska-Susitna",
  "Gateway": "Matanuska-Susitna",
  "Glacier View": "Matanuska-Susitna",
  "Houston": "Matanuska-Susitna",
  "Knik River": "Matanuska-Susitna",
  "Knik-Fairview": "Matanuska-Susitna",
  "Lake Louise": "Matanuska-Susitna",
  "Lakes": "Matanuska-Susitna",
  "Lazy Mountain": "Matanuska-Susitna",
  "Meadow Lakes": "Matanuska-Susitna",
  "Palmer": "Matanuska-Susitna",
  "Point MacKenzie": "Matanuska-Susitna",
  "Skwentna": "Matanuska-Susitna",
  "Sutton-Alpine": "Matanuska-Susitna",
  "Talkeetna": "Matanuska-Susitna",
  "Tanaina": "Matanuska-Susitna",
  "Trapper Creek": "Matanuska-Susitna",
  "Wasilla": "Matanuska-Susitna",
  "Willow": "Matanuska-Susitna",
  "Y": "Matanuska-Susitna",

  // Nome Census Area
  "Brevig Mission": "Nome",
  "Council": "Nome",
  "Diomede": "Nome",
  "Elim": "Nome",
  "Gambell": "Nome",
  "Golovin": "Nome",
  "Koyuk": "Nome",
  "Nome": "Nome",
  "St. Michael": "Nome",
  "Savoonga": "Nome",
  "Shaktoolik": "Nome",
  "Shishmaref": "Nome",
  "Solomon": "Nome",
  "Stebbins": "Nome",
  "Teller": "Nome",
  "Unalakleet": "Nome",
  "Wales": "Nome",
  "White Mountain": "Nome",

  // North Slope Borough
  "Anaktuvuk Pass": "North Slope",
  "Atqasuk": "North Slope",
  "Barrow": "North Slope",
  "Utqiagvik": "North Slope",
  "Deadhorse": "North Slope",
  "Kaktovik": "North Slope",
  "Nuiqsut": "North Slope",
  "Point Hope": "North Slope",
  "Point Lay": "North Slope",
  "Prudhoe Bay": "North Slope",
  "Wainwright": "North Slope",

  // Northwest Arctic Borough
  "Ambler": "Northwest Arctic",
  "Buckland": "Northwest Arctic",
  "Candle": "Northwest Arctic",
  "Deering": "Northwest Arctic",
  "Kiana": "Northwest Arctic",
  "Kivalina": "Northwest Arctic",
  "Kobuk": "Northwest Arctic",
  "Kotzebue": "Northwest Arctic",
  "Noatak": "Northwest Arctic",
  "Noorvik": "Northwest Arctic",
  "Selawik": "Northwest Arctic",
  "Shungnak": "Northwest Arctic",

  // Petersburg Borough
  "Kupreanof": "Petersburg",
  "Petersburg": "Petersburg",

  // Prince of Wales-Hyder Census Area
  "Coffman Cove": "Prince of Wales-Hyder",
  "Craig": "Prince of Wales-Hyder",
  "Edna Bay": "Prince of Wales-Hyder",
  "Hollis": "Prince of Wales-Hyder",
  "Hydaburg": "Prince of Wales-Hyder",
  "Hyder": "Prince of Wales-Hyder",
  "Kasaan": "Prince of Wales-Hyder",
  "Klawock": "Prince of Wales-Hyder",
  "Metlakatla": "Prince of Wales-Hyder",
  "Naukati Bay": "Prince of Wales-Hyder",
  "Point Baker": "Prince of Wales-Hyder",
  "Port Protection": "Prince of Wales-Hyder",
  "Thorne Bay": "Prince of Wales-Hyder",
  "Whale Pass": "Prince of Wales-Hyder",

  // Sitka City and Borough
  "Sitka": "Sitka",

  // Skagway Municipality
  "Skagway": "Skagway",

  // Southeast Fairbanks Census Area
  "Alcan Border": "Southeast Fairbanks",
  "Big Delta": "Southeast Fairbanks",
  "Chicken": "Southeast Fairbanks",
  "Delta Junction": "Southeast Fairbanks",
  "Dot Lake": "Southeast Fairbanks",
  "Dry Creek": "Southeast Fairbanks",
  "Eagle": "Southeast Fairbanks",
  "Eagle Village": "Southeast Fairbanks",
  "Fort Greely": "Southeast Fairbanks",
  "Healy Lake": "Southeast Fairbanks",
  "Northway": "Southeast Fairbanks",
  "Northway Junction": "Southeast Fairbanks",
  "Northway Village": "Southeast Fairbanks",
  "Tanacross": "Southeast Fairbanks",
  "Tetlin": "Southeast Fairbanks",
  "Tok": "Southeast Fairbanks",

  // Valdez-Cordova Census Area (now Chugach Census Area and Copper River Census Area)
  "Chenega Bay": "Valdez-Cordova",
  "Chitina": "Valdez-Cordova",
  "Copper Center": "Valdez-Cordova",
  "Cordova": "Valdez-Cordova",
  "Copperville": "Valdez-Cordova",
  "Gakona": "Valdez-Cordova",
  "Glennallen": "Valdez-Cordova",
  "Gulkana": "Valdez-Cordova",
  "Kenny Lake": "Valdez-Cordova",
  "McCarthy": "Valdez-Cordova",
  "Mentasta Lake": "Valdez-Cordova",
  "Nelchina": "Valdez-Cordova",
  "Paxson": "Valdez-Cordova",
  "Slana": "Valdez-Cordova",
  "Tatitlek": "Valdez-Cordova",
  "Tazlina": "Valdez-Cordova",
  "Tonsina": "Valdez-Cordova",
  "Valdez": "Valdez-Cordova",
  "Whittier": "Valdez-Cordova",

  // Wrangell City and Borough
  "Wrangell": "Wrangell",

  // Yakutat City and Borough
  "Yakutat": "Yakutat",

  // Yukon-Koyukuk Census Area
  "Alatna": "Yukon-Koyukuk",
  "Allakaket": "Yukon-Koyukuk",
  "Arctic Village": "Yukon-Koyukuk",
  "Beaver": "Yukon-Koyukuk",
  "Bettles": "Yukon-Koyukuk",
  "Birch Creek": "Yukon-Koyukuk",
  "Central": "Yukon-Koyukuk",
  "Chalkyitsik": "Yukon-Koyukuk",
  "Circle": "Yukon-Koyukuk",
  "Coldfoot": "Yukon-Koyukuk",
  "Evansville": "Yukon-Koyukuk",
  "Flat": "Yukon-Koyukuk",
  "Fort Yukon": "Yukon-Koyukuk",
  "Galena": "Yukon-Koyukuk",
  "Grayling": "Yukon-Koyukuk",
  "Holy Cross": "Yukon-Koyukuk",
  "Hughes": "Yukon-Koyukuk",
  "Huslia": "Yukon-Koyukuk",
  "Kaltag": "Yukon-Koyukuk",
  "Koyukuk": "Yukon-Koyukuk",
  "Lake Minchumina": "Yukon-Koyukuk",
  "Livengood": "Yukon-Koyukuk",
  "Manley Hot Springs": "Yukon-Koyukuk",
  "McGrath": "Yukon-Koyukuk",
  "Medfra": "Yukon-Koyukuk",
  "Minto": "Yukon-Koyukuk",
  "Nenana": "Yukon-Koyukuk",
  "Nikolai": "Yukon-Koyukuk",
  "Nulato": "Yukon-Koyukuk",
  "Ophir": "Yukon-Koyukuk",
  "Rampart": "Yukon-Koyukuk",
  "Ruby": "Yukon-Koyukuk",
  "Shageluk": "Yukon-Koyukuk",
  "Stevens Village": "Yukon-Koyukuk",
  "Takotna": "Yukon-Koyukuk",
  "Tanana": "Yukon-Koyukuk",
  "Venetie": "Yukon-Koyukuk",
  "Wiseman": "Yukon-Koyukuk"
};

// Populations for Alaska communities
const populations = {
  "Anchorage": 291247,
  "Fairbanks": 32515,
  "Juneau": 32255,
  "Sitka": 8458,
  "Ketchikan": 8263,
  "Wasilla": 12492,
  "Kenai": 7424,
  "Kodiak": 5968,
  "Bethel": 6325,
  "Palmer": 7306,
  "Homer": 5515,
  "Unalaska": 4768,
  "Barrow": 4581,
  "Utqiagvik": 4581,
  "Soldotna": 4718,
  "Valdez": 3985,
  "Nome": 3866,
  "Kotzebue": 3289,
  "Seward": 2812,
  "Cordova": 2609,
  "Wrangell": 2502,
  "Dillingham": 2378,
  "Petersburg": 3266,
  "North Pole": 2243,
  "Haines": 2080,
  "Craig": 1201,
  "Hoonah": 931,
  "Skagway": 1164,
  "Yakutat": 604,
  "Delta Junction": 1059,
  "Tok": 1258,
  "Glennallen": 554,
  "Eagle River": 24793,
  "Badger": 19482,
  "College": 12964,
  "Meadow Lakes": 9197,
  "Lakes": 8364,
  "Tanaina": 11086,
  "Knik-Fairview": 17682,
  "Fishhook": 5048,
  "Gateway": 5552,
  "Butte": 3589,
  "Big Lake": 3833,
  "Nikiski": 4493,
  "Sterling": 5965,
  "Kasilof": 596,
  "Ninilchik": 883,
  "Anchor Point": 2127,
  "Seldovia": 277,
  "Chugiak": 10034,
  "Girdwood": 2324,
  "Ester": 2422,
  "Salcha": 1197,
  "Two Rivers": 719,
  "Healy": 1107,
  "Talkeetna": 1055,
  "Willow": 2196,
  "Houston": 2485,
  "Sutton-Alpine": 1612,
  "Trapper Creek": 403,
  "Saxman": 431,
  "Metlakatla": 1482,
  "Klawock": 854,
  "Thorne Bay": 557,
  "Hydaburg": 411,
  "Port Lions": 178,
  "Ouzinkie": 161,
  "Old Harbor": 205,
  "Larsen Bay": 73,
  "Akhiok": 54,
  "King Cove": 1059,
  "Sand Point": 1065,
  "Akutan": 1027,
  "False Pass": 64,
  "Cold Bay": 108,
  "Adak": 122,
  "Atka": 48,
  "St. Paul": 479,
  "St. George": 81,
  "Emmonak": 838,
  "Alakanuk": 677,
  "Hooper Bay": 1375,
  "Chevak": 1065,
  "Mountain Village": 907,
  "St. Mary's": 564,
  "Pilot Station": 610,
  "Marshall": 459,
  "Russian Mission": 350,
  "Aniak": 523,
  "Togiak": 817,
  "Quinhagak": 776,
  "Manokotak": 503,
  "New Stuyahok": 534,
  "Naknek": 544,
  "King Salmon": 374,
  "Iliamna": 109,
  "Unalakleet": 736,
  "Shaktoolik": 262,
  "Koyuk": 345,
  "Elim": 377,
  "Golovin": 176,
  "White Mountain": 205,
  "Teller": 275,
  "Brevig Mission": 432,
  "Gambell": 717,
  "Savoonga": 835,
  "Diomede": 83,
  "Shishmaref": 617,
  "Wales": 145,
  "Point Hope": 757,
  "Point Lay": 247,
  "Wainwright": 583,
  "Kaktovik": 239,
  "Nuiqsut": 524,
  "Anaktuvuk Pass": 324,
  "Atqasuk": 264,
  "Selawik": 903,
  "Noorvik": 688,
  "Kiana": 421,
  "Ambler": 261,
  "Shungnak": 293,
  "Kobuk": 151,
  "Buckland": 490,
  "Deering": 136,
  "Kivalina": 453,
  "Noatak": 573,
  "Fort Yukon": 538,
  "Galena": 478,
  "Tanana": 231,
  "Nenana": 376,
  "Minto": 258,
  "Manley Hot Springs": 67,
  "Ruby": 154,
  "Huslia": 293,
  "Nulato": 264,
  "Kaltag": 167,
  "Koyukuk": 73,
  "Hughes": 77,
  "Allakaket": 117,
  "Alatna": 28,
  "Bettles": 12,
  "Chalkyitsik": 56,
  "Circle": 104,
  "Beaver": 58,
  "Venetie": 166,
  "Arctic Village": 152,
  "Birch Creek": 33,
  "Central": 107,
  "Eagle": 86,
  "McGrath": 301,
  "Nikolai": 94,
  "Takotna": 42,
  "Shageluk": 73,
  "Holy Cross": 159,
  "Grayling": 140,
  "Angoon": 428,
  "Tenakee Springs": 104,
  "Gustavus": 592,
  "Pelican": 75,
  "Elfin Cove": 20,
  "Chitina": 91,
  "McCarthy": 28,
  "Whittier": 272,
  "Tatitlek": 77,
  "Chenega Bay": 54
};

// Business categories
const businessCategories = [
  "Restaurant", "Cafe", "Bar", "General Store", "Gas Station", "Grocery",
  "Hardware Store", "Fishing Supplies", "Outdoor Gear", "Lodge", "Hotel",
  "Motel", "Bed & Breakfast", "Air Charter", "Boat Charter", "Fishing Guide",
  "Auto Repair", "Floatplane Service", "Convenience Store", "Liquor Store",
  "Gift Shop", "Art Gallery", "Tour Operator", "Rental Car", "Taxi Service"
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
    const prefixes = [townName, "Northern", "Frontier", "Alaskan", "Tundra", "Glacier", "Wilderness", "Arctic", "Coastal"];
    const suffixes = ["", " LLC", " Inc", " & Co", " Services"];

    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      name = `${prefix} ${category}${suffix}`.trim();
    } while (usedNames.has(name) && usedNames.size < 100);

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
const boroughCounts = {};

for (const [townName, borough] of Object.entries(alaskaTowns)) {
  const slug = slugify(townName) + '-ak';
  const population = populations[townName] || Math.floor(Math.random() * 800) + 50;

  // Count towns per borough
  boroughCounts[borough] = (boroughCounts[borough] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 100000) businessCount = 200;
  else if (population > 20000) businessCount = 100;
  else if (population > 10000) businessCount = 75;
  else if (population > 5000) businessCount = 50;
  else if (population > 2000) businessCount = 30;
  else if (population > 500) businessCount = 20;
  else if (population > 100) businessCount = 10;
  else businessCount = 5;

  const businesses = generateBusinesses(townName, businessCount, "AK");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Alaska",
    state_abbr: "AK",
    county: borough,  // Using 'county' field for consistency, but it's actually borough/census area
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
title: "${townName}, AK Business Directory"
type: "towns"
slug: "${slug}"
state: "ak"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${borough} (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Alaska Business Directory"
slug: "ak"
state: "ak"
state_name: "Alaska"
---
`;
fs.writeFileSync(path.join(statesDir, 'ak.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/communities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nBoroughs/Census Areas: ${Object.keys(boroughCounts).length}`);
for (const [borough, count] of Object.entries(boroughCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${borough}: ${count} communities`);
}
