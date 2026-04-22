"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { Newspaper } from "lucide-react";

export default function ActualitesPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="actualites" icon={<Newspaper size={28} />} />;
}
