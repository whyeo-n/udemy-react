import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// 포탈 기능으로 DOM 내 modal의 위치를 정해줄 수 있다.
export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      onClose={onClose}
      // open={open} open을 사용하게 되면 backdrop이 동작해서, 나머지 화면에 대한 상호작용을 막는다.
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
