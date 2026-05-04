"use client";

import { useTranslation } from "@/hooks/useTranslation";
import CollectionHero from "@/features/collections/components/CollectionHero";
import ComicGrid from "@/features/collections/components/ComicGrid";
import { dummyManwha } from "@/features/collections/data/dummyData";

export default function ManwhaCollectionPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-4 pb-20 pt-44 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CollectionHero
          eyebrow={t("collection.manwha.eyebrow") || ""}
          title={t("collection.manwha.title") || ""}
          description={t("collection.manwha.description") || ""}
          accentColor="bg-gradient-to-r from-violet-500 to-purple-600"
        />
        <ComicGrid
          comics={dummyManwha}
          namespace="collection.manwha"
          accentGradient="bg-gradient-to-r from-violet-500 to-purple-600"
        />
      </div>
    </main>
  );
}
