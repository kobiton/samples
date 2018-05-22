import fs from 'fs'
import moment from 'moment'
import winston from 'winston'
import {prepareFolderSync} from '../../util'

const logFolder = `logs/${moment().format('YYYY-MM-DD-HH-mm')}`
prepareFolderSync(logFolder)

winston.handleExceptions([
  new winston.transports.File({filename: `${logFolder}/error.log`}),
  new winston.transports.Console()
])

/**
 * Write value message to a log file which name containing context
 * @param  {string} logContext        context will be include in filename
 * @param  {object/string} value      string or object, the message to write into the log file
 */
export function writeSuccess(logContext, value) {
  const filename = `${logFolder}/success_${logContext || ''}.${Date.now()}.log`
  const message = value instanceof String ? value : JSON.stringify(value)
  fs.writeFileSync(filename, message)
}

/**
 * Write value message to a log file which name containing context
 * @param  {string} logContext        context will be include in filename
 * @param  {object/string} value      string or object, the message to write into the log file
 */
export function writeFailure(logContext, value) {
  const filename = `${logFolder}/failed_${logContext || ''}.${Date.now()}.log`
  const message = value instanceof String ? value : JSON.stringify(value)
  fs.writeFileSync(filename, message)
}

export function writeLog(message, value, {logFileName = 'debug.log'} = {}) {
  const fullLogPath = `${logFolder}/${logFileName || ''}`
  let metadata = ''
  if (value) {
    metadata = value instanceof String ? value : JSON.stringify(value)
  }
  if (metadata) {
    fs.appendFileSync(fullLogPath, `${message} : ${metadata} \n`)
  }
  else {
    fs.appendFileSync(fullLogPath, `${message}\n`)
  }
}
