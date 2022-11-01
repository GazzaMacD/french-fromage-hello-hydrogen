import { BaseLayout } from "../components/layouts/BaseLayout.server";
import { FeaturedCollections } from "../components/modules/FeaturedCollections.server/FeaturedCollections.server";
import { Suspense } from "react";

export default function Home() {
  return (
    <BaseLayout>
      <Suspense fallback="Loading collections...">
        <FeaturedCollections />
      </Suspense>
    </BaseLayout>
  );
}
