import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete California municipalities with their counties
// California has 58 counties and 482 incorporated cities
// Source: California Secretary of State, US Census Bureau
const californiaTowns = {
  // Alameda County
  "Alameda": "Alameda",
  "Albany": "Alameda",
  "Berkeley": "Alameda",
  "Dublin": "Alameda",
  "Emeryville": "Alameda",
  "Fremont": "Alameda",
  "Hayward": "Alameda",
  "Livermore": "Alameda",
  "Newark": "Alameda",
  "Oakland": "Alameda",
  "Piedmont": "Alameda",
  "Pleasanton": "Alameda",
  "San Leandro": "Alameda",
  "Union City": "Alameda",

  // Alpine County (no incorporated cities)

  // Amador County
  "Amador City": "Amador",
  "Ione": "Amador",
  "Jackson": "Amador",
  "Plymouth": "Amador",
  "Sutter Creek": "Amador",

  // Butte County
  "Biggs": "Butte",
  "Chico": "Butte",
  "Gridley": "Butte",
  "Oroville": "Butte",
  "Paradise": "Butte",

  // Calaveras County
  "Angels Camp": "Calaveras",

  // Colusa County
  "Colusa": "Colusa",
  "Williams": "Colusa",

  // Contra Costa County
  "Antioch": "Contra Costa",
  "Brentwood": "Contra Costa",
  "Clayton": "Contra Costa",
  "Concord": "Contra Costa",
  "Danville": "Contra Costa",
  "El Cerrito": "Contra Costa",
  "Hercules": "Contra Costa",
  "Lafayette": "Contra Costa",
  "Martinez": "Contra Costa",
  "Moraga": "Contra Costa",
  "Oakley": "Contra Costa",
  "Orinda": "Contra Costa",
  "Pinole": "Contra Costa",
  "Pittsburg": "Contra Costa",
  "Pleasant Hill": "Contra Costa",
  "Richmond": "Contra Costa",
  "San Pablo": "Contra Costa",
  "San Ramon": "Contra Costa",
  "Walnut Creek": "Contra Costa",

  // Del Norte County
  "Crescent City": "Del Norte",

  // El Dorado County
  "Placerville": "El Dorado",
  "South Lake Tahoe": "El Dorado",

  // Fresno County
  "Clovis": "Fresno",
  "Coalinga": "Fresno",
  "Firebaugh": "Fresno",
  "Fowler": "Fresno",
  "Fresno": "Fresno",
  "Huron": "Fresno",
  "Kerman": "Fresno",
  "Kingsburg": "Fresno",
  "Mendota": "Fresno",
  "Orange Cove": "Fresno",
  "Parlier": "Fresno",
  "Reedley": "Fresno",
  "Sanger": "Fresno",
  "San Joaquin": "Fresno",
  "Selma": "Fresno",

  // Glenn County
  "Orland": "Glenn",
  "Willows": "Glenn",

  // Humboldt County
  "Arcata": "Humboldt",
  "Blue Lake": "Humboldt",
  "Eureka": "Humboldt",
  "Ferndale": "Humboldt",
  "Fortuna": "Humboldt",
  "Rio Dell": "Humboldt",
  "Trinidad": "Humboldt",

  // Imperial County
  "Brawley": "Imperial",
  "Calexico": "Imperial",
  "Calipatria": "Imperial",
  "El Centro": "Imperial",
  "Holtville": "Imperial",
  "Imperial": "Imperial",
  "Westmorland": "Imperial",

  // Inyo County
  "Bishop": "Inyo",

  // Kern County
  "Arvin": "Kern",
  "Bakersfield": "Kern",
  "California City": "Kern",
  "Delano": "Kern",
  "Maricopa": "Kern",
  "McFarland": "Kern",
  "Ridgecrest": "Kern",
  "Shafter": "Kern",
  "Taft": "Kern",
  "Tehachapi": "Kern",
  "Wasco": "Kern",

  // Kings County
  "Avenal": "Kings",
  "Corcoran": "Kings",
  "Hanford": "Kings",
  "Lemoore": "Kings",

  // Lake County
  "Clearlake": "Lake",
  "Lakeport": "Lake",

  // Lassen County
  "Susanville": "Lassen",

  // Los Angeles County
  "Agoura Hills": "Los Angeles",
  "Alhambra": "Los Angeles",
  "Arcadia": "Los Angeles",
  "Artesia": "Los Angeles",
  "Avalon": "Los Angeles",
  "Azusa": "Los Angeles",
  "Baldwin Park": "Los Angeles",
  "Bell": "Los Angeles",
  "Bell Gardens": "Los Angeles",
  "Bellflower": "Los Angeles",
  "Beverly Hills": "Los Angeles",
  "Bradbury": "Los Angeles",
  "Burbank": "Los Angeles",
  "Calabasas": "Los Angeles",
  "Carson": "Los Angeles",
  "Cerritos": "Los Angeles",
  "Claremont": "Los Angeles",
  "Commerce": "Los Angeles",
  "Compton": "Los Angeles",
  "Covina": "Los Angeles",
  "Cudahy": "Los Angeles",
  "Culver City": "Los Angeles",
  "Diamond Bar": "Los Angeles",
  "Downey": "Los Angeles",
  "Duarte": "Los Angeles",
  "El Monte": "Los Angeles",
  "El Segundo": "Los Angeles",
  "Gardena": "Los Angeles",
  "Glendale": "Los Angeles",
  "Glendora": "Los Angeles",
  "Hawaiian Gardens": "Los Angeles",
  "Hawthorne": "Los Angeles",
  "Hermosa Beach": "Los Angeles",
  "Hidden Hills": "Los Angeles",
  "Huntington Park": "Los Angeles",
  "Industry": "Los Angeles",
  "Inglewood": "Los Angeles",
  "Irwindale": "Los Angeles",
  "La Canada Flintridge": "Los Angeles",
  "La Habra Heights": "Los Angeles",
  "La Mirada": "Los Angeles",
  "La Puente": "Los Angeles",
  "La Verne": "Los Angeles",
  "Lakewood": "Los Angeles",
  "Lancaster": "Los Angeles",
  "Lawndale": "Los Angeles",
  "Lomita": "Los Angeles",
  "Long Beach": "Los Angeles",
  "Los Angeles": "Los Angeles",
  "Lynwood": "Los Angeles",
  "Malibu": "Los Angeles",
  "Manhattan Beach": "Los Angeles",
  "Maywood": "Los Angeles",
  "Monrovia": "Los Angeles",
  "Montebello": "Los Angeles",
  "Monterey Park": "Los Angeles",
  "Norwalk": "Los Angeles",
  "Palmdale": "Los Angeles",
  "Palos Verdes Estates": "Los Angeles",
  "Paramount": "Los Angeles",
  "Pasadena": "Los Angeles",
  "Pico Rivera": "Los Angeles",
  "Pomona": "Los Angeles",
  "Rancho Palos Verdes": "Los Angeles",
  "Redondo Beach": "Los Angeles",
  "Rolling Hills": "Los Angeles",
  "Rolling Hills Estates": "Los Angeles",
  "Rosemead": "Los Angeles",
  "San Dimas": "Los Angeles",
  "San Fernando": "Los Angeles",
  "San Gabriel": "Los Angeles",
  "San Marino": "Los Angeles",
  "Santa Clarita": "Los Angeles",
  "Santa Fe Springs": "Los Angeles",
  "Santa Monica": "Los Angeles",
  "Sierra Madre": "Los Angeles",
  "Signal Hill": "Los Angeles",
  "South El Monte": "Los Angeles",
  "South Gate": "Los Angeles",
  "South Pasadena": "Los Angeles",
  "Temple City": "Los Angeles",
  "Torrance": "Los Angeles",
  "Vernon": "Los Angeles",
  "Walnut": "Los Angeles",
  "West Covina": "Los Angeles",
  "West Hollywood": "Los Angeles",
  "Westlake Village": "Los Angeles",
  "Whittier": "Los Angeles",

  // Madera County
  "Chowchilla": "Madera",
  "Madera": "Madera",

  // Marin County
  "Belvedere": "Marin",
  "Corte Madera": "Marin",
  "Fairfax": "Marin",
  "Larkspur": "Marin",
  "Mill Valley": "Marin",
  "Novato": "Marin",
  "Ross": "Marin",
  "San Anselmo": "Marin",
  "San Rafael": "Marin",
  "Sausalito": "Marin",
  "Tiburon": "Marin",

  // Mariposa County (no incorporated cities)

  // Mendocino County
  "Fort Bragg": "Mendocino",
  "Point Arena": "Mendocino",
  "Ukiah": "Mendocino",
  "Willits": "Mendocino",

  // Merced County
  "Atwater": "Merced",
  "Dos Palos": "Merced",
  "Gustine": "Merced",
  "Livingston": "Merced",
  "Los Banos": "Merced",
  "Merced": "Merced",

  // Modoc County
  "Alturas": "Modoc",

  // Mono County
  "Mammoth Lakes": "Mono",

  // Monterey County
  "Carmel-by-the-Sea": "Monterey",
  "Del Rey Oaks": "Monterey",
  "Gonzales": "Monterey",
  "Greenfield": "Monterey",
  "King City": "Monterey",
  "Marina": "Monterey",
  "Monterey": "Monterey",
  "Pacific Grove": "Monterey",
  "Salinas": "Monterey",
  "Sand City": "Monterey",
  "Seaside": "Monterey",
  "Soledad": "Monterey",

  // Napa County
  "American Canyon": "Napa",
  "Calistoga": "Napa",
  "Napa": "Napa",
  "St. Helena": "Napa",
  "Yountville": "Napa",

  // Nevada County
  "Grass Valley": "Nevada",
  "Nevada City": "Nevada",
  "Truckee": "Nevada",

  // Orange County
  "Aliso Viejo": "Orange",
  "Anaheim": "Orange",
  "Brea": "Orange",
  "Buena Park": "Orange",
  "Costa Mesa": "Orange",
  "Cypress": "Orange",
  "Dana Point": "Orange",
  "Fountain Valley": "Orange",
  "Fullerton": "Orange",
  "Garden Grove": "Orange",
  "Huntington Beach": "Orange",
  "Irvine": "Orange",
  "La Habra": "Orange",
  "La Palma": "Orange",
  "Laguna Beach": "Orange",
  "Laguna Hills": "Orange",
  "Laguna Niguel": "Orange",
  "Laguna Woods": "Orange",
  "Lake Forest": "Orange",
  "Los Alamitos": "Orange",
  "Mission Viejo": "Orange",
  "Newport Beach": "Orange",
  "Orange": "Orange",
  "Placentia": "Orange",
  "Rancho Santa Margarita": "Orange",
  "San Clemente": "Orange",
  "San Juan Capistrano": "Orange",
  "Santa Ana": "Orange",
  "Seal Beach": "Orange",
  "Stanton": "Orange",
  "Tustin": "Orange",
  "Villa Park": "Orange",
  "Westminster": "Orange",
  "Yorba Linda": "Orange",

  // Placer County
  "Auburn": "Placer",
  "Colfax": "Placer",
  "Lincoln": "Placer",
  "Loomis": "Placer",
  "Rocklin": "Placer",
  "Roseville": "Placer",

  // Plumas County
  "Portola": "Plumas",

  // Riverside County
  "Banning": "Riverside",
  "Beaumont": "Riverside",
  "Blythe": "Riverside",
  "Calimesa": "Riverside",
  "Canyon Lake": "Riverside",
  "Cathedral City": "Riverside",
  "Coachella": "Riverside",
  "Corona": "Riverside",
  "Desert Hot Springs": "Riverside",
  "Eastvale": "Riverside",
  "Hemet": "Riverside",
  "Indian Wells": "Riverside",
  "Indio": "Riverside",
  "Jurupa Valley": "Riverside",
  "La Quinta": "Riverside",
  "Lake Elsinore": "Riverside",
  "Menifee": "Riverside",
  "Moreno Valley": "Riverside",
  "Murrieta": "Riverside",
  "Norco": "Riverside",
  "Palm Desert": "Riverside",
  "Palm Springs": "Riverside",
  "Perris": "Riverside",
  "Rancho Mirage": "Riverside",
  "Riverside": "Riverside",
  "San Jacinto": "Riverside",
  "Temecula": "Riverside",
  "Wildomar": "Riverside",

  // Sacramento County
  "Citrus Heights": "Sacramento",
  "Elk Grove": "Sacramento",
  "Folsom": "Sacramento",
  "Galt": "Sacramento",
  "Isleton": "Sacramento",
  "Rancho Cordova": "Sacramento",
  "Sacramento": "Sacramento",

  // San Benito County
  "Hollister": "San Benito",
  "San Juan Bautista": "San Benito",

  // San Bernardino County
  "Adelanto": "San Bernardino",
  "Apple Valley": "San Bernardino",
  "Barstow": "San Bernardino",
  "Big Bear Lake": "San Bernardino",
  "Chino": "San Bernardino",
  "Chino Hills": "San Bernardino",
  "Colton": "San Bernardino",
  "Fontana": "San Bernardino",
  "Grand Terrace": "San Bernardino",
  "Hesperia": "San Bernardino",
  "Highland": "San Bernardino",
  "Loma Linda": "San Bernardino",
  "Montclair": "San Bernardino",
  "Needles": "San Bernardino",
  "Ontario": "San Bernardino",
  "Rancho Cucamonga": "San Bernardino",
  "Redlands": "San Bernardino",
  "Rialto": "San Bernardino",
  "San Bernardino": "San Bernardino",
  "Twentynine Palms": "San Bernardino",
  "Upland": "San Bernardino",
  "Victorville": "San Bernardino",
  "Yucaipa": "San Bernardino",
  "Yucca Valley": "San Bernardino",

  // San Diego County
  "Carlsbad": "San Diego",
  "Chula Vista": "San Diego",
  "Coronado": "San Diego",
  "Del Mar": "San Diego",
  "El Cajon": "San Diego",
  "Encinitas": "San Diego",
  "Escondido": "San Diego",
  "Imperial Beach": "San Diego",
  "La Mesa": "San Diego",
  "Lemon Grove": "San Diego",
  "National City": "San Diego",
  "Oceanside": "San Diego",
  "Poway": "San Diego",
  "San Diego": "San Diego",
  "San Marcos": "San Diego",
  "Santee": "San Diego",
  "Solana Beach": "San Diego",
  "Vista": "San Diego",

  // San Francisco County
  "San Francisco": "San Francisco",

  // San Joaquin County
  "Escalon": "San Joaquin",
  "Lathrop": "San Joaquin",
  "Lodi": "San Joaquin",
  "Manteca": "San Joaquin",
  "Ripon": "San Joaquin",
  "Stockton": "San Joaquin",
  "Tracy": "San Joaquin",

  // San Luis Obispo County
  "Arroyo Grande": "San Luis Obispo",
  "Atascadero": "San Luis Obispo",
  "El Paso de Robles": "San Luis Obispo",
  "Grover Beach": "San Luis Obispo",
  "Morro Bay": "San Luis Obispo",
  "Pismo Beach": "San Luis Obispo",
  "San Luis Obispo": "San Luis Obispo",

  // San Mateo County
  "Atherton": "San Mateo",
  "Belmont": "San Mateo",
  "Brisbane": "San Mateo",
  "Burlingame": "San Mateo",
  "Colma": "San Mateo",
  "Daly City": "San Mateo",
  "East Palo Alto": "San Mateo",
  "Foster City": "San Mateo",
  "Half Moon Bay": "San Mateo",
  "Hillsborough": "San Mateo",
  "Menlo Park": "San Mateo",
  "Millbrae": "San Mateo",
  "Pacifica": "San Mateo",
  "Portola Valley": "San Mateo",
  "Redwood City": "San Mateo",
  "San Bruno": "San Mateo",
  "San Carlos": "San Mateo",
  "San Mateo": "San Mateo",
  "South San Francisco": "San Mateo",
  "Woodside": "San Mateo",

  // Santa Barbara County
  "Buellton": "Santa Barbara",
  "Carpinteria": "Santa Barbara",
  "Goleta": "Santa Barbara",
  "Guadalupe": "Santa Barbara",
  "Lompoc": "Santa Barbara",
  "Santa Barbara": "Santa Barbara",
  "Santa Maria": "Santa Barbara",
  "Solvang": "Santa Barbara",

  // Santa Clara County
  "Campbell": "Santa Clara",
  "Cupertino": "Santa Clara",
  "Gilroy": "Santa Clara",
  "Los Altos": "Santa Clara",
  "Los Altos Hills": "Santa Clara",
  "Los Gatos": "Santa Clara",
  "Milpitas": "Santa Clara",
  "Monte Sereno": "Santa Clara",
  "Morgan Hill": "Santa Clara",
  "Mountain View": "Santa Clara",
  "Palo Alto": "Santa Clara",
  "San Jose": "Santa Clara",
  "Santa Clara": "Santa Clara",
  "Saratoga": "Santa Clara",
  "Sunnyvale": "Santa Clara",

  // Santa Cruz County
  "Capitola": "Santa Cruz",
  "Santa Cruz": "Santa Cruz",
  "Scotts Valley": "Santa Cruz",
  "Watsonville": "Santa Cruz",

  // Shasta County
  "Anderson": "Shasta",
  "Redding": "Shasta",
  "Shasta Lake": "Shasta",

  // Sierra County (no incorporated cities)

  // Siskiyou County
  "Dorris": "Siskiyou",
  "Dunsmuir": "Siskiyou",
  "Etna": "Siskiyou",
  "Fort Jones": "Siskiyou",
  "Montague": "Siskiyou",
  "Mount Shasta": "Siskiyou",
  "Tulelake": "Siskiyou",
  "Weed": "Siskiyou",
  "Yreka": "Siskiyou",

  // Solano County
  "Benicia": "Solano",
  "Dixon": "Solano",
  "Fairfield": "Solano",
  "Rio Vista": "Solano",
  "Suisun City": "Solano",
  "Vacaville": "Solano",
  "Vallejo": "Solano",

  // Sonoma County
  "Cloverdale": "Sonoma",
  "Cotati": "Sonoma",
  "Healdsburg": "Sonoma",
  "Petaluma": "Sonoma",
  "Rohnert Park": "Sonoma",
  "Santa Rosa": "Sonoma",
  "Sebastopol": "Sonoma",
  "Sonoma": "Sonoma",
  "Windsor": "Sonoma",

  // Stanislaus County
  "Ceres": "Stanislaus",
  "Hughson": "Stanislaus",
  "Modesto": "Stanislaus",
  "Newman": "Stanislaus",
  "Oakdale": "Stanislaus",
  "Patterson": "Stanislaus",
  "Riverbank": "Stanislaus",
  "Turlock": "Stanislaus",
  "Waterford": "Stanislaus",

  // Sutter County
  "Live Oak": "Sutter",
  "Yuba City": "Sutter",

  // Tehama County
  "Corning": "Tehama",
  "Red Bluff": "Tehama",
  "Tehama": "Tehama",

  // Trinity County (no incorporated cities)

  // Tulare County
  "Dinuba": "Tulare",
  "Exeter": "Tulare",
  "Farmersville": "Tulare",
  "Lindsay": "Tulare",
  "Porterville": "Tulare",
  "Tulare": "Tulare",
  "Visalia": "Tulare",
  "Woodlake": "Tulare",

  // Tuolumne County
  "Sonora": "Tuolumne",

  // Ventura County
  "Camarillo": "Ventura",
  "Fillmore": "Ventura",
  "Moorpark": "Ventura",
  "Ojai": "Ventura",
  "Oxnard": "Ventura",
  "Port Hueneme": "Ventura",
  "Santa Paula": "Ventura",
  "Simi Valley": "Ventura",
  "Thousand Oaks": "Ventura",
  "Ventura": "Ventura",

  // Yolo County
  "Davis": "Yolo",
  "West Sacramento": "Yolo",
  "Winters": "Yolo",
  "Woodland": "Yolo",

  // Yuba County
  "Marysville": "Yuba",
  "Wheatland": "Yuba"
};

