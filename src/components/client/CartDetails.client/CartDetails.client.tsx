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
  console.dir(lines, { depth: null });

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <form className="">
      <section aria-labelledby="cart-contents" className="">
        <ul className="">
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
    </form>
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
  return <div>continue to checkout</div>;
}

function OrderSummary() {
  return <div>Order summary</div>;
}

function CartLineItem() {
  return <div>CartLineItem</div>;
}

function CartLineQuantityAdjust({ lineId, quantity }: TCartLineQAProps) {
  return <div>Shopping</div>;
}

export { CartDetails };
