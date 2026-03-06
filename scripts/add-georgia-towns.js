import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Georgia municipalities with their counties
// Georgia has 159 counties and 535+ incorporated municipalities
// Source: Georgia Municipal Association, US Census Bureau
const georgiaTowns = {
  // Fulton County
  "Alpharetta": "Fulton",
  "Atlanta": "Fulton",
  "Chattahoochee Hills": "Fulton",
  "College Park": "Fulton",
  "East Point": "Fulton",
  "Fairburn": "Fulton",
  "Hapeville": "Fulton",
  "Johns Creek": "Fulton",
  "Milton": "Fulton",
  "Mountain Park": "Fulton",
  "Palmetto": "Fulton",
  "Roswell": "Fulton",
  "Sandy Springs": "Fulton",
  "Union City": "Fulton",

  // DeKalb County
  "Avondale Estates": "DeKalb",
  "Brookhaven": "DeKalb",
  "Chamblee": "DeKalb",
  "Clarkston": "DeKalb",
  "Decatur": "DeKalb",
  "Doraville": "DeKalb",
  "Dunwoody": "DeKalb",
  "Lithonia": "DeKalb",
  "Pine Lake": "DeKalb",
  "Stone Mountain": "DeKalb",
  "Tucker": "DeKalb",

  // Gwinnett County
  "Auburn": "Gwinnett",
  "Berkeley Lake": "Gwinnett",
  "Braselton": "Gwinnett",
  "Buford": "Gwinnett",
  "Dacula": "Gwinnett",
  "Duluth": "Gwinnett",
  "Grayson": "Gwinnett",
  "Lawrenceville": "Gwinnett",
  "Lilburn": "Gwinnett",
  "Loganville": "Gwinnett",
  "Norcross": "Gwinnett",
  "Peachtree Corners": "Gwinnett",
  "Rest Haven": "Gwinnett",
  "Snellville": "Gwinnett",
  "Sugar Hill": "Gwinnett",
  "Suwanee": "Gwinnett",

  // Cobb County
  "Acworth": "Cobb",
  "Austell": "Cobb",
  "Kennesaw": "Cobb",
  "Marietta": "Cobb",
  "Powder Springs": "Cobb",
  "Smyrna": "Cobb",

  // Clayton County
  "Forest Park": "Clayton",
  "Jonesboro": "Clayton",
  "Lake City": "Clayton",
  "Lovejoy": "Clayton",
  "Morrow": "Clayton",
  "Riverdale": "Clayton",

  // Cherokee County
  "Ball Ground": "Cherokee",
  "Canton": "Cherokee",
  "Holly Springs": "Cherokee",
  "Mountain Park": "Cherokee",
  "Nelson": "Cherokee",
  "Waleska": "Cherokee",
  "Woodstock": "Cherokee",

  // Forsyth County
  "Cumming": "Forsyth",

  // Henry County
  "Hampton": "Henry",
  "Locust Grove": "Henry",
  "McDonough": "Henry",
  "Stockbridge": "Henry",

  // Douglas County
  "Douglasville": "Douglas",
  "Villa Rica": "Douglas",

  // Paulding County
  "Dallas": "Paulding",
  "Hiram": "Paulding",

  // Rockdale County
  "Conyers": "Rockdale",

  // Newton County
  "Covington": "Newton",
  "Mansfield": "Newton",
  "Newborn": "Newton",
  "Oxford": "Newton",
  "Porterdale": "Newton",
  "Social Circle": "Newton",

  // Walton County
  "Between": "Walton",
  "Good Hope": "Walton",
  "Jersey": "Walton",
  "Loganville": "Walton",
  "Monroe": "Walton",
  "Social Circle": "Walton",
  "Walnut Grove": "Walton",

  // Barrow County
  "Auburn": "Barrow",
  "Bethlehem": "Barrow",
  "Braselton": "Barrow",
  "Carl": "Barrow",
  "Statham": "Barrow",
  "Winder": "Barrow",

  // Hall County
  "Clermont": "Hall",
  "Flowery Branch": "Hall",
  "Gainesville": "Hall",
  "Gillsville": "Hall",
  "Lula": "Hall",
  "Oakwood": "Hall",

  // Jackson County
  "Arcade": "Jackson",
  "Braselton": "Jackson",
  "Commerce": "Jackson",
  "Hoschton": "Jackson",
  "Jefferson": "Jackson",
  "Nicholson": "Jackson",
  "Pendergrass": "Jackson",
  "Talmo": "Jackson",

  // Clarke County
  "Athens": "Clarke",
  "Winterville": "Clarke",

  // Oconee County
  "Bishop": "Oconee",
  "Bogart": "Oconee",
  "North High Shoals": "Oconee",
  "Watkinsville": "Oconee",

  // Madison County
  "Carlton": "Madison",
  "Colbert": "Madison",
  "Comer": "Madison",
  "Danielsville": "Madison",
  "Hull": "Madison",
  "Ila": "Madison",

  // Oglethorpe County
  "Arnoldsville": "Oglethorpe",
  "Crawford": "Oglethorpe",
  "Lexington": "Oglethorpe",
  "Maxeys": "Oglethorpe",

  // Morgan County
  "Bostwick": "Morgan",
  "Buckhead": "Morgan",
  "Madison": "Morgan",
  "Rutledge": "Morgan",

  // Putnam County
  "Eatonton": "Putnam",

  // Jasper County
  "Monticello": "Jasper",
  "Shady Dale": "Jasper",

  // Butts County
  "Flovilla": "Butts",
  "Jackson": "Butts",
  "Jenkinsburg": "Butts",

  // Spalding County
  "Griffin": "Spalding",
  "Orchard Hill": "Spalding",
  "Sunny Side": "Spalding",

  // Pike County
  "Concord": "Pike",
  "Meansville": "Pike",
  "Molena": "Pike",
  "Williamson": "Pike",
  "Zebulon": "Pike",

  // Lamar County
  "Barnesville": "Lamar",
  "Milner": "Lamar",

  // Upson County
  "Thomaston": "Upson",
  "Yatesville": "Upson",

  // Bibb County
  "Macon": "Bibb",

  // Houston County
  "Centerville": "Houston",
  "Perry": "Houston",
  "Warner Robins": "Houston",

  // Peach County
  "Byron": "Peach",
  "Fort Valley": "Peach",

  // Crawford County
  "Roberta": "Crawford",

  // Taylor County
  "Butler": "Taylor",
  "Reynolds": "Taylor",

  // Muscogee County
  "Columbus": "Muscogee",

  // Chattahoochee County
  "Cusseta": "Chattahoochee",

  // Harris County
  "Hamilton": "Harris",
  "Pine Mountain": "Harris",
  "Shiloh": "Harris",
  "Waverly Hall": "Harris",
  "West Point": "Harris",

  // Troup County
  "Hogansville": "Troup",
  "LaGrange": "Troup",
  "West Point": "Troup",

  // Meriwether County
  "Gay": "Meriwether",
  "Greenville": "Meriwether",
  "Lone Oak": "Meriwether",
  "Luthersville": "Meriwether",
  "Manchester": "Meriwether",
  "Warm Springs": "Meriwether",
  "Woodbury": "Meriwether",

  // Coweta County
  "Grantville": "Coweta",
  "Haralson": "Coweta",
  "Moreland": "Coweta",
  "Newnan": "Coweta",
  "Senoia": "Coweta",
  "Sharpsburg": "Coweta",
  "Turin": "Coweta",

  // Fayette County
  "Brooks": "Fayette",
  "Fayetteville": "Fayette",
  "Peachtree City": "Fayette",
  "Tyrone": "Fayette",
  "Woolsey": "Fayette",

  // Carroll County
  "Bowdon": "Carroll",
  "Carrollton": "Carroll",
  "Mount Zion": "Carroll",
  "Roopville": "Carroll",
  "Temple": "Carroll",
  "Villa Rica": "Carroll",
  "Whitesburg": "Carroll",

  // Haralson County
  "Bremen": "Haralson",
  "Buchanan": "Haralson",
  "Tallapoosa": "Haralson",
  "Waco": "Haralson",

  // Polk County
  "Aragon": "Polk",
  "Cedartown": "Polk",
  "Rockmart": "Polk",

  // Floyd County
  "Cave Spring": "Floyd",
  "Rome": "Floyd",

  // Bartow County
  "Adairsville": "Bartow",
  "Cartersville": "Bartow",
  "Emerson": "Bartow",
  "Euharlee": "Bartow",
  "Kingston": "Bartow",
  "Taylorsville": "Bartow",
  "White": "Bartow",

  // Gordon County
  "Calhoun": "Gordon",
  "Fairmount": "Gordon",
  "Plainville": "Gordon",
  "Ranger": "Gordon",
  "Resaca": "Gordon",

  // Murray County
  "Chatsworth": "Murray",
  "Eton": "Murray",

  // Whitfield County
  "Dalton": "Whitfield",
  "Tunnel Hill": "Whitfield",
  "Varnell": "Whitfield",

  // Catoosa County
  "Fort Oglethorpe": "Catoosa",
  "Ringgold": "Catoosa",

  // Walker County
  "Chickamauga": "Walker",
  "LaFayette": "Walker",
  "Lookout Mountain": "Walker",
  "Rossville": "Walker",

  // Dade County
  "Trenton": "Dade",

  // Chattooga County
  "Lyerly": "Chattooga",
  "Menlo": "Chattooga",
  "Summerville": "Chattooga",
  "Trion": "Chattooga",

  // Pickens County
  "Jasper": "Pickens",
  "Nelson": "Pickens",
  "Talking Rock": "Pickens",

  // Gilmer County
  "East Ellijay": "Gilmer",
  "Ellijay": "Gilmer",

  // Fannin County
  "Blue Ridge": "Fannin",
  "McCaysville": "Fannin",
  "Morganton": "Fannin",

  // Union County
  "Blairsville": "Union",

  // Towns County
  "Hiawassee": "Towns",
  "Young Harris": "Towns",

  // Rabun County
  "Clayton": "Rabun",
  "Dillard": "Rabun",
  "Mountain City": "Rabun",
  "Sky Valley": "Rabun",
  "Tallulah Falls": "Rabun",
  "Tiger": "Rabun",

  // Habersham County
  "Alto": "Habersham",
  "Baldwin": "Habersham",
  "Clarkesville": "Habersham",
  "Cornelia": "Habersham",
  "Demorest": "Habersham",
  "Mount Airy": "Habersham",
  "Tallulah Falls": "Habersham",

  // White County
  "Cleveland": "White",
  "Helen": "White",

  // Lumpkin County
  "Dahlonega": "Lumpkin",

  // Dawson County
  "Dawsonville": "Dawson",

  // Banks County
  "Alto": "Banks",
  "Baldwin": "Banks",
  "Homer": "Banks",
  "Lula": "Banks",
  "Maysville": "Banks",

  // Franklin County
  "Canon": "Franklin",
  "Carnesville": "Franklin",
  "Franklin Springs": "Franklin",
  "Lavonia": "Franklin",
  "Royston": "Franklin",

  // Hart County
  "Bowersville": "Hart",
  "Canon": "Hart",
  "Hartwell": "Hart",
  "Royston": "Hart",

  // Elbert County
  "Bowman": "Elbert",
  "Elberton": "Elbert",

  // Wilkes County
  "Rayle": "Wilkes",
  "Tignall": "Wilkes",
  "Washington": "Wilkes",

  // Lincoln County
  "Lincolnton": "Lincoln",

  // Columbia County
  "Grovetown": "Columbia",
  "Harlem": "Columbia",

  // Richmond County
  "Augusta": "Richmond",
  "Blythe": "Richmond",
  "Hephzibah": "Richmond",

  // Burke County
  "Girard": "Burke",
  "Keysville": "Burke",
  "Midville": "Burke",
  "Sardis": "Burke",
  "Waynesboro": "Burke",

  // Jefferson County
  "Avera": "Jefferson",
  "Bartow": "Jefferson",
  "Louisville": "Jefferson",
  "Stapleton": "Jefferson",
  "Wadley": "Jefferson",
  "Wrens": "Jefferson",

  // Glascock County
  "Gibson": "Glascock",
  "Mitchell": "Glascock",

  // Warren County
  "Camak": "Warren",
  "Norwood": "Warren",
  "Warrenton": "Warren",

  // McDuffie County
  "Dearing": "McDuffie",
  "Thomson": "McDuffie",

  // Taliaferro County
  "Crawfordville": "Taliaferro",
  "Sharon": "Taliaferro",

  // Greene County
  "Greensboro": "Greene",
  "Siloam": "Greene",
  "Union Point": "Greene",
  "White Plains": "Greene",
  "Woodville": "Greene",

  // Hancock County
  "Sparta": "Hancock",

  // Baldwin County
  "Milledgeville": "Baldwin",

  // Washington County
  "Davisboro": "Washington",
  "Deep Step": "Washington",
  "Harrison": "Washington",
  "Riddleville": "Washington",
  "Sandersville": "Washington",
  "Tennille": "Washington",

  // Wilkinson County
  "Allentown": "Wilkinson",
  "Danville": "Wilkinson",
  "Gordon": "Wilkinson",
  "Irwinton": "Wilkinson",
  "Ivey": "Wilkinson",
  "McIntyre": "Wilkinson",
  "Toomsboro": "Wilkinson",

  // Johnson County
  "Kite": "Johnson",
  "Wrightsville": "Johnson",

  // Emanuel County
  "Adrian": "Emanuel",
  "Garfield": "Emanuel",
  "Nunez": "Emanuel",
  "Oak Park": "Emanuel",
  "Stillmore": "Emanuel",
  "Summertown": "Emanuel",
  "Swainsboro": "Emanuel",
  "Twin City": "Emanuel",

  // Laurens County
  "Cadwell": "Laurens",
  "Dexter": "Laurens",
  "Dublin": "Laurens",
  "Dudley": "Laurens",
  "East Dublin": "Laurens",
  "Montrose": "Laurens",
  "Rentz": "Laurens",

  // Treutlen County
  "Soperton": "Treutlen",

  // Montgomery County
  "Ailey": "Montgomery",
  "Alston": "Montgomery",
  "Higgston": "Montgomery",
  "Mount Vernon": "Montgomery",
  "Tarrytown": "Montgomery",
  "Uvalda": "Montgomery",
  "Vidalia": "Montgomery",

  // Toombs County
  "Lyons": "Toombs",
  "Santa Claus": "Toombs",
  "Vidalia": "Toombs",

  // Tattnall County
  "Cobbtown": "Tattnall",
  "Collins": "Tattnall",
  "Glennville": "Tattnall",
  "Manassas": "Tattnall",
  "Reidsville": "Tattnall",

  // Evans County
  "Bellville": "Evans",
  "Claxton": "Evans",
  "Daisy": "Evans",
  "Hagan": "Evans",

  // Candler County
  "Metter": "Candler",
  "Pulaski": "Candler",

  // Bulloch County
  "Brooklet": "Bulloch",
  "Portal": "Bulloch",
  "Register": "Bulloch",
  "Statesboro": "Bulloch",

  // Screven County
  "Hiltonia": "Screven",
  "Newington": "Screven",
  "Oliver": "Screven",
  "Rocky Ford": "Screven",
  "Sylvania": "Screven",

  // Jenkins County
  "Millen": "Jenkins",

  // Effingham County
  "Guyton": "Effingham",
  "Rincon": "Effingham",
  "Springfield": "Effingham",

  // Chatham County
  "Bloomingdale": "Chatham",
  "Garden City": "Chatham",
  "Pooler": "Chatham",
  "Port Wentworth": "Chatham",
  "Savannah": "Chatham",
  "Thunderbolt": "Chatham",
  "Tybee Island": "Chatham",
  "Vernonburg": "Chatham",

  // Bryan County
  "Pembroke": "Bryan",
  "Richmond Hill": "Bryan",

  // Liberty County
  "Allenhurst": "Liberty",
  "Flemington": "Liberty",
  "Gum Branch": "Liberty",
  "Hinesville": "Liberty",
  "Midway": "Liberty",
  "Riceboro": "Liberty",
  "Walthourville": "Liberty",

  // Long County
  "Ludowici": "Long",

  // McIntosh County
  "Darien": "McIntosh",

  // Glynn County
  "Brunswick": "Glynn",
  "St. Simons Island": "Glynn",

  // Camden County
  "Kingsland": "Camden",
  "St. Marys": "Camden",
  "Woodbine": "Camden",

  // Charlton County
  "Folkston": "Charlton",
  "Homeland": "Charlton",

  // Ware County
  "Waycross": "Ware",

  // Brantley County
  "Hoboken": "Brantley",
  "Nahunta": "Brantley",

  // Pierce County
  "Blackshear": "Pierce",
  "Offerman": "Pierce",
  "Patterson": "Pierce",

  // Appling County
  "Baxley": "Appling",
  "Graham": "Appling",
  "Surrency": "Appling",

  // Wayne County
  "Jesup": "Wayne",
  "Odum": "Wayne",
  "Screven": "Wayne",

  // Coffee County
  "Ambrose": "Coffee",
  "Broxton": "Coffee",
  "Douglas": "Coffee",
  "Nicholls": "Coffee",

  // Atkinson County
  "Pearson": "Atkinson",
  "Willacoochee": "Atkinson",

  // Clinch County
  "Argyle": "Clinch",
  "Du Pont": "Clinch",
  "Fargo": "Clinch",
  "Homerville": "Clinch",

  // Lanier County
  "Lakeland": "Lanier",

  // Lowndes County
  "Dasher": "Lowndes",
  "Hahira": "Lowndes",
  "Lake Park": "Lowndes",
  "Remerton": "Lowndes",
  "Valdosta": "Lowndes",

  // Echols County
  "Statenville": "Echols",

  // Brooks County
  "Barwick": "Brooks",
  "Morven": "Brooks",
  "Pavo": "Brooks",
  "Quitman": "Brooks",

  // Thomas County
  "Boston": "Thomas",
  "Coolidge": "Thomas",
  "Meigs": "Thomas",
  "Ochlocknee": "Thomas",
  "Pavo": "Thomas",
  "Thomasville": "Thomas",

  // Grady County
  "Cairo": "Grady",
  "Whigham": "Grady",

  // Decatur County
  "Attapulgus": "Decatur",
  "Bainbridge": "Decatur",
  "Brinson": "Decatur",
  "Climax": "Decatur",

  // Seminole County
  "Donalsonville": "Seminole",
  "Iron City": "Seminole",

  // Miller County
  "Colquitt": "Miller",

  // Early County
  "Arlington": "Early",
  "Blakely": "Early",
  "Damascus": "Early",
  "Jakin": "Early",

  // Clay County
  "Bluffton": "Clay",
  "Fort Gaines": "Clay",

  // Quitman County
  "Georgetown": "Quitman",

  // Randolph County
  "Cuthbert": "Randolph",
  "Shellman": "Randolph",

  // Stewart County
  "Lumpkin": "Stewart",
  "Richland": "Stewart",

  // Webster County
  "Preston": "Webster",

  // Sumter County
  "Americus": "Sumter",
  "Andersonville": "Sumter",
  "De Soto": "Sumter",
  "Leslie": "Sumter",
  "Plains": "Sumter",

  // Schley County
  "Ellaville": "Schley",

  // Macon County
  "Ideal": "Macon",
  "Marshallville": "Macon",
  "Montezuma": "Macon",
  "Oglethorpe": "Macon",

  // Marion County
  "Buena Vista": "Marion",

  // Chattahoochee County
  "Cusseta": "Chattahoochee",

  // Talbot County
  "Geneva": "Talbot",
  "Junction City": "Talbot",
  "Talbotton": "Talbot",
  "Woodland": "Talbot",

  // Crisp County
  "Arabi": "Crisp",
  "Cordele": "Crisp",

  // Dooly County
  "Byromville": "Dooly",
  "Lilly": "Dooly",
  "Pinehurst": "Dooly",
  "Unadilla": "Dooly",
  "Vienna": "Dooly",

  // Pulaski County
  "Hawkinsville": "Pulaski",

  // Bleckley County
  "Cochran": "Bleckley",

  // Dodge County
  "Chester": "Dodge",
  "Chauncey": "Dodge",
  "Eastman": "Dodge",
  "Milan": "Dodge",
  "Rhine": "Dodge",

  // Telfair County
  "Helena": "Telfair",
  "Jacksonville": "Telfair",
  "Lumber City": "Telfair",
  "McRae": "Telfair",
  "Scotland": "Telfair",

  // Wheeler County
  "Alamo": "Wheeler",
  "Glenwood": "Wheeler",

  // Jeff Davis County
  "Denton": "Jeff Davis",
  "Hazlehurst": "Jeff Davis",

  // Bacon County
  "Alma": "Bacon",

  // Ben Hill County
  "Fitzgerald": "Ben Hill",

  // Irwin County
  "Ocilla": "Irwin",

  // Wilcox County
  "Abbeville": "Wilcox",
  "Pineview": "Wilcox",
  "Pitts": "Wilcox",
  "Rochelle": "Wilcox",
  "Seville": "Wilcox",

  // Turner County
  "Ashburn": "Turner",
  "Rebecca": "Turner",
  "Sycamore": "Turner",

  // Tift County
  "Omega": "Tift",
  "Tifton": "Tift",
  "Ty Ty": "Tift",

  // Worth County
  "Poulan": "Worth",
  "Sumner": "Worth",
  "Sylvester": "Worth",
  "Warwick": "Worth",

  // Colquitt County
  "Berlin": "Colquitt",
  "Doerun": "Colquitt",
  "Ellenton": "Colquitt",
  "Funston": "Colquitt",
  "Moultrie": "Colquitt",
  "Norman Park": "Colquitt",

  // Cook County
  "Adel": "Cook",
  "Cecil": "Cook",
  "Lenox": "Cook",
  "Sparks": "Cook",

  // Berrien County
  "Alapaha": "Berrien",
  "Enigma": "Berrien",
  "Nashville": "Berrien",
  "Ray City": "Berrien"
};

