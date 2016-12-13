import BPromise from 'bluebird'
import gm from 'gm'
import fs from 'fs'

export function compareImages(imagePath1, imagePath2, tolerance = 0.4) {
  return new BPromise((resolve, reject) => {
    return gm.compare(imagePath1, imagePath2, tolerance, (err, isEqual, equality, raw) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(isEqual)
      }
    })
  })
}

export async function cropImage({tempImagePath, outputImagePath, width, height, x, y}) {
  return new BPromise((resolve, reject) => {
    gm(tempImagePath)
      .strip()
      .crop(width, height, x, y)
      .write(outputImagePath, (err) => {
        fs.unlink(tempImagePath)
        if (err) {
          reject(err)
        }
        else {
          resolve()
        }
      })
  })
}
