import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meant to Be Originals",
  description:
    "Creative Agency — Performance Marketing, Hampers, Social Media, Events, Branding & Software Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JQB6VPYDK3"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JQB6VPYDK3');
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}