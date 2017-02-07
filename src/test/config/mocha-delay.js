import createMochaConfig from '../../framework/config/mocha-conf'

export default function createConfig({reporter, reportDir, reportName, mochaFile} = {}) {
  const defaultConfig = createMochaConfig()
  return {
    ...defaultConfig,
    delay: true
  }
}
