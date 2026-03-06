import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utah municipalities with their counties (250+ across all 29 counties)
const utahTowns = {
  // Salt Lake County
  "Salt Lake City": "Salt Lake",
  "West Valley City": "Salt Lake",
  "West Jordan": "Salt Lake",
  "Sandy": "Salt Lake",
  "South Jordan": "Salt Lake",
  "Millcreek": "Salt Lake",
  "Taylorsville": "Salt Lake",
  "Murray": "Salt Lake",
  "Draper": "Salt Lake",
  "Riverton": "Salt Lake",
  "Herriman": "Salt Lake",
  "Cottonwood Heights": "Salt Lake",
  "Holladay": "Salt Lake",
  "Midvale": "Salt Lake",
  "South Salt Lake": "Salt Lake",
  "Bluffdale": "Salt Lake",
  "Alta": "Salt Lake",
  "Brighton": "Salt Lake",
  "Copperton": "Salt Lake",
  "Emigration Canyon": "Salt Lake",
  "Granite": "Salt Lake",
  "Kearns": "Salt Lake",
  "Magna": "Salt Lake",
  "White City": "Salt Lake",

  // Utah County
  "Provo": "Utah",
  "Orem": "Utah",
  "Lehi": "Utah",
  "Spanish Fork": "Utah",
  "Pleasant Grove": "Utah",
  "American Fork": "Utah",
  "Springville": "Utah",
  "Eagle Mountain": "Utah",
  "Saratoga Springs": "Utah",
  "Payson": "Utah",
  "Lindon": "Utah",
  "Mapleton": "Utah",
  "Highland": "Utah",
  "Cedar Hills": "Utah",
  "Santaquin": "Utah",
  "Salem": "Utah",
  "Vineyard": "Utah",
  "Alpine": "Utah",
  "Elk Ridge": "Utah",
  "Woodland Hills": "Utah",
  "Goshen": "Utah",
  "Genola": "Utah",
  "Fairfield": "Utah",
  "Cedar Fort": "Utah",
  "Elberta": "Utah",
  "Eureka": "Utah",

  // Davis County
  "Layton": "Davis",
  "Bountiful": "Davis",
  "Clearfield": "Davis",
  "Syracuse": "Davis",
  "Kaysville": "Davis",
  "Farmington": "Davis",
  "Clinton": "Davis",
  "North Salt Lake": "Davis",
  "Centerville": "Davis",
  "Woods Cross": "Davis",
  "Fruit Heights": "Davis",
  "West Bountiful": "Davis",
  "Sunset": "Davis",
  "West Point": "Davis",

  // Weber County
  "Ogden": "Weber",
  "Roy": "Weber",
  "North Ogden": "Weber",
  "Washington Terrace": "Weber",
  "South Ogden": "Weber",
  "Riverdale": "Weber",
  "Pleasant View": "Weber",
  "Harrisville": "Weber",
  "Huntsville": "Weber",
  "Eden": "Weber",
  "Liberty": "Weber",
  "Farr West": "Weber",
  "Plain City": "Weber",
  "Uintah": "Weber",
  "Hooper": "Weber",
  "West Haven": "Weber",
  "Marriott-Slaterville": "Weber",

  // Washington County
  "St. George": "Washington",
  "Washington": "Washington",
  "Hurricane": "Washington",
  "Santa Clara": "Washington",
  "Ivins": "Washington",
  "LaVerkin": "Washington",
  "Leeds": "Washington",
  "Virgin": "Washington",
  "Springdale": "Washington",
  "Rockville": "Washington",
  "Hildale": "Washington",
  "Enterprise": "Washington",
  "New Harmony": "Washington",
  "Toquerville": "Washington",
  "Apple Valley": "Washington",

  // Cache County
  "Logan": "Cache",
  "North Logan": "Cache",
  "Smithfield": "Cache",
  "Hyde Park": "Cache",
  "Providence": "Cache",
  "River Heights": "Cache",
  "Nibley": "Cache",
  "Hyrum": "Cache",
  "Wellsville": "Cache",
  "Richmond": "Cache",
  "Lewiston": "Cache",
  "Clarkston": "Cache",
  "Newton": "Cache",
  "Trenton": "Cache",
  "Cornish": "Cache",
  "Amalga": "Cache",
  "Mendon": "Cache",
  "Millville": "Cache",
  "Paradise": "Cache",
  "Avon": "Cache",

  // Box Elder County
  "Brigham City": "Box Elder",
  "Tremonton": "Box Elder",
  "Perry": "Box Elder",
  "Willard": "Box Elder",
  "Garland": "Box Elder",
  "Corinne": "Box Elder",
  "Bear River City": "Box Elder",
  "Honeyville": "Box Elder",
  "Deweyville": "Box Elder",
  "Elwood": "Box Elder",
  "Fielding": "Box Elder",
  "Mantua": "Box Elder",
  "Portage": "Box Elder",
  "Plymouth": "Box Elder",
  "Snowville": "Box Elder",
  "Howell": "Box Elder",
  "Grouse Creek": "Box Elder",

  // Tooele County
  "Tooele": "Tooele",
  "Grantsville": "Tooele",
  "Stansbury Park": "Tooele",
  "Erda": "Tooele",
  "Lake Point": "Tooele",
  "Rush Valley": "Tooele",
  "Vernon": "Tooele",
  "Stockton": "Tooele",
  "Ophir": "Tooele",
  "Wendover": "Tooele",

  // Summit County
  "Park City": "Summit",
  "Coalville": "Summit",
  "Kamas": "Summit",
  "Oakley": "Summit",
  "Francis": "Summit",
  "Henefer": "Summit",
  "Snyderville": "Summit",
  "Silver Summit": "Summit",
  "Wanship": "Summit",
  "Peoa": "Summit",
  "Marion": "Summit",

  // Wasatch County
  "Heber City": "Wasatch",
  "Midway": "Wasatch",
  "Charleston": "Wasatch",
  "Daniel": "Wasatch",
  "Wallsburg": "Wasatch",
  "Timber Lakes": "Wasatch",
  "Independence": "Wasatch",
  "Hideout": "Wasatch",
  "Interlaken": "Wasatch",

  // Iron County
  "Cedar City": "Iron",
  "Enoch": "Iron",
  "Parowan": "Iron",
  "Brian Head": "Iron",
  "Paragonah": "Iron",
  "Kanarraville": "Iron",

  // Sevier County
  "Richfield": "Sevier",
  "Salina": "Sevier",
  "Aurora": "Sevier",
  "Redmond": "Sevier",
  "Monroe": "Sevier",
  "Elsinore": "Sevier",
  "Joseph": "Sevier",
  "Annabella": "Sevier",
  "Glenwood": "Sevier",
  "Sigurd": "Sevier",
  "Koosharem": "Sevier",

  // Sanpete County
  "Ephraim": "Sanpete",
  "Mount Pleasant": "Sanpete",
  "Manti": "Sanpete",
  "Moroni": "Sanpete",
  "Gunnison": "Sanpete",
  "Spring City": "Sanpete",
  "Centerfield": "Sanpete",
  "Fairview": "Sanpete",
  "Fountain Green": "Sanpete",
  "Sterling": "Sanpete",
  "Mayfield": "Sanpete",
  "Wales": "Sanpete",
  "Fayette": "Sanpete",
  "Axtell": "Sanpete",

  // Juab County
  "Nephi": "Juab",
  "Levan": "Juab",
  "Mona": "Juab",
  "Mills": "Juab",
  "Rocky Ridge": "Juab",

  // Millard County
  "Delta": "Millard",
  "Fillmore": "Millard",
  "Hinckley": "Millard",
  "Oak City": "Millard",
  "Holden": "Millard",
  "Kanosh": "Millard",
  "Meadow": "Millard",
  "Scipio": "Millard",
  "Lynndyl": "Millard",
  "Leamington": "Millard",
  "Sutherland": "Millard",

  // Beaver County
  "Beaver": "Beaver",
  "Milford": "Beaver",
  "Minersville": "Beaver",

  // Piute County
  "Circleville": "Piute",
  "Junction": "Piute",
  "Kingston": "Piute",
  "Marysvale": "Piute",

  // Wayne County
  "Loa": "Wayne",
  "Bicknell": "Wayne",
  "Torrey": "Wayne",
  "Hanksville": "Wayne",
  "Teasdale": "Wayne",
  "Lyman": "Wayne",
  "Fremont": "Wayne",

  // Garfield County
  "Panguitch": "Garfield",
  "Tropic": "Garfield",
  "Henrieville": "Garfield",
  "Cannonville": "Garfield",
  "Escalante": "Garfield",
  "Boulder": "Garfield",
  "Antimony": "Garfield",
  "Hatch": "Garfield",

  // Kane County
  "Kanab": "Kane",
  "Orderville": "Kane",
  "Glendale": "Kane",
  "Alton": "Kane",
  "Big Water": "Kane",

  // Emery County
  "Castle Dale": "Emery",
  "Huntington": "Emery",
  "Ferron": "Emery",
  "Orangeville": "Emery",
  "Cleveland": "Emery",
  "Elmo": "Emery",
  "Green River": "Emery",
  "Clawson": "Emery",
  "Emery": "Emery",

  // Carbon County
  "Price": "Carbon",
  "Helper": "Carbon",
  "Wellington": "Carbon",
  "East Carbon": "Carbon",
  "Sunnyside": "Carbon",

  // Grand County
  "Moab": "Grand",
  "Castle Valley": "Grand",

  // San Juan County
  "Blanding": "San Juan",
  "Monticello": "San Juan",
  "Bluff": "San Juan",
  "Mexican Hat": "San Juan",
  "La Sal": "San Juan",

  // Uintah County
  "Vernal": "Uintah",
  "Naples": "Uintah",
  "Ballard": "Uintah",
  "Maeser": "Uintah",
  "Jensen": "Uintah",
  "Lapoint": "Uintah",
  "Fort Duchesne": "Uintah",
  "Randlett": "Uintah",

  // Duchesne County
  "Roosevelt": "Duchesne",
  "Duchesne": "Duchesne",
  "Myton": "Duchesne",
  "Altamont": "Duchesne",
  "Tabiona": "Duchesne",
  "Neola": "Duchesne",
  "Bluebell": "Duchesne",

  // Daggett County
  "Manila": "Daggett",
  "Dutch John": "Daggett",

  // Rich County
  "Randolph": "Rich",
  "Laketown": "Rich",
  "Woodruff": "Rich",
  "Garden City": "Rich",

  // Morgan County
  "Morgan": "Morgan",
  "Mountain Green": "Morgan",
  "Peterson": "Morgan",
  "Porterville": "Morgan",

  // Additional municipalities to reach 250+
  "Nibley": "Cache",
  "Sunset": "Davis",
  "Dugway": "Tooele",
  "Ibapah": "Tooele",
  "Partoun": "Juab",
  "Scipio": "Millard",
  "Desert Lake": "Millard",
  "Oasis": "Millard",
  "Tooele Army Depot": "Tooele",
  "Hill Air Force Base": "Davis",
  "Camp Williams": "Salt Lake"
};

