import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// South Carolina municipalities with their counties
const southCarolinaTowns = {
  // Abbeville County
  "Abbeville": "Abbeville",
  "Calhoun Falls": "Abbeville",
  "Due West": "Abbeville",
  "Donalds": "Abbeville",
  "Lowndesville": "Abbeville",

  // Aiken County
  "Aiken": "Aiken",
  "North Augusta": "Aiken",
  "Wagener": "Aiken",
  "Salley": "Aiken",
  "Jackson": "Aiken",
  "New Ellenton": "Aiken",
  "Burnettown": "Aiken",
  "Perry": "Aiken",
  "Monetta": "Aiken",
  "Windsor": "Aiken",

  // Allendale County
  "Allendale": "Allendale",
  "Fairfax": "Allendale",
  "Sycamore": "Allendale",

  // Anderson County
  "Anderson": "Anderson",
  "Belton": "Anderson",
  "Honea Path": "Anderson",
  "Williamston": "Anderson",
  "Pendleton": "Anderson",
  "Pelzer": "Anderson",
  "Iva": "Anderson",
  "Starr": "Anderson",
  "West Pelzer": "Anderson",

  // Bamberg County
  "Bamberg": "Bamberg",
  "Denmark": "Bamberg",
  "Ehrhardt": "Bamberg",
  "Govan": "Bamberg",
  "Olar": "Bamberg",

  // Barnwell County
  "Barnwell": "Barnwell",
  "Blackville": "Barnwell",
  "Williston": "Barnwell",
  "Elko": "Barnwell",
  "Hilda": "Barnwell",
  "Snelling": "Barnwell",
  "Kline": "Barnwell",

  // Beaufort County
  "Beaufort": "Beaufort",
  "Hilton Head Island": "Beaufort",
  "Bluffton": "Beaufort",
  "Port Royal": "Beaufort",
  "Yemassee": "Beaufort",

  // Berkeley County
  "Goose Creek": "Berkeley",
  "Hanahan": "Berkeley",
  "Moncks Corner": "Berkeley",
  "Bonneau": "Berkeley",
  "St. Stephen": "Berkeley",
  "Jamestown": "Berkeley",

  // Calhoun County
  "St. Matthews": "Calhoun",
  "Cameron": "Calhoun",

  // Charleston County
  "Charleston": "Charleston",
  "North Charleston": "Charleston",
  "Mount Pleasant": "Charleston",
  "Summerville": "Charleston",
  "Isle of Palms": "Charleston",
  "Folly Beach": "Charleston",
  "Sullivan's Island": "Charleston",
  "Ravenel": "Charleston",
  "Hollywood": "Charleston",
  "Meggett": "Charleston",
  "Rockville": "Charleston",
  "McClellanville": "Charleston",
  "Lincolnville": "Charleston",
  "Edisto Beach": "Charleston",
  "James Island": "Charleston",
  "Kiawah Island": "Charleston",
  "Seabrook Island": "Charleston",
  "Awendaw": "Charleston",

  // Cherokee County
  "Gaffney": "Cherokee",
  "Blacksburg": "Cherokee",

  // Chester County
  "Chester": "Chester",
  "Great Falls": "Chester",
  "Fort Lawn": "Chester",
  "Lowrys": "Chester",
  "Richburg": "Chester",

  // Chesterfield County
  "Chesterfield": "Chesterfield",
  "Cheraw": "Chesterfield",
  "Pageland": "Chesterfield",
  "McBee": "Chesterfield",
  "Jefferson": "Chesterfield",
  "Patrick": "Chesterfield",
  "Mount Croghan": "Chesterfield",
  "Ruby": "Chesterfield",

  // Clarendon County
  "Manning": "Clarendon",
  "Summerton": "Clarendon",
  "Turbeville": "Clarendon",
  "Paxville": "Clarendon",

  // Colleton County
  "Walterboro": "Colleton",
  "Cottageville": "Colleton",
  "Edisto Beach": "Colleton",
  "Lodge": "Colleton",
  "Smoaks": "Colleton",
  "Williams": "Colleton",

  // Darlington County
  "Darlington": "Darlington",
  "Hartsville": "Darlington",
  "Lamar": "Darlington",
  "Society Hill": "Darlington",

  // Dillon County
  "Dillon": "Dillon",
  "Latta": "Dillon",
  "Lake View": "Dillon",

  // Dorchester County
  "St. George": "Dorchester",
  "Ridgeville": "Dorchester",
  "Harleyville": "Dorchester",
  "Reevesville": "Dorchester",

  // Edgefield County
  "Edgefield": "Edgefield",
  "Johnston": "Edgefield",
  "Trenton": "Edgefield",

  // Fairfield County
  "Winnsboro": "Fairfield",
  "Ridgeway": "Fairfield",

  // Florence County
  "Florence": "Florence",
  "Lake City": "Florence",
  "Johnsonville": "Florence",
  "Timmonsville": "Florence",
  "Pamplico": "Florence",
  "Olanta": "Florence",
  "Coward": "Florence",
  "Quinby": "Florence",
  "Scranton": "Florence",

  // Georgetown County
  "Georgetown": "Georgetown",
  "Andrews": "Georgetown",
  "Pawleys Island": "Georgetown",

  // Greenville County
  "Greenville": "Greenville",
  "Greer": "Greenville",
  "Mauldin": "Greenville",
  "Simpsonville": "Greenville",
  "Fountain Inn": "Greenville",
  "Travelers Rest": "Greenville",
  "Taylors": "Greenville",
  "Piedmont": "Greenville",
  "City View": "Greenville",
  "Parker": "Greenville",

  // Greenwood County
  "Greenwood": "Greenwood",
  "Ware Shoals": "Greenwood",
  "Ninety Six": "Greenwood",
  "Hodges": "Greenwood",
  "Troy": "Greenwood",

  // Hampton County
  "Hampton": "Hampton",
  "Estill": "Hampton",
  "Varnville": "Hampton",
  "Brunson": "Hampton",
  "Gifford": "Hampton",
  "Furman": "Hampton",
  "Luray": "Hampton",
  "Yemassee": "Hampton",
  "Scotia": "Hampton",

  // Horry County
  "Myrtle Beach": "Horry",
  "Conway": "Horry",
  "North Myrtle Beach": "Horry",
  "Little River": "Horry",
  "Surfside Beach": "Horry",
  "Atlantic Beach": "Horry",
  "Briarcliffe Acres": "Horry",
  "Loris": "Horry",
  "Aynor": "Horry",

  // Jasper County
  "Ridgeland": "Jasper",
  "Hardeeville": "Jasper",

  // Kershaw County
  "Camden": "Kershaw",
  "Elgin": "Kershaw",
  "Lugoff": "Kershaw",
  "Bethune": "Kershaw",

  // Lancaster County
  "Lancaster": "Lancaster",
  "Heath Springs": "Lancaster",
  "Kershaw": "Lancaster",
  "Van Wyck": "Lancaster",
  "Indian Land": "Lancaster",

  // Laurens County
  "Laurens": "Laurens",
  "Clinton": "Laurens",
  "Cross Hill": "Laurens",
  "Gray Court": "Laurens",
  "Waterloo": "Laurens",
  "Joanna": "Laurens",

  // Lee County
  "Bishopville": "Lee",
  "Lynchburg": "Lee",

  // Lexington County
  "Lexington": "Lexington",
  "West Columbia": "Lexington",
  "Cayce": "Lexington",
  "Batesburg-Leesville": "Lexington",
  "Gaston": "Lexington",
  "South Congaree": "Lexington",
  "Pelion": "Lexington",
  "Swansea": "Lexington",
  "Gilbert": "Lexington",
  "Pine Ridge": "Lexington",
  "Springdale": "Lexington",
  "Summit": "Lexington",
  "Irmo": "Lexington",

  // Marion County
  "Marion": "Marion",
  "Mullins": "Marion",
  "Nichols": "Marion",
  "Sellers": "Marion",

  // Marlboro County
  "Bennettsville": "Marlboro",
  "McColl": "Marlboro",
  "Clio": "Marlboro",
  "Blenheim": "Marlboro",
  "Tatum": "Marlboro",

  // McCormick County
  "McCormick": "McCormick",
  "Plum Branch": "McCormick",
  "Parksville": "McCormick",

  // Newberry County
  "Newberry": "Newberry",
  "Prosperity": "Newberry",
  "Pomaria": "Newberry",
  "Little Mountain": "Newberry",
  "Peak": "Newberry",
  "Silverstreet": "Newberry",
  "Whitmire": "Newberry",

  // Oconee County
  "Seneca": "Oconee",
  "Walhalla": "Oconee",
  "Westminster": "Oconee",
  "Salem": "Oconee",
  "West Union": "Oconee",

  // Orangeburg County
  "Orangeburg": "Orangeburg",
  "Holly Hill": "Orangeburg",
  "Santee": "Orangeburg",
  "Elloree": "Orangeburg",
  "North": "Orangeburg",
  "Bowman": "Orangeburg",
  "Branchville": "Orangeburg",
  "Cope": "Orangeburg",
  "Cordova": "Orangeburg",
  "Eutawville": "Orangeburg",
  "Neeses": "Orangeburg",
  "Norway": "Orangeburg",
  "Rowesville": "Orangeburg",
  "Springfield": "Orangeburg",
  "Vance": "Orangeburg",
  "Woodford": "Orangeburg",

  // Pickens County
  "Easley": "Pickens",
  "Pickens": "Pickens",
  "Clemson": "Pickens",
  "Central": "Pickens",
  "Liberty": "Pickens",
  "Norris": "Pickens",
  "Six Mile": "Pickens",

  // Richland County
  "Columbia": "Richland",
  "Forest Acres": "Richland",
  "Arcadia Lakes": "Richland",
  "Blythewood": "Richland",
  "Eastover": "Richland",
  "Hopkins": "Richland",

  // Saluda County
  "Saluda": "Saluda",
  "Ridge Spring": "Saluda",
  "Ward": "Saluda",

  // Spartanburg County
  "Spartanburg": "Spartanburg",
  "Greer": "Spartanburg",
  "Duncan": "Spartanburg",
  "Inman": "Spartanburg",
  "Landrum": "Spartanburg",
  "Lyman": "Spartanburg",
  "Wellford": "Spartanburg",
  "Woodruff": "Spartanburg",
  "Chesnee": "Spartanburg",
  "Cowpens": "Spartanburg",
  "Cross Anchor": "Spartanburg",
  "Pacolet": "Spartanburg",
  "Pacolet Mills": "Spartanburg",
  "Reidville": "Spartanburg",
  "Roebuck": "Spartanburg",
  "Startex": "Spartanburg",
  "Campobello": "Spartanburg",

  // Sumter County
  "Sumter": "Sumter",
  "Mayesville": "Sumter",
  "Pinewood": "Sumter",

  // Union County
  "Union": "Union",
  "Jonesville": "Union",
  "Lockhart": "Union",
  "Carlisle": "Union",

  // Williamsburg County
  "Kingstree": "Williamsburg",
  "Greeleyville": "Williamsburg",
  "Hemingway": "Williamsburg",
  "Lane": "Williamsburg",
  "Stuckey": "Williamsburg",

  // York County
  "Rock Hill": "York",
  "Fort Mill": "York",
  "York": "York",
  "Tega Cay": "York",
  "Clover": "York",
  "Lake Wylie": "York",
  "Smyrna": "York",
  "McConnells": "York",
  "Sharon": "York",
  "Hickory Grove": "York"
};

