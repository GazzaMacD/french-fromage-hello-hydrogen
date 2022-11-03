import { Suspense } from "react";
import {
  gql,
  useShopQuery,
  useServerAnalytics,
  useRouteParams,
  ShopifyAnalyticsConstants,
  Seo,
} from "@shopify/hydrogen";
import { BaseLayout } from "../../components/layouts/BaseLayout.server/index";

//types
import { Product as TProduct } from "@shopify/hydrogen/storefront-api-types";

const PRODUCT_QUERY = gql`
  query Product($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    product(handle: $handle) {
      id
      title
      seo {
        title
        description
      }
    }
  }
`;

function Product() {
  const { handle } = useRouteParams();

  const {
    data: { product },
  } = useShopQuery<{ product: TProduct }>({
    query: PRODUCT_QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
    },
  });
  return (
    <BaseLayout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <section>
        This will be the product page for <strong>{product.title}</strong>
      </section>
    </BaseLayout>
  );
}
export default Product;
