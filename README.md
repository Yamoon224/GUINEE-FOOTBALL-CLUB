# Guinée Football Clubs

Site web officiel de la **Jaguar Académie Guinée (JAG)** et du **Club Atlético de Colèah** — deux clubs de football emblématiques de Conakry, Guinée.

## Aperçu

Application web bilingue (🇫🇷 / 🇬🇧) permettant aux supporters de suivre l'actualité, les équipes, le calendrier, les résultats et bien plus pour chacun des deux clubs.

## Fonctionnalités

- Pages dédiées par club (`/clubs/[clubId]`)
- Fiches joueurs par catégorie : **Cadets**, **Juniors**, **Seniors**
- Sections : Actualités, Calendrier, Résultats, Classement, Palmarès, Photos, Boutique, Billets
- Internationalisation française / anglaise (contexte `LocaleProvider`)
- Thème clair/sombre (`next-themes`)

## Stack technique

| Outil | Version |
|---|---|
| [Next.js](https://nextjs.org) | 16.2 |
| [React](https://react.dev) | 19 |
| [Tailwind CSS](https://tailwindcss.com) | 4 |
| [Radix UI](https://www.radix-ui.com) | — |
| [shadcn/ui](https://ui.shadcn.com) | — |
| [Lucide React](https://lucide.dev) | — |
| [Recharts](https://recharts.org) | 2.15 |
| [pnpm](https://pnpm.io) | — |

## Clubs

| Club | Acronyme | Fondation | Ville |
|---|---|---|---|
| Jaguar Académie Guinée | JAG | 2005 | Conakry |
| Club Atlético de Colèah | Atlético | 1998 | Colèah, Conakry |

## Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts disponibles

| Commande | Description |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Démarrer le build de production |
| `pnpm lint` | Vérification ESLint |

## Structure du projet

```
app/
  page.tsx                    # Page d'accueil — liste des clubs
  clubs/[clubId]/             # Pages dynamiques par club
    equipe/[categorie]/       # Fiches joueurs (Cadets / Juniors / Seniors)
    actualites/ calendrier/ resultats/ classement/ palmares/ photos/ billets/ boutique/
components/
  Navbar.tsx                  # Navigation principale
  PlayerCard.tsx              # Carte joueur
  ComingSoonPage.tsx          # Page générique "bientôt disponible"
  ui/                         # Composants shadcn/ui
lib/
  data.ts                     # Données des clubs et joueurs
  i18n.ts                     # Traductions FR / EN
  locale-context.tsx          # Contexte de langue
```
