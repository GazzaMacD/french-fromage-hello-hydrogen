import { useRouteParams } from "@shopify/hydrogen";
import { BaseLayout } from "../../components/layouts/BaseLayout.server/index";

function Product() {
  const { handle } = useRouteParams();
  console.log("loaded");
  return (
    <BaseLayout>
      <section>
        This will be the product page for <strong>{handle}</strong>
      </section>
    </BaseLayout>
  );
}
export default Product;
