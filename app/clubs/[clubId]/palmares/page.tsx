"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { Medal } from "lucide-react";

export default function PalmaresPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="palmares" icon={<Medal size={28} />} />;
}
