import "./ActionBtn.css";
import { StructureNode } from "../../services/FolderTreeService";

interface ActionBtnsProps {
  pathBase?: string[];
  node: StructureNode;
  deleteItem: (value: string[]) => void;
  onAddBtnClick: () => void;
}

const ActionBtns = ({
  pathBase,
  node,
  deleteItem,
  onAddBtnClick,
}: ActionBtnsProps) => {
  return (
    <>
      {node.type === "folder" ? (
        <div className="btn-container">
          <button className="btn" onClick={onAddBtnClick}>
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
    </>
  );
};

export default ActionBtns;
