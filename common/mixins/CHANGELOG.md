# [1.2.0](https://github.com/qmhc/vexip-ui/compare/mixins@1.1.0...mixins@1.2.0) (2022-06-14)


### Bug Fixes

* **mixins:** assert type for HTMLElement refs ([c4bf386](https://github.com/qmhc/vexip-ui/commit/c4bf3866a14d341761ececc97a441c2206ffb398))


### Features

* **mixins:** add useSetTimeout and useSetInterval ([44b63e7](https://github.com/qmhc/vexip-ui/commit/44b63e7bdb5c31f0d7712cf4f8dcf9535ac581d4))



# [1.1.0](https://github.com/qmhc/vexip-ui/compare/mixins@1.0.0...mixins@1.1.0) (2022-05-28)


### Code Refactoring

* icon rewrite to use component ([#22](https://github.com/qmhc/vexip-ui/issues/22)) ([d825637](https://github.com/qmhc/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* **mixins:** add useMounted mixin ([a89cdeb](https://github.com/qmhc/vexip-ui/commit/a89cdeb61a6eb9c5e7ff0455f017a72d944e5509))
* **mixins:** add useResize mixin ([5d139e3](https://github.com/qmhc/vexip-ui/commit/5d139e3cca81bf5803e467fddf56f36befc41765))
* **mixins:** add useVirtual mixin ([01827aa](https://github.com/qmhc/vexip-ui/commit/01827aa25611c737d50d9e62b6b98d1e951abd6e))


### BREAKING CHANGES

* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.



# 1.0.0 (2022-04-29)


### Bug Fixes

* **dropdown:** flush nested drop first item ([3992b7f](https://github.com/qmhc/vexip-ui/commit/3992b7f20d5a5a93e400dec123b787fb73a36d81))
* **popper:** watch wrapper and popper el change ([4fb0ca5](https://github.com/qmhc/vexip-ui/commit/4fb0ca568322df5b2046b5f985337f8dc78ef381))


### Features

* **ellipsis:** add ellipsis component ([1fefc1b](https://github.com/qmhc/vexip-ui/commit/1fefc1b1546db69299952d957e15de842f89eab8))



