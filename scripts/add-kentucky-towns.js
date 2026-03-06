import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Kentucky municipalities with their counties (120 counties)
const kentuckyTowns = {
  // Jefferson County (Louisville area)
  "Louisville": "Jefferson",
  "Jeffersontown": "Jefferson",
  "St. Matthews": "Jefferson",
  "Shively": "Jefferson",
  "Lyndon": "Jefferson",
  "Middletown": "Jefferson",
  "Anchorage": "Jefferson",
  "Prospect": "Jefferson",
  "Hurstbourne": "Jefferson",
  "Douglass Hills": "Jefferson",
  "Indian Hills": "Jefferson",
  "Graymoor-Devondale": "Jefferson",
  "Worthington Hills": "Jefferson",
  "Northfield": "Jefferson",
  "Windy Hills": "Jefferson",
  "Bellewood": "Jefferson",
  "Barbourmeade": "Jefferson",
  "Rolling Hills": "Jefferson",
  "Beechwood Village": "Jefferson",
  "Strathmoor Manor": "Jefferson",

  // Fayette County (Lexington area)
  "Lexington": "Fayette",

  // Kenton County (Covington area)
  "Covington": "Kenton",
  "Erlanger": "Kenton",
  "Independence": "Kenton",
  "Fort Wright": "Kenton",
  "Edgewood": "Kenton",
  "Villa Hills": "Kenton",
  "Elsmere": "Kenton",
  "Crestview Hills": "Kenton",
  "Park Hills": "Kenton",
  "Taylor Mill": "Kenton",
  "Lakeside Park": "Kenton",
  "Bromley": "Kenton",
  "Ludlow": "Kenton",
  "Fort Mitchell": "Kenton",
  "Crescent Springs": "Kenton",
  "Ryland Heights": "Kenton",
  "South Fort Mitchell": "Kenton",

  // Boone County
  "Florence": "Boone",
  "Union": "Boone",
  "Burlington": "Boone",
  "Hebron": "Boone",
  "Walton": "Boone",
  "Petersburg": "Boone",
  "Rabbit Hash": "Boone",
  "Verona": "Boone",
  "Francisville": "Boone",

  // Campbell County
  "Newport": "Campbell",
  "Fort Thomas": "Campbell",
  "Bellevue": "Campbell",
  "Dayton": "Campbell",
  "Alexandria": "Campbell",
  "Highland Heights": "Campbell",
  "Wilder": "Campbell",
  "Southgate": "Campbell",
  "Cold Spring": "Campbell",
  "Silver Grove": "Campbell",
  "Woodlawn": "Campbell",

  // Warren County (Bowling Green area)
  "Bowling Green": "Warren",
  "Smiths Grove": "Warren",
  "Oakland": "Warren",
  "Plum Springs": "Warren",
  "Woodburn": "Warren",

  // Hardin County (Elizabethtown area)
  "Elizabethtown": "Hardin",
  "Radcliff": "Hardin",
  "Vine Grove": "Hardin",
  "Fort Knox": "Hardin",
  "West Point": "Hardin",
  "Sonora": "Hardin",
  "Cecilia": "Hardin",
  "Glendale": "Hardin",

  // Madison County (Richmond area)
  "Richmond": "Madison",
  "Berea": "Madison",
  "Waco": "Madison",
  "Paint Lick": "Madison",

  // Daviess County (Owensboro area)
  "Owensboro": "Daviess",
  "Whitesville": "Daviess",
  "Philpot": "Daviess",
  "Sorgho": "Daviess",
  "Knottsville": "Daviess",

  // Christian County (Hopkinsville area)
  "Hopkinsville": "Christian",
  "Fort Campbell North": "Christian",
  "Pembroke": "Christian",
  "Crofton": "Christian",
  "Oak Grove": "Christian",

  // McCracken County (Paducah area)
  "Paducah": "McCracken",
  "Reidland": "McCracken",
  "Lone Oak": "McCracken",

  // Oldham County
  "La Grange": "Oldham",
  "Pewee Valley": "Oldham",
  "Crestwood": "Oldham",
  "Goshen": "Oldham",
  "Buckner": "Oldham",
  "Prospect": "Oldham",
  "Orchard Grass Hills": "Oldham",

  // Bullitt County
  "Shepherdsville": "Bullitt",
  "Mount Washington": "Bullitt",
  "Hillview": "Bullitt",
  "Lebanon Junction": "Bullitt",
  "Pioneer Village": "Bullitt",
  "Fox Chase": "Bullitt",

  // Boyd County (Ashland area)
  "Ashland": "Boyd",
  "Catlettsburg": "Boyd",
  "Westwood": "Boyd",
  "Flatwoods": "Boyd",
  "Cannonsburg": "Boyd",

  // Laurel County (London area)
  "London": "Laurel",
  "East Bernstadt": "Laurel",

  // Pike County
  "Pikeville": "Pike",
  "Coal Run Village": "Pike",
  "Elkhorn City": "Pike",
  "Virgie": "Pike",

  // Pulaski County (Somerset area)
  "Somerset": "Pulaski",
  "Burnside": "Pulaski",
  "Science Hill": "Pulaski",
  "Ferguson": "Pulaski",

  // Jessamine County (Nicholasville area)
  "Nicholasville": "Jessamine",
  "Wilmore": "Jessamine",

  // Scott County (Georgetown area)
  "Georgetown": "Scott",
  "Sadieville": "Scott",
  "Stamping Ground": "Scott",

  // Franklin County (Frankfort area)
  "Frankfort": "Franklin",

  // Henderson County
  "Henderson": "Henderson",
  "Corydon": "Henderson",
  "Robards": "Henderson",
  "Spottsville": "Henderson",
  "Baskett": "Henderson",

  // Hopkins County (Madisonville area)
  "Madisonville": "Hopkins",
  "Nortonville": "Hopkins",
  "Dawson Springs": "Hopkins",
  "Mortons Gap": "Hopkins",
  "Hanson": "Hopkins",
  "Earlington": "Hopkins",
  "White Plains": "Hopkins",

  // Graves County (Mayfield area)
  "Mayfield": "Graves",
  "Wingo": "Graves",
  "Symsonia": "Graves",
  "Fancy Farm": "Graves",
  "Cuba": "Graves",

  // Calloway County (Murray area)
  "Murray": "Calloway",
  "Hazel": "Calloway",
  "Dexter": "Calloway",
  "Almo": "Calloway",

  // Clark County (Winchester area)
  "Winchester": "Clark",

  // Greenup County
  "Greenup": "Greenup",
  "Russell": "Greenup",
  "Raceland": "Greenup",
  "Flatwoods": "Greenup",
  "Wurtland": "Greenup",
  "South Shore": "Greenup",
  "Bellefonte": "Greenup",
  "Worthington": "Greenup",

  // Nelson County (Bardstown area)
  "Bardstown": "Nelson",
  "New Haven": "Nelson",
  "Bloomfield": "Nelson",

  // Carter County
  "Grayson": "Carter",
  "Olive Hill": "Carter",

  // Floyd County
  "Prestonsburg": "Floyd",
  "Martin": "Floyd",
  "Allen": "Floyd",
  "Wheelwright": "Floyd",
  "Wayland": "Floyd",

  // Knox County (Barbourville area)
  "Barbourville": "Knox",

  // Whitley County (Corbin area)
  "Corbin": "Whitley",
  "Williamsburg": "Whitley",

  // Bell County (Middlesboro area)
  "Middlesboro": "Bell",
  "Pineville": "Bell",

  // Harlan County
  "Harlan": "Harlan",
  "Evarts": "Harlan",
  "Cumberland": "Harlan",
  "Lynch": "Harlan",
  "Benham": "Harlan",

  // Letcher County (Whitesburg area)
  "Whitesburg": "Letcher",
  "Jenkins": "Letcher",
  "Fleming-Neon": "Letcher",

  // Perry County (Hazard area)
  "Hazard": "Perry",
  "Vicco": "Perry",

  // Breathitt County (Jackson area)
  "Jackson": "Breathitt",

  // Wolfe County
  "Campton": "Wolfe",

  // Lee County
  "Beattyville": "Lee",

  // Owsley County
  "Booneville": "Owsley",

  // Clay County (Manchester area)
  "Manchester": "Clay",

  // Leslie County
  "Hyden": "Leslie",

  // Knott County
  "Hindman": "Knott",

  // Magoffin County
  "Salyersville": "Magoffin",

  // Morgan County
  "West Liberty": "Morgan",

  // Johnson County (Paintsville area)
  "Paintsville": "Johnson",

  // Martin County
  "Inez": "Martin",

  // Lawrence County
  "Louisa": "Lawrence",

  // Elliott County
  "Sandy Hook": "Elliott",

  // Rowan County (Morehead area)
  "Morehead": "Rowan",

  // Bath County
  "Owingsville": "Bath",

  // Montgomery County (Mount Sterling area)
  "Mount Sterling": "Montgomery",

  // Powell County (Stanton area)
  "Stanton": "Powell",
  "Clay City": "Powell",

  // Menifee County
  "Frenchburg": "Menifee",

  // Estill County (Irvine area)
  "Irvine": "Estill",
  "Ravenna": "Estill",

  // Jackson County (McKee area)
  "McKee": "Jackson",

  // Rockcastle County (Mount Vernon area)
  "Mount Vernon": "Rockcastle",
  "Brodhead": "Rockcastle",
  "Livingston": "Rockcastle",

  // Lincoln County (Stanford area)
  "Stanford": "Lincoln",
  "Crab Orchard": "Lincoln",
  "Hustonville": "Lincoln",

  // Boyle County (Danville area)
  "Danville": "Boyle",
  "Junction City": "Boyle",
  "Perryville": "Boyle",

  // Mercer County (Harrodsburg area)
  "Harrodsburg": "Mercer",
  "Burgin": "Mercer",

  // Garrard County (Lancaster area)
  "Lancaster": "Garrard",

  // Washington County (Springfield area)
  "Springfield": "Washington",
  "Willisburg": "Washington",

  // Marion County (Lebanon area)
  "Lebanon": "Marion",
  "Loretto": "Marion",
  "Bradfordsville": "Marion",

  // Taylor County (Campbellsville area)
  "Campbellsville": "Taylor",
  "Elkhorn": "Taylor",

  // Green County (Greensburg area)
  "Greensburg": "Green",

  // Adair County (Columbia area)
  "Columbia": "Adair",

  // Casey County (Liberty area)
  "Liberty": "Casey",

  // Russell County (Jamestown area)
  "Jamestown": "Russell",

  // Clinton County (Albany area)
  "Albany": "Clinton",

  // Cumberland County (Burkesville area)
  "Burkesville": "Cumberland",

  // Monroe County (Tompkinsville area)
  "Tompkinsville": "Monroe",
  "Gamaliel": "Monroe",

  // Metcalfe County (Edmonton area)
  "Edmonton": "Metcalfe",

  // Barren County (Glasgow area)
  "Glasgow": "Barren",
  "Cave City": "Barren",
  "Park City": "Barren",

  // Hart County (Munfordville area)
  "Munfordville": "Hart",
  "Horse Cave": "Hart",
  "Hardyville": "Hart",

  // LaRue County (Hodgenville area)
  "Hodgenville": "LaRue",
  "Buffalo": "LaRue",

  // Grayson County (Leitchfield area)
  "Leitchfield": "Grayson",
  "Clarkson": "Grayson",
  "Caneyville": "Grayson",

  // Breckinridge County
  "Hardinsburg": "Breckinridge",
  "Irvington": "Breckinridge",
  "Cloverport": "Breckinridge",

  // Meade County (Brandenburg area)
  "Brandenburg": "Meade",
  "Muldraugh": "Meade",

  // Hancock County
  "Hawesville": "Hancock",
  "Lewisport": "Hancock",

  // Ohio County (Hartford area)
  "Hartford": "Ohio",
  "Beaver Dam": "Ohio",
  "Centertown": "Ohio",
  "Fordsville": "Ohio",

  // Butler County (Morgantown area)
  "Morgantown": "Butler",
  "Rochester": "Butler",

  // Edmonson County (Brownsville area)
  "Brownsville": "Edmonson",

  // Warren County
  "Plano": "Warren",

  // Logan County (Russellville area)
  "Russellville": "Logan",
  "Auburn": "Logan",
  "Lewisburg": "Logan",

  // Simpson County (Franklin area)
  "Franklin": "Simpson",

  // Allen County (Scottsville area)
  "Scottsville": "Allen",

  // Todd County (Elkton area)
  "Elkton": "Todd",
  "Trenton": "Todd",
  "Guthrie": "Todd",

  // Muhlenberg County (Central City area)
  "Central City": "Muhlenberg",
  "Greenville": "Muhlenberg",
  "Drakesboro": "Muhlenberg",
  "Bremen": "Muhlenberg",
  "Graham": "Muhlenberg",

  // McLean County (Calhoun area)
  "Calhoun": "McLean",
  "Sacramento": "McLean",
  "Livermore": "McLean",
  "Island": "McLean",
  "Beech Grove": "McLean",

  // Webster County (Dixon area)
  "Dixon": "Webster",
  "Providence": "Webster",
  "Slaughters": "Webster",
  "Sebree": "Webster",
  "Clay": "Webster",

  // Union County (Morganfield area)
  "Morganfield": "Union",
  "Sturgis": "Union",
  "Uniontown": "Union",
  "Waverly": "Union",

  // Crittenden County (Marion area)
  "Marion": "Crittenden",

  // Livingston County (Smithland area)
  "Smithland": "Livingston",
  "Grand Rivers": "Livingston",
  "Salem": "Livingston",

  // Lyon County (Eddyville area)
  "Eddyville": "Lyon",
  "Kuttawa": "Lyon",

  // Caldwell County (Princeton area)
  "Princeton": "Caldwell",
  "Fredonia": "Caldwell",

  // Trigg County (Cadiz area)
  "Cadiz": "Trigg",

  // Marshall County (Benton area)
  "Benton": "Marshall",
  "Calvert City": "Marshall",
  "Gilbertsville": "Marshall",

  // Ballard County (LaCenter area)
  "LaCenter": "Ballard",
  "Barlow": "Ballard",
  "Wickliffe": "Ballard",
  "Kevil": "Ballard",

  // Carlisle County (Bardwell area)
  "Bardwell": "Carlisle",
  "Arlington": "Carlisle",
  "Cunningham": "Carlisle",

  // Hickman County (Clinton area)
  "Clinton": "Hickman",
  "Columbus": "Hickman",

  // Fulton County (Fulton area)
  "Fulton": "Fulton",
  "Hickman": "Fulton",

  // Shelby County (Shelbyville area)
  "Shelbyville": "Shelby",
  "Simpsonville": "Shelby",
  "Finchville": "Shelby",

  // Henry County (New Castle area)
  "New Castle": "Henry",
  "Eminence": "Henry",
  "Smithfield": "Henry",
  "Campbellsburg": "Henry",

  // Owen County (Owenton area)
  "Owenton": "Owen",
  "Gratz": "Owen",
  "Monterey": "Owen",

  // Carroll County (Carrollton area)
  "Carrollton": "Carroll",
  "Ghent": "Carroll",
  "Prestonville": "Carroll",
  "Sanders": "Carroll",
  "English": "Carroll",
  "Worthville": "Carroll",

  // Gallatin County (Warsaw area)
  "Warsaw": "Gallatin",
  "Glencoe": "Gallatin",
  "Sparta": "Gallatin",

  // Grant County (Williamstown area)
  "Williamstown": "Grant",
  "Crittenden": "Grant",
  "Corinth": "Grant",
  "Dry Ridge": "Grant",

  // Pendleton County (Falmouth area)
  "Falmouth": "Pendleton",

  // Bracken County (Brooksville area)
  "Brooksville": "Bracken",
  "Augusta": "Bracken",
  "Germantown": "Bracken",
  "Milford": "Bracken",
  "Foster": "Bracken",

  // Robertson County
  "Mount Olivet": "Robertson",

  // Mason County (Maysville area)
  "Maysville": "Mason",
  "Sardis": "Mason",
  "Orangeburg": "Mason",
  "Dover": "Mason",

  // Lewis County (Vanceburg area)
  "Vanceburg": "Lewis",

  // Fleming County (Flemingsburg area)
  "Flemingsburg": "Fleming",

  // Nicholas County (Carlisle area)
  "Carlisle": "Nicholas",

  // Bourbon County (Paris area)
  "Paris": "Bourbon",
  "Millersburg": "Bourbon",
  "North Middletown": "Bourbon",

  // Harrison County (Cynthiana area)
  "Cynthiana": "Harrison",
  "Berry": "Harrison",

  // Anderson County (Lawrenceburg area)
  "Lawrenceburg": "Anderson",

  // Woodford County (Versailles area)
  "Versailles": "Woodford",
  "Midway": "Woodford",

  // Spencer County (Taylorsville area)
  "Taylorsville": "Spencer",

  // Trimble County (Bedford area)
  "Bedford": "Trimble",
  "Milton": "Trimble"
};

