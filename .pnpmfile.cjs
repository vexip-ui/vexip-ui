function readPackage(pkg) {
  /** @type Record<string, string> */
  const deps = pkg.dependencies

  if (deps.fsevents && deps.fsevents.match(/[\^~]?1./)) {
    deps.fsevents = '^2.3.2'
  } else if (deps.chokidar && deps.chokidar.match(/[\^~]?2./)) {
    deps.chokidar = '^3.5.3'
  } else if (deps.micromatch && deps.micromatch.match(/[\^~]?3./)) {
    deps.micromatch = '^4.0.5'
  } else if (deps.uuid && deps.uuid.match(/[\^~]?3./)) {
    deps.uuid = '^7.0.3'
  } else if (deps.loupe && deps.loupe.match(/[\^~]?2\.3\.[0-6]/)) {
    deps.loupe = '^2.3.7'
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
