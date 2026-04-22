"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { CalendarDays } from "lucide-react";

export default function CalendrierPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="calendrier" icon={<CalendarDays size={28} />} />;
}
