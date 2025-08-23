import type { Metadata } from "next";
import { Righteous, Poppins, Fredoka } from "next/font/google";
import "./globals.css";

const righteous = Righteous({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Afro Vibes Festival 2025 | Where Cultures Collide",
  description:
    "Join us for a groundbreaking celebration of culture, unity, and entertainment in Rishikesh. Oct 3-4, 2025 - Experience the rhythm of diversity.",
  keywords:
    "Afro Vibes Festival, Rishikesh, Afrobeat, cultural festival, diversity, music festival, unity celebration, Uttarakhand",
  openGraph: {
    title: "Afro Vibes Festival 2025",
    description:
      "A Groundbreaking Celebration of Culture, Unity, and Entertainment",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link rel='preload' href='/assets/poster.svg' as='image' />
      </head>
      <body
        className={`${righteous.variable} ${poppins.variable} ${fredoka.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
