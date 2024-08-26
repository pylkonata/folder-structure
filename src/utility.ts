import { StructureNode } from "./components/FolderStructure/FolderStructure";

export const normalizePath = (filePath: string) => {
  const parts = filePath.split("/");
  const stack = [];

  for (const part of parts) {
    if (part === "" || part === ".") {
      continue;
    }
    if (part === "..") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }

  return stack;
};

export const checkIsFile = (part: string) => {
  return part.includes(".") ? true : false;
};

export const createItemObj = (name: string): StructureNode => {
  if (checkIsFile(name)) {
    return {
      type: "file",
      name: name,
      children: null,
    };
  }

  if (!checkIsFile(name)) {
    return {
      type: "folder",
      name: name,
      children: [] as StructureNode[],
    };
  }
};
