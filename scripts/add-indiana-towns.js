import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Indiana municipalities with their counties (92 counties)
const indianaTowns = {
  // Marion County (Indianapolis area)
  "Indianapolis": "Marion",
  "Beech Grove": "Marion",
  "Lawrence": "Marion",
  "Southport": "Marion",
  "Speedway": "Marion",

  // Lake County (Gary/Hammond area)
  "Gary": "Lake",
  "Hammond": "Lake",
  "East Chicago": "Lake",
  "Crown Point": "Lake",
  "Hobart": "Lake",
  "Highland": "Lake",
  "Griffith": "Lake",
  "Merrillville": "Lake",
  "Munster": "Lake",
  "Schererville": "Lake",
  "Dyer": "Lake",
  "St. John": "Lake",
  "Lowell": "Lake",
  "Cedar Lake": "Lake",
  "Lake Station": "Lake",
  "Whiting": "Lake",

  // Allen County (Fort Wayne area)
  "Fort Wayne": "Allen",
  "New Haven": "Allen",
  "Woodburn": "Allen",
  "Grabill": "Allen",
  "Leo-Cedarville": "Allen",
  "Huntertown": "Allen",

  // St. Joseph County (South Bend area)
  "South Bend": "St. Joseph",
  "Mishawaka": "St. Joseph",
  "Granger": "St. Joseph",
  "Osceola": "St. Joseph",
  "Walkerton": "St. Joseph",

  // Elkhart County
  "Elkhart": "Elkhart",
  "Goshen": "Elkhart",
  "Nappanee": "Elkhart",
  "Middlebury": "Elkhart",
  "Bristol": "Elkhart",
  "Wakarusa": "Elkhart",

  // Vanderburgh County (Evansville area)
  "Evansville": "Vanderburgh",
  "Newburgh": "Vanderburgh",
  "Darmstadt": "Vanderburgh",

  // Tippecanoe County (Lafayette area)
  "Lafayette": "Tippecanoe",
  "West Lafayette": "Tippecanoe",
  "Battle Ground": "Tippecanoe",
  "Dayton": "Tippecanoe",

  // Hamilton County (Carmel area)
  "Carmel": "Hamilton",
  "Fishers": "Hamilton",
  "Noblesville": "Hamilton",
  "Westfield": "Hamilton",
  "Cicero": "Hamilton",
  "Arcadia": "Hamilton",
  "Atlanta": "Hamilton",
  "Sheridan": "Hamilton",

  // Porter County
  "Portage": "Porter",
  "Valparaiso": "Porter",
  "Chesterton": "Porter",
  "Burns Harbor": "Porter",
  "Beverly Shores": "Porter",
  "Porter": "Porter",
  "Hebron": "Porter",
  "Kouts": "Porter",

  // Madison County (Anderson area)
  "Anderson": "Madison",
  "Elwood": "Madison",
  "Alexandria": "Madison",
  "Pendleton": "Madison",
  "Chesterfield": "Madison",
  "Frankton": "Madison",
  "Ingalls": "Madison",
  "Markleville": "Madison",
  "Lapel": "Madison",
  "Edgewood": "Madison",

  // Monroe County (Bloomington area)
  "Bloomington": "Monroe",
  "Ellettsville": "Monroe",
  "Stinesville": "Monroe",

  // Delaware County (Muncie area)
  "Muncie": "Delaware",
  "Yorktown": "Delaware",
  "Albany": "Delaware",
  "Daleville": "Delaware",
  "Gaston": "Delaware",
  "Selma": "Delaware",
  "Eaton": "Delaware",

  // Vigo County (Terre Haute area)
  "Terre Haute": "Vigo",
  "West Terre Haute": "Vigo",
  "Seelyville": "Vigo",
  "Riley": "Vigo",

  // Johnson County (Greenwood area)
  "Greenwood": "Johnson",
  "Franklin": "Johnson",
  "Edinburgh": "Johnson",
  "Bargersville": "Johnson",
  "Whiteland": "Johnson",
  "Trafalgar": "Johnson",
  "Prince's Lakes": "Johnson",

  // Hendricks County
  "Plainfield": "Hendricks",
  "Brownsburg": "Hendricks",
  "Avon": "Hendricks",
  "Danville": "Hendricks",
  "Pittsboro": "Hendricks",
  "Clayton": "Hendricks",
  "Lizton": "Hendricks",
  "Coatesville": "Hendricks",
  "Amo": "Hendricks",
  "North Salem": "Hendricks",
  "Stilesville": "Hendricks",

  // Howard County (Kokomo area)
  "Kokomo": "Howard",
  "Greentown": "Howard",
  "Russiaville": "Howard",

  // LaPorte County
  "Michigan City": "LaPorte",
  "La Porte": "LaPorte",
  "Westville": "LaPorte",
  "Trail Creek": "LaPorte",
  "Long Beach": "LaPorte",
  "Rolling Prairie": "LaPorte",
  "Wanatah": "LaPorte",
  "Pottawattamie Park": "LaPorte",

  // Clark County
  "Jeffersonville": "Clark",
  "Clarksville": "Clark",
  "Sellersburg": "Clark",
  "Charlestown": "Clark",
  "Borden": "Clark",
  "Utica": "Clark",

  // Bartholomew County
  "Columbus": "Bartholomew",
  "Hope": "Bartholomew",
  "Hartsville": "Bartholomew",
  "Elizabethtown": "Bartholomew",

  // Floyd County
  "New Albany": "Floyd",
  "Georgetown": "Floyd",
  "Greenville": "Floyd",
  "Galena": "Floyd",

  // Kosciusko County
  "Warsaw": "Kosciusko",
  "Winona Lake": "Kosciusko",
  "Syracuse": "Kosciusko",
  "Pierceton": "Kosciusko",
  "Silver Lake": "Kosciusko",
  "Mentone": "Kosciusko",
  "Milford": "Kosciusko",
  "Etna Green": "Kosciusko",
  "North Webster": "Kosciusko",
  "Leesburg": "Kosciusko",

  // Grant County (Marion area)
  "Marion": "Grant",
  "Gas City": "Grant",
  "Upland": "Grant",
  "Fairmount": "Grant",
  "Jonesboro": "Grant",
  "Swayzee": "Grant",
  "Sweetser": "Grant",
  "Van Buren": "Grant",
  "Fowlerton": "Grant",
  "Matthews": "Grant",

  // Wayne County (Richmond area)
  "Richmond": "Wayne",
  "Centerville": "Wayne",
  "Cambridge City": "Wayne",
  "Hagerstown": "Wayne",
  "Milton": "Wayne",
  "Dublin": "Wayne",
  "Economy": "Wayne",
  "Greens Fork": "Wayne",

  // Hancock County (Greenfield area)
  "Greenfield": "Hancock",
  "McCordsville": "Hancock",
  "Fortville": "Hancock",
  "Cumberland": "Hancock",
  "New Palestine": "Hancock",
  "Shirley": "Hancock",
  "Spring Lake": "Hancock",

  // Morgan County
  "Martinsville": "Morgan",
  "Mooresville": "Morgan",
  "Morgantown": "Morgan",
  "Monrovia": "Morgan",
  "Brooklyn": "Morgan",
  "Paragon": "Morgan",

  // Boone County
  "Lebanon": "Boone",
  "Zionsville": "Boone",
  "Thorntown": "Boone",
  "Whitestown": "Boone",
  "Jamestown": "Boone",
  "Advance": "Boone",
  "Ulen": "Boone",

  // Montgomery County
  "Crawfordsville": "Montgomery",
  "Linden": "Montgomery",
  "Ladoga": "Montgomery",
  "Waynetown": "Montgomery",
  "Wingate": "Montgomery",
  "New Richmond": "Montgomery",
  "Waveland": "Montgomery",
  "New Market": "Montgomery",
  "Darlington": "Montgomery",

  // Warrick County
  "Boonville": "Warrick",
  "Chandler": "Warrick",
  "Newburgh Heights": "Warrick",
  "Elberfeld": "Warrick",
  "Lynnville": "Warrick",
  "Tennyson": "Warrick",

  // Henry County
  "New Castle": "Henry",
  "Middletown": "Henry",
  "Knightstown": "Henry",
  "Lewisville": "Henry",
  "Sulphur Springs": "Henry",
  "Greensboro": "Henry",
  "Mooreland": "Henry",
  "Springport": "Henry",
  "Cadiz": "Henry",
  "Spiceland": "Henry",
  "Straughn": "Henry",

  // DeKalb County
  "Auburn": "DeKalb",
  "Garrett": "DeKalb",
  "Butler": "DeKalb",
  "Waterloo": "DeKalb",
  "Altona": "DeKalb",
  "St. Joe": "DeKalb",
  "Ashley": "DeKalb",
  "Corunna": "DeKalb",

  // Shelby County
  "Shelbyville": "Shelby",
  "Morristown": "Shelby",
  "Fairland": "Shelby",
  "St. Paul": "Shelby",

  // Dubois County
  "Jasper": "Dubois",
  "Huntingburg": "Dubois",
  "Ferdinand": "Dubois",
  "Birdseye": "Dubois",
  "Holland": "Dubois",

  // Noble County
  "Kendallville": "Noble",
  "Ligonier": "Noble",
  "Albion": "Noble",
  "Avilla": "Noble",
  "Cromwell": "Noble",
  "Rome City": "Noble",

  // Harrison County
  "Corydon": "Harrison",
  "Lanesville": "Harrison",
  "New Middletown": "Harrison",
  "Palmyra": "Harrison",
  "Ramsey": "Harrison",
  "New Amsterdam": "Harrison",
  "Elizabeth": "Harrison",
  "Laconia": "Harrison",
  "Mauckport": "Harrison",

  // Lawrence County
  "Bedford": "Lawrence",
  "Mitchell": "Lawrence",
  "Oolitic": "Lawrence",
  "Springville": "Lawrence",

  // Dearborn County
  "Lawrenceburg": "Dearborn",
  "Aurora": "Dearborn",
  "Greendale": "Dearborn",
  "West Harrison": "Dearborn",
  "Moores Hill": "Dearborn",
  "Dillsboro": "Dearborn",

  // Clinton County
  "Frankfort": "Clinton",
  "Colfax": "Clinton",
  "Michigantown": "Clinton",
  "Mulberry": "Clinton",
  "Rossville": "Clinton",
  "Kirklin": "Clinton",

  // Jackson County
  "Seymour": "Jackson",
  "Crothersville": "Jackson",
  "Brownstown": "Jackson",
  "Medora": "Jackson",

  // Whitley County
  "Columbia City": "Whitley",
  "Churubusco": "Whitley",
  "South Whitley": "Whitley",
  "Larwill": "Whitley",

  // Huntington County
  "Huntington": "Huntington",
  "Roanoke": "Huntington",
  "Warren": "Huntington",
  "Andrews": "Huntington",
  "Markle": "Huntington",

  // Miami County (Peru area)
  "Peru": "Miami",
  "Grissom Air Reserve Base": "Miami",
  "Bunker Hill": "Miami",
  "Converse": "Miami",
  "Denver": "Miami",
  "Macy": "Miami",
  "Amboy": "Miami",

  // Wabash County
  "Wabash": "Wabash",
  "North Manchester": "Wabash",
  "La Fontaine": "Wabash",
  "Lagro": "Wabash",
  "Roann": "Wabash",
  "Somerset": "Wabash",

  // Wells County
  "Bluffton": "Wells",
  "Ossian": "Wells",
  "Poneto": "Wells",
  "Uniondale": "Wells",
  "Vera Cruz": "Wells",
  "Craigville": "Wells",

  // Knox County
  "Vincennes": "Knox",
  "Bicknell": "Knox",
  "Oaktown": "Knox",
  "Bruceville": "Knox",
  "Edwardsport": "Knox",
  "Decker": "Knox",
  "Monroe City": "Knox",
  "Sandborn": "Knox",
  "Wheatland": "Knox",

  // Daviess County
  "Washington": "Daviess",
  "Odon": "Daviess",
  "Montgomery": "Daviess",
  "Elnora": "Daviess",
  "Cannelburg": "Daviess",
  "Plainville": "Daviess",
  "Alfordsville": "Daviess",

  // Randolph County
  "Winchester": "Randolph",
  "Union City": "Randolph",
  "Farmland": "Randolph",
  "Lynn": "Randolph",
  "Ridgeville": "Randolph",
  "Modoc": "Randolph",
  "Parker City": "Randolph",
  "Saratoga": "Randolph",
  "Losantville": "Randolph",

  // Cass County
  "Logansport": "Cass",
  "Royal Center": "Cass",
  "Walton": "Cass",
  "Galveston": "Cass",
  "Onward": "Cass",

  // Putnam County
  "Greencastle": "Putnam",
  "Bainbridge": "Putnam",
  "Roachdale": "Putnam",
  "Cloverdale": "Putnam",
  "Russellville": "Putnam",
  "Fillmore": "Putnam",

  // Gibson County
  "Princeton": "Gibson",
  "Fort Branch": "Gibson",
  "Oakland City": "Gibson",
  "Haubstadt": "Gibson",
  "Owensville": "Gibson",
  "Francisco": "Gibson",
  "Patoka": "Gibson",

  // Spencer County
  "Rockport": "Spencer",
  "Santa Claus": "Spencer",
  "Dale": "Spencer",
  "Chrisney": "Spencer",
  "Grandview": "Spencer",
  "Lincoln City": "Spencer",

  // Decatur County
  "Greensburg": "Decatur",
  "Westport": "Decatur",
  "Burney": "Decatur",
  "Clarksburg": "Decatur",
  "Millhousen": "Decatur",
  "New Point": "Decatur",

  // Marshall County
  "Plymouth": "Marshall",
  "Bremen": "Marshall",
  "Culver": "Marshall",
  "Argos": "Marshall",
  "Bourbon": "Marshall",
  "La Paz": "Marshall",
  "Tyner": "Marshall",

  // White County
  "Monticello": "White",
  "Wolcott": "White",
  "Monon": "White",
  "Reynolds": "White",
  "Burnettsville": "White",
  "Buffalo": "White",
  "Brookston": "White",
  "Chalmers": "White",
  "Idaville": "White",

  // Carroll County
  "Delphi": "Carroll",
  "Camden": "Carroll",
  "Flora": "Carroll",
  "Burlington": "Carroll",
  "Yeoman": "Carroll",

  // Adams County
  "Decatur": "Adams",
  "Berne": "Adams",
  "Monroe": "Adams",
  "Geneva": "Adams",

  // Jasper County
  "Rensselaer": "Jasper",
  "DeMotte": "Jasper",
  "Wheatfield": "Jasper",
  "Remington": "Jasper",
  "Collegeville": "Jasper",

  // Steuben County
  "Angola": "Steuben",
  "Fremont": "Steuben",
  "Orland": "Steuben",
  "Hudson": "Steuben",
  "Pleasant Lake": "Steuben",
  "Clear Lake": "Steuben",
  "Hamilton": "Steuben",
  "Ashley": "Steuben",

  // LaGrange County
  "LaGrange": "LaGrange",
  "Shipshewana": "LaGrange",
  "Topeka": "LaGrange",
  "Howe": "LaGrange",
  "Wolcottville": "LaGrange",

  // Ripley County
  "Batesville": "Ripley",
  "Versailles": "Ripley",
  "Milan": "Ripley",
  "Sunman": "Ripley",
  "Osgood": "Ripley",
  "Napoleon": "Ripley",
  "Holton": "Ripley",

  // Posey County
  "Mount Vernon": "Posey",
  "New Harmony": "Posey",
  "Poseyville": "Posey",
  "Griffin": "Posey",
  "Cynthiana": "Posey",
  "Wadesville": "Posey",

  // Fulton County
  "Rochester": "Fulton",
  "Akron": "Fulton",
  "Kewanna": "Fulton",
  "Fulton": "Fulton",

  // Scott County
  "Scottsburg": "Scott",
  "Austin": "Scott",

  // Starke County
  "Knox": "Starke",
  "North Judson": "Starke",
  "San Pierre": "Starke",
  "Hamlet": "Starke",
  "Ora": "Starke",

  // Owen County
  "Spencer": "Owen",
  "Gosport": "Owen",

  // Washington County
  "Salem": "Washington",
  "Campbellsburg": "Washington",
  "New Pekin": "Washington",
  "Hardinsburg": "Washington",
  "Saltillo": "Washington",
  "Little York": "Washington",

  // Parke County
  "Rockville": "Parke",
  "Montezuma": "Parke",
  "Rosedale": "Parke",
  "Mecca": "Parke",
  "Marshall": "Parke",

  // Clay County
  "Brazil": "Clay",
  "Bowling Green": "Clay",
  "Harmony": "Clay",
  "Knightsville": "Clay",
  "Clay City": "Clay",
  "Carbon": "Clay",
  "Centerpoint": "Clay",
  "Staunton": "Clay",

  // Greene County
  "Linton": "Greene",
  "Bloomfield": "Greene",
  "Jasonville": "Greene",
  "Worthington": "Greene",
  "Lyons": "Greene",
  "Switz City": "Greene",
  "Newberry": "Greene",

  // Fayette County
  "Connersville": "Fayette",
  "Glenwood": "Fayette",
  "Bentonville": "Fayette",

  // Jay County
  "Portland": "Jay",
  "Dunkirk": "Jay",
  "Redkey": "Jay",
  "Pennville": "Jay",
  "Bryant": "Jay",
  "Salamonia": "Jay",

  // Blackford County
  "Hartford City": "Blackford",
  "Montpelier": "Blackford",
  "Shamrock Lakes": "Blackford",

  // Rush County
  "Rushville": "Rush",
  "Glenwood": "Rush",
  "Carthage": "Rush",
  "Milroy": "Rush",

  // Fountain County
  "Covington": "Fountain",
  "Attica": "Fountain",
  "Veedersburg": "Fountain",
  "Hillsboro": "Fountain",
  "Kingman": "Fountain",
  "Newtown": "Fountain",

  // Sullivan County
  "Sullivan": "Sullivan",
  "Carlisle": "Sullivan",
  "Dugger": "Sullivan",
  "Farmersburg": "Sullivan",
  "Shelburn": "Sullivan",
  "Hymera": "Sullivan",

  // Vermillion County
  "Clinton": "Vermillion",
  "Cayuga": "Vermillion",
  "Dana": "Vermillion",
  "Newport": "Vermillion",
  "Fairview Park": "Vermillion",
  "Perrysville": "Vermillion",

  // Jefferson County
  "Madison": "Jefferson",
  "Hanover": "Jefferson",
  "Brooksburg": "Jefferson",
  "Deputy": "Jefferson",

  // Switzerland County
  "Vevay": "Switzerland",
  "Patriot": "Switzerland",

  // Pike County
  "Petersburg": "Pike",
  "Winslow": "Pike",
  "Spurgeon": "Pike",
  "Otwell": "Pike",

  // Benton County
  "Fowler": "Benton",
  "Oxford": "Benton",
  "Otterbein": "Benton",
  "Boswell": "Benton",
  "Earl Park": "Benton",

  // Newton County
  "Kentland": "Newton",
  "Morocco": "Newton",
  "Brook": "Newton",
  "Goodland": "Newton",
  "Mount Ayr": "Newton",

  // Pulaski County
  "Winamac": "Pulaski",
  "Francesville": "Pulaski",
  "Medaryville": "Pulaski",
  "Monterey": "Pulaski",
  "Star City": "Pulaski",

  // Brown County
  "Nashville": "Brown",
  "Gnaw Bone": "Brown",

  // Orange County
  "Paoli": "Orange",
  "Orleans": "Orange",
  "French Lick": "Orange",
  "West Baden Springs": "Orange",

  // Crawford County
  "English": "Crawford",
  "Marengo": "Crawford",
  "Milltown": "Crawford",
  "Leavenworth": "Crawford",

  // Perry County
  "Tell City": "Perry",
  "Cannelton": "Perry",
  "Troy": "Perry",

  // Martin County
  "Shoals": "Martin",
  "Loogootee": "Martin",
  "Crane": "Martin",

  // Warren County
  "Williamsport": "Warren",
  "West Lebanon": "Warren",
  "Pine Village": "Warren",
  "State Line City": "Warren",
  "Tab": "Warren",

  // Tipton County
  "Tipton": "Tipton",
  "Kempton": "Tipton",
  "Sharpsville": "Tipton",
  "Windfall": "Tipton",
  "Hobbs": "Tipton",

  // Jennings County
  "North Vernon": "Jennings",
  "Vernon": "Jennings",

  // Franklin County
  "Brookville": "Franklin",
  "Oldenburg": "Franklin",
  "Batesville": "Franklin",
  "Laurel": "Franklin",
  "Cedar Grove": "Franklin",

  // Ohio County
  "Rising Sun": "Ohio",

  // Union County
  "Liberty": "Union",
  "West College Corner": "Union"
};

