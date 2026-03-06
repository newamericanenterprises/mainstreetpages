import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All US states data (excluding NJ and AL which are already done)
const statesData = {
  "AK": { name: "Alaska", counties: ["Anchorage", "Fairbanks North Star", "Matanuska-Susitna", "Kenai Peninsula", "Juneau", "Ketchikan Gateway", "Kodiak Island", "Bethel", "Nome", "Sitka"] },
  "AZ": { name: "Arizona", counties: ["Maricopa", "Pima", "Pinal", "Yavapai", "Yuma", "Mohave", "Coconino", "Cochise", "Navajo", "Apache", "Gila", "Santa Cruz", "Graham", "La Paz", "Greenlee"] },
  "AR": { name: "Arkansas", counties: ["Pulaski", "Benton", "Washington", "Sebastian", "Faulkner", "Saline", "Craighead", "Garland", "Jefferson", "White", "Lonoke", "Crawford", "Pope", "Miller", "Crittenden"] },
  "CA": { name: "California", counties: ["Los Angeles", "San Diego", "Orange", "Riverside", "San Bernardino", "Santa Clara", "Alameda", "Sacramento", "Contra Costa", "Fresno", "San Francisco", "Ventura", "San Mateo", "Kern", "San Joaquin"] },
  "CO": { name: "Colorado", counties: ["Denver", "El Paso", "Arapahoe", "Jefferson", "Adams", "Larimer", "Douglas", "Boulder", "Weld", "Pueblo", "Mesa", "Broomfield", "Garfield", "Eagle", "La Plata"] },
  "CT": { name: "Connecticut", counties: ["Fairfield", "Hartford", "New Haven", "New London", "Litchfield", "Middlesex", "Tolland", "Windham"] },
  "DE": { name: "Delaware", counties: ["New Castle", "Kent", "Sussex"] },
  "FL": { name: "Florida", counties: ["Miami-Dade", "Broward", "Palm Beach", "Hillsborough", "Orange", "Pinellas", "Duval", "Lee", "Polk", "Brevard", "Volusia", "Pasco", "Seminole", "Sarasota", "Manatee"] },
  "GA": { name: "Georgia", counties: ["Fulton", "Gwinnett", "Cobb", "DeKalb", "Chatham", "Clayton", "Cherokee", "Forsyth", "Henry", "Richmond", "Hall", "Muscogee", "Columbia", "Bibb", "Houston"] },
  "HI": { name: "Hawaii", counties: ["Honolulu", "Hawaii", "Maui", "Kauai"] },
  "ID": { name: "Idaho", counties: ["Ada", "Canyon", "Kootenai", "Bonneville", "Bannock", "Twin Falls", "Bingham", "Madison", "Nez Perce", "Latah", "Elmore", "Bonner", "Jerome", "Cassia", "Blaine"] },
  "IL": { name: "Illinois", counties: ["Cook", "DuPage", "Lake", "Will", "Kane", "McHenry", "Winnebago", "Madison", "St. Clair", "Champaign", "Sangamon", "Peoria", "McLean", "Rock Island", "Tazewell"] },
  "IN": { name: "Indiana", counties: ["Marion", "Lake", "Allen", "Hamilton", "St. Joseph", "Elkhart", "Tippecanoe", "Vanderburgh", "Porter", "Hendricks", "Johnson", "Madison", "Monroe", "Clark", "Vigo"] },
  "IA": { name: "Iowa", counties: ["Polk", "Linn", "Scott", "Johnson", "Black Hawk", "Woodbury", "Dubuque", "Story", "Pottawattamie", "Dallas", "Warren", "Clinton", "Cerro Gordo", "Jasper", "Marshall"] },
  "KS": { name: "Kansas", counties: ["Johnson", "Sedgwick", "Shawnee", "Wyandotte", "Douglas", "Leavenworth", "Riley", "Butler", "Reno", "Saline", "Crawford", "Ford", "Finney", "Lyon", "Harvey"] },
  "KY": { name: "Kentucky", counties: ["Jefferson", "Fayette", "Kenton", "Boone", "Warren", "Hardin", "Daviess", "Campbell", "Bullitt", "Madison", "McCracken", "Oldham", "Pike", "Christian", "Laurel"] },
  "LA": { name: "Louisiana", parishes: ["Orleans", "Jefferson", "East Baton Rouge", "Caddo", "St. Tammany", "Lafayette", "Calcasieu", "Ouachita", "Rapides", "Bossier", "Tangipahoa", "Livingston", "Terrebonne", "Ascension", "Iberia"] },
  "ME": { name: "Maine", counties: ["Cumberland", "York", "Penobscot", "Kennebec", "Androscoggin", "Aroostook", "Oxford", "Hancock", "Somerset", "Knox", "Waldo", "Lincoln", "Sagadahoc", "Franklin", "Washington"] },
  "MD": { name: "Maryland", counties: ["Montgomery", "Prince George's", "Baltimore County", "Anne Arundel", "Howard", "Baltimore City", "Frederick", "Harford", "Carroll", "Charles", "Washington", "Wicomico", "St. Mary's", "Cecil", "Calvert"] },
  "MA": { name: "Massachusetts", counties: ["Middlesex", "Worcester", "Essex", "Suffolk", "Norfolk", "Bristol", "Plymouth", "Hampden", "Hampshire", "Barnstable", "Berkshire", "Franklin", "Dukes", "Nantucket"] },
  "MI": { name: "Michigan", counties: ["Wayne", "Oakland", "Macomb", "Kent", "Genesee", "Washtenaw", "Ingham", "Ottawa", "Kalamazoo", "Saginaw", "Muskegon", "St. Clair", "Livingston", "Jackson", "Berrien"] },
  "MN": { name: "Minnesota", counties: ["Hennepin", "Ramsey", "Dakota", "Anoka", "Washington", "St. Louis", "Olmsted", "Scott", "Wright", "Stearns", "Carver", "Sherburne", "Blue Earth", "Rice", "Winona"] },
  "MS": { name: "Mississippi", counties: ["Hinds", "Harrison", "DeSoto", "Rankin", "Jackson", "Madison", "Lee", "Forrest", "Lauderdale", "Jones", "Lowndes", "Lafayette", "Warren", "Washington", "Pearl River"] },
  "MO": { name: "Missouri", counties: ["St. Louis County", "Jackson", "St. Charles", "St. Louis City", "Greene", "Clay", "Jefferson", "Boone", "Jasper", "Cass", "Platte", "Franklin", "Christian", "Cape Girardeau", "Cole"] },
  "MT": { name: "Montana", counties: ["Yellowstone", "Missoula", "Gallatin", "Flathead", "Cascade", "Lewis and Clark", "Ravalli", "Silver Bow", "Lake", "Lincoln", "Hill", "Glacier", "Park", "Custer", "Dawson"] },
  "NE": { name: "Nebraska", counties: ["Douglas", "Lancaster", "Sarpy", "Hall", "Buffalo", "Scotts Bluff", "Lincoln", "Dakota", "Madison", "Dodge", "Adams", "Platte", "Gage", "Dawson", "Cass"] },
  "NV": { name: "Nevada", counties: ["Clark", "Washoe", "Carson City", "Douglas", "Elko", "Lyon", "Nye", "Churchill", "Humboldt", "White Pine", "Pershing", "Lander", "Lincoln", "Mineral", "Storey"] },
  "NH": { name: "New Hampshire", counties: ["Hillsborough", "Rockingham", "Merrimack", "Strafford", "Grafton", "Cheshire", "Belknap", "Carroll", "Sullivan", "Coos"] },
  "NM": { name: "New Mexico", counties: ["Bernalillo", "Dona Ana", "Santa Fe", "Sandoval", "San Juan", "McKinley", "Lea", "Valencia", "Chaves", "Otero", "Eddy", "Curry", "Rio Arriba", "Luna", "Grant"] },
  "NY": { name: "New York", counties: ["Kings", "Queens", "New York", "Suffolk", "Bronx", "Nassau", "Westchester", "Erie", "Monroe", "Richmond", "Onondaga", "Orange", "Rockland", "Albany", "Dutchess"] },
  "NC": { name: "North Carolina", counties: ["Mecklenburg", "Wake", "Guilford", "Forsyth", "Cumberland", "Durham", "Buncombe", "Gaston", "New Hanover", "Union", "Cabarrus", "Onslow", "Pitt", "Catawba", "Iredell"] },
  "ND": { name: "North Dakota", counties: ["Cass", "Burleigh", "Grand Forks", "Ward", "Williams", "Stark", "Morton", "Stutsman", "Richland", "Ramsey", "Barnes", "Walsh", "Rolette", "McLean", "Mountrail"] },
  "OH": { name: "Ohio", counties: ["Franklin", "Cuyahoga", "Hamilton", "Summit", "Montgomery", "Lucas", "Butler", "Stark", "Lorain", "Warren", "Lake", "Mahoning", "Clermont", "Delaware", "Medina"] },
  "OK": { name: "Oklahoma", counties: ["Oklahoma", "Tulsa", "Cleveland", "Canadian", "Comanche", "Rogers", "Payne", "Wagoner", "Garfield", "Pottawatomie", "Muskogee", "Creek", "Kay", "Carter", "Grady"] },
  "OR": { name: "Oregon", counties: ["Multnomah", "Washington", "Clackamas", "Lane", "Marion", "Jackson", "Deschutes", "Linn", "Douglas", "Yamhill", "Polk", "Benton", "Umatilla", "Josephine", "Klamath"] },
  "PA": { name: "Pennsylvania", counties: ["Philadelphia", "Allegheny", "Montgomery", "Bucks", "Delaware", "Lancaster", "Chester", "York", "Berks", "Lehigh", "Luzerne", "Northampton", "Dauphin", "Erie", "Westmoreland"] },
  "RI": { name: "Rhode Island", counties: ["Providence", "Kent", "Washington", "Newport", "Bristol"] },
  "SC": { name: "South Carolina", counties: ["Greenville", "Richland", "Charleston", "Horry", "Spartanburg", "Lexington", "York", "Anderson", "Berkeley", "Dorchester", "Beaufort", "Aiken", "Florence", "Pickens", "Sumter"] },
  "SD": { name: "South Dakota", counties: ["Minnehaha", "Pennington", "Lincoln", "Brown", "Codington", "Brookings", "Meade", "Lawrence", "Davison", "Hughes", "Yankton", "Beadle", "Clay", "Union", "Roberts"] },
  "TN": { name: "Tennessee", counties: ["Shelby", "Davidson", "Knox", "Hamilton", "Rutherford", "Williamson", "Sumner", "Montgomery", "Wilson", "Blount", "Washington", "Maury", "Sevier", "Sullivan", "Bradley"] },
  "TX": { name: "Texas", counties: ["Harris", "Dallas", "Tarrant", "Bexar", "Travis", "Collin", "Hidalgo", "El Paso", "Denton", "Fort Bend", "Montgomery", "Williamson", "Cameron", "Nueces", "Brazoria"] },
  "UT": { name: "Utah", counties: ["Salt Lake", "Utah", "Davis", "Weber", "Washington", "Cache", "Tooele", "Box Elder", "Iron", "Summit", "Uintah", "Sanpete", "Sevier", "Carbon", "Duchesne"] },
  "VT": { name: "Vermont", counties: ["Chittenden", "Rutland", "Washington", "Windsor", "Franklin", "Windham", "Addison", "Bennington", "Caledonia", "Orange", "Orleans", "Lamoille", "Grand Isle", "Essex"] },
  "VA": { name: "Virginia", counties: ["Fairfax", "Prince William", "Loudoun", "Virginia Beach", "Chesterfield", "Henrico", "Arlington", "Norfolk", "Richmond City", "Chesapeake", "Newport News", "Hampton", "Stafford", "Spotsylvania", "Roanoke"] },
  "WA": { name: "Washington", counties: ["King", "Pierce", "Snohomish", "Spokane", "Clark", "Thurston", "Kitsap", "Yakima", "Whatcom", "Benton", "Skagit", "Cowlitz", "Grant", "Franklin", "Island"] },
  "WV": { name: "West Virginia", counties: ["Kanawha", "Berkeley", "Cabell", "Monongalia", "Wood", "Raleigh", "Putnam", "Harrison", "Marion", "Mercer", "Jefferson", "Ohio", "Fayette", "Wayne", "Logan"] },
  "WI": { name: "Wisconsin", counties: ["Milwaukee", "Dane", "Waukesha", "Brown", "Racine", "Outagamie", "Winnebago", "Kenosha", "Rock", "Marathon", "Washington", "La Crosse", "Sheboygan", "Eau Claire", "Walworth"] },
  "WY": { name: "Wyoming", counties: ["Laramie", "Natrona", "Campbell", "Sweetwater", "Fremont", "Albany", "Sheridan", "Park", "Teton", "Uinta", "Carbon", "Converse", "Goshen", "Lincoln", "Big Horn"] }
};

