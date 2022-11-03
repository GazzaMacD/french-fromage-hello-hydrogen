import { Product } from "@shopify/hydrogen/storefront-api-types";
/*
 * Base
 */

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
export type TProduct = Product;