// Population estimates for Indiana cities
const populations = {
  "Indianapolis": 887642,
  "Fort Wayne": 270402,
  "Evansville": 117298,
  "South Bend": 103453,
  "Carmel": 101068,
  "Fishers": 98977,
  "Bloomington": 79168,
  "Hammond": 76574,
  "Gary": 68244,
  "Lafayette": 67925,
  "Muncie": 65194,
  "Noblesville": 64668,
  "Terre Haute": 58389,
  "Greenwood": 57394,
  "Kokomo": 57853,
  "Anderson": 54876,
  "Elkhart": 52752,
  "Mishawaka": 51063,
  "Lawrence": 49043,
  "Jeffersonville": 47965,
  "Columbus": 47377,
  "Westfield": 46028,
  "Portage": 37476,
  "New Albany": 36889,
  "Richmond": 35372,
  "Goshen": 34517,
  "Merrillville": 34655,
  "Michigan City": 31479,
  "Crown Point": 30711,
  "Valparaiso": 33440,
  "Marion": 28619,
  "Franklin": 26523,
  "East Chicago": 26904,
  "Schererville": 30081,
  "La Porte": 22053,
  "Granger": 30620,
  "Plainfield": 34165,
  "Brownsburg": 28068,
  "Avon": 18874,
  "Clarksville": 21724,
  "Hobart": 28314,
  "Munster": 23385,
  "Highland": 22609,
  "Seymour": 20027,
  "Shelbyville": 19712,
  "Dyer": 16390,
  "New Haven": 15943,
  "St. John": 18382,
  "Jasper": 15853,
  "Martinsville": 11828,
  "Greenfield": 22521,
  "Bedford": 13237,
  "Crawfordsville": 16336,
  "Warsaw": 15804,
  "Vincennes": 17264,
  "Auburn": 13330,
  "Logansport": 17968,
  "Lebanon": 16562,
  "Connersville": 13146,
  "Madison": 11819,
  "Peru": 11417,
  "Huntington": 17022,
  "Washington": 11861,
  "New Castle": 17396,
  "Decatur": 9867,
  "Princeton": 8113,
  "Kendallville": 9928,
  "Bluffton": 10282,
  "Wabash": 10666,
  "Tell City": 7272,
  "Greencastle": 10326,
  "Columbia City": 9103,
  "Portland": 6056,
  "Hartford City": 5965,
  "Rochester": 6171,
  "Brazil": 8129,
  "Batesville": 6958,
  "Salem": 6172,
  "Corydon": 3078,
  "Rockville": 2465,
  "Rensselaer": 5904,
  "Plymouth": 10201,
  "Angola": 8792,
  "Scottsburg": 6747,
  "Brookville": 2596,
  "Paoli": 3692,
  "Linton": 5393,
  "Sullivan": 4249,
  "Winamac": 2467,
  "Fowler": 2349,
  "Kentland": 1793,
  "Shoals": 756,
  "Liberty": 1962,
  "Rising Sun": 2304,
  "English": 670,
  "Vevay": 1682,
  "Nashville": 1067,
  "Spencer": 2217,
  "Williamsport": 1870,
  "Delphi": 2893,
  "Monticello": 5203,
  "Knox": 3521,
  "North Vernon": 7135,
  "Tipton": 5106,
  "Frankfort": 16001,
  "Mooresville": 9840,
  "Zionsville": 28357,
  "Nappanee": 6648,
  "Griffith": 16127,
  "Lake Station": 11936,
  "Lowell": 10008,
  "Cedar Lake": 12876,
  "Chesterton": 13912,
  "Speedway": 12598,
  "Beech Grove": 15010,
  "West Lafayette": 44595,
  "Elwood": 8449,
  "Alexandria": 4991,
  "Pendleton": 4253,
  "Cicero": 4800,
  "Yorktown": 11094,
  "Gas City": 5936,
  "Upland": 3845,
  "Fairmount": 2766,
  "Lawrenceburg": 5042,
  "Aurora": 3750,
  "Greendale": 4268,
  "Boonville": 6246,
  "Newburgh": 3325,
  "Mount Vernon": 6587,
  "New Harmony": 789,
  "Dale": 1586,
  "Santa Claus": 2481,
  "French Lick": 1807,
  "West Baden Springs": 574,
  "Whiting": 4997,
  "Burns Harbor": 2107
};

// Business categories (same comprehensive list)
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

    const prefixes = [townName, county, "Hoosier", "Indiana", "Midwest", "Crossroads", "Heritage", "Prairie", "Heartland", "Central"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, IN`,
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

for (const [townName, county] of Object.entries(indianaTowns)) {
  const slug = generateSlug(townName) + '-in';
  const population = populations[townName] || Math.floor(Math.random() * 5000) + 500;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Indiana",
    state_abbr: "IN",
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
title: "${townName}, Indiana Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Indiana"
state_abbr: "IN"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Indiana Business Directory"
slug: "in"
state: "in"
state_name: "Indiana"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'in.md'), stateContent);

console.log(`Created Indiana towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
