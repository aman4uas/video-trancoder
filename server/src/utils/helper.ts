const getFileExtension = (fileName: string) => {
  const parts = fileName.split('.')
  const extension = parts[parts.length - 1]
  return extension.toLowerCase()
}

export { getFileExtension }
