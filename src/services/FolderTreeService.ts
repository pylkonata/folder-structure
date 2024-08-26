import { checkIsFile, normalizePath } from "../utility";

export type StructureNode = {
  type: string;
  name: string;
  children: StructureNode[] | null;
};

class FolderTreeService {
  _structure: StructureNode | null;

  constructor(value: string) {
    this.setStructure(value);
  }

  getStructure(): StructureNode | null {
    return this._structure;
  }

  setStructure(path: string) {
    return this.processPathSructure(path);
  }

  public processPathSructure(path: string): void {
    const pathArr = normalizePath(path);

    if (pathArr.length && !checkIsFile(pathArr[0])) {
      this._structure = {
        type: "folder",
        name: pathArr[0],
        children: [],
      };
      let current = this._structure;
      for (let i = 1; i < pathArr.length; i++) {
        const isFile = checkIsFile(pathArr[i]);
        const newNode = {
          type: isFile ? "file" : "folder",
          name: pathArr[i],
          children: isFile ? null : ([] as StructureNode[]),
        };

        current.children.push(newNode as StructureNode);
        if (!isFile) {
          current = newNode;
        }
      }
      this._structure = current;
    } else if (pathArr.length && checkIsFile(pathArr[0])) {
      this._structure = {
        type: "file",
        name: pathArr[0],
        children: null,
      };
    } else {
      this._structure = null;
    }
  }

  public addItem(path: string[], newItem: StructureNode): void {
    const newStructure = { ...this._structure };
    let current = newStructure;
    if (path.length > 1) {
      for (let i = 1; i < path.length; i++) {
        current = current.children.find((child) => child.name === path[i]);
      }
    }
    current.children.push(newItem);
    this._structure = newStructure;
  }

  public deleteItem(path: string[]): void {
    let newStructure = { ...this._structure };
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
    this._structure = newStructure;
  }
}
export default FolderTreeService;
