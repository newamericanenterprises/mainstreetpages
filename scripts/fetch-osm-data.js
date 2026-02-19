const https = require('https');
const fs = require('fs');
const path = require('path');

const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

// Map OSM tags to human-readable categories
const categoryMap = {
  // Amenity
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  bar: 'Bar',
  pub: 'Pub',
  fast_food: 'Fast Food',
  bank: 'Bank',
  pharmacy: 'Pharmacy',
  hospital: 'Hospital',
  clinic: 'Clinic',
  doctors: 'Doctor',
  dentist: 'Dentist',
  veterinary: 'Veterinary',
  school: 'School',
  library: 'Library',
  post_office: 'Post Office',
  fuel: 'Gas Station',
  car_wash: 'Car Wash',
  car_repair: 'Auto Repair',
  parking: 'Parking',
  place_of_worship: 'Place of Worship',
  theatre: 'Theatre',
  cinema: 'Cinema',
  nightclub: 'Nightclub',
  gym: 'Gym',
  community_centre: 'Community Center',
  social_facility: 'Social Services',
  childcare: 'Childcare',

  // Shop
  supermarket: 'Supermarket',
  convenience: 'Convenience Store',
  bakery: 'Bakery',
  butcher: 'Butcher',
  grocery: 'Grocery Store',
  deli: 'Deli',
  clothes: 'Clothing Store',
  shoes: 'Shoe Store',
  jewelry: 'Jewelry Store',
  electronics: 'Electronics Store',
  hardware: 'Hardware Store',
  furniture: 'Furniture Store',
  car: 'Car Dealership',
  car_repair: 'Auto Repair',
  car_parts: 'Auto Parts',
  bicycle: 'Bicycle Shop',
  beauty: 'Beauty Salon',
  hairdresser: 'Hair Salon',
  optician: 'Optician',
  florist: 'Florist',
  gift: 'Gift Shop',
  books: 'Bookstore',
  alcohol: 'Liquor Store',
  tobacco: 'Tobacco Shop',
  laundry: 'Laundromat',
  dry_cleaning: 'Dry Cleaning',
  mobile_phone: 'Mobile Phone Store',
  computer: 'Computer Store',
  department_store: 'Department Store',
  mall: 'Shopping Mall',
  variety_store: 'Variety Store',
  pet: 'Pet Store',
  toys: 'Toy Store',
  sports: 'Sporting Goods',
  outdoor: 'Outdoor Store',
  music: 'Music Store',
  photo: 'Photo Store',
  tattoo: 'Tattoo Parlor',
  pawnbroker: 'Pawn Shop',

  // Office
  lawyer: 'Law Office',
  accountant: 'Accountant',
  insurance: 'Insurance',
  estate_agent: 'Real Estate',
  employment_agency: 'Employment Agency',
  travel_agent: 'Travel Agency',
  notary: 'Notary',
  tax_advisor: 'Tax Advisor',
  financial: 'Financial Services',

  // Craft
  plumber: 'Plumber',
  electrician: 'Electrician',
  hvac: 'HVAC',
  carpenter: 'Carpenter',
  painter: 'Painter',
  roofer: 'Roofer',
  locksmith: 'Locksmith',

  // Tourism
  hotel: 'Hotel',
  motel: 'Motel',
  guest_house: 'Guest House',
  hostel: 'Hostel',
  museum: 'Museum',
  attraction: 'Attraction',

  // Healthcare
  hospital: 'Hospital',
  clinic: 'Clinic',
  doctors: 'Doctor',
  dentist: 'Dentist',
  pharmacy: 'Pharmacy'
};