// Population data for South Carolina municipalities
const populations = {
  "Columbia": 136632,
  "Charleston": 150227,
  "North Charleston": 115382,
  "Mount Pleasant": 94838,
  "Rock Hill": 77086,
  "Greenville": 72095,
  "Summerville": 53643,
  "Goose Creek": 47161,
  "Hilton Head Island": 40000,
  "Florence": 39495,
  "Spartanburg": 38872,
  "Myrtle Beach": 35682,
  "Anderson": 28479,
  "Aiken": 31428,
  "Greer": 35802,
  "Mauldin": 26889,
  "North Augusta": 24135,
  "Simpsonville": 23936,
  "Fort Mill": 24929,
  "Conway": 25050,
  "Sumter": 40524,
  "Hanahan": 25743,
  "Lexington": 23381,
  "West Columbia": 18100,
  "Easley": 21649,
  "Beaufort": 14259,
  "Bluffton": 27898,
  "North Myrtle Beach": 17016,
  "Seneca": 8424,
  "Georgetown": 9163,
  "Camden": 7542,
  "Lancaster": 9294,
  "Orangeburg": 12857,
  "Clemson": 17231,
  "Cayce": 14156,
  "Fountain Inn": 9436,
  "Hartsville": 7596,
  "Newberry": 10592,
  "Laurens": 8784,
  "Clinton": 8427,
  "Bennettsville": 8247,
  "Gaffney": 12632,
  "Chester": 5407,
  "Darlington": 5808,
  "Dillon": 6392,
  "Marion": 6464,
  "Walterboro": 5030,
  "Abbeville": 5013,
  "Union": 7774,
  "Lake City": 6620,
  "Moncks Corner": 11552,
  "Cheraw": 5851,
  "Kingstree": 3088,
  "Batesburg-Leesville": 5555,
  "Mullins": 4556,
  "Manning": 3973,
  "Woodruff": 4279,
  "Barnwell": 4166,
  "Winnsboro": 3380,
  "Greenwood": 23494,
  "York": 8286,
  "Pickens": 3126,
  "Travelers Rest": 5218,
  "Walhalla": 4286,
  "Westminster": 2543,
  "Central": 5428,
  "Chesterfield": 1368,
  "Pageland": 2788,
  "Bishopville": 3121,
  "St. Matthews": 1948,
  "Allendale": 2777,
  "Hampton": 2621,
  "Estill": 1887,
  "Ridgeland": 3962,
  "Hardeeville": 5525,
  "Denmark": 2936,
  "Bamberg": 2966,
  "McCormick": 2293,
  "Saluda": 3565,
  "Edgefield": 4750,
  "Johnston": 2410,
  "Belton": 4084,
  "Williamston": 3949,
  "Pendleton": 3112,
  "Honea Path": 3555,
  "Inman": 3165,
  "Landrum": 2686,
  "Duncan": 3446,
  "Lyman": 3601,
  "Wellford": 2679,
  "Chesnee": 887,
  "Cowpens": 2198,
  "Pacolet": 2290,
  "Blacksburg": 1648,
  "Great Falls": 1804,
  "Kershaw": 2089,
  "Heath Springs": 720,
  "Cheraw": 5851,
  "Lamar": 958,
  "Loris": 2631,
  "Aynor": 750,
  "Surfside Beach": 4470,
  "Lake View": 744,
  "Andrews": 2928,
  "Pawleys Island": 103,
  "Johnsonville": 1377,
  "Timmonsville": 2197,
  "Pamplico": 1147,
  "Olanta": 603,
  "Elgin": 2303,
  "Lugoff": 9519,
  "Bethune": 355,
  "Irmo": 12523,
  "Gaston": 2150,
  "Pelion": 749,
  "Swansea": 816,
  "Gilbert": 646,
  "Ninety Six": 1964,
  "Ware Shoals": 2012,
  "Hodges": 167,
  "Cross Hill": 475,
  "Gray Court": 1054,
  "Waterloo": 181,
  "Joanna": 1516,
  "McColl": 2108,
  "Clio": 644,
  "Prosperity": 1202,
  "Whitmire": 1315,
  "Little Mountain": 303,
  "Holly Hill": 1277,
  "Santee": 943,
  "Elloree": 654,
  "North": 750,
  "Bowman": 904,
  "Branchville": 945,
  "Springfield": 483,
  "St. George": 2084,
  "Harleyville": 722,
  "Ridgeville": 1952,
  "Liberty": 3190,
  "Norris": 740,
  "Six Mile": 708,
  "Forest Acres": 10698,
  "Blythewood": 3189,
  "Eastover": 749,
  "Ridge Spring": 707,
  "Tega Cay": 11611,
  "Clover": 6817,
  "Mayesville": 676,
  "Jonesville": 858,
  "Lockhart": 501,
  "Greeleyville": 392,
  "Hemingway": 460,
  "Lane": 502,
  "Port Royal": 13801,
  "Yemassee": 1025,
  "Isle of Palms": 4371,
  "Folly Beach": 2078,
  "Sullivan's Island": 2016,
  "Ravenel": 2688,
  "Hollywood": 5209,
  "Meggett": 1349,
  "Lincolnville": 1226,
  "Edisto Beach": 414,
  "James Island": 12157,
  "Kiawah Island": 1626,
  "Seabrook Island": 1810,
  "Atlantic Beach": 334,
  "Briarcliffe Acres": 455,
  "Van Wyck": 3600,
  "Indian Land": 12000,
  "Bonneau": 364,
  "St. Stephen": 1636,
  "Jamestown": 59,
  "Cameron": 439,
  "Cottageville": 752,
  "Lodge": 99,
  "Smoaks": 129,
  "Williams": 170,
  "Society Hill": 519,
  "Latta": 1318,
  "Reevesville": 186,
  "Trenton": 302,
  "Ridgeway": 302,
  "Coward": 528,
  "Quinby": 890,
  "Scranton": 889,
  "Taylors": 23381,
  "Piedmont": 5045,
  "City View": 1823,
  "Parker": 2723,
  "Varnville": 1814,
  "Brunson": 539,
  "Gifford": 296,
  "Furman": 236,
  "Luray": 136,
  "Scotia": 207,
  "Little River": 11434,
  "Plum Branch": 102,
  "Parksville": 73,
  "Pomaria": 233,
  "Peak": 47,
  "Silverstreet": 160,
  "Salem": 152,
  "West Union": 285,
  "Arcadia Lakes": 989,
  "Hopkins": 2800,
  "Ward": 106,
  "Cross Anchor": 175,
  "Pacolet Mills": 1246,
  "Reidville": 700,
  "Roebuck": 2468,
  "Startex": 252,
  "Campobello": 518,
  "Pinewood": 516,
  "Carlisle": 424,
  "Stuckey": 254,
  "Lake Wylie": 14000,
  "Smyrna": 50,
  "McConnells": 294,
  "Sharon": 485,
  "Hickory Grove": 302,
  "Due West": 1237,
  "Donalds": 319,
  "Lowndesville": 112,
  "Calhoun Falls": 1878,
  "Wagener": 847,
  "Salley": 396,
  "Jackson": 1769,
  "New Ellenton": 2052,
  "Burnettown": 2849,
  "Perry": 241,
  "Monetta": 260,
  "Fairfax": 1977,
  "Sycamore": 161,
  "Pelzer": 88,
  "Iva": 1129,
  "Starr": 160,
  "West Pelzer": 823,
  "Ehrhardt": 491,
  "Govan": 67,
  "Olar": 231,
  "Blackville": 2262,
  "Williston": 2905,
  "Elko": 200,
  "Hilda": 371,
  "Snelling": 233,
  "Kline": 195,
  "Summerton": 995,
  "Turbeville": 768,
  "Paxville": 211,
  "Jefferson": 659,
  "Patrick": 324,
  "Mount Croghan": 135,
  "Ruby": 344,
  "McBee": 827,
  "Lynchburg": 389,
  "Cope": 77,
  "Cordova": 146,
  "Eutawville": 313,
  "Neeses": 371,
  "Norway": 335,
  "Rowesville": 265,
  "Vance": 189,
  "Woodford": 172,
  "Nichols": 282,
  "Sellers": 217,
  "Blenheim": 106,
  "Tatum": 66,
  "Awendaw": 1500,
  "McClellanville": 499,
  "Rockville": 100,
  "Fort Lawn": 760
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
  "Seafood Market", "Shrimp Dock", "Oyster Bar", "BBQ Restaurant", "Southern Kitchen",
  "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on South Carolina regions
const namePrefixes = [
  "Palmetto", "Carolina", "Lowcountry", "Upstate", "Midlands",
  "Grand Strand", "Coastal", "Southern", "Sandlapper", "Low Country",
  "Pee Dee", "Santee", "Congaree", "Piedmont", "Blue Ridge"
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
      address: `${townName}, SC`,
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

for (const [town, county] of Object.entries(southCarolinaTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "South Carolina",
    state_abbr: "SC",
    county: county,
    population: population,
    slug: `${slug}-sc`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-sc.json`),
    JSON.stringify(townData, null, 2)
  );

  const mdContent = `---
title: "${town}, SC Business Directory"
type: "towns"
slug: "${slug}-sc"
state: "sc"
town_data: "${slug}-sc"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-sc.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "South Carolina Business Directory"
slug: "sc"
state: "sc"
state_name: "South Carolina"
---
`;
fs.writeFileSync(path.join(statesDir, 'sc.md'), stateMd);

console.log(`Created South Carolina towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
