import { useState } from "react";
import "./App.css";
import { FolderTree } from "./components/FolderTree";
import { pathOptions } from "./constants";
import FolderTreeService, { StructureNode } from "./services/FolderTreeService";

function App() {
  const [selectedPath, setSelectedPath] = useState(
    pathOptions[0].split(", ")[0]
  );
  const [treeService] = useState(new FolderTreeService(selectedPath));
  const [tree, setTree] = useState(treeService.getStructure());

  const onChangePath = (path: string) => {
    const newSelectedPath = path.split(", ")[0];

    setSelectedPath(newSelectedPath);
    treeService.setStructure(newSelectedPath);
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
        <div className="radio-list">
          {pathOptions.map((path, index) => (
            <label className="label" key={`${index}-${path}`}>
              <input
                type="radio"
                name="path"
                checked={selectedPath === path.split(", ")[0]}
                onChange={() => onChangePath(path)}
              />
              {path}
            </label>
          ))}
        </div>
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
