import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

import "./globals.css";
import { getSiteUrl, OG_IMAGE } from "../lib/seo/site";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Create, organize, and search your notes with tags in NoteHub.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "NoteHub",
    description: "Create, organize, and search your notes with tags in NoteHub.",
    url: getSiteUrl(),
    images: [OG_IMAGE],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}