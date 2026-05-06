"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { ChevronLeft, MapPin, CalendarDays, Ticket } from "lucide-react";

const clubData: Record<string, { nom: string; acronyme: string; logo: string; hero: string; color: string; colorDark: string }> = {
  jag: { nom: "Jaguar Académie Guinée", acronyme: "JAG", logo: "/images/jag-logo.png", hero: "/images/jag-hero.png", color: "#CC0000", colorDark: "#990000" },
  atletico: { nom: "Club Atlético de Colèah", acronyme: "Atlético", logo: "/images/atletico-logo.png", hero: "/images/atletico-hero.png", color: "#F5B800", colorDark: "#C9950A" },
};

type TypePlace = "Tribune" | "Pelouse" | "VIP" | "Loge";
type BilletInfo = { type: TypePlace; prix: string; disponible: number; total: number };
type MatchBillets = { matchId: number; adversaire: string; date: string; competition: string; stade: string; categorie: string; billets: BilletInfo[] };

const billetsData: Record<string, MatchBillets[]> = {
  jag: [
    {
      matchId: 1,
      adversaire: "FC Kakimbo",
      date: "2025-05-10",
      competition: "Ligue des Académies",
      stade: "Stade du 28 Septembre",
      categorie: "Juniors",
      billets: [
        { type: "Tribune", prix: "20 000 GNF", disponible: 500, total: 500 },
        { type: "VIP", prix: "80 000 GNF", disponible: 50, total: 50 },
      ],
    },
  ],
  atletico: [
    {
      matchId: 7,
      adversaire: "Kaloum Star",
      date: "2025-05-11",
      competition: "Championnat Guinée",
      stade: "Stade Général Lansana Conté",
      categorie: "Seniors",
      billets: [
        { type: "Tribune", prix: "30 000 GNF", disponible: 1000, total: 1000 },
        { type: "VIP", prix: "100 000 GNF", disponible: 100, total: 100 },
        { type: "Loge", prix: "200 000 GNF", disponible: 20, total: 20 },
      ],
    },
  ],
};

const typeIcons: Record<TypePlace, string> = { Tribune: "🏟️", Pelouse: "🌿", VIP: "⭐", Loge: "💎" };

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function stockPercent(dispo: number, total: number) {
  return Math.round((dispo / total) * 100);
}

export default function BilletsPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  const { locale } = useLocale();
  const club = clubData[clubId] ?? clubData.jag;
  const matches = billetsData[clubId] ?? [];

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
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">{locale === "fr" ? "Billets" : "Tickets"}</p>
              <h1 className="text-white font-black text-xl sm:text-2xl leading-tight">{club.nom}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {matches.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">{locale === "fr" ? "Aucun billet disponible." : "No tickets available."}</p>
        ) : (
          <div className="flex flex-col gap-8">
            {matches.map((m) => (
              <div key={m.matchId}>
                {/* Match info */}
                <div className="bg-card border border-border rounded-t-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><CalendarDays size={11} />{formatDate(m.date, locale)}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{m.stade}</span>
                    </div>
                    <h2 className="font-black text-foreground text-lg leading-tight">
                      {club.acronyme} <span className="text-muted-foreground font-normal text-sm mx-1">vs</span> {m.adversaire}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.competition} &bull; {m.categorie}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-sm text-xs font-bold border" style={{ color: club.color, borderColor: club.color }}>
                    <Ticket size={11} /> {locale === "fr" ? "Match à domicile" : "Home game"}
                  </span>
                </div>

                {/* Ticket types */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border border-t-0 rounded-b-sm overflow-hidden">
                  {m.billets.map((b) => {
                    const pct = stockPercent(b.disponible, b.total);
                    const stockColor = pct > 50 ? "#16a34a" : pct > 20 ? "#ca8a04" : "#dc2626";
                    return (
                      <div key={b.type} className="bg-card px-5 py-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{typeIcons[b.type]}</span>
                          <h3 className="font-black text-foreground">{b.type}</h3>
                        </div>
                        <p className="font-black text-2xl text-foreground mb-1">{b.prix}</p>
                        {/* Stock bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{b.disponible} {locale === "fr" ? "places" : "seats"}</span>
                            <span style={{ color: stockColor }}>{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: stockColor }} />
                          </div>
                        </div>
                        <button
                          className="w-full text-white text-sm font-bold py-2 rounded-sm transition-opacity hover:opacity-85"
                          style={{ backgroundColor: club.color }}
                        >
                          {locale === "fr" ? "Réserver" : "Book now"}
                        </button>
                      </div>
                    );
                  })}
                </div>
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
