import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Florida municipalities with their counties
// Florida has 67 counties and 411 incorporated municipalities
// Source: Florida League of Cities, US Census Bureau
const floridaTowns = {
  // Alachua County
  "Alachua": "Alachua",
  "Archer": "Alachua",
  "Gainesville": "Alachua",
  "Hawthorne": "Alachua",
  "High Springs": "Alachua",
  "La Crosse": "Alachua",
  "Micanopy": "Alachua",
  "Newberry": "Alachua",
  "Waldo": "Alachua",

  // Baker County
  "Glen St. Mary": "Baker",
  "Macclenny": "Baker",

  // Bay County
  "Callaway": "Bay",
  "Lynn Haven": "Bay",
  "Mexico Beach": "Bay",
  "Panama City": "Bay",
  "Panama City Beach": "Bay",
  "Parker": "Bay",
  "Springfield": "Bay",

  // Bradford County
  "Brooker": "Bradford",
  "Hampton": "Bradford",
  "Lawtey": "Bradford",
  "Starke": "Bradford",

  // Brevard County
  "Cape Canaveral": "Brevard",
  "Cocoa": "Brevard",
  "Cocoa Beach": "Brevard",
  "Grant-Valkaria": "Brevard",
  "Indialantic": "Brevard",
  "Indian Harbour Beach": "Brevard",
  "Malabar": "Brevard",
  "Melbourne": "Brevard",
  "Melbourne Beach": "Brevard",
  "Melbourne Village": "Brevard",
  "Palm Bay": "Brevard",
  "Palm Shores": "Brevard",
  "Rockledge": "Brevard",
  "Satellite Beach": "Brevard",
  "Titusville": "Brevard",
  "West Melbourne": "Brevard",

  // Broward County
  "Coconut Creek": "Broward",
  "Cooper City": "Broward",
  "Coral Springs": "Broward",
  "Dania Beach": "Broward",
  "Davie": "Broward",
  "Deerfield Beach": "Broward",
  "Fort Lauderdale": "Broward",
  "Hallandale Beach": "Broward",
  "Hillsboro Beach": "Broward",
  "Hollywood": "Broward",
  "Lauderdale Lakes": "Broward",
  "Lauderdale-by-the-Sea": "Broward",
  "Lauderhill": "Broward",
  "Lazy Lake": "Broward",
  "Lighthouse Point": "Broward",
  "Margate": "Broward",
  "Miramar": "Broward",
  "North Lauderdale": "Broward",
  "Oakland Park": "Broward",
  "Parkland": "Broward",
  "Pembroke Park": "Broward",
  "Pembroke Pines": "Broward",
  "Plantation": "Broward",
  "Pompano Beach": "Broward",
  "Sea Ranch Lakes": "Broward",
  "Southwest Ranches": "Broward",
  "Sunrise": "Broward",
  "Tamarac": "Broward",
  "Weston": "Broward",
  "Wilton Manors": "Broward",

  // Charlotte County
  "Punta Gorda": "Charlotte",

  // Citrus County
  "Crystal River": "Citrus",
  "Inverness": "Citrus",

  // Clay County
  "Green Cove Springs": "Clay",
  "Keystone Heights": "Clay",
  "Orange Park": "Clay",
  "Penney Farms": "Clay",

  // Collier County
  "Everglades City": "Collier",
  "Marco Island": "Collier",
  "Naples": "Collier",

  // Columbia County
  "Lake City": "Columbia",

  // DeSoto County
  "Arcadia": "DeSoto",

  // Dixie County
  "Cross City": "Dixie",
  "Horseshoe Beach": "Dixie",

  // Duval County
  "Atlantic Beach": "Duval",
  "Baldwin": "Duval",
  "Jacksonville": "Duval",
  "Jacksonville Beach": "Duval",
  "Neptune Beach": "Duval",

  // Escambia County
  "Century": "Escambia",
  "Pensacola": "Escambia",

  // Flagler County
  "Beverly Beach": "Flagler",
  "Bunnell": "Flagler",
  "Flagler Beach": "Flagler",
  "Marineland": "Flagler",
  "Palm Coast": "Flagler",

  // Franklin County
  "Apalachicola": "Franklin",
  "Carrabelle": "Franklin",

  // Gadsden County
  "Chattahoochee": "Gadsden",
  "Greensboro": "Gadsden",
  "Gretna": "Gadsden",
  "Havana": "Gadsden",
  "Midway": "Gadsden",
  "Quincy": "Gadsden",

  // Gilchrist County
  "Bell": "Gilchrist",
  "Fanning Springs": "Gilchrist",
  "Trenton": "Gilchrist",

  // Glades County
  "Moore Haven": "Glades",

  // Gulf County
  "Port St. Joe": "Gulf",
  "Wewahitchka": "Gulf",

  // Hamilton County
  "Jasper": "Hamilton",
  "Jennings": "Hamilton",
  "White Springs": "Hamilton",

  // Hardee County
  "Bowling Green": "Hardee",
  "Wauchula": "Hardee",
  "Zolfo Springs": "Hardee",

  // Hendry County
  "Clewiston": "Hendry",
  "LaBelle": "Hendry",

  // Hernando County
  "Brooksville": "Hernando",
  "Weeki Wachee": "Hernando",

  // Highlands County
  "Avon Park": "Highlands",
  "Lake Placid": "Highlands",
  "Sebring": "Highlands",

  // Hillsborough County
  "Plant City": "Hillsborough",
  "Tampa": "Hillsborough",
  "Temple Terrace": "Hillsborough",

  // Holmes County
  "Bonifay": "Holmes",
  "Esto": "Holmes",
  "Noma": "Holmes",
  "Ponce de Leon": "Holmes",
  "Westville": "Holmes",

  // Indian River County
  "Fellsmere": "Indian River",
  "Indian River Shores": "Indian River",
  "Orchid": "Indian River",
  "Sebastian": "Indian River",
  "Vero Beach": "Indian River",

  // Jackson County
  "Alford": "Jackson",
  "Bascom": "Jackson",
  "Campbellton": "Jackson",
  "Cottondale": "Jackson",
  "Graceville": "Jackson",
  "Grand Ridge": "Jackson",
  "Greenwood": "Jackson",
  "Jacob City": "Jackson",
  "Malone": "Jackson",
  "Marianna": "Jackson",
  "Sneads": "Jackson",

  // Jefferson County
  "Monticello": "Jefferson",

  // Lafayette County
  "Mayo": "Lafayette",

  // Lake County
  "Astatula": "Lake",
  "Clermont": "Lake",
  "Eustis": "Lake",
  "Fruitland Park": "Lake",
  "Groveland": "Lake",
  "Howey-in-the-Hills": "Lake",
  "Lady Lake": "Lake",
  "Leesburg": "Lake",
  "Mascotte": "Lake",
  "Minneola": "Lake",
  "Montverde": "Lake",
  "Mount Dora": "Lake",
  "Tavares": "Lake",
  "Umatilla": "Lake",

  // Lee County
  "Bonita Springs": "Lee",
  "Cape Coral": "Lee",
  "Fort Myers": "Lee",
  "Fort Myers Beach": "Lee",
  "Sanibel": "Lee",

  // Leon County
  "Tallahassee": "Leon",

  // Levy County
  "Bronson": "Levy",
  "Cedar Key": "Levy",
  "Chiefland": "Levy",
  "Fanning Springs": "Levy",
  "Inglis": "Levy",
  "Otter Creek": "Levy",
  "Williston": "Levy",
  "Yankeetown": "Levy",

  // Liberty County
  "Bristol": "Liberty",

  // Madison County
  "Greenville": "Madison",
  "Lee": "Madison",
  "Madison": "Madison",

  // Manatee County
  "Anna Maria": "Manatee",
  "Bradenton": "Manatee",
  "Bradenton Beach": "Manatee",
  "Holmes Beach": "Manatee",
  "Longboat Key": "Manatee",
  "Palmetto": "Manatee",

  // Marion County
  "Belleview": "Marion",
  "Dunnellon": "Marion",
  "McIntosh": "Marion",
  "Ocala": "Marion",
  "Reddick": "Marion",

  // Martin County
  "Jupiter Island": "Martin",
  "Ocean Breeze": "Martin",
  "Sewall's Point": "Martin",
  "Stuart": "Martin",

  // Miami-Dade County
  "Aventura": "Miami-Dade",
  "Bal Harbour": "Miami-Dade",
  "Bay Harbor Islands": "Miami-Dade",
  "Biscayne Park": "Miami-Dade",
  "Coral Gables": "Miami-Dade",
  "Cutler Bay": "Miami-Dade",
  "Doral": "Miami-Dade",
  "El Portal": "Miami-Dade",
  "Florida City": "Miami-Dade",
  "Golden Beach": "Miami-Dade",
  "Hialeah": "Miami-Dade",
  "Hialeah Gardens": "Miami-Dade",
  "Homestead": "Miami-Dade",
  "Indian Creek": "Miami-Dade",
  "Key Biscayne": "Miami-Dade",
  "Medley": "Miami-Dade",
  "Miami": "Miami-Dade",
  "Miami Beach": "Miami-Dade",
  "Miami Gardens": "Miami-Dade",
  "Miami Lakes": "Miami-Dade",
  "Miami Shores": "Miami-Dade",
  "Miami Springs": "Miami-Dade",
  "North Bay Village": "Miami-Dade",
  "North Miami": "Miami-Dade",
  "North Miami Beach": "Miami-Dade",
  "Opa-locka": "Miami-Dade",
  "Palmetto Bay": "Miami-Dade",
  "Pinecrest": "Miami-Dade",
  "South Miami": "Miami-Dade",
  "Sunny Isles Beach": "Miami-Dade",
  "Surfside": "Miami-Dade",
  "Sweetwater": "Miami-Dade",
  "Virginia Gardens": "Miami-Dade",
  "West Miami": "Miami-Dade",

  // Monroe County
  "Islamorada": "Monroe",
  "Key Colony Beach": "Monroe",
  "Key West": "Monroe",
  "Layton": "Monroe",
  "Marathon": "Monroe",

  // Nassau County
  "Callahan": "Nassau",
  "Fernandina Beach": "Nassau",
  "Hilliard": "Nassau",

  // Okaloosa County
  "Cinco Bayou": "Okaloosa",
  "Crestview": "Okaloosa",
  "Destin": "Okaloosa",
  "Fort Walton Beach": "Okaloosa",
  "Laurel Hill": "Okaloosa",
  "Mary Esther": "Okaloosa",
  "Niceville": "Okaloosa",
  "Shalimar": "Okaloosa",
  "Valparaiso": "Okaloosa",

  // Okeechobee County
  "Okeechobee": "Okeechobee",

  // Orange County
  "Apopka": "Orange",
  "Bay Lake": "Orange",
  "Belle Isle": "Orange",
  "Eatonville": "Orange",
  "Edgewood": "Orange",
  "Lake Buena Vista": "Orange",
  "Maitland": "Orange",
  "Oakland": "Orange",
  "Ocoee": "Orange",
  "Orlando": "Orange",
  "Windermere": "Orange",
  "Winter Garden": "Orange",
  "Winter Park": "Orange",

  // Osceola County
  "Kissimmee": "Osceola",
  "St. Cloud": "Osceola",

  // Palm Beach County
  "Atlantis": "Palm Beach",
  "Belle Glade": "Palm Beach",
  "Boca Raton": "Palm Beach",
  "Boynton Beach": "Palm Beach",
  "Briny Breezes": "Palm Beach",
  "Cloud Lake": "Palm Beach",
  "Delray Beach": "Palm Beach",
  "Glen Ridge": "Palm Beach",
  "Golf": "Palm Beach",
  "Greenacres": "Palm Beach",
  "Gulf Stream": "Palm Beach",
  "Haverhill": "Palm Beach",
  "Highland Beach": "Palm Beach",
  "Hypoluxo": "Palm Beach",
  "Juno Beach": "Palm Beach",
  "Jupiter": "Palm Beach",
  "Jupiter Inlet Colony": "Palm Beach",
  "Lake Clarke Shores": "Palm Beach",
  "Lake Park": "Palm Beach",
  "Lake Worth Beach": "Palm Beach",
  "Lantana": "Palm Beach",
  "Loxahatchee Groves": "Palm Beach",
  "Manalapan": "Palm Beach",
  "Mangonia Park": "Palm Beach",
  "North Palm Beach": "Palm Beach",
  "Ocean Ridge": "Palm Beach",
  "Pahokee": "Palm Beach",
  "Palm Beach": "Palm Beach",
  "Palm Beach Gardens": "Palm Beach",
  "Palm Beach Shores": "Palm Beach",
  "Palm Springs": "Palm Beach",
  "Riviera Beach": "Palm Beach",
  "Royal Palm Beach": "Palm Beach",
  "South Bay": "Palm Beach",
  "South Palm Beach": "Palm Beach",
  "Tequesta": "Palm Beach",
  "Wellington": "Palm Beach",
  "West Palm Beach": "Palm Beach",
  "Westlake": "Palm Beach",

  // Pasco County
  "Dade City": "Pasco",
  "New Port Richey": "Pasco",
  "Port Richey": "Pasco",
  "San Antonio": "Pasco",
  "St. Leo": "Pasco",
  "Zephyrhills": "Pasco",

  // Pinellas County
  "Belleair": "Pinellas",
  "Belleair Beach": "Pinellas",
  "Belleair Bluffs": "Pinellas",
  "Belleair Shore": "Pinellas",
  "Clearwater": "Pinellas",
  "Dunedin": "Pinellas",
  "Gulfport": "Pinellas",
  "Indian Rocks Beach": "Pinellas",
  "Indian Shores": "Pinellas",
  "Kenneth City": "Pinellas",
  "Largo": "Pinellas",
  "Madeira Beach": "Pinellas",
  "North Redington Beach": "Pinellas",
  "Oldsmar": "Pinellas",
  "Pinellas Park": "Pinellas",
  "Redington Beach": "Pinellas",
  "Redington Shores": "Pinellas",
  "Safety Harbor": "Pinellas",
  "Seminole": "Pinellas",
  "South Pasadena": "Pinellas",
  "St. Pete Beach": "Pinellas",
  "St. Petersburg": "Pinellas",
  "Tarpon Springs": "Pinellas",
  "Treasure Island": "Pinellas",

  // Polk County
  "Auburndale": "Polk",
  "Bartow": "Polk",
  "Davenport": "Polk",
  "Dundee": "Polk",
  "Eagle Lake": "Polk",
  "Fort Meade": "Polk",
  "Frostproof": "Polk",
  "Haines City": "Polk",
  "Highland Park": "Polk",
  "Hillcrest Heights": "Polk",
  "Lake Alfred": "Polk",
  "Lake Hamilton": "Polk",
  "Lake Wales": "Polk",
  "Lakeland": "Polk",
  "Mulberry": "Polk",
  "Polk City": "Polk",
  "Winter Haven": "Polk",

  // Putnam County
  "Crescent City": "Putnam",
  "Interlachen": "Putnam",
  "Palatka": "Putnam",
  "Pomona Park": "Putnam",
  "Welaka": "Putnam",

  // Santa Rosa County
  "Gulf Breeze": "Santa Rosa",
  "Jay": "Santa Rosa",
  "Milton": "Santa Rosa",

  // Sarasota County
  "Longboat Key": "Sarasota",
  "North Port": "Sarasota",
  "Sarasota": "Sarasota",
  "Venice": "Sarasota",

  // Seminole County
  "Altamonte Springs": "Seminole",
  "Casselberry": "Seminole",
  "Lake Mary": "Seminole",
  "Longwood": "Seminole",
  "Oviedo": "Seminole",
  "Sanford": "Seminole",
  "Winter Springs": "Seminole",

  // St. Johns County
  "Hastings": "St. Johns",
  "Marineland": "St. Johns",
  "St. Augustine": "St. Johns",
  "St. Augustine Beach": "St. Johns",

  // St. Lucie County
  "Fort Pierce": "St. Lucie",
  "Port St. Lucie": "St. Lucie",
  "St. Lucie Village": "St. Lucie",

  // Sumter County
  "Bushnell": "Sumter",
  "Center Hill": "Sumter",
  "Coleman": "Sumter",
  "Webster": "Sumter",
  "Wildwood": "Sumter",

  // Suwannee County
  "Branford": "Suwannee",
  "Live Oak": "Suwannee",

  // Taylor County
  "Perry": "Taylor",

  // Union County
  "Lake Butler": "Union",
  "Raiford": "Union",
  "Worthington Springs": "Union",

  // Volusia County
  "Daytona Beach": "Volusia",
  "Daytona Beach Shores": "Volusia",
  "DeBary": "Volusia",
  "DeLand": "Volusia",
  "Deltona": "Volusia",
  "Edgewater": "Volusia",
  "Holly Hill": "Volusia",
  "Lake Helen": "Volusia",
  "New Smyrna Beach": "Volusia",
  "Oak Hill": "Volusia",
  "Orange City": "Volusia",
  "Ormond Beach": "Volusia",
  "Pierson": "Volusia",
  "Ponce Inlet": "Volusia",
  "Port Orange": "Volusia",
  "South Daytona": "Volusia",

  // Wakulla County
  "Sopchoppy": "Wakulla",
  "St. Marks": "Wakulla",

  // Walton County
  "DeFuniak Springs": "Walton",
  "Freeport": "Walton",
  "Paxton": "Walton",

  // Washington County
  "Caryville": "Washington",
  "Chipley": "Washington",
  "Ebro": "Washington",
  "Vernon": "Washington",
  "Wausau": "Washington"
};

