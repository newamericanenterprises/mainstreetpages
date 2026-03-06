import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minnesota municipalities with their counties (87 counties)
const minnesotaTowns = {
  // Hennepin County (Minneapolis area)
  "Minneapolis": "Hennepin",
  "Bloomington": "Hennepin",
  "Plymouth": "Hennepin",
  "Brooklyn Park": "Hennepin",
  "Maple Grove": "Hennepin",
  "Eden Prairie": "Hennepin",
  "Minnetonka": "Hennepin",
  "Edina": "Hennepin",
  "St. Louis Park": "Hennepin",
  "Hopkins": "Hennepin",
  "Richfield": "Hennepin",
  "Crystal": "Hennepin",
  "Golden Valley": "Hennepin",
  "New Hope": "Hennepin",
  "Robbinsdale": "Hennepin",
  "Brooklyn Center": "Hennepin",
  "Champlin": "Hennepin",
  "Osseo": "Hennepin",
  "Rogers": "Hennepin",
  "Wayzata": "Hennepin",
  "Excelsior": "Hennepin",
  "Shorewood": "Hennepin",
  "Deephaven": "Hennepin",
  "Greenwood": "Hennepin",
  "Orono": "Hennepin",
  "Long Lake": "Hennepin",
  "Medina": "Hennepin",
  "Independence": "Hennepin",
  "Corcoran": "Hennepin",
  "Dayton": "Hennepin",
  "Hassan": "Hennepin",
  "Maple Plain": "Hennepin",
  "Minnetrista": "Hennepin",
  "Mound": "Hennepin",
  "Spring Park": "Hennepin",
  "Tonka Bay": "Hennepin",
  "Woodland": "Hennepin",
  "St. Anthony": "Hennepin",
  "Medicine Lake": "Hennepin",
  "St. Bonifacius": "Hennepin",

  // Ramsey County (St. Paul area)
  "St. Paul": "Ramsey",
  "Roseville": "Ramsey",
  "Maplewood": "Ramsey",
  "Shoreview": "Ramsey",
  "White Bear Lake": "Ramsey",
  "New Brighton": "Ramsey",
  "Vadnais Heights": "Ramsey",
  "Little Canada": "Ramsey",
  "Arden Hills": "Ramsey",
  "Falcon Heights": "Ramsey",
  "Lauderdale": "Ramsey",
  "North St. Paul": "Ramsey",
  "Mounds View": "Ramsey",
  "North Oaks": "Ramsey",
  "Gem Lake": "Ramsey",
  "White Bear Township": "Ramsey",

  // Dakota County
  "Eagan": "Dakota",
  "Burnsville": "Dakota",
  "Apple Valley": "Dakota",
  "Lakeville": "Dakota",
  "Inver Grove Heights": "Dakota",
  "Rosemount": "Dakota",
  "Hastings": "Dakota",
  "Farmington": "Dakota",
  "West St. Paul": "Dakota",
  "South St. Paul": "Dakota",
  "Mendota Heights": "Dakota",
  "Lilydale": "Dakota",
  "Sunfish Lake": "Dakota",
  "Coates": "Dakota",
  "Hampton": "Dakota",
  "New Trier": "Dakota",
  "Randolph": "Dakota",
  "Vermillion": "Dakota",
  "Miesville": "Dakota",
  "Castle Rock": "Dakota",
  "Empire": "Dakota",
  "Eureka": "Dakota",
  "Greenvale": "Dakota",
  "Marshan": "Dakota",
  "Nininger": "Dakota",
  "Ravenna": "Dakota",
  "Sciota": "Dakota",
  "Waterford": "Dakota",

  // Anoka County
  "Blaine": "Anoka",
  "Coon Rapids": "Anoka",
  "Andover": "Anoka",
  "Anoka": "Anoka",
  "Fridley": "Anoka",
  "Columbia Heights": "Anoka",
  "Ham Lake": "Anoka",
  "Ramsey": "Anoka",
  "Lino Lakes": "Anoka",
  "Spring Lake Park": "Anoka",
  "East Bethel": "Anoka",
  "Oak Grove": "Anoka",
  "Nowthen": "Anoka",
  "Circle Pines": "Anoka",
  "Lexington": "Anoka",
  "Centerville": "Anoka",
  "Columbus": "Anoka",
  "Hilltop": "Anoka",
  "Linwood": "Anoka",
  "St. Francis": "Anoka",
  "Bethel": "Anoka",
  "Burns": "Anoka",

  // Washington County
  "Woodbury": "Washington",
  "Cottage Grove": "Washington",
  "Oakdale": "Washington",
  "Stillwater": "Washington",
  "Forest Lake": "Washington",
  "Hugo": "Washington",
  "Lake Elmo": "Washington",
  "Mahtomedi": "Washington",
  "Newport": "Washington",
  "St. Paul Park": "Washington",
  "Afton": "Washington",
  "Bayport": "Washington",
  "Baytown": "Washington",
  "Dellwood": "Washington",
  "Denmark": "Washington",
  "Grant": "Washington",
  "Grey Cloud Island": "Washington",
  "Landfall": "Washington",
  "Marine on St. Croix": "Washington",
  "May": "Washington",
  "New Scandia": "Washington",
  "Oak Park Heights": "Washington",
  "Pine Springs": "Washington",
  "Scandia": "Washington",
  "St. Mary's Point": "Washington",
  "West Lakeland": "Washington",
  "Willernie": "Washington",

  // Scott County
  "Shakopee": "Scott",
  "Prior Lake": "Scott",
  "Savage": "Scott",
  "Jordan": "Scott",
  "Belle Plaine": "Scott",
  "Elko New Market": "Scott",
  "New Prague": "Scott",
  "Credit River": "Scott",
  "Jackson": "Scott",
  "Louisville": "Scott",
  "Sand Creek": "Scott",
  "Spring Lake": "Scott",
  "St. Lawrence": "Scott",

  // Carver County
  "Chanhassen": "Carver",
  "Chaska": "Carver",
  "Victoria": "Carver",
  "Waconia": "Carver",
  "Watertown": "Carver",
  "Carver": "Carver",
  "Cologne": "Carver",
  "Hamburg": "Carver",
  "Mayer": "Carver",
  "New Germany": "Carver",
  "Norwood Young America": "Carver",
  "Benton": "Carver",
  "Camden": "Carver",
  "Dahlgren": "Carver",
  "Hancock": "Carver",
  "Hollywood": "Carver",
  "Laketown": "Carver",
  "San Francisco": "Carver",
  "Waconia Township": "Carver",
  "Watertown Township": "Carver",
  "Young America": "Carver",

  // Wright County
  "St. Michael": "Wright",
  "Buffalo": "Wright",
  "Monticello": "Wright",
  "Otsego": "Wright",
  "Albertville": "Wright",
  "Delano": "Wright",
  "Howard Lake": "Wright",
  "Montrose": "Wright",
  "Waverly": "Wright",
  "Maple Lake": "Wright",
  "Annandale": "Wright",
  "Cokato": "Wright",
  "South Haven": "Wright",
  "Clearwater": "Wright",
  "Rockford": "Wright",
  "Hanover": "Wright",

  // Sherburne County
  "Elk River": "Sherburne",
  "Big Lake": "Sherburne",
  "Zimmerman": "Sherburne",
  "Becker": "Sherburne",
  "Princeton": "Sherburne",
  "Clear Lake": "Sherburne",
  "Santiago": "Sherburne",
  "Orrock": "Sherburne",
  "Palmer": "Sherburne",
  "Livonia": "Sherburne",
  "Haven": "Sherburne",
  "Blue Hill": "Sherburne",
  "Baldwin": "Sherburne",

  // St. Louis County (Duluth area)
  "Duluth": "St. Louis",
  "Hibbing": "St. Louis",
  "Virginia": "St. Louis",
  "Eveleth": "St. Louis",
  "Hermantown": "St. Louis",
  "Cloquet": "St. Louis",
  "Proctor": "St. Louis",
  "Mountain Iron": "St. Louis",
  "Chisholm": "St. Louis",
  "Gilbert": "St. Louis",
  "Biwabik": "St. Louis",
  "Aurora": "St. Louis",
  "Hoyt Lakes": "St. Louis",
  "Tower": "St. Louis",
  "Ely": "St. Louis",
  "Cook": "St. Louis",
  "Babbitt": "St. Louis",
  "Buhl": "St. Louis",
  "Floodwood": "St. Louis",
  "Meadowlands": "St. Louis",
  "Cotton": "St. Louis",
  "Brookston": "St. Louis",
  "Pike": "St. Louis",
  "Kinney": "St. Louis",
  "McKinley": "St. Louis",

  // Olmsted County (Rochester area)
  "Rochester": "Olmsted",
  "Byron": "Olmsted",
  "Stewartville": "Olmsted",
  "Chatfield": "Olmsted",
  "Eyota": "Olmsted",
  "Dover": "Olmsted",
  "Oronoco": "Olmsted",
  "Pine Island": "Olmsted",

  // Blue Earth County (Mankato area)
  "Mankato": "Blue Earth",
  "North Mankato": "Blue Earth",
  "Eagle Lake": "Blue Earth",
  "Lake Crystal": "Blue Earth",
  "Mapleton": "Blue Earth",
  "Amboy": "Blue Earth",
  "Good Thunder": "Blue Earth",
  "Madison Lake": "Blue Earth",
  "Pemberton": "Blue Earth",
  "St. Clair": "Blue Earth",
  "Vernon Center": "Blue Earth",

  // Stearns County (St. Cloud area)
  "St. Cloud": "Stearns",
  "Waite Park": "Stearns",
  "Sartell": "Stearns",
  "Sauk Centre": "Stearns",
  "Cold Spring": "Stearns",
  "St. Joseph": "Stearns",
  "Albany": "Stearns",
  "Melrose": "Stearns",
  "Paynesville": "Stearns",
  "Richmond": "Stearns",
  "Avon": "Stearns",
  "Holdingford": "Stearns",
  "Rockville": "Stearns",
  "St. Augusta": "Stearns",
  "Eden Valley": "Stearns",
  "Kimball": "Stearns",
  "Freeport": "Stearns",
  "Brooten": "Stearns",
  "Belgrade": "Stearns",
  "Greenwald": "Stearns",
  "Lake Henry": "Stearns",
  "Meire Grove": "Stearns",
  "New Munich": "Stearns",
  "Roscoe": "Stearns",
  "Spring Hill": "Stearns",
  "St. Martin": "Stearns",
  "St. Rosa": "Stearns",
  "St. Stephen": "Stearns",
  "St. Wendel": "Stearns",

  // Clay County (Moorhead area)
  "Moorhead": "Clay",
  "Dilworth": "Clay",
  "Hawley": "Clay",
  "Barnesville": "Clay",
  "Glyndon": "Clay",
  "Ulen": "Clay",
  "Felton": "Clay",
  "Hitterdal": "Clay",
  "Sabin": "Clay",
  "Georgetown": "Clay",
  "Comstock": "Clay",
  "Wolverton": "Clay",

  // Otter Tail County
  "Fergus Falls": "Otter Tail",
  "Perham": "Otter Tail",
  "Pelican Rapids": "Otter Tail",
  "Wadena": "Otter Tail",
  "Battle Lake": "Otter Tail",
  "Henning": "Otter Tail",
  "Ottertail": "Otter Tail",
  "New York Mills": "Otter Tail",
  "Parkers Prairie": "Otter Tail",
  "Underwood": "Otter Tail",
  "Vergas": "Otter Tail",
  "Dent": "Otter Tail",
  "Dalton": "Otter Tail",
  "Deer Creek": "Otter Tail",
  "Elizabeth": "Otter Tail",
  "Erhard": "Otter Tail",
  "Clitherall": "Otter Tail",
  "Vining": "Otter Tail",

  // Winona County
  "Winona": "Winona",
  "St. Charles": "Winona",
  "Lewiston": "Winona",
  "Altura": "Winona",
  "Goodview": "Winona",
  "Stockton": "Winona",
  "Minnesota City": "Winona",
  "Utica": "Winona",
  "Rollingstone": "Winona",
  "Dakota": "Winona",
  "Elba": "Winona",

  // Rice County
  "Faribault": "Rice",
  "Northfield": "Rice",
  "Lonsdale": "Rice",
  "Dundas": "Rice",
  "Morristown": "Rice",
  "Nerstrand": "Rice",
  "Warsaw": "Rice",

  // Goodhue County
  "Red Wing": "Goodhue",
  "Cannon Falls": "Goodhue",
  "Zumbrota": "Goodhue",
  "Pine Island": "Goodhue",
  "Kenyon": "Goodhue",
  "Lake City": "Goodhue",
  "Wanamingo": "Goodhue",
  "Goodhue": "Goodhue",
  "Dennison": "Goodhue",
  "Frontenac": "Goodhue",
  "Mazeppa": "Goodhue",
  "Bellechester": "Goodhue",

  // Wabasha County
  "Wabasha": "Wabasha",
  "Lake City": "Wabasha",
  "Plainview": "Wabasha",
  "Mazeppa": "Wabasha",
  "Kellogg": "Wabasha",
  "Millville": "Wabasha",
  "Elgin": "Wabasha",
  "Zumbro Falls": "Wabasha",
  "Hammond": "Wabasha",
  "Theilman": "Wabasha",

  // Steele County
  "Owatonna": "Steele",
  "Medford": "Steele",
  "Blooming Prairie": "Steele",
  "Ellendale": "Steele",

  // Freeborn County
  "Albert Lea": "Freeborn",
  "Glenville": "Freeborn",
  "Alden": "Freeborn",
  "Emmons": "Freeborn",
  "Hartland": "Freeborn",
  "Clarks Grove": "Freeborn",
  "Freeborn": "Freeborn",
  "Geneva": "Freeborn",
  "Hollandale": "Freeborn",
  "Manchester": "Freeborn",
  "Myrtle": "Freeborn",
  "Twin Lakes": "Freeborn",

  // Mower County
  "Austin": "Mower",
  "Adams": "Mower",
  "LeRoy": "Mower",
  "Grand Meadow": "Mower",
  "Lyle": "Mower",
  "Rose Creek": "Mower",
  "Brownsdale": "Mower",
  "Dexter": "Mower",
  "Elkton": "Mower",
  "Mapleview": "Mower",
  "Taopi": "Mower",
  "Waltham": "Mower",

  // Fillmore County
  "Preston": "Fillmore",
  "Chatfield": "Fillmore",
  "Spring Valley": "Fillmore",
  "Lanesboro": "Fillmore",
  "Harmony": "Fillmore",
  "Rushford": "Fillmore",
  "Mabel": "Fillmore",
  "Canton": "Fillmore",
  "Fountain": "Fillmore",
  "Ostrander": "Fillmore",
  "Peterson": "Fillmore",
  "Whalan": "Fillmore",
  "Wykoff": "Fillmore",

  // Houston County
  "Caledonia": "Houston",
  "La Crescent": "Houston",
  "Houston": "Houston",
  "Spring Grove": "Houston",
  "Eitzen": "Houston",
  "Brownsville": "Houston",
  "Hokah": "Houston",

  // Dodge County
  "Kasson": "Dodge",
  "Dodge Center": "Dodge",
  "Mantorville": "Dodge",
  "West Concord": "Dodge",
  "Hayfield": "Dodge",
  "Claremont": "Dodge",

  // Le Sueur County
  "Le Center": "Le Sueur",
  "Le Sueur": "Le Sueur",
  "Montgomery": "Le Sueur",
  "Waterville": "Le Sueur",
  "Cleveland": "Le Sueur",
  "Elysian": "Le Sueur",
  "Heidelberg": "Le Sueur",
  "Kilkenny": "Le Sueur",
  "Kasota": "Le Sueur",
  "New Prague": "Le Sueur",
  "St. Peter": "Le Sueur",

  // Nicollet County
  "St. Peter": "Nicollet",
  "North Mankato": "Nicollet",
  "Nicollet": "Nicollet",
  "Courtland": "Nicollet",
  "Lafayette": "Nicollet",

  // Brown County
  "New Ulm": "Brown",
  "Sleepy Eye": "Brown",
  "Springfield": "Brown",
  "Comfrey": "Brown",
  "Hanska": "Brown",
  "Cobden": "Brown",
  "Essig": "Brown",
  "Evan": "Brown",
  "Klossner": "Brown",
  "Leavenworth": "Brown",
  "Searles": "Brown",

  // Watonwan County
  "St. James": "Watonwan",
  "Madelia": "Watonwan",
  "Butterfield": "Watonwan",
  "Darfur": "Watonwan",
  "La Salle": "Watonwan",
  "Lewisville": "Watonwan",
  "Odin": "Watonwan",

  // Martin County
  "Fairmont": "Martin",
  "Truman": "Martin",
  "Ceylon": "Martin",
  "Trimont": "Martin",
  "Welcome": "Martin",
  "Dunnell": "Martin",
  "Granada": "Martin",
  "Northrop": "Martin",
  "Sherburn": "Martin",

  // Faribault County
  "Blue Earth": "Faribault",
  "Wells": "Faribault",
  "Winnebago": "Faribault",
  "Bricelyn": "Faribault",
  "Delavan": "Faribault",
  "Easton": "Faribault",
  "Elmore": "Faribault",
  "Frost": "Faribault",
  "Kiester": "Faribault",
  "Minnesota Lake": "Faribault",
  "Walters": "Faribault",

  // Waseca County
  "Waseca": "Waseca",
  "Janesville": "Waseca",
  "New Richland": "Waseca",
  "Waldorf": "Waseca",

  // Sibley County
  "Arlington": "Sibley",
  "Gaylord": "Sibley",
  "Winthrop": "Sibley",
  "Henderson": "Sibley",
  "Gibbon": "Sibley",
  "Green Isle": "Sibley",
  "New Auburn": "Sibley",

  // McLeod County
  "Hutchinson": "McLeod",
  "Glencoe": "McLeod",
  "Lester Prairie": "McLeod",
  "Winsted": "McLeod",
  "Silver Lake": "McLeod",
  "Brownton": "McLeod",
  "Stewart": "McLeod",
  "Plato": "McLeod",
  "Biscay": "McLeod",

  // Meeker County
  "Litchfield": "Meeker",
  "Dassel": "Meeker",
  "Grove City": "Meeker",
  "Cosmos": "Meeker",
  "Watkins": "Meeker",
  "Eden Valley": "Meeker",
  "Kingston": "Meeker",
  "Darwin": "Meeker",

  // Kandiyohi County
  "Willmar": "Kandiyohi",
  "Spicer": "Kandiyohi",
  "New London": "Kandiyohi",
  "Atwater": "Kandiyohi",
  "Kandiyohi": "Kandiyohi",
  "Pennock": "Kandiyohi",
  "Raymond": "Kandiyohi",
  "Prinsburg": "Kandiyohi",
  "Blomkest": "Kandiyohi",
  "Lake Lillian": "Kandiyohi",
  "Regal": "Kandiyohi",
  "Sunburg": "Kandiyohi",

  // Renville County
  "Olivia": "Renville",
  "Renville": "Renville",
  "Bird Island": "Renville",
  "Hector": "Renville",
  "Danube": "Renville",
  "Buffalo Lake": "Renville",
  "Fairfax": "Renville",
  "Franklin": "Renville",
  "Morton": "Renville",
  "Sacred Heart": "Renville",

  // Redwood County
  "Redwood Falls": "Redwood",
  "Morgan": "Redwood",
  "Wabasso": "Redwood",
  "Lamberton": "Redwood",
  "Sanborn": "Redwood",
  "Clements": "Redwood",
  "Belview": "Redwood",
  "Delhi": "Redwood",
  "Lucan": "Redwood",
  "Milroy": "Redwood",
  "Revere": "Redwood",
  "Seaforth": "Redwood",
  "Vesta": "Redwood",
  "Walnut Grove": "Redwood",

  // Lyon County
  "Marshall": "Lyon",
  "Tracy": "Lyon",
  "Minneota": "Lyon",
  "Cottonwood": "Lyon",
  "Russell": "Lyon",
  "Ghent": "Lyon",
  "Balaton": "Lyon",
  "Florence": "Lyon",
  "Garvin": "Lyon",
  "Green Valley": "Lyon",
  "Lynd": "Lyon",
  "Taunton": "Lyon",

  // Lincoln County
  "Ivanhoe": "Lincoln",
  "Tyler": "Lincoln",
  "Lake Benton": "Lincoln",
  "Arco": "Lincoln",
  "Hendricks": "Lincoln",

  // Pipestone County
  "Pipestone": "Pipestone",
  "Jasper": "Pipestone",
  "Edgerton": "Pipestone",
  "Ruthton": "Pipestone",
  "Hatfield": "Pipestone",
  "Holland": "Pipestone",
  "Ihlen": "Pipestone",
  "Woodstock": "Pipestone",

  // Murray County
  "Slayton": "Murray",
  "Fulda": "Murray",
  "Lake Wilson": "Murray",
  "Chandler": "Murray",
  "Currie": "Murray",
  "Dovray": "Murray",
  "Hadley": "Murray",
  "Iona": "Murray",

  // Cottonwood County
  "Windom": "Cottonwood",
  "Mountain Lake": "Cottonwood",
  "Westbrook": "Cottonwood",
  "Storden": "Cottonwood",
  "Bingham Lake": "Cottonwood",
  "Jeffers": "Cottonwood",

  // Jackson County
  "Jackson": "Jackson",
  "Lakefield": "Jackson",
  "Heron Lake": "Jackson",
  "Alpha": "Jackson",
  "Okabena": "Jackson",
  "Wilder": "Jackson",

  // Nobles County
  "Worthington": "Nobles",
  "Adrian": "Nobles",
  "Round Lake": "Nobles",
  "Rushmore": "Nobles",
  "Brewster": "Nobles",
  "Dundee": "Nobles",
  "Ellsworth": "Nobles",
  "Lismore": "Nobles",
  "Wilmont": "Nobles",
  "Bigelow": "Nobles",
  "Kinbrae": "Nobles",
  "Reading": "Nobles",

  // Rock County
  "Luverne": "Rock",
  "Hills": "Rock",
  "Beaver Creek": "Rock",
  "Hardwick": "Rock",
  "Jasper": "Rock",
  "Kenneth": "Rock",
  "Magnolia": "Rock",
  "Steen": "Rock",

  // Benton County
  "Sauk Rapids": "Benton",
  "Foley": "Benton",
  "Rice": "Benton",
  "Gilman": "Benton",
  "Royalton": "Benton",

  // Morrison County
  "Little Falls": "Morrison",
  "Pierz": "Morrison",
  "Randall": "Morrison",
  "Bowlus": "Morrison",
  "Buckman": "Morrison",
  "Elmdale": "Morrison",
  "Flensburg": "Morrison",
  "Genola": "Morrison",
  "Harding": "Morrison",
  "Hillman": "Morrison",
  "Lastrup": "Morrison",
  "Motley": "Morrison",
  "Sobieski": "Morrison",
  "Swanville": "Morrison",
  "Upsala": "Morrison",

  // Todd County
  "Long Prairie": "Todd",
  "Staples": "Todd",
  "Browerville": "Todd",
  "Clarissa": "Todd",
  "Eagle Bend": "Todd",
  "Bertha": "Todd",
  "Grey Eagle": "Todd",
  "Hewitt": "Todd",
  "Osakis": "Todd",
  "West Union": "Todd",

  // Crow Wing County
  "Brainerd": "Crow Wing",
  "Baxter": "Crow Wing",
  "Crosby": "Crow Wing",
  "Nisswa": "Crow Wing",
  "Pequot Lakes": "Crow Wing",
  "Breezy Point": "Crow Wing",
  "Crosslake": "Crow Wing",
  "Deerwood": "Crow Wing",
  "Emily": "Crow Wing",
  "Fort Ripley": "Crow Wing",
  "Garrison": "Crow Wing",
  "Ironton": "Crow Wing",
  "Jenkins": "Crow Wing",
  "Riverton": "Crow Wing",
  "Trommald": "Crow Wing",

  // Cass County
  "Walker": "Cass",
  "Pine River": "Cass",
  "Pillager": "Cass",
  "Backus": "Cass",
  "Hackensack": "Cass",
  "Longville": "Cass",
  "Remer": "Cass",
  "Federal Dam": "Cass",
  "Boy River": "Cass",
  "Cass Lake": "Cass",
  "Bena": "Cass",

  // Hubbard County
  "Park Rapids": "Hubbard",
  "Nevis": "Hubbard",
  "Akeley": "Hubbard",
  "Laporte": "Hubbard",
  "Menahga": "Hubbard",

  // Wadena County
  "Wadena": "Wadena",
  "Menahga": "Wadena",
  "Sebeka": "Wadena",
  "Verndale": "Wadena",
  "Aldrich": "Wadena",

  // Becker County
  "Detroit Lakes": "Becker",
  "Frazee": "Becker",
  "Audubon": "Becker",
  "Lake Park": "Becker",
  "Ogema": "Becker",
  "Callaway": "Becker",

  // Douglas County
  "Alexandria": "Douglas",
  "Brandon": "Douglas",
  "Carlos": "Douglas",
  "Evansville": "Douglas",
  "Garfield": "Douglas",
  "Kensington": "Douglas",
  "Millerville": "Douglas",
  "Miltona": "Douglas",
  "Nelson": "Douglas",
  "Osakis": "Douglas",

  // Pope County
  "Glenwood": "Pope",
  "Starbuck": "Pope",
  "Cyrus": "Pope",
  "Long Beach": "Pope",
  "Lowry": "Pope",
  "Sedan": "Pope",
  "Villard": "Pope",
  "Westport": "Pope",

  // Grant County
  "Elbow Lake": "Grant",
  "Herman": "Grant",
  "Ashby": "Grant",
  "Barrett": "Grant",
  "Hoffman": "Grant",
  "Wendell": "Grant",

  // Stevens County
  "Morris": "Stevens",
  "Hancock": "Stevens",
  "Alberta": "Stevens",
  "Chokio": "Stevens",
  "Donnelly": "Stevens",

  // Traverse County
  "Wheaton": "Traverse",
  "Browns Valley": "Traverse",
  "Dumont": "Traverse",
  "Tintah": "Traverse",

  // Big Stone County
  "Ortonville": "Big Stone",
  "Graceville": "Big Stone",
  "Clinton": "Big Stone",
  "Beardsley": "Big Stone",
  "Barry": "Big Stone",
  "Correll": "Big Stone",
  "Johnson": "Big Stone",
  "Odessa": "Big Stone",

  // Swift County
  "Benson": "Swift",
  "Appleton": "Swift",
  "Clontarf": "Swift",
  "Danvers": "Swift",
  "De Graff": "Swift",
  "Holloway": "Swift",
  "Kerkhoven": "Swift",
  "Murdock": "Swift",

  // Lac qui Parle County
  "Madison": "Lac qui Parle",
  "Dawson": "Lac qui Parle",
  "Marietta": "Lac qui Parle",
  "Boyd": "Lac qui Parle",
  "Louisburg": "Lac qui Parle",
  "Bellingham": "Lac qui Parle",
  "Nassau": "Lac qui Parle",

  // Yellow Medicine County
  "Granite Falls": "Yellow Medicine",
  "Canby": "Yellow Medicine",
  "Clarkfield": "Yellow Medicine",
  "Hanley Falls": "Yellow Medicine",
  "Echo": "Yellow Medicine",
  "Porter": "Yellow Medicine",
  "Wood Lake": "Yellow Medicine",

  // Chippewa County
  "Montevideo": "Chippewa",
  "Clara City": "Chippewa",
  "Milan": "Chippewa",
  "Watson": "Chippewa",
  "Maynard": "Chippewa",

  // Isanti County
  "Cambridge": "Isanti",
  "Isanti": "Isanti",
  "Braham": "Isanti",
  "North Branch": "Isanti",
  "Dalbo": "Isanti",
  "Grandy": "Isanti",
  "Spencer Brook": "Isanti",
  "Stanchfield": "Isanti",

  // Chisago County
  "Chisago City": "Chisago",
  "Lindstrom": "Chisago",
  "Center City": "Chisago",
  "North Branch": "Chisago",
  "Rush City": "Chisago",
  "Harris": "Chisago",
  "Stacy": "Chisago",
  "Wyoming": "Chisago",
  "Taylors Falls": "Chisago",
  "Shafer": "Chisago",

  // Pine County
  "Pine City": "Pine",
  "Sandstone": "Pine",
  "Hinckley": "Pine",
  "Finlayson": "Pine",
  "Askov": "Pine",
  "Brook Park": "Pine",
  "Braham": "Pine",
  "Bruno": "Pine",
  "Denham": "Pine",
  "Henriette": "Pine",
  "Kerrick": "Pine",
  "Markville": "Pine",
  "Rutledge": "Pine",
  "Rock Creek": "Pine",
  "Sturgeon Lake": "Pine",
  "Willow River": "Pine",

  // Kanabec County
  "Mora": "Kanabec",
  "Ogilvie": "Kanabec",
  "Grasston": "Kanabec",
  "Quamba": "Kanabec",

  // Mille Lacs County
  "Milaca": "Mille Lacs",
  "Princeton": "Mille Lacs",
  "Onamia": "Mille Lacs",
  "Isle": "Mille Lacs",
  "Pease": "Mille Lacs",
  "Foreston": "Mille Lacs",
  "Bock": "Mille Lacs",

  // Aitkin County
  "Aitkin": "Aitkin",
  "McGregor": "Aitkin",
  "Hill City": "Aitkin",
  "Palisade": "Aitkin",
  "Tamarack": "Aitkin",

  // Carlton County
  "Cloquet": "Carlton",
  "Carlton": "Carlton",
  "Moose Lake": "Carlton",
  "Barnum": "Carlton",
  "Cromwell": "Carlton",
  "Kettle River": "Carlton",
  "Scanlon": "Carlton",
  "Thomson": "Carlton",
  "Wrenshall": "Carlton",
  "Esko": "Carlton",

  // Lake County
  "Two Harbors": "Lake",
  "Silver Bay": "Lake",
  "Beaver Bay": "Lake",
  "Finland": "Lake",

  // Cook County
  "Grand Marais": "Cook",
  "Lutsen": "Cook",
  "Tofte": "Cook",
  "Schroeder": "Cook",
  "Hovland": "Cook",

  // Itasca County
  "Grand Rapids": "Itasca",
  "Coleraine": "Itasca",
  "Bovey": "Itasca",
  "Deer River": "Itasca",
  "Nashwauk": "Itasca",
  "Keewatin": "Itasca",
  "Calumet": "Itasca",
  "Cohasset": "Itasca",
  "Marble": "Itasca",
  "Warba": "Itasca",
  "Bigfork": "Itasca",
  "Taconite": "Itasca",
  "LaPrairie": "Itasca",
  "Squaw Lake": "Itasca",
  "Pengilly": "Itasca",

  // Koochiching County
  "International Falls": "Koochiching",
  "Littlefork": "Koochiching",
  "Big Falls": "Koochiching",
  "Northome": "Koochiching",
  "Ranier": "Koochiching",

  // Beltrami County
  "Bemidji": "Beltrami",
  "Blackduck": "Beltrami",
  "Kelliher": "Beltrami",
  "Tenstrike": "Beltrami",
  "Solway": "Beltrami",
  "Turtle River": "Beltrami",

  // Clearwater County
  "Bagley": "Clearwater",
  "Clearbrook": "Clearwater",
  "Gonvick": "Clearwater",
  "Leonard": "Clearwater",
  "Shevlin": "Clearwater",

  // Mahnomen County
  "Mahnomen": "Mahnomen",
  "Waubun": "Mahnomen",
  "Bejou": "Mahnomen",

  // Norman County
  "Ada": "Norman",
  "Halstad": "Norman",
  "Perley": "Norman",
  "Shelly": "Norman",
  "Twin Valley": "Norman",
  "Gary": "Norman",
  "Hendrum": "Norman",
  "Lockhart": "Norman",

  // Polk County
  "Crookston": "Polk",
  "East Grand Forks": "Polk",
  "Fosston": "Polk",
  "Erskine": "Polk",
  "McIntosh": "Polk",
  "Fertile": "Polk",
  "Climax": "Polk",
  "Fisher": "Polk",
  "Beltrami": "Polk",
  "Mentor": "Polk",
  "Nielsville": "Polk",
  "Winger": "Polk",

  // Red Lake County
  "Red Lake Falls": "Red Lake",
  "Brooks": "Red Lake",
  "Plummer": "Red Lake",
  "Oklee": "Red Lake",

  // Pennington County
  "Thief River Falls": "Pennington",
  "Goodridge": "Pennington",
  "St. Hilaire": "Pennington",

  // Marshall County
  "Warren": "Marshall",
  "Stephen": "Marshall",
  "Argyle": "Marshall",
  "Newfolden": "Marshall",
  "Viking": "Marshall",
  "Middle River": "Marshall",
  "Oslo": "Marshall",
  "Strandquist": "Marshall",

  // Kittson County
  "Hallock": "Kittson",
  "Karlstad": "Kittson",
  "Kennedy": "Kittson",
  "Lake Bronson": "Kittson",
  "Lancaster": "Kittson",
  "Humboldt": "Kittson",
  "Donaldson": "Kittson",
  "St. Vincent": "Kittson",

  // Roseau County
  "Roseau": "Roseau",
  "Warroad": "Roseau",
  "Greenbush": "Roseau",
  "Badger": "Roseau",
  "Strathcona": "Roseau",

  // Lake of the Woods County
  "Baudette": "Lake of the Woods",
  "Williams": "Lake of the Woods",
  "Roosevelt": "Lake of the Woods"
};

