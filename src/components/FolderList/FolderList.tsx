import FolderTreeService from "../../services/FolderTreeService";
import ActionBtns from "../ActionBtn/ActionBtns";
import { StructureNode } from "../FolderStructure/FolderStructure";

interface FolderListProps {
  service: FolderTreeService;
  structure: StructureNode;
  pathBase?: string[];
  setStructure: (value: StructureNode) => void;
}

const FolderList = ({
  service,
  structure,
  pathBase = [],
  setStructure,
}: FolderListProps) => {
  return (
    <>
      {structure ? (
        <>
          <div className="content">
            <div className="name-wrapper">
              {structure?.name}
              {structure && (
                <ActionBtns
                  pathBase={pathBase}
                  node={structure}
                  service={service}
                  setStructure={setStructure}
                />
              )}
            </div>
            {structure?.children &&
              structure?.children.map((child, index) => {
                return (
                  <div key={index}>
                    <FolderList
                      service={service}
                      structure={child}
                      pathBase={[...pathBase, structure.name]}
                      setStructure={setStructure}
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

export default FolderList;
