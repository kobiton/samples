import mongoose from 'mongoose'
import BPromise from 'bluebird'
import {createTestCaseSchema} from './schema/testcase'
import * as logger from '../../logger'
import config from '../../../config/test'

mongoose.Promise = BPromise

if (!mongoose.connection.readyState) {
  mongoose.connect(config.testDb.connectionUri)
}
const db = mongoose.connection

db.on('error', (err) => {
  logger.writeLog('Error connecting testDb: ', err)
})

// connection must be close because mongoose 'hold' process
// until connection was closed
function closeConnection() {
  mongoose.disconnect()
}

export default {
  TestCase: createTestCaseSchema(),
  closeConnection
}
