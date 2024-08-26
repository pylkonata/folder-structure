import "./FolderStructure.css";
import FolderList from "../FolderList/FolderList";
import FolderTreeService from "../../services/FolderTreeService";
import { useEffect, useMemo, useState } from "react";

interface FolderStructureProps {
  selectedPath: string;
}

export type StructureNode = {
  type: string;
  name: string;
  children: StructureNode[] | null;
};

const FolderStructure = ({ selectedPath }: FolderStructureProps) => {
  const treeService = useMemo(
    () => new FolderTreeService(selectedPath),
    [selectedPath]
  );

  const [structure, setStructure] = useState(treeService.getStructure());

  useEffect(() => {
    setStructure(treeService.getStructure());
  }, [selectedPath, treeService]);

  return (
    <FolderList
      service={treeService}
      structure={structure}
      setStructure={setStructure}
    />
  );
};

export default FolderStructure;
