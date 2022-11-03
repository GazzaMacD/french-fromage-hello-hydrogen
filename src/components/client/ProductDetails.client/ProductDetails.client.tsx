import { ProductOptionsProvider } from "@shopify/hydrogen";

//types
import { TProduct } from "src/common/types";

function ProductDetail({ product }: { product: TProduct }) {
  return (
    <ProductOptionsProvider data={product}>
      <section>
        <div>
          <h1>{product.title}</h1>
          <span>{product.vendor}</span>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          ></div>
        </div>
      </section>
    </ProductOptionsProvider>
  );
}

export { ProductDetail };
