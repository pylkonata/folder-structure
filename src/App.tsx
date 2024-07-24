import { useState } from "react";
import "./App.css";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import { pathOptions } from "./constants";

function App() {
  const [selectedPath, setSelectedPath] = useState(
    pathOptions[0].split(", ")[0]
  );

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
                onChange={() => setSelectedPath(path.split(", ")[0])}
              />
              {path}
            </label>
          ))}
        </div>
        <FolderStructure selectedPath={selectedPath} />
      </main>
    </div>
  );
}

export default App;
