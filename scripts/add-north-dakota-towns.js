import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// North Dakota municipalities with their counties
const northDakotaTowns = {
  // Adams County
  "Hettinger": "Adams",
  "Haynes": "Adams",
  "Reeder": "Adams",
  "Bucyrus": "Adams",

  // Barnes County
  "Valley City": "Barnes",
  "Wimbledon": "Barnes",
  "Rogers": "Barnes",
  "Oriska": "Barnes",
  "Nome": "Barnes",
  "Leal": "Barnes",
  "Kathryn": "Barnes",
  "Fingal": "Barnes",
  "Dazey": "Barnes",
  "Sanborn": "Barnes",
  "Litchville": "Barnes",
  "Sibley": "Barnes",
  "Pillsbury": "Barnes",

  // Benson County
  "Minnewaukan": "Benson",
  "Leeds": "Benson",
  "Maddock": "Benson",
  "Esmond": "Benson",
  "Brinsmade": "Benson",
  "Warwick": "Benson",
  "York": "Benson",
  "Knox": "Benson",
  "Oberon": "Benson",

  // Billings County
  "Medora": "Billings",
  "Fairfield": "Billings",

  // Bottineau County
  "Bottineau": "Bottineau",
  "Westhope": "Bottineau",
  "Souris": "Bottineau",
  "Newburg": "Bottineau",
  "Maxbass": "Bottineau",
  "Kramer": "Bottineau",
  "Landa": "Bottineau",
  "Willow City": "Bottineau",
  "Antler": "Bottineau",
  "Lansford": "Bottineau",

  // Bowman County
  "Bowman": "Bowman",
  "Rhame": "Bowman",
  "Scranton": "Bowman",
  "Gascoyne": "Bowman",
  "Marmarth": "Bowman",

  // Burke County
  "Bowbells": "Burke",
  "Columbus": "Burke",
  "Lignite": "Burke",
  "Portal": "Burke",
  "Powers Lake": "Burke",
  "Flaxton": "Burke",

  // Burleigh County
  "Bismarck": "Burleigh",
  "Lincoln": "Burleigh",
  "Wing": "Burleigh",
  "Wilton": "Burleigh",
  "Regan": "Burleigh",
  "Sterling": "Burleigh",
  "Driscoll": "Burleigh",
  "Menoken": "Burleigh",

  // Cass County
  "Fargo": "Cass",
  "West Fargo": "Cass",
  "Horace": "Cass",
  "Casselton": "Cass",
  "Mapleton": "Cass",
  "Harwood": "Cass",
  "Kindred": "Cass",
  "Hunter": "Cass",
  "Arthur": "Cass",
  "Argusville": "Cass",
  "Amenia": "Cass",
  "Grandin": "Cass",
  "Gardner": "Cass",
  "Absaraka": "Cass",
  "Alice": "Cass",
  "Ayr": "Cass",
  "Buffalo": "Cass",
  "Davenport": "Cass",
  "Embden": "Cass",
  "Erie": "Cass",
  "Leonard": "Cass",
  "Page": "Cass",
  "Tower City": "Cass",
  "Wheatland": "Cass",
  "Oxbow": "Cass",
  "Reile's Acres": "Cass",
  "Briarwood": "Cass",
  "Prairie Rose": "Cass",
  "Frontier": "Cass",
  "North River": "Cass",

  // Cavalier County
  "Langdon": "Cavalier",
  "Milton": "Cavalier",
  "Munich": "Cavalier",
  "Sarles": "Cavalier",
  "Wales": "Cavalier",
  "Hannah": "Cavalier",
  "Nekoma": "Cavalier",
  "Calvin": "Cavalier",
  "Osnabrock": "Cavalier",
  "Alsen": "Cavalier",
  "Loma": "Cavalier",

  // Dickey County
  "Ellendale": "Dickey",
  "Oakes": "Dickey",
  "Ludden": "Dickey",
  "Fullerton": "Dickey",
  "Monango": "Dickey",
  "Forbes": "Dickey",

  // Divide County
  "Crosby": "Divide",
  "Noonan": "Divide",
  "Ambrose": "Divide",
  "Fortuna": "Divide",

  // Dunn County
  "Killdeer": "Dunn",
  "Halliday": "Dunn",
  "Dodge": "Dunn",
  "Dunn Center": "Dunn",
  "Marshall": "Dunn",

  // Eddy County
  "New Rockford": "Eddy",
  "Sheyenne": "Eddy",

  // Emmons County
  "Linton": "Emmons",
  "Strasburg": "Emmons",
  "Hazelton": "Emmons",
  "Braddock": "Emmons",
  "Hague": "Emmons",
  "Pollock": "Emmons",

  // Foster County
  "Carrington": "Foster",
  "Grace City": "Foster",
  "Glenfield": "Foster",
  "McHenry": "Foster",

  // Golden Valley County
  "Beach": "Golden Valley",
  "Sentinel Butte": "Golden Valley",
  "Golva": "Golden Valley",

  // Grand Forks County
  "Grand Forks": "Grand Forks",
  "Larimore": "Grand Forks",
  "Northwood": "Grand Forks",
  "Manvel": "Grand Forks",
  "Thompson": "Grand Forks",
  "Reynolds": "Grand Forks",
  "Emerado": "Grand Forks",
  "Inkster": "Grand Forks",
  "Niagara": "Grand Forks",
  "Arvilla": "Grand Forks",
  "Gilby": "Grand Forks",
  "Mekinock": "Grand Forks",
  "Johnstown": "Grand Forks",
  "Kempton": "Grand Forks",
  "Hatton": "Grand Forks",
  "Forest River": "Grand Forks",

  // Grant County
  "Carson": "Grant",
  "Elgin": "Grant",
  "New Leipzig": "Grant",
  "Leith": "Grant",

  // Griggs County
  "Cooperstown": "Griggs",
  "Hannaford": "Griggs",
  "Binford": "Griggs",
  "Jessie": "Griggs",

  // Hettinger County
  "Mott": "Hettinger",
  "Regent": "Hettinger",
  "New England": "Hettinger",

  // Kidder County
  "Steele": "Kidder",
  "Tappen": "Kidder",
  "Dawson": "Kidder",
  "Pettibone": "Kidder",
  "Tuttle": "Kidder",
  "Robinson": "Kidder",
  "Lake Williams": "Kidder",

  // LaMoure County
  "LaMoure": "LaMoure",
  "Edgeley": "LaMoure",
  "Kulm": "LaMoure",
  "Marion": "LaMoure",
  "Verona": "LaMoure",
  "Jud": "LaMoure",
  "Berlin": "LaMoure",

  // Logan County
  "Napoleon": "Logan",
  "Gackle": "Logan",
  "Lehr": "Logan",
  "Fredonia": "Logan",

  // McHenry County
  "Towner": "McHenry",
  "Velva": "McHenry",
  "Granville": "McHenry",
  "Upham": "McHenry",
  "Bantry": "McHenry",
  "Drake": "McHenry",
  "Anamoose": "McHenry",
  "Balfour": "McHenry",
  "Deering": "McHenry",
  "Bergen": "McHenry",
  "Karlsruhe": "McHenry",

  // McIntosh County
  "Ashley": "McIntosh",
  "Wishek": "McIntosh",
  "Venturia": "McIntosh",
  "Zeeland": "McIntosh",
  "Lehr": "McIntosh",

  // McKenzie County
  "Watford City": "McKenzie",
  "Alexander": "McKenzie",
  "Arnegard": "McKenzie",
  "Cartwright": "McKenzie",

  // McLean County
  "Washburn": "McLean",
  "Garrison": "McLean",
  "Underwood": "McLean",
  "Turtle Lake": "McLean",
  "Coleharbor": "McLean",
  "Max": "McLean",
  "Riverdale": "McLean",
  "Mercer": "McLean",
  "Butte": "McLean",
  "Ruso": "McLean",
  "Benedict": "McLean",

  // Mercer County
  "Beulah": "Mercer",
  "Hazen": "Mercer",
  "Stanton": "Mercer",
  "Pick City": "Mercer",
  "Golden Valley": "Mercer",
  "Zap": "Mercer",

  // Morton County
  "Mandan": "Morton",
  "New Salem": "Morton",
  "Almont": "Morton",
  "Glen Ullin": "Morton",
  "Hebron": "Morton",
  "Flasher": "Morton",
  "Judson": "Morton",
  "St. Anthony": "Morton",

  // Mountrail County
  "Stanley": "Mountrail",
  "Parshall": "Mountrail",
  "New Town": "Mountrail",
  "White Earth": "Mountrail",
  "Ross": "Mountrail",
  "Plaza": "Mountrail",
  "Palermo": "Mountrail",

  // Nelson County
  "Lakota": "Nelson",
  "Michigan": "Nelson",
  "Aneta": "Nelson",
  "McVille": "Nelson",
  "Pekin": "Nelson",
  "Tolna": "Nelson",
  "Petersburg": "Nelson",

  // Oliver County
  "Center": "Oliver",
  "Hannover": "Oliver",

  // Pembina County
  "Cavalier": "Pembina",
  "Drayton": "Pembina",
  "Pembina": "Pembina",
  "Walhalla": "Pembina",
  "St. Thomas": "Pembina",
  "Neche": "Pembina",
  "Hamilton": "Pembina",
  "Mountain": "Pembina",
  "Bathgate": "Pembina",
  "Joliette": "Pembina",
  "Glasston": "Pembina",
  "Hensel": "Pembina",
  "Leroy": "Pembina",
  "Bowesmont": "Pembina",
  "Crystal": "Pembina",

  // Pierce County
  "Rugby": "Pierce",
  "Balta": "Pierce",
  "Wolford": "Pierce",
  "Barton": "Pierce",
  "Orrin": "Pierce",
  "Selz": "Pierce",

  // Ramsey County
  "Devils Lake": "Ramsey",
  "Crary": "Ramsey",
  "Brocket": "Ramsey",
  "Lawton": "Ramsey",
  "Edmore": "Ramsey",
  "Starkweather": "Ramsey",
  "Webster": "Ramsey",

  // Ransom County
  "Lisbon": "Ransom",
  "Fort Ransom": "Ransom",
  "Enderlin": "Ransom",
  "Sheldon": "Ransom",
  "Elliott": "Ransom",
  "Englevale": "Ransom",

  // Renville County
  "Mohall": "Renville",
  "Sherwood": "Renville",
  "Glenburn": "Renville",
  "Tolley": "Renville",
  "Loraine": "Renville",

  // Richland County
  "Wahpeton": "Richland",
  "Hankinson": "Richland",
  "Lidgerwood": "Richland",
  "Wyndmere": "Richland",
  "Fairmount": "Richland",
  "Dwight": "Richland",
  "Barney": "Richland",
  "Colfax": "Richland",
  "Christine": "Richland",
  "Abercrombie": "Richland",
  "Mooreton": "Richland",
  "Mantador": "Richland",
  "Great Bend": "Richland",
  "Walcott": "Richland",

  // Rolette County
  "Rolla": "Rolette",
  "Dunseith": "Rolette",
  "Belcourt": "Rolette",
  "St. John": "Rolette",
  "Mylo": "Rolette",
  "Rolette": "Rolette",
  "Thorne": "Rolette",

  // Sargent County
  "Forman": "Sargent",
  "Milnor": "Sargent",
  "Gwinner": "Sargent",
  "Cogswell": "Sargent",
  "Cayuga": "Sargent",
  "Stirum": "Sargent",
  "Rutland": "Sargent",
  "Havana": "Sargent",

  // Sheridan County
  "McClusky": "Sheridan",
  "Goodrich": "Sheridan",
  "Martin": "Sheridan",
  "Denhoff": "Sheridan",

  // Sioux County
  "Fort Yates": "Sioux",
  "Selfridge": "Sioux",
  "Solen": "Sioux",
  "Cannon Ball": "Sioux",

  // Slope County
  "Amidon": "Slope",
  "Marmarth": "Slope",

  // Stark County
  "Dickinson": "Stark",
  "South Heart": "Stark",
  "Belfield": "Stark",
  "Richardton": "Stark",
  "Taylor": "Stark",
  "Gladstone": "Stark",

  // Steele County
  "Finley": "Steele",
  "Hope": "Steele",
  "Sharon": "Steele",
  "Luverne": "Steele",

  // Stutsman County
  "Jamestown": "Stutsman",
  "Spiritwood Lake": "Stutsman",
  "Medina": "Stutsman",
  "Courtenay": "Stutsman",
  "Montpelier": "Stutsman",
  "Cleveland": "Stutsman",
  "Kensal": "Stutsman",
  "Pingree": "Stutsman",
  "Woodworth": "Stutsman",
  "Streeter": "Stutsman",
  "Windsor": "Stutsman",
  "Buchanan": "Stutsman",
  "Eldridge": "Stutsman",
  "Ypsilanti": "Stutsman",

  // Towner County
  "Cando": "Towner",
  "Rocklake": "Towner",
  "Perth": "Towner",
  "Egeland": "Towner",
  "Bisbee": "Towner",
  "Hansboro": "Towner",
  "Sarles": "Towner",

  // Traill County
  "Mayville": "Traill",
  "Hillsboro": "Traill",
  "Portland": "Traill",
  "Hatton": "Traill",
  "Buxton": "Traill",
  "Galesburg": "Traill",
  "Reynolds": "Traill",
  "Clifford": "Traill",
  "Caledonia": "Traill",
  "Blanchard": "Traill",

  // Walsh County
  "Grafton": "Walsh",
  "Park River": "Walsh",
  "Minto": "Walsh",
  "Hoople": "Walsh",
  "Fordville": "Walsh",
  "Adams": "Walsh",
  "Pisek": "Walsh",
  "Lankin": "Walsh",
  "Warsaw": "Walsh",
  "Edinburg": "Walsh",
  "Forest River": "Walsh",
  "Fairdale": "Walsh",
  "Conway": "Walsh",
  "Auburn": "Walsh",

  // Ward County
  "Minot": "Ward",
  "Burlington": "Ward",
  "Surrey": "Ward",
  "Berthold": "Ward",
  "Kenmare": "Ward",
  "Carpio": "Ward",
  "Des Lacs": "Ward",
  "Donnybrook": "Ward",
  "Makoti": "Ward",
  "Ryder": "Ward",
  "Douglas": "Ward",
  "Sawyer": "Ward",

  // Wells County
  "Harvey": "Wells",
  "Fessenden": "Wells",
  "Hurdsfield": "Wells",
  "Bowdon": "Wells",
  "Hamberg": "Wells",
  "Sykeston": "Wells",
  "Cathay": "Wells",

  // Williams County
  "Williston": "Williams",
  "Tioga": "Williams",
  "Ray": "Williams",
  "Grenora": "Williams",
  "Wildrose": "Williams",
  "Alamo": "Williams",
  "Epping": "Williams",
  "Spring Brook": "Williams"
};

