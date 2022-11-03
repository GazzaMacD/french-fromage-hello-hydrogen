import { Suspense } from "react";
import {
  gql,
  useShopQuery,
  Seo,
  useServerAnalytics,
  useRouteParams,
  ShopifyAnalyticsConstants,
  Image,
} from "@shopify/hydrogen";
import styles from "../../styles/route-styles/CollectionDetail.module.scss";

import { BaseLayout } from "../../components/layouts/BaseLayout.server";
import { TImage, TProduct } from "src/common/types";
import { ProductCard } from "../../components/server/ProductCard.server";

type TCollectionShopQueryResp = {
  collection: {
    id: string;
    title: string;
    description: string;
    seo: {
      description: string;
      title: string;
    };
    image: TImage;
    products: {
      nodes: TProduct[];
    };
  };
};

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
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 8) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                id
                url
                width
                height
                altText
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

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
        {collection?.image && (
          <Image
            className={styles.TopImage}
            src={collection.image.url}
            width={collection.image.width}
            height={collection.image.height}
            alt={
              collection.image.altText
                ? collection.image.altText
                : collection.title
            }
          />
        )}
        <h1>{collection.title}</h1>
        {collection.description && (
          <div>
            <div>
              <p>{collection.description}</p>
            </div>
          </div>
        )}
      </header>
      <main className={styles.ProductList}>
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </BaseLayout>
  );
}

export default Collection;
