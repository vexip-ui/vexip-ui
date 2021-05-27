module.exports = new Proxy(
  {},
  {
    get(target, key) {
      return key !== '__esModule' && key
    }
  }
)
