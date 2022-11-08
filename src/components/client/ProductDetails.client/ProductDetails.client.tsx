import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  BuyNowButton,
} from "@shopify/hydrogen";

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
        <ProductForm product={product} />
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
function ProductForm({ product }) {
  const { options, selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <form>
      {
        <div>
          {options &&
            options.map(({ name, values }) => {
              if (values.length === 1) {
                return null;
              }
              return (
                <div key={name}>
                  <legend>{name}</legend>
                  <div>
                    <OptionRadio name={name} values={values} />
                  </div>
                </div>
              );
            })}
        </div>
      }
      <div>
        <ProductPrice
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice variantId={selectedVariant.id} data={product} />
      </div>
      <div>
        {isOutOfStock ? (
          <span>Available in 2-3 weeks</span>
        ) : (
          <BuyNowButton variantId={selectedVariant.id}>
            <span>Buy it now</span>
          </BuyNowButton>
        )}
      </div>
    </form>
  );
}
function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();
  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;
        return (
          <label key={id} htmlFor={id}>
            <input
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div>{value}</div>
          </label>
        );
      })}
    </>
  );
}

function ProductGallery({ media }: { media: TMediaNodes }) {
  if (!media.length) {
    return null;
  }
  return (
    <div>
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
