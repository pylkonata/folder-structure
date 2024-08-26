import "./ModalForm.css";
import React, { forwardRef, RefObject, useState } from "react";
import Dialog from "../Dialog/Dialog";
import { createItemObj } from "../../utility";
import { StructureNode } from "../../services/FolderTreeService";

interface ModalProps {
  path: string[] | [];
  addNewItem: (path: string[], value: StructureNode) => void;
}

const ModalForm = forwardRef(
  (
    { path, addNewItem }: ModalProps,
    ref: RefObject<HTMLDialogElement | null>
  ) => {
    const [name, setName] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const closeDialog = () => {
      setName("");
      ref.current?.close();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name && name.trim()) {
        addNewItem(path, createItemObj(name));
        closeDialog();
      }
    };

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
