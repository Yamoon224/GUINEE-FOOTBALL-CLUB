"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getClub, calcAge } from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import type { TeamCategory } from "@/lib/data";

const CATEGORIES: TeamCategory[] = ["Cadets", "Juniors", "Seniors"];

export default function ClubPage() {
  const params = useParams<{ clubId: string }>();
  const club = getClub(params.clubId);
  const { t } = useLocale();

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-xl font-black text-foreground mb-2">Club introuvable</p>
            <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#D97706" }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────── */}
      <section className="relative h-56 sm:h-72 md:h-88 overflow-hidden">
        <Image src={club.hero} alt={club.nom} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-3">
          <Image
            src={club.logo}
            alt={club.nom}
            width={72}
            height={72}
            className="rounded-full border-4 border-white shadow-xl object-cover"
          />
          <h1 className="text-white font-black text-2xl sm:text-4xl md:text-5xl text-balance leading-tight">
            {club.nom}
          </h1>
          <p className="text-white/60 text-sm">
            {t.club.founded} {club.fondation} &mdash; {club.ville}
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4" style={{ backgroundColor: club.couleurPrimaire }}>
        {club.stats.map((s) => (
          <div key={s.label} className="py-4 text-center border-r border-white/20 last:border-0">
            <p className="font-black text-xl md:text-2xl text-white leading-tight">{s.value}</p>
            <p className="text-white/70 text-xs uppercase tracking-wide mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* ── About ────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg md:text-xl font-black text-foreground mb-3 tracking-tight">
            {t.club.about}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {club.description}
          </p>
        </section>

        {/* ── Teams grid ───────────────────────────────────── */}
        <section>
          <h2 className="text-lg md:text-xl font-black text-foreground mb-5 tracking-tight">
            {t.club.ourTeams}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => {
              const players = club.equipes[cat];
              const avgAge = Math.round(
                players.reduce((sum, p) => sum + calcAge(p.dateNaissance), 0) / players.length
              );
              return (
                <Link
                  key={cat}
                  href={`/clubs/${club.id}/equipe/${cat.toLowerCase()}`}
                  className="group block bg-card border border-border rounded-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center mb-4 font-black text-base text-white"
                    style={{ backgroundColor: club.couleurPrimaire }}
                  >
                    {cat[0]}
                  </div>
                  <h3 className="font-black text-foreground text-base mb-1">
                    {t.categories[cat]}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {players.length} {t.club.players} &bull; {t.club.avgAge} {avgAge} {t.club.years}
                  </p>
                  <span
                    className="text-xs font-semibold group-hover:underline"
                    style={{ color: club.couleurPrimaire }}
                  >
                    {t.club.viewTeam} &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/30 py-8 text-center text-muted-foreground text-sm">
        <p className="font-semibold text-foreground mb-1">{club.nom}</p>
        <p>{club.ville} &mdash; {t.club.founded} {club.fondation}</p>
      </footer>
    </div>
  );
}
