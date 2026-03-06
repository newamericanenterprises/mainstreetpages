import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Michigan municipalities with their counties (83 counties)
const michiganTowns = {
  // Wayne County (Detroit area)
  "Detroit": "Wayne",
  "Dearborn": "Wayne",
  "Livonia": "Wayne",
  "Westland": "Wayne",
  "Canton": "Wayne",
  "Dearborn Heights": "Wayne",
  "Taylor": "Wayne",
  "Redford": "Wayne",
  "Inkster": "Wayne",
  "Romulus": "Wayne",
  "Wyandotte": "Wayne",
  "Lincoln Park": "Wayne",
  "Allen Park": "Wayne",
  "Southgate": "Wayne",
  "Wayne": "Wayne",
  "Garden City": "Wayne",
  "Hamtramck": "Wayne",
  "Highland Park": "Wayne",
  "River Rouge": "Wayne",
  "Ecorse": "Wayne",
  "Grosse Pointe": "Wayne",
  "Grosse Pointe Park": "Wayne",
  "Grosse Pointe Woods": "Wayne",
  "Grosse Pointe Farms": "Wayne",
  "Grosse Pointe Shores": "Wayne",
  "Harper Woods": "Wayne",
  "Melvindale": "Wayne",
  "Riverview": "Wayne",
  "Trenton": "Wayne",
  "Woodhaven": "Wayne",
  "Flat Rock": "Wayne",
  "Rockwood": "Wayne",
  "Gibraltar": "Wayne",
  "Belleville": "Wayne",
  "Van Buren": "Wayne",
  "Huron": "Wayne",
  "Brownstown": "Wayne",
  "Sumpter": "Wayne",
  "Plymouth": "Wayne",
  "Northville": "Wayne",

  // Oakland County
  "Troy": "Oakland",
  "Warren": "Oakland",
  "Sterling Heights": "Oakland",
  "Farmington Hills": "Oakland",
  "Southfield": "Oakland",
  "Royal Oak": "Oakland",
  "Pontiac": "Oakland",
  "Rochester Hills": "Oakland",
  "Novi": "Oakland",
  "West Bloomfield": "Oakland",
  "Bloomfield": "Oakland",
  "Bloomfield Hills": "Oakland",
  "Birmingham": "Oakland",
  "Auburn Hills": "Oakland",
  "Oak Park": "Oakland",
  "Madison Heights": "Oakland",
  "Ferndale": "Oakland",
  "Hazel Park": "Oakland",
  "Berkley": "Oakland",
  "Clawson": "Oakland",
  "Huntington Woods": "Oakland",
  "Pleasant Ridge": "Oakland",
  "Lathrup Village": "Oakland",
  "Beverly Hills": "Oakland",
  "Bingham Farms": "Oakland",
  "Franklin": "Oakland",
  "Orchard Lake Village": "Oakland",
  "Keego Harbor": "Oakland",
  "Sylvan Lake": "Oakland",
  "Walled Lake": "Oakland",
  "Wixom": "Oakland",
  "Commerce": "Oakland",
  "Milford": "Oakland",
  "South Lyon": "Oakland",
  "Lyon": "Oakland",
  "Novi Township": "Oakland",
  "Highland": "Oakland",
  "White Lake": "Oakland",
  "Waterford": "Oakland",
  "Clarkston": "Oakland",
  "Independence": "Oakland",
  "Orion": "Oakland",
  "Lake Orion": "Oakland",
  "Oxford": "Oakland",
  "Addison": "Oakland",
  "Rochester": "Oakland",
  "Oakland": "Oakland",
  "Brandon": "Oakland",
  "Holly": "Oakland",
  "Rose": "Oakland",
  "Springfield": "Oakland",
  "Groveland": "Oakland",

  // Macomb County
  "Warren": "Macomb",
  "Sterling Heights": "Macomb",
  "Clinton Township": "Macomb",
  "Shelby Township": "Macomb",
  "Macomb Township": "Macomb",
  "Chesterfield": "Macomb",
  "Harrison Township": "Macomb",
  "St. Clair Shores": "Macomb",
  "Roseville": "Macomb",
  "Eastpointe": "Macomb",
  "Mount Clemens": "Macomb",
  "Fraser": "Macomb",
  "Center Line": "Macomb",
  "Richmond": "Macomb",
  "New Baltimore": "Macomb",
  "New Haven": "Macomb",
  "Ray": "Macomb",
  "Lenox": "Macomb",
  "Bruce": "Macomb",
  "Armada": "Macomb",
  "Romeo": "Macomb",
  "Washington": "Macomb",
  "Utica": "Macomb",
  "Memphis": "Macomb",

  // Washtenaw County (Ann Arbor area)
  "Ann Arbor": "Washtenaw",
  "Ypsilanti": "Washtenaw",
  "Saline": "Washtenaw",
  "Dexter": "Washtenaw",
  "Chelsea": "Washtenaw",
  "Milan": "Washtenaw",
  "Manchester": "Washtenaw",
  "Whitmore Lake": "Washtenaw",
  "Pittsfield": "Washtenaw",
  "Scio": "Washtenaw",
  "Superior": "Washtenaw",
  "Ypsilanti Township": "Washtenaw",
  "Ann Arbor Township": "Washtenaw",
  "Northfield": "Washtenaw",
  "Webster": "Washtenaw",
  "Salem": "Washtenaw",
  "Augusta": "Washtenaw",
  "York": "Washtenaw",
  "Lodi": "Washtenaw",
  "Freedom": "Washtenaw",
  "Lima": "Washtenaw",
  "Sylvan": "Washtenaw",
  "Lyndon": "Washtenaw",
  "Sharon": "Washtenaw",
  "Bridgewater": "Washtenaw",

  // Kent County (Grand Rapids area)
  "Grand Rapids": "Kent",
  "Wyoming": "Kent",
  "Kentwood": "Kent",
  "Walker": "Kent",
  "Grandville": "Kent",
  "East Grand Rapids": "Kent",
  "Rockford": "Kent",
  "Lowell": "Kent",
  "Sparta": "Kent",
  "Cedar Springs": "Kent",
  "Byron Center": "Kent",
  "Caledonia": "Kent",
  "Alto": "Kent",
  "Cascade": "Kent",
  "Ada": "Kent",
  "Cannon": "Kent",
  "Plainfield": "Kent",
  "Alpine": "Kent",
  "Vergennes": "Kent",
  "Gaines": "Kent",
  "Paris": "Kent",

  // Genesee County (Flint area)
  "Flint": "Genesee",
  "Grand Blanc": "Genesee",
  "Burton": "Genesee",
  "Flushing": "Genesee",
  "Davison": "Genesee",
  "Swartz Creek": "Genesee",
  "Clio": "Genesee",
  "Mt. Morris": "Genesee",
  "Fenton": "Genesee",
  "Linden": "Genesee",
  "Montrose": "Genesee",
  "Goodrich": "Genesee",
  "Otisville": "Genesee",
  "Gaines": "Genesee",
  "Argentine": "Genesee",

  // Ingham County (Lansing area)
  "Lansing": "Ingham",
  "East Lansing": "Ingham",
  "Meridian": "Ingham",
  "Okemos": "Ingham",
  "Haslett": "Ingham",
  "Holt": "Ingham",
  "Mason": "Ingham",
  "Williamston": "Ingham",
  "Webberville": "Ingham",
  "Leslie": "Ingham",
  "Dansville": "Ingham",
  "Stockbridge": "Ingham",

  // Kalamazoo County
  "Kalamazoo": "Kalamazoo",
  "Portage": "Kalamazoo",
  "Oshtemo": "Kalamazoo",
  "Texas": "Kalamazoo",
  "Parchment": "Kalamazoo",
  "Vicksburg": "Kalamazoo",
  "Schoolcraft": "Kalamazoo",
  "Richland": "Kalamazoo",
  "Galesburg": "Kalamazoo",
  "Climax": "Kalamazoo",
  "Augusta": "Kalamazoo",
  "Comstock": "Kalamazoo",
  "Pavilion": "Kalamazoo",
  "Cooper": "Kalamazoo",
  "Alamo": "Kalamazoo",

  // Ottawa County
  "Holland": "Ottawa",
  "Grand Haven": "Ottawa",
  "Zeeland": "Ottawa",
  "Hudsonville": "Ottawa",
  "Georgetown": "Ottawa",
  "Jenison": "Ottawa",
  "Spring Lake": "Ottawa",
  "Ferrysburg": "Ottawa",
  "Coopersville": "Ottawa",
  "Allendale": "Ottawa",
  "Port Sheldon": "Ottawa",
  "Park": "Ottawa",
  "Olive": "Ottawa",
  "Blendon": "Ottawa",
  "Robinson": "Ottawa",
  "Tallmadge": "Ottawa",
  "Wright": "Ottawa",
  "Chester": "Ottawa",
  "Polkton": "Ottawa",

  // Muskegon County
  "Muskegon": "Muskegon",
  "Muskegon Heights": "Muskegon",
  "Norton Shores": "Muskegon",
  "Roosevelt Park": "Muskegon",
  "North Muskegon": "Muskegon",
  "Whitehall": "Muskegon",
  "Montague": "Muskegon",
  "Ravenna": "Muskegon",
  "Fruitport": "Muskegon",
  "Lakewood Club": "Muskegon",
  "Wolf Lake": "Muskegon",

  // Saginaw County
  "Saginaw": "Saginaw",
  "Saginaw Township North": "Saginaw",
  "Saginaw Township South": "Saginaw",
  "Bridgeport": "Saginaw",
  "Buena Vista": "Saginaw",
  "Carrollton": "Saginaw",
  "Frankenmuth": "Saginaw",
  "Birch Run": "Saginaw",
  "Chesaning": "Saginaw",
  "St. Charles": "Saginaw",
  "Hemlock": "Saginaw",
  "Merrill": "Saginaw",
  "Freeland": "Saginaw",

  // Bay County
  "Bay City": "Bay",
  "Essexville": "Bay",
  "Pinconning": "Bay",
  "Auburn": "Bay",
  "Kawkawlin": "Bay",
  "Hampton": "Bay",
  "Bangor": "Bay",
  "Monitor": "Bay",

  // Midland County
  "Midland": "Midland",
  "Coleman": "Midland",
  "Sanford": "Midland",

  // Jackson County
  "Jackson": "Jackson",
  "Summit": "Jackson",
  "Napoleon": "Jackson",
  "Parma": "Jackson",
  "Spring Arbor": "Jackson",
  "Grass Lake": "Jackson",
  "Brooklyn": "Jackson",
  "Concord": "Jackson",
  "Springport": "Jackson",
  "Hanover": "Jackson",
  "Homer": "Jackson",
  "Albion": "Jackson",

  // Calhoun County (Battle Creek area)
  "Battle Creek": "Calhoun",
  "Marshall": "Calhoun",
  "Albion": "Calhoun",
  "Springfield": "Calhoun",
  "Bedford": "Calhoun",
  "Emmett": "Calhoun",
  "Pennfield": "Calhoun",
  "Athens": "Calhoun",
  "Burlington": "Calhoun",
  "Homer": "Calhoun",
  "Tekonsha": "Calhoun",

  // Berrien County
  "St. Joseph": "Berrien",
  "Benton Harbor": "Berrien",
  "Niles": "Berrien",
  "Buchanan": "Berrien",
  "Bridgman": "Berrien",
  "Stevensville": "Berrien",
  "Coloma": "Berrien",
  "Watervliet": "Berrien",
  "Berrien Springs": "Berrien",
  "Eau Claire": "Berrien",
  "New Buffalo": "Berrien",
  "Three Oaks": "Berrien",

  // Cass County
  "Dowagiac": "Cass",
  "Cassopolis": "Cass",
  "Edwardsburg": "Cass",
  "Marcellus": "Cass",
  "Vandalia": "Cass",

  // St. Joseph County
  "Sturgis": "St. Joseph",
  "Three Rivers": "St. Joseph",
  "Centreville": "St. Joseph",
  "Constantine": "St. Joseph",
  "White Pigeon": "St. Joseph",
  "Mendon": "St. Joseph",
  "Colon": "St. Joseph",
  "Burr Oak": "St. Joseph",

  // Branch County
  "Coldwater": "Branch",
  "Bronson": "Branch",
  "Quincy": "Branch",
  "Union City": "Branch",
  "Sherwood": "Branch",

  // Hillsdale County
  "Hillsdale": "Hillsdale",
  "Jonesville": "Hillsdale",
  "Litchfield": "Hillsdale",
  "Reading": "Hillsdale",
  "Camden": "Hillsdale",
  "Waldron": "Hillsdale",

  // Lenawee County
  "Adrian": "Lenawee",
  "Tecumseh": "Lenawee",
  "Blissfield": "Lenawee",
  "Clinton": "Lenawee",
  "Hudson": "Lenawee",
  "Morenci": "Lenawee",
  "Onsted": "Lenawee",
  "Addison": "Lenawee",
  "Britton": "Lenawee",
  "Deerfield": "Lenawee",

  // Monroe County
  "Monroe": "Monroe",
  "Temperance": "Monroe",
  "Dundee": "Monroe",
  "Ida": "Monroe",
  "Luna Pier": "Monroe",
  "Carleton": "Monroe",
  "Maybee": "Monroe",
  "Petersburg": "Monroe",
  "Lambertville": "Monroe",
  "Erie": "Monroe",
  "South Rockwood": "Monroe",

  // Livingston County
  "Brighton": "Livingston",
  "Howell": "Livingston",
  "Fowlerville": "Livingston",
  "Pinckney": "Livingston",
  "Hartland": "Livingston",
  "Hamburg": "Livingston",
  "Green Oak": "Livingston",
  "Genoa": "Livingston",
  "Brighton Township": "Livingston",
  "Oceola": "Livingston",
  "Tyrone": "Livingston",
  "Unadilla": "Livingston",
  "Putnam": "Livingston",
  "Marion": "Livingston",
  "Cohoctah": "Livingston",
  "Conway": "Livingston",
  "Handy": "Livingston",
  "Howell Township": "Livingston",
  "Iosco": "Livingston",

  // Shiawassee County
  "Owosso": "Shiawassee",
  "Durand": "Shiawassee",
  "Corunna": "Shiawassee",
  "Perry": "Shiawassee",
  "Laingsburg": "Shiawassee",
  "Byron": "Shiawassee",
  "Morrice": "Shiawassee",
  "Bancroft": "Shiawassee",
  "Vernon": "Shiawassee",

  // Clinton County
  "St. Johns": "Clinton",
  "DeWitt": "Clinton",
  "Grand Ledge": "Clinton",
  "Fowler": "Clinton",
  "Ovid": "Clinton",
  "Elsie": "Clinton",
  "Westphalia": "Clinton",
  "Bath": "Clinton",

  // Eaton County
  "Charlotte": "Eaton",
  "Grand Ledge": "Eaton",
  "Eaton Rapids": "Eaton",
  "Olivet": "Eaton",
  "Potterville": "Eaton",
  "Dimondale": "Eaton",
  "Vermontville": "Eaton",
  "Sunfield": "Eaton",
  "Bellevue": "Eaton",

  // Barry County
  "Hastings": "Barry",
  "Nashville": "Barry",
  "Middleville": "Barry",
  "Delton": "Barry",
  "Freeport": "Barry",
  "Woodland": "Barry",

  // Ionia County
  "Ionia": "Ionia",
  "Portland": "Ionia",
  "Belding": "Ionia",
  "Lake Odessa": "Ionia",
  "Saranac": "Ionia",
  "Clarksville": "Ionia",
  "Lyons": "Ionia",
  "Muir": "Ionia",
  "Pewamo": "Ionia",
  "Hubbardston": "Ionia",

  // Montcalm County
  "Greenville": "Montcalm",
  "Stanton": "Montcalm",
  "Howard City": "Montcalm",
  "Lakeview": "Montcalm",
  "Carson City": "Montcalm",
  "Edmore": "Montcalm",
  "Sheridan": "Montcalm",
  "McBride": "Montcalm",
  "Vestaburg": "Montcalm",
  "Coral": "Montcalm",

  // Allegan County
  "Allegan": "Allegan",
  "Holland": "Allegan",
  "Otsego": "Allegan",
  "Plainwell": "Allegan",
  "Wayland": "Allegan",
  "Fennville": "Allegan",
  "Saugatuck": "Allegan",
  "Douglas": "Allegan",
  "Hopkins": "Allegan",
  "Martin": "Allegan",

  // Van Buren County
  "South Haven": "Van Buren",
  "Paw Paw": "Van Buren",
  "Hartford": "Van Buren",
  "Bangor": "Van Buren",
  "Lawrence": "Van Buren",
  "Decatur": "Van Buren",
  "Gobles": "Van Buren",
  "Mattawan": "Van Buren",
  "Covert": "Van Buren",
  "Bloomingdale": "Van Buren",

  // St. Clair County
  "Port Huron": "St. Clair",
  "Marysville": "St. Clair",
  "Fort Gratiot": "St. Clair",
  "St. Clair": "St. Clair",
  "Marine City": "St. Clair",
  "Algonac": "St. Clair",
  "Yale": "St. Clair",
  "Capac": "St. Clair",
  "Emmett": "St. Clair",
  "Jeddo": "St. Clair",
  "Lexington": "St. Clair",
  "Croswell": "St. Clair",
  "Smiths Creek": "St. Clair",

  // Lapeer County
  "Lapeer": "Lapeer",
  "Imlay City": "Lapeer",
  "North Branch": "Lapeer",
  "Almont": "Lapeer",
  "Metamora": "Lapeer",
  "Dryden": "Lapeer",
  "Columbiaville": "Lapeer",
  "Clifford": "Lapeer",

  // Sanilac County
  "Sandusky": "Sanilac",
  "Marlette": "Sanilac",
  "Croswell": "Sanilac",
  "Lexington": "Sanilac",
  "Deckerville": "Sanilac",
  "Carsonville": "Sanilac",
  "Peck": "Sanilac",
  "Brown City": "Sanilac",
  "Port Sanilac": "Sanilac",

  // Huron County
  "Bad Axe": "Huron",
  "Harbor Beach": "Huron",
  "Caseville": "Huron",
  "Sebewaing": "Huron",
  "Pigeon": "Huron",
  "Elkton": "Huron",
  "Port Austin": "Huron",
  "Ubly": "Huron",

  // Tuscola County
  "Caro": "Tuscola",
  "Vassar": "Tuscola",
  "Cass City": "Tuscola",
  "Millington": "Tuscola",
  "Fairgrove": "Tuscola",
  "Reese": "Tuscola",
  "Mayville": "Tuscola",
  "Unionville": "Tuscola",
  "Kingston": "Tuscola",
  "Gagetown": "Tuscola",

  // Gratiot County
  "Alma": "Gratiot",
  "St. Louis": "Gratiot",
  "Ithaca": "Gratiot",
  "Breckenridge": "Gratiot",
  "Ashley": "Gratiot",
  "Riverdale": "Gratiot",
  "Middleton": "Gratiot",
  "Perrinton": "Gratiot",

  // Isabella County
  "Mount Pleasant": "Isabella",
  "Shepherd": "Isabella",
  "Rosebush": "Isabella",
  "Weidman": "Isabella",
  "Clare": "Isabella",

  // Clare County
  "Clare": "Clare",
  "Harrison": "Clare",
  "Farwell": "Clare",

  // Mecosta County
  "Big Rapids": "Mecosta",
  "Reed City": "Mecosta",
  "Morley": "Mecosta",
  "Stanwood": "Mecosta",
  "Paris": "Mecosta",
  "Barryton": "Mecosta",

  // Osceola County
  "Evart": "Osceola",
  "Reed City": "Osceola",
  "Hersey": "Osceola",
  "Marion": "Osceola",
  "Tustin": "Osceola",
  "LeRoy": "Osceola",

  // Newaygo County
  "Newaygo": "Newaygo",
  "Fremont": "Newaygo",
  "White Cloud": "Newaygo",
  "Grant": "Newaygo",
  "Hesperia": "Newaygo",

  // Oceana County
  "Hart": "Oceana",
  "Shelby": "Oceana",
  "Pentwater": "Oceana",
  "New Era": "Oceana",
  "Walkerville": "Oceana",
  "Rothbury": "Oceana",

  // Mason County
  "Ludington": "Mason",
  "Scottville": "Mason",
  "Freesoil": "Mason",
  "Custer": "Mason",
  "Fountain": "Mason",

  // Lake County
  "Baldwin": "Lake",
  "Luther": "Lake",
  "Chase": "Lake",
  "Idlewild": "Lake",

  // Wexford County
  "Cadillac": "Wexford",
  "Manton": "Wexford",
  "Mesick": "Wexford",
  "Buckley": "Wexford",

  // Missaukee County
  "Lake City": "Missaukee",
  "McBain": "Missaukee",
  "Falmouth": "Missaukee",

  // Roscommon County
  "Roscommon": "Roscommon",
  "Houghton Lake": "Roscommon",
  "Prudenville": "Roscommon",
  "St. Helen": "Roscommon",

  // Ogemaw County
  "West Branch": "Ogemaw",
  "Rose City": "Ogemaw",
  "Skidway Lake": "Ogemaw",
  "Prescott": "Ogemaw",

  // Gladwin County
  "Gladwin": "Gladwin",
  "Beaverton": "Gladwin",

  // Arenac County
  "Standish": "Arenac",
  "Omer": "Arenac",
  "Sterling": "Arenac",
  "Au Gres": "Arenac",
  "Twining": "Arenac",

  // Iosco County
  "Tawas City": "Iosco",
  "East Tawas": "Iosco",
  "Oscoda": "Iosco",
  "Whittemore": "Iosco",
  "Hale": "Iosco",

  // Alcona County
  "Harrisville": "Alcona",
  "Lincoln": "Alcona",
  "Black River": "Alcona",

  // Alpena County
  "Alpena": "Alpena",
  "Ossineke": "Alpena",

  // Montmorency County
  "Atlanta": "Montmorency",
  "Hillman": "Montmorency",
  "Lewiston": "Montmorency",

  // Oscoda County
  "Mio": "Oscoda",
  "Fairview": "Oscoda",
  "Comins": "Oscoda",
  "McKinley": "Oscoda",

  // Crawford County
  "Grayling": "Crawford",
  "Frederic": "Crawford",

  // Kalkaska County
  "Kalkaska": "Kalkaska",
  "South Boardman": "Kalkaska",
  "Rapid City": "Kalkaska",
  "Fife Lake": "Kalkaska",

  // Grand Traverse County
  "Traverse City": "Grand Traverse",
  "Kingsley": "Grand Traverse",
  "Fife Lake": "Grand Traverse",
  "Grawn": "Grand Traverse",
  "Interlochen": "Grand Traverse",
  "Williamsburg": "Grand Traverse",
  "Acme": "Grand Traverse",

  // Leelanau County
  "Suttons Bay": "Leelanau",
  "Leland": "Leelanau",
  "Northport": "Leelanau",
  "Glen Arbor": "Leelanau",
  "Empire": "Leelanau",
  "Cedar": "Leelanau",
  "Lake Leelanau": "Leelanau",
  "Maple City": "Leelanau",

  // Benzie County
  "Frankfort": "Benzie",
  "Beulah": "Benzie",
  "Benzonia": "Benzie",
  "Honor": "Benzie",
  "Elberta": "Benzie",
  "Lake Ann": "Benzie",
  "Thompsonville": "Benzie",

  // Manistee County
  "Manistee": "Manistee",
  "Onekama": "Manistee",
  "Bear Lake": "Manistee",
  "Kaleva": "Manistee",
  "Copemish": "Manistee",
  "Wellston": "Manistee",
  "Brethren": "Manistee",

  // Antrim County
  "Bellaire": "Antrim",
  "Elk Rapids": "Antrim",
  "Mancelona": "Antrim",
  "Central Lake": "Antrim",
  "Ellsworth": "Antrim",
  "Eastport": "Antrim",
  "Torch Lake": "Antrim",
  "Alden": "Antrim",

  // Charlevoix County
  "Charlevoix": "Charlevoix",
  "Boyne City": "Charlevoix",
  "East Jordan": "Charlevoix",
  "Beaver Island": "Charlevoix",
  "Ironton": "Charlevoix",
  "Norwood": "Charlevoix",
  "Bay Shore": "Charlevoix",

  // Emmet County
  "Petoskey": "Emmet",
  "Harbor Springs": "Emmet",
  "Pellston": "Emmet",
  "Alanson": "Emmet",
  "Mackinaw City": "Emmet",
  "Indian River": "Emmet",
  "Levering": "Emmet",
  "Conway": "Emmet",
  "Good Hart": "Emmet",

  // Otsego County
  "Gaylord": "Otsego",
  "Vanderbilt": "Otsego",
  "Johannesburg": "Otsego",
  "Waters": "Otsego",

  // Cheboygan County
  "Cheboygan": "Cheboygan",
  "Indian River": "Cheboygan",
  "Wolverine": "Cheboygan",
  "Topinabee": "Cheboygan",
  "Mullett Lake": "Cheboygan",
  "Tower": "Cheboygan",

  // Presque Isle County
  "Rogers City": "Presque Isle",
  "Onaway": "Presque Isle",
  "Millersburg": "Presque Isle",
  "Posen": "Presque Isle",
  "Hawks": "Presque Isle",

  // Chippewa County
  "Sault Ste. Marie": "Chippewa",
  "Kinross": "Chippewa",
  "Rudyard": "Chippewa",
  "Pickford": "Chippewa",
  "De Tour Village": "Chippewa",
  "Drummond Island": "Chippewa",
  "Brimley": "Chippewa",
  "Dafter": "Chippewa",

  // Mackinac County
  "St. Ignace": "Mackinac",
  "Mackinac Island": "Mackinac",
  "Naubinway": "Mackinac",
  "Engadine": "Mackinac",
  "Cedarville": "Mackinac",
  "Hessel": "Mackinac",
  "Curtis": "Mackinac",

  // Schoolcraft County
  "Manistique": "Schoolcraft",
  "Gulliver": "Schoolcraft",
  "Thompson": "Schoolcraft",
  "Germfask": "Schoolcraft",
  "Seney": "Schoolcraft",

  // Luce County
  "Newberry": "Luce",
  "McMillan": "Luce",

  // Alger County
  "Munising": "Alger",
  "Grand Marais": "Alger",
  "Au Train": "Alger",
  "Chatham": "Alger",
  "Shingleton": "Alger",
  "Rock River": "Alger",

  // Delta County
  "Escanaba": "Delta",
  "Gladstone": "Delta",
  "Rapid River": "Delta",
  "Garden": "Delta",
  "Rock": "Delta",

  // Menominee County
  "Menominee": "Menominee",
  "Stephenson": "Menominee",
  "Powers": "Menominee",
  "Carney": "Menominee",
  "Daggett": "Menominee",
  "Spalding": "Menominee",
  "Wallace": "Menominee",
  "Hermansville": "Menominee",

  // Dickinson County
  "Iron Mountain": "Dickinson",
  "Kingsford": "Dickinson",
  "Norway": "Dickinson",
  "Quinnesec": "Dickinson",
  "Breitung": "Dickinson",
  "Sagola": "Dickinson",
  "Vulcan": "Dickinson",
  "Channing": "Dickinson",
  "Loretto": "Dickinson",

  // Iron County
  "Iron River": "Iron",
  "Crystal Falls": "Iron",
  "Caspian": "Iron",
  "Gaastra": "Iron",
  "Stambaugh": "Iron",

  // Marquette County
  "Marquette": "Marquette",
  "Ishpeming": "Marquette",
  "Negaunee": "Marquette",
  "Gwinn": "Marquette",
  "Harvey": "Marquette",
  "Palmer": "Marquette",
  "Republic": "Marquette",
  "Champion": "Marquette",
  "Big Bay": "Marquette",
  "Little Lake": "Marquette",
  "Skandia": "Marquette",

  // Baraga County
  "Baraga": "Baraga",
  "L'Anse": "Baraga",
  "Covington": "Baraga",
  "Pelkie": "Baraga",
  "Zeba": "Baraga",
  "Assinins": "Baraga",

  // Houghton County
  "Houghton": "Houghton",
  "Hancock": "Houghton",
  "Calumet": "Houghton",
  "Laurium": "Houghton",
  "Lake Linden": "Houghton",
  "Hubbell": "Houghton",
  "Dollar Bay": "Houghton",
  "Chassell": "Houghton",
  "South Range": "Houghton",
  "Atlantic Mine": "Houghton",
  "Painesdale": "Houghton",
  "Trimountain": "Houghton",
  "Dodgeville": "Houghton",

  // Keweenaw County
  "Ahmeek": "Keweenaw",
  "Allouez": "Keweenaw",
  "Copper Harbor": "Keweenaw",
  "Eagle Harbor": "Keweenaw",
  "Eagle River": "Keweenaw",
  "Mohawk": "Keweenaw",
  "Phoenix": "Keweenaw",

  // Ontonagon County
  "Ontonagon": "Ontonagon",
  "White Pine": "Ontonagon",
  "Greenland": "Ontonagon",
  "Mass City": "Ontonagon",
  "Rockland": "Ontonagon",

  // Gogebic County
  "Ironwood": "Gogebic",
  "Bessemer": "Gogebic",
  "Wakefield": "Gogebic",
  "Marenisco": "Gogebic",
  "Watersmeet": "Gogebic"
};

