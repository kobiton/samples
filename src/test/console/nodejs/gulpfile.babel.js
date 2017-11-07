import 'babel-polyfill'
import {debug} from '@kobiton/core-util'
import args from 'commander'
import gulp from 'gulp'
import * as executor from './NodejsExecutor'

debug.enable('*')

function list(val) {
  return val.split(',')
}

args
  .version('0.1.0')
  .option('-L, --lib [lib]', 'Lib to check (wd, selenium)', 'wd')
  .option('-N, --numberOfVersion [numberOfVersion]', 'Number of version to check', 2)
  .option('-V, --versions [items]', 'List of specific version', list)
  .parse(process.argv)

gulp.task('check-with', () => {
  const libName = args.lib
  const numberOfVersion = args.numberOfVersion
  const specificVersions = args.versions

  debug.log(`[check-with] ${libName} numberOfVersion: ${numberOfVersion} specificVersions: ${specificVersions}`)

  return executor.execute({
    libName,
    numberOfVersion,
    specificVersions,
    command: `yarn ${libName}-test`
  })
})
