"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";

const clubs = [
    {
        id: "jag",
        nom: "Jaguar Académie Guinée",
        acronyme: "JAG",
        fondation: "2005",
        ville: "Conakry",
        logo: "/images/jag-logo.png",
        hero: "/images/jag-hero.png",
        couleurPrimaire: "#CC0000",
        description: {
            fr: "La Jaguar Académie Guinée est un club de football guinéen fondé pour promouvoir les jeunes talents de Conakry. Réputée pour sa formation rigoureuse, l'académie développe des joueurs compétitifs à travers ses trois catégories.",
            en: "Jaguar Académie Guinée is a Guinean football club founded to promote young talent from Conakry. Known for rigorous training, the academy develops competitive players across its three age groups.",
        },
        stats: [
            { label: { fr: "Fondation", en: "Founded" }, value: "2005" },
            { label: { fr: "Joueurs", en: "Players" }, value: "75+" },
            { label: { fr: "Équipes", en: "Squads" }, value: "3" },
            { label: { fr: "Ville", en: "City" }, value: "Conakry" },
        ],
    },
    {
        id: "atletico",
        nom: "Club Atlético de Colèah",
        acronyme: "Atlético",
        fondation: "1998",
        ville: "Colèah, Conakry",
        logo: "/images/atletico-logo.png",
        hero: "/images/atletico-hero.jpg",
        couleurPrimaire: "#F5B800",
        description: {
            fr: "Le Club Atlético de Colèah est un club historique du quartier de Colèah à Conakry. Avec une tradition sportive solide et une grande communauté de supporters, il représente la fierté de son quartier.",
            en: "Club Atlético de Colèah is a historic club from the Colèah district of Conakry. With a solid sporting tradition and a large supporter community, it embodies the pride of its neighbourhood.",
        },
        stats: [
            { label: { fr: "Fondation", en: "Founded" }, value: "1998" },
            { label: { fr: "Joueurs", en: "Players" }, value: "80+" },
            { label: { fr: "Équipes", en: "Squads" }, value: "3" },
            { label: { fr: "Ville", en: "City" }, value: "Colèah" },
        ],
    },
];

const CATEGORIES = ["cadets", "juniors", "seniors"] as const;

export default function HomePage() {
    const { locale, t } = useLocale();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* ── Hero ────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-foreground text-background">
                <Image
                    src="/images/jag-hero.png"
                    alt="Football guinéen"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60">
                        {t.home.tagline}
                    </p>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-balance leading-tight mb-5">
                        {t.home.heroTitle}
                    </h1>
                    <p className="text-base md:text-lg opacity-70 max-w-xl mx-auto leading-relaxed mb-10">
                        {t.home.heroSub}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {clubs.map((club) => (
                            <Link
                                key={club.id}
                                href={`/clubs/${club.id}`}
                                className="px-5 py-2.5 rounded-sm font-semibold text-sm transition-opacity hover:opacity-85"
                                style={{ backgroundColor: club.couleurPrimaire, color: "#fff" }}
                            >
                                {club.nom}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Message du Président ────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-15">
                <h2 className="text-xl md:text-2xl font-black text-foreground text-center mb-10 tracking-tight">
                    Message du Président
                </h2>
                <div className="bg-card border border-border rounded-sm overflow-hidden flex flex-col md:flex-row gap-0">
                    {/* Photo */}
                    <div className="relative md:w-72 shrink-0 h-64 md:h-auto">
                        <Image
                            src="/images/president.png"
                            alt="Le Président"
                            fill
                            className="object-cover object-top"
                        />
                    </div>
                    {/* Text */}
                    <div className="flex flex-col justify-center p-7 md:p-10 gap-5">
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            C&apos;est avec une immense fierté que je dirige ces deux institutions de football. Je suis une personne qui agit rapidement et efficacement, car les projets qui stagnent finissent par tomber dans l&apos;oubli. Mon ambition est de moderniser le football guinéen, en favorisant bien sûr des collaborations mutuellement bénéfiques. Je reste à l&apos;écoute et disponible à tout moment.
                        </p>
                        <blockquote className="border-l-4 border-foreground/30 pl-4">
                            <p className="text-foreground font-semibold text-sm md:text-base italic leading-snug">
                                &ldquo;La stagnation mène à l&apos;oubli&nbsp;; c&apos;est à travers l&apos;action et la collaboration que nous façonnerons l&apos;avenir du football guinéen.&rdquo;
                            </p>
                        </blockquote>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            — Moussa TOURE, Le Président, Guinée Football Clubs
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Club cards ──────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
                <h2 className="text-xl md:text-2xl font-black text-foreground text-center mb-10 tracking-tight">
                    {t.home.ourClubs}
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                    {clubs.map((club) => (
                        <div
                            key={club.id}
                            className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Hero image */}
                            <div className="relative h-44 sm:h-52 overflow-hidden">
                                <Image
                                    src={club.hero}
                                    alt={club.nom}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                                <div className="absolute bottom-3 left-4 flex items-end gap-3">
                                    <Image
                                        src={club.logo}
                                        alt={club.nom}
                                        width={48}
                                        height={48}
                                        className="rounded-full border-2 border-white object-cover shadow"
                                    />
                                    <div>
                                        <p className="text-white font-black text-lg leading-tight">{club.acronyme}</p>
                                        <p className="text-white/60 text-xs">{club.ville}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-black text-foreground text-base mb-1.5">{club.nom}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                                    {club.description[locale]}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-4 gap-1.5 mb-5">
                                    {club.stats.map((s) => (
                                        <div key={s.label.fr} className="text-center bg-muted rounded-sm py-2 px-1">
                                            <p className="font-black text-sm text-foreground leading-none mb-0.5">{s.value}</p>
                                            <p className="text-xs text-muted-foreground truncate">{s.label[locale]}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Category links */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {CATEGORIES.map((cat) => (
                                        <Link
                                            key={cat}
                                            href={`/clubs/${club.id}/equipe/${cat}`}
                                            className={`text-xs font-semibold px-3 py-1 rounded-sm border transition-colors ${club.id === "jag"
                                                    ? "border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white"
                                                    : "border-red-600 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white"
                                                }`}
                                        >
                                            {t.categories[cat.charAt(0).toUpperCase() + cat.slice(1) as keyof typeof t.categories]}
                                        </Link>
                                    ))}
                                </div>

                                <Link
                                    href={`/clubs/${club.id}`}
                                    className="flex items-center justify-center w-full py-2.5 rounded-sm font-semibold text-sm transition-opacity hover:opacity-85 text-white"
                                    style={{ backgroundColor: club.couleurPrimaire }}
                                >
                                    {t.home.viewClub} &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Footer ──────────────────────────────────────── */}
            <footer className="border-t border-border bg-muted/30 py-8 text-center text-muted-foreground text-sm">
                <p className="font-semibold text-foreground mb-1">Guinée Football Clubs</p>
                <p>Jaguar Académie Guinée &amp; Club Atlético de Colèah &mdash; {t.footer.city}</p>
                <p className="mt-1 text-xs opacity-50">&copy; {new Date().getFullYear()} {t.footer.rights}</p>
            </footer>
        </div>
    );
}
