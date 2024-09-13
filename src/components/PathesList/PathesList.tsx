import { useState } from "react";
import { DEFAULT_PATH, pathOptions } from "../../constants";
import "./PathesList.css";

interface PathesListProps {
  onChangePath: (path: string) => void;
}

function PathesList({ onChangePath }: PathesListProps) {
  const [selectedPath, setSelectedPath] = useState(DEFAULT_PATH);

  const changePath = (path: string) => {
    const newSelectedPath = path.split(", ")[0];

    onChangePath(newSelectedPath);
    setSelectedPath(newSelectedPath);
  };

  return (
    <div className="radio-list">
      {pathOptions.map((path, index) => (
        <label className="label" key={`${index}-${path}`}>
          <input
            type="radio"
            name="path"
            checked={selectedPath === path.split(", ")[0]}
            onChange={() => changePath(path)}
          />
          {path}
        </label>
      ))}
    </div>
  );
}

export default PathesList;
