import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Arkansas municipalities with their counties
// Arkansas has 75 counties and 500+ incorporated cities/towns
// Source: Arkansas Secretary of State, US Census Bureau
const arkansasTowns = {
  // Arkansas County
  "DeWitt": "Arkansas",
  "Gillett": "Arkansas",
  "Humphrey": "Arkansas",
  "St. Charles": "Arkansas",
  "Stuttgart": "Arkansas",

  // Ashley County
  "Crossett": "Ashley",
  "Fountain Hill": "Ashley",
  "Hamburg": "Ashley",
  "Montrose": "Ashley",
  "North Crossett": "Ashley",
  "Parkdale": "Ashley",
  "Portland": "Ashley",
  "Wilmot": "Ashley",

  // Baxter County
  "Briarcliff": "Baxter",
  "Cotter": "Baxter",
  "Gassville": "Baxter",
  "Lakeview": "Baxter",
  "Mountain Home": "Baxter",
  "Norfork": "Baxter",
  "Salesville": "Baxter",

  // Benton County
  "Avoca": "Benton",
  "Bella Vista": "Benton",
  "Bentonville": "Benton",
  "Bethel Heights": "Benton",
  "Cave Springs": "Benton",
  "Centerton": "Benton",
  "Decatur": "Benton",
  "Garfield": "Benton",
  "Gateway": "Benton",
  "Gentry": "Benton",
  "Gravette": "Benton",
  "Highfill": "Benton",
  "Little Flock": "Benton",
  "Lowell": "Benton",
  "Pea Ridge": "Benton",
  "Rogers": "Benton",
  "Siloam Springs": "Benton",
  "Springdale": "Benton",
  "Springtown": "Benton",
  "Sulphur Springs": "Benton",

  // Boone County
  "Alpena": "Boone",
  "Bellefonte": "Boone",
  "Bergman": "Boone",
  "Diamond City": "Boone",
  "Everton": "Boone",
  "Harrison": "Boone",
  "Lead Hill": "Boone",
  "Omaha": "Boone",
  "South Lead Hill": "Boone",
  "Valley Springs": "Boone",
  "Zinc": "Boone",

  // Bradley County
  "Banks": "Bradley",
  "Hermitage": "Bradley",
  "Warren": "Bradley",

  // Calhoun County
  "Hampton": "Calhoun",
  "Harrell": "Calhoun",
  "Thornton": "Calhoun",
  "Tinsman": "Calhoun",

  // Carroll County
  "Berryville": "Carroll",
  "Blue Eye": "Carroll",
  "Eureka Springs": "Carroll",
  "Green Forest": "Carroll",
  "Holiday Island": "Carroll",
  "Oak Grove": "Carroll",

  // Chicot County
  "Dermott": "Chicot",
  "Eudora": "Chicot",
  "Lake Village": "Chicot",

  // Clark County
  "Amity": "Clark",
  "Arkadelphia": "Clark",
  "Beirne": "Clark",
  "Caddo Valley": "Clark",
  "Gurdon": "Clark",
  "Okolona": "Clark",
  "Whelen Springs": "Clark",

  // Clay County
  "Corning": "Clay",
  "Datto": "Clay",
  "Greenway": "Clay",
  "Knobel": "Clay",
  "McDougal": "Clay",
  "Peach Orchard": "Clay",
  "Piggott": "Clay",
  "Pollard": "Clay",
  "Rector": "Clay",
  "St. Francis": "Clay",
  "Success": "Clay",

  // Cleburne County
  "Concord": "Cleburne",
  "Greers Ferry": "Cleburne",
  "Heber Springs": "Cleburne",
  "Higden": "Cleburne",
  "Quitman": "Cleburne",

  // Cleveland County
  "Kingsland": "Cleveland",
  "Rison": "Cleveland",

  // Columbia County
  "Emerson": "Columbia",
  "Magnolia": "Columbia",
  "McNeil": "Columbia",
  "Taylor": "Columbia",
  "Waldo": "Columbia",

  // Conway County
  "Menifee": "Conway",
  "Morrilton": "Conway",
  "Oppelo": "Conway",
  "Plumerville": "Conway",
  "Solgohachia": "Conway",

  // Craighead County
  "Bay": "Craighead",
  "Black Oak": "Craighead",
  "Bono": "Craighead",
  "Brookland": "Craighead",
  "Caraway": "Craighead",
  "Cash": "Craighead",
  "Egypt": "Craighead",
  "Jonesboro": "Craighead",
  "Lake City": "Craighead",
  "Monette": "Craighead",

  // Crawford County
  "Alma": "Crawford",
  "Cedarville": "Crawford",
  "Chester": "Crawford",
  "Dyer": "Crawford",
  "Kibler": "Crawford",
  "Mountainburg": "Crawford",
  "Mulberry": "Crawford",
  "Natural Dam": "Crawford",
  "Rudy": "Crawford",
  "Van Buren": "Crawford",

  // Crittenden County
  "Anthonyville": "Crittenden",
  "Clarkedale": "Crittenden",
  "Crawfordsville": "Crittenden",
  "Earle": "Crittenden",
  "Edmondson": "Crittenden",
  "Gilmore": "Crittenden",
  "Horseshoe Lake": "Crittenden",
  "Jennette": "Crittenden",
  "Jericho": "Crittenden",
  "Marion": "Crittenden",
  "Sunset": "Crittenden",
  "Turrell": "Crittenden",
  "West Memphis": "Crittenden",

  // Cross County
  "Cherry Valley": "Cross",
  "Hickory Ridge": "Cross",
  "Parkin": "Cross",
  "Vanndale": "Cross",
  "Wynne": "Cross",

  // Dallas County
  "Carthage": "Dallas",
  "Fordyce": "Dallas",
  "Sparkman": "Dallas",

  // Desha County
  "Arkansas City": "Desha",
  "Dumas": "Desha",
  "McGehee": "Desha",
  "Mitchellville": "Desha",
  "Reed": "Desha",
  "Tillar": "Desha",
  "Watson": "Desha",

  // Drew County
  "Jerome": "Drew",
  "Monticello": "Drew",
  "Tillar": "Drew",
  "Wilmar": "Drew",
  "Winchester": "Drew",

  // Faulkner County
  "Conway": "Faulkner",
  "Damascus": "Faulkner",
  "Enola": "Faulkner",
  "Greenbrier": "Faulkner",
  "Guy": "Faulkner",
  "Holland": "Faulkner",
  "Mayflower": "Faulkner",
  "Mount Vernon": "Faulkner",
  "Twin Groves": "Faulkner",
  "Vilonia": "Faulkner",
  "Wooster": "Faulkner",

  // Franklin County
  "Altus": "Franklin",
  "Branch": "Franklin",
  "Charleston": "Franklin",
  "Denning": "Franklin",
  "Ozark": "Franklin",
  "Wiederkehr Village": "Franklin",

  // Fulton County
  "Ash Flat": "Fulton",
  "Cherokee Village": "Fulton",
  "Evening Shade": "Fulton",
  "Glencoe": "Fulton",
  "Hardy": "Fulton",
  "Highland": "Fulton",
  "Horseshoe Bend": "Fulton",
  "Mammoth Spring": "Fulton",
  "Salem": "Fulton",
  "Viola": "Fulton",

  // Garland County
  "Fountain Lake": "Garland",
  "Hot Springs": "Garland",
  "Hot Springs Village": "Garland",
  "Lonsdale": "Garland",
  "Mountain Pine": "Garland",

  // Grant County
  "Leola": "Grant",
  "Poyen": "Grant",
  "Prattsville": "Grant",
  "Sheridan": "Grant",
  "Tull": "Grant",

  // Greene County
  "Delaplaine": "Greene",
  "Lafe": "Greene",
  "Marmaduke": "Greene",
  "Oak Grove Heights": "Greene",
  "Paragould": "Greene",

  // Hempstead County
  "Blevins": "Hempstead",
  "Fulton": "Hempstead",
  "Hope": "Hempstead",
  "McCaskill": "Hempstead",
  "McNab": "Hempstead",
  "Oakhaven": "Hempstead",
  "Ozan": "Hempstead",
  "Patmos": "Hempstead",
  "Spring Hill": "Hempstead",
  "Washington": "Hempstead",

  // Hot Spring County
  "Donaldson": "Hot Spring",
  "Friendship": "Hot Spring",
  "Magnet Cove": "Hot Spring",
  "Malvern": "Hot Spring",
  "Midway": "Hot Spring",
  "Perla": "Hot Spring",
  "Rockport": "Hot Spring",

  // Howard County
  "Dierks": "Howard",
  "Mineral Springs": "Howard",
  "Nashville": "Howard",
  "Tollette": "Howard",

  // Independence County
  "Batesville": "Independence",
  "Cave City": "Independence",
  "Cushman": "Independence",
  "Desha": "Independence",
  "Magness": "Independence",
  "Moorefield": "Independence",
  "Newark": "Independence",
  "Oil Trough": "Independence",
  "Pleasant Plains": "Independence",
  "Sulphur Rock": "Independence",

  // Izard County
  "Calico Rock": "Izard",
  "Dolph": "Izard",
  "Franklin": "Izard",
  "Guion": "Izard",
  "Horseshoe Bend": "Izard",
  "Melbourne": "Izard",
  "Mount Pleasant": "Izard",
  "Oxford": "Izard",
  "Pineville": "Izard",

  // Jackson County
  "Amagon": "Jackson",
  "Beedeville": "Jackson",
  "Campbell Station": "Jackson",
  "Diaz": "Jackson",
  "Grubbs": "Jackson",
  "Jacksonport": "Jackson",
  "Newport": "Jackson",
  "Swifton": "Jackson",
  "Tuckerman": "Jackson",
  "Tupelo": "Jackson",
  "Weldon": "Jackson",

  // Jefferson County
  "Altheimer": "Jefferson",
  "Humphrey": "Jefferson",
  "Pine Bluff": "Jefferson",
  "Redfield": "Jefferson",
  "Sherrill": "Jefferson",
  "Wabbaseka": "Jefferson",
  "White Hall": "Jefferson",
  "Wright": "Jefferson",

  // Johnson County
  "Clarksville": "Johnson",
  "Coal Hill": "Johnson",
  "Hartman": "Johnson",
  "Knoxville": "Johnson",
  "Lamar": "Johnson",
  "Oark": "Johnson",

  // Lafayette County
  "Bradley": "Lafayette",
  "Buckner": "Lafayette",
  "Lewisville": "Lafayette",
  "Stamps": "Lafayette",

  // Lawrence County
  "Alicia": "Lawrence",
  "Black Rock": "Lawrence",
  "Hoxie": "Lawrence",
  "Imboden": "Lawrence",
  "Lynn": "Lawrence",
  "Portia": "Lawrence",
  "Powhatan": "Lawrence",
  "Ravenden": "Lawrence",
  "Ravenden Springs": "Lawrence",
  "Smithville": "Lawrence",
  "Strawberry": "Lawrence",
  "Walnut Ridge": "Lawrence",

  // Lee County
  "Aubrey": "Lee",
  "Haynes": "Lee",
  "LaGrange": "Lee",
  "Marianna": "Lee",
  "Moro": "Lee",
  "Rondo": "Lee",

  // Lincoln County
  "Gould": "Lincoln",
  "Grady": "Lincoln",
  "Star City": "Lincoln",
  "Yorktown": "Lincoln",

  // Little River County
  "Ashdown": "Little River",
  "Foreman": "Little River",
  "Ogden": "Little River",
  "Wilton": "Little River",
  "Winthrop": "Little River",

  // Logan County
  "Blue Mountain": "Logan",
  "Booneville": "Logan",
  "Caulksville": "Logan",
  "Magazine": "Logan",
  "Morrison Bluff": "Logan",
  "Paris": "Logan",
  "Ratcliff": "Logan",
  "Scranton": "Logan",
  "Subiaco": "Logan",

  // Lonoke County
  "Allport": "Lonoke",
  "Austin": "Lonoke",
  "Cabot": "Lonoke",
  "Carlisle": "Lonoke",
  "Coy": "Lonoke",
  "England": "Lonoke",
  "Humnoke": "Lonoke",
  "Keo": "Lonoke",
  "Lonoke": "Lonoke",
  "Scott": "Lonoke",
  "Ward": "Lonoke",

  // Madison County
  "Hindsville": "Madison",
  "Huntsville": "Madison",
  "Kingston": "Madison",
  "St. Paul": "Madison",

  // Marion County
  "Bull Shoals": "Marion",
  "Flippin": "Marion",
  "Pyatt": "Marion",
  "Summit": "Marion",
  "Yellville": "Marion",

  // Miller County
  "Doddridge": "Miller",
  "Fouke": "Miller",
  "Garland": "Miller",
  "Genoa": "Miller",
  "Texarkana": "Miller",

  // Mississippi County
  "Bassett": "Mississippi",
  "Birdsong": "Mississippi",
  "Blytheville": "Mississippi",
  "Burdette": "Mississippi",
  "Dell": "Mississippi",
  "Dyess": "Mississippi",
  "Etowah": "Mississippi",
  "Gosnell": "Mississippi",
  "Joiner": "Mississippi",
  "Keiser": "Mississippi",
  "Leachville": "Mississippi",
  "Luxora": "Mississippi",
  "Manila": "Mississippi",
  "Marie": "Mississippi",
  "Osceola": "Mississippi",
  "Victoria": "Mississippi",
  "Wilson": "Mississippi",

  // Monroe County
  "Brinkley": "Monroe",
  "Clarendon": "Monroe",
  "Holly Grove": "Monroe",
  "Roe": "Monroe",

  // Montgomery County
  "Black Springs": "Montgomery",
  "Mount Ida": "Montgomery",
  "Norman": "Montgomery",
  "Oden": "Montgomery",

  // Nevada County
  "Bluff City": "Nevada",
  "Bodcaw": "Nevada",
  "Cale": "Nevada",
  "Emmet": "Nevada",
  "Prescott": "Nevada",
  "Rosston": "Nevada",
  "Willisville": "Nevada",

  // Newton County
  "Jasper": "Newton",
  "Western Grove": "Newton",

  // Ouachita County
  "Bearden": "Ouachita",
  "Camden": "Ouachita",
  "Chidester": "Ouachita",
  "East Camden": "Ouachita",
  "Louann": "Ouachita",
  "Reader": "Ouachita",
  "Stephens": "Ouachita",

  // Perry County
  "Adona": "Perry",
  "Bigelow": "Perry",
  "Casa": "Perry",
  "Houston": "Perry",
  "Perry": "Perry",
  "Perryville": "Perry",

  // Phillips County
  "Elaine": "Phillips",
  "Helena-West Helena": "Phillips",
  "Lake View": "Phillips",
  "Lexa": "Phillips",
  "Marvell": "Phillips",
  "West Helena": "Phillips",

  // Pike County
  "Antoine": "Pike",
  "Daisy": "Pike",
  "Delight": "Pike",
  "Glenwood": "Pike",
  "Murfreesboro": "Pike",

  // Poinsett County
  "Fisher": "Poinsett",
  "Harrisburg": "Poinsett",
  "Lepanto": "Poinsett",
  "Marked Tree": "Poinsett",
  "Trumann": "Poinsett",
  "Tyronza": "Poinsett",
  "Weiner": "Poinsett",
  "Waldenburg": "Poinsett",

  // Polk County
  "Cove": "Polk",
  "Grannis": "Polk",
  "Hatfield": "Polk",
  "Mena": "Polk",
  "Vandervoort": "Polk",
  "Wickes": "Polk",

  // Pope County
  "Atkins": "Pope",
  "Dover": "Pope",
  "Hector": "Pope",
  "London": "Pope",
  "Pottsville": "Pope",
  "Russellville": "Pope",

  // Prairie County
  "Biscoe": "Prairie",
  "De Valls Bluff": "Prairie",
  "Des Arc": "Prairie",
  "Hazen": "Prairie",
  "Ulm": "Prairie",

  // Pulaski County
  "Alexander": "Pulaski",
  "Cammack Village": "Pulaski",
  "Jacksonville": "Pulaski",
  "Little Rock": "Pulaski",
  "Maumelle": "Pulaski",
  "North Little Rock": "Pulaski",
  "Sherwood": "Pulaski",
  "Wrightsville": "Pulaski",

  // Randolph County
  "Biggers": "Randolph",
  "Maynard": "Randolph",
  "O'Kean": "Randolph",
  "Pocahontas": "Randolph",
  "Ravenden Springs": "Randolph",
  "Reyno": "Randolph",
  "Warm Springs": "Randolph",

  // St. Francis County
  "Caldwell": "St. Francis",
  "Colt": "St. Francis",
  "Forrest City": "St. Francis",
  "Hughes": "St. Francis",
  "Madison": "St. Francis",
  "Palestine": "St. Francis",
  "Wheatley": "St. Francis",
  "Widener": "St. Francis",

  // Saline County
  "Alexander": "Saline",
  "Bauxite": "Saline",
  "Benton": "Saline",
  "Bryant": "Saline",
  "Haskell": "Saline",
  "Shannon Hills": "Saline",
  "Traskwood": "Saline",

  // Scott County
  "Mansfield": "Scott",
  "Waldron": "Scott",

  // Searcy County
  "Gilbert": "Searcy",
  "Leslie": "Searcy",
  "Marshall": "Searcy",
  "Pindall": "Searcy",
  "St. Joe": "Searcy",

  // Sebastian County
  "Barling": "Sebastian",
  "Bonanza": "Sebastian",
  "Central City": "Sebastian",
  "Fort Smith": "Sebastian",
  "Greenwood": "Sebastian",
  "Hackett": "Sebastian",
  "Hartford": "Sebastian",
  "Huntington": "Sebastian",
  "Lavaca": "Sebastian",
  "Midland": "Sebastian",

  // Sevier County
  "Ben Lomond": "Sevier",
  "De Queen": "Sevier",
  "Gillham": "Sevier",
  "Horatio": "Sevier",
  "Lockesburg": "Sevier",

  // Sharp County
  "Ash Flat": "Sharp",
  "Cave City": "Sharp",
  "Cherokee Village": "Sharp",
  "Evening Shade": "Sharp",
  "Hardy": "Sharp",
  "Highland": "Sharp",
  "Sidney": "Sharp",
  "Williford": "Sharp",

  // Stone County
  "Fifty-Six": "Stone",
  "Mountain View": "Stone",

  // Union County
  "Calion": "Union",
  "El Dorado": "Union",
  "Felsenthal": "Union",
  "Huttig": "Union",
  "Junction City": "Union",
  "Norphlet": "Union",
  "Smackover": "Union",
  "Strong": "Union",

  // Van Buren County
  "Bee Branch": "Van Buren",
  "Botkinburg": "Van Buren",
  "Clinton": "Van Buren",
  "Fairfield Bay": "Van Buren",
  "Shirley": "Van Buren",

  // Washington County
  "Elkins": "Washington",
  "Elm Springs": "Washington",
  "Farmington": "Washington",
  "Fayetteville": "Washington",
  "Goshen": "Washington",
  "Greenland": "Washington",
  "Johnson": "Washington",
  "Lincoln": "Washington",
  "Prairie Grove": "Washington",
  "Springdale": "Washington",
  "Tontitown": "Washington",
  "West Fork": "Washington",
  "Winslow": "Washington",

  // White County
  "Bald Knob": "White",
  "Beebe": "White",
  "Bradford": "White",
  "Georgetown": "White",
  "Griffithville": "White",
  "Higginson": "White",
  "Judsonia": "White",
  "Kensett": "White",
  "Letona": "White",
  "McRae": "White",
  "Pangburn": "White",
  "Rose Bud": "White",
  "Russell": "White",
  "Searcy": "White",
  "West Point": "White",

  // Woodruff County
  "Augusta": "Woodruff",
  "Cotton Plant": "Woodruff",
  "Hunter": "Woodruff",
  "McCrory": "Woodruff",
  "Patterson": "Woodruff",

  // Yell County
  "Belleville": "Yell",
  "Centerville": "Yell",
  "Danville": "Yell",
  "Dardanelle": "Yell",
  "Havana": "Yell",
  "Ola": "Yell",
  "Plainview": "Yell"
};

