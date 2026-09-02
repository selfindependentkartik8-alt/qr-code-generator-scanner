import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://qrcodegeneratorscanner.krishaiworks.com"
  ),

  title: "QR Code Generator & Scanner | Create and Scan QR Codes",

  description:
    "Generate and scan QR codes online quickly and easily. Create QR codes for text, links, and other information with the free QR Code Generator & Scanner by KrishAIWorks.",

  keywords: [
    "QR Code Generator",
    "QR Code Scanner",
    "QR Code Generator and Scanner",
    "Generate QR Code",
    "Scan QR Code",
    "QR Code Maker",
    "QR Code Creator",
    "Online QR Code Generator",
    "Free QR Code Generator",
    "QR Code Scanner Online",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical:
      "https://qrcodegeneratorscanner.krishaiworks.com/",
  },

  openGraph: {
    title: "QR Code Generator & Scanner | KrishAIWorks",
    description:
      "Generate and scan QR codes online quickly and easily with KrishAIWorks.",
    url: "https://qrcodegeneratorscanner.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator & Scanner | KrishAIWorks",
    description:
      "Create and scan QR codes online quickly and easily.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}