export interface PageConfig {
  title: string;
  subtitle: string;
  route: string[];
  travelers: string[];
  destinationIds: string[];
  showFlights: boolean;
  flightFilter?: (legNum: number) => boolean;
  stripPersonalDetails: boolean;
  showDepartureFlights: boolean;
  showAthensTransit: boolean;
  openItemFilter?: (item: { priority: string; title: string }) => boolean;
  pacing?: string;
}

export const FULL_PAGE: PageConfig = {
  title: "Summer 2026 — Europe",
  subtitle: "Jun 18 — Jul 7 · 19 Days",
  route: ["Atlanta", "Stockholm", "Paris", "Mallorca", "Crete", "Athens", "Atlanta"],
  travelers: ["Omid", "Annika", "Mom", "Dad", "Friend"],
  destinationIds: ["stockholm", "paris", "mallorca", "crete"],
  showFlights: true,
  stripPersonalDetails: false,
  showDepartureFlights: true,
  showAthensTransit: true,
  pacing:
    "Pick 1-2 things per day. Leave room for wandering and spontaneity. The lists are a menu, not a checklist.",
};

export const FAMILY_PAGE: PageConfig = {
  title: "Paris & Mallorca",
  subtitle: "Jun 23 — Jul 2 · 9 Days",
  route: ["Paris", "Mallorca"],
  travelers: ["Omid", "Annika", "Mom", "Dad"],
  destinationIds: ["paris", "mallorca"],
  showFlights: true,
  flightFilter: (leg) => leg === 3,
  stripPersonalDetails: true,
  showDepartureFlights: false,
  showAthensTransit: false,
  openItemFilter: (item) => {
    const familyKeywords = [
      "easyJet",
      "Pure Salt",
      "IDP",
      "Europcar",
      "Formentor",
    ];
    return familyKeywords.some((kw) =>
      item.title.toLowerCase().includes(kw.toLowerCase())
    );
  },
  pacing: "Pick 1-2 things per day. Leave room for wandering and spontaneity.",
};

export const CRETE_PAGE: PageConfig = {
  title: "Crete",
  subtitle: "Jul 2 — Jul 7 · 5 Nights",
  route: ["Crete"],
  travelers: ["Omid", "Annika", "Friend"],
  destinationIds: ["crete"],
  showFlights: false,
  stripPersonalDetails: true,
  showDepartureFlights: false,
  showAthensTransit: false,
  openItemFilter: (item) => {
    const creteKeywords = ["Avis", "heat", "Crete", "Dounias"];
    return creteKeywords.some((kw) =>
      item.title.toLowerCase().includes(kw.toLowerCase())
    );
  },
  pacing: "Pick 1-2 things per day. Leave room for wandering and spontaneity.",
};
