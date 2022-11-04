import { ProductOptionsProvider, MediaFile } from "@shopify/hydrogen";

//types
import { TProduct, TMediaNodes } from "src/common/types";

function ProductDetail({ product }: { product: TProduct }) {
  return (
    <ProductOptionsProvider data={product}>
      <section>
        <div>
          <ProductGallery media={product.media.nodes} />
        </div>
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

// components

function ProductGallery({ media }: { media: TMediaNodes }) {
  if (!media.length) {
    return null;
  }
  return (
    <div
      className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2`}
    >
      {media.map((med, i) => {
        let extraProps = {};
        if (med.mediaContentType === "MODEL_3D") {
          extraProps = {
            interactionPromptThreshold: "0",
            ar: true,
            loading: "eager",
            disableZoom: true,
          };
        }
        let image;
        if ("image" in med) {
          image = {
            ...med.image,
            altText: med.alt || "Product image",
          };
        }

        const data = {
          ...med,
          image: image,
        };
        return (
          <div key={med.id}>
            <MediaFile data={data} {...extraProps} />
          </div>
        );
      })}
    </div>
  );
}
