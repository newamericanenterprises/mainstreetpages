import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// New Hampshire municipalities with their counties
const newHampshireTowns = {
  "Acworth": "Sullivan",
  "Albany": "Carroll",
  "Alexandria": "Grafton",
  "Allenstown": "Merrimack",
  "Alstead": "Cheshire",
  "Alton": "Belknap",
  "Amherst": "Hillsborough",
  "Andover": "Merrimack",
  "Antrim": "Hillsborough",
  "Ashland": "Grafton",
  "Atkinson": "Rockingham",
  "Auburn": "Rockingham",
  "Barnstead": "Belknap",
  "Barrington": "Strafford",
  "Bartlett": "Carroll",
  "Bath": "Grafton",
  "Bedford": "Hillsborough",
  "Belmont": "Belknap",
  "Bennington": "Hillsborough",
  "Benton": "Grafton",
  "Berlin": "Coos",
  "Bethlehem": "Grafton",
  "Boscawen": "Merrimack",
  "Bow": "Merrimack",
  "Bradford": "Merrimack",
  "Brentwood": "Rockingham",
  "Bridgewater": "Grafton",
  "Bristol": "Grafton",
  "Brookfield": "Carroll",
  "Brookline": "Hillsborough",
  "Campton": "Grafton",
  "Canaan": "Grafton",
  "Candia": "Rockingham",
  "Canterbury": "Merrimack",
  "Carroll": "Coos",
  "Center Harbor": "Belknap",
  "Charlestown": "Sullivan",
  "Chatham": "Carroll",
  "Chester": "Rockingham",
  "Chesterfield": "Cheshire",
  "Chichester": "Merrimack",
  "Claremont": "Sullivan",
  "Clarksville": "Coos",
  "Colebrook": "Coos",
  "Columbia": "Coos",
  "Concord": "Merrimack",
  "Conway": "Carroll",
  "Cornish": "Sullivan",
  "Croydon": "Sullivan",
  "Dalton": "Coos",
  "Danbury": "Merrimack",
  "Danville": "Rockingham",
  "Deerfield": "Rockingham",
  "Deering": "Hillsborough",
  "Derry": "Rockingham",
  "Dorchester": "Grafton",
  "Dover": "Strafford",
  "Dublin": "Cheshire",
  "Dummer": "Coos",
  "Dunbarton": "Merrimack",
  "Durham": "Strafford",
  "East Kingston": "Rockingham",
  "Easton": "Grafton",
  "Eaton": "Carroll",
  "Effingham": "Carroll",
  "Ellsworth": "Grafton",
  "Enfield": "Grafton",
  "Epping": "Rockingham",
  "Epsom": "Merrimack",
  "Errol": "Coos",
  "Exeter": "Rockingham",
  "Farmington": "Strafford",
  "Fitzwilliam": "Cheshire",
  "Francestown": "Hillsborough",
  "Franconia": "Grafton",
  "Franklin": "Merrimack",
  "Freedom": "Carroll",
  "Fremont": "Rockingham",
  "Gilford": "Belknap",
  "Gilmanton": "Belknap",
  "Gilsum": "Cheshire",
  "Goffstown": "Hillsborough",
  "Gorham": "Coos",
  "Goshen": "Sullivan",
  "Grafton": "Grafton",
  "Grantham": "Sullivan",
  "Greenfield": "Hillsborough",
  "Greenland": "Rockingham",
  "Greenville": "Hillsborough",
  "Groton": "Grafton",
  "Hampstead": "Rockingham",
  "Hampton": "Rockingham",
  "Hampton Falls": "Rockingham",
  "Hancock": "Hillsborough",
  "Hanover": "Grafton",
  "Harrisville": "Cheshire",
  "Hart's Location": "Carroll",
  "Haverhill": "Grafton",
  "Hebron": "Grafton",
  "Henniker": "Merrimack",
  "Hill": "Merrimack",
  "Hillsborough": "Hillsborough",
  "Hinsdale": "Cheshire",
  "Holderness": "Grafton",
  "Hollis": "Hillsborough",
  "Hooksett": "Merrimack",
  "Hopkinton": "Merrimack",
  "Hudson": "Hillsborough",
  "Jackson": "Carroll",
  "Jaffrey": "Cheshire",
  "Jefferson": "Coos",
  "Keene": "Cheshire",
  "Kensington": "Rockingham",
  "Kingston": "Rockingham",
  "Laconia": "Belknap",
  "Lancaster": "Coos",
  "Landaff": "Grafton",
  "Langdon": "Sullivan",
  "Lebanon": "Grafton",
  "Lee": "Strafford",
  "Lempster": "Sullivan",
  "Lincoln": "Grafton",
  "Lisbon": "Grafton",
  "Litchfield": "Hillsborough",
  "Littleton": "Grafton",
  "Londonderry": "Rockingham",
  "Loudon": "Merrimack",
  "Lyman": "Grafton",
  "Lyme": "Grafton",
  "Lyndeborough": "Hillsborough",
  "Madbury": "Strafford",
  "Madison": "Carroll",
  "Manchester": "Hillsborough",
  "Marlborough": "Cheshire",
  "Marlow": "Cheshire",
  "Mason": "Hillsborough",
  "Meredith": "Belknap",
  "Merrimack": "Hillsborough",
  "Middleton": "Strafford",
  "Milan": "Coos",
  "Milford": "Hillsborough",
  "Milton": "Strafford",
  "Monroe": "Grafton",
  "Mont Vernon": "Hillsborough",
  "Moultonborough": "Carroll",
  "Nashua": "Hillsborough",
  "Nelson": "Cheshire",
  "New Boston": "Hillsborough",
  "New Castle": "Rockingham",
  "New Durham": "Strafford",
  "New Hampton": "Belknap",
  "New Ipswich": "Hillsborough",
  "New London": "Merrimack",
  "Newbury": "Merrimack",
  "Newfields": "Rockingham",
  "Newington": "Rockingham",
  "Newmarket": "Rockingham",
  "Newport": "Sullivan",
  "Newton": "Rockingham",
  "North Hampton": "Rockingham",
  "Northfield": "Merrimack",
  "Northumberland": "Coos",
  "Northwood": "Rockingham",
  "Nottingham": "Rockingham",
  "Orange": "Grafton",
  "Orford": "Grafton",
  "Ossipee": "Carroll",
  "Pelham": "Hillsborough",
  "Pembroke": "Merrimack",
  "Peterborough": "Hillsborough",
  "Piermont": "Grafton",
  "Pittsburg": "Coos",
  "Pittsfield": "Merrimack",
  "Plainfield": "Sullivan",
  "Plaistow": "Rockingham",
  "Plymouth": "Grafton",
  "Portsmouth": "Rockingham",
  "Randolph": "Coos",
  "Raymond": "Rockingham",
  "Richmond": "Cheshire",
  "Rindge": "Cheshire",
  "Rochester": "Strafford",
  "Rollinsford": "Strafford",
  "Roxbury": "Cheshire",
  "Rumney": "Grafton",
  "Rye": "Rockingham",
  "Salem": "Rockingham",
  "Salisbury": "Merrimack",
  "Sanbornton": "Belknap",
  "Sandown": "Rockingham",
  "Sandwich": "Carroll",
  "Seabrook": "Rockingham",
  "Sharon": "Hillsborough",
  "Shelburne": "Coos",
  "Somersworth": "Strafford",
  "South Hampton": "Rockingham",
  "Springfield": "Sullivan",
  "Stark": "Coos",
  "Stewartstown": "Coos",
  "Stoddard": "Cheshire",
  "Strafford": "Strafford",
  "Stratford": "Coos",
  "Stratham": "Rockingham",
  "Sugar Hill": "Grafton",
  "Sullivan": "Cheshire",
  "Sunapee": "Sullivan",
  "Surry": "Cheshire",
  "Sutton": "Merrimack",
  "Swanzey": "Cheshire",
  "Tamworth": "Carroll",
  "Temple": "Hillsborough",
  "Thornton": "Grafton",
  "Tilton": "Belknap",
  "Troy": "Cheshire",
  "Tuftonboro": "Carroll",
  "Unity": "Sullivan",
  "Wakefield": "Carroll",
  "Walpole": "Cheshire",
  "Warner": "Merrimack",
  "Warren": "Grafton",
  "Washington": "Sullivan",
  "Waterville Valley": "Grafton",
  "Weare": "Hillsborough",
  "Webster": "Merrimack",
  "Wentworth": "Grafton",
  "Westmoreland": "Cheshire",
  "Whitefield": "Coos",
  "Wilmot": "Merrimack",
  "Wilton": "Hillsborough",
  "Winchester": "Cheshire",
  "Windham": "Rockingham",
  "Windsor": "Hillsborough",
  "Wolfeboro": "Carroll",
  "Woodstock": "Grafton"
};

