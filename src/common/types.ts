/*
 * Base
 */
// Money
type TMoney = {
  amount: string;
  currencyCode: string;
};

export type TImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  altText: string | null;
};

/*
 * Products
 */
export type TProductCard = {
  id: string;
  title: string;
  publishedAt: string;
  handle: string;
  variants: {
    nodes: {
      id: string;
      image: TImage;
      priceV2: TMoney;
      compareAtPriceV2: TMoney | null;
    }[];
  };
};
