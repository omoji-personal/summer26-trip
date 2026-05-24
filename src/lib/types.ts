// Trip overview
export interface Traveler {
  name: string;
  legs: string[];
}

export interface Trip {
  title: string;
  route: string[];
  dates: { start: string; end: string };
  totalDays: number;
  travelers: Traveler[];
}

// Flight / Transport
export interface FlightSegment {
  flight: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  class: string;
}

export interface Flight {
  leg: number;
  label: string;
  from: string;
  to: string;
  date: string;
  segments: FlightSegment[];
  confirmation: string;
  passengers: string[];
  airline: string;
  price: string | null;
  seat?: string;
  seats?: Record<string, string>;
  includes?: string;
  notes?: string;
}

// Hotel
export interface NightlyRate {
  date: string;
  rate: string;
}

export interface Hotel {
  id: string;
  destination: string;
  name: string;
  stars: number;
  type: "hotel";
  adultOnly?: boolean;
  adultAge?: number;
  bookingCode: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: string;
  breakfast: string;
  welcome?: string;
  totalPrice: string;
  payment: string;
  cancellation: string;
  address: string;
  phone: string;
  nightlyBreakdown?: NightlyRate[];
  parking?: string;
  airportTransfer?: string;
  rentalCarNote?: string;
}

// Airbnb
export interface Airbnb {
  id: string;
  destination: string;
  name: string;
  type: "airbnb";
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  nights: number;
  guests: string;
  notes?: string;
}

// Car Rental
export interface CarRentalLocation {
  date: string;
  time: string;
  location: string;
}

export interface CarRental {
  id: string;
  destination: string;
  company: string;
  vehicle: string;
  vehicleClass: string;
  confirmation: string;
  pickUp: CarRentalLocation;
  dropOff: CarRentalLocation;
  duration: string;
  capacity: string;
  totalPrice: string;
  priceBreakdown: string;
  paymentNote: string;
  notes?: string;
}

// Open Items
export interface OpenItem {
  id: number;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  deadline: string | null;
}

// Itinerary (top-level)
export interface Itinerary {
  flights: Flight[];
  hotels: Hotel[];
  airbnbs: Airbnb[];
  carRentals: CarRental[];
  openItems: OpenItem[];
}

// Destination data
export interface SpecialNote {
  title: string;
  body: string;
}

export interface Activity {
  name: string;
  description: string;
  tags: string[];
}

export interface Restaurant {
  name: string;
  location?: string;
  vibe: string;
  price: string | null;
  bookRequired: boolean;
  bookHow: string | null;
  tags: string[];
}

export interface Bar {
  name: string;
  location?: string;
  vibe: string;
  tags: string[];
}

export interface Coffee {
  name: string;
  vibe: string;
}

export interface Beach {
  name: string;
  driveTime: string;
  vibe: string;
}

export interface DayTrip {
  name: string;
  driveTime: string;
  highlights: string;
}

export interface WeeklyMarket {
  market: string;
  day: string;
  date: string;
}

export interface MidsommarOpen {
  venue: string;
  type: string;
}

export interface CookingNight {
  title: string;
  market: string;
  shoppingList: string[];
  instructions: string;
}

export interface CretanWine {
  winery: string;
  signature: string;
  notes: string;
}

export interface BookingPriority {
  restaurant: string;
  how: string;
  why: string;
}

export interface Accommodation {
  type: "hotel" | "airbnb" | "family" | "transit";
  name: string;
  details: string | null;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  emoji: string;
  region?: string;
  dates: { arrive: string; depart: string };
  nights: number;
  accommodation: Accommodation;
  travelers: string[];
  vibe: string;
  highlights: string[];
  specialNotes: SpecialNote[];
  confirmedOpenMidsommar?: MidsommarOpen[];
  weeklyMarkets?: WeeklyMarket[];
  activities: Activity[];
  restaurants: Restaurant[];
  bars: Bar[];
  coffee: Coffee[];
  beaches: Beach[];
  dayTrips: DayTrip[];
  cookingNight?: CookingNight;
  wines?: CretanWine[];
  bookingPriorities: BookingPriority[];
}