// Major cities per state with approximate populations
const majorCities = {
  "AK": { "Anchorage": 291247, "Fairbanks": 32515, "Juneau": 32255, "Sitka": 8458, "Ketchikan": 8263, "Wasilla": 12492, "Kenai": 7424, "Kodiak": 5968, "Bethel": 6325, "Palmer": 7306 },
  "AZ": { "Phoenix": 1608139, "Tucson": 542629, "Mesa": 504258, "Chandler": 261165, "Scottsdale": 241361, "Glendale": 248325, "Gilbert": 267918, "Tempe": 180587, "Peoria": 175961, "Surprise": 143148 },
  "AR": { "Little Rock": 202591, "Fort Smith": 87845, "Fayetteville": 93949, "Springdale": 84312, "Jonesboro": 78576, "Rogers": 72758, "Conway": 67336, "North Little Rock": 64633, "Bentonville": 54909, "Pine Bluff": 41253 },
  "CA": { "Los Angeles": 3898747, "San Diego": 1386932, "San Jose": 1013240, "San Francisco": 873965, "Fresno": 542107, "Sacramento": 524943, "Long Beach": 466742, "Oakland": 433031, "Bakersfield": 403455, "Anaheim": 350365 },
  "CO": { "Denver": 727211, "Colorado Springs": 478961, "Aurora": 386261, "Fort Collins": 169810, "Lakewood": 155984, "Thornton": 141867, "Arvada": 124402, "Westminster": 116317, "Pueblo": 111876, "Centennial": 108418 },
  "CT": { "Bridgeport": 148654, "New Haven": 134023, "Stamford": 135470, "Hartford": 121054, "Waterbury": 114403, "Norwalk": 91184, "Danbury": 86518, "New Britain": 74135, "Bristol": 60039, "Meriden": 59395 },
  "DE": { "Wilmington": 70898, "Dover": 39403, "Newark": 33042, "Middletown": 22350, "Bear": 21017, "Brookside": 14353, "Glasgow": 15811, "Hockessin": 13527, "Smyrna": 11694, "Milford": 11463 },
  "FL": { "Jacksonville": 949611, "Miami": 442241, "Tampa": 384959, "Orlando": 307573, "St. Petersburg": 258308, "Hialeah": 223109, "Port St. Lucie": 204851, "Cape Coral": 194016, "Tallahassee": 196169, "Fort Lauderdale": 182760 },
  "GA": { "Atlanta": 498715, "Augusta": 202081, "Columbus": 206922, "Macon": 157346, "Savannah": 147780, "Athens": 127315, "Sandy Springs": 108080, "Roswell": 94786, "Johns Creek": 84551, "Albany": 72256 },
  "HI": { "Honolulu": 350964, "Pearl City": 47698, "Hilo": 45703, "Kailua": 40514, "Waipahu": 38216, "Kaneohe": 34597, "Mililani Town": 27629, "Kahului": 29179, "Ewa Gentry": 26808, "Kihei": 22749 },
  "ID": { "Boise": 235684, "Meridian": 117635, "Nampa": 100200, "Idaho Falls": 64820, "Caldwell": 59087, "Pocatello": 56320, "Coeur d'Alene": 53470, "Twin Falls": 51807, "Post Falls": 37615, "Lewiston": 33419 },
  "IL": { "Chicago": 2746388, "Aurora": 180542, "Joliet": 150362, "Naperville": 149540, "Rockford": 148655, "Springfield": 114394, "Elgin": 114797, "Peoria": 113150, "Champaign": 88302, "Waukegan": 89078 },
  "IN": { "Indianapolis": 887642, "Fort Wayne": 263886, "Evansville": 117298, "South Bend": 103453, "Carmel": 99757, "Fishers": 98977, "Bloomington": 79168, "Hammond": 77879, "Gary": 69093, "Lafayette": 72540 },
  "IA": { "Des Moines": 214133, "Cedar Rapids": 137710, "Davenport": 101724, "Sioux City": 85797, "Iowa City": 74828, "Waterloo": 67314, "Ames": 66427, "West Des Moines": 68723, "Council Bluffs": 62799, "Ankeny": 67355 },
  "KS": { "Wichita": 397532, "Overland Park": 197238, "Kansas City": 156607, "Olathe": 141290, "Topeka": 126587, "Lawrence": 94934, "Shawnee": 67311, "Manhattan": 55045, "Lenexa": 55625, "Salina": 46994 },
  "KY": { "Louisville": 633045, "Lexington": 322570, "Bowling Green": 74028, "Owensboro": 60183, "Covington": 40961, "Richmond": 36330, "Georgetown": 37214, "Florence": 33273, "Hopkinsville": 30790, "Nicholasville": 32684 },
  "LA": { "New Orleans": 383997, "Baton Rouge": 227470, "Shreveport": 187112, "Metairie": 138481, "Lafayette": 121374, "Lake Charles": 83137, "Kenner": 66702, "Bossier City": 68159, "Monroe": 47702, "Alexandria": 46545 },
  "ME": { "Portland": 68408, "Lewiston": 37121, "Bangor": 32029, "South Portland": 26498, "Auburn": 23832, "Biddeford": 22795, "Sanford": 21906, "Saco": 20381, "Westbrook": 19560, "Augusta": 18899 },
  "MD": { "Baltimore": 585708, "Frederick": 78171, "Rockville": 68155, "Gaithersburg": 69657, "Bowie": 58682, "Hagerstown": 42042, "Annapolis": 40812, "College Park": 32275, "Salisbury": 33618, "Laurel": 25475 },
  "MA": { "Boston": 675647, "Worcester": 206518, "Springfield": 155929, "Cambridge": 118403, "Lowell": 115554, "Brockton": 105643, "New Bedford": 101079, "Quincy": 101636, "Lynn": 101253, "Fall River": 93885 },
  "MI": { "Detroit": 639111, "Grand Rapids": 198917, "Warren": 139387, "Sterling Heights": 134346, "Ann Arbor": 123851, "Lansing": 118210, "Flint": 97310, "Dearborn": 109976, "Livonia": 96942, "Troy": 87294 },
  "MN": { "Minneapolis": 429954, "Saint Paul": 311527, "Rochester": 121395, "Duluth": 92811, "Bloomington": 89987, "Brooklyn Park": 86478, "Plymouth": 81026, "Maple Grove": 79450, "Woodbury": 75102, "St. Cloud": 70243 },
  "MS": { "Jackson": 153701, "Gulfport": 72076, "Southaven": 54944, "Hattiesburg": 48106, "Biloxi": 46212, "Meridian": 37252, "Tupelo": 38312, "Olive Branch": 42229, "Greenville": 29938, "Horn Lake": 27657 },
  "MO": { "Kansas City": 508090, "St. Louis": 301578, "Springfield": 169176, "Columbia": 126254, "Independence": 123011, "Lee's Summit": 101108, "O'Fallon": 91316, "St. Joseph": 77147, "St. Charles": 76073, "Blue Springs": 56454 },
  "MT": { "Billings": 117116, "Missoula": 75516, "Great Falls": 60506, "Bozeman": 53293, "Butte": 34494, "Helena": 32091, "Kalispell": 26935, "Havre": 9846, "Anaconda": 9153, "Miles City": 8541 },
  "NE": { "Omaha": 486051, "Lincoln": 291082, "Bellevue": 64176, "Grand Island": 53131, "Kearney": 33783, "Fremont": 27093, "Hastings": 25314, "Norfolk": 24523, "North Platte": 23880, "Columbus": 24540 },
  "NV": { "Las Vegas": 641903, "Henderson": 320189, "Reno": 264165, "North Las Vegas": 262527, "Sparks": 108445, "Carson City": 58639, "Fernley": 22136, "Elko": 20614, "Mesquite": 18750, "Boulder City": 16207 },
  "NH": { "Manchester": 115644, "Nashua": 91322, "Concord": 43976, "Derry": 33305, "Rochester": 32492, "Salem": 30009, "Dover": 32741, "Merrimack": 26632, "Londonderry": 26405, "Hudson": 25394 },
  "NM": { "Albuquerque": 564559, "Las Cruces": 111385, "Rio Rancho": 104046, "Santa Fe": 87505, "Roswell": 48422, "Farmington": 44372, "Clovis": 39508, "Hobbs": 40508, "Alamogordo": 31384, "Carlsbad": 32238 },
  "NY": { "New York City": 8336817, "Buffalo": 278349, "Rochester": 211328, "Yonkers": 211569, "Syracuse": 148620, "Albany": 99224, "New Rochelle": 79726, "Mount Vernon": 73893, "Schenectady": 67047, "Utica": 65284 },
  "NC": { "Charlotte": 874579, "Raleigh": 467665, "Greensboro": 299035, "Durham": 283506, "Winston-Salem": 249545, "Fayetteville": 211657, "Cary": 174721, "Wilmington": 123784, "High Point": 112791, "Concord": 105240 },
  "ND": { "Fargo": 125990, "Bismarck": 74018, "Grand Forks": 56588, "Minot": 48377, "West Fargo": 37710, "Williston": 27096, "Dickinson": 23133, "Mandan": 22752, "Jamestown": 15849, "Wahpeton": 7843 },
  "OH": { "Columbus": 905748, "Cleveland": 372624, "Cincinnati": 309317, "Toledo": 270871, "Akron": 190469, "Dayton": 137644, "Parma": 81601, "Canton": 70872, "Youngstown": 60068, "Lorain": 65211 },
  "OK": { "Oklahoma City": 681054, "Tulsa": 413066, "Norman": 128026, "Broken Arrow": 113540, "Lawton": 96867, "Edmond": 94054, "Moore": 62793, "Midwest City": 57392, "Enid": 50665, "Stillwater": 50612 },
  "OR": { "Portland": 652573, "Salem": 175535, "Eugene": 176654, "Gresham": 114247, "Hillsboro": 106894, "Beaverton": 99037, "Bend": 99178, "Medford": 85824, "Springfield": 62256, "Corvallis": 59864 },
  "PA": { "Philadelphia": 1584064, "Pittsburgh": 302971, "Allentown": 126092, "Reading": 95112, "Scranton": 77182, "Bethlehem": 75781, "Lancaster": 63490, "Harrisburg": 50099, "Altoona": 43286, "York": 44750 },
  "RI": { "Providence": 190934, "Warwick": 82823, "Cranston": 82934, "Pawtucket": 75604, "East Providence": 47139, "Woonsocket": 44328, "Newport": 25163, "Central Falls": 22583, "Westerly": 17842, "North Providence": 34438 },
  "SC": { "Charleston": 150227, "Columbia": 136632, "North Charleston": 114852, "Mount Pleasant": 94898, "Rock Hill": 74372, "Greenville": 70635, "Summerville": 53643, "Goose Creek": 47161, "Sumter": 44177, "Hilton Head Island": 40000 },
  "SD": { "Sioux Falls": 192517, "Rapid City": 74703, "Aberdeen": 28324, "Brookings": 24194, "Watertown": 22655, "Mitchell": 15660, "Yankton": 15411, "Pierre": 14091, "Huron": 14292, "Vermillion": 11695 },
  "TN": { "Nashville": 689447, "Memphis": 633104, "Knoxville": 190740, "Chattanooga": 181099, "Clarksville": 166722, "Murfreesboro": 152769, "Franklin": 83454, "Jackson": 68205, "Johnson City": 71046, "Bartlett": 59423 },
  "TX": { "Houston": 2304580, "San Antonio": 1547253, "Dallas": 1304379, "Austin": 978908, "Fort Worth": 918915, "El Paso": 678815, "Arlington": 394266, "Corpus Christi": 317863, "Plano": 287677, "Laredo": 261639 },
  "UT": { "Salt Lake City": 199723, "West Valley City": 140230, "Provo": 116288, "West Jordan": 116961, "Orem": 97499, "Sandy": 96901, "Ogden": 87321, "St. George": 95342, "Layton": 81609, "South Jordan": 77487 },
  "VT": { "Burlington": 45417, "South Burlington": 20292, "Rutland": 15807, "Barre": 8491, "Montpelier": 8074, "Winooski": 7997, "St. Albans": 6877, "Newport": 4589, "Vergennes": 2588, "Middlebury": 9152 },
  "VA": { "Virginia Beach": 449974, "Norfolk": 244703, "Chesapeake": 249422, "Richmond": 226610, "Newport News": 186247, "Alexandria": 159467, "Hampton": 137148, "Roanoke": 100011, "Portsmouth": 97915, "Suffolk": 94324 },
  "WA": { "Seattle": 737015, "Spokane": 228989, "Tacoma": 219346, "Vancouver": 190915, "Bellevue": 151854, "Kent": 136588, "Everett": 112631, "Renton": 106785, "Spokane Valley": 102976, "Federal Way": 101030 },
  "WV": { "Charleston": 48864, "Huntington": 46842, "Morgantown": 30955, "Parkersburg": 29018, "Wheeling": 27066, "Weirton": 18797, "Fairmont": 18427, "Martinsburg": 18273, "Beckley": 17614, "Clarksburg": 15743 },
  "WI": { "Milwaukee": 577222, "Madison": 269840, "Green Bay": 107395, "Kenosha": 100150, "Racine": 77816, "Appleton": 75644, "Waukesha": 72489, "Eau Claire": 69421, "Oshkosh": 66816, "Janesville": 65615 },
  "WY": { "Cheyenne": 64235, "Casper": 58720, "Laramie": 32158, "Gillette": 32857, "Rock Springs": 23319, "Sheridan": 18186, "Green River": 11808, "Evanston": 11982, "Riverton": 10970, "Cody": 10014 }
};

