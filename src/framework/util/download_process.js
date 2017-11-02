import fs from 'fs'
import tmp from 'tmp'
import path from 'path'
import request from 'request'
import progress from 'request-progress'
import EventEmitter from 'events'
import {debug} from '@kobiton/core-util'

export default class DownloadProcess extends EventEmitter {

  /**
   * Downloads a file from url.
   * @param {String} - the url to download.
   * @param {String} - the target file location.
   */
  download(url, target) {
    if (target) {
      this._downloadWithTarget(url, target)
    }
    else {
      tmp.file({postfix: path.extname(url)}, (err, path) => {
        if (err) return this.emit('error', err)
        this._downloadWithTarget(url, path)
      })
    }
  }

  /**
   * Cancels the current download
   */
  cancel() {
    this._cancel = true
    this._request.abort()
  }

  _downloadWithTarget(url, target) {
    const writerStream = fs.createWriteStream(target)
    debug.log('downloader', `Saving to ${target}`)

    this._request = request(url)
    this._request.on('abort', () => {
      if (this._cancel) this.emit('error', new Error('Download is cancelled'))
    })

    progress(this._request, {throttle: 2000, delay: 1000})
      .on('progress', (state) => this.emit('progress', state))
      .on('error', (err) => this.emit('error', err))
      .pipe(writerStream)

    writerStream
      .on('error', (err) => this.emit('error', err))
      .on('finish', () => {
        // Both cancel and success download fire finish event.
        // Use _cancel to determine which case triggers this event
        if (!this._cancel) this.emit('finish', target)
      })
  }
}
