module.exports = function visualTestingTasks(cypressConfig) {
  return {
    "maybeFileExists": ({ filePath }) => {
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