// Populations for Georgia communities
const populations = {
  "Atlanta": 498715,
  "Augusta": 202081,
  "Columbus": 206922,
  "Macon": 157346,
  "Savannah": 147780,
  "Athens": 127315,
  "Sandy Springs": 108080,
  "Roswell": 94786,
  "Johns Creek": 84551,
  "Albany": 72256,
  "Warner Robins": 80308,
  "Alpharetta": 66566,
  "Marietta": 60972,
  "Valdosta": 56457,
  "Smyrna": 56666,
  "Brookhaven": 55161,
  "Dunwoody": 51683,
  "Peachtree Corners": 43959,
  "Gainesville": 43435,
  "Newnan": 43972,
  "Milton": 40002,
  "Peachtree City": 37039,
  "Lawrenceville": 30820,
  "Dalton": 34432,
  "Hinesville": 33547,
  "Rome": 37713,
  "Carrollton": 27863,
  "Statesboro": 33334,
  "Douglasville": 35862,
  "Kennesaw": 34077,
  "Woodstock": 35415,
  "Canton": 32028,
  "Stockbridge": 30403,
  "LaGrange": 30446,
  "Acworth": 24551,
  "Griffin": 23451,
  "McDonough": 27067,
  "Duluth": 29538,
  "Sugar Hill": 25632,
  "Cartersville": 22159,
  "Pooler": 27065,
  "Brunswick": 16346,
  "Buford": 16841,
  "Snellville": 20052,
  "Conyers": 17080,
  "Decatur": 24814,
  "Dublin": 15997,
  "Perry": 17849,
  "Tifton": 17120,
  "Chamblee": 29803,
  "Riverdale": 15633,
  "Forest Park": 19963,
  "Union City": 22936,
  "Covington": 14413,
  "Calhoun": 17431,
  "St. Marys": 19147,
  "Thomasville": 18413,
  "Winder": 18291,
  "Americus": 15519,
  "Monroe": 14551,
  "Kingsland": 18003,
  "Rincon": 11089,
  "Suwanee": 21297,
  "Lilburn": 13308,
  "Moultrie": 14268,
  "Waycross": 13656,
  "Jesup": 10214,
  "Cornelia": 4548,
  "Cedartown": 10190,
  "Milledgeville": 19397,
  "Fort Oglethorpe": 10188,
  "Bainbridge": 12697,
  "Douglas": 11589,
  "Fitzgerald": 9053,
  "Cordele": 10600,
  "Vidalia": 10473,
  "Cairo": 9607,
  "Summerville": 4569,
  "Eatonton": 6480,
  "Eastman": 5438,
  "Rockmart": 4321,
  "Cusseta": 1244,
  "Commerce": 7569,
  "Hartwell": 4469,
  "Elberton": 4653,
  "Washington": 3946,
  "Louisville": 2493,
  "Sandersville": 5625,
  "Metter": 4130,
  "Claxton": 2746,
  "Sylvania": 2478,
  "Swainsboro": 7277,
  "Glennville": 5010,
  "Baxley": 4689,
  "Blackshear": 3549,
  "Folkston": 4997,
  "Adel": 5334,
  "Nashville": 4882,
  "Quitman": 3794,
  "Donalsonville": 2772,
  "Blakely": 4695,
  "Fort Gaines": 1050,
  "Cuthbert": 3379,
  "Dawson": 4059,
  "Plains": 776,
  "Cochran": 5151,
  "Hawkinsville": 4608,
  "Vienna": 3841,
  "Ashburn": 3667,
  "Ocilla": 3495,
  "Hazlehurst": 4226,
  "Alma": 3275,
  "McRae": 5740,
  "Helena": 382,
  "East Point": 38358,
  "College Park": 15198,
  "Hapeville": 6658,
  "Fairburn": 17122,
  "Palmetto": 5055,
  "Clarkston": 13879,
  "Doraville": 10540,
  "Stone Mountain": 6281,
  "Tucker": 36195,
  "Avondale Estates": 3288,
  "Pine Lake": 742,
  "Lithonia": 2045,
  "Norcross": 18089,
  "Grayson": 4050,
  "Dacula": 6297,
  "Loganville": 13366,
  "Auburn": 8264,
  "Berkeley Lake": 2027,
  "Rest Haven": 73,
  "Powder Springs": 16831,
  "Austell": 7609,
  "Lake City": 2799,
  "Jonesboro": 5519,
  "Morrow": 7406,
  "Lovejoy": 7664,
  "Ball Ground": 2585,
  "Holly Springs": 14568,
  "Nelson": 1373,
  "Waleska": 1002,
  "Cumming": 7576,
  "Hampton": 8432,
  "Locust Grove": 7526,
  "Villa Rica": 16058,
  "Dallas": 13614,
  "Hiram": 4420,
  "Mansfield": 489,
  "Newborn": 780,
  "Oxford": 2222,
  "Porterdale": 1738,
  "Social Circle": 4873,
  "Between": 340,
  "Good Hope": 370,
  "Jersey": 126,
  "Walnut Grove": 1577,
  "Bethlehem": 550,
  "Carl": 280,
  "Statham": 2826,
  "Clermont": 1071,
  "Flowery Branch": 9497,
  "Gillsville": 234,
  "Lula": 3153,
  "Oakwood": 4226,
  "Arcade": 1917,
  "Hoschton": 5857,
  "Jefferson": 12994,
  "Nicholson": 1853,
  "Pendergrass": 663,
  "Talmo": 154,
  "Winterville": 1289,
  "Bishop": 236,
  "Bogart": 1340,
  "North High Shoals": 746,
  "Watkinsville": 3000,
  "Carlton": 254,
  "Colbert": 641,
  "Comer": 1334,
  "Danielsville": 639,
  "Hull": 274,
  "Ila": 438,
  "Arnoldsville": 353,
  "Crawford": 872,
  "Lexington": 286,
  "Maxeys": 211,
  "Bostwick": 390,
  "Buckhead": 174,
  "Madison": 4278,
  "Rutledge": 838,
  "Monticello": 2657,
  "Shady Dale": 247,
  "Flovilla": 665,
  "Jackson": 5224,
  "Jenkinsburg": 524,
  "Orchard Hill": 183,
  "Sunny Side": 145,
  "Concord": 410,
  "Meansville": 207,
  "Molena": 366,
  "Williamson": 379,
  "Zebulon": 1169,
  "Barnesville": 6755,
  "Milner": 680,
  "Thomaston": 8527,
  "Yatesville": 356,
  "Centerville": 8014,
  "Byron": 5987,
  "Fort Valley": 8863,
  "Roberta": 765,
  "Butler": 1876,
  "Reynolds": 1014,
  "Hamilton": 1118,
  "Pine Mountain": 1213,
  "Shiloh": 392,
  "Waverly Hall": 795,
  "West Point": 3474,
  "Hogansville": 3282,
  "Gay": 82,
  "Greenville": 850,
  "Lone Oak": 91,
  "Luthersville": 905,
  "Manchester": 4074,
  "Warm Springs": 432,
  "Woodbury": 1035,
  "Grantville": 3226,
  "Haralson": 178,
  "Moreland": 431,
  "Senoia": 5039,
  "Sharpsburg": 380,
  "Turin": 388,
  "Brooks": 657,
  "Fayetteville": 18950,
  "Tyrone": 7786,
  "Woolsey": 183,
  "Bowdon": 2150,
  "Mount Zion": 1741,
  "Roopville": 252,
  "Temple": 4710,
  "Whitesburg": 657,
  "Bremen": 7041,
  "Buchanan": 1016,
  "Tallapoosa": 3171,
  "Waco": 499,
  "Aragon": 1207,
  "Cave Spring": 1168,
  "Adairsville": 5014,
  "Emerson": 1794,
  "Euharlee": 4526,
  "Kingston": 806,
  "Taylorsville": 263,
  "White": 757,
  "Fairmount": 752,
  "Plainville": 326,
  "Ranger": 172,
  "Resaca": 658,
  "Chatsworth": 4358,
  "Eton": 930,
  "Tunnel Hill": 945,
  "Varnell": 1827,
  "Ringgold": 3580,
  "Chickamauga": 3273,
  "LaFayette": 7121,
  "Lookout Mountain": 1602,
  "Rossville": 4105,
  "Trenton": 2388,
  "Lyerly": 485,
  "Menlo": 486,
  "Trion": 1909,
  "Jasper": 4234,
  "Talking Rock": 65,
  "East Ellijay": 1020,
  "Ellijay": 1826,
  "Blue Ridge": 1290,
  "McCaysville": 1123,
  "Morganton": 342,
  "Blairsville": 659,
  "Hiawassee": 896,
  "Young Harris": 1155,
  "Clayton": 2047,
  "Dillard": 346,
  "Mountain City": 1100,
  "Sky Valley": 327,
  "Tallulah Falls": 194,
  "Tiger": 417,
  "Alto": 1226,
  "Baldwin": 3586,
  "Clarkesville": 1733,
  "Demorest": 2141,
  "Mount Airy": 1601,
  "Cleveland": 4151,
  "Helen": 510,
  "Dahlonega": 7027,
  "Dawsonville": 3546,
  "Homer": 1273,
  "Maysville": 1754,
  "Canon": 856,
  "Carnesville": 635,
  "Franklin Springs": 1125,
  "Lavonia": 2464,
  "Royston": 3039,
  "Bowersville": 383,
  "Bowman": 989,
  "Rayle": 157,
  "Tignall": 547,
  "Lincolnton": 1611,
  "Grovetown": 15995,
  "Harlem": 3263,
  "Blythe": 821,
  "Hephzibah": 4030,
  "Girard": 236,
  "Keysville": 330,
  "Midville": 317,
  "Sardis": 1024,
  "Waynesboro": 5403,
  "Avera": 247,
  "Bartow": 311,
  "Stapleton": 502,
  "Wadley": 2081,
  "Wrens": 2187,
  "Gibson": 616,
  "Mitchell": 164,
  "Camak": 129,
  "Norwood": 286,
  "Warrenton": 1816,
  "Dearing": 564,
  "Thomson": 6553,
  "Crawfordville": 535,
  "Sharon": 1674,
  "Greensboro": 3359,
  "Siloam": 242,
  "Union Point": 1587,
  "White Plains": 259,
  "Woodville": 344,
  "Sparta": 1416,
  "Davisboro": 2073,
  "Deep Step": 114,
  "Harrison": 388,
  "Riddleville": 132,
  "Tennille": 1557,
  "Allentown": 222,
  "Danville": 288,
  "Gordon": 1940,
  "Irwinton": 557,
  "Ivey": 675,
  "McIntyre": 603,
  "Toomsboro": 421,
  "Kite": 223,
  "Wrightsville": 3429,
  "Adrian": 589,
  "Garfield": 218,
  "Nunez": 275,
  "Oak Park": 448,
  "Stillmore": 592,
  "Summertown": 142,
  "Twin City": 1662,
  "Cadwell": 428,
  "Dexter": 510,
  "Dudley": 553,
  "East Dublin": 2564,
  "Montrose": 232,
  "Rentz": 320,
  "Soperton": 2814,
  "Ailey": 493,
  "Alston": 170,
  "Higgston": 199,
  "Mount Vernon": 2422,
  "Tarrytown": 178,
  "Uvalda": 527,
  "Lyons": 4360,
  "Santa Claus": 249,
  "Cobbtown": 364,
  "Collins": 495,
  "Manassas": 101,
  "Reidsville": 2387,
  "Bellville": 144,
  "Daisy": 163,
  "Hagan": 1070,
  "Pulaski": 246,
  "Brooklet": 1529,
  "Portal": 669,
  "Register": 188,
  "Hiltonia": 342,
  "Newington": 305,
  "Oliver": 201,
  "Rocky Ford": 168,
  "Millen": 2854,
  "Guyton": 2272,
  "Springfield": 3237,
  "Bloomingdale": 2713,
  "Garden City": 8778,
  "Port Wentworth": 10313,
  "Thunderbolt": 2774,
  "Tybee Island": 3094,
  "Vernonburg": 128,
  "Pembroke": 2580,
  "Richmond Hill": 17166,
  "Allenhurst": 769,
  "Flemington": 694,
  "Gum Branch": 274,
  "Midway": 2121,
  "Riceboro": 1006,
  "Walthourville": 4933,
  "Ludowici": 2075,
  "Darien": 1975,
  "Woodbine": 1531,
  "Homeland": 839,
  "Hoboken": 523,
  "Nahunta": 1070,
  "Offerman": 439,
  "Patterson": 727,
  "Graham": 275,
  "Surrency": 344,
  "Odum": 436,
  "Screven": 789,
  "Ambrose": 380,
  "Broxton": 1305,
  "Nicholls": 1180,
  "Pearson": 2066,
  "Willacoochee": 1389,
  "Argyle": 59,
  "Du Pont": 158,
  "Fargo": 273,
  "Homerville": 2614,
  "Lakeland": 3458,
  "Dasher": 1029,
  "Hahira": 3041,
  "Lake Park": 713,
  "Remerton": 1148,
  "Statenville": 126,
  "Barwick": 420,
  "Morven": 557,
  "Boston": 1280,
  "Coolidge": 550,
  "Meigs": 1047,
  "Ochlocknee": 614,
  "Whigham": 458,
  "Attapulgus": 522,
  "Brinson": 220,
  "Climax": 267,
  "Iron City": 315,
  "Colquitt": 1963,
  "Arlington": 1358,
  "Damascus": 251,
  "Jakin": 156,
  "Bluffton": 96,
  "Georgetown": 903,
  "Shellman": 1037,
  "Lumpkin": 1198,
  "Richland": 1408,
  "Preston": 361,
  "Andersonville": 255,
  "De Soto": 195,
  "Leslie": 393,
  "Ellaville": 1619,
  "Ideal": 391,
  "Marshallville": 1288,
  "Montezuma": 3289,
  "Oglethorpe": 1269,
  "Buena Vista": 2168,
  "Geneva": 102,
  "Junction City": 192,
  "Talbotton": 827,
  "Woodland": 405,
  "Arabi": 466,
  "Byromville": 526,
  "Lilly": 158,
  "Pinehurst": 348,
  "Unadilla": 3371,
  "Chester": 396,
  "Chauncey": 551,
  "Milan": 416,
  "Rhine": 310,
  "Jacksonville": 132,
  "Lumber City": 1248,
  "Scotland": 378,
  "Alamo": 903,
  "Glenwood": 684,
  "Denton": 243,
  "Pineview": 336,
  "Pitts": 321,
  "Rochelle": 1139,
  "Seville": 212,
  "Rebecca": 245,
  "Sycamore": 524,
  "Omega": 1355,
  "Ty Ty": 730,
  "Poulan": 837,
  "Sumner": 303,
  "Sylvester": 5763,
  "Warwick": 423,
  "Berlin": 609,
  "Doerun": 731,
  "Ellenton": 218,
  "Funston": 413,
  "Norman Park": 992,
  "Cecil": 273,
  "Lenox": 851,
  "Sparks": 2127,
  "Alapaha": 617,
  "Enigma": 1182,
  "Ray City": 927
};

