module.exports = function visualTestingTasks(cypressConfig) {
  return {
    "doesFileExist": ({ filePath }) => {
      const fs = require('fs/promises')

      filePath = filePath.trim().replace(/^(\/*)/, '')

      return new Promise((resolve, _) => {
        fs.stat(`${cypressConfig.screenshotsFolder}/${filePath}`)
          .then(() => resolve(true))
          .catch(err => (console.error(err), resolve(false)))
      })
    },
  }
}
