import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/locale-context";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800", "900"],
    variable: "--font-barlow",
    display: "swap",
});

export const metadata: Metadata = {
    title: "JAG & Atlético de Colèah | Site Officiel",
    description:
        "Site officiel de la Jaguar Académie Guinée (JAG) et du Club Atlético de Colèah — Cadets, Juniors, Seniors à Conakry, Guinée.",
    keywords: ["football", "guinée", "conakry", "jaguar académie", "atlético colèah", "JAG"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={`${inter.variable} ${barlow.variable}`} suppressHydrationWarning>
            <body className="font-sans antialiased bg-background text-foreground">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                    <LocaleProvider>
                        {children}
                    </LocaleProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
