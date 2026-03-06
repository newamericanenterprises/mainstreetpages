import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Massachusetts municipalities with their counties (14 counties)
const massachusettsTowns = {
  // Suffolk County (Boston area)
  "Boston": "Suffolk",
  "Chelsea": "Suffolk",
  "Revere": "Suffolk",
  "Winthrop": "Suffolk",

  // Middlesex County
  "Cambridge": "Middlesex",
  "Lowell": "Middlesex",
  "Newton": "Middlesex",
  "Somerville": "Middlesex",
  "Framingham": "Middlesex",
  "Waltham": "Middlesex",
  "Malden": "Middlesex",
  "Medford": "Middlesex",
  "Arlington": "Middlesex",
  "Everett": "Middlesex",
  "Woburn": "Middlesex",
  "Billerica": "Middlesex",
  "Chelmsford": "Middlesex",
  "Burlington": "Middlesex",
  "Lexington": "Middlesex",
  "Marlborough": "Middlesex",
  "Watertown": "Middlesex",
  "Reading": "Middlesex",
  "Melrose": "Middlesex",
  "Natick": "Middlesex",
  "Wakefield": "Middlesex",
  "Stoneham": "Middlesex",
  "Bedford": "Middlesex",
  "Dracut": "Middlesex",
  "Tewksbury": "Middlesex",
  "Wilmington": "Middlesex",
  "Winchester": "Middlesex",
  "Belmont": "Middlesex",
  "Concord": "Middlesex",
  "Acton": "Middlesex",
  "Sudbury": "Middlesex",
  "Wayland": "Middlesex",
  "Lincoln": "Middlesex",
  "Weston": "Middlesex",
  "Hudson": "Middlesex",
  "Maynard": "Middlesex",
  "Hopkinton": "Middlesex",
  "Holliston": "Middlesex",
  "Ashland": "Middlesex",
  "Sherborn": "Middlesex",
  "Westford": "Middlesex",
  "Littleton": "Middlesex",
  "Groton": "Middlesex",
  "Pepperell": "Middlesex",
  "Townsend": "Middlesex",
  "Ayer": "Middlesex",
  "Shirley": "Middlesex",
  "Harvard": "Middlesex",
  "Boxborough": "Middlesex",
  "Stow": "Middlesex",
  "Carlisle": "Middlesex",
  "North Reading": "Middlesex",
  "Tyngsborough": "Middlesex",
  "Dunstable": "Middlesex",
  "Ashby": "Middlesex",

  // Essex County
  "Lynn": "Essex",
  "Lawrence": "Essex",
  "Haverhill": "Essex",
  "Peabody": "Essex",
  "Methuen": "Essex",
  "Salem": "Essex",
  "Beverly": "Essex",
  "Gloucester": "Essex",
  "Danvers": "Essex",
  "Andover": "Essex",
  "North Andover": "Essex",
  "Saugus": "Essex",
  "Marblehead": "Essex",
  "Swampscott": "Essex",
  "Amesbury": "Essex",
  "Newburyport": "Essex",
  "Ipswich": "Essex",
  "Lynnfield": "Essex",
  "Middleton": "Essex",
  "Topsfield": "Essex",
  "Hamilton": "Essex",
  "Wenham": "Essex",
  "Manchester-by-the-Sea": "Essex",
  "Rockport": "Essex",
  "Essex": "Essex",
  "Georgetown": "Essex",
  "Groveland": "Essex",
  "Merrimac": "Essex",
  "Salisbury": "Essex",
  "Newbury": "Essex",
  "West Newbury": "Essex",
  "Rowley": "Essex",
  "Boxford": "Essex",
  "Nahant": "Essex",

  // Norfolk County
  "Quincy": "Norfolk",
  "Brookline": "Norfolk",
  "Weymouth": "Norfolk",
  "Braintree": "Norfolk",
  "Milton": "Norfolk",
  "Randolph": "Norfolk",
  "Norwood": "Norfolk",
  "Needham": "Norfolk",
  "Franklin": "Norfolk",
  "Canton": "Norfolk",
  "Dedham": "Norfolk",
  "Stoughton": "Norfolk",
  "Holbrook": "Norfolk",
  "Walpole": "Norfolk",
  "Sharon": "Norfolk",
  "Foxborough": "Norfolk",
  "Medfield": "Norfolk",
  "Dover": "Norfolk",
  "Westwood": "Norfolk",
  "Medway": "Norfolk",
  "Millis": "Norfolk",
  "Norfolk": "Norfolk",
  "Plainville": "Norfolk",
  "Wrentham": "Norfolk",
  "Cohasset": "Norfolk",
  "Avon": "Norfolk",
  "Bellingham": "Norfolk",
  "Wellesley": "Norfolk",

  // Plymouth County
  "Brockton": "Plymouth",
  "Plymouth": "Plymouth",
  "Weymouth": "Plymouth",
  "Marshfield": "Plymouth",
  "Pembroke": "Plymouth",
  "Duxbury": "Plymouth",
  "Kingston": "Plymouth",
  "Halifax": "Plymouth",
  "Hanover": "Plymouth",
  "Hingham": "Plymouth",
  "Scituate": "Plymouth",
  "Norwell": "Plymouth",
  "Rockland": "Plymouth",
  "Whitman": "Plymouth",
  "Abington": "Plymouth",
  "Bridgewater": "Plymouth",
  "East Bridgewater": "Plymouth",
  "West Bridgewater": "Plymouth",
  "Middleborough": "Plymouth",
  "Lakeville": "Plymouth",
  "Carver": "Plymouth",
  "Wareham": "Plymouth",
  "Marion": "Plymouth",
  "Mattapoisett": "Plymouth",
  "Rochester": "Plymouth",
  "Hanson": "Plymouth",
  "Hull": "Plymouth",
  "Plympton": "Plymouth",

  // Bristol County
  "Fall River": "Bristol",
  "New Bedford": "Bristol",
  "Taunton": "Bristol",
  "Attleboro": "Bristol",
  "Dartmouth": "Bristol",
  "Fairhaven": "Bristol",
  "Somerset": "Bristol",
  "Westport": "Bristol",
  "Seekonk": "Bristol",
  "Rehoboth": "Bristol",
  "Swansea": "Bristol",
  "Easton": "Bristol",
  "Norton": "Bristol",
  "Mansfield": "Bristol",
  "North Attleborough": "Bristol",
  "Acushnet": "Bristol",
  "Raynham": "Bristol",
  "Dighton": "Bristol",
  "Berkley": "Bristol",
  "Freetown": "Bristol",

  // Worcester County
  "Worcester": "Worcester",
  "Fitchburg": "Worcester",
  "Leominster": "Worcester",
  "Shrewsbury": "Worcester",
  "Westborough": "Worcester",
  "Milford": "Worcester",
  "Grafton": "Worcester",
  "Auburn": "Worcester",
  "Webster": "Worcester",
  "Northborough": "Worcester",
  "Southborough": "Worcester",
  "Holden": "Worcester",
  "Spencer": "Worcester",
  "Dudley": "Worcester",
  "Charlton": "Worcester",
  "Oxford": "Worcester",
  "Sutton": "Worcester",
  "Douglas": "Worcester",
  "Uxbridge": "Worcester",
  "Northbridge": "Worcester",
  "Upton": "Worcester",
  "Millbury": "Worcester",
  "Blackstone": "Worcester",
  "Mendon": "Worcester",
  "Hopedale": "Worcester",
  "Leicester": "Worcester",
  "Paxton": "Worcester",
  "Rutland": "Worcester",
  "Princeton": "Worcester",
  "Sterling": "Worcester",
  "Clinton": "Worcester",
  "Berlin": "Worcester",
  "Bolton": "Worcester",
  "Boylston": "Worcester",
  "West Boylston": "Worcester",
  "Lancaster": "Worcester",
  "Harvard": "Worcester",
  "Lunenburg": "Worcester",
  "Gardner": "Worcester",
  "Templeton": "Worcester",
  "Winchendon": "Worcester",
  "Athol": "Worcester",
  "Orange": "Worcester",
  "Petersham": "Worcester",
  "Phillipston": "Worcester",
  "Royalston": "Worcester",
  "Ashburnham": "Worcester",
  "Westminster": "Worcester",
  "Hubbardston": "Worcester",
  "Barre": "Worcester",
  "Hardwick": "Worcester",
  "New Braintree": "Worcester",
  "North Brookfield": "Worcester",
  "Brookfield": "Worcester",
  "West Brookfield": "Worcester",
  "Warren": "Worcester",
  "Sturbridge": "Worcester",
  "Southbridge": "Worcester",

  // Hampden County
  "Springfield": "Hampden",
  "Chicopee": "Hampden",
  "Holyoke": "Hampden",
  "West Springfield": "Hampden",
  "Westfield": "Hampden",
  "Agawam": "Hampden",
  "Ludlow": "Hampden",
  "East Longmeadow": "Hampden",
  "Longmeadow": "Hampden",
  "Wilbraham": "Hampden",
  "Palmer": "Hampden",
  "Monson": "Hampden",
  "Brimfield": "Hampden",
  "Wales": "Hampden",
  "Holland": "Hampden",
  "Hampden": "Hampden",
  "Southwick": "Hampden",
  "Granville": "Hampden",
  "Tolland": "Hampden",
  "Blandford": "Hampden",
  "Chester": "Hampden",
  "Montgomery": "Hampden",
  "Russell": "Hampden",

  // Hampshire County
  "Northampton": "Hampshire",
  "Amherst": "Hampshire",
  "South Hadley": "Hampshire",
  "Easthampton": "Hampshire",
  "Hadley": "Hampshire",
  "Ware": "Hampshire",
  "Belchertown": "Hampshire",
  "Granby": "Hampshire",
  "Hatfield": "Hampshire",
  "Southampton": "Hampshire",
  "Huntington": "Hampshire",
  "Williamsburg": "Hampshire",
  "Chesterfield": "Hampshire",
  "Cummington": "Hampshire",
  "Goshen": "Hampshire",
  "Plainfield": "Hampshire",
  "Westhampton": "Hampshire",
  "Worthington": "Hampshire",
  "Middlefield": "Hampshire",
  "Pelham": "Hampshire",

  // Franklin County
  "Greenfield": "Franklin",
  "Montague": "Franklin",
  "Deerfield": "Franklin",
  "Sunderland": "Franklin",
  "Whately": "Franklin",
  "South Deerfield": "Franklin",
  "Shelburne": "Franklin",
  "Shelburne Falls": "Franklin",
  "Ashfield": "Franklin",
  "Conway": "Franklin",
  "Buckland": "Franklin",
  "Charlemont": "Franklin",
  "Hawley": "Franklin",
  "Heath": "Franklin",
  "Rowe": "Franklin",
  "Monroe": "Franklin",
  "Colrain": "Franklin",
  "Bernardston": "Franklin",
  "Leyden": "Franklin",
  "Gill": "Franklin",
  "Erving": "Franklin",
  "Northfield": "Franklin",
  "Warwick": "Franklin",
  "Orange": "Franklin",
  "New Salem": "Franklin",
  "Wendell": "Franklin",
  "Shutesbury": "Franklin",
  "Leverett": "Franklin",

  // Berkshire County
  "Pittsfield": "Berkshire",
  "North Adams": "Berkshire",
  "Adams": "Berkshire",
  "Williamstown": "Berkshire",
  "Great Barrington": "Berkshire",
  "Lenox": "Berkshire",
  "Lee": "Berkshire",
  "Stockbridge": "Berkshire",
  "Sheffield": "Berkshire",
  "Dalton": "Berkshire",
  "Lanesborough": "Berkshire",
  "Cheshire": "Berkshire",
  "Clarksburg": "Berkshire",
  "Florida": "Berkshire",
  "Savoy": "Berkshire",
  "Windsor": "Berkshire",
  "Hinsdale": "Berkshire",
  "Peru": "Berkshire",
  "Becket": "Berkshire",
  "Otis": "Berkshire",
  "Sandisfield": "Berkshire",
  "New Marlborough": "Berkshire",
  "Monterey": "Berkshire",
  "Tyringham": "Berkshire",
  "Alford": "Berkshire",
  "Egremont": "Berkshire",
  "Mount Washington": "Berkshire",
  "West Stockbridge": "Berkshire",
  "Richmond": "Berkshire",
  "Hancock": "Berkshire",
  "Washington": "Berkshire",

  // Barnstable County (Cape Cod)
  "Barnstable": "Barnstable",
  "Yarmouth": "Barnstable",
  "Falmouth": "Barnstable",
  "Sandwich": "Barnstable",
  "Mashpee": "Barnstable",
  "Bourne": "Barnstable",
  "Dennis": "Barnstable",
  "Brewster": "Barnstable",
  "Harwich": "Barnstable",
  "Chatham": "Barnstable",
  "Orleans": "Barnstable",
  "Eastham": "Barnstable",
  "Wellfleet": "Barnstable",
  "Truro": "Barnstable",
  "Provincetown": "Barnstable",
  "Hyannis": "Barnstable",
  "Centerville": "Barnstable",
  "Osterville": "Barnstable",
  "Cotuit": "Barnstable",
  "West Yarmouth": "Barnstable",
  "South Yarmouth": "Barnstable",
  "Dennis Port": "Barnstable",
  "West Dennis": "Barnstable",
  "South Dennis": "Barnstable",
  "Harwich Port": "Barnstable",
  "North Falmouth": "Barnstable",
  "East Falmouth": "Barnstable",
  "Woods Hole": "Barnstable",
  "Sagamore": "Barnstable",
  "Sagamore Beach": "Barnstable",
  "Monument Beach": "Barnstable",
  "Pocasset": "Barnstable",
  "Cataumet": "Barnstable",
  "North Chatham": "Barnstable",

  // Dukes County (Martha's Vineyard)
  "Edgartown": "Dukes",
  "Oak Bluffs": "Dukes",
  "Tisbury": "Dukes",
  "Vineyard Haven": "Dukes",
  "West Tisbury": "Dukes",
  "Chilmark": "Dukes",
  "Aquinnah": "Dukes",
  "Gosnold": "Dukes",

  // Nantucket County
  "Nantucket": "Nantucket"
};

