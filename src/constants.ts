export const pathOptions = [
  "/dir/subdir/../file.txt, /dir/file.txt",
  "/dir/subdir/../../file.txt, /file.txt",
  "/dir/subdir/../../../file.txt, /file.txt",
  "/dir/subdir/.././.././../file.txt, /file.txt",
  "/dir/subdir/a/b/c/d/../../../../file.txt, /dir/subdir/file.txt",
  "/dir//file.txt, /dir/file.txt",
  "/dir///file.txt, /dir/file.txt",
  "/dir////file.txt, /dir/file.txt",
  "/dir/, /dir",
  "/dir/.., /",
  "/, /",
  "///////////, /",
  "/dir/./././././file.txt, /dir/file.txt",
  "/dir/subdir/../../../subdir/../file.txt, /file.txt",
  "/dir/subdir/../../../sub_dir/subsubdir/../file.txt, /sub_dir/file.txt",
];

export const DEFAULT_PATH = pathOptions[0].split(", ")[0];
