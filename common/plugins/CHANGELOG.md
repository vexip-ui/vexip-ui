# [1.4.0](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.3.2...plugins@1.4.0) (2023-09-05)



## [1.3.2](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.3.1...plugins@1.3.2) (2023-03-30)

## [1.3.1](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.2.1...plugins@1.3.1) (2023-03-29)

### Bug Fixes

- **plugins:** support vexip-ui version lower than 2.1.10 ([7e747d2](https://github.com/vexip-ui/vexip-ui/commit/7e747d2882e22aa1acc9b36e082a256675911259))

### Code Refactoring

- switch to use es module to export style files ([#290](https://github.com/vexip-ui/vexip-ui/issues/290)) ([26eb0df](https://github.com/vexip-ui/vexip-ui/commit/26eb0dfbd4a3b862fb4b212aa6d20f3010e74357))

### BREAKING CHANGES

- The scss and css style files no longer contains dependent
  styles for its component. Currently the relationship of styles are included in ts
  (js) files which are use to import the styles. Change the import way of style like:
  `vexip-ui/css/button.css` -> `vexip-ui/es/css/button` and unnecessary to import
  preset style manually.

# [1.3.0](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.2.1...plugins@1.3.0) (2023-03-29)

### Code Refactoring

- switch to use es module to export style files ([#290](https://github.com/vexip-ui/vexip-ui/issues/290)) ([26eb0df](https://github.com/vexip-ui/vexip-ui/commit/26eb0dfbd4a3b862fb4b212aa6d20f3010e74357))

### BREAKING CHANGES

- The scss and css style files no longer contains dependent
  styles for its component. Currently the relationship of styles are included in ts
  (js) files which are use to import the styles. Change the import way of style like:
  `vexip-ui/css/button.css` -> `vexip-ui/es/css/button` and unnecessary to import
  preset style manually.

## [1.2.1](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.2.0...plugins@1.2.1) (2023-02-08)

### Bug Fixes

- **plugins:** correct css file path for dark mode ([#254](https://github.com/vexip-ui/vexip-ui/issues/254)) ([f3aa29b](https://github.com/vexip-ui/vexip-ui/commit/f3aa29b6467fd846c017850e81f588928ac8de8e))

# [1.2.0](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.1.0...plugins@1.2.0) (2022-10-10)

### Features

- **plugins:** add iconPrefix option for resolver ([11ccffd](https://github.com/vexip-ui/vexip-ui/commit/11ccffd91bee0f4491990045b94855bd76db375b))

# [1.1.0](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.0.1...plugins@1.1.0) (2022-10-06)

### Features

- **plugins:** support auto resolve icon components ([#167](https://github.com/vexip-ui/vexip-ui/issues/167)) ([fef768c](https://github.com/vexip-ui/vexip-ui/commit/fef768cd14ccf1245ec3db9e45c3651bc8ca1ca6))

## [1.0.1](https://github.com/vexip-ui/vexip-ui/compare/plugins@1.0.0...plugins@1.0.1) (2022-09-27)

### Bug Fixes

- **plugins:** support typography style alias ([f89cfef](https://github.com/vexip-ui/vexip-ui/commit/f89cfefbe43da61c4fce258e5d55166f89b9b152))

# 1.0.0 (2022-09-16)

# 1.0.0 (2022-09-16)

# 1.0.0 (2022-09-16)
