"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { Ticket } from "lucide-react";

export default function BilletsPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="billets" icon={<Ticket size={28} />} />;
}
