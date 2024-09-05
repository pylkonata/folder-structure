import { useRef } from "react";

import ModalForm from "../ModalForm/ModalForm";
import "./ActionBtn.css";
import { StructureNode } from "../../services/FolderTreeService";

interface ActionBtnsProps {
  pathBase?: string[];
  node: StructureNode;
  addNewItem: (path: string[], value: StructureNode) => void;
  deleteItem: (value: string[]) => void;
}

const ActionBtns = ({
  pathBase,
  node,
  deleteItem,
  addNewItem,
}: ActionBtnsProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef?.current?.showModal();
  };

  return (
    <>
      {node.type === "folder" ? (
        <div className="btn-container">
          <button className="btn" onClick={openModal}>
            +
          </button>
          <button
            className="btn"
            onClick={() => deleteItem([...pathBase, node.name])}
          >
            -
          </button>
        </div>
      ) : (
        <button
          className="btn"
          onClick={() => deleteItem([...pathBase, node.name])}
        >
          -
        </button>
      )}
      <ModalForm
        path={[...pathBase, node.name]}
        ref={dialogRef}
        addNewItem={addNewItem}
      />
    </>
  );
};

export default ActionBtns;
