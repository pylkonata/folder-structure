# Folder Structure

## To start project:

npm run dev

## Task description:

The project starts with initial options for a long path.
[
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

The first part of the line is converted into a short path
and the folder structure is built on its basis.
The folder structure can be changed by adding or removing folders or deleting a file.
