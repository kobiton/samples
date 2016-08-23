import BPromise from 'bluebird'
import gm from 'gm'
import {debug} from '@kobiton/core-util'

export async function compareImages(imagePath1, imagePath2, tolerance = 0.4) {
  
  try {
    return await new BPromise((resolve, reject) => {
      return gm.compare(imagePath1, imagePath2, tolerance, (err, isEqual, equality, raw) => {
        if (err) {
          throw err
        }
        return isEqual
      })
    })
  }
  catch (err) {
    debug.error('global', err)
    return false
  }
}
