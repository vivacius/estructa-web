import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://estructa.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "ESTRUCTA · Soluciones Empresariales — Legal, Finanzas, Estrategia, Tecnología",
  description:
    "Firma de soluciones empresariales integrales. Ayudamos a pymes a organizarse, entender sus números, reducir riesgos, mejorar procesos y usar datos para tomar mejores decisiones. Legal · Finanzas · Estrategia · Tecnología.",
  keywords: [
    "consultoría empresarial",
    "soluciones empresariales",
    "diagnóstico empresarial",
    "control financiero pyme",
    "transformación digital pyme",
    "gerencia con datos",
    "estructura legal empresarial",
    "ESTRUCTA",
  ],
  authors: [{ name: "ESTRUCTA · Soluciones Empresariales" }],
  creator: "ESTRUCTA",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: baseUrl,
    siteName: "ESTRUCTA · Soluciones Empresariales",
    title: "ESTRUCTA · Construimos empresas más sólidas",
    description:
      "Integramos Legal, Finanzas, Estrategia y Tecnología sobre el mismo negocio. Diagnóstico 360°, soluciones concretas y acompañamiento continuo.",
    images: [
      {
        url: "/images/og-estructa.png",
        width: 1200,
        height: 630,
        alt: "ESTRUCTA · Soluciones Empresariales",
        type: "image/png",
      },
      {
        url: "/images/og-square.png",
        width: 600,
        height: 600,
        alt: "ESTRUCTA Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESTRUCTA · Construimos empresas más sólidas",
    description:
      "Legal · Finanzas · Estrategia · Tecnología trabajando sobre el mismo negocio.",
    images: ["/images/og-estructa.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/og-square.png", sizes: "600x600", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ESTRUCTA · Soluciones Empresariales",
  description:
    "Firma de soluciones empresariales integrales que integra Legal, Finanzas, Estrategia y Tecnología.",
  url: "https://estructa.com",
  logo: "https://estructa.com/images/logo.png",
  serviceType: [
    "Consultoría Empresarial",
    "Diagnóstico Empresarial 360°",
    "Control Financiero",
    "Asesoría Legal",
    "Digitalización Empresarial",
    "Gerencia con Datos",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