// Populations for Florida communities
const populations = {
  "Jacksonville": 949611,
  "Miami": 442241,
  "Tampa": 387050,
  "Orlando": 307573,
  "St. Petersburg": 258308,
  "Hialeah": 223109,
  "Port St. Lucie": 231790,
  "Cape Coral": 194016,
  "Tallahassee": 196169,
  "Fort Lauderdale": 182760,
  "Pembroke Pines": 171178,
  "Hollywood": 153067,
  "Gainesville": 141085,
  "Miramar": 134721,
  "Coral Springs": 134394,
  "Palm Bay": 119760,
  "Clearwater": 117292,
  "Miami Gardens": 111640,
  "Pompano Beach": 112046,
  "Lakeland": 112641,
  "West Palm Beach": 117415,
  "Davie": 105691,
  "Miami Beach": 82890,
  "Sunrise": 97335,
  "Plantation": 94580,
  "Boca Raton": 97422,
  "Deltona": 91747,
  "Palm Coast": 86599,
  "Deerfield Beach": 80089,
  "Fort Myers": 87103,
  "Melbourne": 85935,
  "Largo": 84666,
  "Homestead": 80139,
  "Boynton Beach": 80380,
  "Kissimmee": 79226,
  "Doral": 81369,
  "Lauderhill": 74291,
  "Tamarac": 71897,
  "Delray Beach": 68867,
  "Weston": 70045,
  "North Port": 74793,
  "Jupiter": 65791,
  "North Miami": 62468,
  "Wellington": 64919,
  "Coconut Creek": 60898,
  "Palm Beach Gardens": 59593,
  "Margate": 58435,
  "Ocala": 63108,
  "Sanford": 61051,
  "Sarasota": 57787,
  "Hallandale Beach": 39186,
  "Pinellas Park": 53637,
  "St. Cloud": 54468,
  "Coral Gables": 49631,
  "Ocoee": 51582,
  "Winter Garden": 49418,
  "Apopka": 57755,
  "Cutler Bay": 47040,
  "Altamonte Springs": 46235,
  "Oakland Park": 46104,
  "Greenacres": 44268,
  "Aventura": 40242,
  "Royal Palm Beach": 39507,
  "Ormond Beach": 43748,
  "Winter Haven": 48208,
  "North Miami Beach": 43231,
  "Dunedin": 36480,
  "Hialeah Gardens": 24621,
  "Oviedo": 44013,
  "Port Orange": 65195,
  "Clermont": 43021,
  "DeLand": 37498,
  "Casselberry": 28785,
  "Bradenton": 59439,
  "Venice": 25463,
  "Panama City": 36484,
  "Daytona Beach": 72647,
  "Bonita Springs": 57755,
  "Lake Worth Beach": 38561,
  "Cooper City": 35346,
  "Winter Springs": 39005,
  "Palm Springs": 26673,
  "Riviera Beach": 37218,
  "Parkland": 34663,
  "New Smyrna Beach": 31776,
  "Lauderdale Lakes": 36317,
  "Estero": 33450,
  "Winter Park": 30208,
  "New Port Richey": 16117,
  "Tarpon Springs": 25353,
  "Sebastian": 27245,
  "Vero Beach": 17163,
  "DeBary": 23048,
  "Fort Walton Beach": 22144,
  "South Daytona": 14056,
  "Lake Mary": 18060,
  "Longwood": 15363,
  "Temple Terrace": 26488,
  "Plant City": 40264,
  "Niceville": 16042,
  "Destin": 14482,
  "Crestview": 28285,
  "Marco Island": 17834,
  "Naples": 19115,
  "Key West": 24649,
  "Stuart": 17181,
  "Pensacola": 52975,
  "Fernandina Beach": 12966,
  "St. Augustine": 15415,
  "Palatka": 10605,
  "Lake City": 12173,
  "Leesburg": 25499,
  "Eustis": 21860,
  "Mount Dora": 16600,
  "Tavares": 18088,
  "Zephyrhills": 17634,
  "Dade City": 7355,
  "Crystal River": 3098,
  "Inverness": 7692,
  "Brooksville": 8634,
  "Titusville": 47606,
  "Cocoa": 20598,
  "Cocoa Beach": 11374,
  "Rockledge": 27968,
  "Satellite Beach": 11381,
  "West Melbourne": 24824,
  "Lynn Haven": 21658,
  "Panama City Beach": 12765,
  "Springfield": 9714,
  "Gulf Breeze": 6782,
  "Milton": 10179,
  "Punta Gorda": 20364,
  "Sebring": 10548,
  "Avon Park": 10987,
  "Lake Placid": 2223,
  "Arcadia": 8127,
  "Clewiston": 7676,
  "LaBelle": 5192,
  "Okeechobee": 5693,
  "Moore Haven": 1963,
  "Belle Glade": 20466,
  "Pahokee": 5747,
  "South Bay": 5024,
  "Quincy": 7145,
  "Gretna": 1480,
  "Havana": 1839,
  "Monticello": 2506,
  "Madison": 2843,
  "Live Oak": 6862,
  "Jasper": 4243,
  "Perry": 7049,
  "Mayo": 1237,
  "Cross City": 1728,
  "Chiefland": 2289,
  "Williston": 2970,
  "Trenton": 2155,
  "Bronson": 1279,
  "Cedar Key": 702,
  "Inglis": 1450,
  "Bushnell": 3174,
  "Wildwood": 7655,
  "Webster": 817,
  "Coleman": 706,
  "Center Hill": 1059,
  "Starke": 5449,
  "Green Cove Springs": 9392,
  "Orange Park": 8618,
  "Keystone Heights": 1451,
  "Macclenny": 7044,
  "Callahan": 1317,
  "Hilliard": 3173,
  "Fernandina Beach": 12966,
  "Atlantic Beach": 13831,
  "Neptune Beach": 7332,
  "Jacksonville Beach": 23562,
  "Baldwin": 1662,
  "Hastings": 580,
  "Bunnell": 3038,
  "Flagler Beach": 5054,
  "Marineland": 15,
  "Apalachicola": 2231,
  "Carrabelle": 2773,
  "Port St. Joe": 3489,
  "Wewahitchka": 1859,
  "Chipley": 3604,
  "Bonifay": 2697,
  "DeFuniak Springs": 7014,
  "Freeport": 2294,
  "Century": 1712,
  "Chattahoochee": 3089,
  "Marianna": 6102,
  "Graceville": 2278,
  "Sneads": 1849,
  "Blountstown": 2514,
  "Bristol": 845,
  "Crescent City": 1577,
  "Interlachen": 1468,
  "Pomona Park": 893,
  "Welaka": 717,
  "Bartow": 20265,
  "Haines City": 30178,
  "Lake Wales": 16515,
  "Auburndale": 17795,
  "Winter Haven": 48208,
  "Mulberry": 4127,
  "Fort Meade": 5626,
  "Frostproof": 3208,
  "Lake Alfred": 6027,
  "Dundee": 4715,
  "Eagle Lake": 2364,
  "Lake Hamilton": 1429,
  "Polk City": 3268,
  "Davenport": 9952,
  "Highland Park": 247,
  "Hillcrest Heights": 280,
  "Anna Maria": 502,
  "Bradenton Beach": 1171,
  "Holmes Beach": 4013,
  "Longboat Key": 7299,
  "Palmetto": 14038,
  "Belleview": 5359,
  "Dunnellon": 2023,
  "McIntosh": 453,
  "Reddick": 533,
  "Gulfport": 12029,
  "Safety Harbor": 18008,
  "Oldsmar": 15181,
  "Seminole": 18772,
  "Indian Rocks Beach": 4105,
  "Indian Shores": 1393,
  "Madeira Beach": 4294,
  "North Redington Beach": 1487,
  "Redington Beach": 1472,
  "Redington Shores": 2347,
  "St. Pete Beach": 9346,
  "Treasure Island": 6910,
  "Belleair": 4199,
  "Belleair Beach": 1563,
  "Belleair Bluffs": 2158,
  "Belleair Shore": 109,
  "Kenneth City": 5039,
  "South Pasadena": 5022,
  "Marathon": 8297,
  "Islamorada": 6571,
  "Key Colony Beach": 788,
  "Layton": 184,
  "Fellsmere": 6227,
  "Indian River Shores": 4525,
  "Orchid": 415,
  "Ocean Breeze": 283,
  "Sewall's Point": 2132,
  "Jupiter Island": 1030,
  "Tequesta": 6163,
  "Juno Beach": 3387,
  "Jupiter Inlet Colony": 397,
  "Lake Park": 8851,
  "North Palm Beach": 13629,
  "Palm Beach": 8776,
  "Palm Beach Shores": 1269,
  "Manalapan": 452,
  "South Palm Beach": 1392,
  "Ocean Ridge": 1923,
  "Gulf Stream": 988,
  "Highland Beach": 4230,
  "Briny Breezes": 495,
  "Lantana": 12235,
  "Lake Clarke Shores": 3653,
  "Hypoluxo": 2733,
  "Atlantis": 2005,
  "Cloud Lake": 135,
  "Glen Ridge": 255,
  "Golf": 268,
  "Haverhill": 2412,
  "Mangonia Park": 2148,
  "Loxahatchee Groves": 3691,
  "Westlake": 3391,
  "Surfside": 5741,
  "Bal Harbour": 2513,
  "Bay Harbor Islands": 5903,
  "Biscayne Park": 3193,
  "El Portal": 2325,
  "Golden Beach": 961,
  "Indian Creek": 42,
  "Key Biscayne": 14010,
  "Medley": 988,
  "Miami Lakes": 31628,
  "Miami Shores": 10826,
  "Miami Springs": 14041,
  "North Bay Village": 8108,
  "Opa-locka": 16455,
  "Palmetto Bay": 24781,
  "Pinecrest": 19317,
  "South Miami": 13409,
  "Sunny Isles Beach": 22342,
  "Sweetwater": 22024,
  "Virginia Gardens": 2451,
  "West Miami": 8038,
  "Florida City": 12846,
  "Wilton Manors": 12697,
  "Hillsboro Beach": 1963,
  "Lauderdale-by-the-Sea": 6703,
  "Lighthouse Point": 10486,
  "Sea Ranch Lakes": 629,
  "Lazy Lake": 25,
  "Southwest Ranches": 8027,
  "Pembroke Park": 6571
};

