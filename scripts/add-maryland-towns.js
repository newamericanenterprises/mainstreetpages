import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Maryland municipalities with their counties (23 counties + Baltimore City)
const marylandTowns = {
  // Baltimore City (independent city)
  "Baltimore": "Baltimore City",

  // Montgomery County
  "Rockville": "Montgomery",
  "Gaithersburg": "Montgomery",
  "Silver Spring": "Montgomery",
  "Bethesda": "Montgomery",
  "Germantown": "Montgomery",
  "Wheaton": "Montgomery",
  "Aspen Hill": "Montgomery",
  "Potomac": "Montgomery",
  "Olney": "Montgomery",
  "Takoma Park": "Montgomery",
  "Chevy Chase": "Montgomery",
  "Poolesville": "Montgomery",
  "Kensington": "Montgomery",
  "Garrett Park": "Montgomery",
  "Cabin John": "Montgomery",
  "Damascus": "Montgomery",
  "Clarksburg": "Montgomery",
  "Brookeville": "Montgomery",
  "Laytonsville": "Montgomery",
  "Barnesville": "Montgomery",
  "Somerset": "Montgomery",
  "Glen Echo": "Montgomery",
  "Martin's Additions": "Montgomery",
  "Washington Grove": "Montgomery",
  "Friendship Heights": "Montgomery",
  "North Bethesda": "Montgomery",
  "Colesville": "Montgomery",
  "Burtonsville": "Montgomery",
  "White Oak": "Montgomery",
  "Kemp Mill": "Montgomery",
  "Leisure World": "Montgomery",
  "Fairland": "Montgomery",
  "Cloverly": "Montgomery",
  "Calverton": "Montgomery",
  "Adelphi": "Montgomery",

  // Prince George's County
  "College Park": "Prince George's",
  "Bowie": "Prince George's",
  "Hyattsville": "Prince George's",
  "Greenbelt": "Prince George's",
  "Laurel": "Prince George's",
  "Bladensburg": "Prince George's",
  "Capitol Heights": "Prince George's",
  "District Heights": "Prince George's",
  "Riverdale Park": "Prince George's",
  "Mount Rainier": "Prince George's",
  "Brentwood": "Prince George's",
  "Cheverly": "Prince George's",
  "Seat Pleasant": "Prince George's",
  "Fairmount Heights": "Prince George's",
  "Colmar Manor": "Prince George's",
  "Cottage City": "Prince George's",
  "Edmonston": "Prince George's",
  "Forest Heights": "Prince George's",
  "Morningside": "Prince George's",
  "University Park": "Prince George's",
  "Berwyn Heights": "Prince George's",
  "North Brentwood": "Prince George's",
  "Landover": "Prince George's",
  "Landover Hills": "Prince George's",
  "New Carrollton": "Prince George's",
  "Upper Marlboro": "Prince George's",
  "Fort Washington": "Prince George's",
  "Oxon Hill": "Prince George's",
  "Temple Hills": "Prince George's",
  "Suitland": "Prince George's",
  "Hillcrest Heights": "Prince George's",
  "Marlow Heights": "Prince George's",
  "Forestville": "Prince George's",
  "Clinton": "Prince George's",
  "Camp Springs": "Prince George's",
  "Andrews AFB": "Prince George's",
  "Glenn Dale": "Prince George's",
  "Lanham": "Prince George's",
  "Seabrook": "Prince George's",
  "Beltsville": "Prince George's",
  "Adelphi": "Prince George's",
  "Langley Park": "Prince George's",
  "Chillum": "Prince George's",
  "Kettering": "Prince George's",
  "Largo": "Prince George's",

  // Baltimore County
  "Towson": "Baltimore County",
  "Dundalk": "Baltimore County",
  "Essex": "Baltimore County",
  "Pikesville": "Baltimore County",
  "Owings Mills": "Baltimore County",
  "Catonsville": "Baltimore County",
  "Parkville": "Baltimore County",
  "Middle River": "Baltimore County",
  "Perry Hall": "Baltimore County",
  "Reisterstown": "Baltimore County",
  "Cockeysville": "Baltimore County",
  "Rosedale": "Baltimore County",
  "Lochearn": "Baltimore County",
  "White Marsh": "Baltimore County",
  "Randallstown": "Baltimore County",
  "Woodlawn": "Baltimore County",
  "Carney": "Baltimore County",
  "Lutherville-Timonium": "Baltimore County",
  "Arbutus": "Baltimore County",
  "Milford Mill": "Baltimore County",
  "Overlea": "Baltimore County",
  "Loch Raven": "Baltimore County",
  "Kingsville": "Baltimore County",
  "Nottingham": "Baltimore County",
  "Edgemere": "Baltimore County",
  "Garrison": "Baltimore County",
  "Lansdowne": "Baltimore County",
  "Brooklyn Park": "Baltimore County",
  "Fullerton": "Baltimore County",
  "Hunt Valley": "Baltimore County",
  "Sparrows Point": "Baltimore County",
  "North Point": "Baltimore County",

  // Anne Arundel County
  "Annapolis": "Anne Arundel",
  "Glen Burnie": "Anne Arundel",
  "Pasadena": "Anne Arundel",
  "Severn": "Anne Arundel",
  "Severna Park": "Anne Arundel",
  "Crofton": "Anne Arundel",
  "Odenton": "Anne Arundel",
  "Arnold": "Anne Arundel",
  "Millersville": "Anne Arundel",
  "Edgewater": "Anne Arundel",
  "Brooklyn Park": "Anne Arundel",
  "Ferndale": "Anne Arundel",
  "Linthicum": "Anne Arundel",
  "Pumphrey": "Anne Arundel",
  "Parole": "Anne Arundel",
  "Crownsville": "Anne Arundel",
  "Jessup": "Anne Arundel",
  "Gambrills": "Anne Arundel",
  "Davidsonville": "Anne Arundel",
  "Highland Beach": "Anne Arundel",
  "Deale": "Anne Arundel",
  "Shady Side": "Anne Arundel",
  "Galesville": "Anne Arundel",
  "West River": "Anne Arundel",
  "Harwood": "Anne Arundel",
  "Lothian": "Anne Arundel",
  "Churchton": "Anne Arundel",
  "Tracys Landing": "Anne Arundel",
  "Lake Shore": "Anne Arundel",

  // Howard County
  "Columbia": "Howard",
  "Ellicott City": "Howard",
  "Elkridge": "Howard",
  "Laurel": "Howard",
  "Savage": "Howard",
  "Jessup": "Howard",
  "Clarksville": "Howard",
  "Highland": "Howard",
  "Fulton": "Howard",
  "Woodstock": "Howard",
  "West Friendship": "Howard",
  "Glenwood": "Howard",
  "Dayton": "Howard",
  "Cooksville": "Howard",
  "Scaggsville": "Howard",
  "North Laurel": "Howard",

  // Harford County
  "Bel Air": "Harford",
  "Aberdeen": "Harford",
  "Havre de Grace": "Harford",
  "Edgewood": "Harford",
  "Fallston": "Harford",
  "Joppa": "Harford",
  "Jarrettsville": "Harford",
  "Forest Hill": "Harford",
  "Churchville": "Harford",
  "Aberdeen Proving Ground": "Harford",
  "Bel Air North": "Harford",
  "Bel Air South": "Harford",
  "Belcamp": "Harford",
  "Perryville": "Harford",
  "Dublin": "Harford",
  "Street": "Harford",
  "Pylesville": "Harford",
  "Whiteford": "Harford",

  // Carroll County
  "Westminster": "Carroll",
  "Eldersburg": "Carroll",
  "Sykesville": "Carroll",
  "Mount Airy": "Carroll",
  "Taneytown": "Carroll",
  "Hampstead": "Carroll",
  "Manchester": "Carroll",
  "New Windsor": "Carroll",
  "Union Bridge": "Carroll",
  "Finksburg": "Carroll",
  "Woodbine": "Carroll",
  "Taylorsville": "Carroll",
  "Linwood": "Carroll",
  "Keymar": "Carroll",
  "Millers": "Carroll",

  // Frederick County
  "Frederick": "Frederick",
  "Urbana": "Frederick",
  "Brunswick": "Frederick",
  "Thurmont": "Frederick",
  "Middletown": "Frederick",
  "Emmitsburg": "Frederick",
  "Walkersville": "Frederick",
  "New Market": "Frederick",
  "Myersville": "Frederick",
  "Burkittsville": "Frederick",
  "Woodsboro": "Frederick",
  "Libertytown": "Frederick",
  "Mount Airy": "Frederick",
  "Jefferson": "Frederick",
  "Point of Rocks": "Frederick",
  "Buckeystown": "Frederick",
  "Ballenger Creek": "Frederick",
  "Linganore": "Frederick",
  "Spring Ridge": "Frederick",

  // Washington County
  "Hagerstown": "Washington",
  "Halfway": "Washington",
  "Boonsboro": "Washington",
  "Williamsport": "Washington",
  "Smithsburg": "Washington",
  "Sharpsburg": "Washington",
  "Funkstown": "Washington",
  "Clear Spring": "Washington",
  "Keedysville": "Washington",
  "Hancock": "Washington",
  "Rohrersville": "Washington",
  "Big Pool": "Washington",
  "Maugansville": "Washington",
  "Robinwood": "Washington",
  "Leitersburg": "Washington",
  "Fountainhead-Orchard Hills": "Washington",

  // Allegany County
  "Cumberland": "Allegany",
  "Frostburg": "Allegany",
  "La Vale": "Allegany",
  "Westernport": "Allegany",
  "Luke": "Allegany",
  "Lonaconing": "Allegany",
  "Barton": "Allegany",
  "Midland": "Allegany",
  "Mount Savage": "Allegany",
  "Rawlings": "Allegany",
  "Bowling Green": "Allegany",
  "Cresaptown": "Allegany",
  "Bel Air": "Allegany",
  "Flintstone": "Allegany",
  "Corriganville": "Allegany",

  // Garrett County
  "Oakland": "Garrett",
  "Mountain Lake Park": "Garrett",
  "Loch Lynn Heights": "Garrett",
  "Deer Park": "Garrett",
  "Accident": "Garrett",
  "Grantsville": "Garrett",
  "Friendsville": "Garrett",
  "Kitzmiller": "Garrett",
  "McHenry": "Garrett",
  "Swanton": "Garrett",
  "Deep Creek Lake": "Garrett",

  // Cecil County
  "Elkton": "Cecil",
  "North East": "Cecil",
  "Perryville": "Cecil",
  "Rising Sun": "Cecil",
  "Charlestown": "Cecil",
  "Chesapeake City": "Cecil",
  "Cecilton": "Cecil",
  "Port Deposit": "Cecil",
  "Earleville": "Cecil",
  "Colora": "Cecil",
  "Conowingo": "Cecil",
  "Fair Hill": "Cecil",

  // Kent County
  "Chestertown": "Kent",
  "Rock Hall": "Kent",
  "Millington": "Kent",
  "Galena": "Kent",
  "Betterton": "Kent",
  "Worton": "Kent",
  "Kennedyville": "Kent",
  "Still Pond": "Kent",

  // Queen Anne's County
  "Centreville": "Queen Anne's",
  "Grasonville": "Queen Anne's",
  "Stevensville": "Queen Anne's",
  "Chester": "Queen Anne's",
  "Kent Island": "Queen Anne's",
  "Queenstown": "Queen Anne's",
  "Church Hill": "Queen Anne's",
  "Sudlersville": "Queen Anne's",
  "Templeville": "Queen Anne's",
  "Barclay": "Queen Anne's",
  "Queen Anne": "Queen Anne's",

  // Talbot County
  "Easton": "Talbot",
  "St. Michaels": "Talbot",
  "Oxford": "Talbot",
  "Trappe": "Talbot",
  "Tilghman": "Talbot",
  "Cordova": "Talbot",
  "Claiborne": "Talbot",

  // Caroline County
  "Denton": "Caroline",
  "Federalsburg": "Caroline",
  "Preston": "Caroline",
  "Ridgely": "Caroline",
  "Greensboro": "Caroline",
  "Henderson": "Caroline",
  "Goldsboro": "Caroline",
  "Hillsboro": "Caroline",
  "Marydel": "Caroline",

  // Dorchester County
  "Cambridge": "Dorchester",
  "Hurlock": "Dorchester",
  "East New Market": "Dorchester",
  "Secretary": "Dorchester",
  "Vienna": "Dorchester",
  "Eldorado": "Dorchester",
  "Church Creek": "Dorchester",
  "Woolford": "Dorchester",
  "Brookview": "Dorchester",
  "Linkwood": "Dorchester",

  // Wicomico County
  "Salisbury": "Wicomico",
  "Fruitland": "Wicomico",
  "Delmar": "Wicomico",
  "Sharptown": "Wicomico",
  "Mardela Springs": "Wicomico",
  "Willards": "Wicomico",
  "Pittsville": "Wicomico",
  "Hebron": "Wicomico",
  "Quantico": "Wicomico",
  "Powellville": "Wicomico",
  "Parsonsburg": "Wicomico",

  // Worcester County
  "Ocean City": "Worcester",
  "Pocomoke City": "Worcester",
  "Snow Hill": "Worcester",
  "Berlin": "Worcester",
  "Ocean Pines": "Worcester",
  "West Ocean City": "Worcester",
  "Bishopville": "Worcester",
  "Newark": "Worcester",
  "Stockton": "Worcester",
  "Girdletree": "Worcester",
  "Whaleyville": "Worcester",

  // Somerset County
  "Princess Anne": "Somerset",
  "Crisfield": "Somerset",
  "Westover": "Somerset",
  "Marion Station": "Somerset",
  "Deal Island": "Somerset",
  "Smith Island": "Somerset",
  "Fairmount": "Somerset",
  "Mount Vernon": "Somerset",
  "Pocomoke": "Somerset",

  // Calvert County
  "Prince Frederick": "Calvert",
  "Dunkirk": "Calvert",
  "Chesapeake Beach": "Calvert",
  "North Beach": "Calvert",
  "Huntingtown": "Calvert",
  "Lusby": "Calvert",
  "Solomons": "Calvert",
  "St. Leonard": "Calvert",
  "Port Republic": "Calvert",
  "Owings": "Calvert",
  "Broomes Island": "Calvert",

  // Charles County
  "Waldorf": "Charles",
  "La Plata": "Charles",
  "Indian Head": "Charles",
  "Bryans Road": "Charles",
  "Accokeek": "Charles",
  "Hughesville": "Charles",
  "White Plains": "Charles",
  "Pomfret": "Charles",
  "Newburg": "Charles",
  "Welcome": "Charles",
  "Port Tobacco": "Charles",
  "Nanjemoy": "Charles",
  "Bel Alton": "Charles",
  "Cobb Island": "Charles",
  "Marbury": "Charles",
  "Dentsville": "Charles",
  "Potomac Heights": "Charles",
  "Ironsides": "Charles",

  // St. Mary's County
  "Leonardtown": "St. Mary's",
  "Lexington Park": "St. Mary's",
  "California": "St. Mary's",
  "Great Mills": "St. Mary's",
  "Mechanicsville": "St. Mary's",
  "Charlotte Hall": "St. Mary's",
  "Piney Point": "St. Mary's",
  "Ridge": "St. Mary's",
  "St. Inigoes": "St. Mary's",
  "Hollywood": "St. Mary's",
  "Tall Timbers": "St. Mary's",
  "Avenue": "St. Mary's",
  "Loveville": "St. Mary's",
  "Coltons Point": "St. Mary's",
  "Clements": "St. Mary's"
};

