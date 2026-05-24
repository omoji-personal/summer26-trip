import type { Metadata } from "next";
import TripPage from "@/components/TripPage";
import { FAMILY_PAGE } from "@/lib/page-config";

export const metadata: Metadata = {
  title: "Paris & Mallorca — Jun 23 - Jul 2, 2026",
  description:
    "Paris neighborhoods and dining, Mallorca beaches and day trips. 9 days with family.",
};

export default function FamilyPage() {
  return <TripPage config={FAMILY_PAGE} />;
}
