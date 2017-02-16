import fs from 'fs'
import path from 'path'
import {getChildFiles, prepareFolderSync} from '../../util'

const metricsFolder = './metrics'
const metricsRawDataFolder = path.join(metricsFolder, 'raw')
const metricsFpsFolder = path.join(metricsRawDataFolder, 'fps')
const metricsTestDurationFolder = path.join(metricsRawDataFolder, 'test-duration')
const metricsConcurrentFolder = path.join(metricsRawDataFolder, 'test-concurrent')

class Metrics {
  get metricsRawDataFolder() {
    return metricsRawDataFolder
  }

  /**
   * Add fps data with context
   * @param {object} context  {deviceName,...}, deviceName property will be used as file name,
   * context data will be write into file.
   * @param {number} fpsValue
   */
  addFps(context, fpsValue) {
    prepareFolderSync(metricsFpsFolder)
    const deviceName = context.deviceName || ''
    const fileName = `fps_${deviceName}`

    this._saveToFile(
      path.join(metricsFpsFolder, fileName),
      {
        fps: fpsValue,
        context
      })
  }

  /**
   * Add testDuration data with context
   * @param {[type]} context {deviceName,...}, deviceName property will be used as file name,
   * context data will be write into file.
   * @param {number} durationValue
   */
  addTestDuration(context, durationValue) {
    prepareFolderSync(metricsTestDurationFolder)
    const deviceName = context.deviceName || ''
    const fileName = `duration_${deviceName}`

    this._saveToFile(
      path.join(metricsTestDurationFolder, fileName),
      {
        duration: durationValue,
        context
      })
  }

  /**
   * add concurrentDevice data with context
   * @param {[type]} context {testCaseName,...} testCaseName property will be used as file name,
   * context data will be write into file.
   * @param {number} concurrentValue
   */
  addConcurrentDeviceValue(context, concurrentValue) {
    prepareFolderSync(metricsConcurrentFolder)
    const fileSuffix = context.testCaseName || ''
    const fileName = `concurrent_${fileSuffix}`

    this._saveToFile(
      path.join(metricsConcurrentFolder, fileName),
      {
        concurrent: concurrentValue,
        context
      })
  }

  summaryMetrics(targetDir = metricsFolder) {
    this._prepareInputDir()
    const summaryFps = this._extractFpsData(metricsFpsFolder)
    const summaryTestDuration = this._extractTestDurationData(metricsTestDurationFolder)
    const summaryConcurrentDevice = this._extractConcurrentDeviceValue(metricsConcurrentFolder)

    const summary = {
      summary: {
        // fps: summaryFps.averageFps,  // Considering if we need to write this data
        maxTestDuration: summaryTestDuration.maxTestDuration,
        maxConcurrentDevice: summaryConcurrentDevice.maxConcurrentDevice
      },
      details: {
        fps: summaryFps.details,
        testDuration: summaryTestDuration.details,
        maxConcurrentDevice: summaryConcurrentDevice.details
      }
    }

    this._saveToFile(path.join(metricsFolder, 'summary'), summary)
  }

  _prepareInputDir() {
    prepareFolderSync(metricsFpsFolder)
    prepareFolderSync(metricsTestDurationFolder)
    prepareFolderSync(metricsConcurrentFolder)
  }

  _extractFpsData(parentDir) {
    const deviceFpsList = getChildFiles(parentDir)
      .map((file) => {
        const fullPath = path.join(parentDir, file)
        return JSON.parse(fs.readFileSync(fullPath))
      })

    let averageFps = 0
    if (deviceFpsList.length > 0) {
      const sumFps = deviceFpsList
        .reduce((a, b) => {
          const aFps = (a instanceof Object) ? a.fps : a
          const bFps = (b instanceof Object) ? b.fps : b

          return aFps + bFps
        }, 0)
      averageFps = sumFps / deviceFpsList.length
    }

    return {
      averageFps,
      details: deviceFpsList
    }
  }

  _extractTestDurationData(parentDir) {
    const durationList = getChildFiles(parentDir)
      .map((file) => {
        const fullPath = path.join(parentDir, file)
        return JSON.parse(fs.readFileSync(fullPath))
      })

    let maxTestDuration = 0
    if (durationList.length > 0) {
      maxTestDuration = durationList
        .reduce((a, b) => {
          const aDuration = (a instanceof Object) ? a.duration : a
          const bDuraion = (b instanceof Object) ? b.duration : b

          return Math.max(aDuration, bDuraion)
        }, 0)
    }

    return {
      maxTestDuration,
      details: durationList
    }
  }

  _extractConcurrentDeviceValue(parentDir) {
    const concurrentList = getChildFiles(parentDir)
      .map((file) => {
        const fullPath = path.join(parentDir, file)
        return JSON.parse(fs.readFileSync(fullPath))
      })

    let maxConcurrentDevice = 0
    if (concurrentList.length > 0) {
      maxConcurrentDevice = concurrentList
        .reduce((a, b) => {
          const aConcurrent = (a instanceof Object) ? a.concurrent : a
          const bConcurrent = (b instanceof Object) ? b.concurrent : b

          return Math.max(aConcurrent, bConcurrent)
        }, 0)
    }

    return {
      maxConcurrentDevice,
      details: concurrentList
    }
  }

  _saveToFile(fileName, data) {
    const originFileName = fileName
    let fileIndex = 0
    while (fs.existsSync(fileName)) {
      fileIndex++
      fileName = `${originFileName} (${fileIndex})`
    }

    const content = JSON.stringify(data)
    fs.writeFileSync(fileName, content)
  }
}

export default new Metrics()
