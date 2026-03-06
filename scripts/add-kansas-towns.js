import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Kansas municipalities with their counties (105 counties)
const kansasTowns = {
  // Sedgwick County (Wichita area)
  "Wichita": "Sedgwick",
  "Derby": "Sedgwick",
  "Haysville": "Sedgwick",
  "Park City": "Sedgwick",
  "Bel Aire": "Sedgwick",
  "Goddard": "Sedgwick",
  "Valley Center": "Sedgwick",
  "Maize": "Sedgwick",
  "Colwich": "Sedgwick",
  "Clearwater": "Sedgwick",
  "Bentley": "Sedgwick",
  "Cheney": "Sedgwick",
  "Mount Hope": "Sedgwick",
  "Andale": "Sedgwick",
  "Garden Plain": "Sedgwick",
  "Eastborough": "Sedgwick",
  "Kechi": "Sedgwick",

  // Johnson County (Overland Park area)
  "Overland Park": "Johnson",
  "Olathe": "Johnson",
  "Shawnee": "Johnson",
  "Lenexa": "Johnson",
  "Leawood": "Johnson",
  "Prairie Village": "Johnson",
  "Gardner": "Johnson",
  "Merriam": "Johnson",
  "Mission": "Johnson",
  "Roeland Park": "Johnson",
  "Fairway": "Johnson",
  "Spring Hill": "Johnson",
  "De Soto": "Johnson",
  "Edgerton": "Johnson",
  "Westwood": "Johnson",
  "Mission Hills": "Johnson",
  "Lake Quivira": "Johnson",

  // Wyandotte County (Kansas City area)
  "Kansas City": "Wyandotte",
  "Bonner Springs": "Wyandotte",
  "Edwardsville": "Wyandotte",
  "Lake Quivira": "Wyandotte",

  // Shawnee County (Topeka area)
  "Topeka": "Shawnee",
  "Silver Lake": "Shawnee",
  "Auburn": "Shawnee",
  "Rossville": "Shawnee",
  "Willard": "Shawnee",

  // Douglas County (Lawrence area)
  "Lawrence": "Douglas",
  "Eudora": "Douglas",
  "Baldwin City": "Douglas",
  "Lecompton": "Douglas",

  // Leavenworth County
  "Leavenworth": "Leavenworth",
  "Lansing": "Leavenworth",
  "Basehor": "Leavenworth",
  "Tonganoxie": "Leavenworth",
  "Linwood": "Leavenworth",
  "Easton": "Leavenworth",

  // Riley County (Manhattan area)
  "Manhattan": "Riley",
  "Ogden": "Riley",
  "Riley": "Riley",
  "Leonardville": "Riley",
  "Randolph": "Riley",

  // Saline County (Salina area)
  "Salina": "Saline",
  "Brookville": "Saline",
  "Gypsum": "Saline",
  "Assaria": "Saline",
  "Smolan": "Saline",

  // Reno County (Hutchinson area)
  "Hutchinson": "Reno",
  "South Hutchinson": "Reno",
  "Buhler": "Reno",
  "Haven": "Reno",
  "Pretty Prairie": "Reno",
  "Nickerson": "Reno",
  "Arlington": "Reno",
  "Sylvia": "Reno",
  "Turon": "Reno",
  "Abbyville": "Reno",
  "Partridge": "Reno",
  "Plevna": "Reno",

  // Butler County
  "El Dorado": "Butler",
  "Augusta": "Butler",
  "Andover": "Butler",
  "Rose Hill": "Butler",
  "Douglass": "Butler",
  "Towanda": "Butler",
  "Potwin": "Butler",
  "Leon": "Butler",
  "Benton": "Butler",
  "Whitewater": "Butler",
  "Latham": "Butler",

  // Crawford County
  "Pittsburg": "Crawford",
  "Girard": "Crawford",
  "Frontenac": "Crawford",
  "Arma": "Crawford",
  "Cherokee": "Crawford",
  "Arcadia": "Crawford",
  "McCune": "Crawford",
  "Mulberry": "Crawford",

  // Finney County (Garden City area)
  "Garden City": "Finney",
  "Holcomb": "Finney",
  "Pierceville": "Finney",
  "Kalvesta": "Finney",

  // Ford County (Dodge City area)
  "Dodge City": "Ford",
  "Bucklin": "Ford",
  "Ford": "Ford",
  "Spearville": "Ford",
  "Wright": "Ford",

  // Geary County (Junction City area)
  "Junction City": "Geary",
  "Grandview Plaza": "Geary",
  "Milford": "Geary",

  // Harvey County
  "Newton": "Harvey",
  "Hesston": "Harvey",
  "North Newton": "Harvey",
  "Halstead": "Harvey",
  "Burrton": "Harvey",
  "Sedgwick": "Harvey",
  "Walton": "Harvey",

  // Lyon County (Emporia area)
  "Emporia": "Lyon",
  "Admire": "Lyon",
  "Allen": "Lyon",
  "Americus": "Lyon",
  "Hartford": "Lyon",
  "Olpe": "Lyon",
  "Reading": "Lyon",

  // McPherson County
  "McPherson": "McPherson",
  "Lindsborg": "McPherson",
  "Moundridge": "McPherson",
  "Inman": "McPherson",
  "Canton": "McPherson",
  "Galva": "McPherson",
  "Windom": "McPherson",
  "Marquette": "McPherson",
  "Conway Springs": "McPherson",
  "Elyria": "McPherson",

  // Ellis County (Hays area)
  "Hays": "Ellis",
  "Victoria": "Ellis",
  "Ellis": "Ellis",
  "Schoenchen": "Ellis",
  "Walker": "Ellis",

  // Cowley County
  "Winfield": "Cowley",
  "Arkansas City": "Cowley",
  "Burden": "Cowley",
  "Dexter": "Cowley",
  "Udall": "Cowley",
  "Atlanta": "Cowley",
  "Cambridge": "Cowley",

  // Miami County
  "Paola": "Miami",
  "Louisburg": "Miami",
  "Osawatomie": "Miami",
  "Spring Hill": "Miami",
  "Fontana": "Miami",

  // Labette County
  "Parsons": "Labette",
  "Chetopa": "Labette",
  "Altamont": "Labette",
  "Oswego": "Labette",
  "Edna": "Labette",
  "Mound Valley": "Labette",
  "Dennis": "Labette",
  "Bartlett": "Labette",

  // Montgomery County
  "Independence": "Montgomery",
  "Coffeyville": "Montgomery",
  "Caney": "Montgomery",
  "Cherryvale": "Montgomery",
  "Elk City": "Montgomery",
  "Dearing": "Montgomery",
  "Havana": "Montgomery",
  "Tyro": "Montgomery",

  // Sumner County
  "Wellington": "Sumner",
  "Mulvane": "Sumner",
  "Belle Plaine": "Sumner",
  "Oxford": "Sumner",
  "Conway Springs": "Sumner",
  "Caldwell": "Sumner",
  "Argonia": "Sumner",
  "South Haven": "Sumner",

  // Franklin County
  "Ottawa": "Franklin",
  "Wellsville": "Franklin",
  "Pomona": "Franklin",
  "Williamsburg": "Franklin",
  "Lane": "Franklin",
  "Richmond": "Franklin",
  "Princeton": "Franklin",
  "Rantoul": "Franklin",

  // Pottawatomie County
  "Wamego": "Pottawatomie",
  "St. Marys": "Pottawatomie",
  "Westmoreland": "Pottawatomie",
  "Onaga": "Pottawatomie",
  "Emmett": "Pottawatomie",
  "Havensville": "Pottawatomie",
  "Louisville": "Pottawatomie",
  "Wheaton": "Pottawatomie",
  "Belvue": "Pottawatomie",

  // Barton County
  "Great Bend": "Barton",
  "Hoisington": "Barton",
  "Ellinwood": "Barton",
  "Claflin": "Barton",
  "Albert": "Barton",
  "Olmitz": "Barton",
  "Pawnee Rock": "Barton",

  // Atchison County
  "Atchison": "Atchison",
  "Effingham": "Atchison",
  "Muscotah": "Atchison",
  "Nortonville": "Atchison",
  "Cummings": "Atchison",
  "Huron": "Atchison",
  "Lancaster": "Atchison",

  // Bourbon County
  "Fort Scott": "Bourbon",
  "Uniontown": "Bourbon",
  "Mapleton": "Bourbon",
  "Bronson": "Bourbon",
  "Redfield": "Bourbon",

  // Cherokee County
  "Columbus": "Cherokee",
  "Baxter Springs": "Cherokee",
  "Galena": "Cherokee",
  "Weir": "Cherokee",
  "Riverton": "Cherokee",
  "Scammon": "Cherokee",
  "West Mineral": "Cherokee",
  "Treece": "Cherokee",

  // Cloud County
  "Concordia": "Cloud",
  "Clyde": "Cloud",
  "Miltonvale": "Cloud",
  "Jamestown": "Cloud",
  "Glasco": "Cloud",
  "Aurora": "Cloud",

  // Dickinson County
  "Abilene": "Dickinson",
  "Chapman": "Dickinson",
  "Herington": "Dickinson",
  "Hope": "Dickinson",
  "Enterprise": "Dickinson",
  "Solomon": "Dickinson",
  "Woodbine": "Dickinson",
  "Talmage": "Dickinson",
  "Manchester": "Dickinson",

  // Jefferson County
  "Oskaloosa": "Jefferson",
  "Valley Falls": "Jefferson",
  "McLouth": "Jefferson",
  "Ozawkie": "Jefferson",
  "Meriden": "Jefferson",
  "Winchester": "Jefferson",
  "Nortonville": "Jefferson",
  "Perry": "Jefferson",

  // Marion County
  "Marion": "Marion",
  "Hillsboro": "Marion",
  "Peabody": "Marion",
  "Florence": "Marion",
  "Burns": "Marion",
  "Tampa": "Marion",
  "Goessel": "Marion",
  "Lincolnville": "Marion",
  "Lehigh": "Marion",
  "Ramona": "Marion",
  "Lost Springs": "Marion",

  // Neosho County
  "Chanute": "Neosho",
  "Erie": "Neosho",
  "St. Paul": "Neosho",
  "Thayer": "Neosho",
  "Galesburg": "Neosho",
  "Stark": "Neosho",
  "Earlton": "Neosho",

  // Osage County
  "Osage City": "Osage",
  "Lyndon": "Osage",
  "Burlingame": "Osage",
  "Carbondale": "Osage",
  "Overbrook": "Osage",
  "Scranton": "Osage",
  "Melvern": "Osage",
  "Quenemo": "Osage",
  "Olivet": "Osage",

  // Allen County
  "Iola": "Allen",
  "Humboldt": "Allen",
  "Moran": "Allen",
  "Gas": "Allen",
  "Savonburg": "Allen",
  "LaHarpe": "Allen",
  "Bassett": "Allen",

  // Anderson County
  "Garnett": "Anderson",
  "Colony": "Anderson",
  "Westphalia": "Anderson",
  "Kincaid": "Anderson",
  "Greeley": "Anderson",
  "Harris": "Anderson",

  // Coffey County
  "Burlington": "Coffey",
  "LeRoy": "Coffey",
  "Gridley": "Coffey",
  "Waverly": "Coffey",
  "Lebo": "Coffey",
  "New Strawn": "Coffey",

  // Greenwood County
  "Eureka": "Greenwood",
  "Madison": "Greenwood",
  "Severy": "Greenwood",
  "Hamilton": "Greenwood",
  "Fall River": "Greenwood",
  "Piedmont": "Greenwood",
  "Climax": "Greenwood",

  // Wilson County
  "Fredonia": "Wilson",
  "Neodesha": "Wilson",
  "Altoona": "Wilson",
  "Benedict": "Wilson",
  "Buffalo": "Wilson",
  "Coyville": "Wilson",
  "Lafontaine": "Wilson",
  "New Albany": "Wilson",

  // Woodson County
  "Yates Center": "Woodson",
  "Toronto": "Woodson",
  "Neosho Falls": "Woodson",

  // Brown County
  "Hiawatha": "Brown",
  "Horton": "Brown",
  "Everest": "Brown",
  "Fairview": "Brown",
  "Morrill": "Brown",
  "Powhattan": "Brown",
  "Reserve": "Brown",
  "Robinson": "Brown",
  "Willis": "Brown",

  // Doniphan County
  "Troy": "Doniphan",
  "Elwood": "Doniphan",
  "Wathena": "Doniphan",
  "Highland": "Doniphan",
  "Denton": "Doniphan",
  "Bendena": "Doniphan",
  "Leona": "Doniphan",
  "Severance": "Doniphan",
  "White Cloud": "Doniphan",

  // Jackson County
  "Holton": "Jackson",
  "Hoyt": "Jackson",
  "Mayetta": "Jackson",
  "Netawaka": "Jackson",
  "Circleville": "Jackson",
  "Delia": "Jackson",
  "Denison": "Jackson",
  "Soldier": "Jackson",
  "Whiting": "Jackson",

  // Marshall County
  "Marysville": "Marshall",
  "Blue Rapids": "Marshall",
  "Frankfort": "Marshall",
  "Waterville": "Marshall",
  "Axtell": "Marshall",
  "Beattie": "Marshall",
  "Vermillion": "Marshall",
  "Oketo": "Marshall",
  "Summerfield": "Marshall",

  // Nemaha County
  "Seneca": "Nemaha",
  "Sabetha": "Nemaha",
  "Centralia": "Nemaha",
  "Wetmore": "Nemaha",
  "Baileyville": "Nemaha",
  "Bern": "Nemaha",
  "Goff": "Nemaha",
  "Oneida": "Nemaha",
  "Corning": "Nemaha",

  // Republic County
  "Belleville": "Republic",
  "Scandia": "Republic",
  "Republic": "Republic",
  "Courtland": "Republic",
  "Cuba": "Republic",
  "Narka": "Republic",
  "Munden": "Republic",
  "Wayne": "Republic",

  // Washington County
  "Washington": "Washington",
  "Clifton": "Washington",
  "Greenleaf": "Washington",
  "Hanover": "Washington",
  "Linn": "Washington",
  "Morrowville": "Washington",
  "Palmer": "Washington",
  "Haddam": "Washington",
  "Barnes": "Washington",

  // Clay County
  "Clay Center": "Clay",
  "Wakefield": "Clay",
  "Clifton": "Clay",
  "Green": "Clay",
  "Morganville": "Clay",
  "Longford": "Clay",
  "Oak Hill": "Clay",

  // Ottawa County
  "Minneapolis": "Ottawa",
  "Delphos": "Ottawa",
  "Bennington": "Ottawa",
  "Tescott": "Ottawa",
  "Ada": "Ottawa",
  "Culver": "Ottawa",

  // Mitchell County
  "Beloit": "Mitchell",
  "Glen Elder": "Mitchell",
  "Cawker City": "Mitchell",
  "Hunter": "Mitchell",
  "Tipton": "Mitchell",
  "Simpson": "Mitchell",
  "Scottsville": "Mitchell",

  // Lincoln County
  "Lincoln": "Lincoln",
  "Sylvan Grove": "Lincoln",
  "Barnard": "Lincoln",
  "Beverly": "Lincoln",

  // Ellsworth County
  "Ellsworth": "Ellsworth",
  "Wilson": "Ellsworth",
  "Kanopolis": "Ellsworth",
  "Lorraine": "Ellsworth",
  "Holyrood": "Ellsworth",

  // Russell County
  "Russell": "Russell",
  "Lucas": "Russell",
  "Bunker Hill": "Russell",
  "Luray": "Russell",
  "Paradise": "Russell",
  "Gorham": "Russell",
  "Waldo": "Russell",

  // Rice County
  "Lyons": "Rice",
  "Sterling": "Rice",
  "Little River": "Rice",
  "Geneseo": "Rice",
  "Chase": "Rice",
  "Bushton": "Rice",
  "Raymond": "Rice",
  "Alden": "Rice",

  // Stafford County
  "Stafford": "Stafford",
  "St. John": "Stafford",
  "Hudson": "Stafford",
  "Macksville": "Stafford",
  "Radium": "Stafford",
  "Seward": "Stafford",
  "Zenith": "Stafford",

  // Pratt County
  "Pratt": "Pratt",
  "Preston": "Pratt",
  "Byers": "Pratt",
  "Coats": "Pratt",
  "Iuka": "Pratt",
  "Cullison": "Pratt",
  "Sawyer": "Pratt",

  // Kingman County
  "Kingman": "Kingman",
  "Cunningham": "Kingman",
  "Norwich": "Kingman",
  "Zenda": "Kingman",
  "Nashville": "Kingman",
  "Penalosa": "Kingman",
  "Murdock": "Kingman",
  "Spivey": "Kingman",

  // Harper County
  "Anthony": "Harper",
  "Harper": "Harper",
  "Attica": "Harper",
  "Bluff City": "Harper",
  "Danville": "Harper",
  "Freeport": "Harper",
  "Waldron": "Harper",

  // Comanche County
  "Coldwater": "Comanche",
  "Protection": "Comanche",
  "Wilmore": "Comanche",

  // Barber County
  "Medicine Lodge": "Barber",
  "Kiowa": "Barber",
  "Hardtner": "Barber",
  "Sun City": "Barber",
  "Sharon": "Barber",
  "Aetna": "Barber",
  "Hazelton": "Barber",
  "Isabel": "Barber",

  // Clark County
  "Ashland": "Clark",
  "Minneola": "Clark",
  "Englewood": "Clark",

  // Meade County
  "Meade": "Meade",
  "Plains": "Meade",
  "Fowler": "Meade",

  // Seward County (Liberal area)
  "Liberal": "Seward",
  "Kismet": "Seward",

  // Haskell County
  "Sublette": "Haskell",
  "Satanta": "Haskell",

  // Grant County
  "Ulysses": "Grant",

  // Gray County
  "Cimarron": "Gray",
  "Ingalls": "Gray",
  "Montezuma": "Gray",
  "Copeland": "Gray",
  "Ensign": "Gray",

  // Kearny County
  "Lakin": "Kearny",
  "Deerfield": "Kearny",

  // Stanton County
  "Johnson": "Stanton",
  "Manter": "Stanton",

  // Morton County
  "Elkhart": "Morton",
  "Rolla": "Morton",
  "Richfield": "Morton",

  // Stevens County
  "Hugoton": "Stevens",
  "Moscow": "Stevens",

  // Hamilton County
  "Syracuse": "Hamilton",
  "Coolidge": "Hamilton",
  "Kendall": "Hamilton",

  // Wichita County
  "Leoti": "Wichita",
  "Marienthal": "Wichita",

  // Scott County
  "Scott City": "Scott",

  // Lane County
  "Dighton": "Lane",
  "Healy": "Lane",

  // Ness County
  "Ness City": "Ness",
  "Ransom": "Ness",
  "Bazine": "Ness",
  "Brownell": "Ness",
  "Utica": "Ness",

  // Rush County
  "La Crosse": "Rush",
  "Bison": "Rush",
  "Alexander": "Rush",
  "Otis": "Rush",
  "Liebenthal": "Rush",
  "McCracken": "Rush",
  "Nekoma": "Rush",

  // Hodgeman County
  "Jetmore": "Hodgeman",
  "Hanston": "Hodgeman",

  // Pawnee County
  "Larned": "Pawnee",
  "Burdett": "Pawnee",
  "Garfield": "Pawnee",
  "Rozel": "Pawnee",

  // Edwards County
  "Kinsley": "Edwards",
  "Lewis": "Edwards",
  "Belpre": "Edwards",
  "Offerle": "Edwards",
  "Trousdale": "Edwards",

  // Kiowa County
  "Greensburg": "Kiowa",
  "Haviland": "Kiowa",
  "Mullinville": "Kiowa",

  // Trego County
  "WaKeeney": "Trego",
  "Ogallah": "Trego",
  "Collyer": "Trego",

  // Gove County
  "Gove City": "Gove",
  "Quinter": "Gove",
  "Park": "Gove",
  "Grainfield": "Gove",
  "Grinnell": "Gove",

  // Logan County
  "Oakley": "Logan",
  "Russell Springs": "Logan",
  "Winona": "Logan",

  // Wallace County
  "Sharon Springs": "Wallace",
  "Weskan": "Wallace",
  "Wallace": "Wallace",

  // Greeley County
  "Tribune": "Greeley",
  "Horace": "Greeley",

  // Norton County
  "Norton": "Norton",
  "Lenora": "Norton",
  "Almena": "Norton",
  "Clayton": "Norton",

  // Phillips County
  "Phillipsburg": "Phillips",
  "Logan": "Phillips",
  "Agra": "Phillips",
  "Long Island": "Phillips",
  "Prairie View": "Phillips",
  "Kirwin": "Phillips",
  "Glade": "Phillips",
  "Speed": "Phillips",

  // Rooks County
  "Stockton": "Rooks",
  "Plainville": "Rooks",
  "Palco": "Rooks",
  "Damar": "Rooks",
  "Zurich": "Rooks",
  "Woodston": "Rooks",

  // Osborne County
  "Osborne": "Osborne",
  "Downs": "Osborne",
  "Alton": "Osborne",
  "Portis": "Osborne",
  "Natoma": "Osborne",

  // Smith County
  "Smith Center": "Smith",
  "Kensington": "Smith",
  "Lebanon": "Smith",
  "Gaylord": "Smith",
  "Athol": "Smith",

  // Jewell County
  "Mankato": "Jewell",
  "Jewell": "Jewell",
  "Burr Oak": "Jewell",
  "Randall": "Jewell",
  "Formoso": "Jewell",
  "Esbon": "Jewell",

  // Graham County
  "Hill City": "Graham",
  "Morland": "Graham",
  "Bogue": "Graham",
  "Penokee": "Graham",
  "Nicodemus": "Graham",

  // Sheridan County
  "Hoxie": "Sheridan",
  "Selden": "Sheridan",

  // Thomas County
  "Colby": "Thomas",
  "Rexford": "Thomas",
  "Brewster": "Thomas",
  "Levant": "Thomas",
  "Gem": "Thomas",
  "Oakley": "Thomas",

  // Sherman County
  "Goodland": "Sherman",
  "Kanorado": "Sherman",
  "Edson": "Sherman",

  // Cheyenne County
  "St. Francis": "Cheyenne",
  "Bird City": "Cheyenne",
  "Wheeler": "Cheyenne",

  // Rawlins County
  "Atwood": "Rawlins",
  "Ludell": "Rawlins",
  "Herndon": "Rawlins",
  "McDonald": "Rawlins",

  // Decatur County
  "Oberlin": "Decatur",
  "Norcatur": "Decatur",
  "Jennings": "Decatur",
  "Dresden": "Decatur",
  "Leoville": "Decatur",

  // Morris County
  "Council Grove": "Morris",
  "Burdick": "Morris",
  "Dwight": "Morris",
  "Dunlap": "Morris",
  "Latimer": "Morris",
  "White City": "Morris",
  "Wilsey": "Morris",
  "Parkerville": "Morris",

  // Chase County
  "Cottonwood Falls": "Chase",
  "Strong City": "Chase",
  "Cedar Point": "Chase",
  "Elmdale": "Chase",
  "Matfield Green": "Chase",

  // Wabaunsee County
  "Alma": "Wabaunsee",
  "Eskridge": "Wabaunsee",
  "Alta Vista": "Wabaunsee",
  "Harveyville": "Wabaunsee",
  "Maple Hill": "Wabaunsee",
  "McFarland": "Wabaunsee",
  "Paxico": "Wabaunsee",

  // Chautauqua County
  "Sedan": "Chautauqua",
  "Cedar Vale": "Chautauqua",
  "Peru": "Chautauqua",
  "Niotaze": "Chautauqua",
  "Chautauqua": "Chautauqua",
  "Hewins": "Chautauqua",

  // Elk County
  "Howard": "Elk",
  "Elk Falls": "Elk",
  "Longton": "Elk",
  "Grenola": "Elk",
  "Moline": "Elk"
};

