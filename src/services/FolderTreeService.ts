import { StructureNode } from "../components/FolderStructure/FolderStructure";
import { checkIsFile, normalizePath } from "../utility";

class FolderTreeService {
  private _structure: StructureNode | null;
  constructor() {
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.processPathSructure = this.processPathSructure.bind(this);
    this.getStructure = this.getStructure.bind(this);
    this.setStructure = this.setStructure.bind(this);
    this._structure = null;
  }
  getStructure(): StructureNode | null {
    return this._structure;
  }

  setStructure(structure: StructureNode | null) {
    this._structure = structure;
  }

  public processPathSructure(path: string): StructureNode | null {
    const normalizedPaths = normalizePath(path);
    const parts = normalizedPaths.split("/").filter((part) => part !== "");

    if (parts.length && !checkIsFile(parts[0])) {
      this._structure = {
        type: "folder",
        name: parts[0],
        children: [],
      };
      let current = this._structure;
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
      this._structure = {
        type: "file",
        name: parts[0],
        children: null,
      };
    } else {
      this._structure = null;
    }
    return this._structure;
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
