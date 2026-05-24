import type { Metadata } from "next";
import TripPage from "@/components/TripPage";
import { CRETE_PAGE } from "@/lib/page-config";

export const metadata: Metadata = {
  title: "Crete — Jul 2-7, 2026",
  description:
    "Chania region: villa, beaches, restaurants, day trips. 5 nights.",
};

export default function CretePage() {
  return <TripPage config={CRETE_PAGE} />;
}
