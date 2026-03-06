import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Maine municipalities with their counties (16 counties)
const maineTowns = {
  // Cumberland County (Portland area)
  "Portland": "Cumberland",
  "South Portland": "Cumberland",
  "Westbrook": "Cumberland",
  "Scarborough": "Cumberland",
  "Brunswick": "Cumberland",
  "Gorham": "Cumberland",
  "Windham": "Cumberland",
  "Falmouth": "Cumberland",
  "Cape Elizabeth": "Cumberland",
  "Yarmouth": "Cumberland",
  "Freeport": "Cumberland",
  "Gray": "Cumberland",
  "Cumberland": "Cumberland",
  "Standish": "Cumberland",
  "Raymond": "Cumberland",
  "Bridgton": "Cumberland",
  "Harrison": "Cumberland",
  "Naples": "Cumberland",
  "Casco": "Cumberland",
  "Sebago": "Cumberland",
  "New Gloucester": "Cumberland",
  "Pownal": "Cumberland",
  "North Yarmouth": "Cumberland",
  "Long Island": "Cumberland",
  "Chebeague Island": "Cumberland",
  "Harpswell": "Cumberland",
  "Baldwin": "Cumberland",

  // York County
  "Biddeford": "York",
  "Saco": "York",
  "Sanford": "York",
  "Kennebunk": "York",
  "Kittery": "York",
  "York": "York",
  "Eliot": "York",
  "South Berwick": "York",
  "Berwick": "York",
  "Wells": "York",
  "Kennebunkport": "York",
  "Old Orchard Beach": "York",
  "Buxton": "York",
  "Waterboro": "York",
  "Arundel": "York",
  "Alfred": "York",
  "Lebanon": "York",
  "North Berwick": "York",
  "Ogunquit": "York",
  "Hollis": "York",
  "Limerick": "York",
  "Cornish": "York",
  "Dayton": "York",
  "Shapleigh": "York",
  "Acton": "York",
  "Parsonsfield": "York",
  "Newfield": "York",
  "Lyman": "York",
  "Limington": "York",

  // Penobscot County (Bangor area)
  "Bangor": "Penobscot",
  "Brewer": "Penobscot",
  "Old Town": "Penobscot",
  "Orono": "Penobscot",
  "Hampden": "Penobscot",
  "Hermon": "Penobscot",
  "Milford": "Penobscot",
  "Bradley": "Penobscot",
  "Eddington": "Penobscot",
  "Veazie": "Penobscot",
  "Glenburn": "Penobscot",
  "Corinth": "Penobscot",
  "Newport": "Penobscot",
  "Dexter": "Penobscot",
  "Lincoln": "Penobscot",
  "Orrington": "Penobscot",
  "Kenduskeag": "Penobscot",
  "Levant": "Penobscot",
  "Etna": "Penobscot",
  "Carmel": "Penobscot",
  "Dixmont": "Penobscot",
  "Plymouth": "Penobscot",
  "Exeter": "Penobscot",
  "Corinna": "Penobscot",
  "Stetson": "Penobscot",
  "Hudson": "Penobscot",
  "Bradford": "Penobscot",
  "Charleston": "Penobscot",
  "Dover-Foxcroft": "Penobscot",
  "Greenville": "Penobscot",
  "Milo": "Penobscot",
  "Howland": "Penobscot",
  "Mattawamkeag": "Penobscot",
  "Lee": "Penobscot",
  "Springfield": "Penobscot",
  "Stacyville": "Penobscot",
  "Millinocket": "Penobscot",
  "East Millinocket": "Penobscot",
  "Medway": "Penobscot",

  // Kennebec County (Augusta area)
  "Augusta": "Kennebec",
  "Waterville": "Kennebec",
  "Winslow": "Kennebec",
  "Oakland": "Kennebec",
  "Gardiner": "Kennebec",
  "Hallowell": "Kennebec",
  "Farmingdale": "Kennebec",
  "China": "Kennebec",
  "Sidney": "Kennebec",
  "Vassalboro": "Kennebec",
  "Winthrop": "Kennebec",
  "Monmouth": "Kennebec",
  "Readfield": "Kennebec",
  "Belgrade": "Kennebec",
  "Clinton": "Kennebec",
  "Albion": "Kennebec",
  "Benton": "Kennebec",
  "Unity Township": "Kennebec",
  "Manchester": "Kennebec",
  "West Gardiner": "Kennebec",
  "Litchfield": "Kennebec",
  "Chelsea": "Kennebec",
  "Pittston": "Kennebec",
  "Randolph": "Kennebec",
  "Fayette": "Kennebec",
  "Wayne": "Kennebec",
  "Vienna": "Kennebec",
  "Rome": "Kennebec",
  "Mount Vernon": "Kennebec",

  // Androscoggin County (Lewiston area)
  "Lewiston": "Androscoggin",
  "Auburn": "Androscoggin",
  "Lisbon": "Androscoggin",
  "Sabattus": "Androscoggin",
  "Mechanic Falls": "Androscoggin",
  "Poland": "Androscoggin",
  "Minot": "Androscoggin",
  "Greene": "Androscoggin",
  "Turner": "Androscoggin",
  "Leeds": "Androscoggin",
  "Livermore": "Androscoggin",
  "Livermore Falls": "Androscoggin",
  "Wales": "Androscoggin",
  "Durham": "Androscoggin",

  // Aroostook County (Presque Isle area)
  "Presque Isle": "Aroostook",
  "Caribou": "Aroostook",
  "Houlton": "Aroostook",
  "Fort Kent": "Aroostook",
  "Madawaska": "Aroostook",
  "Limestone": "Aroostook",
  "Mars Hill": "Aroostook",
  "Fort Fairfield": "Aroostook",
  "Van Buren": "Aroostook",
  "Ashland": "Aroostook",
  "Washburn": "Aroostook",
  "Easton": "Aroostook",
  "Mapleton": "Aroostook",
  "Sherman": "Aroostook",
  "Island Falls": "Aroostook",
  "Patten": "Aroostook",
  "Hodgdon": "Aroostook",
  "Littleton": "Aroostook",
  "Monticello": "Aroostook",
  "Bridgewater": "Aroostook",
  "Blaine": "Aroostook",
  "Stockholm": "Aroostook",
  "New Sweden": "Aroostook",
  "Woodland": "Aroostook",
  "Frenchville": "Aroostook",
  "St. Agatha": "Aroostook",
  "St. Francis": "Aroostook",
  "Eagle Lake": "Aroostook",
  "Portage Lake": "Aroostook",

  // Knox County (Rockland area)
  "Rockland": "Knox",
  "Camden": "Knox",
  "Rockport": "Knox",
  "Thomaston": "Knox",
  "Warren": "Knox",
  "Union": "Knox",
  "Vinalhaven": "Knox",
  "North Haven": "Knox",
  "St. George": "Knox",
  "Owls Head": "Knox",
  "South Thomaston": "Knox",
  "Cushing": "Knox",
  "Friendship": "Knox",
  "Appleton": "Knox",
  "Hope": "Knox",
  "Washington": "Knox",
  "Isle au Haut": "Knox",
  "Matinicus Isle": "Knox",

  // Lincoln County
  "Waldoboro": "Lincoln",
  "Boothbay Harbor": "Lincoln",
  "Boothbay": "Lincoln",
  "Damariscotta": "Lincoln",
  "Newcastle": "Lincoln",
  "Wiscasset": "Lincoln",
  "Bristol": "Lincoln",
  "Edgecomb": "Lincoln",
  "Westport Island": "Lincoln",
  "Southport": "Lincoln",
  "Jefferson": "Lincoln",
  "Nobleboro": "Lincoln",
  "Whitefield": "Lincoln",
  "Alna": "Lincoln",
  "Dresden": "Lincoln",
  "Somerville": "Lincoln",
  "South Bristol": "Lincoln",
  "Bremen": "Lincoln",
  "Monhegan": "Lincoln",

  // Sagadahoc County
  "Bath": "Sagadahoc",
  "Topsham": "Sagadahoc",
  "Woolwich": "Sagadahoc",
  "Bowdoin": "Sagadahoc",
  "Bowdoinham": "Sagadahoc",
  "Richmond": "Sagadahoc",
  "Phippsburg": "Sagadahoc",
  "Georgetown": "Sagadahoc",
  "West Bath": "Sagadahoc",
  "Arrowsic": "Sagadahoc",

  // Hancock County (Ellsworth area)
  "Ellsworth": "Hancock",
  "Bar Harbor": "Hancock",
  "Blue Hill": "Hancock",
  "Bucksport": "Hancock",
  "Castine": "Hancock",
  "Deer Isle": "Hancock",
  "Stonington": "Hancock",
  "Southwest Harbor": "Hancock",
  "Mount Desert": "Hancock",
  "Hancock": "Hancock",
  "Lamoine": "Hancock",
  "Trenton": "Hancock",
  "Surry": "Hancock",
  "Sedgwick": "Hancock",
  "Brooklin": "Hancock",
  "Brooksville": "Hancock",
  "Penobscot": "Hancock",
  "Orland": "Hancock",
  "Verona Island": "Hancock",
  "Tremont": "Hancock",
  "Franklin": "Hancock",
  "Sullivan": "Hancock",
  "Sorrento": "Hancock",
  "Winter Harbor": "Hancock",
  "Gouldsboro": "Hancock",

  // Washington County (Machias area)
  "Machias": "Washington",
  "Calais": "Washington",
  "Eastport": "Washington",
  "Lubec": "Washington",
  "Milbridge": "Washington",
  "Jonesport": "Washington",
  "Harrington": "Washington",
  "Columbia Falls": "Washington",
  "Cherryfield": "Washington",
  "Addison": "Washington",
  "Baileyville": "Washington",
  "Princeton": "Washington",
  "Pembroke": "Washington",
  "Dennysville": "Washington",
  "Whiting": "Washington",
  "Cutler": "Washington",
  "Machiasport": "Washington",
  "East Machias": "Washington",
  "Jonesboro": "Washington",
  "Steuben": "Washington",
  "Beals": "Washington",

  // Waldo County
  "Belfast": "Waldo",
  "Searsport": "Waldo",
  "Stockton Springs": "Waldo",
  "Winterport": "Waldo",
  "Frankfort": "Waldo",
  "Brooks": "Waldo",
  "Jackson": "Waldo",
  "Monroe": "Waldo",
  "Unity": "Waldo",
  "Thorndike": "Waldo",
  "Freedom": "Waldo",
  "Montville": "Waldo",
  "Liberty": "Waldo",
  "Palermo": "Waldo",
  "Searsmont": "Waldo",
  "Lincolnville": "Waldo",
  "Northport": "Waldo",
  "Islesboro": "Waldo",
  "Waldo": "Waldo",
  "Swanville": "Waldo",
  "Prospect": "Waldo",
  "Burnham": "Waldo",
  "Troy": "Waldo",
  "Morrill": "Waldo",
  "Belmont": "Waldo",

  // Somerset County
  "Skowhegan": "Somerset",
  "Fairfield": "Somerset",
  "Madison": "Somerset",
  "Norridgewock": "Somerset",
  "Pittsfield": "Somerset",
  "Hartland": "Somerset",
  "Canaan": "Somerset",
  "Anson": "Somerset",
  "Solon": "Somerset",
  "Embden": "Somerset",
  "New Portland": "Somerset",
  "Athens": "Somerset",
  "Mercer": "Somerset",
  "Smithfield": "Somerset",
  "Bingham": "Somerset",
  "Moscow": "Somerset",
  "Caratunk": "Somerset",
  "The Forks": "Somerset",
  "Jackman": "Somerset",
  "Moose River": "Somerset",
  "Cornville": "Somerset",
  "St. Albans": "Somerset",
  "Ripley": "Somerset",
  "Cambridge": "Somerset",
  "Harmony": "Somerset",
  "Wellington": "Somerset",
  "Palmyra": "Somerset",
  "Detroit": "Somerset",

  // Oxford County
  "Norway": "Oxford",
  "South Paris": "Oxford",
  "Paris": "Oxford",
  "Oxford": "Oxford",
  "Mechanic Falls": "Oxford",
  "Rumford": "Oxford",
  "Mexico": "Oxford",
  "Dixfield": "Oxford",
  "Bethel": "Oxford",
  "Bryant Pond": "Oxford",
  "Buckfield": "Oxford",
  "Hebron": "Oxford",
  "Fryeburg": "Oxford",
  "Brownfield": "Oxford",
  "Denmark": "Oxford",
  "Hiram": "Oxford",
  "Porter": "Oxford",
  "Lovell": "Oxford",
  "Sweden": "Oxford",
  "Waterford": "Oxford",
  "Stoneham": "Oxford",
  "Albany": "Oxford",
  "Stow": "Oxford",
  "Gilead": "Oxford",
  "Newry": "Oxford",
  "Hanover": "Oxford",
  "Andover": "Oxford",
  "Byron": "Oxford",
  "Roxbury": "Oxford",
  "Canton": "Oxford",
  "Peru": "Oxford",
  "Sumner": "Oxford",
  "Hartford": "Oxford",
  "West Paris": "Oxford",
  "Greenwood": "Oxford",
  "Woodstock": "Oxford",

  // Franklin County
  "Farmington": "Franklin",
  "Jay": "Franklin",
  "Wilton": "Franklin",
  "Rangeley": "Franklin",
  "Strong": "Franklin",
  "Phillips": "Franklin",
  "Kingfield": "Franklin",
  "Carrabassett Valley": "Franklin",
  "New Sharon": "Franklin",
  "Industry": "Franklin",
  "Temple": "Franklin",
  "Chesterville": "Franklin",
  "New Vineyard": "Franklin",
  "Avon": "Franklin",
  "Eustis": "Franklin",
  "Stratton": "Franklin",
  "Weld": "Franklin",

  // Piscataquis County
  "Dover-Foxcroft": "Piscataquis",
  "Greenville": "Piscataquis",
  "Milo": "Piscataquis",
  "Guilford": "Piscataquis",
  "Sangerville": "Piscataquis",
  "Brownville": "Piscataquis",
  "Sebec": "Piscataquis",
  "Abbot": "Piscataquis",
  "Parkman": "Piscataquis",
  "Monson": "Piscataquis",
  "Shirley": "Piscataquis",
  "Atkinson": "Piscataquis",
  "Bowerbank": "Piscataquis",
  "Lake View": "Piscataquis",
  "Medford": "Piscataquis"
};

