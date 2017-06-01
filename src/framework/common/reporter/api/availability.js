import BPromise from 'bluebird'
import BaseAPI from './base'
import config from '../../../config/test'
import {removeSlash} from '../../../util'

const ERR_MAX_LENGTH = 20000
const ERR_INDEX_MAX_LENGTH = 250

class AvailabitityAPI extends BaseAPI {
  async add(availabitities, {parallelSending = false} = {}) {
    for (const a of availabitities) {
      if (a.stderr) {
        a.stderr = this._sliceTail(a.stderr, ERR_MAX_LENGTH)
        a.stderrIndex = this._sliceTail(a.stderr, ERR_INDEX_MAX_LENGTH)
      }
    }

    if (!parallelSending) {
      return this._add(availabitities)
    }
    else {
      const jobs = availabitities.map(a => this._add([a]))
      return BPromise.all(jobs)
    }
  }

  _add(availabitities) {
    return this._send({
      method: 'POST',
      url: `${removeSlash(config.report.serverUrl)}/availability`,
      body: availabitities
    })
  }

  _sliceTail(sourceText, length) {
    const beginIndex = Math.max(sourceText.length - length, 0)
    return sourceText.slice(beginIndex, sourceText.length)
  }
}

export default new AvailabitityAPI()
