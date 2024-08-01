import "./ModalForm.css";
import React, { forwardRef, RefObject } from "react";
import Dialog from "../Dialog/Dialog";

interface ModalProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeDialog: () => void;
  name: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalForm = forwardRef(
  (
    { handleFormSubmit, closeDialog, name, handleNameChange }: ModalProps,
    ref: RefObject<HTMLDialogElement | null>
  ) => {
    return (
      <Dialog ref={ref}>
        <form onSubmit={handleFormSubmit} className="form">
          <label className="form__label">
            Enter folder or file name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="form__input"
            />
          </label>
          <div className="form__btn-container">
            <button type="submit" disabled={!name || !name.trim()}>
              Ok
            </button>
            <button type="reset" onClick={closeDialog}>
              Cancel
            </button>
          </div>
        </form>
      </Dialog>
    );
  }
);

export default ModalForm;
