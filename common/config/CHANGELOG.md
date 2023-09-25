## [1.1.1](https://github.com/vexip-ui/vexip-ui/compare/config@1.1.0...config@1.1.1) (2023-09-07)


### ✨ Features

* **select:** add count-limit prop ([adbda63](https://github.com/vexip-ui/vexip-ui/commit/adbda6343fee59ffaf9d220d23899c64c195aa97))


### 🐞 Bug Fixes

* **config:** cannot include default excluded props ([147fab5](https://github.com/vexip-ui/vexip-ui/commit/147fab51487871e9a09af7e3d9e88d2af3d0ff46))



# [1.1.0](https://github.com/vexip-ui/vexip-ui/compare/config@1.0.1...config@1.1.0) (2023-08-30)


### Bug Fixes

* all transition names using injected namespace ([432f0f7](https://github.com/vexip-ui/vexip-ui/commit/432f0f7bf2e2f41fab7712cbd8e4ea5cf92f1158))
* boolean with other type props ignore default value ([5cf9b12](https://github.com/vexip-ui/vexip-ui/commit/5cf9b12c00515428a48672929110a661f52a674b))
* **calendar:** using locale config for date labels ([7d58232](https://github.com/vexip-ui/vexip-ui/commit/7d58232267895e413badd44f063f96270f52b6cc))
* **cascader:** should reset hitting when panel options changed ([d4180f2](https://github.com/vexip-ui/vexip-ui/commit/d4180f2921af9d49564c28366aae68c99507ae1d))
* **config:** complete Tamil locale config ([4683631](https://github.com/vexip-ui/vexip-ui/commit/4683631bf7ae6bf0f9fcd62ef5e3ec0934fa1b83))
* **config:** ensure dependencies are external ([c130d17](https://github.com/vexip-ui/vexip-ui/commit/c130d17fcf1b4bd8de7a2e67a4edf683b3911502))
* **config:** ensure props exec validator at once ([#328](https://github.com/vexip-ui/vexip-ui/issues/328)) ([bcdf759](https://github.com/vexip-ui/vexip-ui/commit/bcdf759083903b0aa85cef6d963f20dcfb8a4c76))
* **config:** ensure responsive variables namespace ([4b334c9](https://github.com/vexip-ui/vexip-ui/commit/4b334c9a0602524f65d9921e6c4f837dcdd5a766))
* **config:** global defaults config no effective ([6eba983](https://github.com/vexip-ui/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
* **config:** incorrect event prop regexp ([849ac5b](https://github.com/vexip-ui/vexip-ui/commit/849ac5bc033751e706a329f8c745862c995ecaa0)), closes [#139](https://github.com/vexip-ui/vexip-ui/issues/139)
* **config:** init config not reactive ([47298a5](https://github.com/vexip-ui/vexip-ui/commit/47298a58472d6f8a08d204add8c311a6fcd99fcb))
* **config:** passing default null to avoid warning ([44c813b](https://github.com/vexip-ui/vexip-ui/commit/44c813b98a9aac9697573c9bfa70cee86ccf6f61))
* **config:** should exist global locale ([b7a5546](https://github.com/vexip-ui/vexip-ui/commit/b7a554652b10dbe0529f3901c229511b19c878c8))
* **config:** support function as default value ([f44047e](https://github.com/vexip-ui/vexip-ui/commit/f44047e5362ec5d5374dbcd1d4ad87f51b84ca21)), closes [#41](https://github.com/vexip-ui/vexip-ui/issues/41)
* **config:** unexpected merge global locale config ([e43d8e8](https://github.com/vexip-ui/vexip-ui/commit/e43d8e89c7fb131dde6bdf0eb8613736ed13905d))
* **date-picker:** add header titles for range select datetime ([dfc2401](https://github.com/vexip-ui/vexip-ui/commit/dfc2401b111fee7915976c40030ca365cfe74103))
* fixed css vars prefix to '--vxp' ([e4c1da3](https://github.com/vexip-ui/vexip-ui/commit/e4c1da34964bfde8faf3f4bb3f96df51d1625a6d))
* **form:** add not nullable locale config ([6fb27c6](https://github.com/vexip-ui/vexip-ui/commit/6fb27c63089ca1076e40cb3335dbab3efb7bbb0f))
* install options should be optional ([0934c3c](https://github.com/vexip-ui/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
* **locale:** confirm typo in English ([#337](https://github.com/vexip-ui/vexip-ui/issues/337)) ([e256ca9](https://github.com/vexip-ui/vexip-ui/commit/e256ca9f6b8a6d3ad483880450f8d1370be14ab1))
* **locale:** correct calendar week locale ([9e1b25b](https://github.com/vexip-ui/vexip-ui/commit/9e1b25b9bb03e6b18ec970eb8f232b9cafd046a0))
* **locale:** corrent inject locale word space config ([aee45aa](https://github.com/vexip-ui/vexip-ui/commit/aee45aae8b93a54ac5f14bd6476584b52e12f045))
* **locale:** per page typo ([bf85f8b](https://github.com/vexip-ui/vexip-ui/commit/bf85f8b6f9560bf055e32844f7d2c59cbd363811))
* normalize props export of all components ([558db00](https://github.com/vexip-ui/vexip-ui/commit/558db00d2b8a55a7d108a06cd95f52e4250ed89e))
* support array type class and style props ([317fbff](https://github.com/vexip-ui/vexip-ui/commit/317fbff212847cf3d7054af99102656779e37a8e))
* support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/vexip-ui/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))


### Code Refactoring

* **config:** external locale config for on demand import ([#302](https://github.com/vexip-ui/vexip-ui/issues/302)) ([86eab10](https://github.com/vexip-ui/vexip-ui/commit/86eab101f4fbf1579e2ac2cf7abe299e1faf6583))
* icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* add locale config ([0a0ec74](https://github.com/vexip-ui/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **checkbox:** support quickly add control via prop ([4d13ec2](https://github.com/vexip-ui/vexip-ui/commit/4d13ec23db7095415b8d24d17c0c56be564d1298)), closes [#104](https://github.com/vexip-ui/vexip-ui/issues/104)
* **config-provider:** support config z-index ([8772bc2](https://github.com/vexip-ui/vexip-ui/commit/8772bc2d9d964ef5c0b864a69bead5493cd76a23))
* **config-provider:** support partial provide config ([#25](https://github.com/vexip-ui/vexip-ui/issues/25)) ([75cbc86](https://github.com/vexip-ui/vexip-ui/commit/75cbc8671df4c8d73c0b659955a98a5a3b5deef9))
* **config:** add global z-index config ([#62](https://github.com/vexip-ui/vexip-ui/issues/62)) ([82b90f2](https://github.com/vexip-ui/vexip-ui/commit/82b90f26a893df43b1bb607dc94b753a36b74b36))
* **config:** add zh-HK and zh-TW local config ([a8b8191](https://github.com/vexip-ui/vexip-ui/commit/a8b8191b2cb6991e6bee05692c55486519955f1d))
* **config:** auto warning when validator returns false ([2b7712d](https://github.com/vexip-ui/vexip-ui/commit/2b7712d7d25ef1ef7905934d9d5faf44c4c6003a))
* **config:** support common props config ([86c8fd8](https://github.com/vexip-ui/vexip-ui/commit/86c8fd801643f9919e074bd4d1d7825ad7eae355))
* **config:** support custom class namespace ([#48](https://github.com/vexip-ui/vexip-ui/issues/48)) ([da29ae3](https://github.com/vexip-ui/vexip-ui/commit/da29ae3e4e0c80d59d379274ccb8dbcb15254715))
* **config:** support custom icons via config ([#287](https://github.com/vexip-ui/vexip-ui/issues/287)) ([d665f10](https://github.com/vexip-ui/vexip-ui/commit/d665f103c6ba76571dd146496358d0de481a1752))
* **config:** support internal en-US locale ([2a5b2d3](https://github.com/vexip-ui/vexip-ui/commit/2a5b2d3a84f13197dbfdf1ae2d08156a3e1d7999))
* **config:** support provide config via hook functions ([8222299](https://github.com/vexip-ui/vexip-ui/commit/8222299e99769d416d6e04af5c6fab23c109e87a))
* **drawer:** support add footer with default action buttons ([ddbc8a3](https://github.com/vexip-ui/vexip-ui/commit/ddbc8a34526c1f9549e1a067795a488de43c3eaa)), closes [#117](https://github.com/vexip-ui/vexip-ui/issues/117)
* **form:** support pure form item render ([65d6b30](https://github.com/vexip-ui/vexip-ui/commit/65d6b30dfed4277859234f288eb23e6ce3f1ac76))
* **form:** support set size for all controls under form ([a332eca](https://github.com/vexip-ui/vexip-ui/commit/a332ecaad8993b1aac9c658b685570ebae198409))
* **Image:** add Image component ([#225](https://github.com/vexip-ui/vexip-ui/issues/225)) ([e26a75e](https://github.com/vexip-ui/vexip-ui/commit/e26a75eb4c714ae6e49193724b4f20f2bb7a5d38))
* **layout:** add theme mode config ([394fa8c](https://github.com/vexip-ui/vexip-ui/commit/394fa8c720ef40ee993ac449af2f8ba6a4f0c0ee))
* **Layout:** create Layout component ([#88](https://github.com/vexip-ui/vexip-ui/issues/88)) ([22c2b6d](https://github.com/vexip-ui/vexip-ui/commit/22c2b6d53f0ae27e64b320e49e6b088edd92b057)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **locale:** internally support Tamil language ([#293](https://github.com/vexip-ui/vexip-ui/issues/293)) ([0331ec7](https://github.com/vexip-ui/vexip-ui/commit/0331ec75caac7f7b0c63598c352125dfcd0c5831))
* **number-input:** add out of range effect for input control ([078681c](https://github.com/vexip-ui/vexip-ui/commit/078681c23a4158c35ec4e9714601b504ef8c359c))
* **select:** support for boolean value ([6237d08](https://github.com/vexip-ui/vexip-ui/commit/6237d081f9d8c90d79d0b4d11294be7a1d75a116))
* support specify locale config via `locale` prop ([#239](https://github.com/vexip-ui/vexip-ui/issues/239)) ([e483dea](https://github.com/vexip-ui/vexip-ui/commit/e483deab8f58b0859ea310020973f990d83a720a))
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **table:** support add column with drag type to create handler ([89df1fc](https://github.com/vexip-ui/vexip-ui/commit/89df1fc2a57ef370d43be7cabca7ff6730e5518e))
* **tabs:** add closable and show-add props ([908abaa](https://github.com/vexip-ui/vexip-ui/commit/908abaa4f6a92e0eb5a14505b5e276d35519a8fe))
* **time-picker:** add placholder prop ([b5ca190](https://github.com/vexip-ui/vexip-ui/commit/b5ca1909bc409039d5cd79c9e08427e6408ce4bc))
* **toast:** add toast plugin (manager) ([#128](https://github.com/vexip-ui/vexip-ui/issues/128)) ([a3be410](https://github.com/vexip-ui/vexip-ui/commit/a3be4101f870fe0eab242ad2bccf22f584d1dc78))
* **tour:** add Tour and TourStep components ([#401](https://github.com/vexip-ui/vexip-ui/issues/401)) ([fcfbd5f](https://github.com/vexip-ui/vexip-ui/commit/fcfbd5f2b7eab356ce8e06e3f68d7070da0ea51c))
* **transfer:** add Transfer component ([#96](https://github.com/vexip-ui/vexip-ui/issues/96)) ([454e05b](https://github.com/vexip-ui/vexip-ui/commit/454e05b937106767522f83c7d2fee16095eda3ca))
* **Viewer:** add Viewer component ([#56](https://github.com/vexip-ui/vexip-ui/issues/56)) ([f1c16af](https://github.com/vexip-ui/vexip-ui/commit/f1c16af7f2de4f0315d3c5111f2e53bfb276ceb0))
* **Viewer:** support flip actions ([#69](https://github.com/vexip-ui/vexip-ui/issues/69)) ([b8275e5](https://github.com/vexip-ui/vexip-ui/commit/b8275e5f26934a23c42035a207d8c5da56058816))


### BREAKING CHANGES

* **config:** `en-US` and `ta-IN` isn't included in internal locale config no longer.
Now these config are exported independently, using e.g. `import { enUSLocale } from 'vexip-ui'` 
to import locale config that you want to use. See docs about global config for more details.
* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.
* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



## 1.0.1 (2023-08-29)


### Bug Fixes

* all transition names using injected namespace ([432f0f7](https://github.com/vexip-ui/vexip-ui/commit/432f0f7bf2e2f41fab7712cbd8e4ea5cf92f1158))
* boolean with other type props ignore default value ([5cf9b12](https://github.com/vexip-ui/vexip-ui/commit/5cf9b12c00515428a48672929110a661f52a674b))
* **calendar:** using locale config for date labels ([7d58232](https://github.com/vexip-ui/vexip-ui/commit/7d58232267895e413badd44f063f96270f52b6cc))
* **cascader:** should reset hitting when panel options changed ([d4180f2](https://github.com/vexip-ui/vexip-ui/commit/d4180f2921af9d49564c28366aae68c99507ae1d))
* **config:** complete Tamil locale config ([4683631](https://github.com/vexip-ui/vexip-ui/commit/4683631bf7ae6bf0f9fcd62ef5e3ec0934fa1b83))
* **config:** ensure props exec validator at once ([#328](https://github.com/vexip-ui/vexip-ui/issues/328)) ([bcdf759](https://github.com/vexip-ui/vexip-ui/commit/bcdf759083903b0aa85cef6d963f20dcfb8a4c76))
* **config:** ensure responsive variables namespace ([4b334c9](https://github.com/vexip-ui/vexip-ui/commit/4b334c9a0602524f65d9921e6c4f837dcdd5a766))
* **config:** global defaults config no effective ([6eba983](https://github.com/vexip-ui/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
* **config:** incorrect event prop regexp ([849ac5b](https://github.com/vexip-ui/vexip-ui/commit/849ac5bc033751e706a329f8c745862c995ecaa0)), closes [#139](https://github.com/vexip-ui/vexip-ui/issues/139)
* **config:** init config not reactive ([47298a5](https://github.com/vexip-ui/vexip-ui/commit/47298a58472d6f8a08d204add8c311a6fcd99fcb))
* **config:** passing default null to avoid warning ([44c813b](https://github.com/vexip-ui/vexip-ui/commit/44c813b98a9aac9697573c9bfa70cee86ccf6f61))
* **config:** should exist global locale ([b7a5546](https://github.com/vexip-ui/vexip-ui/commit/b7a554652b10dbe0529f3901c229511b19c878c8))
* **config:** support function as default value ([f44047e](https://github.com/vexip-ui/vexip-ui/commit/f44047e5362ec5d5374dbcd1d4ad87f51b84ca21)), closes [#41](https://github.com/vexip-ui/vexip-ui/issues/41)
* **config:** unexpected merge global locale config ([e43d8e8](https://github.com/vexip-ui/vexip-ui/commit/e43d8e89c7fb131dde6bdf0eb8613736ed13905d))
* **date-picker:** add header titles for range select datetime ([dfc2401](https://github.com/vexip-ui/vexip-ui/commit/dfc2401b111fee7915976c40030ca365cfe74103))
* fixed css vars prefix to '--vxp' ([e4c1da3](https://github.com/vexip-ui/vexip-ui/commit/e4c1da34964bfde8faf3f4bb3f96df51d1625a6d))
* **form:** add not nullable locale config ([6fb27c6](https://github.com/vexip-ui/vexip-ui/commit/6fb27c63089ca1076e40cb3335dbab3efb7bbb0f))
* install options should be optional ([0934c3c](https://github.com/vexip-ui/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
* **locale:** confirm typo in English ([#337](https://github.com/vexip-ui/vexip-ui/issues/337)) ([e256ca9](https://github.com/vexip-ui/vexip-ui/commit/e256ca9f6b8a6d3ad483880450f8d1370be14ab1))
* **locale:** correct calendar week locale ([9e1b25b](https://github.com/vexip-ui/vexip-ui/commit/9e1b25b9bb03e6b18ec970eb8f232b9cafd046a0))
* **locale:** corrent inject locale word space config ([aee45aa](https://github.com/vexip-ui/vexip-ui/commit/aee45aae8b93a54ac5f14bd6476584b52e12f045))
* **locale:** per page typo ([bf85f8b](https://github.com/vexip-ui/vexip-ui/commit/bf85f8b6f9560bf055e32844f7d2c59cbd363811))
* normalize props export of all components ([558db00](https://github.com/vexip-ui/vexip-ui/commit/558db00d2b8a55a7d108a06cd95f52e4250ed89e))
* support array type class and style props ([317fbff](https://github.com/vexip-ui/vexip-ui/commit/317fbff212847cf3d7054af99102656779e37a8e))
* support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/vexip-ui/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))


### Code Refactoring

* **config:** external locale config for on demand import ([#302](https://github.com/vexip-ui/vexip-ui/issues/302)) ([86eab10](https://github.com/vexip-ui/vexip-ui/commit/86eab101f4fbf1579e2ac2cf7abe299e1faf6583))
* icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* add locale config ([0a0ec74](https://github.com/vexip-ui/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **checkbox:** support quickly add control via prop ([4d13ec2](https://github.com/vexip-ui/vexip-ui/commit/4d13ec23db7095415b8d24d17c0c56be564d1298)), closes [#104](https://github.com/vexip-ui/vexip-ui/issues/104)
* **config-provider:** support config z-index ([8772bc2](https://github.com/vexip-ui/vexip-ui/commit/8772bc2d9d964ef5c0b864a69bead5493cd76a23))
* **config-provider:** support partial provide config ([#25](https://github.com/vexip-ui/vexip-ui/issues/25)) ([75cbc86](https://github.com/vexip-ui/vexip-ui/commit/75cbc8671df4c8d73c0b659955a98a5a3b5deef9))
* **config:** add global z-index config ([#62](https://github.com/vexip-ui/vexip-ui/issues/62)) ([82b90f2](https://github.com/vexip-ui/vexip-ui/commit/82b90f26a893df43b1bb607dc94b753a36b74b36))
* **config:** auto warning when validator returns false ([2b7712d](https://github.com/vexip-ui/vexip-ui/commit/2b7712d7d25ef1ef7905934d9d5faf44c4c6003a))
* **config:** support common props config ([86c8fd8](https://github.com/vexip-ui/vexip-ui/commit/86c8fd801643f9919e074bd4d1d7825ad7eae355))
* **config:** support custom class namespace ([#48](https://github.com/vexip-ui/vexip-ui/issues/48)) ([da29ae3](https://github.com/vexip-ui/vexip-ui/commit/da29ae3e4e0c80d59d379274ccb8dbcb15254715))
* **config:** support custom icons via config ([#287](https://github.com/vexip-ui/vexip-ui/issues/287)) ([d665f10](https://github.com/vexip-ui/vexip-ui/commit/d665f103c6ba76571dd146496358d0de481a1752))
* **config:** support internal en-US locale ([2a5b2d3](https://github.com/vexip-ui/vexip-ui/commit/2a5b2d3a84f13197dbfdf1ae2d08156a3e1d7999))
* **config:** support provide config via hook functions ([8222299](https://github.com/vexip-ui/vexip-ui/commit/8222299e99769d416d6e04af5c6fab23c109e87a))
* **drawer:** support add footer with default action buttons ([ddbc8a3](https://github.com/vexip-ui/vexip-ui/commit/ddbc8a34526c1f9549e1a067795a488de43c3eaa)), closes [#117](https://github.com/vexip-ui/vexip-ui/issues/117)
* **form:** support pure form item render ([65d6b30](https://github.com/vexip-ui/vexip-ui/commit/65d6b30dfed4277859234f288eb23e6ce3f1ac76))
* **form:** support set size for all controls under form ([a332eca](https://github.com/vexip-ui/vexip-ui/commit/a332ecaad8993b1aac9c658b685570ebae198409))
* **Image:** add Image component ([#225](https://github.com/vexip-ui/vexip-ui/issues/225)) ([e26a75e](https://github.com/vexip-ui/vexip-ui/commit/e26a75eb4c714ae6e49193724b4f20f2bb7a5d38))
* **layout:** add theme mode config ([394fa8c](https://github.com/vexip-ui/vexip-ui/commit/394fa8c720ef40ee993ac449af2f8ba6a4f0c0ee))
* **Layout:** create Layout component ([#88](https://github.com/vexip-ui/vexip-ui/issues/88)) ([22c2b6d](https://github.com/vexip-ui/vexip-ui/commit/22c2b6d53f0ae27e64b320e49e6b088edd92b057)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **locale:** internally support Tamil language ([#293](https://github.com/vexip-ui/vexip-ui/issues/293)) ([0331ec7](https://github.com/vexip-ui/vexip-ui/commit/0331ec75caac7f7b0c63598c352125dfcd0c5831))
* **number-input:** add out of range effect for input control ([078681c](https://github.com/vexip-ui/vexip-ui/commit/078681c23a4158c35ec4e9714601b504ef8c359c))
* **select:** support for boolean value ([6237d08](https://github.com/vexip-ui/vexip-ui/commit/6237d081f9d8c90d79d0b4d11294be7a1d75a116))
* support specify locale config via `locale` prop ([#239](https://github.com/vexip-ui/vexip-ui/issues/239)) ([e483dea](https://github.com/vexip-ui/vexip-ui/commit/e483deab8f58b0859ea310020973f990d83a720a))
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **table:** support add column with drag type to create handler ([89df1fc](https://github.com/vexip-ui/vexip-ui/commit/89df1fc2a57ef370d43be7cabca7ff6730e5518e))
* **tabs:** add closable and show-add props ([908abaa](https://github.com/vexip-ui/vexip-ui/commit/908abaa4f6a92e0eb5a14505b5e276d35519a8fe))
* **time-picker:** add placholder prop ([b5ca190](https://github.com/vexip-ui/vexip-ui/commit/b5ca1909bc409039d5cd79c9e08427e6408ce4bc))
* **toast:** add toast plugin (manager) ([#128](https://github.com/vexip-ui/vexip-ui/issues/128)) ([a3be410](https://github.com/vexip-ui/vexip-ui/commit/a3be4101f870fe0eab242ad2bccf22f584d1dc78))
* **tour:** add Tour and TourStep components ([#401](https://github.com/vexip-ui/vexip-ui/issues/401)) ([fcfbd5f](https://github.com/vexip-ui/vexip-ui/commit/fcfbd5f2b7eab356ce8e06e3f68d7070da0ea51c))
* **transfer:** add Transfer component ([#96](https://github.com/vexip-ui/vexip-ui/issues/96)) ([454e05b](https://github.com/vexip-ui/vexip-ui/commit/454e05b937106767522f83c7d2fee16095eda3ca))
* **Viewer:** add Viewer component ([#56](https://github.com/vexip-ui/vexip-ui/issues/56)) ([f1c16af](https://github.com/vexip-ui/vexip-ui/commit/f1c16af7f2de4f0315d3c5111f2e53bfb276ceb0))
* **Viewer:** support flip actions ([#69](https://github.com/vexip-ui/vexip-ui/issues/69)) ([b8275e5](https://github.com/vexip-ui/vexip-ui/commit/b8275e5f26934a23c42035a207d8c5da56058816))


### BREAKING CHANGES

* **config:** `en-US` and `ta-IN` isn't included in internal locale config no longer.
Now these config are exported independently, using e.g. `import { enUSLocale } from 'vexip-ui'` 
to import locale config that you want to use. See docs about global config for more details.
* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.
* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



# 1.0.0 (2023-08-29)


### Bug Fixes

* all transition names using injected namespace ([432f0f7](https://github.com/vexip-ui/vexip-ui/commit/432f0f7bf2e2f41fab7712cbd8e4ea5cf92f1158))
* boolean with other type props ignore default value ([5cf9b12](https://github.com/vexip-ui/vexip-ui/commit/5cf9b12c00515428a48672929110a661f52a674b))
* **calendar:** using locale config for date labels ([7d58232](https://github.com/vexip-ui/vexip-ui/commit/7d58232267895e413badd44f063f96270f52b6cc))
* **cascader:** should reset hitting when panel options changed ([d4180f2](https://github.com/vexip-ui/vexip-ui/commit/d4180f2921af9d49564c28366aae68c99507ae1d))
* **config:** ensure props exec validator at once ([#328](https://github.com/vexip-ui/vexip-ui/issues/328)) ([bcdf759](https://github.com/vexip-ui/vexip-ui/commit/bcdf759083903b0aa85cef6d963f20dcfb8a4c76))
* **config:** ensure responsive variables namespace ([4b334c9](https://github.com/vexip-ui/vexip-ui/commit/4b334c9a0602524f65d9921e6c4f837dcdd5a766))
* **config:** global defaults config no effective ([6eba983](https://github.com/vexip-ui/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
* **config:** incorrect event prop regexp ([849ac5b](https://github.com/vexip-ui/vexip-ui/commit/849ac5bc033751e706a329f8c745862c995ecaa0)), closes [#139](https://github.com/vexip-ui/vexip-ui/issues/139)
* **config:** init config not reactive ([47298a5](https://github.com/vexip-ui/vexip-ui/commit/47298a58472d6f8a08d204add8c311a6fcd99fcb))
* **config:** passing default null to avoid warning ([44c813b](https://github.com/vexip-ui/vexip-ui/commit/44c813b98a9aac9697573c9bfa70cee86ccf6f61))
* **config:** should exist global locale ([b7a5546](https://github.com/vexip-ui/vexip-ui/commit/b7a554652b10dbe0529f3901c229511b19c878c8))
* **config:** support function as default value ([f44047e](https://github.com/vexip-ui/vexip-ui/commit/f44047e5362ec5d5374dbcd1d4ad87f51b84ca21)), closes [#41](https://github.com/vexip-ui/vexip-ui/issues/41)
* **config:** unexpected merge global locale config ([e43d8e8](https://github.com/vexip-ui/vexip-ui/commit/e43d8e89c7fb131dde6bdf0eb8613736ed13905d))
* **date-picker:** add header titles for range select datetime ([dfc2401](https://github.com/vexip-ui/vexip-ui/commit/dfc2401b111fee7915976c40030ca365cfe74103))
* fixed css vars prefix to '--vxp' ([e4c1da3](https://github.com/vexip-ui/vexip-ui/commit/e4c1da34964bfde8faf3f4bb3f96df51d1625a6d))
* **form:** add not nullable locale config ([6fb27c6](https://github.com/vexip-ui/vexip-ui/commit/6fb27c63089ca1076e40cb3335dbab3efb7bbb0f))
* install options should be optional ([0934c3c](https://github.com/vexip-ui/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
* **locale:** confirm typo in English ([#337](https://github.com/vexip-ui/vexip-ui/issues/337)) ([e256ca9](https://github.com/vexip-ui/vexip-ui/commit/e256ca9f6b8a6d3ad483880450f8d1370be14ab1))
* **locale:** correct calendar week locale ([9e1b25b](https://github.com/vexip-ui/vexip-ui/commit/9e1b25b9bb03e6b18ec970eb8f232b9cafd046a0))
* **locale:** corrent inject locale word space config ([aee45aa](https://github.com/vexip-ui/vexip-ui/commit/aee45aae8b93a54ac5f14bd6476584b52e12f045))
* **locale:** per page typo ([bf85f8b](https://github.com/vexip-ui/vexip-ui/commit/bf85f8b6f9560bf055e32844f7d2c59cbd363811))
* normalize props export of all components ([558db00](https://github.com/vexip-ui/vexip-ui/commit/558db00d2b8a55a7d108a06cd95f52e4250ed89e))
* support array type class and style props ([317fbff](https://github.com/vexip-ui/vexip-ui/commit/317fbff212847cf3d7054af99102656779e37a8e))
* support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/vexip-ui/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))


### Code Refactoring

* **config:** external locale config for on demand import ([#302](https://github.com/vexip-ui/vexip-ui/issues/302)) ([86eab10](https://github.com/vexip-ui/vexip-ui/commit/86eab101f4fbf1579e2ac2cf7abe299e1faf6583))
* icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* add locale config ([0a0ec74](https://github.com/vexip-ui/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **checkbox:** support quickly add control via prop ([4d13ec2](https://github.com/vexip-ui/vexip-ui/commit/4d13ec23db7095415b8d24d17c0c56be564d1298)), closes [#104](https://github.com/vexip-ui/vexip-ui/issues/104)
* **config-provider:** support config z-index ([8772bc2](https://github.com/vexip-ui/vexip-ui/commit/8772bc2d9d964ef5c0b864a69bead5493cd76a23))
* **config-provider:** support partial provide config ([#25](https://github.com/vexip-ui/vexip-ui/issues/25)) ([75cbc86](https://github.com/vexip-ui/vexip-ui/commit/75cbc8671df4c8d73c0b659955a98a5a3b5deef9))
* **config:** add global z-index config ([#62](https://github.com/vexip-ui/vexip-ui/issues/62)) ([82b90f2](https://github.com/vexip-ui/vexip-ui/commit/82b90f26a893df43b1bb607dc94b753a36b74b36))
* **config:** auto warning when validator returns false ([2b7712d](https://github.com/vexip-ui/vexip-ui/commit/2b7712d7d25ef1ef7905934d9d5faf44c4c6003a))
* **config:** support common props config ([86c8fd8](https://github.com/vexip-ui/vexip-ui/commit/86c8fd801643f9919e074bd4d1d7825ad7eae355))
* **config:** support custom class namespace ([#48](https://github.com/vexip-ui/vexip-ui/issues/48)) ([da29ae3](https://github.com/vexip-ui/vexip-ui/commit/da29ae3e4e0c80d59d379274ccb8dbcb15254715))
* **config:** support custom icons via config ([#287](https://github.com/vexip-ui/vexip-ui/issues/287)) ([d665f10](https://github.com/vexip-ui/vexip-ui/commit/d665f103c6ba76571dd146496358d0de481a1752))
* **config:** support internal en-US locale ([2a5b2d3](https://github.com/vexip-ui/vexip-ui/commit/2a5b2d3a84f13197dbfdf1ae2d08156a3e1d7999))
* **config:** support provide config via hook functions ([8222299](https://github.com/vexip-ui/vexip-ui/commit/8222299e99769d416d6e04af5c6fab23c109e87a))
* **drawer:** support add footer with default action buttons ([ddbc8a3](https://github.com/vexip-ui/vexip-ui/commit/ddbc8a34526c1f9549e1a067795a488de43c3eaa)), closes [#117](https://github.com/vexip-ui/vexip-ui/issues/117)
* **form:** support pure form item render ([65d6b30](https://github.com/vexip-ui/vexip-ui/commit/65d6b30dfed4277859234f288eb23e6ce3f1ac76))
* **form:** support set size for all controls under form ([a332eca](https://github.com/vexip-ui/vexip-ui/commit/a332ecaad8993b1aac9c658b685570ebae198409))
* **Image:** add Image component ([#225](https://github.com/vexip-ui/vexip-ui/issues/225)) ([e26a75e](https://github.com/vexip-ui/vexip-ui/commit/e26a75eb4c714ae6e49193724b4f20f2bb7a5d38))
* **layout:** add theme mode config ([394fa8c](https://github.com/vexip-ui/vexip-ui/commit/394fa8c720ef40ee993ac449af2f8ba6a4f0c0ee))
* **Layout:** create Layout component ([#88](https://github.com/vexip-ui/vexip-ui/issues/88)) ([22c2b6d](https://github.com/vexip-ui/vexip-ui/commit/22c2b6d53f0ae27e64b320e49e6b088edd92b057)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **locale:** internally support Tamil language ([#293](https://github.com/vexip-ui/vexip-ui/issues/293)) ([0331ec7](https://github.com/vexip-ui/vexip-ui/commit/0331ec75caac7f7b0c63598c352125dfcd0c5831))
* **number-input:** add out of range effect for input control ([078681c](https://github.com/vexip-ui/vexip-ui/commit/078681c23a4158c35ec4e9714601b504ef8c359c))
* **select:** support for boolean value ([6237d08](https://github.com/vexip-ui/vexip-ui/commit/6237d081f9d8c90d79d0b4d11294be7a1d75a116))
* support specify locale config via `locale` prop ([#239](https://github.com/vexip-ui/vexip-ui/issues/239)) ([e483dea](https://github.com/vexip-ui/vexip-ui/commit/e483deab8f58b0859ea310020973f990d83a720a))
* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **table:** support add column with drag type to create handler ([89df1fc](https://github.com/vexip-ui/vexip-ui/commit/89df1fc2a57ef370d43be7cabca7ff6730e5518e))
* **tabs:** add closable and show-add props ([908abaa](https://github.com/vexip-ui/vexip-ui/commit/908abaa4f6a92e0eb5a14505b5e276d35519a8fe))
* **time-picker:** add placholder prop ([b5ca190](https://github.com/vexip-ui/vexip-ui/commit/b5ca1909bc409039d5cd79c9e08427e6408ce4bc))
* **toast:** add toast plugin (manager) ([#128](https://github.com/vexip-ui/vexip-ui/issues/128)) ([a3be410](https://github.com/vexip-ui/vexip-ui/commit/a3be4101f870fe0eab242ad2bccf22f584d1dc78))
* **tour:** add Tour and TourStep components ([#401](https://github.com/vexip-ui/vexip-ui/issues/401)) ([fcfbd5f](https://github.com/vexip-ui/vexip-ui/commit/fcfbd5f2b7eab356ce8e06e3f68d7070da0ea51c))
* **transfer:** add Transfer component ([#96](https://github.com/vexip-ui/vexip-ui/issues/96)) ([454e05b](https://github.com/vexip-ui/vexip-ui/commit/454e05b937106767522f83c7d2fee16095eda3ca))
* **Viewer:** add Viewer component ([#56](https://github.com/vexip-ui/vexip-ui/issues/56)) ([f1c16af](https://github.com/vexip-ui/vexip-ui/commit/f1c16af7f2de4f0315d3c5111f2e53bfb276ceb0))
* **Viewer:** support flip actions ([#69](https://github.com/vexip-ui/vexip-ui/issues/69)) ([b8275e5](https://github.com/vexip-ui/vexip-ui/commit/b8275e5f26934a23c42035a207d8c5da56058816))


### BREAKING CHANGES

* **config:** `en-US` and `ta-IN` isn't included in internal locale config no longer.
Now these config are exported independently, using e.g. `import { enUSLocale } from 'vexip-ui'` 
to import locale config that you want to use. See docs about global config for more details.
* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.
* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



