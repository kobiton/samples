import {prepareFolder} from '../../util'
import winston from 'winston'
import moment from 'moment'

const logFolder = `logs/${moment().format('YYYY-MM-DD-HH-mm')}`
prepareFolder(logFolder)

const logLevel = 'info'
export function writePassLog(
  logContext,
  value
) {
  const logFileName = `passed_${logContext}_${Date.now()}.log`
  const logger = getLoggerByName(logFileName)
  logger.log(logLevel, value)
}

export function writeFailedLog(
  logContext,
  value,
  metadata
) {
  const logFileName = `failed_${logContext}_${Date.now()}.log`
  const logger = getLoggerByName(logFileName)
  logger.log(logLevel, value, JSON.stringify(metadata))
}

const loggerMap = {}
function getLoggerByName(logFileName) {
  let logger = loggerMap[logFileName]
  if (!logger) {
    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({filename: `${logFolder}/${logFileName}`})
      ]
    })
    loggerMap[logFileName] = logger
  }

  return logger
}
