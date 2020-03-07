const { join } = require('path')
const { existsSync, symlinkSync } = require('fs')
const packageJson = require('../package.json')

// Paths of the symbolic link that we'll create.
const scriptCallDirectory = process.cwd()
const originalOutputDirectory = join(scriptCallDirectory, 'lib')
const linkedOutputDirectory = join(scriptCallDirectory, `node_modules/${packageJson.name}/linked-output`)

// Create the link.
module.exports = function link() {
  try {
    symlinkSync(originalOutputDirectory, linkedOutputDirectory, 'dir')
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.log(error)
    }
  }
}