// Population estimates for Massachusetts cities
const populations = {
  "Boston": 675647,
  "Worcester": 206518,
  "Springfield": 155929,
  "Cambridge": 118927,
  "Lowell": 115554,
  "Brockton": 105643,
  "New Bedford": 101079,
  "Quincy": 101636,
  "Lynn": 99969,
  "Fall River": 93885,
  "Newton": 88923,
  "Somerville": 81360,
  "Lawrence": 89143,
  "Framingham": 72362,
  "Haverhill": 67787,
  "Waltham": 65227,
  "Malden": 66263,
  "Brookline": 63191,
  "Plymouth": 61217,
  "Medford": 59450,
  "Taunton": 58946,
  "Chicopee": 55720,
  "Weymouth": 57746,
  "Revere": 62186,
  "Peabody": 54251,
  "Methuen": 51639,
  "Barnstable": 44641,
  "Pittsfield": 42514,
  "Attleboro": 45237,
  "Arlington": 45531,
  "Everett": 48765,
  "Salem": 44480,
  "Westfield": 41680,
  "Leominster": 43782,
  "Fitchburg": 40898,
  "Beverly": 42670,
  "Holyoke": 38150,
  "Billerica": 43606,
  "Marlborough": 41793,
  "Woburn": 40512,
  "Chelmsford": 35940,
  "Amherst": 40096,
  "Braintree": 38263,
  "Natick": 36050,
  "Shrewsbury": 38478,
  "Andover": 36383,
  "Franklin": 33644,
  "Northampton": 28549,
  "Lexington": 34454,
  "Randolph": 34984,
  "Watertown": 35939,
  "Falmouth": 32660,
  "Gloucester": 30273,
  "Danvers": 28113,
  "Milton": 28254,
  "Needham": 31177,
  "Reading": 26185,
  "Wakefield": 27045,
  "Saugus": 28468,
  "Wellesley": 29673,
  "Burlington": 28503,
  "Belmont": 26243,
  "Winthrop": 18688,
  "Chelsea": 40115,
  "Concord": 19979,
  "Acton": 24021,
  "Dedham": 25544,
  "Norwood": 30007,
  "Canton": 25084,
  "Stoughton": 29314,
  "Marshfield": 26531,
  "Hingham": 24913,
  "Scituate": 18954,
  "Medway": 13345,
  "Foxborough": 18865,
  "Sharon": 18662,
  "Milford": 30000,
  "Easton": 25203,
  "North Attleborough": 30008,
  "Mansfield": 24611,
  "Grafton": 19503,
  "Westborough": 19539,
  "Auburn": 16767,
  "Holden": 18983,
  "Gardner": 20610,
  "North Adams": 12961,
  "Adams": 8166,
  "Williamstown": 7513,
  "Great Barrington": 6988,
  "Lenox": 5023,
  "Lee": 5788,
  "Stockbridge": 1982,
  "Greenfield": 17707,
  "Deerfield": 5090,
  "Amherst": 40096,
  "Northampton": 28549,
  "South Hadley": 17657,
  "Easthampton": 15929,
  "Ware": 9862,
  "Belchertown": 15168,
  "West Springfield": 28680,
  "Agawam": 28892,
  "East Longmeadow": 16487,
  "Longmeadow": 15902,
  "Ludlow": 21496,
  "Wilbraham": 14973,
  "Palmer": 12295,
  "Yarmouth": 23449,
  "Sandwich": 20484,
  "Mashpee": 14836,
  "Bourne": 20430,
  "Dennis": 13990,
  "Brewster": 9950,
  "Harwich": 12338,
  "Chatham": 5911,
  "Orleans": 5698,
  "Eastham": 4923,
  "Wellfleet": 2723,
  "Truro": 1942,
  "Provincetown": 2829,
  "Edgartown": 4607,
  "Oak Bluffs": 5186,
  "Tisbury": 4108,
  "Nantucket": 14255
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
  "Lobster Shack", "Seafood Restaurant", "Clam Shack", "Marina"
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

    const prefixes = [townName, county, "Bay State", "Massachusetts", "Colonial", "New England", "Cape", "Pilgrim", "Patriots"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, MA`,
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

for (const [townName, county] of Object.entries(massachusettsTowns)) {
  const slug = generateSlug(townName) + '-ma';
  const population = populations[townName] || Math.floor(Math.random() * 8000) + 1000;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Massachusetts",
    state_abbr: "MA",
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
title: "${townName}, Massachusetts Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Massachusetts"
state_abbr: "MA"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Massachusetts Business Directory"
slug: "ma"
state: "ma"
state_name: "Massachusetts"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'ma.md'), stateContent);

console.log(`Created Massachusetts towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
