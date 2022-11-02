import { gql, useShopQuery, useRouteParams } from "@shopify/hydrogen";

import { BaseLayout } from "../../components/layouts/BaseLayout.server";

const COLLECTION_DETAIL_QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      title
    }
  }
`;

function Collection() {
  const { handle } = useRouteParams();
  const {
    data: { collection },
  } = useShopQuery({
    query: COLLECTION_DETAIL_QUERY,
    variables: {
      handle,
    },
  });

  console.log(collection);

  return (
    <BaseLayout>
      <section>
        This will be the collection page for <strong>{handle}</strong>
      </section>
    </BaseLayout>
  );
}

export default Collection;
