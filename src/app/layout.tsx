import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Time Zone Converter | Convert Time Between World Time Zones",
  description: "Free online time zone converter tool. Convert time between different world time zones instantly. Support for major cities including New York, London, Tokyo, Sydney, and more. Mobile-friendly and easy to use.",
  keywords: "time zone converter, timezone converter, world clock, time conversion, UTC converter, time zones, world time",
  authors: [{ name: "Time Zone Converter App" }],
  robots: "index, follow",
  openGraph: {
    title: "Time Zone Converter | Convert Time Between World Time Zones",
    description: "Free online time zone converter tool. Convert time between different world time zones instantly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Time Zone Converter | Convert Time Between World Time Zones",
    description: "Free online time zone converter tool. Convert time between different world time zones instantly.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Time Zone Converter",
    "description": "Free online time zone converter tool. Convert time between different world time zones instantly.",
    "url": "https://yourdomain.com",
    "applicationCategory": "Utility",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Time zone conversion",
      "World clock",
      "Mobile responsive design",
      "Real-time updates"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
