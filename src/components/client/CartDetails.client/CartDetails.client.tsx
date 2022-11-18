import {
  useCart,
  useCartLine,
  CartLineProvider,
  CartShopPayButton,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
  Money,
} from "@shopify/hydrogen";
import { SlTrash } from "react-icons/sl";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import * as React from "react";

import styles from "./CartDetails.module.scss";

/** Types */
type TCartDetailProps = {
  onClose: () => void;
};
type TCartEmptyProps = {
  onClose: () => void;
};
type TCartLineQAProps = {
  lineId: string;
  quantity: number;
};

function CartDetails({ onClose }: TCartDetailProps) {
  const { lines } = useCart();

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <div className={styles.CartDetails}>
      <section aria-labelledby="cart-contents" className={styles.CartList}>
        <ul>
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="summary-heading" className="">
        <h2 id="summary-heading" className="">
          Order summary
        </h2>
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </div>
  );
}

function CartEmpty({ onClose }: TCartEmptyProps) {
  return (
    <div className={styles.CartEmpty}>
      <h2>your cart is empty</h2>
      <button onClick={onClose}>continue shopping</button>
    </div>
  );
}

function CartCheckoutActions() {
  const { checkoutUrl } = useCart();
  return (
    <>
      <div className={styles.CheckoutActions}>
        <Link to={checkoutUrl ? checkoutUrl : ""} className={styles.ToCheckout}>
          continue to checkout
        </Link>
        <CartShopPayButton className={styles.ShopPay} />
      </div>
    </>
  );
}

function OrderSummary() {
  const { cost } = useCart();
  return (
    <>
      <dl className={styles.OrderSummary}>
        <div>
          <dt>subtotal</dt>
          <dd>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              "-"
            )}
          </dd>
        </div>
        <div>
          <dt>shipping estimate</dt>
          <dd className={styles.Shipping}>free </dd>
        </div>
      </dl>
    </>
  );
}

function CartLineItem() {
  const { linesRemove, linesUpdate } = useCart();
  const { id: lineId, quantity, merchandise } = useCartLine();
  return (
    <li className={styles.LiItem}>
      <div className={styles.LiItem__imageBlock}>
        <Image className={styles.LiItem__image} data={merchandise.image} />
      </div>
      <div className={styles.LiItem__details}>
        <h3>
          <Link to={`/products/${merchandise.product.handle}`}>
            {merchandise.product.title}
          </Link>
        </h3>
        <div>
          {(merchandise?.selectedOptions || []).map((option) => (
            <span key={option.name}>
              {option.name}: {option.value}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.LiItem__adjust}>
        <button
          type="button"
          className={styles.LiItem__remove}
          aria-label="delete product"
          onClick={() => linesRemove([lineId])}
        >
          <SlTrash />
        </button>
        <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />
      </div>
      <div className={styles.LiItem__price}>
        <CartLinePrice as="span" />
      </div>
    </li>
  );
}

function CartLineQuantityAdjust({ lineId, quantity }: TCartLineQAProps) {
  return (
    <div className={styles.QuAdj}>
      <label htmlFor={`quantity-${lineId}`} className={styles.QuAdj__label}>
        Quantity, {quantity}
      </label>
      <CartLineQuantityAdjustButton
        adjust="decrease"
        type="button"
        aria-label="Decrease quantity"
        className={styles.QuAdj__dec}
      >
        <AiOutlineMinus />
      </CartLineQuantityAdjustButton>
      <CartLineQuantity as="div" className={styles.QuAdj__quant} />
      <CartLineQuantityAdjustButton
        adjust="increase"
        type="button"
        aria-label="Increase quantity"
        className={styles.QuAdj__inc}
      >
        <AiOutlinePlus />
      </CartLineQuantityAdjustButton>
    </div>
  );
}

export { CartDetails };