// Population estimates for Kansas cities
const populations = {
  "Wichita": 397532,
  "Overland Park": 197238,
  "Kansas City": 156607,
  "Olathe": 141290,
  "Topeka": 126587,
  "Lawrence": 94934,
  "Shawnee": 67311,
  "Manhattan": 54832,
  "Lenexa": 56400,
  "Salina": 46994,
  "Hutchinson": 40623,
  "Leawood": 34702,
  "Leavenworth": 35797,
  "Derby": 25161,
  "Gardner": 22600,
  "Prairie Village": 22368,
  "Emporia": 24724,
  "Junction City": 22988,
  "Dodge City": 27720,
  "Liberal": 19826,
  "Garden City": 28451,
  "Hays": 21124,
  "Pittsburg": 20216,
  "Newton": 18753,
  "Great Bend": 15004,
  "McPherson": 13155,
  "El Dorado": 12869,
  "Merriam": 11191,
  "Winfield": 11990,
  "Arkansas City": 11974,
  "Parsons": 9656,
  "Lansing": 11947,
  "Atchison": 10397,
  "Coffeyville": 9034,
  "Chanute": 9025,
  "Ottawa": 12649,
  "Fort Scott": 7612,
  "Bonner Springs": 7929,
  "Independence": 8920,
  "Andover": 13505,
  "Augusta": 9274,
  "Wellington": 7694,
  "Ulysses": 5960,
  "Tonganoxie": 5637,
  "Abilene": 6475,
  "Concordia": 5135,
  "Iola": 5312,
  "Pratt": 6615,
  "Haysville": 11340,
  "Park City": 8058,
  "Bel Aire": 8262,
  "Mission": 9482,
  "Roeland Park": 6731,
  "Basehor": 6199,
  "Eudora": 6551,
  "Baldwin City": 4684,
  "Spring Hill": 6939,
  "De Soto": 6374,
  "Goddard": 5107,
  "Maize": 5488,
  "Valley Center": 7299,
  "Colby": 5387,
  "Goodland": 4489,
  "Scott City": 3765,
  "Lyons": 3439,
  "Russell": 4460,
  "Osborne": 1377,
  "Beloit": 3571,
  "Clay Center": 4048,
  "Belleville": 1876,
  "Marysville": 3385,
  "Seneca": 1996,
  "Holton": 3299,
  "Hiawatha": 3172,
  "Council Grove": 2096,
  "Marion": 1927,
  "Hillsboro": 2993,
  "Herington": 2263,
  "Osage City": 2788,
  "Garnett": 3265,
  "Burlington": 2624,
  "Eureka": 2379,
  "Fredonia": 2284,
  "Yates Center": 1364,
  "Sedan": 1018,
  "Howard": 619,
  "Medicine Lodge": 1876,
  "Anthony": 2146,
  "Kingman": 2952,
  "Greensburg": 777,
  "Coldwater": 720,
  "Ashland": 798,
  "Meade": 1502,
  "Sublette": 1453,
  "Hugoton": 3904,
  "Elkhart": 1937,
  "Syracuse": 1812,
  "Lakin": 2146,
  "Leoti": 1471,
  "Tribune": 742,
  "Sharon Springs": 742,
  "Oakley": 2045,
  "WaKeeney": 1862,
  "Ness City": 1405,
  "La Crosse": 1256,
  "Larned": 3841,
  "Kinsley": 1457,
  "Jetmore": 867,
  "Dighton": 1038,
  "Stockton": 1329,
  "Phillipsburg": 2433,
  "Norton": 2808,
  "Oberlin": 1768,
  "Atwood": 1187,
  "St. Francis": 1292,
  "Hill City": 1432,
  "Hoxie": 1171,
  "Smith Center": 1600,
  "Mankato": 818
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

    const prefixes = [townName, county, "Sunflower", "Kansas", "Prairie", "Midwest", "Heartland", "Jayhawk", "Wheat"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, KS`,
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

for (const [townName, county] of Object.entries(kansasTowns)) {
  const slug = generateSlug(townName) + '-ks';
  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Kansas",
    state_abbr: "KS",
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
title: "${townName}, Kansas Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Kansas"
state_abbr: "KS"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Kansas Business Directory"
slug: "ks"
state: "ks"
state_name: "Kansas"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'ks.md'), stateContent);

console.log(`Created Kansas towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