// Additional smaller towns per county (generated)
const townSuffixes = ["ville", "town", "burg", "ford", "field", "port", "wood", "dale", "view", "park", "hills", "heights", "springs", "grove", "lake"];
const townPrefixes = ["North", "South", "East", "West", "New", "Old", "Upper", "Lower", "Mount", "Lake", "River", "Oak", "Pine", "Cedar", "Maple"];

function slugify(name) {
  return name.toLowerCase()
    .replace(/[''\.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function generateBusinesses(townName, count) {
  const categories = [
    "Restaurant", "Cafe", "Bar", "Bank", "Gas Station", "Supermarket",
    "Hardware Store", "Pharmacy", "Auto Repair", "Hair Salon", "Dentist",
    "Insurance", "Real Estate", "Attorney", "Accountant", "Dry Cleaner",
    "Fitness Center", "Pet Store", "Florist", "Bakery", "Pizza"
  ];

  const businesses = [];
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    businesses.push({
      name: `${townName} ${category}`,
      category: category,
      address: `${townName}`,
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

function getBusinessCount(population) {
  if (population > 500000) return 200;
  if (population > 100000) return 150;
  if (population > 50000) return 100;
  if (population > 20000) return 75;
  if (population > 10000) return 50;
  if (population > 5000) return 30;
  return 15;
}

const townsDir = path.join(__dirname, '..', 'data', 'towns');
const contentDir = path.join(__dirname, '..', 'content', 'towns');
const statesContentDir = path.join(__dirname, '..', 'content', 'states');

// Ensure directories exist
[townsDir, contentDir, statesContentDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

let totalTowns = 0;
let totalBusinesses = 0;

for (const [stateAbbr, stateInfo] of Object.entries(statesData)) {
  const stateName = stateInfo.name;
  const counties = stateInfo.counties || stateInfo.parishes || [];
  const cities = majorCities[stateAbbr] || {};

  let stateTownCount = 0;
  let stateBusinessCount = 0;

  // Add major cities
  for (const [cityName, population] of Object.entries(cities)) {
    const county = counties[Math.floor(Math.random() * counties.length)];
    const slug = slugify(cityName) + '-' + stateAbbr.toLowerCase();
    const businessCount = getBusinessCount(population);

    const townData = {
      name: cityName,
      state: stateName,
      state_abbr: stateAbbr,
      county: county,
      population: population,
      slug: slug,
      businesses: generateBusinesses(cityName, businessCount)
    };

    fs.writeFileSync(path.join(townsDir, `${slug}.json`), JSON.stringify(townData, null, 2));

    const content = `---
title: "${cityName}, ${stateAbbr} Business Directory"
type: "towns"
slug: "${slug}"
state: "${stateAbbr.toLowerCase()}"
town_data: "${slug}"
---
`;
    fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

    stateTownCount++;
    stateBusinessCount += businessCount;
  }

  // Generate additional towns for each county
  for (const county of counties) {
    const numTowns = Math.floor(Math.random() * 3) + 2; // 2-4 towns per county
    for (let i = 0; i < numTowns; i++) {
      const prefix = townPrefixes[Math.floor(Math.random() * townPrefixes.length)];
      const suffix = townSuffixes[Math.floor(Math.random() * townSuffixes.length)];
      const townName = `${prefix} ${county.split(' ')[0]}${suffix}`;
      const slug = slugify(townName) + '-' + stateAbbr.toLowerCase();

      // Skip if already exists
      if (fs.existsSync(path.join(townsDir, `${slug}.json`))) continue;

      const population = Math.floor(Math.random() * 15000) + 1000;
      const businessCount = getBusinessCount(population);

      const townData = {
        name: townName,
        state: stateName,
        state_abbr: stateAbbr,
        county: county,
        population: population,
        slug: slug,
        businesses: generateBusinesses(townName, businessCount)
      };

      fs.writeFileSync(path.join(townsDir, `${slug}.json`), JSON.stringify(townData, null, 2));

      const content = `---
title: "${townName}, ${stateAbbr} Business Directory"
type: "towns"
slug: "${slug}"
state: "${stateAbbr.toLowerCase()}"
town_data: "${slug}"
---
`;
      fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

      stateTownCount++;
      stateBusinessCount += businessCount;
    }
  }

  // Create state content page
  const stateContent = `---
title: "${stateName} Business Directory"
slug: "${stateAbbr.toLowerCase()}"
state: "${stateAbbr.toLowerCase()}"
state_name: "${stateName}"
---
`;
  fs.writeFileSync(path.join(statesContentDir, `${stateAbbr.toLowerCase()}.md`), stateContent);

  console.log(`${stateName}: ${stateTownCount} towns, ${stateBusinessCount.toLocaleString()} businesses`);
  totalTowns += stateTownCount;
  totalBusinesses += stateBusinessCount;
}

console.log(`\n=== TOTAL: ${totalTowns} towns, ${totalBusinesses.toLocaleString()} businesses across 48 states ===`);
