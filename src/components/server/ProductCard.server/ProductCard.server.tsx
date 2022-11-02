import { Link, Image, Money } from "@shopify/hydrogen";

export default function ProductCard({ product }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div>
        <div>
          {isDiscounted && <label>Sale</label>}
          <Image
            className="aspect-[4/5]"
            data={product.variants.nodes[0].image}
            alt="Alt Tag"
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
