import { useRef } from "react";
import FolderTreeService from "../../services/FolderTreeService";
import { StructureNode } from "../FolderStructure/FolderStructure";
import ModalForm from "../ModalForm/ModalForm";
import "./ActionBtn.css";

interface ActionBtnsProps {
  pathBase?: string[];
  node: StructureNode;
  service: FolderTreeService;
  setStructure: (value: StructureNode) => void;
}

const ActionBtns = ({
  pathBase,
  node,
  service,
  setStructure,
}: ActionBtnsProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const addNewItem = () => {
    dialogRef?.current?.showModal();
  };

  return (
    <>
      {node.type === "folder" ? (
        <div className="btn-container">
          <button className="btn" onClick={() => addNewItem()}>
            +
          </button>
          <button
            className="btn"
            onClick={() =>
              service.deleteItem([...pathBase, node.name], setStructure)
            }
          >
            -
          </button>
        </div>
      ) : (
        <button
          className="btn"
          onClick={() =>
            service.deleteItem([...pathBase, node.name], setStructure)
          }
        >
          -
        </button>
      )}
      <ModalForm
        serviceInstance={service}
        path={[...pathBase, node.name]}
        ref={dialogRef}
        setStructure={setStructure}
      />
    </>
  );
};

export default ActionBtns;