// Business categories for Florida
const businessCategories = [
  "Restaurant", "Cuban Restaurant", "Seafood", "Steakhouse", "Cafe", "Coffee Shop",
  "Bar", "Brewery", "Tiki Bar", "Bank", "Credit Union", "Gas Station", "Convenience Store",
  "Grocery Store", "Supermarket", "Pharmacy", "Hardware Store", "Beach Shop", "Surf Shop",
  "Auto Repair", "Car Dealership", "Tire Shop", "Hair Salon", "Barbershop", "Spa", "Nail Salon",
  "Dentist", "Doctor", "Clinic", "Hospital", "Urgent Care", "Veterinarian", "Chiropractor",
  "Insurance Agency", "Real Estate", "Attorney", "Accountant", "Tax Service",
  "Dry Cleaner", "Laundromat", "Fitness Center", "Gym", "Yoga Studio", "CrossFit",
  "Pet Store", "Florist", "Bakery", "Pizza", "Fast Food", "Ice Cream",
  "Hotel", "Resort", "Vacation Rental", "Motel", "Furniture Store",
  "Boat Dealer", "Marina", "Fishing Charter", "Dive Shop", "Jet Ski Rental",
  "Pool Service", "Landscaping", "HVAC", "Plumber", "Electrician", "Roofing", "Hurricane Shutters"
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
    const prefixes = [townName, "Florida", "Sunshine State", "Gulf Coast", "Atlantic", "Coastal", "Tropical", "Paradise"];
    const suffixes = ["", " LLC", " Inc", " & Co", " Services", " Center", " Plus", " Pro"];

    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      name = `${prefix} ${category}${suffix}`.trim();
    } while (usedNames.has(name) && usedNames.size < 300);

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

for (const [townName, county] of Object.entries(floridaTowns)) {
  const slug = slugify(townName) + '-fl';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 8000) + 500;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 500000) businessCount = 200;
  else if (population > 200000) businessCount = 175;
  else if (population > 100000) businessCount = 150;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "FL");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "Florida",
    state_abbr: "FL",
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
title: "${townName}, FL Business Directory"
type: "towns"
slug: "${slug}"
state: "fl"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "Florida Business Directory"
slug: "fl"
state: "fl"
state_name: "Florida"
---
`;
fs.writeFileSync(path.join(statesDir, 'fl.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
