const fs = require("fs");
const path = require("path");

const sourceDirPath = path.join(__dirname, "../app/dist/assets");
const destinationDirPath = path.join(__dirname, "./");
console.log(sourceDirPath);

fs.readdir(sourceDirPath, (err, files) => {
  if (err) throw err;

  const jsFiles = files.filter((file) => path.extname(file) === ".js");

  jsFiles.forEach((file) => {
    const sourceFilePath = path.join(sourceDirPath, file);
    const destinationFilePath = path.join(destinationDirPath, "rjs.js");

    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
      if (err) throw err;
      console.log(`File successfully copied`);
    });
  });
});
