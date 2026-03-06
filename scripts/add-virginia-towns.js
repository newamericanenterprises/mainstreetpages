import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Virginia municipalities with their counties (or Independent City status)
const virginiaTowns = {
  // Independent Cities (38 total)
  "Virginia Beach": "Independent City",
  "Norfolk": "Independent City",
  "Chesapeake": "Independent City",
  "Richmond": "Independent City",
  "Newport News": "Independent City",
  "Alexandria": "Independent City",
  "Hampton": "Independent City",
  "Roanoke": "Independent City",
  "Portsmouth": "Independent City",
  "Suffolk": "Independent City",
  "Lynchburg": "Independent City",
  "Harrisonburg": "Independent City",
  "Charlottesville": "Independent City",
  "Fredericksburg": "Independent City",
  "Danville": "Independent City",
  "Manassas": "Independent City",
  "Manassas Park": "Independent City",
  "Winchester": "Independent City",
  "Salem": "Independent City",
  "Staunton": "Independent City",
  "Waynesboro": "Independent City",
  "Hopewell": "Independent City",
  "Petersburg": "Independent City",
  "Colonial Heights": "Independent City",
  "Radford": "Independent City",
  "Bristol": "Independent City",
  "Williamsburg": "Independent City",
  "Fairfax": "Independent City",
  "Falls Church": "Independent City",
  "Martinsville": "Independent City",
  "Poquoson": "Independent City",
  "Lexington": "Independent City",
  "Buena Vista": "Independent City",
  "Covington": "Independent City",
  "Galax": "Independent City",
  "Emporia": "Independent City",
  "Franklin": "Independent City",
  "Norton": "Independent City",

  // Arlington County
  "Arlington": "Arlington",
  "Ballston": "Arlington",
  "Clarendon": "Arlington",
  "Crystal City": "Arlington",
  "Rosslyn": "Arlington",
  "Shirlington": "Arlington",

  // Fairfax County
  "Annandale": "Fairfax",
  "Burke": "Fairfax",
  "Centreville": "Fairfax",
  "Chantilly": "Fairfax",
  "Clifton": "Fairfax",
  "Dunn Loring": "Fairfax",
  "Fairfax Station": "Fairfax",
  "Great Falls": "Fairfax",
  "Herndon": "Fairfax",
  "Lorton": "Fairfax",
  "McLean": "Fairfax",
  "Merrifield": "Fairfax",
  "Mount Vernon": "Fairfax",
  "Oakton": "Fairfax",
  "Reston": "Fairfax",
  "Springfield": "Fairfax",
  "Tysons": "Fairfax",
  "Vienna": "Fairfax",
  "West Springfield": "Fairfax",
  "Woodbridge": "Prince William",

  // Loudoun County
  "Ashburn": "Loudoun",
  "Dulles": "Loudoun",
  "Hamilton": "Loudoun",
  "Hillsboro": "Loudoun",
  "Leesburg": "Loudoun",
  "Lovettsville": "Loudoun",
  "Middleburg": "Loudoun",
  "Paeonian Springs": "Loudoun",
  "Purcellville": "Loudoun",
  "Round Hill": "Loudoun",
  "South Riding": "Loudoun",
  "Sterling": "Loudoun",
  "Waterford": "Loudoun",

  // Prince William County
  "Dale City": "Prince William",
  "Dumfries": "Prince William",
  "Gainesville": "Prince William",
  "Haymarket": "Prince William",
  "Lake Ridge": "Prince William",
  "Montclair": "Prince William",
  "Occoquan": "Prince William",
  "Quantico": "Prince William",
  "Triangle": "Prince William",
  "Nokesville": "Prince William",

  // Stafford County
  "Stafford": "Stafford",
  "Aquia Harbour": "Stafford",
  "Falmouth": "Stafford",

  // Spotsylvania County
  "Spotsylvania": "Spotsylvania",
  "Massaponax": "Spotsylvania",
  "Chancellorsville": "Spotsylvania",
  "Thornburg": "Spotsylvania",

  // Henrico County
  "Glen Allen": "Henrico",
  "Highland Springs": "Henrico",
  "Innsbrook": "Henrico",
  "Lakeside": "Henrico",
  "Sandston": "Henrico",
  "Short Pump": "Henrico",
  "Tuckahoe": "Henrico",
  "Varina": "Henrico",

  // Chesterfield County
  "Bon Air": "Chesterfield",
  "Chester": "Chesterfield",
  "Midlothian": "Chesterfield",
  "Brandermill": "Chesterfield",
  "Woodlake": "Chesterfield",
  "Moseley": "Chesterfield",
  "Enon": "Chesterfield",

  // Hanover County
  "Ashland": "Hanover",
  "Mechanicsville": "Hanover",
  "Doswell": "Hanover",
  "Montpelier": "Hanover",
  "Beaverdam": "Hanover",

  // Albemarle County
  "Crozet": "Albemarle",
  "Earlysville": "Albemarle",
  "Ivy": "Albemarle",
  "Keswick": "Albemarle",
  "North Garden": "Albemarle",
  "Scottsville": "Albemarle",
  "Batesville": "Albemarle",

  // Augusta County
  "Fishersville": "Augusta",
  "Stuarts Draft": "Augusta",
  "Verona": "Augusta",
  "Weyers Cave": "Augusta",
  "Crimora": "Augusta",
  "Churchville": "Augusta",
  "Craigsville": "Augusta",
  "Deerfield": "Augusta",
  "Middlebrook": "Augusta",
  "Mount Sidney": "Augusta",
  "New Hope": "Augusta",

  // Rockingham County
  "Bridgewater": "Rockingham",
  "Broadway": "Rockingham",
  "Dayton": "Rockingham",
  "Elkton": "Rockingham",
  "Grottoes": "Rockingham",
  "Mount Crawford": "Rockingham",
  "Timberville": "Rockingham",
  "Singers Glen": "Rockingham",
  "Penn Laird": "Rockingham",
  "McGaheysville": "Rockingham",
  "Keezletown": "Rockingham",

  // Shenandoah County
  "Edinburg": "Shenandoah",
  "Mount Jackson": "Shenandoah",
  "New Market": "Shenandoah",
  "Strasburg": "Shenandoah",
  "Toms Brook": "Shenandoah",
  "Woodstock": "Shenandoah",

  // Frederick County
  "Stephens City": "Frederick",
  "Middletown": "Frederick",
  "Cross Junction": "Frederick",
  "Clear Brook": "Frederick",
  "Gore": "Frederick",
  "White Hall": "Frederick",

  // Warren County
  "Front Royal": "Warren",
  "Linden": "Warren",
  "Bentonville": "Warren",

  // Clarke County
  "Berryville": "Clarke",
  "Boyce": "Clarke",
  "Millwood": "Clarke",
  "White Post": "Clarke",

  // Fauquier County
  "Warrenton": "Fauquier",
  "Marshall": "Fauquier",
  "Remington": "Fauquier",
  "The Plains": "Fauquier",
  "Catlett": "Fauquier",
  "Bealeton": "Fauquier",
  "New Baltimore": "Fauquier",
  "Orlean": "Fauquier",

  // Rappahannock County
  "Washington": "Rappahannock",
  "Sperryville": "Rappahannock",
  "Amissville": "Rappahannock",
  "Flint Hill": "Rappahannock",

  // Culpeper County
  "Culpeper": "Culpeper",
  "Brandy Station": "Culpeper",
  "Lignum": "Culpeper",
  "Mitchells": "Culpeper",

  // Madison County
  "Madison": "Madison",
  "Etlan": "Madison",
  "Syria": "Madison",
  "Wolftown": "Madison",

  // Orange County
  "Orange": "Orange",
  "Gordonsville": "Orange",
  "Barboursville": "Orange",
  "Locust Grove": "Orange",
  "Unionville": "Orange",

  // Greene County
  "Stanardsville": "Greene",
  "Ruckersville": "Greene",
  "Dyke": "Greene",

  // Nelson County
  "Lovingston": "Nelson",
  "Arrington": "Nelson",
  "Faber": "Nelson",
  "Gladstone": "Nelson",
  "Massies Mill": "Nelson",
  "Nellysford": "Nelson",
  "Roseland": "Nelson",
  "Schuyler": "Nelson",
  "Shipman": "Nelson",
  "Wintergreen": "Nelson",

  // Amherst County
  "Amherst": "Amherst",
  "Madison Heights": "Amherst",
  "Monroe": "Amherst",
  "Sweet Briar": "Amherst",

  // Bedford County
  "Bedford": "Bedford",
  "Big Island": "Bedford",
  "Forest": "Bedford",
  "Goode": "Bedford",
  "Moneta": "Bedford",
  "Montvale": "Bedford",
  "Thaxton": "Bedford",

  // Campbell County
  "Altavista": "Campbell",
  "Brookneal": "Campbell",
  "Concord": "Campbell",
  "Evington": "Campbell",
  "Gladys": "Campbell",
  "Rustburg": "Campbell",

  // Appomattox County
  "Appomattox": "Appomattox",
  "Pamplin": "Appomattox",
  "Spout Spring": "Appomattox",

  // Buckingham County
  "Buckingham": "Buckingham",
  "Dillwyn": "Buckingham",
  "Arvonia": "Buckingham",

  // Fluvanna County
  "Palmyra": "Fluvanna",
  "Columbia": "Fluvanna",
  "Fork Union": "Fluvanna",
  "Kents Store": "Fluvanna",
  "Troy": "Fluvanna",

  // Louisa County
  "Louisa": "Louisa",
  "Mineral": "Louisa",
  "Trevilians": "Louisa",
  "Bumpass": "Louisa",

  // Goochland County
  "Goochland": "Goochland",
  "Manakin-Sabot": "Goochland",
  "Oilville": "Goochland",
  "Crozier": "Goochland",

  // Powhatan County
  "Powhatan": "Powhatan",
  "Tobaccoville": "Powhatan",

  // Amelia County
  "Amelia Court House": "Amelia",
  "Jetersville": "Amelia",
  "Mannboro": "Amelia",

  // Cumberland County
  "Cumberland": "Cumberland",
  "Cartersville": "Cumberland",

  // Prince Edward County
  "Farmville": "Prince Edward",
  "Green Bay": "Prince Edward",
  "Prospect": "Prince Edward",
  "Rice": "Prince Edward",

  // Charlotte County
  "Charlotte Court House": "Charlotte",
  "Drakes Branch": "Charlotte",
  "Keysville": "Charlotte",
  "Phenix": "Charlotte",
  "Randolph": "Charlotte",

  // Halifax County
  "South Boston": "Halifax",
  "Halifax": "Halifax",
  "Scottsburg": "Halifax",
  "Virgilina": "Halifax",
  "Nathalie": "Halifax",
  "Clover": "Halifax",

  // Mecklenburg County
  "South Hill": "Mecklenburg",
  "Boydton": "Mecklenburg",
  "Bracey": "Mecklenburg",
  "Chase City": "Mecklenburg",
  "Clarksville": "Mecklenburg",
  "La Crosse": "Mecklenburg",
  "Baskerville": "Mecklenburg",

  // Brunswick County
  "Lawrenceville": "Brunswick",
  "Alberta": "Brunswick",
  "Brodnax": "Brunswick",
  "Gasburg": "Brunswick",

  // Greensville County
  "Jarratt": "Greensville",
  "Skippers": "Greensville",

  // Southampton County
  "Courtland": "Southampton",
  "Boykins": "Southampton",
  "Branchville": "Southampton",
  "Capron": "Southampton",
  "Ivor": "Southampton",
  "Newsoms": "Southampton",

  // Isle of Wight County
  "Smithfield": "Isle of Wight",
  "Windsor": "Isle of Wight",
  "Carrollton": "Isle of Wight",

  // Surry County
  "Surry": "Surry",
  "Dendron": "Surry",
  "Claremont": "Surry",

  // Sussex County
  "Waverly": "Sussex",
  "Stony Creek": "Sussex",
  "Wakefield": "Sussex",
  "Yale": "Sussex",

  // Prince George County
  "Prince George": "Prince George",
  "Disputanta": "Prince George",

  // Dinwiddie County
  "Dinwiddie": "Dinwiddie",
  "McKenney": "Dinwiddie",
  "Sutherland": "Dinwiddie",

  // Nottoway County
  "Blackstone": "Nottoway",
  "Crewe": "Nottoway",
  "Burkeville": "Nottoway",

  // Lunenburg County
  "Kenbridge": "Lunenburg",
  "Victoria": "Lunenburg",

  // Pittsylvania County
  "Chatham": "Pittsylvania",
  "Gretna": "Pittsylvania",
  "Hurt": "Pittsylvania",
  "Dry Fork": "Pittsylvania",
  "Ringgold": "Pittsylvania",
  "Callands": "Pittsylvania",
  "Blairs": "Pittsylvania",

  // Henry County
  "Collinsville": "Henry",
  "Fieldale": "Henry",
  "Ridgeway": "Henry",
  "Bassett": "Henry",
  "Axton": "Henry",
  "Spencer": "Henry",

  // Patrick County
  "Stuart": "Patrick",
  "Meadows of Dan": "Patrick",
  "Woolwine": "Patrick",
  "Ararat": "Patrick",

  // Franklin County
  "Rocky Mount": "Franklin",
  "Boones Mill": "Franklin",
  "Ferrum": "Franklin",
  "Callaway": "Franklin",
  "Wirtz": "Franklin",
  "Union Hall": "Franklin",
  "Penhook": "Franklin",

  // Floyd County
  "Floyd": "Floyd",
  "Check": "Floyd",
  "Copper Hill": "Floyd",
  "Indian Valley": "Floyd",
  "Willis": "Floyd",

  // Montgomery County
  "Blacksburg": "Montgomery",
  "Christiansburg": "Montgomery",
  "Shawsville": "Montgomery",
  "Elliston": "Montgomery",
  "Riner": "Montgomery",

  // Pulaski County
  "Pulaski": "Pulaski",
  "Dublin": "Pulaski",
  "Fairlawn": "Pulaski",
  "Newbern": "Pulaski",
  "Draper": "Pulaski",
  "Hiwassee": "Pulaski",

  // Giles County
  "Pearisburg": "Giles",
  "Narrows": "Giles",
  "Glen Lyn": "Giles",
  "Pembroke": "Giles",
  "Newport": "Giles",

  // Craig County
  "New Castle": "Craig",
  "Paint Bank": "Craig",

  // Roanoke County
  "Cave Spring": "Roanoke",
  "Hollins": "Roanoke",
  "Vinton": "Roanoke",
  "Catawba": "Roanoke",

  // Botetourt County
  "Fincastle": "Botetourt",
  "Blue Ridge": "Botetourt",
  "Buchanan": "Botetourt",
  "Daleville": "Botetourt",
  "Eagle Rock": "Botetourt",
  "Troutville": "Botetourt",

  // Rockbridge County
  "Glasgow": "Rockbridge",
  "Goshen": "Rockbridge",
  "Natural Bridge": "Rockbridge",
  "Raphine": "Rockbridge",
  "Fairfield": "Rockbridge",
  "Brownsburg": "Rockbridge",
  "Steeles Tavern": "Rockbridge",

  // Alleghany County
  "Clifton Forge": "Alleghany",
  "Iron Gate": "Alleghany",
  "Low Moor": "Alleghany",
  "Callaghan": "Alleghany",

  // Bath County
  "Warm Springs": "Bath",
  "Hot Springs": "Bath",
  "Millboro": "Bath",
  "Burnsville": "Bath",

  // Highland County
  "Monterey": "Highland",
  "McDowell": "Highland",
  "Blue Grass": "Highland",

  // Tazewell County
  "Tazewell": "Tazewell",
  "Bluefield": "Tazewell",
  "Cedar Bluff": "Tazewell",
  "Claypool Hill": "Tazewell",
  "North Tazewell": "Tazewell",
  "Pocahontas": "Tazewell",
  "Richlands": "Tazewell",

  // Bland County
  "Bland": "Bland",
  "Bastian": "Bland",
  "Rocky Gap": "Bland",

  // Wythe County
  "Wytheville": "Wythe",
  "Rural Retreat": "Wythe",
  "Max Meadows": "Wythe",
  "Fort Chiswell": "Wythe",

  // Smyth County
  "Marion": "Smyth",
  "Chilhowie": "Smyth",
  "Saltville": "Smyth",
  "Sugar Grove": "Smyth",
  "Atkins": "Smyth",

  // Washington County
  "Abingdon": "Washington",
  "Damascus": "Washington",
  "Emory": "Washington",
  "Glade Spring": "Washington",
  "Meadowview": "Washington",

  // Russell County
  "Lebanon": "Russell",
  "Honaker": "Russell",
  "Cleveland": "Russell",
  "Castlewood": "Russell",
  "Swords Creek": "Russell",
  "St. Paul": "Russell",

  // Scott County
  "Gate City": "Scott",
  "Clinchport": "Scott",
  "Dungannon": "Scott",
  "Duffield": "Scott",
  "Nickelsville": "Scott",
  "Weber City": "Scott",

  // Lee County
  "Jonesville": "Lee",
  "Pennington Gap": "Lee",
  "St. Charles": "Lee",
  "Dryden": "Lee",
  "Ewing": "Lee",
  "Rose Hill": "Lee",
  "Ben Hur": "Lee",

  // Wise County
  "Wise": "Wise",
  "Big Stone Gap": "Wise",
  "Coeburn": "Wise",
  "Pound": "Wise",
  "Appalachia": "Wise",
  "St. Paul": "Wise",

  // Dickenson County
  "Clintwood": "Dickenson",
  "Haysi": "Dickenson",
  "Clinchco": "Dickenson",
  "Nora": "Dickenson",

  // Buchanan County
  "Grundy": "Buchanan",
  "Hurley": "Buchanan",
  "Vansant": "Buchanan",
  "Council": "Buchanan",
  "Pilgrims Knob": "Buchanan",

  // New Kent County
  "New Kent": "New Kent",
  "Providence Forge": "New Kent",
  "Quinton": "New Kent",
  "Lanexa": "New Kent",

  // Charles City County
  "Charles City": "Charles City",
  "Ruthville": "Charles City",

  // James City County
  "Toano": "James City",
  "Norge": "James City",
  "Lightfoot": "James City",
  "Grove": "James City",

  // York County
  "Yorktown": "York",
  "Seaford": "York",
  "Grafton": "York",
  "Tabb": "York",
  "Lackey": "York",

  // Gloucester County
  "Gloucester": "Gloucester",
  "Gloucester Point": "Gloucester",
  "Hayes": "Gloucester",
  "Ordinary": "Gloucester",
  "White Marsh": "Gloucester",

  // Mathews County
  "Mathews": "Mathews",
  "Hudgins": "Mathews",
  "Cobbs Creek": "Mathews",

  // Middlesex County
  "Saluda": "Middlesex",
  "Deltaville": "Middlesex",
  "Hartfield": "Middlesex",
  "Urbanna": "Middlesex",

  // Essex County
  "Tappahannock": "Essex",
  "Dunnsville": "Essex",
  "Champlain": "Essex",

  // King and Queen County
  "King and Queen Court House": "King and Queen",
  "St. Stephens Church": "King and Queen",
  "Mattaponi": "King and Queen",

  // King William County
  "King William": "King William",
  "Aylett": "King William",
  "West Point": "King William",
  "Manquin": "King William",

  // Richmond County
  "Warsaw": "Richmond",
  "Farnham": "Richmond",

  // Westmoreland County
  "Montross": "Westmoreland",
  "Colonial Beach": "Westmoreland",
  "Oak Grove": "Westmoreland",
  "Kinsale": "Westmoreland",

  // Northumberland County
  "Heathsville": "Northumberland",
  "Callao": "Northumberland",
  "Burgess": "Northumberland",
  "Kilmarnock": "Northumberland",
  "Reedville": "Northumberland",
  "Wicomico Church": "Northumberland",

  // Lancaster County
  "Lancaster": "Lancaster",
  "Irvington": "Lancaster",
  "White Stone": "Lancaster",
  "Weems": "Lancaster",

  // Accomack County
  "Accomac": "Accomack",
  "Chincoteague": "Accomack",
  "Onancock": "Accomack",
  "Onley": "Accomack",
  "Painter": "Accomack",
  "Parksley": "Accomack",
  "Saxis": "Accomack",
  "Tangier": "Accomack",
  "Wachapreague": "Accomack",
  "Bloxom": "Accomack",
  "Hallwood": "Accomack",
  "Melfa": "Accomack",

  // Northampton County
  "Cape Charles": "Northampton",
  "Cheriton": "Northampton",
  "Eastville": "Northampton",
  "Exmore": "Northampton",
  "Nassawadox": "Northampton",
  "Machipongo": "Northampton",

  // Caroline County
  "Bowling Green": "Caroline",
  "Port Royal": "Caroline",
  "Milford": "Caroline",
  "Ruther Glen": "Caroline",
  "Ladysmith": "Caroline",

  // King George County
  "King George": "King George",
  "Dahlgren": "King George",
  "Passapatanzy": "King George",

  // Hanover County (additional)
  "Cold Harbor": "Hanover",
  "Studley": "Hanover",

  // Additional Northern Virginia
  "Bristow": "Prince William",
  "Catharpin": "Prince William",
  "Independent Hill": "Prince William",
  "Manassas Junction": "Prince William",

  // Additional Shenandoah Valley
  "Luray": "Page",
  "Stanley": "Page",
  "Shenandoah": "Page",
  "Rileyville": "Page",
  "Alma": "Page"
};

