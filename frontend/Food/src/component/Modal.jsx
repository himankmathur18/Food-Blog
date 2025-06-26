import React, { Children } from "react";

export default function Modal({children, onClose}) {
  return (
    <>
      <div className="backdrop" onClick={onClose}>
        <dialog className="modal" open onClick={(e) => e.stopPropagation()}>
          {children}
        </dialog>
      </div>
    </>
  );
}
