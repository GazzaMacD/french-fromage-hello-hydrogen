import { useRouteParams } from "@shopify/hydrogen";

import { BaseLayout } from "../../components/layouts/BaseLayout.server";

function Collection() {
  const { handle } = useRouteParams();
  return (
    <BaseLayout>
      <section>
        This will be the collection page for <strong>{handle}</strong>
      </section>
    </BaseLayout>
  );
}

export default Collection;
