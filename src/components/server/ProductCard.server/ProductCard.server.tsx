import { Link, Image, Money } from "@shopify/hydrogen";
import { TProductCard } from "../../../common/types";

type TProductCardProps = {
  product: TProductCard;
};

function ProductCard({ product }: TProductCardProps) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice
    ? compareAtPrice.amount > price.amount
    : false;

  return (
    <Link to={`/products/${product.handle}`}>
      <div>
        <div>
          {isDiscounted && <label>Sale</label>}
          <Image
            src={product.variants.nodes[0].image.url}
            height={product.variants.nodes[0].image.height}
            width={product.variants.nodes[0].image.width}
            alt={
              product.variants.nodes[0].image.altText
                ? product.variants.nodes[0].image.altText
                : product.title
            }
          />
        </div>
        <div>
          <h3>{product.title}</h3>
          <div>
            <span>
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
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
