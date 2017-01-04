import fs from 'fs'

export function prepareFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}
