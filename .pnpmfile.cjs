function readPackage(pkg) {
  if (pkg.dependencies.fsevents && pkg.dependencies.fsevents.match(/[\^~]?1./)) {
    pkg.dependencies.fsevents = '^2.3.2'
  } else if (pkg.dependencies.chokidar && pkg.dependencies.chokidar.match(/[\^~]?2./)) {
    pkg.dependencies.chokidar = '^3.5.3'
  } else if (pkg.dependencies.micromatch && pkg.dependencies.micromatch.match(/[\^~]?3./)) {
    pkg.dependencies.micromatch = '^4.0.5'
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
