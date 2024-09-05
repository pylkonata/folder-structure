import "./FolderTree.css";
import ActionBtns from "../ActionBtn/ActionBtns";
import { StructureNode } from "../../services/FolderTreeService";
import ModalForm from "../ModalForm/ModalForm";
import { useRef } from "react";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onAddBtnClick = () => {
    dialogRef?.current?.showModal();
  };

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
                  onAddBtnClick={onAddBtnClick}
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
          <ModalForm
            path={[...pathBase, tree?.name]}
            ref={dialogRef}
            addNewItem={addNewItem}
          />
        </>
      ) : (
        <p>No folders or files</p>
      )}
    </>
  );
};

export default FolderTree;
