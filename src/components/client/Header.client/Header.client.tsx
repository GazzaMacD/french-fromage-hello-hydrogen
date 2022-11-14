import { useUrl, Link, useCart } from "@shopify/hydrogen";
import { Drawer, useDrawer } from "../Drawer.client";
import { RiShoppingBagLine } from "react-icons/ri";
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
  return <RiShoppingBagLine className={styles.IconBag} />;
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
