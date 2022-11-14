import { Product } from "@shopify/hydrogen/storefront-api-types";
import {
  Image,
  MediaImage,
  ExternalVideo,
  Video,
  Model3d,
} from "@shopify/hydrogen/storefront-api-types";

/*
 * Base
 */
export type TImage = Image;
export type TMediaImage = MediaImage;
export type TVideo = Video;
export type TExternalVideo = ExternalVideo;
export type TModel3d = Model3d;
export type TMediaNodes = (TMediaImage | TExternalVideo | TVideo | TModel3d)[];

/*
 * Products
 */
export type TProduct = Product;

/*
 * Cart Details
 */
