"use client";
import Head from "next/head";
import { Footer, Jumbotron, NavigationBar } from "@/layouts";
import { SectionTitle } from "@/components/molecules";

export default function RootPage() {
  return (
    <>
      <Head>
        <title>Toko Keramik - Jual Keramik tak pernah semudah ini</title>
        <meta name="description" content="Jual keramik dari mana saja" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <Jumbotron />
      <SectionTitle
        pretitle="Benefit"
        title="Kenapa harus bergabung dengan tokokeramik.com ?"
      >
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle>

      <Footer />
    </>
  );
}
