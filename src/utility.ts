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
  return "/" + stack.join("/");
};

export const checkIsFile = (part: string) => {
  return part.includes(".") ? true : false;
};
