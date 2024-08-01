import ActionBtns from "../ActionBtn/ActionBtns";
import { StructureNode } from "../FolderStructure/FolderStructure";

interface FolderListProps {
  node: StructureNode;
  path?: string[];
  onAddItem: (path: string[]) => void;
  onDeleteItem: (path: string[]) => void;
}

const FolderList = ({
  node,
  path = [],
  onAddItem,
  onDeleteItem,
}: FolderListProps) => {
  return (
    <div className="content">
      <div className="name-wrapper">
        {node?.name}
        {node && (
          <ActionBtns
            path={path}
            node={node}
            onAddItem={onAddItem}
            onDeleteItem={onDeleteItem}
          />
        )}
      </div>
      {node?.children &&
        node?.children.map((child, index) => {
          return (
            <div key={index}>
              <FolderList
                node={child}
                path={[...path, node.name]}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
              />
            </div>
          );
        })}
    </div>
  );
};

export default FolderList;
