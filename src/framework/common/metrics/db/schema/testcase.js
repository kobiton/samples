import mongoose from 'mongoose'

export function createTestCaseSchema() {
  const schema = new mongoose.Schema({
    reportName: {type: String, index: true},
    testCaseName: {type: String, index: true},
    specHash: String,
    file: String,
    start: {type: Date, index: true},
    duration: Number,
    state: {type: String, index: true},
    parents: Array,
    metadata: {type: mongoose.Schema.Types.Mixed, index: true},
    runner: mongoose.Schema.Types.Mixed,
    error: {type: mongoose.Schema.Types.Mixed, index: true}
  })

  return mongoose.model('TestCase', schema)
}
