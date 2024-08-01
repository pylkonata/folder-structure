import { StructureNode } from "../FolderStructure/FolderStructure";
import "./ActionBtn.css";

interface ActionBtnsProps {
  path: string[];
  node: StructureNode;
  onAddItem: (path: string[]) => void;
  onDeleteItem: (path: string[]) => void;
}

const ActionBtns = ({
  path,
  node,
  onAddItem,
  onDeleteItem,
}: ActionBtnsProps) => {
  return node.type === "folder" ? (
    <div className="btn-container">
      <button className="btn" onClick={() => onAddItem([...path, node.name])}>
        +
      </button>
      <button
        className="btn"
        onClick={() => onDeleteItem([...path, node.name])}
      >
        -
      </button>
    </div>
  ) : (
    <button className="btn" onClick={() => onDeleteItem([...path, node.name])}>
      -
    </button>
  );
};

export default ActionBtns;