// Populations for California communities
const populations = {
  "Los Angeles": 3898747,
  "San Diego": 1386932,
  "San Jose": 1013240,
  "San Francisco": 873965,
  "Fresno": 542107,
  "Sacramento": 524943,
  "Long Beach": 466742,
  "Oakland": 433031,
  "Bakersfield": 403455,
  "Anaheim": 350365,
  "Santa Ana": 310227,
  "Riverside": 314998,
  "Stockton": 320554,
  "Irvine": 307670,
  "Chula Vista": 275487,
  "Fremont": 230504,
  "San Bernardino": 222101,
  "Modesto": 218464,
  "Fontana": 214547,
  "Moreno Valley": 212751,
  "Santa Clarita": 228673,
  "Glendale": 196543,
  "Huntington Beach": 198711,
  "Garden Grove": 172646,
  "Oceanside": 176193,
  "Rancho Cucamonga": 177751,
  "Santa Rosa": 178127,
  "Ontario": 175265,
  "Elk Grove": 176124,
  "Corona": 157136,
  "Lancaster": 173516,
  "Palmdale": 169450,
  "Salinas": 163542,
  "Pomona": 151713,
  "Hayward": 162954,
  "Escondido": 151038,
  "Sunnyvale": 155805,
  "Torrance": 144430,
  "Pasadena": 138699,
  "Orange": 139911,
  "Fullerton": 139132,
  "Thousand Oaks": 126966,
  "Roseville": 147773,
  "Concord": 129295,
  "Simi Valley": 126871,
  "Santa Clara": 127647,
  "Victorville": 134810,
  "Vallejo": 121253,
  "Berkeley": 124321,
  "El Monte": 113475,
  "Downey": 111772,
  "Costa Mesa": 112265,
  "Inglewood": 107762,
  "Carlsbad": 114746,
  "San Buenaventura": 109106,
  "Fairfield": 119881,
  "West Covina": 106098,
  "Murrieta": 113326,
  "Richmond": 116448,
  "Norwalk": 105549,
  "Antioch": 115291,
  "Temecula": 110003,
  "Burbank": 107337,
  "Daly City": 104739,
  "Rialto": 104026,
  "El Cajon": 106215,
  "San Mateo": 105661,
  "Clovis": 120124,
  "Compton": 97877,
  "Jurupa Valley": 111721,
  "Vista": 101659,
  "South Gate": 95677,
  "Mission Viejo": 95290,
  "Vacaville": 103078,
  "Carson": 95713,
  "Hesperia": 99818,
  "Santa Maria": 109988,
  "Redding": 92477,
  "Westminster": 91137,
  "Santa Monica": 93076,
  "Chico": 101475,
  "Newport Beach": 85239,
  "San Leandro": 91079,
  "San Marcos": 97479,
  "Whittier": 87306,
  "Hawthorne": 88083,
  "Citrus Heights": 87796,
  "Alhambra": 83089,
  "Tracy": 93052,
  "Livermore": 90189,
  "Buena Park": 82155,
  "Menifee": 102527,
  "Hemet": 90574,
  "Lakewood": 80048,
  "Merced": 86333,
  "Chino": 91403,
  "Indio": 92539,
  "Redwood City": 84292,
  "Lake Forest": 85623,
  "Napa": 79068,
  "Tustin": 80276,
  "Bellflower": 79293,
  "Mountain View": 82376,
  "Chino Hills": 83853,
  "Baldwin Park": 77069,
  "Alameda": 79177,
  "Upland": 79799,
  "San Ramon": 84564,
  "Folsom": 82203,
  "Pleasanton": 79975,
  "Lynwood": 72828,
  "Union City": 74261,
  "Apple Valley": 75791,
  "Redlands": 73168,
  "Turlock": 73631,
  "Perris": 78153,
  "Manteca": 84527,
  "Milpitas": 80430,
  "Lodi": 68256,
  "San Luis Obispo": 47339,
  "Davis": 66850,
  "Gilroy": 59520,
  "Palm Desert": 53275,
  "Walnut Creek": 70127,
  "Madera": 65654,
  "Pico Rivera": 62942,
  "Pittsburg": 75846,
  "Brentwood": 63282,
  "La Habra": 62183,
  "Montebello": 62640,
  "Encinitas": 62007,
  "Palm Springs": 48518,
  "Monterey Park": 60269,
  "Gardena": 61024,
  "National City": 61394,
  "Rocklin": 70681,
  "Petaluma": 60552,
  "Arcadia": 56681,
  "Camarillo": 70741,
  "La Mesa": 60707,
  "San Rafael": 61318,
  "Fountain Valley": 56707,
  "Huntington Park": 57509,
  "Eastvale": 69757,
  "Santee": 60037,
  "Cathedral City": 54897,
  "Dublin": 72589,
  "La Quinta": 41748,
  "Covina": 48508,
  "Novato": 55372,
  "Diamond Bar": 55720,
  "Azusa": 50050,
  "Rancho Cordova": 79325,
  "Lompoc": 44444,
  "Porterville": 62623,
  "Yorba Linda": 68336,
  "Lincoln": 49348,
  "Poway": 49417,
  "San Clemente": 65040,
  "Delano": 53195,
  "Coachella": 45703,
  "Highland": 56924,
  "Laguna Niguel": 65428,
  "Santa Barbara": 88665,
  "Yuba City": 68747,
  "San Jacinto": 53373,
  "Lake Elsinore": 70265,
  "Woodland": 62553,
  "Tulare": 67834,
  "Colton": 54828,
  "Visalia": 141384,
  "Placentia": 52206,
  "Monrovia": 37931,
  "Glendora": 52558,
  "Cupertino": 60170,
  "Aliso Viejo": 51372,
  "Rosemead": 54561,
  "Cypress": 49575,
  "San Dimas": 35300,
  "Laguna Hills": 31572,
  "La Verne": 33505,
  "Cerritos": 49936,
  "Yucaipa": 54542,
  "Beaumont": 51063,
  "Morgan Hill": 46752,
  "Los Gatos": 33529,
  "Rancho Santa Margarita": 49228,
  "Campbell": 42466,
  "Ceres": 49857,
  "San Juan Capistrano": 36821,
  "Dana Point": 33107,
  "Palo Alto": 68572,
  "Stanton": 38027,
  "Oakley": 44219,
  "Seal Beach": 24168,
  "Saratoga": 31051,
  "Paramount": 54980,
  "Hollister": 42275,
  "Atascadero": 30576,
  "Danville": 44368,
  "Los Altos": 30531,
  "Moorpark": 37588,
  "West Sacramento": 53519,
  "Barstow": 24931,
  "Newark": 48155,
  "South Pasadena": 26150,
  "La Mirada": 48008,
  "Temple City": 36094,
  "Arroyo Grande": 18129,
  "San Bruno": 44663,
  "Benicia": 28158,
  "Brea": 47325,
  "Oxnard": 202063,
  "Oroville": 20042,
  "Wildomar": 37229,
  "Sanger": 27068,
  "Ridgecrest": 29040,
  "Clayton": 11585,
  "Laguna Beach": 22827,
  "Mill Valley": 14395,
  "Arvin": 21592,
  "Calexico": 40155,
  "El Centro": 44158,
  "Banning": 31125,
  "Reedley": 26352,
  "Brawley": 26560,
  "Patterson": 23310,
  "Coronado": 24697,
  "Lemon Grove": 27437,
  "Selma": 24627,
  "Maricopa": 1180,
  "Tehachapi": 12520,
  "Lemoore": 26475,
  "Hanford": 59052,
  "Atwater": 31595,
  "Los Banos": 44509,
  "Dinuba": 25077,
  "Exeter": 10745,
  "Lindsay": 12842,
  "Portola Valley": 4568,
  "Grover Beach": 13532,
  "Imperial Beach": 27578,
  "Solana Beach": 13296,
  "La Palma": 15568,
  "El Paso de Robles": 32046,
  "Duarte": 22016,
  "Fillmore": 16105,
  "Ojai": 7613,
  "Santa Paula": 30637,
  "Port Hueneme": 22892,
  "Half Moon Bay": 12573,
  "Foster City": 34494,
  "Parlier": 15828,
  "Kerman": 15256,
  "Mendota": 12738,
  "Huron": 7298,
  "Fowler": 6677,
  "Firebaugh": 8383,
  "Coalinga": 17166,
  "Orange Cove": 10019,
  "Riverbank": 25851,
  "Oakdale": 22983,
  "Hughson": 7545,
  "Newman": 12618,
  "Waterford": 8832,
  "Corcoran": 22829,
  "Avenal": 14534,
  "Livingston": 15056,
  "Gustine": 5748,
  "Dos Palos": 5061,
  "Lathrop": 28001,
  "Ripon": 16771,
  "Escalon": 7549,
  "Grass Valley": 13617,
  "Nevada City": 3068,
  "Truckee": 16697,
  "Dixon": 21017,
  "Suisun City": 29783,
  "Rio Vista": 10648,
  "Willows": 6163,
  "Orland": 8295,
  "Corning": 7860,
  "Red Bluff": 14375,
  "Susanville": 14659,
  "Portola": 1851,
  "Bishop": 3879,
  "Weed": 2877,
  "Mount Shasta": 3278,
  "Yreka": 7765,
  "Dunsmuir": 1623,
  "Etna": 737,
  "Fort Jones": 839,
  "Montague": 1439,
  "Dorris": 939,
  "Tulelake": 1010,
  "Alturas": 2627,
  "Crescent City": 6673,
  "Eureka": 26938,
  "Arcata": 18849,
  "Fortuna": 12821,
  "Rio Dell": 3368,
  "Ferndale": 1371,
  "Blue Lake": 1224,
  "Trinidad": 367,
  "Ukiah": 16607,
  "Willits": 5073,
  "Fort Bragg": 7273,
  "Point Arena": 449,
  "Anderson": 11606,
  "Shasta Lake": 10164,
  "Paradise": 26218,
  "Gridley": 7194,
  "Biggs": 1821,
  "Placerville": 10747,
  "South Lake Tahoe": 22236,
  "Auburn": 14788,
  "Colfax": 2005,
  "Loomis": 6802,
  "Jackson": 4651,
  "Sutter Creek": 2501,
  "Plymouth": 1005,
  "Ione": 8256,
  "Amador City": 185,
  "Angels Camp": 3836,
  "Colusa": 6247,
  "Williams": 5353,
  "Clearlake": 15250,
  "Lakeport": 4753,
  "Chowchilla": 19137,
  "Sonora": 4903,
  "Morro Bay": 10439,
  "Pismo Beach": 8065,
  "Mammoth Lakes": 7996,
  "American Canyon": 21807,
  "Calistoga": 5280,
  "St. Helena": 5814,
  "Yountville": 2933,
  "Live Oak": 8874,
  "Marysville": 12664,
  "Wheatland": 3759,
  "Winters": 7793,
  "Monterey": 30218,
  "Pacific Grove": 15284,
  "Marina": 22359,
  "Seaside": 34076,
  "Del Rey Oaks": 1687,
  "Sand City": 407,
  "Carmel-by-the-Sea": 3897,
  "Gonzales": 8584,
  "Greenfield": 17904,
  "King City": 14107,
  "Soledad": 25738,
  "Galt": 26854,
  "Isleton": 804,
  "Hollister": 42275,
  "San Juan Bautista": 2014,
  "Watsonville": 53796,
  "Capitola": 10006,
  "Scotts Valley": 12224,
  "Belvedere": 2068,
  "Corte Madera": 10014,
  "Fairfax": 7629,
  "Larkspur": 12597,
  "Ross": 2415,
  "San Anselmo": 12753,
  "Sausalito": 7106,
  "Tiburon": 9234,
  "Brisbane": 4851,
  "Colma": 1518,
  "East Palo Alto": 29593,
  "Hillsborough": 11466,
  "Millbrae": 22998,
  "Pacifica": 38812,
  "Woodside": 5579,
  "Atherton": 7060,
  "Belmont": 28276,
  "Burlingame": 30576,
  "Menlo Park": 35254,
  "San Carlos": 30147,
  "South San Francisco": 67789,
  "Cloverdale": 9137,
  "Cotati": 7553,
  "Healdsburg": 12053,
  "Rohnert Park": 43954,
  "Sebastopol": 7707,
  "Sonoma": 11054,
  "Windsor": 28230,
  "Buellton": 5276,
  "Carpinteria": 13385,
  "Goleta": 32723,
  "Guadalupe": 7654,
  "Solvang": 5926,
  "Tehama": 418,
  "Woodlake": 8150,
  "Farmersville": 11560,
  "Hercules": 26489,
  "Pinole": 19343,
  "El Cerrito": 25112,
  "Orinda": 19935,
  "Moraga": 17053,
  "Lafayette": 25857,
  "Pleasant Hill": 34799,
  "Martinez": 38402,
  "Westmorland": 2306,
  "Holtville": 6399,
  "Calipatria": 7705,
  "Desert Hot Springs": 32512,
  "Shafter": 21500,
  "Taft": 9545,
  "Wasco": 28464,
  "McFarland": 15613,
  "California City": 14120,
  "Canyon Lake": 11105,
  "Calimesa": 10072,
  "Norco": 26512,
  "Indian Wells": 5453,
  "Rancho Mirage": 18528,
  "Artesia": 16522,
  "Bell": 35662,
  "Bell Gardens": 42419,
  "Bradbury": 1069,
  "Cudahy": 23805,
  "Commerce": 12738,
  "Hawaiian Gardens": 14254,
  "Hidden Hills": 1856,
  "Industry": 219,
  "Irwindale": 1422,
  "La Canada Flintridge": 20318,
  "La Habra Heights": 5318,
  "La Puente": 39816,
  "Lawndale": 33352,
  "Lomita": 20256,
  "Maywood": 27395,
  "Rolling Hills": 1739,
  "Rolling Hills Estates": 8139,
  "San Fernando": 24931,
  "San Gabriel": 40275,
  "San Marino": 13048,
  "Sierra Madre": 10917,
  "Signal Hill": 11691,
  "South El Monte": 20018,
  "Vernon": 112,
  "Walnut": 29172,
  "West Hollywood": 35357,
  "Westlake Village": 8288,
  "Malibu": 12645,
  "Palos Verdes Estates": 13438,
  "Piedmont": 11454,
  "Emeryville": 12086,
  "Los Altos Hills": 8496,
  "Monte Sereno": 3488,
  "Adelanto": 38046,
  "Big Bear Lake": 5279,
  "Grand Terrace": 12664,
  "Loma Linda": 24791,
  "Montclair": 40085,
  "Needles": 4956,
  "Twentynine Palms": 28065,
  "Yucca Valley": 22054,
  "Villa Park": 5812,
  "Los Alamitos": 11529,
  "Laguna Woods": 16223
};

