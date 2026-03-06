import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Iowa municipalities with their counties (99 counties)
const iowaTowns = {
  // Polk County (Des Moines area)
  "Des Moines": "Polk",
  "West Des Moines": "Polk",
  "Ankeny": "Polk",
  "Urbandale": "Polk",
  "Johnston": "Polk",
  "Clive": "Polk",
  "Altoona": "Polk",
  "Pleasant Hill": "Polk",
  "Grimes": "Polk",
  "Windsor Heights": "Polk",
  "Polk City": "Polk",
  "Bondurant": "Polk",
  "Mitchellville": "Polk",
  "Runnells": "Polk",

  // Linn County (Cedar Rapids area)
  "Cedar Rapids": "Linn",
  "Marion": "Linn",
  "Hiawatha": "Linn",
  "Robins": "Linn",
  "Mount Vernon": "Linn",
  "Fairfax": "Linn",
  "Ely": "Linn",
  "Lisbon": "Linn",
  "Central City": "Linn",
  "Springville": "Linn",
  "Coggon": "Linn",
  "Prairieburg": "Linn",

  // Scott County (Davenport area)
  "Davenport": "Scott",
  "Bettendorf": "Scott",
  "Eldridge": "Scott",
  "Blue Grass": "Scott",
  "LeClaire": "Scott",
  "Princeton": "Scott",
  "Walcott": "Scott",
  "Long Grove": "Scott",
  "Donahue": "Scott",
  "Buffalo": "Scott",

  // Black Hawk County (Waterloo area)
  "Waterloo": "Black Hawk",
  "Cedar Falls": "Black Hawk",
  "Evansdale": "Black Hawk",
  "Hudson": "Black Hawk",
  "La Porte City": "Black Hawk",
  "Elk Run Heights": "Black Hawk",
  "Dunkerton": "Black Hawk",
  "Raymond": "Black Hawk",
  "Jesup": "Black Hawk",

  // Johnson County (Iowa City area)
  "Iowa City": "Johnson",
  "Coralville": "Johnson",
  "North Liberty": "Johnson",
  "Tiffin": "Johnson",
  "Solon": "Johnson",
  "Oxford": "Johnson",
  "Lone Tree": "Johnson",
  "Hills": "Johnson",
  "Swisher": "Johnson",
  "Shueyville": "Johnson",
  "University Heights": "Johnson",

  // Woodbury County (Sioux City area)
  "Sioux City": "Woodbury",
  "Sergeant Bluff": "Woodbury",
  "Moville": "Woodbury",
  "Salix": "Woodbury",
  "Lawton": "Woodbury",
  "Bronson": "Woodbury",
  "Correctionville": "Woodbury",
  "Anthon": "Woodbury",
  "Sloan": "Woodbury",
  "Hornick": "Woodbury",
  "Smithland": "Woodbury",

  // Dubuque County
  "Dubuque": "Dubuque",
  "Asbury": "Dubuque",
  "Dyersville": "Dubuque",
  "Cascade": "Dubuque",
  "Epworth": "Dubuque",
  "Farley": "Dubuque",
  "Peosta": "Dubuque",
  "New Vienna": "Dubuque",
  "Holy Cross": "Dubuque",
  "Luxemburg": "Dubuque",
  "Balltown": "Dubuque",
  "Sherrill": "Dubuque",

  // Story County (Ames area)
  "Ames": "Story",
  "Nevada": "Story",
  "Huxley": "Story",
  "Story City": "Story",
  "Gilbert": "Story",
  "Slater": "Story",
  "Cambridge": "Story",
  "Maxwell": "Story",
  "Collins": "Story",
  "Roland": "Story",
  "McCallsburg": "Story",
  "Zearing": "Story",
  "Colo": "Story",
  "Kelley": "Story",

  // Pottawattamie County (Council Bluffs area)
  "Council Bluffs": "Pottawattamie",
  "Carter Lake": "Pottawattamie",
  "Oakland": "Pottawattamie",
  "Avoca": "Pottawattamie",
  "Walnut": "Pottawattamie",
  "Minden": "Pottawattamie",
  "Treynor": "Pottawattamie",
  "Macedonia": "Pottawattamie",
  "Neola": "Pottawattamie",
  "Underwood": "Pottawattamie",
  "McClelland": "Pottawattamie",
  "Crescent": "Pottawattamie",
  "Carson": "Pottawattamie",

  // Clinton County
  "Clinton": "Clinton",
  "Camanche": "Clinton",
  "DeWitt": "Clinton",
  "Grand Mound": "Clinton",
  "Goose Lake": "Clinton",
  "Lost Nation": "Clinton",
  "Low Moor": "Clinton",
  "Charlotte": "Clinton",
  "Delmar": "Clinton",
  "Welton": "Clinton",
  "Wheatland": "Clinton",

  // Dallas County
  "Waukee": "Dallas",
  "Perry": "Dallas",
  "Adel": "Dallas",
  "Dallas Center": "Dallas",
  "Redfield": "Dallas",
  "Van Meter": "Dallas",
  "De Soto": "Dallas",
  "Woodward": "Dallas",
  "Dexter": "Dallas",
  "Linden": "Dallas",
  "Minburn": "Dallas",
  "Bouton": "Dallas",
  "Dawson": "Dallas",

  // Warren County
  "Indianola": "Warren",
  "Norwalk": "Warren",
  "Carlisle": "Warren",
  "Hartford": "Warren",
  "Milo": "Warren",
  "Lacona": "Warren",
  "New Virginia": "Warren",
  "Martensdale": "Warren",
  "Saint Marys": "Warren",

  // Marshall County
  "Marshalltown": "Marshall",
  "State Center": "Marshall",
  "Melbourne": "Marshall",
  "Ferguson": "Marshall",
  "Gilman": "Marshall",
  "Albion": "Marshall",
  "Haverhill": "Marshall",
  "Laurel": "Marshall",
  "Clemons": "Marshall",
  "Green Mountain": "Marshall",
  "Liscomb": "Marshall",
  "Le Grand": "Marshall",
  "Rhodes": "Marshall",

  // Jasper County
  "Newton": "Jasper",
  "Colfax": "Jasper",
  "Monroe": "Jasper",
  "Prairie City": "Jasper",
  "Baxter": "Jasper",
  "Mingo": "Jasper",
  "Sully": "Jasper",
  "Kellogg": "Jasper",
  "Lynnville": "Jasper",
  "Reasnor": "Jasper",

  // Cerro Gordo County (Mason City area)
  "Mason City": "Cerro Gordo",
  "Clear Lake": "Cerro Gordo",
  "Ventura": "Cerro Gordo",
  "Rockwell": "Cerro Gordo",
  "Plymouth": "Cerro Gordo",
  "Dougherty": "Cerro Gordo",
  "Thornton": "Cerro Gordo",
  "Meservey": "Cerro Gordo",

  // Webster County (Fort Dodge area)
  "Fort Dodge": "Webster",
  "Badger": "Webster",
  "Dayton": "Webster",
  "Gowrie": "Webster",
  "Lehigh": "Webster",
  "Harcourt": "Webster",
  "Barnum": "Webster",
  "Duncombe": "Webster",
  "Clare": "Webster",
  "Callender": "Webster",
  "Moorland": "Webster",
  "Otho": "Webster",
  "Vincent": "Webster",

  // Wapello County (Ottumwa area)
  "Ottumwa": "Wapello",
  "Eddyville": "Wapello",
  "Eldon": "Wapello",
  "Agency": "Wapello",
  "Chillicothe": "Wapello",
  "Blakesburg": "Wapello",
  "Kirkville": "Wapello",

  // Des Moines County (Burlington area)
  "Burlington": "Des Moines",
  "West Burlington": "Des Moines",
  "Mediapolis": "Des Moines",
  "Danville": "Des Moines",
  "Middletown": "Des Moines",
  "Sperry": "Des Moines",

  // Lee County
  "Fort Madison": "Lee",
  "Keokuk": "Lee",
  "Donnellson": "Lee",
  "West Point": "Lee",
  "Montrose": "Lee",
  "Wever": "Lee",
  "Denmark": "Lee",
  "Franklin": "Lee",
  "Houghton": "Lee",
  "Saint Paul": "Lee",

  // Muscatine County
  "Muscatine": "Muscatine",
  "West Liberty": "Muscatine",
  "Wilton": "Muscatine",
  "Atalissa": "Muscatine",
  "Conesville": "Muscatine",
  "Fruitland": "Muscatine",
  "Nichols": "Muscatine",
  "Stockton": "Muscatine",

  // Boone County
  "Boone": "Boone",
  "Madrid": "Boone",
  "Ogden": "Boone",
  "Beaver": "Boone",
  "Luther": "Boone",
  "Pilot Mound": "Boone",
  "Boxholm": "Boone",
  "Fraser": "Boone",

  // Mahaska County
  "Oskaloosa": "Mahaska",
  "Pella": "Mahaska",
  "New Sharon": "Mahaska",
  "University Park": "Mahaska",
  "Beacon": "Mahaska",
  "Fremont": "Mahaska",
  "Leighton": "Mahaska",
  "Rose Hill": "Mahaska",

  // Marion County
  "Knoxville": "Marion",
  "Pella": "Marion",
  "Pleasantville": "Marion",
  "Melcher-Dallas": "Marion",
  "Harvey": "Marion",
  "Bussey": "Marion",
  "Hamilton": "Marion",
  "Attica": "Marion",
  "Tracy": "Marion",

  // Buchanan County
  "Independence": "Buchanan",
  "Jesup": "Buchanan",
  "Winthrop": "Buchanan",
  "Quasqueton": "Buchanan",
  "Rowley": "Buchanan",
  "Lamont": "Buchanan",
  "Aurora": "Buchanan",
  "Brandon": "Buchanan",
  "Hazleton": "Buchanan",
  "Stanley": "Buchanan",

  // Plymouth County
  "Le Mars": "Plymouth",
  "Kingsley": "Plymouth",
  "Akron": "Plymouth",
  "Remsen": "Plymouth",
  "Hinton": "Plymouth",
  "Merrill": "Plymouth",
  "Craig": "Plymouth",
  "Oyens": "Plymouth",
  "Brunsville": "Plymouth",

  // Sioux County
  "Orange City": "Sioux",
  "Sioux Center": "Sioux",
  "Rock Valley": "Sioux",
  "Hull": "Sioux",
  "Hawarden": "Sioux",
  "Alton": "Sioux",
  "Boyden": "Sioux",
  "Ireton": "Sioux",
  "Maurice": "Sioux",
  "Hospers": "Sioux",
  "Granville": "Sioux",

  // Delaware County
  "Manchester": "Delaware",
  "Dyersville": "Delaware",
  "Delhi": "Delaware",
  "Hopkinton": "Delaware",
  "Earlville": "Delaware",
  "Ryan": "Delaware",
  "Colesburg": "Delaware",

  // Benton County
  "Vinton": "Benton",
  "Belle Plaine": "Benton",
  "Shellsburg": "Benton",
  "Norway": "Benton",
  "Blairstown": "Benton",
  "Van Horne": "Benton",
  "Urbana": "Benton",
  "Garrison": "Benton",
  "Atkins": "Benton",
  "Newhall": "Benton",
  "Luzerne": "Benton",
  "Walford": "Benton",

  // Bremer County
  "Waverly": "Bremer",
  "Tripoli": "Bremer",
  "Denver": "Bremer",
  "Sumner": "Bremer",
  "Readlyn": "Bremer",
  "Plainfield": "Bremer",
  "Janesville": "Bremer",
  "Frederika": "Bremer",

  // Henry County
  "Mount Pleasant": "Henry",
  "New London": "Henry",
  "Winfield": "Henry",
  "Salem": "Henry",
  "Rome": "Henry",
  "Wayland": "Henry",
  "Hillsboro": "Henry",
  "Coppock": "Henry",

  // Washington County
  "Washington": "Washington",
  "Kalona": "Washington",
  "Wellman": "Washington",
  "Riverside": "Washington",
  "Ainsworth": "Washington",
  "Brighton": "Washington",
  "Crawfordsville": "Washington",
  "West Chester": "Washington",

  // Fayette County
  "Oelwein": "Fayette",
  "West Union": "Fayette",
  "Fayette": "Fayette",
  "Clermont": "Fayette",
  "Hawkeye": "Fayette",
  "Elgin": "Fayette",
  "Maynard": "Fayette",
  "Arlington": "Fayette",
  "Randalia": "Fayette",
  "Wadena": "Fayette",

  // Carroll County
  "Carroll": "Carroll",
  "Manning": "Carroll",
  "Coon Rapids": "Carroll",
  "Arcadia": "Carroll",
  "Glidden": "Carroll",
  "Breda": "Carroll",
  "Templeton": "Carroll",
  "Lanesboro": "Carroll",
  "Halbur": "Carroll",

  // Buena Vista County
  "Storm Lake": "Buena Vista",
  "Newell": "Buena Vista",
  "Albert City": "Buena Vista",
  "Alta": "Buena Vista",
  "Linn Grove": "Buena Vista",
  "Rembrandt": "Buena Vista",
  "Marathon": "Buena Vista",
  "Truesdale": "Buena Vista",
  "Lakeside": "Buena Vista",

  // Clay County
  "Spencer": "Clay",
  "Everly": "Clay",
  "Royal": "Clay",
  "Peterson": "Clay",
  "Dickens": "Clay",
  "Rossie": "Clay",
  "Gillett Grove": "Clay",
  "Webb": "Clay",
  "Greenville": "Clay",

  // Crawford County
  "Denison": "Crawford",
  "Schleswig": "Crawford",
  "Charter Oak": "Crawford",
  "Dow City": "Crawford",
  "Vail": "Crawford",
  "Westside": "Crawford",
  "Manilla": "Crawford",
  "Kiron": "Crawford",
  "Ricketts": "Crawford",
  "Arion": "Crawford",
  "Buck Grove": "Crawford",

  // Poweshiek County
  "Grinnell": "Poweshiek",
  "Brooklyn": "Poweshiek",
  "Montezuma": "Poweshiek",
  "Malcom": "Poweshiek",
  "Searsboro": "Poweshiek",
  "Deep River": "Poweshiek",
  "Hartwick": "Poweshiek",

  // Dickinson County
  "Spirit Lake": "Dickinson",
  "Milford": "Dickinson",
  "Arnolds Park": "Dickinson",
  "Lake Park": "Dickinson",
  "Okoboji": "Dickinson",
  "Superior": "Dickinson",
  "Terril": "Dickinson",
  "Orleans": "Dickinson",

  // Winneshiek County
  "Decorah": "Winneshiek",
  "Calmar": "Winneshiek",
  "Ossian": "Winneshiek",
  "Fort Atkinson": "Winneshiek",
  "Ridgeway": "Winneshiek",
  "Spillville": "Winneshiek",
  "Castalia": "Winneshiek",

  // Jefferson County
  "Fairfield": "Jefferson",
  "Batavia": "Jefferson",
  "Libertyville": "Jefferson",
  "Lockridge": "Jefferson",
  "Packwood": "Jefferson",

  // Tama County
  "Tama": "Tama",
  "Toledo": "Tama",
  "Traer": "Tama",
  "Dysart": "Tama",
  "Gladbrook": "Tama",
  "Clutier": "Tama",
  "Chelsea": "Tama",
  "Montour": "Tama",
  "Garwin": "Tama",
  "Lincoln": "Tama",
  "Vining": "Tama",
  "Irving": "Tama",
  "Elberon": "Tama",

  // Emmet County
  "Estherville": "Emmet",
  "Armstrong": "Emmet",
  "Ringsted": "Emmet",
  "Dolliver": "Emmet",
  "Wallingford": "Emmet",
  "Gruver": "Emmet",

  // Hardin County
  "Iowa Falls": "Hardin",
  "Eldora": "Hardin",
  "Ackley": "Hardin",
  "Hubbard": "Hardin",
  "Alden": "Hardin",
  "Radcliffe": "Hardin",
  "Steamboat Rock": "Hardin",
  "Union": "Hardin",
  "New Providence": "Hardin",
  "Owasa": "Hardin",

  // Page County
  "Clarinda": "Page",
  "Shenandoah": "Page",
  "Essex": "Page",
  "Coin": "Page",
  "College Springs": "Page",
  "Blanchard": "Page",
  "Shambaugh": "Page",
  "Braddyville": "Page",
  "Yorktown": "Page",
  "Northboro": "Page",

  // Mills County
  "Glenwood": "Mills",
  "Pacific Junction": "Mills",
  "Malvern": "Mills",
  "Hastings": "Mills",
  "Emerson": "Mills",
  "Silver City": "Mills",
  "Henderson": "Mills",
  "Tabor": "Mills",

  // Fremont County
  "Sidney": "Fremont",
  "Hamburg": "Fremont",
  "Farragut": "Fremont",
  "Thurman": "Fremont",
  "Imogene": "Fremont",
  "Riverton": "Fremont",
  "Randolph": "Fremont",
  "Tabor": "Fremont",

  // Montgomery County
  "Red Oak": "Montgomery",
  "Villisca": "Montgomery",
  "Stanton": "Montgomery",
  "Elliott": "Montgomery",
  "Coburg": "Montgomery",
  "Grant": "Montgomery",

  // Shelby County
  "Harlan": "Shelby",
  "Defiance": "Shelby",
  "Elk Horn": "Shelby",
  "Panama": "Shelby",
  "Kirkman": "Shelby",
  "Irwin": "Shelby",
  "Tennant": "Shelby",
  "Portsmouth": "Shelby",
  "Shelby": "Shelby",

  // Cass County
  "Atlantic": "Cass",
  "Griswold": "Cass",
  "Anita": "Cass",
  "Lewis": "Cass",
  "Marne": "Cass",
  "Massena": "Cass",
  "Cumberland": "Cass",
  "Wiota": "Cass",

  // Madison County
  "Winterset": "Madison",
  "Earlham": "Madison",
  "St. Charles": "Madison",
  "Truro": "Madison",
  "Patterson": "Madison",
  "Macksburg": "Madison",
  "Bevington": "Madison",

  // Union County
  "Creston": "Union",
  "Afton": "Union",
  "Lorimor": "Union",
  "Cromwell": "Union",
  "Shannon City": "Union",
  "Thayer": "Union",
  "Kent": "Union",

  // Clarke County
  "Osceola": "Clarke",
  "Murray": "Clarke",
  "Woodburn": "Clarke",

  // Lucas County
  "Chariton": "Lucas",
  "Derby": "Lucas",
  "Williamson": "Lucas",
  "Lucas": "Lucas",
  "Russell": "Lucas",

  // Wayne County
  "Corydon": "Wayne",
  "Seymour": "Wayne",
  "Allerton": "Wayne",
  "Humeston": "Wayne",
  "Lineville": "Wayne",
  "Promise City": "Wayne",

  // Appanoose County
  "Centerville": "Appanoose",
  "Moravia": "Appanoose",
  "Moulton": "Appanoose",
  "Mystic": "Appanoose",
  "Rathbun": "Appanoose",
  "Numa": "Appanoose",
  "Udell": "Appanoose",
  "Cincinnati": "Appanoose",
  "Unionville": "Appanoose",
  "Plano": "Appanoose",

  // Davis County
  "Bloomfield": "Davis",
  "Drakesville": "Davis",
  "Pulaski": "Davis",
  "Milton": "Davis",
  "Floris": "Davis",

  // Van Buren County
  "Keosauqua": "Van Buren",
  "Cantril": "Van Buren",
  "Milton": "Van Buren",
  "Bonaparte": "Van Buren",
  "Farmington": "Van Buren",
  "Stockport": "Van Buren",
  "Birmingham": "Van Buren",
  "Douds": "Van Buren",

  // Monroe County
  "Albia": "Monroe",
  "Lovilia": "Monroe",
  "Melrose": "Monroe",

  // Louisa County
  "Wapello": "Louisa",
  "Columbus Junction": "Louisa",
  "Morning Sun": "Louisa",
  "Letts": "Louisa",
  "Grandview": "Louisa",
  "Columbus City": "Louisa",

  // Iowa County
  "Marengo": "Iowa",
  "Williamsburg": "Iowa",
  "North English": "Iowa",
  "Victor": "Iowa",
  "Ladora": "Iowa",
  "Parnell": "Iowa",
  "Amana": "Iowa",
  "Middle Amana": "Iowa",
  "South Amana": "Iowa",
  "High Amana": "Iowa",
  "West Amana": "Iowa",
  "Homestead": "Iowa",
  "Conroy": "Iowa",

  // Jones County
  "Anamosa": "Jones",
  "Monticello": "Jones",
  "Wyoming": "Jones",
  "Onslow": "Jones",
  "Oxford Junction": "Jones",
  "Center Junction": "Jones",
  "Langworthy": "Jones",
  "Stone City": "Jones",
  "Cascade": "Jones",
  "Martelle": "Jones",
  "Morley": "Jones",

  // Cedar County
  "Tipton": "Cedar",
  "West Branch": "Cedar",
  "Clarence": "Cedar",
  "Mechanicsville": "Cedar",
  "Durant": "Cedar",
  "Lowden": "Cedar",
  "Stanwood": "Cedar",
  "Bennett": "Cedar",

  // Jackson County
  "Maquoketa": "Jackson",
  "Bellevue": "Jackson",
  "Andrew": "Jackson",
  "Sabula": "Jackson",
  "Preston": "Jackson",
  "Baldwin": "Jackson",
  "Springbrook": "Jackson",
  "Miles": "Jackson",
  "La Motte": "Jackson",
  "Monmouth": "Jackson",

  // Keokuk County
  "Sigourney": "Keokuk",
  "What Cheer": "Keokuk",
  "Keota": "Keokuk",
  "Delta": "Keokuk",
  "Thornburg": "Keokuk",
  "South English": "Keokuk",
  "Ollie": "Keokuk",
  "Harper": "Keokuk",
  "Richland": "Keokuk",
  "Hayesville": "Keokuk",

  // Floyd County
  "Charles City": "Floyd",
  "Nora Springs": "Floyd",
  "Rockford": "Floyd",
  "Rudd": "Floyd",
  "Floyd": "Floyd",
  "Marble Rock": "Floyd",
  "Colwell": "Floyd",

  // Chickasaw County
  "New Hampton": "Chickasaw",
  "Nashua": "Chickasaw",
  "Lawler": "Chickasaw",
  "Fredericksburg": "Chickasaw",
  "Ionia": "Chickasaw",
  "Alta Vista": "Chickasaw",
  "North Washington": "Chickasaw",
  "Bassett": "Chickasaw",

  // Howard County
  "Cresco": "Howard",
  "Lime Springs": "Howard",
  "Elma": "Howard",
  "Riceville": "Howard",
  "Chester": "Howard",
  "Protivin": "Howard",

  // Mitchell County
  "Osage": "Mitchell",
  "St. Ansgar": "Mitchell",
  "Stacyville": "Mitchell",
  "McIntire": "Mitchell",
  "Riceville": "Mitchell",
  "Orchard": "Mitchell",

  // Worth County
  "Northwood": "Worth",
  "Manly": "Worth",
  "Kensett": "Worth",
  "Grafton": "Worth",
  "Joice": "Worth",
  "Fertile": "Worth",
  "Hanlontown": "Worth",

  // Winnebago County
  "Forest City": "Winnebago",
  "Lake Mills": "Winnebago",
  "Thompson": "Winnebago",
  "Buffalo Center": "Winnebago",
  "Scarville": "Winnebago",
  "Rake": "Winnebago",
  "Leland": "Winnebago",

  // Hancock County
  "Garner": "Hancock",
  "Britt": "Hancock",
  "Kanawha": "Hancock",
  "Woden": "Hancock",
  "Crystal Lake": "Hancock",
  "Corwith": "Hancock",
  "Goodell": "Hancock",
  "Klemme": "Hancock",
  "Duncan": "Hancock",

  // Kossuth County
  "Algona": "Kossuth",
  "Bancroft": "Kossuth",
  "Swea City": "Kossuth",
  "Lakota": "Kossuth",
  "Burt": "Kossuth",
  "Lone Rock": "Kossuth",
  "Fenton": "Kossuth",
  "Wesley": "Kossuth",
  "Titonka": "Kossuth",
  "Sexton": "Kossuth",
  "Lu Verne": "Kossuth",
  "Whittemore": "Kossuth",
  "Buffalo Center": "Kossuth",
  "Ledyard": "Kossuth",
  "St. Benedict": "Kossuth",

  // Palo Alto County
  "Emmetsburg": "Palo Alto",
  "West Bend": "Palo Alto",
  "Cylinder": "Palo Alto",
  "Ruthven": "Palo Alto",
  "Mallard": "Palo Alto",
  "Ayrshire": "Palo Alto",
  "Rodman": "Palo Alto",
  "Curlew": "Palo Alto",
  "Graettinger": "Palo Alto",

  // Humboldt County
  "Humboldt": "Humboldt",
  "Dakota City": "Humboldt",
  "Livermore": "Humboldt",
  "Gilmore City": "Humboldt",
  "Hardy": "Humboldt",
  "Renwick": "Humboldt",
  "Thor": "Humboldt",
  "Ottosen": "Humboldt",
  "Bode": "Humboldt",
  "Rutland": "Humboldt",

  // Wright County
  "Eagle Grove": "Wright",
  "Clarion": "Wright",
  "Belmond": "Wright",
  "Dows": "Wright",
  "Goldfield": "Wright",
  "Rowan": "Wright",
  "Woolstock": "Wright",

  // Hamilton County
  "Webster City": "Hamilton",
  "Jewell": "Hamilton",
  "Stratford": "Hamilton",
  "Stanhope": "Hamilton",
  "Williams": "Hamilton",
  "Blairsburg": "Hamilton",
  "Ellsworth": "Hamilton",
  "Kamrar": "Hamilton",
  "Randall": "Hamilton",

  // Franklin County
  "Hampton": "Franklin",
  "Sheffield": "Franklin",
  "Coulter": "Franklin",
  "Alexander": "Franklin",
  "Latimer": "Franklin",
  "Geneva": "Franklin",
  "Chapin": "Franklin",
  "Hansell": "Franklin",
  "Ackley": "Franklin",
  "Popejoy": "Franklin",

  // Butler County
  "Allison": "Butler",
  "Parkersburg": "Butler",
  "Clarksville": "Butler",
  "Greene": "Butler",
  "Shell Rock": "Butler",
  "Aplington": "Butler",
  "Bristow": "Butler",
  "Dumont": "Butler",
  "New Hartford": "Butler",
  "Austinville": "Butler",

  // Grundy County
  "Grundy Center": "Grundy",
  "Reinbeck": "Grundy",
  "Dike": "Grundy",
  "Conrad": "Grundy",
  "Wellsburg": "Grundy",
  "Beaman": "Grundy",
  "Holland": "Grundy",
  "Morrison": "Grundy",
  "Stout": "Grundy",

  // Allamakee County
  "Waukon": "Allamakee",
  "Postville": "Allamakee",
  "Lansing": "Allamakee",
  "New Albin": "Allamakee",
  "Harpers Ferry": "Allamakee",
  "Waterville": "Allamakee",
  "Dorchester": "Allamakee",

  // Clayton County
  "Elkader": "Clayton",
  "Guttenberg": "Clayton",
  "Garnavillo": "Clayton",
  "Strawberry Point": "Clayton",
  "Marquette": "Clayton",
  "McGregor": "Clayton",
  "Edgewood": "Clayton",
  "Monona": "Clayton",
  "Clayton": "Clayton",
  "Communia": "Clayton",
  "Osterdock": "Clayton",
  "Volga": "Clayton",

  // Calhoun County
  "Rockwell City": "Calhoun",
  "Lake City": "Calhoun",
  "Manson": "Calhoun",
  "Farnhamville": "Calhoun",
  "Jolley": "Calhoun",
  "Lohrville": "Calhoun",
  "Pomeroy": "Calhoun",
  "Rinard": "Calhoun",
  "Somers": "Calhoun",
  "Knierim": "Calhoun",

  // Pocahontas County
  "Pocahontas": "Pocahontas",
  "Laurens": "Pocahontas",
  "Rolfe": "Pocahontas",
  "Palmer": "Pocahontas",
  "Havelock": "Pocahontas",
  "Fonda": "Pocahontas",
  "Gilmore City": "Pocahontas",
  "Plover": "Pocahontas",
  "Varina": "Pocahontas",

  // Sac County
  "Sac City": "Sac",
  "Lake View": "Sac",
  "Early": "Sac",
  "Schaller": "Sac",
  "Wall Lake": "Sac",
  "Odebolt": "Sac",
  "Lytton": "Sac",
  "Auburn": "Sac",
  "Nemaha": "Sac",

  // Ida County
  "Ida Grove": "Ida",
  "Holstein": "Ida",
  "Battle Creek": "Ida",
  "Galva": "Ida",
  "Arthur": "Ida",

  // Cherokee County
  "Cherokee": "Cherokee",
  "Marcus": "Cherokee",
  "Aurelia": "Cherokee",
  "Cleghorn": "Cherokee",
  "Larrabee": "Cherokee",
  "Washta": "Cherokee",
  "Quimby": "Cherokee",
  "Meriden": "Cherokee",

  // O'Brien County
  "Sheldon": "O'Brien",
  "Primghar": "O'Brien",
  "Sanborn": "O'Brien",
  "Hartley": "O'Brien",
  "Archer": "O'Brien",
  "Sutherland": "O'Brien",
  "Paullina": "O'Brien",
  "Gaza": "O'Brien",
  "Calumet": "O'Brien",
  "Moneta": "O'Brien",

  // Osceola County
  "Sibley": "Osceola",
  "Ashton": "Osceola",
  "Melvin": "Osceola",
  "Ocheyedan": "Osceola",
  "Harris": "Osceola",
  "May City": "Osceola",

  // Lyon County
  "Rock Rapids": "Lyon",
  "George": "Lyon",
  "Doon": "Lyon",
  "Larchwood": "Lyon",
  "Little Rock": "Lyon",
  "Inwood": "Lyon",
  "Lester": "Lyon",
  "Alvord": "Lyon",

  // Audubon County
  "Audubon": "Audubon",
  "Exira": "Audubon",
  "Kimballton": "Audubon",
  "Gray": "Audubon",
  "Brayton": "Audubon",

  // Guthrie County
  "Guthrie Center": "Guthrie",
  "Stuart": "Guthrie",
  "Panora": "Guthrie",
  "Casey": "Guthrie",
  "Bayard": "Guthrie",
  "Jamaica": "Guthrie",
  "Menlo": "Guthrie",
  "Yale": "Guthrie",
  "Bagley": "Guthrie",

  // Greene County
  "Jefferson": "Greene",
  "Grand Junction": "Greene",
  "Scranton": "Greene",
  "Churdan": "Greene",
  "Rippey": "Greene",
  "Paton": "Greene",
  "Cooper": "Greene",
  "Dana": "Greene",

  // Adair County
  "Greenfield": "Adair",
  "Adair": "Adair",
  "Fontanelle": "Adair",
  "Orient": "Adair",
  "Bridgewater": "Adair",
  "Stuart": "Adair",

  // Adams County
  "Corning": "Adams",
  "Prescott": "Adams",
  "Carbon": "Adams",
  "Nodaway": "Adams",

  // Taylor County
  "Bedford": "Taylor",
  "Lenox": "Taylor",
  "Clearfield": "Taylor",
  "Conway": "Taylor",
  "New Market": "Taylor",
  "Blockton": "Taylor",
  "Gravity": "Taylor",

  // Ringgold County
  "Mount Ayr": "Ringgold",
  "Diagonal": "Ringgold",
  "Kellerton": "Ringgold",
  "Tingley": "Ringgold",
  "Redding": "Ringgold",
  "Ellston": "Ringgold",
  "Benton": "Ringgold",
  "Beaconsfield": "Ringgold",
  "Delphos": "Ringgold",
  "Maloy": "Ringgold",

  // Decatur County
  "Leon": "Decatur",
  "Lamoni": "Decatur",
  "Davis City": "Decatur",
  "Van Wert": "Decatur",
  "Garden Grove": "Decatur",
  "Pleasanton": "Decatur",
  "Decatur City": "Decatur",
  "Grand River": "Decatur",
  "Weldon": "Decatur",
  "Le Roy": "Decatur"
};

