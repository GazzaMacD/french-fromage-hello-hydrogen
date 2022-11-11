import { useUrl, Link, useCart } from "@shopify/hydrogen";
import { Drawer, useDrawer } from "../Drawer.client";
import styles from "./Header.module.scss";

function Header({ shop }) {
  const { pathname } = useUrl();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const isHome = pathname === "/";
  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}></Drawer>
      <header className={styles.Header} role="banner">
        <div>
          <Link to="/">{shop.name}</Link>
        </div>
        <button className={styles.CartButton} onClick={openDrawer}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </header>
    </>
  );
}

function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={styles.IconBag}
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
}
function CartBadge({ dark }: { dark: boolean }) {
  const { totalQuantity } = useCart();
  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div className={styles.CartBadge}>
      <span>{totalQuantity}</span>
    </div>
  );
}

export { Header };