// Populations for Arkansas communities
const populations = {
  "Little Rock": 202591,
  "Fort Smith": 87845,
  "Fayetteville": 93949,
  "Springdale": 84312,
  "Jonesboro": 78576,
  "Rogers": 72758,
  "Conway": 67336,
  "North Little Rock": 64633,
  "Bentonville": 54909,
  "Pine Bluff": 41253,
  "Hot Springs": 38249,
  "Benton": 36820,
  "Sherwood": 32517,
  "Texarkana": 30259,
  "Bryant": 22095,
  "Jacksonville": 29584,
  "Russellville": 29858,
  "Cabot": 26799,
  "Paragould": 29629,
  "Bella Vista": 30678,
  "West Memphis": 24587,
  "Searcy": 24120,
  "Van Buren": 24142,
  "El Dorado": 17751,
  "Maumelle": 19251,
  "Siloam Springs": 17406,
  "Blytheville": 13415,
  "Forrest City": 14026,
  "Harrison": 13184,
  "Mountain Home": 12829,
  "Marion": 12577,
  "Helena-West Helena": 10186,
  "Camden": 10671,
  "Magnolia": 11403,
  "Arkadelphia": 10727,
  "Malvern": 10866,
  "Batesville": 11191,
  "Hope": 9378,
  "Stuttgart": 8878,
  "Clarksville": 9732,
  "Monticello": 9467,
  "Wynne": 8082,
  "Newport": 7745,
  "Osceola": 7109,
  "De Queen": 6776,
  "Alma": 5778,
  "Heber Springs": 7189,
  "Trumann": 7007,
  "Lowell": 9590,
  "Centerton": 17153,
  "Greenwood": 9573,
  "Pocahontas": 6599,
  "Warren": 5766,
  "Mena": 5623,
  "Walnut Ridge": 5270,
  "Farmington": 8075,
  "Nashville": 4359,
  "Fordyce": 3627,
  "Prairie Grove": 7244,
  "Pea Ridge": 6689,
  "Dumas": 3874,
  "Cherokee Village": 5018,
  "Crossett": 4852,
  "Berryville": 5616,
  "Booneville": 3696,
  "Eureka Springs": 2073,
  "Gravette": 3562,
  "Lake City": 2316,
  "Gentry": 3958,
  "Hamburg": 2667,
  "Ashdown": 4174,
  "McGehee": 3684,
  "Hoxie": 2594,
  "Greenbrier": 5939,
  "Star City": 2166,
  "Bull Shoals": 1989,
  "Flippin": 1353,
  "Yellville": 1183,
  "Mountain View": 2758,
  "Clinton": 2521,
  "Marshall": 1316,
  "Jasper": 498,
  "Green Forest": 2809,
  "Ozark": 3602,
  "Paris": 3310,
  "Dardanelle": 4690,
  "Morrilton": 6631,
  "Lonoke": 4325,
  "Sheridan": 5041,
  "White Hall": 5110,
  "Vilonia": 4629,
  "Ward": 5354
};

// Business categories for Arkansas
const businessCategories = [
  "Restaurant", "Southern Restaurant", "BBQ", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Hardware Store", "Farm Supply", "Pharmacy",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym",
  "Pet Store", "Florist", "Bakery", "Pizza", "Fast Food",
  "Hotel", "Motel", "Bed & Breakfast", "RV Park",
  "Gun Shop", "Pawn Shop", "Thrift Store", "Furniture Store",
  "Outdoor Store", "Sporting Goods", "Landscaping", "Lawn Care",
  "HVAC", "Plumber", "Electrician", "Roofing", "Construction"
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
    const prefixes = [townName, "Arkansas", "Natural State", "Ozark", "Delta", "Southern", "River Valley", "Hometown"];
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

for (const [townName, county] of Object.entries(arkansasTowns)) {
  const slug = slugify(townName) + '-ar';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 100000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "AR");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Arkansas",
    state_abbr: "AR",
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
title: "${townName}, AR Business Directory"
type: "towns"
slug: "${slug}"
state: "ar"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Arkansas Business Directory"
slug: "ar"
state: "ar"
state_name: "Arkansas"
---
`;
fs.writeFileSync(path.join(statesDir, 'ar.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
