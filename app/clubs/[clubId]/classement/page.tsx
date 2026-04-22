"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { BarChart3 } from "lucide-react";

export default function ClassementPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="classement" icon={<BarChart3 size={28} />} />;
}
