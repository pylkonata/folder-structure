import { useState } from "react";
import "./App.css";
import { FolderTree } from "./components/FolderTree";
import { DEFAULT_PATH } from "./constants";
import FolderTreeService, { StructureNode } from "./services/FolderTreeService";
import PathesList from "./components/PathesList/PathesList";

const treeService = new FolderTreeService(DEFAULT_PATH);

function App() {
  const [tree, setTree] = useState(() => treeService.getStructure());

  const onChangePath = (path: string) => {
    treeService.setStructure(path);
    setTree(treeService.getStructure());
  };

  const addNewItem = (path: string[], item: StructureNode) => {
    treeService.addItem(path, item);
    setTree(treeService.getStructure());
  };

  const removeItem = (path: string[]) => {
    treeService.deleteItem(path);
    setTree(treeService.getStructure());
  };

  return (
    <div className="App">
      <h1>Folder Structure</h1>
      <main className="main">
        <PathesList onChangePath={onChangePath} />
        <FolderTree
          tree={tree}
          addNewItem={addNewItem}
          deleteItem={removeItem}
        />
      </main>
    </div>
  );
}

export default App;
