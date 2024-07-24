import { StructureNode } from "./components/FolderStructure/FolderStructure";

export const normalizePath = (filePath: string) => {
  const parts = filePath.split("/");
  const stack = [];

  for (const part of parts) {
    if (part === "" || part === ".") {
      continue;
    } else if (part === "..") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }
  return "/" + stack.join("/");
};

export const checkIsFile = (part: string) => {
  return part.includes(".") ? true : false;
};

export const processPathSructure = (path: string) => {
  const normalizedPaths = normalizePath(path);
  const parts = normalizedPaths.split("/").filter((part) => part !== "");

  let structure: StructureNode | null;
  if (parts.length && !checkIsFile(parts[0])) {
    structure = {
      type: "folder",
      name: parts[0],
      children: [],
    };
    let current = structure;
    for (let i = 1; i < parts.length; i++) {
      const isFile = checkIsFile(parts[i]);
      const newNode = {
        type: isFile ? "file" : "folder",
        name: parts[i],
        children: isFile ? null : ([] as StructureNode[]),
      };

      current.children.push(newNode as StructureNode);
      if (!isFile) {
        current = newNode;
      }
    }
  } else if (parts.length && checkIsFile(parts[0])) {
    structure = {
      type: "file",
      name: parts[0],
      children: null,
    };
  } else {
    structure = null;
  }

  return structure;
};

export const addItem = (
  structure: StructureNode,
  setStructure: React.Dispatch<React.SetStateAction<StructureNode>>,
  path: string[],
  newItem: StructureNode
) => {
  const newStructure = { ...structure };
  let current = newStructure;
  if (path.length > 1) {
    for (let i = 1; i < path.length; i++) {
      current = current.children.find((child) => child.name === path[i]);
    }
  }
  current.children.push(newItem);
  setStructure(() => newStructure);
};

export const deleteItem = (
  structure: StructureNode,
  setStructure: React.Dispatch<React.SetStateAction<StructureNode>>,
  path: string[]
) => {
  let newStructure = { ...structure };
  let current = newStructure;
  let currentIndex: number;

  if (path.length === 1) {
    newStructure = null;
  }

  if (path.length > 1) {
    for (let i = 1; i < path.length - 1; i++) {
      current = current.children.find((child) => child.name === path[i]);
    }

    currentIndex = current.children.findIndex(
      (child) => child.name === path[path.length - 1]
    );
    current.children.splice(currentIndex, 1);
  }
  setStructure(() => newStructure);
};