// Population estimates for Minnesota cities
const populations = {
  "Minneapolis": 429954,
  "St. Paul": 311527,
  "Rochester": 121395,
  "Duluth": 92104,
  "Bloomington": 89987,
  "Brooklyn Park": 86478,
  "Plymouth": 81026,
  "Maple Grove": 75116,
  "Woodbury": 75102,
  "St. Cloud": 70084,
  "Eagan": 68855,
  "Eden Prairie": 64198,
  "Burnsville": 64317,
  "Coon Rapids": 64317,
  "Blaine": 70222,
  "Lakeville": 69490,
  "Minnetonka": 53781,
  "Apple Valley": 55135,
  "Edina": 53494,
  "St. Louis Park": 49858,
  "Mankato": 44488,
  "Moorhead": 44505,
  "Shakopee": 44092,
  "Maplewood": 41065,
  "Richfield": 36994,
  "Cottage Grove": 37500,
  "Inver Grove Heights": 37416,
  "Roseville": 36698,
  "Andover": 36393,
  "Brooklyn Center": 31326,
  "Savage": 33421,
  "Fridley": 29233,
  "Prior Lake": 28162,
  "Owatonna": 25954,
  "Shoreview": 27156,
  "Chanhassen": 27021,
  "Elk River": 26115,
  "Austin": 25945,
  "Ramsey": 28201,
  "Winona": 26459,
  "White Bear Lake": 25403,
  "Chaska": 27935,
  "Faribault": 23820,
  "Willmar": 20031,
  "Hastings": 22895,
  "Albert Lea": 17902,
  "New Brighton": 22663,
  "Northfield": 20598,
  "Rosemount": 26276,
  "Sartell": 18611,
  "Hibbing": 16157,
  "Virginia": 8410,
  "Fergus Falls": 14055,
  "Red Wing": 16459,
  "Hutchinson": 14178,
  "Marshall": 13680,
  "New Ulm": 13522,
  "Brainerd": 14395,
  "Alexandria": 14042,
  "Bemidji": 15859,
  "Detroit Lakes": 9159,
  "Worthington": 14100,
  "International Falls": 5696,
  "Grand Rapids": 11218,
  "Thief River Falls": 8818,
  "Little Falls": 8777,
  "St. Peter": 12022,
  "Crookston": 7760,
  "Park Rapids": 4225,
  "Pipestone": 4133,
  "Wadena": 4088,
  "Morris": 5286,
  "Montevideo": 5383,
  "Fairmont": 10191,
  "Redwood Falls": 5035,
  "Litchfield": 6726,
  "Glenwood": 2564,
  "Madison": 1551,
  "Benson": 3199,
  "Ortonville": 1916,
  "Wheaton": 1360,
  "Luverne": 4745,
  "Jackson": 3299,
  "Windom": 4646,
  "Blue Earth": 3120,
  "Preston": 1302,
  "Caledonia": 2868,
  "Wabasha": 2521,
  "Mora": 3571,
  "Cambridge": 9244,
  "Pine City": 3167,
  "Two Harbors": 3534,
  "Grand Marais": 1351,
  "Walker": 1069,
  "Aitkin": 2165,
  "Cloquet": 12114,
  "Moose Lake": 2751,
  "Ely": 3460
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
  "Bait Shop", "Boat Sales", "Fishing Guide", "Snowmobile Dealer"
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

    const prefixes = [townName, county, "North Star", "Minnesota", "Land of Lakes", "Twin Cities", "Gopher", "North Country", "Prairie"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, MN`,
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

for (const [townName, county] of Object.entries(minnesotaTowns)) {
  const slug = generateSlug(townName) + '-mn';
  const population = populations[townName] || Math.floor(Math.random() * 3000) + 300;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Minnesota",
    state_abbr: "MN",
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
title: "${townName}, Minnesota Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Minnesota"
state_abbr: "MN"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Minnesota Business Directory"
slug: "mn"
state: "mn"
state_name: "Minnesota"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'mn.md'), stateContent);

console.log(`Created Minnesota towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
