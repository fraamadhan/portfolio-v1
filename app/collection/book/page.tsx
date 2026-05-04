"use client";

import { useTranslation } from "@/hooks/useTranslation";
import CollectionHero from "@/features/collections/components/CollectionHero";
import BookGrid from "@/features/collections/components/BookGrid";
import { dummyBooks } from "@/features/collections/data/dummyData";

export default function BookCollectionPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-4 pb-20 pt-44 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CollectionHero
          eyebrow={t("collection.book.eyebrow") || ""}
          title={t("collection.book.title") || ""}
          description={t("collection.book.description") || ""}
          accentColor="bg-gradient-to-r from-amber-400 to-orange-500"
        />
        <BookGrid books={dummyBooks} />
      </div>
    </main>
  );
}
