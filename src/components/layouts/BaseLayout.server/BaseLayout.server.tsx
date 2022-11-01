import * as React from "react";
import { Suspense } from "react";
import {
  useShopQuery,
  CacheLong,
  gql,
  useUrl,
  Link,
  Seo,
} from "@shopify/hydrogen";

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;

function BaseLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useUrl();
  const isHome = pathname === "/";

  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <>
      <Suspense>
        <Seo
          type="defaultSeo"
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
      </Suspense>
      <div>
        <header>
          <div>
            <Link to="/">{shop.name}</Link>
          </div>
        </header>

        <main id="mainContent">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </>
  );
}

export { BaseLayout };
