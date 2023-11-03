import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generate } from './generate'
import { logger } from '../utils'
import { version } from '../../package.json'

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
  .scriptName('vexip-cli')
  .command(
    ['gen [temp]', 'g', 'generate'],
    'Generate the specified template',
    args =>
      args
        .positional('temp', {
          type: 'string',
          choices: ['types']
        })
        .option('cwd', {
          default: process.cwd(),
          type: 'string',
          desc: 'specify the current working directory'
        })
        .option('force', {
          alias: 'f',
          type: 'boolean',
          desc: 'force generate even a file exists with same name'
        })
        .option('prefix', {
          alias: 'p',
          type: 'string',
          desc: 'specify component prefix for generating types'
        })
        .option('output', {
          alias: 'o',
          type: 'string',
          desc: 'specify component prefix for generating types'
        }),
    args => generate(args).catch(error => logger.withBothLn(() => logger.error(error)))
  )
  .version(version)
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .showHelpOnFail(false).argv
