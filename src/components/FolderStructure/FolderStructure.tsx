import { useEffect, useMemo, useRef, useState } from "react";
import "./FolderStructure.css";
import { checkIsFile } from "../../utility";
import FolderList from "../FolderList/FolderList";
import FolderTreeService from "../../services/FolderTreeService";
import ModalForm from "../ModalForm/ModalForm";

interface FolderStructureProps {
  selectedPath: string;
}

export type StructureNode = {
  type: string;
  name: string;
  children: StructureNode[] | null;
};

const FolderStructure = ({ selectedPath }: FolderStructureProps) => {
  const treeService = useMemo(() => new FolderTreeService(), []);
  const [structure, setStructure] = useState<StructureNode | null>(() =>
    treeService.processPathSructure(selectedPath)
  );
  const [name, setName] = useState("");
  const [path, setPath] = useState([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setStructure(() => treeService.processPathSructure(selectedPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPath]);

  const onPathChange = (path: string[]) => {
    setPath(() => path);
  };

  const closeDialog = () => {
    setName("");
    dialogRef?.current?.close();
  };

  const openDialog = () => {
    dialogRef?.current?.showModal();
  };

  const onClickAddBtn = (path: string[]) => {
    onPathChange(path);
    openDialog();
  };

  const onDeleteItem = (path: string[]) => {
    treeService.deleteItem(path);
    setStructure(() => treeService.getStructure());
  };

  const addItem = (path: string[]) => {
    if (!checkIsFile(name)) {
      treeService.addItem(path, {
        type: "folder",
        name: name,
        children: [],
      });

      setStructure(() => treeService.getStructure());
    }

    if (checkIsFile(name)) {
      treeService.addItem(path, {
        type: "file",
        name: name,
        children: null,
      });
      setStructure(() => treeService.getStructure());
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && name.trim()) {
      addItem(path);
      closeDialog();
      setName("");
    }
  };

  return (
    <>
      {structure ? (
        <FolderList
          node={structure}
          onAddItem={onClickAddBtn}
          onDeleteItem={onDeleteItem}
        />
      ) : (
        <p>No folders or files</p>
      )}

      <ModalForm
        ref={dialogRef}
        handleFormSubmit={handleFormSubmit}
        closeDialog={closeDialog}
        name={name}
        handleNameChange={handleNameChange}
      />
    </>
  );
};

export default FolderStructure;
