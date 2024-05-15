import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  //  modal을 연결하기 위해서, useEffect를 사용함.
  // Dependancies를 설정해줘야 함.
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