// Population estimates for Iowa cities
const populations = {
  "Des Moines": 214237,
  "Cedar Rapids": 137710,
  "Davenport": 101590,
  "Sioux City": 85797,
  "Iowa City": 74828,
  "Waterloo": 67314,
  "Ames": 66427,
  "West Des Moines": 68723,
  "Council Bluffs": 62877,
  "Dubuque": 59667,
  "Ankeny": 67355,
  "Urbandale": 45580,
  "Cedar Falls": 40713,
  "Marion": 40359,
  "Bettendorf": 36543,
  "Marshalltown": 27431,
  "Mason City": 27899,
  "Clinton": 24473,
  "Burlington": 24051,
  "Ottumwa": 24998,
  "Fort Dodge": 24871,
  "Muscatine": 23819,
  "Coralville": 21182,
  "Johnston": 22582,
  "North Liberty": 19640,
  "Newton": 15254,
  "Indianola": 16107,
  "Clive": 17909,
  "Oskaloosa": 11463,
  "Spencer": 11317,
  "Boone": 12439,
  "Fort Madison": 10414,
  "Keokuk": 10033,
  "Waukee": 21457,
  "Le Mars": 10571,
  "Pella": 10352,
  "Grinnell": 9218,
  "Fairfield": 9464,
  "Decorah": 7587,
  "Carroll": 9878,
  "Storm Lake": 10600,
  "Knoxville": 7313,
  "Perry": 7702,
  "Clear Lake": 7462,
  "Waverly": 10254,
  "Altoona": 18817,
  "Pleasant Hill": 10282,
  "Grimes": 14246,
  "Orange City": 6189,
  "Sioux Center": 7605,
  "Charles City": 7441,
  "Washington": 7266,
  "Oelwein": 5964,
  "Independence": 6033,
  "Anamosa": 5533,
  "Algona": 5476,
  "Atlantic": 6954,
  "Creston": 7857,
  "Red Oak": 5568,
  "Denison": 8298,
  "Harlan": 4952,
  "Winterset": 5190,
  "Centerville": 5418,
  "Osceola": 5048,
  "Chariton": 4174,
  "Shenandoah": 4976,
  "Clarinda": 5572,
  "Mount Pleasant": 8668,
  "Vinton": 5257,
  "Maquoketa": 6041,
  "Eldora": 2732,
  "Toledo": 2341,
  "Tipton": 3234,
  "Manchester": 5179,
  "West Union": 2486,
  "New Hampton": 3592,
  "Osage": 3619,
  "Hampton": 4461,
  "Garner": 3129,
  "Forest City": 4151,
  "Emmetsburg": 3904,
  "Estherville": 5841,
  "Spirit Lake": 5018,
  "Cherokee": 4995,
  "Sheldon": 5193,
  "Rock Rapids": 2549,
  "Sibley": 2798,
  "Pocahontas": 1789,
  "Sac City": 2220,
  "Ida Grove": 2142,
  "Jefferson": 4345,
  "Guthrie Center": 1569,
  "Greenfield": 1982,
  "Bedford": 1409,
  "Mount Ayr": 1691,
  "Leon": 1984,
  "Corydon": 1585,
  "Bloomfield": 2640,
  "Keosauqua": 908,
  "Albia": 3706,
  "Sigourney": 2059,
  "Wapello": 2067,
  "Marengo": 2528,
  "Belle Plaine": 2534,
  "Monticello": 3796,
  "Dyersville": 4379,
  "Elkader": 1273,
  "Waukon": 3897,
  "Cresco": 3868,
  "Northwood": 1989,
  "Humboldt": 4690,
  "Webster City": 7884,
  "Clarion": 2850,
  "Eagle Grove": 3583,
  "Lake City": 1727,
  "Rockwell City": 2152
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

    const prefixes = [townName, county, "Hawkeye", "Iowa", "Heartland", "Prairie", "Midwest", "Cornbelt", "Heritage"];
    const suffixes = ["LLC", "Inc", "Co", "Services", "Plus", "Pro", "Express", "Center", "Solutions", "Group"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      category: category,
      address: `${townName}, IA`,
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

for (const [townName, county] of Object.entries(iowaTowns)) {
  const slug = generateSlug(townName) + '-ia';
  const population = populations[townName] || Math.floor(Math.random() * 3000) + 500;
  const businesses = generateBusinesses(townName, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: townName,
    state: "Iowa",
    state_abbr: "IA",
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
title: "${townName}, Iowa Business Directory"
slug: "${slug}"
town: "${townName}"
state: "Iowa"
state_abbr: "IA"
county: "${county}"
population: ${population}
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), mdContent);
}

// Create state page
const stateContent = `---
title: "Iowa Business Directory"
slug: "ia"
state: "ia"
state_name: "Iowa"
---
`;

fs.writeFileSync(path.join(__dirname, '..', 'content', 'states', 'ia.md'), stateContent);

console.log(`Created Iowa towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties: ${counties.size}`);
