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
function ProductForm({ product }: { product: TProduct }) {
  const { options, selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <form>
      {
        <div>
          {options &&
            options.map((option) => {
              if (!option || !option?.values || option.values.length === 1) {
                return null;
              } else {
                return (
                  <div key={option.name}>
                    <legend>{option.name}</legend>
                    <div>
                      <OptionRadio name={option.name} values={option.values} />
                    </div>
                  </div>
                );
              }
            })}
        </div>
      }
      <div>
        {selectedVariant ? (
          <>
            <ProductPrice
              priceType="compareAt"
              variantId={selectedVariant.id}
              data={product}
            />
            <ProductPrice variantId={selectedVariant.id} data={product} />
          </>
        ) : (
          <p>Sorry no price available!</p>
        )}
      </div>
      <div>
        {isOutOfStock ? (
          <span>Available in 2-3 weeks</span>
        ) : selectedVariant.id ? (
          <BuyNowButton variantId={selectedVariant.id}>
            <span>Buy it now</span>
          </BuyNowButton>
        ) : (
          <p>Sorry something is wrong</p>
        )}
      </div>
    </form>
  );
}

function OptionRadio({
  name,
  values,
}: {
  name: string | undefined;
  values: (string | undefined)[];
}) {
  const { selectedOptions, setSelectedOption } = useProductOptions();
  return (
    <>
      {values.map((value) => {
        const checked =
          selectedOptions && name ? selectedOptions[name] === value : false;
        const id = `option-${name}-${value}`;
        if (name && value) {
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
        } else {
          return null;
        }
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
