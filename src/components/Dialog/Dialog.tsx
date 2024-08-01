import "./Dialog.css";
import { forwardRef, RefObject } from "react";
interface DialogProps {
  children: React.ReactNode;
}

const Dialog = forwardRef(
  ({ children }: DialogProps, ref: RefObject<HTMLDialogElement | null>) => {
    return (
      <dialog ref={ref} className="dialog">
        {children}
      </dialog>
    );
  }
);

export default Dialog;
