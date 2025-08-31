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
  title:
    "In Or Out World | Unforgettable Events at inorout.world | In Or Out Concert | In or Out",
  description:
    "Join the best events at In Or Out World. Book your tickets for exclusive experiences at inorout.world. Secure your spot for unforgettable moments and VIP access.",
  keywords: [
    "in or out world",
    "inorout.world",
    "event tickets",
    "exclusive events",
    "VIP experiences",
    "music festival",
    "party",
    "concert",
    "early bird discount",
    "live entertainment",
    "artist lineup",
    "book tickets",
    "event location",
    "join community",
  ],
  alternates: {
    canonical: "https://inorout.world",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "In Or Out World | Unforgettable Events & VIP Experiences",
    description:
      "Get your tickets for In Or Out World at inorout.world. Experience exclusive events, music festivals, and VIP access. Early bird discounts available!",
    url: "https://inorout.world",
    siteName: "In Or Out World",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "In Or Out World Event",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "In Or Out World | Unforgettable Events & VIP Experiences",
    description:
      "Book your tickets for In Or Out World at inorout.world. Exclusive experiences, music festivals, and early bird discounts await.",
    images: ["/og-image.jpg"],
    site: "@inoroutworld",
  },
  metadataBase: new URL("https://inorout.world"),
  applicationName: "In Or Out World",
  category: "Events, Entertainment, Music Festival, Party",
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
