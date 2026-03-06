import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vermont municipalities with their counties
const vermontTowns = {
  "Addison": "Addison",
  "Albany": "Orleans",
  "Alburgh": "Grand Isle",
  "Andover": "Windsor",
  "Arlington": "Bennington",
  "Athens": "Windham",
  "Averill": "Essex",
  "Avery's Gore": "Essex",
  "Bakersfield": "Franklin",
  "Baltimore": "Windsor",
  "Barnard": "Windsor",
  "Barnet": "Caledonia",
  "Barre City": "Washington",
  "Barre Town": "Washington",
  "Barton": "Orleans",
  "Belvidere": "Lamoille",
  "Bennington": "Bennington",
  "Benson": "Rutland",
  "Berkshire": "Franklin",
  "Berlin": "Washington",
  "Bethel": "Windsor",
  "Bloomfield": "Essex",
  "Bolton": "Chittenden",
  "Bradford": "Orange",
  "Braintree": "Orange",
  "Brandon": "Rutland",
  "Brattleboro": "Windham",
  "Bridgewater": "Windsor",
  "Bridport": "Addison",
  "Brighton": "Essex",
  "Bristol": "Addison",
  "Brookfield": "Orange",
  "Brookline": "Windham",
  "Brownington": "Orleans",
  "Brunswick": "Essex",
  "Buels Gore": "Chittenden",
  "Burke": "Caledonia",
  "Burlington": "Chittenden",
  "Cabot": "Washington",
  "Calais": "Washington",
  "Cambridge": "Lamoille",
  "Canaan": "Essex",
  "Castleton": "Rutland",
  "Cavendish": "Windsor",
  "Charleston": "Orleans",
  "Charlotte": "Chittenden",
  "Chelsea": "Orange",
  "Chester": "Windsor",
  "Chittenden": "Rutland",
  "Clarendon": "Rutland",
  "Colchester": "Chittenden",
  "Concord": "Essex",
  "Corinth": "Orange",
  "Cornwall": "Addison",
  "Coventry": "Orleans",
  "Craftsbury": "Orleans",
  "Danby": "Rutland",
  "Danville": "Caledonia",
  "Derby": "Orleans",
  "Dorset": "Bennington",
  "Dover": "Windham",
  "Dummerston": "Windham",
  "Duxbury": "Washington",
  "East Haven": "Essex",
  "East Montpelier": "Washington",
  "Eden": "Lamoille",
  "Elmore": "Lamoille",
  "Enosburg": "Franklin",
  "Essex": "Chittenden",
  "Essex Junction": "Chittenden",
  "Fair Haven": "Rutland",
  "Fairfax": "Franklin",
  "Fairfield": "Franklin",
  "Fairlee": "Orange",
  "Fayston": "Washington",
  "Ferdinand": "Essex",
  "Ferrisburgh": "Addison",
  "Fletcher": "Franklin",
  "Franklin": "Franklin",
  "Georgia": "Franklin",
  "Glastenbury": "Bennington",
  "Glover": "Orleans",
  "Goshen": "Addison",
  "Grafton": "Windham",
  "Granby": "Essex",
  "Grand Isle": "Grand Isle",
  "Granville": "Addison",
  "Greensboro": "Orleans",
  "Groton": "Caledonia",
  "Guildhall": "Essex",
  "Guilford": "Windham",
  "Halifax": "Windham",
  "Hancock": "Addison",
  "Hardwick": "Caledonia",
  "Hartford": "Windsor",
  "Hartland": "Windsor",
  "Highgate": "Franklin",
  "Hinesburg": "Chittenden",
  "Holland": "Orleans",
  "Hubbardton": "Rutland",
  "Huntington": "Chittenden",
  "Hyde Park": "Lamoille",
  "Ira": "Rutland",
  "Irasburg": "Orleans",
  "Isle La Motte": "Grand Isle",
  "Jamaica": "Windham",
  "Jay": "Orleans",
  "Jericho": "Chittenden",
  "Johnson": "Lamoille",
  "Kirby": "Caledonia",
  "Landgrove": "Bennington",
  "Leicester": "Addison",
  "Lemington": "Essex",
  "Lewis": "Essex",
  "Lincoln": "Addison",
  "Londonderry": "Windham",
  "Lowell": "Orleans",
  "Ludlow": "Windsor",
  "Lunenburg": "Essex",
  "Lyndon": "Caledonia",
  "Maidstone": "Essex",
  "Manchester": "Bennington",
  "Marlboro": "Windham",
  "Marshfield": "Washington",
  "Mendon": "Rutland",
  "Middlebury": "Addison",
  "Middlesex": "Washington",
  "Middletown Springs": "Rutland",
  "Milton": "Chittenden",
  "Monkton": "Addison",
  "Montgomery": "Franklin",
  "Montpelier": "Washington",
  "Moretown": "Washington",
  "Morgan": "Orleans",
  "Morristown": "Lamoille",
  "Mount Holly": "Rutland",
  "Mount Tabor": "Rutland",
  "Newark": "Caledonia",
  "Newbury": "Orange",
  "Newfane": "Windham",
  "Newport City": "Orleans",
  "Newport Town": "Orleans",
  "North Hero": "Grand Isle",
  "Northfield": "Washington",
  "Norton": "Essex",
  "Norwich": "Windsor",
  "Orange": "Orange",
  "Orwell": "Addison",
  "Panton": "Addison",
  "Pawlet": "Rutland",
  "Peacham": "Caledonia",
  "Peru": "Bennington",
  "Pittsfield": "Rutland",
  "Pittsford": "Rutland",
  "Plainfield": "Washington",
  "Plymouth": "Windsor",
  "Pomfret": "Windsor",
  "Poultney": "Rutland",
  "Pownal": "Bennington",
  "Proctor": "Rutland",
  "Putney": "Windham",
  "Randolph": "Orange",
  "Reading": "Windsor",
  "Readsboro": "Bennington",
  "Richford": "Franklin",
  "Richmond": "Chittenden",
  "Ripton": "Addison",
  "Rochester": "Windsor",
  "Rockingham": "Windham",
  "Roxbury": "Washington",
  "Royalton": "Windsor",
  "Rupert": "Bennington",
  "Rutland City": "Rutland",
  "Rutland Town": "Rutland",
  "Ryegate": "Caledonia",
  "Salisbury": "Addison",
  "Sandgate": "Bennington",
  "Searsburg": "Bennington",
  "Shaftsbury": "Bennington",
  "Sharon": "Windsor",
  "Sheffield": "Caledonia",
  "Shelburne": "Chittenden",
  "Sheldon": "Franklin",
  "Shoreham": "Addison",
  "Shrewsbury": "Rutland",
  "Somerset": "Windham",
  "South Burlington": "Chittenden",
  "South Hero": "Grand Isle",
  "Springfield": "Windsor",
  "St. Albans City": "Franklin",
  "St. Albans Town": "Franklin",
  "St. George": "Chittenden",
  "St. Johnsbury": "Caledonia",
  "Stamford": "Bennington",
  "Stannard": "Caledonia",
  "Starksboro": "Addison",
  "Stockbridge": "Windsor",
  "Stowe": "Lamoille",
  "Strafford": "Orange",
  "Stratton": "Windham",
  "Sudbury": "Rutland",
  "Sunderland": "Bennington",
  "Sutton": "Caledonia",
  "Swanton": "Franklin",
  "Thetford": "Orange",
  "Tinmouth": "Rutland",
  "Topsham": "Orange",
  "Townshend": "Windham",
  "Troy": "Orleans",
  "Tunbridge": "Orange",
  "Underhill": "Chittenden",
  "Vergennes": "Addison",
  "Vernon": "Windham",
  "Vershire": "Orange",
  "Victory": "Essex",
  "Waitsfield": "Washington",
  "Walden": "Caledonia",
  "Wallingford": "Rutland",
  "Waltham": "Addison",
  "Wardsboro": "Windham",
  "Warren": "Washington",
  "Washington": "Orange",
  "Waterbury": "Washington",
  "Waterford": "Caledonia",
  "Waterville": "Lamoille",
  "Weathersfield": "Windsor",
  "Wells": "Rutland",
  "West Fairlee": "Orange",
  "West Haven": "Rutland",
  "West Rutland": "Rutland",
  "West Windsor": "Windsor",
  "Westfield": "Orleans",
  "Westford": "Chittenden",
  "Westminster": "Windham",
  "Westmore": "Orleans",
  "Weston": "Windsor",
  "Weybridge": "Addison",
  "Wheelock": "Caledonia",
  "Whiting": "Addison",
  "Whitingham": "Windham",
  "Williamstown": "Orange",
  "Williston": "Chittenden",
  "Wilmington": "Windham",
  "Windham": "Windham",
  "Windsor": "Windsor",
  "Winhall": "Bennington",
  "Winooski": "Chittenden",
  "Wolcott": "Lamoille",
  "Woodbury": "Washington",
  "Woodford": "Bennington",
  "Woodstock": "Windsor",
  "Worcester": "Washington"
};

