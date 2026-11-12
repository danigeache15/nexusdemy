import "./globals.css";
import BRAND from "../brand";

export const metadata = {
  title: `${BRAND.name} — Speak English without freezing. Your first class is free.`,
  description:
    "Live online English classes in small groups for B1+ students and young professionals. Practise job interviews, introductions and real conversations, with feedback in every class. Your first class is free.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400,60;1,9..144,400,60&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
