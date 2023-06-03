const getFilePath = (file) => {
  const filePath = file.path;

  // Obs: filePath.split("/") para entornos no Windows
  const fileSplit = filePath.split("\\");

  return `${fileSplit[1]}/${fileSplit[2]}`;
};

module.exports = {
  getFilePath,
};
