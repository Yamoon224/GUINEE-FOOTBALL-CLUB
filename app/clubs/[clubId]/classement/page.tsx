"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { ChevronLeft } from "lucide-react";

const clubData: Record<string, { nom: string; acronyme: string; logo: string; hero: string; color: string; colorDark: string }> = {
  jag: { nom: "Jaguar Académie Guinée", acronyme: "JAG", logo: "/images/jag-logo.png", hero: "/images/jag-hero.jpg", color: "#CC0000", colorDark: "#990000" },
  atletico: { nom: "Club Atlético de Colèah", acronyme: "Atlético", logo: "/images/atletico-logo.png", hero: "/images/atletico-hero.jpg", color: "#F5B800", colorDark: "#C9950A" },
};

type Entree = { position: number; equipe: string; joues: number; victoires: number; nuls: number; defaites: number; butsPour: number; butsContre: number; points: number; isClub?: boolean };
type Groupe = { competition: string; categorie: string; saison: string; entrees: Entree[] };

const classementsData: Record<string, Groupe[]> = {
  jag: [
    {
      competition: "Ligue des Académies", categorie: "Juniors", saison: "2025",
      entrees: [
        { position: 1, equipe: "Horoya AC Academy", joues: 5, victoires: 4, nuls: 1, defaites: 0, butsPour: 12, butsContre: 3, points: 13 },
        { position: 2, equipe: "FC Kakimbo", joues: 5, victoires: 4, nuls: 0, defaites: 1, butsPour: 10, butsContre: 4, points: 12 },
        { position: 3, equipe: "JAG", joues: 5, victoires: 3, nuls: 1, defaites: 1, butsPour: 8, butsContre: 4, points: 10, isClub: true },
        { position: 4, equipe: "Hafia FC Academy", joues: 5, victoires: 2, nuls: 0, defaites: 3, butsPour: 6, butsContre: 9, points: 6 },
        { position: 5, equipe: "AS Kaloum Star", joues: 5, victoires: 0, nuls: 0, defaites: 5, butsPour: 2, butsContre: 18, points: 0 },
      ],
    },
    {
      competition: "Ligue des Académies", categorie: "Cadets", saison: "2025",
      entrees: [
        { position: 1, equipe: "Horoya AC Academy", joues: 5, victoires: 4, nuls: 1, defaites: 0, butsPour: 13, butsContre: 2, points: 13 },
        { position: 2, equipe: "JAG", joues: 5, victoires: 4, nuls: 0, defaites: 1, butsPour: 11, butsContre: 3, points: 12, isClub: true },
        { position: 3, equipe: "Satellite FC", joues: 5, victoires: 2, nuls: 1, defaites: 2, butsPour: 7, butsContre: 7, points: 7 },
        { position: 4, equipe: "Hafia FC Academy", joues: 5, victoires: 1, nuls: 0, defaites: 4, butsPour: 4, butsContre: 13, points: 3 },
        { position: 5, equipe: "AS Bananas", joues: 5, victoires: 0, nuls: 2, defaites: 3, butsPour: 3, butsContre: 13, points: 2 },
      ],
    },
  ],
  atletico: [
    {
      competition: "Championnat Guinée", categorie: "Seniors", saison: "2025",
      entrees: [
        { position: 1, equipe: "Horoya AC", joues: 8, victoires: 7, nuls: 0, defaites: 1, butsPour: 22, butsContre: 6, points: 21 },
        { position: 2, equipe: "Hafia FC", joues: 8, victoires: 6, nuls: 1, defaites: 1, butsPour: 18, butsContre: 8, points: 19 },
        { position: 3, equipe: "AS Kaloum Star", joues: 8, victoires: 5, nuls: 0, defaites: 3, butsPour: 15, butsContre: 11, points: 15 },
        { position: 4, equipe: "Atlético de Colèah", joues: 8, victoires: 4, nuls: 2, defaites: 2, butsPour: 14, butsContre: 10, points: 14, isClub: true },
        { position: 5, equipe: "Satellite FC", joues: 8, victoires: 2, nuls: 1, defaites: 5, butsPour: 9, butsContre: 16, points: 7 },
      ],
    },
    {
      competition: "Championnat Guinée", categorie: "Juniors", saison: "2025",
      entrees: [
        { position: 1, equipe: "Horoya AC Academy", joues: 8, victoires: 6, nuls: 2, defaites: 0, butsPour: 20, butsContre: 5, points: 20 },
        { position: 2, equipe: "Atlético de Colèah", joues: 8, victoires: 5, nuls: 2, defaites: 1, butsPour: 15, butsContre: 7, points: 17, isClub: true },
        { position: 3, equipe: "FC Kakimbo", joues: 8, victoires: 4, nuls: 1, defaites: 3, butsPour: 12, butsContre: 10, points: 13 },
        { position: 4, equipe: "Hafia FC", joues: 8, victoires: 2, nuls: 1, defaites: 5, butsPour: 8, butsContre: 15, points: 7 },
        { position: 5, equipe: "Satellite FC", joues: 8, victoires: 0, nuls: 0, defaites: 8, butsPour: 3, butsContre: 21, points: 0 },
      ],
    },
  ],
};