// Population data for Vermont municipalities
const populations = {
  "Burlington": 45417,
  "South Burlington": 20292,
  "Rutland City": 15807,
  "Essex Junction": 10761,
  "Barre City": 8491,
  "Montpelier": 8074,
  "Winooski": 7997,
  "St. Albans City": 6877,
  "Newport City": 4589,
  "Vergennes": 2553,
  "Bennington": 15333,
  "Brattleboro": 12184,
  "St. Johnsbury": 7364,
  "Middlebury": 9152,
  "Colchester": 17496,
  "Essex": 22094,
  "Hartford": 10686,
  "Milton": 10723,
  "Williston": 10103,
  "Shelburne": 7977,
  "Jericho": 5371,
  "Hinesburg": 4707,
  "Richmond": 4167,
  "Underhill": 3175,
  "Charlotte": 3894,
  "Stowe": 5227,
  "Waterbury": 5310,
  "Morristown": 5991,
  "Johnson": 3536,
  "Hyde Park": 2954,
  "Cambridge": 3868,
  "Springfield": 9062,
  "Windsor": 3553,
  "Woodstock": 3048,
  "Ludlow": 1963,
  "Chester": 3154,
  "Randolph": 4853,
  "Northfield": 6207,
  "Barre Town": 7924,
  "Berlin": 2895,
  "Plainfield": 1343,
  "Marshfield": 1588,
  "Cabot": 1433,
  "Hardwick": 3010,
  "Lyndon": 5981,
  "Barnet": 1707,
  "Danville": 2211,
  "Peacham": 732,
  "Ryegate": 1173,
  "Groton": 1038,
  "Newbury": 2145,
  "Bradford": 2797,
  "Fairlee": 1050,
  "Thetford": 2639,
  "Norwich": 3544,
  "Sharon": 1502,
  "Royalton": 2773,
  "Bethel": 2030,
  "Rochester": 1139,
  "Pittsfield": 546,
  "Stockbridge": 756,
  "Barnard": 958,
  "Pomfret": 906,
  "Hartland": 3393,
  "Reading": 666,
  "Cavendish": 1367,
  "Weathersfield": 2825,
  "West Windsor": 1067,
  "Andover": 511,
  "Weston": 560,
  "Londonderry": 1770,
  "Jamaica": 1035,
  "Wardsboro": 904,
  "Dover": 1124,
  "Wilmington": 2225,
  "Whitingham": 1357,
  "Halifax": 746,
  "Guilford": 2121,
  "Vernon": 2206,
  "Dummerston": 1922,
  "Putney": 2702,
  "Westminster": 3210,
  "Grafton": 679,
  "Townshend": 1232,
  "Newfane": 1711,
  "Brookline": 531,
  "Athens": 384,
  "Rockingham": 5282,
  "Manchester": 4391,
  "Arlington": 2317,
  "Dorset": 2031,
  "Sunderland": 1053,
  "Sandgate": 407,
  "Rupert": 725,
  "Pawlet": 1447,
  "Danby": 1347,
  "Mount Tabor": 260,
  "Peru": 416,
  "Landgrove": 167,
  "Winhall": 769,
  "Stratton": 216,
  "Somerset": 2,
  "Searsburg": 109,
  "Readsboro": 737,
  "Stamford": 839,
  "Pownal": 3527,
  "Shaftsbury": 3573,
  "Glastenbury": 8,
  "Woodford": 461,
  "Rutland Town": 4054,
  "West Rutland": 2325,
  "Proctor": 1741,
  "Pittsford": 2955,
  "Brandon": 3972,
  "Leicester": 1099,
  "Salisbury": 1194,
  "Middletown Springs": 824,
  "Tinmouth": 567,
  "Wallingford": 2070,
  "Mount Holly": 1287,
  "Shrewsbury": 1056,
  "Clarendon": 2562,
  "Ira": 428,
  "Castleton": 4367,
  "Fair Haven": 2542,
  "West Haven": 274,
  "Benson": 1050,
  "Orwell": 1246,
  "Shoreham": 1300,
  "Hubbardton": 746,
  "Sudbury": 567,
  "Whiting": 457,
  "Poultney": 3341,
  "Wells": 1150,
  "Mendon": 1049,
  "Chittenden": 1337,
  "Addison": 1471,
  "Panton": 681,
  "Ferrisburgh": 2780,
  "Waltham": 480,
  "Weybridge": 856,
  "Cornwall": 1184,
  "Bridport": 1218,
  "Bristol": 3894,
  "Lincoln": 1271,
  "Ripton": 749,
  "Hancock": 323,
  "Granville": 309,
  "Goshen": 163,
  "Monkton": 2024,
  "Starksboro": 1821,
  "Grand Isle": 2135,
  "North Hero": 810,
  "South Hero": 1631,
  "Isle La Motte": 471,
  "Alburgh": 2141,
  "Swanton": 6427,
  "Highgate": 3646,
  "Franklin": 1394,
  "Berkshire": 1507,
  "Richford": 2308,
  "Montgomery": 1201,
  "Enosburg": 2788,
  "Sheldon": 2190,
  "Fairfield": 1874,
  "St. Albans Town": 6918,
  "Georgia": 4793,
  "Fairfax": 4285,
  "Fletcher": 1315,
  "Bakersfield": 1323,
  "Derby": 4621,
  "Newport Town": 1602,
  "Coventry": 1083,
  "Irasburg": 1163,
  "Albany": 941,
  "Barton": 2798,
  "Glover": 1122,
  "Greensboro": 762,
  "Craftsbury": 1206,
  "Wolcott": 1676,
  "Hardwick": 3010,
  "Lowell": 905,
  "Troy": 1654,
  "Jay": 524,
  "Westfield": 540,
  "Holland": 587,
  "Morgan": 727,
  "Charleston": 927,
  "Brownington": 999,
  "Westmore": 343,
  "Elmore": 855,
  "Eden": 1323,
  "Belvidere": 353,
  "Waterville": 697,
  "Canaan": 972,
  "Lemington": 90,
  "Bloomfield": 231,
  "Brunswick": 89,
  "Maidstone": 201,
  "Guildhall": 245,
  "Lunenburg": 1227,
  "Concord": 1338,
  "Victory": 62,
  "Granby": 89,
  "Ferdinand": 34,
  "East Haven": 286,
  "Newark": 595,
  "Sutton": 1011,
  "Burke": 1751,
  "Kirby": 520,
  "Sheffield": 728,
  "Wheelock": 838,
  "Walden": 938,
  "Stannard": 216,
  "Waterford": 1338,
  "Barnet": 1707,
  "Calais": 1607,
  "East Montpelier": 2576,
  "Middlesex": 1751,
  "Moretown": 1658,
  "Duxbury": 1337,
  "Fayston": 1353,
  "Waitsfield": 1719,
  "Warren": 1705,
  "Roxbury": 693,
  "Woodbury": 928,
  "Worcester": 1043,
  "Bolton": 1182,
  "Huntington": 2018,
  "Buels Gore": 12,
  "St. George": 674,
  "Westford": 2029,
  "Brighton": 1182,
  "Norton": 200,
  "Averill": 23,
  "Lewis": 30,
  "Avery's Gore": 0,
  "Orange": 1107,
  "Washington": 1048,
  "Williamstown": 3515,
  "Chelsea": 1238,
  "Tunbridge": 1309,
  "Strafford": 1045,
  "Vershire": 708,
  "West Fairlee": 658,
  "Corinth": 1513,
  "Topsham": 1195,
  "Braintree": 1302
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
  "Ski Shop", "Maple Syrup Farm", "Craft Brewery", "Inn",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Vermont regions
const namePrefixes = [
  "Green Mountain", "Vermont", "New England", "Maple", "Colonial",
  "Valley", "Mountain", "Lake Champlain", "Northeast Kingdom", "Heritage",
  "Yankee", "Alpine", "Covered Bridge", "Sugar House", "Countryside"
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
      address: `${townName}, VT`,
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

for (const [town, county] of Object.entries(vermontTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Vermont",
    state_abbr: "VT",
    county: county,
    population: population,
    slug: `${slug}-vt`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-vt.json`),
    JSON.stringify(townData, null, 2)
  );

  const mdContent = `---
title: "${town}, VT Business Directory"
type: "towns"
slug: "${slug}-vt"
state: "vt"
town_data: "${slug}-vt"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-vt.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Vermont Business Directory"
slug: "vt"
state: "vt"
state_name: "Vermont"
---
`;
fs.writeFileSync(path.join(statesDir, 'vt.md'), stateMd);

console.log(`Created Vermont towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
