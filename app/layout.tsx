import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://qrcodegeneratorscanner.krishaiworks.com/#webapplication",
      name: "QR Code Generator & Scanner",
      url: "https://qrcodegeneratorscanner.krishaiworks.com/",
      description:
        "Generate and scan QR codes online quickly and easily. Create QR codes for text, links, and other information with the free QR Code Generator & Scanner by KrishAIWorks.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id":
        "https://qrcodegeneratorscanner.krishaiworks.com/#webpage",
      url: "https://qrcodegeneratorscanner.krishaiworks.com/",
      name: "QR Code Generator & Scanner | Create and Scan QR Codes",
      description:
        "Generate and scan QR codes online quickly and easily. Create QR codes for text, links, and other information with the free QR Code Generator & Scanner by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://qrcodegeneratorscanner.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          id="qr-code-generator-scanner-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}