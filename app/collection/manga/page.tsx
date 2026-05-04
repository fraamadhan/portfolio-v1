"use client";

import { useTranslation } from "@/hooks/useTranslation";
import CollectionHero from "@/features/collections/components/CollectionHero";
import ComicGrid from "@/features/collections/components/ComicGrid";
import { dummyManga } from "@/features/collections/data/dummyData";

export default function MangaCollectionPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-4 pb-20 pt-44 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CollectionHero
          eyebrow={t("collection.manga.eyebrow")}
          title={t("collection.manga.title")}
          description={t("collection.manga.description")}
          accentColor="bg-gradient-to-r from-rose-500 to-pink-600"
        />
        <ComicGrid
          comics={dummyManga}
          namespace="collection.manga"
          accentGradient="bg-gradient-to-r from-rose-500 to-pink-600"
        />
      </div>
    </main>
  );
}
