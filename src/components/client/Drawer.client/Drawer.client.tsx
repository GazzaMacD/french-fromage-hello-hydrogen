import { useState } from "react";
import styles from "./Drawer.module.scss";
import { RiCloseFill } from "react-icons/ri";

/**
 * A Drawer component that opens on user click.
 */

type TDrawerProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
function Drawer({ open, onClose, children }: TDrawerProps) {
  return (
    <>
      <div
        className={`${styles.Overlay} ${
          open ? styles.Overlay__open : styles.Overlay__close
        }`}
      ></div>
      <div
        className={`${styles.Drawer} ${
          open ? styles.Drawer__open : styles.Drawer__close
        }`}
      >
        <header className={styles.Header}>
          <h3>My Cart</h3>
          <button onClick={onClose}>
            <RiCloseFill />
          </button>
        </header>
      </div>
    </>
  );
}

function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);
  function openDrawer() {
    document.body.style.position = "fixed";
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }
  function closeDrawer() {
    document.body.style.position = "";
    document.body.style.overflow = "";
    setIsOpen(false);
  }
  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}

export { Drawer, useDrawer };