// Population data for North Dakota municipalities
const populations = {
  "Fargo": 125990,
  "Bismarck": 73622,
  "Grand Forks": 59166,
  "Minot": 48377,
  "West Fargo": 38626,
  "Williston": 29379,
  "Dickinson": 25830,
  "Mandan": 23055,
  "Jamestown": 15424,
  "Wahpeton": 7766,
  "Devils Lake": 7322,
  "Valley City": 6585,
  "Watford City": 7302,
  "Grafton": 4284,
  "Minot AFB": 5521,
  "Beulah": 3322,
  "Rugby": 2724,
  "Bottineau": 2161,
  "Harvey": 1783,
  "Lisbon": 2154,
  "Carrington": 2065,
  "Oakes": 1803,
  "Langdon": 1878,
  "Hazen": 2411,
  "Horace": 2706,
  "Casselton": 2329,
  "Lincoln": 3692,
  "Stanley": 2875,
  "New Town": 2992,
  "Larimore": 1355,
  "Hettinger": 1226,
  "Bowman": 1650,
  "Tioga": 2432,
  "Cavalier": 1302,
  "Park River": 1403,
  "Mayville": 1858,
  "Hillsboro": 1603,
  "New Rockford": 1391,
  "Ellendale": 1394,
  "Crosby": 1070,
  "Napoleon": 792,
  "Rolla": 1280,
  "Wahalla": 863,
  "Kenmare": 1096,
  "Garrison": 1453,
  "Washburn": 1244,
  "Beach": 1037,
  "Cooperstown": 984,
  "Lakota": 688,
  "Killdeer": 751,
  "Linton": 1097,
  "Ashley": 772,
  "Steele": 708,
  "LaMoure": 900,
  "Forman": 504,
  "McClusky": 393,
  "Cando": 1115,
  "Fort Yates": 184,
  "Elgin": 642,
  "Carson": 293,
  "Medora": 132,
  "Amidon": 23,
  "Mohall": 783,
  "Center": 571,
  "Mott": 721,
  "New Salem": 946,
  "Glen Ullin": 807,
  "Hebron": 758,
  "Belfield": 888,
  "Richardton": 528,
  "South Heart": 301,
  "Burlington": 1060,
  "Surrey": 1042,
  "Velva": 1084,
  "Towner": 510,
  "Enderlin": 867,
  "Hankinson": 879,
  "Lidgerwood": 627,
  "Wyndmere": 422,
  "Milnor": 645,
  "Gwinner": 706,
  "Kindred": 714,
  "Mapleton": 912,
  "Harwood": 718,
  "Argusville": 403,
  "Hunter": 263,
  "Arthur": 328,
  "Page": 220,
  "Tower City": 249,
  "Finley": 455,
  "Hope": 261,
  "Sharon": 95,
  "Medina": 312,
  "Strasburg": 418,
  "Kulm": 354,
  "Edgeley": 587,
  "Wishek": 993,
  "Zeeland": 93,
  "Parshall": 903,
  "Alexander": 294,
  "Ray": 586,
  "Grenora": 244,
  "Alamo": 64,
  "Fessenden": 476,
  "Drayton": 818,
  "Pembina": 592,
  "Walhalla": 963,
  "St. Thomas": 339,
  "Neche": 380,
  "Minto": 558,
  "Northwood": 942,
  "Thompson": 994,
  "Hatton": 769,
  "Portland": 617,
  "Dunseith": 718,
  "Belcourt": 2868,
  "Edmore": 179,
  "Michigan": 280,
  "Aneta": 228,
  "McVille": 371,
  "Tolna": 171,
  "Petersburg": 184,
  "Leeds": 432,
  "Maddock": 399,
  "Minnewaukan": 223,
  "Esmond": 109,
  "Brinsmade": 37,
  "Warwick": 60,
  "Oberon": 99,
  "York": 23,
  "Knox": 52,
  "Carpio": 132,
  "Des Lacs": 188,
  "Donnybrook": 86,
  "Makoti": 142,
  "Ryder": 86,
  "Douglas": 85,
  "Sawyer": 357,
  "Berthold": 453,
  "Underwood": 778,
  "Turtle Lake": 585,
  "Max": 272,
  "Coleharbor": 59,
  "Riverdale": 204,
  "Mercer": 91,
  "Pick City": 126,
  "Golden Valley": 182,
  "Zap": 214,
  "Stanton": 366,
  "New England": 555,
  "Regent": 158,
  "Scranton": 280,
  "Rhame": 152,
  "Marmarth": 136,
  "Gascoyne": 15,
  "Golva": 63,
  "Sentinel Butte": 56,
  "Flasher": 224,
  "Almont": 117,
  "St. Anthony": 31,
  "Judson": 66,
  "Taylor": 157,
  "Gladstone": 266,
  "Halliday": 178,
  "Dunn Center": 114,
  "Dodge": 87,
  "Marshall": 47,
  "Bowbells": 336,
  "Columbus": 148,
  "Lignite": 155,
  "Portal": 118,
  "Powers Lake": 252,
  "Flaxton": 67,
  "Noonan": 119,
  "Ambrose": 24,
  "Fortuna": 24,
  "Plaza": 153,
  "Palermo": 62,
  "Ross": 97,
  "White Earth": 72,
  "Arnegard": 160,
  "Cartwright": 124,
  "Wildrose": 137,
  "Epping": 101,
  "Spring Brook": 42,
  "Gackle": 310,
  "Lehr": 69,
  "Fredonia": 41,
  "Marion": 139,
  "Verona": 99,
  "Jud": 71,
  "Berlin": 33,
  "Hurdsfield": 79,
  "Bowdon": 132,
  "Hamberg": 11,
  "Sykeston": 100,
  "Cathay": 48,
  "Goodrich": 98,
  "Martin": 76,
  "Denhoff": 54,
  "Wing": 147,
  "Wilton": 728,
  "Regan": 42,
  "Sterling": 168,
  "Driscoll": 90,
  "Menoken": 94,
  "Pettibone": 65,
  "Dawson": 66,
  "Tappen": 199,
  "Tuttle": 70,
  "Robinson": 38,
  "Lake Williams": 25,
  "Courtenay": 45,
  "Montpelier": 88,
  "Cleveland": 82,
  "Kensal": 155,
  "Pingree": 59,
  "Woodworth": 63,
  "Streeter": 170,
  "Windsor": 83,
  "Buchanan": 84,
  "Eldridge": 50,
  "Ypsilanti": 80,
  "Spiritwood Lake": 102,
  "Grace City": 63,
  "Glenfield": 73,
  "McHenry": 51,
  "Hannaford": 162,
  "Binford": 181,
  "Jessie": 20,
  "Wimbledon": 208,
  "Rogers": 55,
  "Oriska": 116,
  "Nome": 62,
  "Leal": 23,
  "Kathryn": 54,
  "Fingal": 94,
  "Dazey": 96,
  "Sanborn": 189,
  "Litchville": 173,
  "Sibley": 35,
  "Pillsbury": 24,
  "Manvel": 365,
  "Emerado": 451,
  "Inkster": 54,
  "Niagara": 52,
  "Arvilla": 94,
  "Gilby": 237,
  "Mekinock": 93,
  "Johnstown": 37,
  "Kempton": 83,
  "Forest River": 113,
  "Reynolds": 295,
  "Buxton": 317,
  "Galesburg": 113,
  "Clifford": 49,
  "Caledonia": 36,
  "Blanchard": 27,
  "Fairmount": 368,
  "Dwight": 88,
  "Barney": 52,
  "Colfax": 91,
  "Christine": 142,
  "Abercrombie": 265,
  "Mooreton": 185,
  "Mantador": 63,
  "Great Bend": 67,
  "Walcott": 229,
  "Hoople": 238,
  "Fordville": 211,
  "Adams": 164,
  "Pisek": 102,
  "Lankin": 103,
  "Warsaw": 93,
  "Edinburg": 198,
  "Fairdale": 38,
  "Conway": 17,
  "Auburn": 26,
  "Milton": 56,
  "Munich": 206,
  "Wales": 30,
  "Hannah": 32,
  "Nekoma": 38,
  "Calvin": 20,
  "Osnabrock": 121,
  "Alsen": 33,
  "Loma": 17,
  "Hamilton": 97,
  "Mountain": 118,
  "Bathgate": 55,
  "Joliette": 25,
  "Glasston": 22,
  "Hensel": 41,
  "Leroy": 16,
  "Bowesmont": 29,
  "Crystal": 141,
  "Balta": 65,
  "Wolford": 37,
  "Barton": 21,
  "Orrin": 16,
  "Selz": 22,
  "Crary": 137,
  "Brocket": 52,
  "Lawton": 30,
  "Starkweather": 118,
  "Webster": 42,
  "Fort Ransom": 79,
  "Sheldon": 97,
  "Elliott": 25,
  "Englevale": 28,
  "Sherwood": 242,
  "Glenburn": 377,
  "Tolley": 23,
  "Loraine": 13,
  "St. John": 349,
  "Mylo": 17,
  "Rolette": 46,
  "Thorne": 8,
  "Cogswell": 99,
  "Cayuga": 49,
  "Stirum": 29,
  "Rutland": 186,
  "Havana": 65,
  "Selfridge": 161,
  "Solen": 86,
  "Cannon Ball": 877,
  "Hazelton": 236,
  "Braddock": 23,
  "Hague": 71,
  "Pollock": 235,
  "Ludden": 25,
  "Fullerton": 51,
  "Monango": 33,
  "Forbes": 51,
  "Sheyenne": 196,
  "Westhope": 426,
  "Souris": 69,
  "Newburg": 100,
  "Maxbass": 84,
  "Kramer": 41,
  "Landa": 31,
  "Willow City": 163,
  "Antler": 26,
  "Lansford": 226,
  "Rocklake": 169,
  "Perth": 13,
  "Egeland": 43,
  "Bisbee": 121,
  "Hansboro": 11,
  "Granville": 256,
  "Upham": 150,
  "Bantry": 16,
  "Drake": 275,
  "Anamoose": 271,
  "Balfour": 24,
  "Deering": 97,
  "Bergen": 11,
  "Karlsruhe": 81,
  "Venturia": 15,
  "New Leipzig": 222,
  "Leith": 18,
  "Luverne": 34,
  "Fairfield": 9,
  "Oxbow": 273,
  "Reile's Acres": 576,
  "Briarwood": 57,
  "Prairie Rose": 512,
  "Frontier": 208,
  "North River": 72,
  "Amenia": 95,
  "Grandin": 178,
  "Gardner": 99,
  "Absaraka": 59,
  "Alice": 50,
  "Ayr": 24,
  "Buffalo": 196,
  "Davenport": 262,
  "Embden": 61,
  "Erie": 88,
  "Leonard": 200,
  "Wheatland": 72
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
  "Oil Field Services", "Grain Elevator", "Farm Equipment", "Storage Facility", "Towing Service",
  "Printing Shop", "Sign Shop", "Tailor", "Wedding Venue", "Event Center",
  "Photography Studio", "Music Store", "Dance Studio", "Martial Arts", "Yoga Studio",
  "Tattoo Parlor", "Pawn Shop", "Check Cashing", "Title Loan", "Tax Service",
  "Employment Agency", "Temp Agency", "Staffing Agency", "Security Company", "Cleaning Service",
  "Moving Company", "Roofing", "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on North Dakota regions
const namePrefixes = [
  "Peace Garden", "North Dakota", "Prairie", "Great Plains", "Roughrider",
  "Dakota", "Northern Plains", "Flickertail", "Red River", "Missouri River",
  "Badlands", "Heartland", "Buffalo", "Pioneer", "Heritage"
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
      address: `${townName}, ND`,
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

for (const [town, county] of Object.entries(northDakotaTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 500;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "North Dakota",
    state_abbr: "ND",
    county: county,
    population: population,
    slug: `${slug}-nd`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-nd.json`),
    JSON.stringify(townData, null, 2)
  );

  // CORRECT FORMAT for content files
  const mdContent = `---
title: "${town}, ND Business Directory"
type: "towns"
slug: "${slug}-nd"
state: "nd"
town_data: "${slug}-nd"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-nd.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "North Dakota Business Directory"
slug: "nd"
state: "nd"
state_name: "North Dakota"
---
`;
fs.writeFileSync(path.join(statesDir, 'nd.md'), stateMd);

console.log(`Created North Dakota towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
