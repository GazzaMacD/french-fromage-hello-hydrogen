import { Suspense } from "react";
import {
  gql,
  useShopQuery,
  Seo,
  useServerAnalytics,
  useRouteParams,
  ShopifyAnalyticsConstants,
} from "@shopify/hydrogen";

import { BaseLayout } from "../../components/layouts/BaseLayout.server";

const COLLECTION_DETAIL_QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        title
        description
      }
    }
  }
`;

type TCollectionShopQueryResp = {
  collection: {
    id: string;
    title: string;
    description: string;
    seo: {
      description: string;
      title: string;
    };
  };
};

function Collection() {
  const { handle } = useRouteParams();
  // fetch data
  const {
    data: { collection },
  } = useShopQuery<TCollectionShopQueryResp>({
    query: COLLECTION_DETAIL_QUERY,
    variables: {
      handle,
    },
  });
  // shop anaylytics
  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });

  return (
    <BaseLayout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <header>
        <h1>{collection.title}</h1>
        {collection.description && (
          <div>
            <div>
              <p>{collection.description}</p>
            </div>
          </div>
        )}
      </header>
    </BaseLayout>
  );
}

export default Collection;
