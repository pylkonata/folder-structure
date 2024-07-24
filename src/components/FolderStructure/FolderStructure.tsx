import { useEffect, useState } from "react";
import "./FolderStructure.css";
import {
  addItem,
  checkIsFile,
  deleteItem,
  processPathSructure,
} from "../../utility";

interface FolderStructureProps {
  selectedPath: string;
}

export type StructureNode = {
  type: string;
  name: string;
  children: StructureNode[] | null;
};

const FolderStructure = ({ selectedPath }: FolderStructureProps) => {
  const [structure, setStructure] = useState<StructureNode | null>(
    processPathSructure(selectedPath)
  );

  useEffect(() => {
    const newStructure = processPathSructure(selectedPath);
    setStructure(() => newStructure);
  }, [selectedPath]);

  const onAddItem = (path: string[]) => {
    const itemName = prompt("Enter folder or file name:");

    if (itemName && itemName.trim() && !checkIsFile(itemName)) {
      addItem(structure, setStructure, path, {
        type: "folder",
        name: itemName,
        children: [],
      });
    } else if (itemName && itemName.trim() && checkIsFile(itemName)) {
      addItem(structure, setStructure, path, {
        type: "file",
        name: itemName,
        children: null,
      });
    } else {
      alert("Invalid input");
    }
  };

  const onDeleteItem = (path: string[]) => {
    deleteItem(structure, setStructure, path);
  };

  const actionBtns = (path: string[], node: StructureNode) => {
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
      <button
        className="btn"
        onClick={() => onDeleteItem([...path, node.name])}
      >
        -
      </button>
    );
  };

  const renderStructure = (node: StructureNode, path = []) => {
    return (
      <div className="content">
        <div className="name-wrapper">
          {node?.name}
          {actionBtns(path, node)}
        </div>
        {node?.children &&
          node?.children.map((child, index) => {
            return (
              <div key={index}>
                {renderStructure(child, [...path, node.name])}
              </div>
            );
          })}
      </div>
    );
  };

  return <>{structure ? renderStructure(structure) : "No folders or files"}</>;
};

export default FolderStructure;
