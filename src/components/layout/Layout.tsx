import { type ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = "OceanInsight - Consultoría Oceanográfica",
  description = "Plataforma de consultoría oceanográfica potenciada por IA",
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FooterSection />
      </div>
    </>
  );
}