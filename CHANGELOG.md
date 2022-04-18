# [1.3.0](https://github.com/qmhc/vexip-ui/compare/v1.2.1...v1.3.0) (2022-04-18)

### Bug Fixes

- **auto-complete:** no options rendered when null value ([49af9d4](https://github.com/qmhc/vexip-ui/commit/49af9d4d66d909a4035e27be2ecebb9ea5445f26))
- **date-picker:** cannot parse number value in date type ([0b0e3a7](https://github.com/qmhc/vexip-ui/commit/0b0e3a7eb7a09ef1cb43ea7fec6b897bd9250dd0))
- **date-picker:** disabled-date prop not work ([6496175](https://github.com/qmhc/vexip-ui/commit/6496175ba037d741237cea7500772fa9b4d62db3))
- **date-picker:** format should ignore content in quotations ([31d7f16](https://github.com/qmhc/vexip-ui/commit/31d7f1689a1229582f6f2a71ae80e47d63011ac8))
- **linker:** vertical align should inherit parent ([9943e5e](https://github.com/qmhc/vexip-ui/commit/9943e5ed39d0a4cf5b225050eae3919a8675159a))
- **modal:** header slot is not effective ([2af3df6](https://github.com/qmhc/vexip-ui/commit/2af3df6cd6e9eca5919860cebb08c26494ba9dff))
- **modal:** use offset value to compute position ([07d0dc6](https://github.com/qmhc/vexip-ui/commit/07d0dc64bad7c8f097447d9b5d481f5d9727a4c2))
- **number-input:** should not format when inputting ([0f58739](https://github.com/qmhc/vexip-ui/commit/0f5873906424b07bfd9b72daf94479316871f4d7))
- **spin:** mask add default z-index ([943f3c6](https://github.com/qmhc/vexip-ui/commit/943f3c6d35a2585d7df4580360dd6222c5e124ad))
- **table:** disableRow should base on rendered rows ([c483386](https://github.com/qmhc/vexip-ui/commit/c4833864ec96d9d5fc9deee4f8a1f9eeb80691b3))
- **table:** row check all event add partial param ([a9cc1c5](https://github.com/qmhc/vexip-ui/commit/a9cc1c5e9acd665cc576da10f5d8d8856fc2b49e))
- **table:** row check all event add partial param ([7d7bede](https://github.com/qmhc/vexip-ui/commit/7d7bede86701fb534c57b974e3268c981f1b3aaf))
- **tree:** incorrect variable usage when get id map ([c94714e](https://github.com/qmhc/vexip-ui/commit/c94714ed08294b208af320e61921e1247543d491))
- **tree:** root-id prop not effective ([7494291](https://github.com/qmhc/vexip-ui/commit/74942916e542163855195e209c2059d11db33dbd))
- **tree:** use id-node map when update data ([8d5d843](https://github.com/qmhc/vexip-ui/commit/8d5d843572a44fa4c546959bd8fb70496b70a91a))
- **utils:** incorrect matching rootId in tree transform ([4e9d253](https://github.com/qmhc/vexip-ui/commit/4e9d2537170761d3a29cdcec63f5443fdb002c95))

### Features

- **calendar:** add Calendar component ([495e6b4](https://github.com/qmhc/vexip-ui/commit/495e6b49168cf1ae8647b5231f060eb383ec96d6))
- **ellipsis:** add tip-max-width prop ([32254d5](https://github.com/qmhc/vexip-ui/commit/32254d549fa3d3e48e610bab8b03da01c6924c05))
- **form:** add hide-label prop ([08f65ff](https://github.com/qmhc/vexip-ui/commit/08f65ff5407db7932660468ba6a6e92bc2208724))
- **form:** form actions add before hook prop ([2b31f25](https://github.com/qmhc/vexip-ui/commit/2b31f25520f27ac8e313bee9aa137bf6193ebbca))
- **form:** form item add action type prop ([e85baf2](https://github.com/qmhc/vexip-ui/commit/e85baf2cc7c49f29d592412ce97e450e5a4cd8a2))
- **highlight:** add Highlight component ([901a5ad](https://github.com/qmhc/vexip-ui/commit/901a5ad7a10325f630961178df839317984493b8))
- **native-scroll:** add NativeScroll component ([68bfe20](https://github.com/qmhc/vexip-ui/commit/68bfe20441dede8152ecc3c10d58ce8f8dc09139))
- **playground:** add vexip-ui playground ([#16](https://github.com/qmhc/vexip-ui/issues/16)) ([989a2c7](https://github.com/qmhc/vexip-ui/commit/989a2c7d99d565d107aba6ecf8d9a78c675095e9))
- **scrollbar:** add appear prop ([743483c](https://github.com/qmhc/vexip-ui/commit/743483ca3ce131bdc4ca6bdd2e76d70541198e6e))
- **scrollbar:** add use-track and track-speed props ([2820c77](https://github.com/qmhc/vexip-ui/commit/2820c777b855462b5d1c2da0e3e7f8f77b06f614))
- **spin:** add Spin component ([784605c](https://github.com/qmhc/vexip-ui/commit/784605ce4d087cb55af2d8ba2263b66b7be03e32))
- **table:** add tooltip-width and column's no-ellipsis props ([b95e59d](https://github.com/qmhc/vexip-ui/commit/b95e59dc9a0f2e03efbb47dc5bfccbcdcc4723be))
- **tree:** add cache-node and root-id props ([13e721e](https://github.com/qmhc/vexip-ui/commit/13e721eb3ff2072ec90c1c38ea82a2c751793c76))
- **tree:** export parseAndTransformData method ([dc5a1e3](https://github.com/qmhc/vexip-ui/commit/dc5a1e3e0ff4d6bd6c5de17e1afb904624bd99b5))

## [1.2.1](https://github.com/qmhc/vexip-ui/compare/v1.2.0...v1.2.1) (2022-01-14)

### Bug Fixes

- **tree:** incorrect expanded when using asyncLoad ([31c3ba5](https://github.com/qmhc/vexip-ui/commit/31c3ba509ab5c3c57a9a04e84a8cb806ff6389d7))

# [1.2.0](https://github.com/qmhc/vexip-ui/compare/v1.1.3...v1.2.0) (2022-01-07)

### Bug Fixes

- install options should be optional ([0934c3c](https://github.com/qmhc/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
- **date:** limit range values starkly in modification ([68cc1c8](https://github.com/qmhc/vexip-ui/commit/68cc1c8b64d54ff0bb218104d626e6eed86d14cc))
- support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/qmhc/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))
- **config:** global defaults config no effective ([6eba983](https://github.com/qmhc/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
- **table:** no recalculate when add rows ([741400e](https://github.com/qmhc/vexip-ui/commit/741400e112bf4437d47c7ed6898956a08a230021))

### Features

- add judge method for Message and Notice ([cb4062b](https://github.com/qmhc/vexip-ui/commit/cb4062b36096162b519b5a853726a259c4dd46a9))
- **table:** add row enter and leave events ([b9fb4c2](https://github.com/qmhc/vexip-ui/commit/b9fb4c21e61d739ec4fd2b69a8ac1363d545c244))
- add locale config ([0a0ec74](https://github.com/qmhc/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
- **form:** support native html form submit ([497c3e3](https://github.com/qmhc/vexip-ui/commit/497c3e3115632c09bcb10ac9c9d98aa334b61547))

### BREAKING CHANGES

- The original install config are
  no longer supported, use `prop` attribute of the new
  install config instead.

## [1.1.3](https://github.com/qmhc/vexip-ui/compare/v1.1.2...v1.1.3) (2021-10-20)

### Bug Fixes

- **checkbox:** only use margins within group ([22d3d9e](https://github.com/qmhc/vexip-ui/commit/22d3d9e80a7a254b72ccc5ef08732c6098cc41d5))
- **table:** incorrect height when using height prop ([d5143ac](https://github.com/qmhc/vexip-ui/commit/d5143accb4c243a2910c2693485408bd61cabe8e))

### Features

- **ellipsis:** add ellipsis component ([1fefc1b](https://github.com/qmhc/vexip-ui/commit/1fefc1b1546db69299952d957e15de842f89eab8))
- **select:** show empty text without any option ([5efe942](https://github.com/qmhc/vexip-ui/commit/5efe942b9ee6e075799501bbbc5a46c08a8a3304))
- **table:** add ellipsis tooltip for long content ([270df96](https://github.com/qmhc/vexip-ui/commit/270df9667e90455f7c6e6915286e78f742cd62b0))
- **table:** show empty text without any row ([ecb0ee7](https://github.com/qmhc/vexip-ui/commit/ecb0ee773e50efc00bbf6fb56c1420fe913e32d5))

## [1.1.2](https://github.com/qmhc/vexip-ui/compare/v1.1.1...v1.1.2) (2021-07-19)

### Bug Fixes

- **table:** effect expandRenderer prop ([857af57](https://github.com/qmhc/vexip-ui/commit/857af572b0ede815727aaf51222ec12dfc48b412))
- **table:** scroll height incorrect ([66f4804](https://github.com/qmhc/vexip-ui/commit/66f48046b506ba11065ce046bc463c37ec6caef4))

### Code Refactoring

- select and auto-complete no longer depend on input ([4c6af54](https://github.com/qmhc/vexip-ui/commit/4c6af54d09d918fb948cce3e0e459cf1777398e7))

### Features

- **select:** add multiple and option-check props ([da2f78a](https://github.com/qmhc/vexip-ui/commit/da2f78a0b234d8d0a7064e77374e230c3a9bf073))
- **tag:** add circle prop ([f2e0cf2](https://github.com/qmhc/vexip-ui/commit/f2e0cf2457272b5c3eeef102051e609454d96331))
- **tag:** add size prop ([79c5290](https://github.com/qmhc/vexip-ui/commit/79c5290d9223d189379019cad637d0efb3d0115c))

### BREAKING CHANGES

- select remove on-focus and on-blur events

## [1.1.1](https://github.com/qmhc/vexip-ui/compare/v1.1.0...v1.1.1) (2021-07-12)

### Bug Fixes

- **alert:** icon misplaced when no title ([8fd2f7d](https://github.com/qmhc/vexip-ui/commit/8fd2f7db9f6122e69f32dd64f7fdfbee34f6b03a))
- **badge:** title attr error when no content ([5bb6a86](https://github.com/qmhc/vexip-ui/commit/5bb6a86732c5f3c955c8360902350ba33b461185))
- **button:** missing simple class name ([4e91993](https://github.com/qmhc/vexip-ui/commit/4e91993ba3aa6fb740cdd55631aa797e44709f46))
- **color-picker:** cannot parse rgba color value ([8f4c57f](https://github.com/qmhc/vexip-ui/commit/8f4c57f4cf2c4ba4ab1b2f6f07f46209b1ff8b82))
- **date-picker:** clear should trigger change event ([1b1fec5](https://github.com/qmhc/vexip-ui/commit/1b1fec53d41afa430848dc983001ac7b565e9905))
- **date-picker:** intuitively update activated ([f4c9efb](https://github.com/qmhc/vexip-ui/commit/f4c9efb1f44cb4a416e2616f0be3ae384f5ae3c9))
- **input:** add ::placeholder color style ([54ce94b](https://github.com/qmhc/vexip-ui/commit/54ce94be7a595ec3065f78804a6133fa30c3f095))
- **masker:** closable not work without beforeClose ([77b00c0](https://github.com/qmhc/vexip-ui/commit/77b00c09f7225eb07fc25b028f8ca248bd65a515))
- **progress:** progress tip display error ([22eb709](https://github.com/qmhc/vexip-ui/commit/22eb709a681cbbdb5fb5861a137cfbb3f979aa85))
- **scroll:** start autoplay when mounted ([5d6dfa6](https://github.com/qmhc/vexip-ui/commit/5d6dfa6f84e06107344e7d9d9272635f69d45061))
- **slider:** error value when step is not 1 ([4c2b2b9](https://github.com/qmhc/vexip-ui/commit/4c2b2b996d6b4611ecdc117375d009a34d879b8b))
- **time-picker:** clear should trigger change event ([92e9ba7](https://github.com/qmhc/vexip-ui/commit/92e9ba7e573ae924e911cd2361613b42e9195981))

### Features

- **checkbox:** remove bindGroup api ([5b3aafa](https://github.com/qmhc/vexip-ui/commit/5b3aafaddda1c0130a5db50cad2ae58d35e9ed7a))
- **table:** add defineColumns helper ([10d3a8d](https://github.com/qmhc/vexip-ui/commit/10d3a8d45f8a24d7b02f04d64aa015c886a4a1ea))

### BREAKING CHANGES

- **checkbox:** no longer support bindGroup api

# [1.1.0](https://github.com/qmhc/vexip-ui/compare/v1.0.3...v1.1.0) (2021-07-08)

### Bug Fixes

- **dropdown:** flush nested drop first item ([3992b7f](https://github.com/qmhc/vexip-ui/commit/3992b7f20d5a5a93e400dec123b787fb73a36d81))
- **dropdown:** item position relative incorrect divider ([53f1f91](https://github.com/qmhc/vexip-ui/commit/53f1f91715088e9a3e8b3e912585618f3c4edcda))
- **dropdown:** nested drop should not toggle select ([ece9d4e](https://github.com/qmhc/vexip-ui/commit/ece9d4eaeca646681781f851c9d77cd14e46cb9d))
- **popper:** watch wrapper and popper el change ([4fb0ca5](https://github.com/qmhc/vexip-ui/commit/4fb0ca568322df5b2046b5f985337f8dc78ef381))
- **table:** export refresh api ([f0dab34](https://github.com/qmhc/vexip-ui/commit/f0dab34f02b9d28d968674bb1d58e6a09ac6c08d))
- **table:** incorrect row count of data change ([7af4d5a](https://github.com/qmhc/vexip-ui/commit/7af4d5a2a90d573ad4ae370e1b3b820b2bc41fd1))

### Features

- **dropdown:** add appear prop ([e230054](https://github.com/qmhc/vexip-ui/commit/e230054a585141d9b88901f65589dbf5578b8890))
- **loading:** create global loading component ([caedc67](https://github.com/qmhc/vexip-ui/commit/caedc67a883cd0f1683612e25d71d4f0e279480d))
- **tag:** add build in color type ([02fd360](https://github.com/qmhc/vexip-ui/commit/02fd36026fec4de39349252b0fa03dde4aa820ca))
- **tag:** add simple style tag ([b316888](https://github.com/qmhc/vexip-ui/commit/b3168886ea40f6cbaa3a83ea8278ed5d89d8c953))
- **time-ago:** add time-ago component ([b639c2e](https://github.com/qmhc/vexip-ui/commit/b639c2eb13c62b00d72010cc4c30328d09b2835a))
- add contextmenu component ([#13](https://github.com/qmhc/vexip-ui/issues/13)) ([1571dc3](https://github.com/qmhc/vexip-ui/commit/1571dc34d4830a1a515c15378bf7b7db3e72219b))

### Performance Improvements

- **scrollbar:** use transform replace top and left ([5a0e272](https://github.com/qmhc/vexip-ui/commit/5a0e2721ce54beb4b203013db19301d732c34f39))

## [1.0.3](https://github.com/qmhc/vexip-ui/compare/v1.0.2...v1.0.3) (2021-06-26)

### Bug Fixes

- **input:** no emit on-clear event ([64ca93f](https://github.com/qmhc/vexip-ui/commit/64ca93f507fb5628f91e977d1154687bfe736ceb))
- **input:** should not clearable when disabled ([6b58a0c](https://github.com/qmhc/vexip-ui/commit/6b58a0cfcb43c22245c7e031ac591e945be6bb10))
- **number-input:** support clearable and on-clear ([ebb8235](https://github.com/qmhc/vexip-ui/commit/ebb8235f742c3237634fdd6704071992dc664c2a))

### Performance Improvements

- **progress:** using transfrom to improve performance ([7ba3d8d](https://github.com/qmhc/vexip-ui/commit/7ba3d8db07cb32d1e3e65cd9a2e6ca38ac49c05b))

## [1.0.2](https://github.com/qmhc/vexip-ui/compare/v1.0.1...v1.0.2) (2021-06-25)

### Bug Fixes

- **dropdown:** add dropClass prop ([46a9ccf](https://github.com/qmhc/vexip-ui/commit/46a9ccf3bb3bd7b5bf025cda9857563225577c63))
- **dropdown:** set placement prop not work ([9bd32e8](https://github.com/qmhc/vexip-ui/commit/9bd32e81116a5d27aa85892fab14aaef5f144cd1))
- **dropdown:** support v-model:vivisble ([cfbf2dc](https://github.com/qmhc/vexip-ui/commit/cfbf2dcac7944df95e745ac097151b6836078478))
- **tab-nav:** card style order in using router ([825c7db](https://github.com/qmhc/vexip-ui/commit/825c7db18238617fcb55f981a79ae0ac3e705952))

## [1.0.1](https://github.com/qmhc/vexip-ui/compare/v1.0.0...v1.0.1) (2021-06-17)

### Bug Fixes

- **button:** style order in using router ([421512e](https://github.com/qmhc/vexip-ui/commit/421512e88972ace7f57b1d03641e9d7b94220780))

# [1.0.0](https://github.com/qmhc/vexip-ui/compare/v1.0.0-beta.3...v1.0.0) (2021-06-10)

### Bug Fixes

- **message:** config placement not effective ([85fd771](https://github.com/qmhc/vexip-ui/commit/85fd771d3c1e3f6bc1c57db69c418ab433f9c58f))
- **notice:** config placement not effective ([833933b](https://github.com/qmhc/vexip-ui/commit/833933b26c26f061fedacee76b576daac067c330))

### Features

- **collapse-transition:** add mode and timing props ([9fe1862](https://github.com/qmhc/vexip-ui/commit/9fe1862045530a20b4c84156e78ca0b890d6b76b))
- **message:** add property config to install options ([be64ae3](https://github.com/qmhc/vexip-ui/commit/be64ae3699f6915b8124f3e7639c8f7ada2d0174))

# [1.0.0-beta.3](https://github.com/qmhc/vexip-ui/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-06-09)

### Bug Fixes

- **message:** install global property name ([af21d31](https://github.com/qmhc/vexip-ui/commit/af21d31867d3679a2d86b2fdbc519d0f421ecbb1))

# [1.0.0-beta.2](https://github.com/qmhc/vexip-ui/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-06-05)

### Bug Fixes

- **style:** relate style for import-on-demand ([194f32b](https://github.com/qmhc/vexip-ui/commit/194f32b6fda7264a52da9835faae8d4dd0875282))

# [1.0.0-beta.1](https://github.com/qmhc/vexip-ui/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2021-06-05)

### Bug Fixes

- **auto-complete:** hitting wrong after filter options ([7317ed6](https://github.com/qmhc/vexip-ui/commit/7317ed6848484505a3c61fa2f0cc2d9b60d84e4b))
- **masker:** transfer prop has no effect ([fd2173e](https://github.com/qmhc/vexip-ui/commit/fd2173e1c45599305d8e8abda0a93d423e222cd6))

### Features

- **scroll:** add on-ready event ([288ec9a](https://github.com/qmhc/vexip-ui/commit/288ec9abcc7a40374b5e788f89b89ec275a1124d))
- **table:** add filter and column define helpers ([5e85594](https://github.com/qmhc/vexip-ui/commit/5e855944082094e6509e9bed6ad3abf52efd8e03))

# [1.0.0-beta.0](https://github.com/qmhc/vexip-ui/compare/v1.0.0-alpha.4...v1.0.0-beta.0) (2021-06-03)

### Bug Fixes

- **checkbox-group:** sync value when values porp change ([1bdaa9f](https://github.com/qmhc/vexip-ui/commit/1bdaa9ff4d3ffa746f1c22222c851761be51685c))
- **date-picker:** calendar pane focus on selected date ([6a61c99](https://github.com/qmhc/vexip-ui/commit/6a61c9947df68e2ade844ec8a74a3111160eba73))
- **date-picker:** incorrect item display when range select year and month ([55ccf76](https://github.com/qmhc/vexip-ui/commit/55ccf7660dad24030ddefff6669c305066e34f51))
- **date-picker:** supply labels prop, includes time picker ([3cd5735](https://github.com/qmhc/vexip-ui/commit/3cd57352454998d77eb56c0a341dadcbeacdffec))
- **icon:** adjust default size about 1.05x ([ce90294](https://github.com/qmhc/vexip-ui/commit/ce902949ef1d193d80f2c58d67ee9cc635678875))
- **menu:** menu list margin set to 0 ([9ddab57](https://github.com/qmhc/vexip-ui/commit/9ddab5789ac42af1491a1797433f62c2bd4b276e))
- **select:** visible not to false when option v-for ([7208f42](https://github.com/qmhc/vexip-ui/commit/7208f42c69f5102f103f1cbf3387d27d1f029e09))
- **table:** column width incorrect width multiple talbe ([6fb8f65](https://github.com/qmhc/vexip-ui/commit/6fb8f65c7a122c6574dc85d5222cd9526ec3b4e1))
- **tree:** arrow transform act at icon svg ([14b53cc](https://github.com/qmhc/vexip-ui/commit/14b53ccfd6ee609aff66ac556f51a1080e374b26))

### Features

- **textarea:** add control state style ([e8d6bfc](https://github.com/qmhc/vexip-ui/commit/e8d6bfc6b6ee3fc141fa42620e6458856b9e0f86))

# [1.0.0-alpha.4](https://github.com/qmhc/vexip-ui/compare/v1.0.0-alpha.2...v1.0.0-alpha.4) (2021-05-29)

### Bug Fixes

- **animation:** lose spin animation ([dd72b56](https://github.com/qmhc/vexip-ui/commit/dd72b564393fbd9600a9eef2f0a74b90d4029cc9))
- **button:** loading icon missing collapse transion ([f713351](https://github.com/qmhc/vexip-ui/commit/f713351aa9dea125bcd6d04e1589588bcc3199b9))
- **collapse-transition:** appear props ([46a09b5](https://github.com/qmhc/vexip-ui/commit/46a09b521caf1996b0b080ad18bd167b6448e293))
- **menu:** can not support horizontal mode ([d7b9b38](https://github.com/qmhc/vexip-ui/commit/d7b9b38b48fa44eb0c6562387f029ef2dc4ad0b9))
- **portal:** render teleport after mounted next tick ([8971a9b](https://github.com/qmhc/vexip-ui/commit/8971a9b493056e212c3da1043008ec339be69114))
- **scroll:** ensure wrapper and content element ([6e0f0de](https://github.com/qmhc/vexip-ui/commit/6e0f0deeec7c27d0224869b4a324779858ea4d78))
- **scss:** themes at import use relative path ([f283e68](https://github.com/qmhc/vexip-ui/commit/f283e68986a35a93b6ee7ec75cc12a3e2e2a19c4))

# [1.0.0-alpha.3](https://github.com/qmhc/vexip-ui/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-05-29)

# [1.0.0-alpha.2](https://github.com/qmhc/vexip-ui/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-05-29)

### Bug Fixes

- complete missing components export ([cb88cf9](https://github.com/qmhc/vexip-ui/commit/cb88cf96056c87a77711b98898c415d54adac577))

# [1.0.0-alpha.1](https://github.com/qmhc/vexip-ui/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-05-28)

# 1.0.0-alpha.0 (2021-05-27)
