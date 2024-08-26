import "./FolderTree.css";
import ActionBtns from "../ActionBtn/ActionBtns";
import { StructureNode } from "../../services/FolderTreeService";

interface FolderTreeProps {
  pathBase?: string[];
  tree: StructureNode;
  addNewItem: (path: string[], value: StructureNode) => void;
  deleteItem: (value: string[]) => void;
}

const FolderTree = ({
  pathBase = [],
  tree,
  addNewItem,
  deleteItem,
}: FolderTreeProps) => {
  return (
    <>
      {tree ? (
        <>
          <div className="content">
            <div className="name-wrapper">
              {tree?.name}
              {tree && (
                <ActionBtns
                  pathBase={pathBase}
                  node={tree}
                  addNewItem={addNewItem}
                  deleteItem={deleteItem}
                />
              )}
            </div>
            {tree?.children &&
              tree?.children.map((child, index) => {
                return (
                  <div key={index}>
                    <FolderTree
                      tree={child}
                      pathBase={[...pathBase, tree.name]}
                      addNewItem={addNewItem}
                      deleteItem={deleteItem}
                    />
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <p>No folders or files</p>
      )}
    </>
  );
};

export default FolderTree;