// Population estimates for Michigan cities
const populations = {
  "Detroit": 639111,
  "Grand Rapids": 198829,
  "Warren": 139387,
  "Sterling Heights": 134346,
  "Ann Arbor": 123851,
  "Lansing": 118210,
  "Flint": 95943,
  "Dearborn": 108420,
  "Livonia": 93997,
  "Troy": 87294,
  "Westland": 81747,
  "Farmington Hills": 82958,
  "Kalamazoo": 73598,
  "Wyoming": 76804,
  "Southfield": 72498,
  "Rochester Hills": 76501,
  "Taylor": 61361,
  "Pontiac": 61606,
  "St. Clair Shores": 59379,
  "Royal Oak": 59256,
  "Novi": 60490,
  "Dearborn Heights": 55630,
  "Battle Creek": 51366,
  "Saginaw": 44202,
  "Kentwood": 52282,
  "East Lansing": 48437,
  "Roseville": 47427,
  "Portage": 49178,
  "Midland": 42181,
  "Lincoln Park": 36523,
  "Muskegon": 36570,
  "Holland": 33583,
  "Bay City": 32144,
  "Jackson": 31309,
  "Port Huron": 29447,
  "Grand Haven": 11168,
  "Mount Pleasant": 25946,
  "Traverse City": 15678,
  "Alpena": 10002,
  "Marquette": 20827,
  "Monroe": 19659,
  "Adrian": 20645,
  "Owosso": 14651,
  "Coldwater": 12697,
  "Escanaba": 12309,
  "Petoskey": 5705,
  "Sault Ste. Marie": 13752,
  "Iron Mountain": 7461,
  "Ironwood": 4749,
  "Houghton": 8386,
  "Hancock": 4634,
  "Calumet": 726,
  "Brighton": 7899,
  "Howell": 9489,
  "Fenton": 11756,
  "Grand Blanc": 7864,
  "Clarkston": 893,
  "Lake Orion": 2973,
  "Oxford": 3543,
  "Holly": 6086,
  "Frankenmuth": 5105,
  "Gaylord": 4166,
  "Cadillac": 10355,
  "Ludington": 8076,
  "Big Rapids": 10601,
  "Greenville": 8366,
  "Ionia": 11332,
  "Charlotte": 9098,
  "Hastings": 7350,
  "Allegan": 5117,
  "Marshall": 7088,
  "Albion": 7946,
  "Hillsdale": 8170,
  "Sturgis": 10994,
  "Niles": 11127,
  "St. Joseph": 8365,
  "Benton Harbor": 9723,
  "South Haven": 4294,
  "Dowagiac": 5644,
  "Three Rivers": 7817,
  "Chelsea": 5234,
  "Dexter": 4452,
  "Saline": 9296,
  "Ypsilanti": 21018,
  "Canton": 90173,
  "Plymouth": 9132,
  "Northville": 6119,
  "Clawson": 11825,
  "Ferndale": 20428,
  "Hazel Park": 16405,
  "Madison Heights": 30318,
  "Birmingham": 21457,
  "Bloomfield Hills": 4104,
  "Auburn Hills": 24383,
  "Waterford": 72166,
  "West Bloomfield": 65634,
  "Walker": 24781,
  "Grandville": 16263,
  "Zeeland": 5805
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
  "Boat Sales", "Marina", "Bait Shop", "Hunting Supply"
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

    const prefixes = [townName, county, "Great Lakes", "Michigan", "Wolverine", "Mitten", "Pure Michigan", "Motor City", "Cherry"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, MI`,
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

for (const [townName, county] of Object.entries(michiganTowns)) {
  const slug = generateSlug(townName) + '-mi';
  const population = populations[townName] || Math.floor(Math.random() * 5000) + 500;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Michigan",
    state_abbr: "MI",
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
title: "${townName}, Michigan Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Michigan"
state_abbr: "MI"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Michigan Business Directory"
slug: "mi"
state: "mi"
state_name: "Michigan"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'mi.md'), stateContent);

console.log(`Created Michigan towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