// Population estimates for Kentucky cities
const populations = {
  "Louisville": 633045,
  "Lexington": 323780,
  "Bowling Green": 74039,
  "Owensboro": 60183,
  "Covington": 40961,
  "Richmond": 36330,
  "Georgetown": 37188,
  "Florence": 33195,
  "Hopkinsville": 30539,
  "Nicholasville": 32280,
  "Elizabethtown": 30289,
  "Henderson": 28575,
  "Frankfort": 28602,
  "Independence": 28581,
  "Jeffersontown": 27715,
  "Paducah": 27137,
  "Radcliff": 23191,
  "Ashland": 20082,
  "Madisonville": 18797,
  "Murray": 19254,
  "Erlanger": 19251,
  "Winchester": 18891,
  "St. Matthews": 18215,
  "Danville": 16949,
  "Fort Thomas": 16317,
  "Newport": 14991,
  "Shively": 15369,
  "Shelbyville": 16598,
  "Bardstown": 13530,
  "Berea": 16089,
  "London": 8126,
  "Somerset": 12749,
  "Glasgow": 14658,
  "Pikeville": 6903,
  "Corbin": 7224,
  "Campbellsville": 11519,
  "Mount Sterling": 7569,
  "Maysville": 8783,
  "Paris": 9846,
  "Harrodsburg": 8529,
  "Cynthiana": 6327,
  "Lebanon": 5934,
  "Hazard": 5044,
  "Morehead": 7604,
  "Middlesboro": 9426,
  "Williamsburg": 5144,
  "Prestonsburg": 3273,
  "Paintsville": 3954,
  "Grayson": 4012,
  "Mayfield": 9981,
  "Princeton": 6329,
  "Russellville": 6924,
  "Franklin": 8898,
  "Scottsville": 4499,
  "Central City": 5971,
  "Greenville": 4288,
  "Harlan": 1498,
  "Whitesburg": 1838,
  "Barbourville": 3233,
  "Manchester": 1468,
  "Jackson": 2168,
  "Beattyville": 1253,
  "Louisa": 2463,
  "West Liberty": 3348,
  "Salyersville": 1723,
  "Stanford": 3654,
  "Lancaster": 3982,
  "Springfield": 2852,
  "Liberty": 1916,
  "Columbia": 4572,
  "Greensburg": 2162,
  "Edmonton": 1622,
  "Tompkinsville": 2266,
  "Burkesville": 1475,
  "Albany": 2015,
  "Jamestown": 1734,
  "Cave City": 2381,
  "Munfordville": 1612,
  "Hodgenville": 3206,
  "Leitchfield": 6783,
  "Hardinsburg": 2340,
  "Brandenburg": 2834,
  "Hawesville": 943,
  "Hartford": 2705,
  "Beaver Dam": 3517,
  "Morgantown": 2401,
  "Brownsville": 869,
  "Auburn": 1486,
  "Elkton": 2058,
  "Cadiz": 2553,
  "Benton": 4415,
  "Eddyville": 2570,
  "Marion": 3039,
  "Morganfield": 3285,
  "Dixon": 883,
  "Sturgis": 1872,
  "Calhoun": 771,
  "LaCenter": 1013,
  "Clinton": 1351,
  "Hickman": 2117,
  "Fulton": 2445,
  "Carrollton": 3815,
  "Warsaw": 1791,
  "Williamstown": 3910,
  "Falmouth": 2126,
  "Owenton": 1418,
  "New Castle": 917,
  "Lawrenceburg": 11292,
  "Versailles": 9321,
  "Taylorsville": 1287,
  "Bedford": 688,
  "Mount Olivet": 313,
  "Flemingsburg": 2858,
  "Carlisle": 1869,
  "Brooksville": 627,
  "Augusta": 1168,
  "Vanceburg": 1381,
  "Irvine": 2489,
  "Stanton": 2696,
  "McKee": 826,
  "Mount Vernon": 2487,
  "Hyden": 369,
  "Hindman": 777,
  "Inez": 511,
  "Sandy Hook": 546,
  "Campton": 425,
  "Booneville": 75,
  "Jenkins": 2082
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
  "Farm Equipment", "Feed Mill", "Grain Elevator", "Farm Supply"
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

    const prefixes = [townName, county, "Bluegrass", "Kentucky", "Bourbon", "Derby", "Commonwealth", "Cardinal", "Wildcat"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, KY`,
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

for (const [townName, county] of Object.entries(kentuckyTowns)) {
  const slug = generateSlug(townName) + '-ky';
  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Kentucky",
    state_abbr: "KY",
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
title: "${townName}, Kentucky Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Kentucky"
state_abbr: "KY"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Kentucky Business Directory"
slug: "ky"
state: "ky"
state_name: "Kentucky"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'ky.md'), stateContent);

console.log(`Created Kentucky towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
