import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://estructa.com"),
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
    url: "https://estructa.com",
    siteName: "ESTRUCTA · Soluciones Empresariales",
    title: "ESTRUCTA · Construimos empresas más sólidas",
    description:
      "Integramos Legal, Finanzas, Estrategia y Tecnología sobre el mismo negocio. Diagnóstico 360°, soluciones concretas y acompañamiento continuo.",
    images: [
      {
        url: "/images/horizonte.png",
        width: 1200,
        height: 630,
        alt: "ESTRUCTA · Soluciones Empresariales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESTRUCTA · Construimos empresas más sólidas",
    description:
      "Legal · Finanzas · Estrategia · Tecnología trabajando sobre el mismo negocio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
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
