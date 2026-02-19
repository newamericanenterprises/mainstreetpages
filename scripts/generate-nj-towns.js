const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'towns');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'towns');
const TOWNS_LIST_FILE = path.join(__dirname, '..', 'data', 'nj-towns-list.json');
const BATCH_SIZE = 20;
const RATE_LIMIT_MS = 2000;

// Map OSM tags to human-readable categories
const categoryMap = {
  restaurant: 'Restaurant', cafe: 'Cafe', bar: 'Bar', pub: 'Pub',
  fast_food: 'Fast Food', bank: 'Bank', pharmacy: 'Pharmacy',
  hospital: 'Hospital', clinic: 'Clinic', doctors: 'Doctor',
  dentist: 'Dentist', veterinary: 'Veterinary', school: 'School',
  library: 'Library', post_office: 'Post Office', fuel: 'Gas Station',
  car_wash: 'Car Wash', car_repair: 'Auto Repair', parking: 'Parking',
  place_of_worship: 'Place of Worship', theatre: 'Theatre', cinema: 'Cinema',
  nightclub: 'Nightclub', gym: 'Gym', community_centre: 'Community Center',
  social_facility: 'Social Services', childcare: 'Childcare',
  supermarket: 'Supermarket', convenience: 'Convenience Store',
  bakery: 'Bakery', butcher: 'Butcher', grocery: 'Grocery Store',
  deli: 'Deli', clothes: 'Clothing Store', shoes: 'Shoe Store',
  jewelry: 'Jewelry Store', electronics: 'Electronics Store',
  hardware: 'Hardware Store', furniture: 'Furniture Store',
  car: 'Car Dealership', car_parts: 'Auto Parts', bicycle: 'Bicycle Shop',
  beauty: 'Beauty Salon', hairdresser: 'Hair Salon', optician: 'Optician',
  florist: 'Florist', gift: 'Gift Shop', books: 'Bookstore',
  alcohol: 'Liquor Store', tobacco: 'Tobacco Shop', laundry: 'Laundromat',
  dry_cleaning: 'Dry Cleaning', mobile_phone: 'Mobile Phone Store',
  computer: 'Computer Store', department_store: 'Department Store',
  mall: 'Shopping Mall', variety_store: 'Variety Store', pet: 'Pet Store',
  toys: 'Toy Store', sports: 'Sporting Goods', outdoor: 'Outdoor Store',
  music: 'Music Store', photo: 'Photo Store', tattoo: 'Tattoo Parlor',
  pawnbroker: 'Pawn Shop', lawyer: 'Law Office', accountant: 'Accountant',
  insurance: 'Insurance', estate_agent: 'Real Estate',
  employment_agency: 'Employment Agency', travel_agent: 'Travel Agency',
  notary: 'Notary', tax_advisor: 'Tax Advisor', financial: 'Financial Services',
  plumber: 'Plumber', electrician: 'Electrician', hvac: 'HVAC',
  carpenter: 'Carpenter', painter: 'Painter', roofer: 'Roofer',
  locksmith: 'Locksmith', hotel: 'Hotel', motel: 'Motel',
  guest_house: 'Guest House', hostel: 'Hostel', museum: 'Museum',
  attraction: 'Attraction'
};