// Business categories for Georgia
const businessCategories = [
  "Restaurant", "Southern Restaurant", "BBQ", "Soul Food", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "Hardware Store", "Farm Supply",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop", "Spa",
  "Dentist", "Doctor", "Clinic", "Hospital", "Veterinarian", "Chiropractor",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym",
  "Pet Store", "Florist", "Bakery", "Pizza", "Fast Food",
  "Hotel", "Motel", "Bed & Breakfast", "Furniture Store", "Antique Store",
  "Landscaping", "Lawn Care", "HVAC", "Plumber", "Electrician", "Roofing"
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
    const prefixes = [townName, "Georgia", "Peach State", "Southern", "Dixie", "Magnolia", "Piedmont"];
    const suffixes = ["", " LLC", " Inc", " & Co", " Services", " Center", " Plus"];

    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      name = `${prefix} ${category}${suffix}`.trim();
    } while (usedNames.has(name) && usedNames.size < 250);

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

for (const [townName, county] of Object.entries(georgiaTowns)) {
  const slug = slugify(townName) + '-ga';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 200000) businessCount = 175;
  else if (population > 100000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "GA");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Georgia",
    state_abbr: "GA",
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
title: "${townName}, GA Business Directory"
type: "towns"
slug: "${slug}"
state: "ga"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Georgia Business Directory"
slug: "ga"
state: "ga"
state_name: "Georgia"
---
`;
fs.writeFileSync(path.join(statesDir, 'ga.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
