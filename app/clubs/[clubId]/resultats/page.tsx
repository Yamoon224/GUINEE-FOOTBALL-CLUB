"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { Trophy } from "lucide-react";

export default function ResultatsPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="resultats" icon={<Trophy size={28} />} />;
}