// Business categories for California
const businessCategories = [
  "Restaurant", "Mexican Restaurant", "Sushi", "Thai Food", "Vietnamese", "Chinese Restaurant",
  "Italian Restaurant", "Cafe", "Coffee Shop", "Bakery", "Bar", "Brewery", "Wine Bar",
  "Bank", "Credit Union", "Gas Station", "Convenience Store", "Grocery Store", "Supermarket",
  "Pharmacy", "Hardware Store", "Auto Repair", "Car Dealership", "Tire Shop", "Oil Change",
  "Hair Salon", "Barbershop", "Spa", "Nail Salon", "Dentist", "Doctor", "Clinic", "Hospital",
  "Chiropractor", "Optometrist", "Veterinarian", "Insurance Agency", "Real Estate", "Attorney",
  "Accountant", "Tax Service", "Dry Cleaner", "Laundromat", "Fitness Center", "Gym", "Yoga Studio",
  "Pet Store", "Pet Grooming", "Florist", "Pizza", "Fast Food", "Taco Shop",
  "Hotel", "Motel", "Furniture Store", "Electronics Store", "Phone Repair",
  "Surf Shop", "Bike Shop", "Outdoor Store", "Landscaping", "Pool Service",
  "HVAC", "Plumber", "Electrician", "Roofing", "Solar Installation", "Tech Startup"
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
    const prefixes = [townName, "California", "Golden State", "Pacific", "Bay Area", "SoCal", "NorCal", "West Coast", "Sunset"];
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

for (const [townName, county] of Object.entries(californiaTowns)) {
  const slug = slugify(townName) + '-ca';

  // Skip if already exists
  if (fs.existsSync(path.join(townsDir, `${slug}.json`))) {
    continue;
  }

  const population = populations[townName] || Math.floor(Math.random() * 15000) + 1000;

  // Count towns per county
  countyCounts[county] = (countyCounts[county] || 0) + 1;

  // Generate businesses based on population
  let businessCount;
  if (population > 1000000) businessCount = 200;
  else if (population > 500000) businessCount = 175;
  else if (population > 200000) businessCount = 150;
  else if (population > 100000) businessCount = 125;
  else if (population > 50000) businessCount = 100;
  else if (population > 20000) businessCount = 75;
  else if (population > 10000) businessCount = 50;
  else if (population > 5000) businessCount = 35;
  else if (population > 2000) businessCount = 25;
  else if (population > 500) businessCount = 15;
  else businessCount = 10;

  const businesses = generateBusinesses(townName, businessCount, "CA");
  totalBusinesses += businesses.length;

  // Create town data JSON
  const townData = {
    name: townName,
    state: "California",
    state_abbr: "CA",
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
title: "${townName}, CA Business Directory"
type: "towns"
slug: "${slug}"
state: "ca"
town_data: "${slug}"
---
`;

  fs.writeFileSync(path.join(contentDir, `${slug}.md`), content);

  townCount++;
  console.log(`Created: ${townName}, ${county} County (pop: ${population.toLocaleString()}, ${businesses.length} businesses)`);
}

// Create state content page
const stateContent = `---
title: "California Business Directory"
slug: "ca"
state: "ca"
state_name: "California"
---
`;
fs.writeFileSync(path.join(statesDir, 'ca.md'), stateContent);

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${townCount} towns/cities, ${totalBusinesses.toLocaleString()} businesses`);
console.log(`\nCounties: ${Object.keys(countyCounts).length}`);
for (const [county, count] of Object.entries(countyCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${county}: ${count} communities`);
}