// Population data for Virginia municipalities
const populations = {
  "Virginia Beach": 459470,
  "Norfolk": 244076,
  "Chesapeake": 249422,
  "Richmond": 226610,
  "Newport News": 186247,
  "Alexandria": 159467,
  "Hampton": 137148,
  "Roanoke": 100011,
  "Portsmouth": 97915,
  "Suffolk": 94324,
  "Lynchburg": 82168,
  "Harrisonburg": 54033,
  "Charlottesville": 46553,
  "Fredericksburg": 29879,
  "Danville": 40044,
  "Manassas": 41764,
  "Manassas Park": 17478,
  "Winchester": 28078,
  "Salem": 25301,
  "Staunton": 25750,
  "Waynesboro": 22630,
  "Hopewell": 22529,
  "Petersburg": 33458,
  "Colonial Heights": 17411,
  "Radford": 18249,
  "Bristol": 16762,
  "Williamsburg": 15425,
  "Fairfax": 24483,
  "Falls Church": 14617,
  "Martinsville": 12554,
  "Poquoson": 12271,
  "Lexington": 7446,
  "Buena Vista": 6478,
  "Covington": 5538,
  "Galax": 6347,
  "Emporia": 5665,
  "Franklin": 8582,
  "Norton": 3904,
  "Arlington": 238643,
  "Ballston": 25000,
  "Clarendon": 18000,
  "Crystal City": 16500,
  "Rosslyn": 13000,
  "Shirlington": 8000,
  "Annandale": 43543,
  "Burke": 46805,
  "Centreville": 75191,
  "Chantilly": 23039,
  "Clifton": 282,
  "Dunn Loring": 8544,
  "Fairfax Station": 12030,
  "Great Falls": 16865,
  "Herndon": 24571,
  "Lorton": 20988,
  "McLean": 53050,
  "Merrifield": 18000,
  "Mount Vernon": 14950,
  "Oakton": 36889,
  "Reston": 65000,
  "Springfield": 33350,
  "Tysons": 27000,
  "Vienna": 16922,
  "West Springfield": 24040,
  "Woodbridge": 54275,
  "Ashburn": 56000,
  "Dulles": 32300,
  "Hamilton": 748,
  "Hillsboro": 102,
  "Leesburg": 59076,
  "Lovettsville": 2530,
  "Middleburg": 795,
  "Paeonian Springs": 215,
  "Purcellville": 10063,
  "Round Hill": 800,
  "South Riding": 33800,
  "Sterling": 30552,
  "Waterford": 235,
  "Dale City": 71422,
  "Dumfries": 5921,
  "Gainesville": 16261,
  "Haymarket": 2268,
  "Lake Ridge": 44750,
  "Montclair": 21000,
  "Occoquan": 1354,
  "Quantico": 480,
  "Triangle": 9729,
  "Nokesville": 1600,
  "Stafford": 3986,
  "Aquia Harbour": 2200,
  "Falmouth": 4500,
  "Spotsylvania": 6000,
  "Massaponax": 8000,
  "Chancellorsville": 400,
  "Thornburg": 500,
  "Glen Allen": 15000,
  "Highland Springs": 15000,
  "Innsbrook": 8000,
  "Lakeside": 12400,
  "Sandston": 7571,
  "Short Pump": 27000,
  "Tuckahoe": 48000,
  "Varina": 10000,
  "Bon Air": 16700,
  "Chester": 22350,
  "Midlothian": 68620,
  "Brandermill": 13000,
  "Woodlake": 4000,
  "Moseley": 6000,
  "Enon": 2000,
  "Ashland": 7500,
  "Mechanicsville": 37000,
  "Doswell": 350,
  "Montpelier": 200,
  "Beaverdam": 200,
  "Crozet": 7191,
  "Earlysville": 1000,
  "Ivy": 1500,
  "Keswick": 800,
  "North Garden": 400,
  "Scottsville": 600,
  "Batesville": 250,
  "Fishersville": 9000,
  "Stuarts Draft": 11000,
  "Verona": 4500,
  "Weyers Cave": 2000,
  "Crimora": 2500,
  "Churchville": 250,
  "Craigsville": 900,
  "Deerfield": 120,
  "Middlebrook": 200,
  "Mount Sidney": 350,
  "New Hope": 200,
  "Bridgewater": 6000,
  "Broadway": 3691,
  "Dayton": 1530,
  "Elkton": 2792,
  "Grottoes": 2668,
  "Mount Crawford": 448,
  "Timberville": 2522,
  "Singers Glen": 300,
  "Penn Laird": 2000,
  "McGaheysville": 1200,
  "Keezletown": 500,
  "Edinburg": 1041,
  "Mount Jackson": 2094,
  "New Market": 2146,
  "Strasburg": 6894,
  "Toms Brook": 173,
  "Woodstock": 5245,
  "Stephens City": 2117,
  "Middletown": 1328,
  "Cross Junction": 450,
  "Clear Brook": 300,
  "Gore": 100,
  "White Hall": 250,
  "Front Royal": 15244,
  "Linden": 300,
  "Bentonville": 200,
  "Berryville": 4338,
  "Boyce": 564,
  "Millwood": 200,
  "White Post": 150,
  "Warrenton": 10001,
  "Marshall": 2468,
  "Remington": 639,
  "The Plains": 266,
  "Catlett": 143,
  "Bealeton": 3625,
  "New Baltimore": 300,
  "Orlean": 150,
  "Washington": 135,
  "Sperryville": 300,
  "Amissville": 250,
  "Flint Hill": 300,
  "Culpeper": 20175,
  "Brandy Station": 200,
  "Lignum": 150,
  "Mitchells": 100,
  "Madison": 238,
  "Etlan": 100,
  "Syria": 100,
  "Wolftown": 150,
  "Orange": 5002,
  "Gordonsville": 1583,
  "Barboursville": 500,
  "Locust Grove": 3000,
  "Unionville": 200,
  "Stanardsville": 470,
  "Ruckersville": 1200,
  "Dyke": 100,
  "Lovingston": 460,
  "Arrington": 300,
  "Faber": 200,
  "Gladstone": 200,
  "Massies Mill": 100,
  "Nellysford": 800,
  "Roseland": 400,
  "Schuyler": 459,
  "Shipman": 300,
  "Wintergreen": 450,
  "Amherst": 2231,
  "Madison Heights": 11584,
  "Monroe": 250,
  "Sweet Briar": 500,
  "Bedford": 6222,
  "Big Island": 750,
  "Forest": 11000,
  "Goode": 2000,
  "Moneta": 2500,
  "Montvale": 600,
  "Thaxton": 300,
  "Altavista": 3450,
  "Brookneal": 1117,
  "Concord": 350,
  "Evington": 350,
  "Gladys": 200,
  "Rustburg": 1400,
  "Appomattox": 2009,
  "Pamplin": 221,
  "Spout Spring": 250,
  "Buckingham": 500,
  "Dillwyn": 435,
  "Arvonia": 200,
  "Palmyra": 109,
  "Columbia": 60,
  "Fork Union": 300,
  "Kents Store": 200,
  "Troy": 100,
  "Louisa": 1876,
  "Mineral": 470,
  "Trevilians": 100,
  "Bumpass": 500,
  "Goochland": 800,
  "Manakin-Sabot": 1500,
  "Oilville": 300,
  "Crozier": 100,
  "Powhatan": 1500,
  "Tobaccoville": 200,
  "Amelia Court House": 1100,
  "Jetersville": 500,
  "Mannboro": 150,
  "Cumberland": 300,
  "Cartersville": 250,
  "Farmville": 8216,
  "Green Bay": 150,
  "Prospect": 200,
  "Rice": 300,
  "Charlotte Court House": 577,
  "Drakes Branch": 443,
  "Keysville": 812,
  "Phenix": 215,
  "Randolph": 150,
  "South Boston": 7997,
  "Halifax": 1309,
  "Scottsburg": 200,
  "Virgilina": 200,
  "Nathalie": 200,
  "Clover": 400,
  "South Hill": 4541,
  "Boydton": 431,
  "Bracey": 400,
  "Chase City": 2347,
  "Clarksville": 1139,
  "La Crosse": 604,
  "Baskerville": 150,
  "Lawrenceville": 1438,
  "Alberta": 308,
  "Brodnax": 228,
  "Gasburg": 150,
  "Jarratt": 617,
  "Skippers": 350,
  "Courtland": 1290,
  "Boykins": 561,
  "Branchville": 259,
  "Capron": 178,
  "Ivor": 339,
  "Newsoms": 300,
  "Smithfield": 8089,
  "Windsor": 2626,
  "Carrollton": 6800,
  "Surry": 220,
  "Dendron": 283,
  "Claremont": 356,
  "Waverly": 2309,
  "Stony Creek": 186,
  "Wakefield": 1027,
  "Yale": 100,
  "Prince George": 800,
  "Disputanta": 400,
  "Dinwiddie": 369,
  "McKenney": 476,
  "Sutherland": 200,
  "Blackstone": 3621,
  "Crewe": 2326,
  "Burkeville": 436,
  "Kenbridge": 1257,
  "Victoria": 1735,
  "Chatham": 1320,
  "Gretna": 1265,
  "Hurt": 1280,
  "Dry Fork": 4000,
  "Ringgold": 300,
  "Callands": 150,
  "Blairs": 250,
  "Collinsville": 7477,
  "Fieldale": 715,
  "Ridgeway": 750,
  "Bassett": 1041,
  "Axton": 1024,
  "Spencer": 200,
  "Stuart": 1407,
  "Meadows of Dan": 400,
  "Woolwine": 200,
  "Ararat": 200,
  "Rocky Mount": 4799,
  "Boones Mill": 254,
  "Ferrum": 800,
  "Callaway": 600,
  "Wirtz": 500,
  "Union Hall": 400,
  "Penhook": 350,
  "Floyd": 432,
  "Check": 100,
  "Copper Hill": 200,
  "Indian Valley": 300,
  "Willis": 250,
  "Blacksburg": 44847,
  "Christiansburg": 22163,
  "Shawsville": 1300,
  "Elliston": 1000,
  "Riner": 750,
  "Pulaski": 8828,
  "Dublin": 2709,
  "Fairlawn": 3000,
  "Newbern": 1387,
  "Draper": 500,
  "Hiwassee": 200,
  "Pearisburg": 2636,
  "Narrows": 2029,
  "Glen Lyn": 110,
  "Pembroke": 1152,
  "Newport": 432,
  "New Castle": 135,
  "Paint Bank": 50,
  "Cave Spring": 25000,
  "Hollins": 15000,
  "Vinton": 8098,
  "Catawba": 300,
  "Fincastle": 355,
  "Blue Ridge": 3500,
  "Buchanan": 1178,
  "Daleville": 4500,
  "Eagle Rock": 300,
  "Troutville": 437,
  "Glasgow": 1113,
  "Goshen": 355,
  "Natural Bridge": 200,
  "Raphine": 150,
  "Fairfield": 200,
  "Brownsburg": 150,
  "Steeles Tavern": 100,
  "Clifton Forge": 3884,
  "Iron Gate": 388,
  "Low Moor": 292,
  "Callaghan": 150,
  "Warm Springs": 300,
  "Hot Springs": 700,
  "Millboro": 120,
  "Burnsville": 100,
  "Monterey": 145,
  "McDowell": 200,
  "Blue Grass": 150,
  "Tazewell": 4627,
  "Bluefield": 5444,
  "Cedar Bluff": 1079,
  "Claypool Hill": 2037,
  "North Tazewell": 1200,
  "Pocahontas": 386,
  "Richlands": 5823,
  "Bland": 391,
  "Bastian": 200,
  "Rocky Gap": 150,
  "Wytheville": 8211,
  "Rural Retreat": 1547,
  "Max Meadows": 300,
  "Fort Chiswell": 200,
  "Marion": 5968,
  "Chilhowie": 1832,
  "Saltville": 2185,
  "Sugar Grove": 600,
  "Atkins": 350,
  "Abingdon": 8191,
  "Damascus": 814,
  "Emory": 350,
  "Glade Spring": 1457,
  "Meadowview": 800,
  "Lebanon": 3403,
  "Honaker": 1465,
  "Cleveland": 250,
  "Castlewood": 2000,
  "Swords Creek": 450,
  "St. Paul": 990,
  "Gate City": 2159,
  "Clinchport": 70,
  "Dungannon": 325,
  "Duffield": 88,
  "Nickelsville": 378,
  "Weber City": 1412,
  "Jonesville": 930,
  "Pennington Gap": 1781,
  "St. Charles": 117,
  "Dryden": 300,
  "Ewing": 350,
  "Rose Hill": 750,
  "Ben Hur": 200,
  "Wise": 2970,
  "Big Stone Gap": 5614,
  "Coeburn": 2047,
  "Pound": 1046,
  "Appalachia": 1754,
  "Clintwood": 1312,
  "Haysi": 516,
  "Clinchco": 350,
  "Nora": 200,
  "Grundy": 967,
  "Hurley": 200,
  "Vansant": 600,
  "Council": 200,
  "Pilgrims Knob": 150,
  "New Kent": 300,
  "Providence Forge": 1500,
  "Quinton": 600,
  "Lanexa": 500,
  "Charles City": 100,
  "Ruthville": 100,
  "Toano": 3500,
  "Norge": 1000,
  "Lightfoot": 1500,
  "Grove": 500,
  "Yorktown": 195,
  "Seaford": 2500,
  "Grafton": 7000,
  "Tabb": 12000,
  "Lackey": 500,
  "Gloucester": 2500,
  "Gloucester Point": 10000,
  "Hayes": 3000,
  "Ordinary": 350,
  "White Marsh": 250,
  "Mathews": 900,
  "Hudgins": 250,
  "Cobbs Creek": 200,
  "Saluda": 600,
  "Deltaville": 700,
  "Hartfield": 500,
  "Urbanna": 477,
  "Tappahannock": 2388,
  "Dunnsville": 300,
  "Champlain": 200,
  "King and Queen Court House": 150,
  "St. Stephens Church": 200,
  "Mattaponi": 100,
  "King William": 300,
  "Aylett": 200,
  "West Point": 3292,
  "Manquin": 150,
  "Warsaw": 1513,
  "Farnham": 150,
  "Montross": 384,
  "Colonial Beach": 3542,
  "Oak Grove": 200,
  "Kinsale": 75,
  "Heathsville": 150,
  "Callao": 300,
  "Burgess": 200,
  "Kilmarnock": 1566,
  "Reedville": 250,
  "Wicomico Church": 150,
  "Lancaster": 200,
  "Irvington": 450,
  "White Stone": 348,
  "Weems": 200,
  "Accomac": 519,
  "Chincoteague": 2941,
  "Onancock": 1263,
  "Onley": 512,
  "Painter": 227,
  "Parksley": 818,
  "Saxis": 236,
  "Tangier": 436,
  "Wachapreague": 232,
  "Bloxom": 374,
  "Hallwood": 285,
  "Melfa": 436,
  "Cape Charles": 910,
  "Cheriton": 448,
  "Eastville": 276,
  "Exmore": 1472,
  "Nassawadox": 498,
  "Machipongo": 200,
  "Bowling Green": 1098,
  "Port Royal": 276,
  "Milford": 200,
  "Ruther Glen": 300,
  "Ladysmith": 400,
  "King George": 4500,
  "Dahlgren": 2000,
  "Passapatanzy": 500,
  "Cold Harbor": 200,
  "Studley": 400,
  "Bristow": 25000,
  "Catharpin": 400,
  "Independent Hill": 8000,
  "Manassas Junction": 300,
  "Luray": 4895,
  "Stanley": 1936,
  "Shenandoah": 2340,
  "Rileyville": 200,
  "Alma": 100
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
  "Seafood Restaurant", "Crab House", "Winery", "Vineyard",
  "Farm Equipment", "Storage Facility", "Towing Service", "Printing Shop", "Sign Shop",
  "Tailor", "Wedding Venue", "Event Center", "Photography Studio", "Music Store",
  "Dance Studio", "Martial Arts", "Yoga Studio", "Tattoo Parlor", "Pawn Shop",
  "Check Cashing", "Title Loan", "Tax Service", "Employment Agency", "Temp Agency",
  "Staffing Agency", "Security Company", "Cleaning Service", "Moving Company", "Roofing",
  "Siding", "Windows", "Painting", "Concrete", "Paving"
];

