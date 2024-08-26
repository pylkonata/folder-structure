import { StructureNode } from "../components/FolderStructure/FolderStructure";
import { checkIsFile, normalizePath } from "../utility";

class FolderTreeService {
  private _structure: StructureNode | null;
  constructor(value: string) {
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.processPathSructure = this.processPathSructure.bind(this);
    this.getStructure = this.getStructure.bind(this);
    this.setStructure = this.setStructure.bind(this);
    this._structure = this.processPathSructure(value);
  }
  getStructure(): StructureNode | null {
    return this._structure;
  }

  setStructure(structure: StructureNode | null) {
    this._structure = structure;
  }

  public processPathSructure(path: string): StructureNode | null {
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
    } else if (pathArr.length && checkIsFile(pathArr[0])) {
      this._structure = {
        type: "file",
        name: pathArr[0],
        children: null,
      };
    } else {
      this._structure = null;
    }

    return this._structure;
  }

  public addItem(
    path: string[],
    newItem: StructureNode,
    setFunction: (value: StructureNode) => void
  ): void {
    const newStructure = { ...this._structure };
    let current = newStructure;
    if (path.length > 1) {
      for (let i = 1; i < path.length; i++) {
        current = current.children.find((child) => child.name === path[i]);
      }
    }
    current.children.push(newItem);
    this._structure = newStructure;

    setFunction(this._structure);
  }

  public deleteItem(
    path: string[],
    setFunction: (value: StructureNode) => void
  ): void {
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
    setFunction(this._structure);
  }
}
export default FolderTreeService;
