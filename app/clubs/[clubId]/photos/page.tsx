"use client";
import { use } from "react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { Camera } from "lucide-react";

export default function PhotosPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  return <ComingSoonPage clubId={clubId} sectionKey="photos" icon={<Camera size={28} />} />;
}