// Name prefixes based on Virginia regions
const namePrefixes = [
  "Old Dominion", "Virginia", "Colonial", "Shenandoah", "Tidewater",
  "Piedmont", "Blue Ridge", "Commonwealth", "Heritage", "Valley",
  "Chesapeake", "Cavalier", "Historic", "Southern", "Mountain"
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
      address: `${townName}, VA`,
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

for (const [town, county] of Object.entries(virginiaTowns)) {
  const slug = generateSlug(town);
  const population = populations[town] || 1000;
  const businesses = generateBusinesses(town, population, county);

  counties.add(county);
  totalBusinesses += businesses.length;
  townCount++;

  const townData = {
    name: town,
    state: "Virginia",
    state_abbr: "VA",
    county: county,
    population: population,
    slug: `${slug}-va`,
    businesses: businesses
  };

  fs.writeFileSync(
    path.join(dataDir, `${slug}-va.json`),
    JSON.stringify(townData, null, 2)
  );

  // CORRECT FORMAT for content files
  const mdContent = `---
title: "${town}, VA Business Directory"
type: "towns"
slug: "${slug}-va"
state: "va"
town_data: "${slug}-va"
---
`;
  fs.writeFileSync(
    path.join(contentDir, `${slug}-va.md`),
    mdContent
  );
}

// Create state page
const statesDir = path.join(__dirname, '..', 'content', 'states');
if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

const stateMd = `---
title: "Virginia Business Directory"
slug: "va"
state: "va"
state_name: "Virginia"
---
`;
fs.writeFileSync(path.join(statesDir, 'va.md'), stateMd);

console.log(`Created Virginia towns: ${townCount} municipalities`);
console.log(`Total businesses: ${totalBusinesses}`);
console.log(`Counties/Independent Cities: ${counties.size}`);