// Population estimates for Maine cities
const populations = {
  "Portland": 68408,
  "Lewiston": 36592,
  "Bangor": 31903,
  "South Portland": 26498,
  "Auburn": 23033,
  "Biddeford": 21782,
  "Sanford": 21893,
  "Brunswick": 21756,
  "Saco": 19806,
  "Augusta": 18681,
  "Westbrook": 19707,
  "Scarborough": 20920,
  "Waterville": 16579,
  "Windham": 18472,
  "Gorham": 18232,
  "Kennebunk": 11933,
  "Orono": 11213,
  "Presque Isle": 9078,
  "Hampden": 7525,
  "Brewer": 9482,
  "Bath": 8333,
  "Caribou": 7604,
  "Ellsworth": 8399,
  "Old Town": 7520,
  "Topsham": 8893,
  "Lisbon": 9009,
  "Gardiner": 5670,
  "Falmouth": 12023,
  "Rockland": 7297,
  "Winslow": 7794,
  "Oakland": 6124,
  "Farmington": 7760,
  "Houlton": 5959,
  "Fort Kent": 4088,
  "Camden": 5232,
  "Belfast": 6938,
  "Skowhegan": 8552,
  "Rumford": 5841,
  "Hermon": 5977,
  "York": 13723,
  "Kittery": 9707,
  "Freeport": 8574,
  "Wells": 10965,
  "Cape Elizabeth": 9536,
  "Yarmouth": 8674,
  "Eliot": 6749,
  "Berwick": 7860,
  "Old Orchard Beach": 8624,
  "Newport": 3021,
  "Lincoln": 5085,
  "Millinocket": 4119,
  "Bucksport": 4924,
  "Machias": 2095,
  "Calais": 2983,
  "Eastport": 1288,
  "Bar Harbor": 5535,
  "Southwest Harbor": 1757,
  "Blue Hill": 2690,
  "Pittsfield": 4121,
  "Madison": 4855,
  "Fairfield": 6573,
  "Hallowell": 2381,
  "Winthrop": 5935,
  "China": 4464,
  "Bethel": 2636,
  "Norway": 5077,
  "Rangeley": 1168,
  "Kingfield": 1057,
  "Jay": 4762,
  "Wilton": 4116,
  "Greenville": 1512,
  "Dover-Foxcroft": 4278,
  "Guilford": 1436,
  "Dexter": 3890,
  "Searsport": 2642,
  "Stockton Springs": 1591,
  "Thomaston": 2781,
  "Waldoboro": 5208,
  "Damariscotta": 2297,
  "Boothbay Harbor": 2092,
  "Wiscasset": 3742
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
  "Lobster Shack", "Seafood Restaurant", "Fishing Supply", "Boat Repair"
];

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[.']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function generateBusinesses(townName, population, county) {
  const businesses = [];
  let numBusinesses;

  if (population > 50000) numBusinesses = 100;
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

    const prefixes = [townName, county, "Pine Tree", "Maine", "Down East", "Coastal", "Acadia", "Lighthouse", "Vacationland"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, ME`,
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
const counties = new Set();

for (const [townName, county] of Object.entries(maineTowns)) {
  const slug = generateSlug(townName) + '-me';
  const population = populations[townName] || Math.floor(Math.random() * 2500) + 300;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Maine",
    state_abbr: "ME",
    county: county,
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
title: "${townName}, Maine Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Maine"
state_abbr: "ME"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Maine Business Directory"
slug: "me"
state: "me"
state_name: "Maine"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'me.md'), stateContent);

console.log(`Created Maine towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