// Overpass QL query for Trenton, NJ (nested area to ensure we get NJ, not MI)
const overpassQuery = `
[out:json][timeout:60];
area["name"="New Jersey"]["admin_level"="4"]->.state;
area["name"="Trenton"]["admin_level"="8"]["boundary"="administrative"](area.state)->.searchArea;
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

function getCategory(tags) {
  // Check each tag type in order of specificity
  const tagTypes = ['shop', 'amenity', 'office', 'craft', 'tourism', 'healthcare'];

  for (const tagType of tagTypes) {
    if (tags[tagType]) {
      const value = tags[tagType];
      if (categoryMap[value]) {
        return categoryMap[value];
      }
      // Skip generic "yes" values
      if (value === 'yes') continue;
      // Capitalize first letter if no mapping exists
      return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
    }
  }
  return 'Business';
}

function formatAddress(tags) {
  const parts = [];

  if (tags['addr:housenumber'] && tags['addr:street']) {
    parts.push(`${tags['addr:housenumber']} ${tags['addr:street']}`);
  } else if (tags['addr:street']) {
    parts.push(tags['addr:street']);
  }

  parts.push('Trenton');
  parts.push('NJ');

  if (tags['addr:postcode']) {
    parts[parts.length - 1] += ` ${tags['addr:postcode']}`;
  }

  return parts.join(', ');
}

function formatPhone(phone) {
  if (!phone) return null;

  // Clean up phone number
  let cleaned = phone.replace(/[^\d+]/g, '');

  // Format US phone numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone; // Return original if can't format
}

function fetchOverpassData() {
  return new Promise((resolve, reject) => {
    const postData = `data=${encodeURIComponent(overpassQuery)}`;

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

    console.log('Querying Overpass API for Trenton, NJ businesses...');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request failed: ${e.message}`));
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    const data = await fetchOverpassData();

    if (!data.elements || data.elements.length === 0) {
      console.log('No data returned from Overpass API');
      return;
    }

    console.log(`Raw results from OSM: ${data.elements.length} elements`);

    // Process elements into businesses
    const businesses = data.elements
      .filter(el => el.tags && el.tags.name) // Filter out entries without name
      .filter(el => {
        // Filter out non-NJ entries (NJ zip codes start with 08)
        const postcode = el.tags['addr:postcode'];
        if (postcode) {
          // Exclude if zip code doesn't start with 08 (NJ)
          return postcode.startsWith('08');
        }
        // Keep entries without a postcode (we'll show them as Trenton, NJ)
        return true;
      })
      .map(el => {
        const tags = el.tags;
        return {
          name: tags.name,
          category: getCategory(tags),
          address: formatAddress(tags),
          phone: formatPhone(tags.phone) || null,
          website: tags.website || tags['contact:website'] || null
        };
      })
      // Remove duplicates based on name + address
      .filter((business, index, self) =>
        index === self.findIndex(b => b.name === business.name && b.address === business.address)
      )
      // Sort by category, then by name
      .sort((a, b) => {
        const catCompare = a.category.localeCompare(b.category);
        if (catCompare !== 0) return catCompare;
        return a.name.localeCompare(b.name);
      });

    // Clean up null values for cleaner JSON
    const cleanedBusinesses = businesses.map(b => {
      const cleaned = { name: b.name, category: b.category, address: b.address };
      if (b.phone) cleaned.phone = b.phone;
      if (b.website) cleaned.website = b.website;
      return cleaned;
    });

    // Build the town data object
    const townData = {
      name: 'Trenton',
      state: 'New Jersey',
      state_abbr: 'NJ',
      county: 'Mercer',
      population: 90871,
      slug: 'trenton-nj',
      businesses: cleanedBusinesses
    };

    // Write to file
    const outputPath = path.join(__dirname, '..', 'data', 'towns', 'trenton-nj.json');
    fs.writeFileSync(outputPath, JSON.stringify(townData, null, 2));

    console.log(`\nSuccessfully saved ${cleanedBusinesses.length} businesses to ${outputPath}`);

    // Log category breakdown
    const categories = {};
    cleanedBusinesses.forEach(b => {
      categories[b.category] = (categories[b.category] || 0) + 1;
    });

    console.log('\nBusinesses by category:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count}`);
      });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
