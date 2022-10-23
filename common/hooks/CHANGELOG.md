## [1.7.2](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.7.1...hooks@1.7.2) (2022-10-23)

## [1.7.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.7.0...hooks@1.7.1) (2022-09-20)

### Features

- support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))

# 1.7.0 (2022-09-16)

# [1.6.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.5.1...hooks@1.6.0) (2022-07-26)

### Bug Fixes

- **hooks:** useVirtual sync scroll top after item resize ([fe7122e](https://github.com/vexip-ui/vexip-ui/commit/fe7122e2a4449608a267959ecc4a874db4480d30))
- **select:** auto scroll to active option ([1e72722](https://github.com/vexip-ui/vexip-ui/commit/1e727223698006a35c7a88af207f2e3027fef0e4))
- **virtual-list:** not emit resize event ([17caeec](https://github.com/vexip-ui/vexip-ui/commit/17caeec1f71d1bb70aab5b6a56bf1e196df9c690))

### Features

- **hooks:** useVirtual add methods to ensure item in view ([e77fc2c](https://github.com/vexip-ui/vexip-ui/commit/e77fc2cab89811c9aafee60152879cc95715453d))

## [1.5.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.5.0...hooks@1.5.1) (2022-07-25)

### Bug Fixes

- **hooks:** useModifier support auto reset when blur ([0f6a993](https://github.com/vexip-ui/vexip-ui/commit/0f6a993096fd81b5d6254137247463fc889f44fd))
- **hooks:** useModifier unable to read activeKeys ([5c36e65](https://github.com/vexip-ui/vexip-ui/commit/5c36e658b97914f8d09c3aec39b8768329049ff1))
- **hooks:** useVirtual implement scroll api methods ([012258a](https://github.com/vexip-ui/vexip-ui/commit/012258a61bf3965d43e36a635b597e819a6e96b0))

### Features

- support accessibility for components ([#97](https://github.com/vexip-ui/vexip-ui/issues/97)) ([51d5556](https://github.com/vexip-ui/vexip-ui/commit/51d555612d72ae495569cfbf56472d6764ac3dce))

## 1.5.0 (2022-07-18)

- types(hooks): fix useClickOutside target param type ([76e64cd](https://github.com/vexip-ui/vexip-ui/commit/76e64cd))
- feat(hooks): usePopper support virtual reference ([da51364](https://github.com/vexip-ui/vexip-ui/commit/da51364))
- fix: useClickoutside directly passing a callback ([ebf4842](https://github.com/vexip-ui/vexip-ui/commit/ebf4842))

# [1.4.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.3.1...hooks@1.4.0) (2022-07-10)

### Bug Fixes

- **hooks:** add both key and code into activeKeys for useModifier ([c2593e5](https://github.com/vexip-ui/vexip-ui/commit/c2593e5aebb65e8c7619a27cd975eb1b80ff8c09))

### Features

- **hooks:** add useModifier mixin ([#75](https://github.com/vexip-ui/vexip-ui/issues/75)) ([d90e021](https://github.com/vexip-ui/vexip-ui/commit/d90e02157525c3d0b8bf6e5b15873b076a4f9dee))

## [1.3.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.3.0...hooks@1.3.1) (2022-06-27)

### Bug Fixes

- **hooks:** add delta states and supoort capture config ([b1fd988](https://github.com/vexip-ui/vexip-ui/commit/b1fd988548689f047fe6a48954830ff9639b1c6e))
- **hooks:** useFullScreen should return the target ([ecdf647](https://github.com/vexip-ui/vexip-ui/commit/ecdf647174d391c937525bb5cd0bd33ceba66a1a))
- **hooks:** useMouse ensure cancelable before disable events ([4aa5686](https://github.com/vexip-ui/vexip-ui/commit/4aa5686a682ea8f5857303dc1e23db3bedac4899))
- **hooks:** useMoving default prevent mouse and touch events ([3cb1674](https://github.com/vexip-ui/vexip-ui/commit/3cb167467d95d16c1f5f8cc1ae2ef35f34cdf8af))

# [1.3.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.2.0...hooks@1.3.0) (2022-06-27)

### Features

- **mixin:** add useMoving mixin ([2e48731](https://github.com/vexip-ui/vexip-ui/commit/2e4873162aea74d54972e2cbc6de751db588ec6c))
- **hooks:** add useFullScreen mixin ([0c8ac3a](https://github.com/vexip-ui/vexip-ui/commit/0c8ac3a23335828a3a1d9b8db0562e58115853de))
- **hooks:** add useListener mixin ([8a483b3](https://github.com/vexip-ui/vexip-ui/commit/8a483b3d3195f216c8501f5f5297555c1b769494))
- **hooks:** add usePointer mixin ([c6c3112](https://github.com/vexip-ui/vexip-ui/commit/c6c3112f65a6e245296ff3ba6eadd98274dfa80d))

# [1.2.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.1.0...hooks@1.2.0) (2022-06-14)

### Bug Fixes

- **hooks:** assert type for HTMLElement refs ([c4bf386](https://github.com/vexip-ui/vexip-ui/commit/c4bf3866a14d341761ececc97a441c2206ffb398))

### Features

- **hooks:** add useSetTimeout and useSetInterval ([44b63e7](https://github.com/vexip-ui/vexip-ui/commit/44b63e7bdb5c31f0d7712cf4f8dcf9535ac581d4))

# [1.1.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.0.0...hooks@1.1.0) (2022-05-28)

### Code Refactoring

- icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))

### Features

- **hooks:** add useMounted mixin ([a89cdeb](https://github.com/vexip-ui/vexip-ui/commit/a89cdeb61a6eb9c5e7ff0455f017a72d944e5509))
- **hooks:** add useResize mixin ([5d139e3](https://github.com/vexip-ui/vexip-ui/commit/5d139e3cca81bf5803e467fddf56f36befc41765))
- **hooks:** add useVirtual mixin ([01827aa](https://github.com/vexip-ui/vexip-ui/commit/01827aa25611c737d50d9e62b6b98d1e951abd6e))

### BREAKING CHANGES

- All icons have rewrite to svg vue components, package has published to
  `@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before
  way which import from `vexip-ui/icons/**`.

# 1.0.0 (2022-04-29)

### Bug Fixes

- **dropdown:** flush nested drop first item ([3992b7f](https://github.com/vexip-ui/vexip-ui/commit/3992b7f20d5a5a93e400dec123b787fb73a36d81))
- **popper:** watch wrapper and popper el change ([4fb0ca5](https://github.com/vexip-ui/vexip-ui/commit/4fb0ca568322df5b2046b5f985337f8dc78ef381))

### Features

- **ellipsis:** add ellipsis component ([1fefc1b](https://github.com/vexip-ui/vexip-ui/commit/1fefc1b1546db69299952d957e15de842f89eab8))
