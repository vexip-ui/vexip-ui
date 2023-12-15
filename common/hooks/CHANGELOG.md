## [2.2.3](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.2.2...hooks@2.2.3) (2023-12-07)



## [2.2.2](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.2.1...hooks@2.2.2) (2023-12-07)



## [2.2.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.2.0...hooks@2.2.1) (2023-11-29)


### 🐞 Bug Fixes

* **hooks:** useVirtual support wrapper changed ([6ab1558](https://github.com/vexip-ui/vexip-ui/commit/6ab1558adcdb2dfe61b5c2047067ae81c1cecf87))


### 👓 Types

* normalize MaybeRef type ([8ac0762](https://github.com/vexip-ui/vexip-ui/commit/8ac07623268844cecc0e7d8674d321614bc08edf))



# [2.2.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.1.1...hooks@2.2.0) (2023-11-23)


### ✨ Features

* **hooks:** add watchPauseable util method ([183eb73](https://github.com/vexip-ui/vexip-ui/commit/183eb73c8c70fbc8e5d331e8607c90acfacd857c))



## [2.1.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.1.0...hooks@2.1.1) (2023-11-20)


### ✨ Features

* **full-screen:** add onToggle event ([8c89cde](https://github.com/vexip-ui/vexip-ui/commit/8c89cde57358217266af3f29f5cd928fa65d126e))


### 🐞 Bug Fixes

* **hooks:** improve useFullScreen methods return ([20cec1b](https://github.com/vexip-ui/vexip-ui/commit/20cec1b002f7e54322a697f3352db756596a787e))


### 🔨 Code Refactoring

* support globally config hover delay, defaults to 100ms ([b409d01](https://github.com/vexip-ui/vexip-ui/commit/b409d011e01c0d44e8c84496faff36e8613fab8b))



# [2.1.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.0.2...hooks@2.1.0) (2023-11-03)


### ✨ Features

* **hooks:** add hook to observe current theme ([709c943](https://github.com/vexip-ui/vexip-ui/commit/709c9433cb55f9fce16b94f825a144d0fe0e18ff))
* **tooltip:** support limit tip inside visible area ([a65ff70](https://github.com/vexip-ui/vexip-ui/commit/a65ff7024281078f0296695fe29f5d301340b530))



## [2.0.2](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.0.1...hooks@2.0.2) (2023-09-22)


### 🐞 Bug Fixes

* **hooks:** improve createSlotRender method ([70a0ce9](https://github.com/vexip-ui/vexip-ui/commit/70a0ce9d1ead1a590a2aa5849777cd7428e50ca3))



## [2.0.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@2.0.0...hooks@2.0.1) (2023-09-01)


### Bug Fixes

* **hooks:** click outside event should process in capture ([8d59f55](https://github.com/vexip-ui/vexip-ui/commit/8d59f55a3212436431317907682e516162ef88ab))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **hooks:** remove toValue for Vue 3.2 compat ([c219e0f](https://github.com/vexip-ui/vexip-ui/commit/c219e0f507be5c7a3ab6c4c0aa2da4c64ff99d8e))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))
* **hooks:** usePopper compat array type offset property ([a5a6da4](https://github.com/vexip-ui/vexip-ui/commit/a5a6da41e0d8623d216288c96bf29629d59dbf68))
* **hooks:** usePopper correct popper element style ([8412cd5](https://github.com/vexip-ui/vexip-ui/commit/8412cd53b792daa11d66d8f3454fb669f725cfcd))
* **hooks:** usePopper optional wrapper property ([67456e8](https://github.com/vexip-ui/vexip-ui/commit/67456e8ec903cbff37cfdb74f9956491386f2b42))


### Features

* **auto-complete:** support control show list if empty ([34f2f1a](https://github.com/vexip-ui/vexip-ui/commit/34f2f1aeb28e6b843e72909f83df53ced7787d47))
* **hooks:** add unrefElement method ([cf73f4b](https://github.com/vexip-ui/vexip-ui/commit/cf73f4b9d83d6c9c0c605450d57a95de4659c36e))
* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))
* **hooks:** useIntersection support numberish rootMargin ([b7a2bb4](https://github.com/vexip-ui/vexip-ui/commit/b7a2bb40b62e9e82be23cbd4b8bd7a8d5778931f))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* **hooks:** usePopper add autoUpdate property ([3157882](https://github.com/vexip-ui/vexip-ui/commit/31578822a30a65babd70c6a79aa0e0286a0400c6))
* **hooks:** usePopper support shift property ([912055f](https://github.com/vexip-ui/vexip-ui/commit/912055f59d749fc7e676444a5ecb9d93548ed2f5))
* **hooks:** usePopper supports dynamic arrow position ([7cce562](https://github.com/vexip-ui/vexip-ui/commit/7cce56204f5ca0ab7852fa47b2d9b1680f38b02c))
* support rtl for components ([#344](https://github.com/vexip-ui/vexip-ui/issues/344)) ([76bab50](https://github.com/vexip-ui/vexip-ui/commit/76bab500aec0fd5d31c65eaf6af0d66ea0f4479b)), closes [#353](https://github.com/vexip-ui/vexip-ui/issues/353)
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **tour:** support keyboard actions ([d8a4617](https://github.com/vexip-ui/vexip-ui/commit/d8a461722a71db6e1017ada1ea349b02ed621286))
* **tree:** support virtual scroll and disable transition ([#396](https://github.com/vexip-ui/vexip-ui/issues/396)) ([3a9370b](https://github.com/vexip-ui/vexip-ui/commit/3a9370bd4d9a54b37f3bbea44c82fad50791c34b))



# [2.0.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.11.4...hooks@2.0.0) (2023-08-23)


### Bug Fixes

* **hooks:** click outside event should process in capture ([8d59f55](https://github.com/vexip-ui/vexip-ui/commit/8d59f55a3212436431317907682e516162ef88ab))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **hooks:** remove toValue for Vue 3.2 compat ([c219e0f](https://github.com/vexip-ui/vexip-ui/commit/c219e0f507be5c7a3ab6c4c0aa2da4c64ff99d8e))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))
* **hooks:** usePopper compat array type offset property ([a5a6da4](https://github.com/vexip-ui/vexip-ui/commit/a5a6da41e0d8623d216288c96bf29629d59dbf68))
* **hooks:** usePopper correct popper element style ([8412cd5](https://github.com/vexip-ui/vexip-ui/commit/8412cd53b792daa11d66d8f3454fb669f725cfcd))
* **hooks:** usePopper optional wrapper property ([67456e8](https://github.com/vexip-ui/vexip-ui/commit/67456e8ec903cbff37cfdb74f9956491386f2b42))


### Features

* **auto-complete:** support control show list if empty ([34f2f1a](https://github.com/vexip-ui/vexip-ui/commit/34f2f1aeb28e6b843e72909f83df53ced7787d47))
* **hooks:** add unrefElement method ([cf73f4b](https://github.com/vexip-ui/vexip-ui/commit/cf73f4b9d83d6c9c0c605450d57a95de4659c36e))
* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))
* **hooks:** useIntersection support numberish rootMargin ([b7a2bb4](https://github.com/vexip-ui/vexip-ui/commit/b7a2bb40b62e9e82be23cbd4b8bd7a8d5778931f))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* **hooks:** usePopper add autoUpdate property ([3157882](https://github.com/vexip-ui/vexip-ui/commit/31578822a30a65babd70c6a79aa0e0286a0400c6))
* **hooks:** usePopper support shift property ([912055f](https://github.com/vexip-ui/vexip-ui/commit/912055f59d749fc7e676444a5ecb9d93548ed2f5))
* **hooks:** usePopper supports dynamic arrow position ([7cce562](https://github.com/vexip-ui/vexip-ui/commit/7cce56204f5ca0ab7852fa47b2d9b1680f38b02c))
* support rtl for components ([#344](https://github.com/vexip-ui/vexip-ui/issues/344)) ([76bab50](https://github.com/vexip-ui/vexip-ui/commit/76bab500aec0fd5d31c65eaf6af0d66ea0f4479b)), closes [#353](https://github.com/vexip-ui/vexip-ui/issues/353)
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **tree:** support virtual scroll and disable transition ([#396](https://github.com/vexip-ui/vexip-ui/issues/396)) ([3a9370b](https://github.com/vexip-ui/vexip-ui/commit/3a9370bd4d9a54b37f3bbea44c82fad50791c34b))



## [1.11.4](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.11.3...hooks@1.11.4) (2023-08-07)


### Bug Fixes

* **hooks:** click outside event should process in capture ([8d59f55](https://github.com/vexip-ui/vexip-ui/commit/8d59f55a3212436431317907682e516162ef88ab))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))


### Features

* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))
* **hooks:** useIntersection support numberish rootMargin ([b7a2bb4](https://github.com/vexip-ui/vexip-ui/commit/b7a2bb40b62e9e82be23cbd4b8bd7a8d5778931f))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **tree:** support virtual scroll and disable transition ([#396](https://github.com/vexip-ui/vexip-ui/issues/396)) ([3a9370b](https://github.com/vexip-ui/vexip-ui/commit/3a9370bd4d9a54b37f3bbea44c82fad50791c34b))



## [1.11.3](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.11.2...hooks@1.11.3) (2023-07-25)


### Bug Fixes

* **hooks:** click outside event should process in capture ([8d59f55](https://github.com/vexip-ui/vexip-ui/commit/8d59f55a3212436431317907682e516162ef88ab))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))


### Features

* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))
* **hooks:** useIntersection support numberish rootMargin ([b7a2bb4](https://github.com/vexip-ui/vexip-ui/commit/b7a2bb40b62e9e82be23cbd4b8bd7a8d5778931f))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))



## [1.11.2](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.11.1...hooks@1.11.2) (2023-07-17)


### Bug Fixes

* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))


### Features

* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))
* **hooks:** useIntersection support numberish rootMargin ([b7a2bb4](https://github.com/vexip-ui/vexip-ui/commit/b7a2bb40b62e9e82be23cbd4b8bd7a8d5778931f))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))



## [1.11.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.11.0...hooks@1.11.1) (2023-06-02)


### 🐞 Bug Fixes

* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))



# [1.11.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.10.0...hooks@1.11.0) (2023-05-20)


### Features

* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))



# [1.10.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.9.0...hooks@1.10.0) (2023-05-03)


### Features

* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))



# [1.9.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.8.2...hooks@1.9.0) (2023-04-13)



## [1.8.2](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.8.1...hooks@1.8.2) (2023-04-03)

## [1.8.1](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.8.0...hooks@1.8.1) (2023-03-23)

### Bug Fixes

- **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
- **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))

# [1.8.0](https://github.com/vexip-ui/vexip-ui/compare/hooks@1.7.2...hooks@1.8.0) (2022-10-28)

### Features

- **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))

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
