import { Link, Image, Money } from "@shopify/hydrogen";
import { DEFAULT_IMAGE } from "../../../common/constants";
import styles from "./ProductCard.module.scss";

//types
import { TProduct, TImage } from "../../../common/types";

function ProductCard({ product }: { product: TProduct }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice
    ? compareAtPrice.amount > price.amount
    : false;

  let image: TImage = DEFAULT_IMAGE;

  if (product?.variants?.nodes[0]?.image) {
    image = product.variants.nodes[0].image;
  }

  return (
    <Link to={`/products/${product.handle}`}>
      <div>
        <div>
          {isDiscounted && <label>Sale</label>}
          <Image
            className={styles.Image}
            src={image.url}
            height={image?.height ? image.height : 500}
            width={image?.width ? image.width : 500}
            alt={image.altText ? image.altText : product.title}
          />
        </div>
        <div>
          <h3>{product.title}</h3>
          <div>
            <span>
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && compareAtPrice && (
                <Money withoutTrailingZeros data={compareAtPrice} />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { ProductCard };
