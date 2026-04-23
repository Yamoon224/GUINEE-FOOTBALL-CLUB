"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { ChevronLeft, Trophy, Medal, Star } from "lucide-react";

const clubData: Record<string, { nom: string; acronyme: string; logo: string; hero: string; color: string; colorDark: string }> = {
  jag: { nom: "Jaguar Académie Guinée", acronyme: "JAG", logo: "/images/jag-logo.jpg", hero: "/images/jag-hero.jpg", color: "#CC0000", colorDark: "#990000" },
  atletico: { nom: "Club Atlético de Colèah", acronyme: "Atlético", logo: "/images/atletico-logo.jpg", hero: "/images/atletico-hero.jpg", color: "#F5B800", colorDark: "#C9950A" },
};

type Palmares = { id: number; competition: string; annee: number; rang: string; description?: string };

const palmaresData: Record<string, Palmares[]> = {
  jag: [
    { id: 6, competition: "Ligue Guinéenne des Académies (3ᵉ éd.)", annee: 2025, rang: "Participant", description: "Première participation de la JAG à la compétition nationale des académies." },
  ],
  atletico: [
    { id: 4, competition: "Coupe Rusal", annee: 2005, rang: "1er", description: "Vainqueur de la Coupe Rusal 2005." },
    { id: 5, competition: "Trophées Areeba (1ᵉ éd.)", annee: 2007, rang: "1er", description: "Vainqueur de la 1ᵉ édition des Trophées Areeba." },
    { id: 1, competition: "Vice-championnat de Guinée", annee: 2010, rang: "2ème", description: "3 fois vice-champion national (2010-2012)." },
    { id: 2, competition: "Vice-championnat de Guinée", annee: 2011, rang: "2ème" },
    { id: 3, competition: "Vice-championnat de Guinée", annee: 2012, rang: "2ème" },
  ],
};

function getRangIcon(rang: string) {
  if (rang === "1er") return <Trophy size={22} className="text-amber-400" />;
  if (rang === "2ème") return <Medal size={22} className="text-slate-400" />;
  return <Star size={22} className="text-blue-400" />;
}
function getRangColor(rang: string) {
  if (rang === "1er") return "#F59E0B";
  if (rang === "2ème") return "#94A3B8";
  return "#60A5FA";
}

export default function PalmaresPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  const { locale } = useLocale();
  const club = clubData[clubId] ?? clubData.jag;
  const palmares = [...(palmaresData[clubId] ?? [])].sort((a, b) => b.annee - a.annee);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-40 sm:h-52 overflow-hidden" style={{ backgroundColor: club.colorDark }}>
        <Image src={club.hero} alt={club.nom} fill className="object-cover opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-6">
          <Link href={`/clubs/${clubId}`} className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-3 transition-colors w-fit">
            <ChevronLeft size={14} />{club.acronyme}
          </Link>
          <div className="flex items-center gap-3">
            <Image src={club.logo} alt={club.nom} width={44} height={44} className="rounded-full border-2 border-white/30 object-cover" />
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">{locale === "fr" ? "Palmarès" : "Honours"}</p>
              <h1 className="text-white font-black text-xl sm:text-2xl leading-tight">{club.nom}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {palmares.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">{locale === "fr" ? "Palmarès à venir." : "No honours yet."}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {palmares.map((p) => (
              <div key={p.id} className="bg-card border border-border rounded-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${getRangColor(p.rang)}20`, border: `1.5px solid ${getRangColor(p.rang)}40` }}
                  >
                    {getRangIcon(p.rang)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-xl" style={{ color: getRangColor(p.rang) }}>{p.annee}</p>
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: getRangColor(p.rang) }}>{p.rang}</p>
                  </div>
                </div>
                <h3 className="font-black text-foreground text-sm leading-tight mb-1.5">{p.competition}</h3>
                {p.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-border bg-muted/30 py-6 text-center text-muted-foreground text-sm">
        <p className="font-semibold text-foreground">{club.nom}</p>
      </footer>
    </div>
  );
}
