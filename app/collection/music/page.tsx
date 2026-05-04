"use client";

import { useTranslation } from "@/hooks/useTranslation";
import CollectionHero from "@/features/collections/components/CollectionHero";
import MusicComingSoon from "@/features/collections/components/MusicComingSoon";

export default function MusicCollectionPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-4 pb-20 pt-44 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <CollectionHero
          eyebrow={t("collection.music.eyebrow")}
          title={t("collection.music.title")}
          description={t("collection.music.description")}
          accentColor="bg-gradient-to-r from-[#1DB954] to-[#1ed760]"
        />
        <MusicComingSoon />
      </div>
    </main>
  );
}