export default function ClassementPage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params);
  const { locale } = useLocale();
  const club = clubData[clubId] ?? clubData.jag;
  const groupes = classementsData[clubId] ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const groupe = groupes[activeIdx];

  const th = "text-xs font-semibold text-muted-foreground px-2 py-2 text-center";
  const td = "text-sm text-center px-2 py-3";

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
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">{locale === "fr" ? "Classement" : "Standings"}</p>
              <h1 className="text-white font-black text-xl sm:text-2xl leading-tight">{club.nom}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Group tabs */}
      {groupes.length > 1 && (
        <div className="border-b border-border bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 py-2 overflow-x-auto">
            {groupes.map((g, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                className={`px-4 py-1.5 rounded-sm text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeIdx === i ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
                style={activeIdx === i ? { backgroundColor: club.color } : {}}>
                {g.categorie}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {groupe && (
          <>
            <div className="mb-4 flex flex-wrap gap-2 items-baseline">
              <h2 className="font-black text-foreground text-lg">{groupe.competition} — {groupe.categorie}</h2>
              <span className="text-sm text-muted-foreground">{locale === "fr" ? `Saison ${groupe.saison}` : `Season ${groupe.saison}`}</span>
            </div>

            <div className="overflow-x-auto bg-card border border-border rounded-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className={`${th} text-left pl-4 w-8`}>#</th>
                    <th className={`${th} text-left pl-2`}>{locale === "fr" ? "Équipe" : "Team"}</th>
                    <th className={th}>J</th>
                    <th className={th}>V</th>
                    <th className={th}>N</th>
                    <th className={th}>D</th>
                    <th className={th}>Bp</th>
                    <th className={th}>Bc</th>
                    <th className={`${th} font-black text-foreground`}>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {groupe.entrees.map((e) => (
                    <tr key={e.position}
                      className={`border-b border-border last:border-0 ${
                        e.isClub ? "font-bold" : ""
                      }`}
                      style={e.isClub ? { backgroundColor: `${club.color}15` } : {}}>
                      <td className={`${td} pl-4 font-black`} style={e.isClub ? { color: club.color } : {}}>{e.position}</td>
                      <td className={`${td} text-left font-semibold text-foreground`}>
                        {e.isClub ? <span style={{ color: club.color }}>{e.equipe}</span> : e.equipe}
                      </td>
                      <td className={td}>{e.joues}</td>
                      <td className={`${td} text-green-600`}>{e.victoires}</td>
                      <td className={`${td} text-amber-500`}>{e.nuls}</td>
                      <td className={`${td} text-red-500`}>{e.defaites}</td>
                      <td className={td}>{e.butsPour}</td>
                      <td className={td}>{e.butsContre}</td>
                      <td className={`${td} font-black text-foreground text-base`}>{e.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-border bg-muted/30 py-6 text-center text-muted-foreground text-sm">
        <p className="font-semibold text-foreground">{club.nom}</p>
      </footer>
    </div>
  );
}