// NJ Counties for reference
const njCounties = {
  'Atlantic': 'Atlantic', 'Bergen': 'Bergen', 'Burlington': 'Burlington',
  'Camden': 'Camden', 'Cape May': 'Cape May', 'Cumberland': 'Cumberland',
  'Essex': 'Essex', 'Gloucester': 'Gloucester', 'Hudson': 'Hudson',
  'Hunterdon': 'Hunterdon', 'Mercer': 'Mercer', 'Middlesex': 'Middlesex',
  'Monmouth': 'Monmouth', 'Morris': 'Morris', 'Ocean': 'Ocean',
  'Passaic': 'Passaic', 'Salem': 'Salem', 'Somerset': 'Somerset',
  'Sussex': 'Sussex', 'Union': 'Union', 'Warren': 'Warren'
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getCategory(tags) {
  const tagTypes = ['shop', 'amenity', 'office', 'craft', 'tourism', 'healthcare'];
  for (const tagType of tagTypes) {
    if (tags[tagType]) {
      const value = tags[tagType];
      if (value === 'yes') continue;
      if (categoryMap[value]) return categoryMap[value];
      return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
    }
  }
  return 'Business';
}

function formatPhone(phone) {
  if (!phone) return "";
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

function queryOverpass(query) {
  return new Promise((resolve, reject) => {
    const postData = `data=${encodeURIComponent(query)}`;
    const options = {
      hostname: 'overpass-api.de',
      port: 443,
      path: '/api/interpreter',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', e => reject(new Error(`Request failed: ${e.message}`)));
    req.setTimeout(120000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.write(postData);
    req.end();
  });
}

async function fetchNJTownsList() {
  console.log('Fetching list of all NJ towns from OpenStreetMap...\n');

  const query = `
[out:json][timeout:120];
area["name"="New Jersey"]["admin_level"="4"]->.nj;
(
  // Get all administrative boundaries (cities, townships, boroughs, etc.)
  relation["boundary"="administrative"]["admin_level"="8"](area.nj);
);
out tags;
`;

  const data = await queryOverpass(query);

  if (!data.elements || data.elements.length === 0) {
    throw new Error('No towns found in NJ');
  }

  const towns = data.elements
    .filter(el => el.tags && el.tags.name)
    .map(el => {
      const tags = el.tags;
      const name = tags.name;
      // Clean up township/borough suffixes for slug
      const cleanName = name
        .replace(/ Township$/i, '')
        .replace(/ Borough$/i, '')
        .replace(/ City$/i, '');

      return {
        name: name,
        displayName: cleanName,
        slug: slugify(cleanName) + '-nj',
        population: tags.population ? parseInt(tags.population) : null,
        osmId: el.id,
        type: el.type
      };
    })
    .filter((town, index, self) =>
      // Remove duplicates by slug
      index === self.findIndex(t => t.slug === town.slug)
    )
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  return towns;
}

async function fetchBusinessesForTown(town) {
  const query = `
[out:json][timeout:90];
area["name"="${town.name}"]["admin_level"="8"](area["name"="New Jersey"]["admin_level"="4"])->.searchArea;
(
  node["shop"](area.searchArea);
  way["shop"](area.searchArea);
  node["amenity"~"restaurant|cafe|bar|pub|fast_food|bank|pharmacy|hospital|clinic|doctors|dentist|veterinary|fuel|car_wash|car_repair|theatre|cinema|nightclub|gym"](area.searchArea);
  way["amenity"~"restaurant|cafe|bar|pub|fast_food|bank|pharmacy|hospital|clinic|doctors|dentist|veterinary|fuel|car_wash|car_repair|theatre|cinema|nightclub|gym"](area.searchArea);
  node["office"](area.searchArea);
  way["office"](area.searchArea);
  node["craft"](area.searchArea);
  way["craft"](area.searchArea);
  node["tourism"~"hotel|motel|guest_house|hostel|museum|attraction"](area.searchArea);
  way["tourism"~"hotel|motel|guest_house|hostel|museum|attraction"](area.searchArea);
  node["healthcare"](area.searchArea);
  way["healthcare"](area.searchArea);
);
out center tags;
`;

  const data = await queryOverpass(query);

  if (!data.elements) {
    return [];
  }

  const businesses = data.elements
    .filter(el => el.tags && el.tags.name)
    .filter(el => {
      const postcode = el.tags['addr:postcode'];
      if (postcode) return postcode.startsWith('08') || postcode.startsWith('07');
      return true;
    })
    .map(el => {
      const tags = el.tags;
      const parts = [];
      if (tags['addr:housenumber'] && tags['addr:street']) {
        parts.push(`${tags['addr:housenumber']} ${tags['addr:street']}`);
      } else if (tags['addr:street']) {
        parts.push(tags['addr:street']);
      }
      parts.push(town.displayName);
      parts.push('NJ');
      if (tags['addr:postcode']) {
        parts[parts.length - 1] += ` ${tags['addr:postcode']}`;
      }

      return {
        name: tags.name,
        category: getCategory(tags),
        address: parts.join(', '),
        phone: formatPhone(tags.phone),
        email: tags.email || tags['contact:email'] || "",
        website: tags.website || tags['contact:website'] || "",
        hours: tags.opening_hours || "",
        rating: null,
        review_count: null,
        claimed: false,
        featured: false
      };
    })
    .filter((business, index, self) =>
      index === self.findIndex(b => b.name === business.name && b.address === business.address)
    )
    .sort((a, b) => {
      const catCompare = a.category.localeCompare(b.category);
      if (catCompare !== 0) return catCompare;
      return a.name.localeCompare(b.name);
    });

  return businesses;
}

function generateDataFile(town, businesses) {
  const townData = {
    name: town.displayName,
    state: "New Jersey",
    state_abbr: "NJ",
    county: null, // Would need additional query to get county
    population: town.population,
    slug: town.slug,
    businesses: businesses
  };

  const filePath = path.join(DATA_DIR, `${town.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(townData, null, 2));
  return filePath;
}

function generateContentFile(town) {
  const content = `---
title: "${town.displayName}, NJ Business Directory"
type: "towns"
slug: "${town.slug}"
state: "nj"
town_data: "${town.slug}"
---
`;

  const filePath = path.join(CONTENT_DIR, `${town.slug}.md`);
  fs.writeFileSync(filePath, content);
  return filePath;
}

async function processTown(town) {
  const dataFilePath = path.join(DATA_DIR, `${town.slug}.json`);

  // Skip if already exists
  if (fs.existsSync(dataFilePath)) {
    console.log(`Skipping ${town.displayName} (already exists)`);
    return { skipped: true, businesses: 0 };
  }

  try {
    const businesses = await fetchBusinessesForTown(town);
    generateDataFile(town, businesses);
    generateContentFile(town);
    console.log(`Processing ${town.displayName}... ${businesses.length} businesses found`);
    return { skipped: false, businesses: businesses.length };
  } catch (error) {
    console.error(`Error processing ${town.displayName}: ${error.message}`);
    return { skipped: false, businesses: 0, error: true };
  }
}

async function main() {
  // Ensure directories exist
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });

  let towns;

  // Check if we already have the towns list
  if (fs.existsSync(TOWNS_LIST_FILE)) {
    console.log('Loading existing NJ towns list...\n');
    towns = JSON.parse(fs.readFileSync(TOWNS_LIST_FILE, 'utf-8'));
  } else {
    // Fetch and save the towns list
    towns = await fetchNJTownsList();
    fs.writeFileSync(TOWNS_LIST_FILE, JSON.stringify(towns, null, 2));
    console.log(`Found ${towns.length} towns in New Jersey`);
    console.log(`Saved towns list to ${TOWNS_LIST_FILE}\n`);
  }

  console.log(`Total towns to process: ${towns.length}`);
  console.log(`Processing in batches of ${BATCH_SIZE}...\n`);

  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalBusinesses = 0;
  let totalErrors = 0;

  // Process in batches
  for (let i = 0; i < towns.length; i += BATCH_SIZE) {
    const batch = towns.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(towns.length / BATCH_SIZE);

    console.log(`\n--- Batch ${batchNum}/${totalBatches} ---\n`);

    for (const town of batch) {
      const result = await processTown(town);

      if (result.skipped) {
        totalSkipped++;
      } else if (result.error) {
        totalErrors++;
      } else {
        totalProcessed++;
        totalBusinesses += result.businesses;
      }

      // Rate limiting
      await sleep(RATE_LIMIT_MS);
    }

    // Extra pause between batches
    if (i + BATCH_SIZE < towns.length) {
      console.log('\nPausing between batches...');
      await sleep(5000);
    }
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Total towns in NJ: ${towns.length}`);
  console.log(`Towns processed: ${totalProcessed}`);
  console.log(`Towns skipped (already exist): ${totalSkipped}`);
  console.log(`Towns with errors: ${totalErrors}`);
  console.log(`Total businesses found: ${totalBusinesses}`);
  console.log('==============================\n');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