// Population data for New Hampshire municipalities
const populations = {
  "Manchester": 115644,
  "Nashua": 91322,
  "Concord": 43976,
  "Derry": 33669,
  "Dover": 32741,
  "Rochester": 31366,
  "Salem": 30193,
  "Merrimack": 26632,
  "Hudson": 25725,
  "Londonderry": 26486,
  "Keene": 23409,
  "Bedford": 23322,
  "Portsmouth": 21956,
  "Goffstown": 18447,
  "Laconia": 16871,
  "Hampton": 16007,
  "Milford": 15994,
  "Durham": 17377,
  "Exeter": 16082,
  "Windham": 15292,
  "Hooksett": 14871,
  "Claremont": 12954,
  "Lebanon": 14282,
  "Pelham": 14222,
  "Somersworth": 12027,
  "Hanover": 11870,
  "Amherst": 11603,
  "Raymond": 10777,
  "Conway": 10115,
  "Berlin": 9959,
  "Newmarket": 9493,
  "Barrington": 9427,
  "Swanzey": 7457,
  "Litchfield": 8535,
  "Hollis": 8318,
  "Bow": 8229,
  "Plaistow": 8154,
  "Gilford": 7643,
  "Seabrook": 9238,
  "Weare": 9180,
  "Stratham": 7772,
  "Hampstead": 8956,
  "Pembroke": 7351,
  "Belmont": 7426,
  "Farmington": 7143,
  "Atkinson": 7005,
  "Epping": 7125,
  "Epsom": 4829,
  "Wolfeboro": 6327,
  "Meredith": 6662,
  "Newport": 6466,
  "Rindge": 6414,
  "Jaffrey": 5457,
  "Milton": 4598,
  "Henniker": 5177,
  "New London": 4509,
  "Plymouth": 7059,
  "Peterborough": 6658,
  "Franklin": 8741,
  "Sandown": 6623,
  "Charlestown": 4835,
  "Hopkinton": 5914,
  "Northfield": 5032,
  "Alton": 5582,
  "Ossipee": 4609,
  "Hillsborough": 6134,
  "Brookline": 5639,
  "New Ipswich": 5514,
  "Lee": 4529,
  "Candia": 4061,
  "Chester": 5219,
  "Nottingham": 5302,
  "Pittsfield": 4075,
  "Greenland": 4067,
  "Bristol": 3299,
  "Wilton": 3858,
  "Moultonborough": 4837,
  "Tilton": 3871,
  "Sanbornton": 3114,
  "Allenstown": 4921,
  "Lancaster": 3326,
  "Littleton": 5928,
  "Colebrook": 2131,
  "Gorham": 2607,
  "Whitefield": 2465,
  "North Hampton": 4538,
  "Rye": 5595,
  "Greenville": 2166,
  "Kingston": 6205,
  "Brentwood": 4855,
  "East Kingston": 2697,
  "Kensington": 2161,
  "Newton": 5027,
  "South Hampton": 972,
  "Hampton Falls": 2357,
  "New Castle": 1010,
  "Newington": 813,
  "Newfields": 1862,
  "Fremont": 4826,
  "Danville": 4626,
  "Auburn": 5950,
  "Deerfield": 4753,
  "Northwood": 4420,
  "Strafford": 4321,
  "Madbury": 2051,
  "Rollinsford": 2667,
  "New Durham": 2873,
  "Middleton": 1913,
  "Barnstead": 4929,
  "Gilmanton": 3887,
  "New Hampton": 2261,
  "Center Harbor": 1150,
  "Holderness": 2178,
  "Ashland": 2076,
  "Campton": 3464,
  "Thornton": 2837,
  "Woodstock": 1395,
  "Lincoln": 1662,
  "Franconia": 1105,
  "Sugar Hill": 537,
  "Lisbon": 1639,
  "Bath": 1085,
  "Haverhill": 4519,
  "Piermont": 832,
  "Orford": 1346,
  "Lyme": 1795,
  "Canaan": 3909,
  "Enfield": 4465,
  "Grafton": 1425,
  "Danbury": 1216,
  "Andover": 2449,
  "Salisbury": 1406,
  "Webster": 1934,
  "Boscawen": 4100,
  "Canterbury": 2352,
  "Loudon": 5671,
  "Chichester": 2733,
  "Dunbarton": 3000,
  "Bradford": 1796,
  "Newbury": 2201,
  "Sutton": 1972,
  "Warner": 2937,
  "Wilmot": 1476,
  "Springfield": 1050,
  "Grantham": 3183,
  "Plainfield": 2531,
  "Cornish": 1740,
  "Croydon": 791,
  "Langdon": 622,
  "Acworth": 940,
  "Lempster": 1216,
  "Goshen": 835,
  "Unity": 1654,
  "Sunapee": 3474,
  "Washington": 1179,
  "Stoddard": 1294,
  "Marlow": 838,
  "Gilsum": 809,
  "Sullivan": 732,
  "Surry": 806,
  "Walpole": 3782,
  "Westmoreland": 1913,
  "Chesterfield": 3752,
  "Hinsdale": 4016,
  "Winchester": 4341,
  "Richmond": 1220,
  "Fitzwilliam": 2466,
  "Troy": 2044,
  "Marlborough": 2153,
  "Dublin": 1597,
  "Harrisville": 977,
  "Nelson": 758,
  "Roxbury": 276,
  "Antrim": 2728,
  "Bennington": 1523,
  "Francestown": 1723,
  "Greenfield": 1869,
  "Hancock": 1780,
  "Sharon": 438,
  "Temple": 1458,
  "Lyndeborough": 1778,
  "Mont Vernon": 2645,
  "New Boston": 6267,
  "Deering": 1979,
  "Windsor": 249,
  "Mason": 1456,
  "Tamworth": 3024,
  "Madison": 2702,
  "Freedom": 1680,
  "Effingham": 1747,
  "Wakefield": 5314,
  "Brookfield": 718,
  "Sandwich": 1418,
  "Tuftonboro": 2579,
  "Jackson": 891,
  "Bartlett": 2769,
  "Chatham": 399,
  "Eaton": 423,
  "Albany": 785,
  "Hart's Location": 50,
  "Carroll": 828,
  "Jefferson": 1107,
  "Randolph": 310,
  "Shelburne": 372,
  "Dummer": 299,
  "Milan": 1301,
  "Stark": 509,
  "Northumberland": 2288,
  "Stratford": 710,
  "Columbia": 752,
  "Stewartstown": 966,
  "Clarksville": 271,
  "Pittsburg": 869,
  "Errol": 291,
  "Dalton": 946,
  "Bethlehem": 2620,
  "Monroe": 794,
  "Lyman": 569,
  "Landaff": 447,
  "Benton": 391,
  "Easton": 290,
  "Ellsworth": 99,
  "Rumney": 1566,
  "Wentworth": 963,
  "Warren": 936,
  "Dorchester": 400,
  "Groton": 641,
  "Hebron": 636,
  "Bridgewater": 1106,
  "Alexandria": 1775,
  "Orange": 367,
  "Waterville Valley": 254
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

// Name prefixes based on New Hampshire regions
const namePrefixes = [
  "Granite State", "New Hampshire", "White Mountain", "Seacoast", "Lakes Region",
  "Heritage", "Colonial", "New England", "North Country", "Monadnock",
  "Mount Washington", "Presidential", "Yankee", "Valley", "Mountain"
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
      address: `${townName}, NH`,
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

for (const [town, county] of Object.entries(newHampshireTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "New Hampshire",
    state_abbr: "NH",
    county: county,
    population: population,
    slug: `${slug}-nh`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-nh.json`),
    JSON.stringify(townData, null, 2)
  );

  // CORRECT FORMAT for content files
  const mdContent = `---
title: "${town}, NH Business Directory"
type: "towns"
slug: "${slug}-nh"
state: "nh"
town_data: "${slug}-nh"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-nh.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "New Hampshire Business Directory"
slug: "nh"
state: "nh"
state_name: "New Hampshire"
---
`;
fs.writeFileSync(path.join(statesDir, 'nh.md'), stateMd);

console.log(`Created New Hampshire towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