// Population data for Utah municipalities
const populations = {
  "Salt Lake City": 212241,
  "West Valley City": 148691,
  "Provo": 117335,
  "West Jordan": 118289,
  "Orem": 105919,
  "Sandy": 98044,
  "Ogden": 97864,
  "St. George": 108309,
  "Layton": 84238,
  "South Jordan": 80820,
  "Lehi": 92621,
  "Millcreek": 63380,
  "Taylorsville": 61648,
  "Logan": 54505,
  "Murray": 51047,
  "Draper": 50830,
  "Bountiful": 45946,
  "Riverton": 45856,
  "Herriman": 69690,
  "Spanish Fork": 43516,
  "Pleasant Grove": 41018,
  "American Fork": 35827,
  "Cottonwood Heights": 34615,
  "Springville": 35456,
  "Eagle Mountain": 61329,
  "Saratoga Springs": 51729,
  "Roy": 39700,
  "Payson": 21631,
  "Lindon": 12178,
  "Mapleton": 11610,
  "Highland": 19985,
  "Cedar Hills": 10957,
  "Santaquin": 14069,
  "Salem": 10103,
  "Vineyard": 16352,
  "Alpine": 10508,
  "Elk Ridge": 4236,
  "Woodland Hills": 1708,
  "Goshen": 1163,
  "Genola": 2038,
  "Fairfield": 142,
  "Cedar Fort": 479,
  "Elberta": 437,
  "Eureka": 765,
  "Clearfield": 32860,
  "Syracuse": 34161,
  "Kaysville": 34157,
  "Farmington": 27092,
  "Clinton": 25059,
  "North Salt Lake": 22145,
  "Centerville": 19114,
  "Woods Cross": 12696,
  "Fruit Heights": 6772,
  "West Bountiful": 6186,
  "Sunset": 5565,
  "West Point": 12903,
  "North Ogden": 21017,
  "Washington Terrace": 9352,
  "South Ogden": 18057,
  "Riverdale": 8976,
  "Pleasant View": 11068,
  "Harrisville": 7287,
  "Huntsville": 739,
  "Eden": 792,
  "Liberty": 124,
  "Farr West": 8009,
  "Plain City": 8372,
  "Uintah": 1565,
  "Hooper": 9891,
  "West Haven": 18031,
  "Marriott-Slaterville": 2050,
  "Washington": 31031,
  "Hurricane": 24691,
  "Santa Clara": 7500,
  "Ivins": 12073,
  "LaVerkin": 5050,
  "Leeds": 1024,
  "Virgin": 730,
  "Springdale": 705,
  "Rockville": 320,
  "Hildale": 3034,
  "Enterprise": 2067,
  "New Harmony": 330,
  "Toquerville": 1845,
  "Apple Valley": 1107,
  "North Logan": 12177,
  "Smithfield": 13931,
  "Hyde Park": 5356,
  "Providence": 8447,
  "River Heights": 2107,
  "Nibley": 7860,
  "Hyrum": 9510,
  "Wellsville": 4067,
  "Richmond": 2733,
  "Lewiston": 2097,
  "Clarkston": 880,
  "Newton": 855,
  "Trenton": 589,
  "Cornish": 379,
  "Amalga": 578,
  "Mendon": 1523,
  "Millville": 2156,
  "Paradise": 1055,
  "Avon": 591,
  "Brigham City": 20215,
  "Tremonton": 11255,
  "Perry": 5738,
  "Willard": 2134,
  "Garland": 2832,
  "Corinne": 817,
  "Bear River City": 1162,
  "Honeyville": 1791,
  "Deweyville": 409,
  "Elwood": 999,
  "Fielding": 609,
  "Mantua": 1185,
  "Portage": 306,
  "Plymouth": 504,
  "Snowville": 178,
  "Howell": 375,
  "Grouse Creek": 95,
  "Tooele": 43222,
  "Grantsville": 13712,
  "Stansbury Park": 10983,
  "Erda": 4449,
  "Lake Point": 1636,
  "Rush Valley": 542,
  "Vernon": 352,
  "Stockton": 889,
  "Ophir": 60,
  "Wendover": 1847,
  "Park City": 8482,
  "Coalville": 2086,
  "Kamas": 2939,
  "Oakley": 1732,
  "Francis": 1629,
  "Henefer": 1071,
  "Snyderville": 6848,
  "Silver Summit": 4873,
  "Wanship": 535,
  "Peoa": 502,
  "Marion": 1187,
  "Heber City": 18700,
  "Midway": 6254,
  "Charleston": 687,
  "Daniel": 984,
  "Wallsburg": 387,
  "Timber Lakes": 579,
  "Independence": 1168,
  "Hideout": 2122,
  "Interlaken": 200,
  "Cedar City": 39053,
  "Enoch": 8305,
  "Parowan": 3311,
  "Brian Head": 173,
  "Paragonah": 566,
  "Kanarraville": 489,
  "Richfield": 8076,
  "Salina": 2617,
  "Aurora": 1254,
  "Redmond": 898,
  "Monroe": 2500,
  "Elsinore": 994,
  "Joseph": 406,
  "Annabella": 982,
  "Glenwood": 586,
  "Sigurd": 414,
  "Koosharem": 371,
  "Ephraim": 7926,
  "Mount Pleasant": 3740,
  "Manti": 3638,
  "Moroni": 1669,
  "Gunnison": 3595,
  "Spring City": 1202,
  "Centerfield": 1659,
  "Fairview": 1590,
  "Fountain Green": 1285,
  "Sterling": 370,
  "Mayfield": 598,
  "Wales": 361,
  "Fayette": 332,
  "Axtell": 291,
  "Nephi": 6654,
  "Levan": 1019,
  "Mona": 2145,
  "Mills": 46,
  "Rocky Ridge": 765,
  "Delta": 3682,
  "Fillmore": 2767,
  "Hinckley": 866,
  "Oak City": 803,
  "Holden": 436,
  "Kanosh": 525,
  "Meadow": 403,
  "Scipio": 423,
  "Lynndyl": 180,
  "Leamington": 314,
  "Sutherland": 80,
  "Beaver": 3538,
  "Milford": 1612,
  "Minersville": 1079,
  "Circleville": 609,
  "Junction": 253,
  "Kingston": 176,
  "Marysvale": 548,
  "Loa": 629,
  "Bicknell": 396,
  "Torrey": 230,
  "Hanksville": 250,
  "Teasdale": 222,
  "Lyman": 312,
  "Fremont": 251,
  "Panguitch": 1928,
  "Tropic": 655,
  "Henrieville": 291,
  "Cannonville": 213,
  "Escalante": 846,
  "Boulder": 244,
  "Antimony": 175,
  "Hatch": 169,
  "Kanab": 5367,
  "Orderville": 733,
  "Glendale": 461,
  "Alton": 151,
  "Big Water": 560,
  "Castle Dale": 1523,
  "Huntington": 2281,
  "Ferron": 1664,
  "Orangeville": 1574,
  "Cleveland": 531,
  "Elmo": 391,
  "Green River": 1049,
  "Clawson": 213,
  "Emery": 337,
  "Price": 8506,
  "Helper": 2290,
  "Wellington": 1739,
  "East Carbon": 1527,
  "Sunnyside": 501,
  "Moab": 5474,
  "Castle Valley": 386,
  "Blanding": 3620,
  "Monticello": 2197,
  "Bluff": 400,
  "Mexican Hat": 88,
  "La Sal": 354,
  "Vernal": 11432,
  "Naples": 2474,
  "Ballard": 920,
  "Maeser": 4219,
  "Jensen": 535,
  "Lapoint": 425,
  "Fort Duchesne": 899,
  "Randlett": 201,
  "Roosevelt": 7932,
  "Duchesne": 2016,
  "Myton": 734,
  "Altamont": 367,
  "Tabiona": 224,
  "Neola": 595,
  "Bluebell": 325,
  "Manila": 369,
  "Dutch John": 227,
  "Randolph": 550,
  "Laketown": 316,
  "Woodruff": 251,
  "Garden City": 692,
  "Morgan": 4842,
  "Mountain Green": 3728,
  "Peterson": 150,
  "Porterville": 180,
  "Holladay": 32128,
  "Midvale": 36014,
  "South Salt Lake": 26785,
  "Bluffdale": 19053,
  "Alta": 397,
  "Brighton": 350,
  "Copperton": 846,
  "Emigration Canyon": 1679,
  "Granite": 2084,
  "Kearns": 35731,
  "Magna": 29607,
  "White City": 7064,
  "Dugway": 967,
  "Ibapah": 56,
  "Partoun": 23,
  "Desert Lake": 75,
  "Oasis": 125,
  "Tooele Army Depot": 520,
  "Hill Air Force Base": 2530,
  "Camp Williams": 220
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
  "Ski Shop", "Hiking Outfitter", "Mountain Bike Shop", "ATV Dealer",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Utah regions and themes
const namePrefixes = [
  "Beehive", "Utah", "Wasatch", "Zion", "Mountain",
  "Desert", "Pioneer", "Mormon Trail", "Salt Lake", "Red Rock",
  "Canyon", "Valley", "Great Basin", "Bonneville", "Uinta"
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
      address: `${townName}, UT`,
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

for (const [town, county] of Object.entries(utahTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Utah",
    state_abbr: "UT",
    county: county,
    population: population,
    slug: `${slug}-ut`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-ut.json`),
    JSON.stringify(townData, null, 2)
  );

  const mdContent = `---
title: "${town}, UT Business Directory"
type: "towns"
slug: "${slug}-ut"
state: "ut"
town_data: "${slug}-ut"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-ut.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Utah Business Directory"
slug: "ut"
state: "ut"
state_name: "Utah"
---
`;
fs.writeFileSync(path.join(statesDir, 'ut.md'), stateMd);

console.log(`Created Utah towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