// Population estimates for Maryland cities
const populations = {
  "Baltimore": 585708,
  "Columbia": 105412,
  "Germantown": 90494,
  "Silver Spring": 81015,
  "Waldorf": 77005,
  "Frederick": 78171,
  "Ellicott City": 73272,
  "Rockville": 68155,
  "Bethesda": 65313,
  "Gaithersburg": 68289,
  "Glen Burnie": 72340,
  "Dundalk": 62798,
  "Towson": 57532,
  "Bowie": 58727,
  "Bel Air": 10120,
  "Aspen Hill": 53347,
  "Wheaton": 51520,
  "Severn": 51285,
  "Odenton": 42258,
  "Catonsville": 41567,
  "Potomac": 46716,
  "Woodlawn": 37879,
  "Essex": 39262,
  "North Bethesda": 49410,
  "Pikesville": 32216,
  "Owings Mills": 34924,
  "Pasadena": 29225,
  "Annapolis": 40812,
  "Severna Park": 38420,
  "Randallstown": 35055,
  "College Park": 32275,
  "Hagerstown": 40612,
  "Salisbury": 33618,
  "Westminster": 18590,
  "Cumberland": 19682,
  "Aberdeen": 16232,
  "Havre de Grace": 14070,
  "Easton": 16871,
  "Cambridge": 12314,
  "Ocean City": 6957,
  "Elkton": 15803,
  "Laurel": 26260,
  "Greenbelt": 23068,
  "Hyattsville": 18267,
  "Takoma Park": 17703,
  "Lexington Park": 11626,
  "Crofton": 29726,
  "Chestertown": 5252,
  "Denton": 4408,
  "La Plata": 9516,
  "Leonardtown": 3448,
  "Prince Frederick": 2505,
  "Princess Anne": 3290,
  "Centreville": 4285,
  "Snow Hill": 2103,
  "Frostburg": 8557,
  "Brunswick": 6264,
  "Thurmont": 6744,
  "Emmitsburg": 3013,
  "Taneytown": 7036,
  "Pocomoke City": 4091,
  "Crisfield": 2649,
  "Federalsburg": 2696,
  "Oakland": 1930,
  "Poolesville": 5359,
  "Damascus": 17105,
  "Olney": 35350,
  "Burtonsville": 10119,
  "Berlin": 5053,
  "St. Michaels": 1021,
  "Oxford": 612,
  "Trappe": 1226,
  "Fruitland": 5442
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
  "Crab House", "Seafood Restaurant", "Marina", "Boat Repair"
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

    const prefixes = [townName, county, "Chesapeake", "Maryland", "Old Line", "Free State", "Bay", "Harbor", "Eastern Shore"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, MD`,
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

for (const [townName, county] of Object.entries(marylandTowns)) {
  const slug = generateSlug(townName) + '-md';
  const population = populations[townName] || Math.floor(Math.random() * 5000) + 500;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Maryland",
    state_abbr: "MD",
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
title: "${townName}, Maryland Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Maryland"
state_abbr: "MD"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Maryland Business Directory"
slug: "md"
state: "md"
state_name: "Maryland"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'md.md'), stateContent);

console.log(`Created Maryland towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
