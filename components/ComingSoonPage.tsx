"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

const clubMeta: Record<string, { nom: string; acronyme: string; logo: string; color: string }> = {
    jag: { nom: "Jaguar Académie Guinée", acronyme: "JAG", logo: "/images/jag-logo.png", color: "#CC0000" },
    atletico: { nom: "Club Atlético de Colèah", acronyme: "Atlético", logo: "/images/atletico-logo.png", color: "#F5B800" },
};

export default function ComingSoonPage({
    clubId,
    icon,
    sectionKey,
}: {
    clubId: string;
    icon: ReactNode;
    sectionKey: keyof ReturnType<typeof useLocale>["t"]["nav"];
}) {
    const { t } = useLocale();
    const club = clubMeta[clubId] ?? clubMeta.jag;
    const sectionLabel = t.nav[sectionKey] as string;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-20 flex flex-col items-center text-center">
                <div className="mb-6 flex items-center justify-center gap-2">
                    <Image src={club.logo} alt={club.nom} width={36} height={36} className="rounded-full object-cover" />
                    <span className="font-black text-foreground text-lg">{club.acronyme}</span>
                </div>

                <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center mb-6 text-white"
                    style={{ backgroundColor: club.color }}
                >
                    {icon}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3 text-balance">
                    {sectionLabel}
                </h1>
                <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                    {t.comingSoon.subtitle}
                </p>

                <div
                    className="w-full h-1 rounded-full mb-8 opacity-30"
                    style={{ backgroundColor: club.color }}
                />

                <Link
                    href={`/clubs/${clubId}`}
                    className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-sm border border-border text-foreground hover:bg-muted transition-colors"
                >
                    <ChevronLeft size={15} />
                    {t.comingSoon.back}
                </Link>
            </div>
        </div>
    );
}
