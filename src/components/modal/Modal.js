import { useEffect, useRef } from "react";
import ReactPortal from "../ReactPortal";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";
import "./modalStyles.css";

const Modal = ({ children, isOpen, handleClose }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        classNames="modal-overlay"
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="modal-overlay">
          <div
            className={cx("modal", {
              "modal-enter-done": isOpen,
            })}
          >
            <div className="modal-header">
              <button onClick={handleClose} className="modal-close-button" aria-label="close">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};

export default Modal;
