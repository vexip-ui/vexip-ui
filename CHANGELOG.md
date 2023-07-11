## [2.1.27](https://github.com/vexip-ui/vexip-ui/compare/v2.1.26...v2.1.27) (2023-07-09)


### Bug Fixes

* **table:** incorrect row position when change data with virtual ([0302ef5](https://github.com/vexip-ui/vexip-ui/commit/0302ef5fee04e9c954dc00a50d9430d0c8c91662))


### Features

* **playground:** upgrade repl to v2, support Monaco editor ([ab24634](https://github.com/vexip-ui/vexip-ui/commit/ab24634a184b7c2292f1640b23818b799d24c636))


### Performance Improvements

* hardware acceleration for animations ([1bbba34](https://github.com/vexip-ui/vexip-ui/commit/1bbba340461b02e277181f0dde24766221a82627))
* improve Checkbox and Wheel loading animations ([cccc5d0](https://github.com/vexip-ui/vexip-ui/commit/cccc5d06e823bed624e126569bec01a74935098c))



## [2.1.26](https://github.com/vexip-ui/vexip-ui/compare/v2.1.25...v2.1.26) (2023-07-03)


### Bug Fixes

* **message:** improve default type border style ([3ef56d9](https://github.com/vexip-ui/vexip-ui/commit/3ef56d9d31835ae7222c6a01ea57b09f0ba5c230))
* **modal:** ensure effect position calculate when hide mask ([0bccd9b](https://github.com/vexip-ui/vexip-ui/commit/0bccd9bde6bae27ad648f4f16a69917d65317297))
* **notice:** improve default type border style ([5e238e1](https://github.com/vexip-ui/vexip-ui/commit/5e238e119efd035569975b0346345a6c1900702f))
* **option:** improve to without title by default, support custom ([3ca9b67](https://github.com/vexip-ui/vexip-ui/commit/3ca9b67e5e0c78e5be59c9ca94bec7d53b35837b))
* **tab-nav:** marker not update when manully change active ([2356a44](https://github.com/vexip-ui/vexip-ui/commit/2356a44b7c3e90fa6244136fceac9c135a699bf5))
* **textarea:** improve overflow-y to auto ([5407d11](https://github.com/vexip-ui/vexip-ui/commit/5407d111c32a6593c9ca33d08403f11c29e0f099))
* **virtual-list:** unexpected style not be merged ([53c02d5](https://github.com/vexip-ui/vexip-ui/commit/53c02d5c2a7b07cd2d68051e86eb3b329fa520b5))



## [2.1.25](https://github.com/vexip-ui/vexip-ui/compare/v2.1.24...v2.1.25) (2023-06-21)


### Bug Fixes

* **modal:** should responsive when no draggable or resizable ([bf5b646](https://github.com/vexip-ui/vexip-ui/commit/bf5b6462a86bfe4343501c3fea7bef852acea3eb))
* **native-scroll:** deprecated on-before-scroll prop ([7e2062d](https://github.com/vexip-ui/vexip-ui/commit/7e2062de5cd1b477440505dbc5602c6284e8c64a))
* **table:** add missing foot cell style ([cc7a12d](https://github.com/vexip-ui/vexip-ui/commit/cc7a12d159afcaf160a1ed592c29b70c92d27782))
* **table:** ensure refresh all horizontal scrolls ([00a54a4](https://github.com/vexip-ui/vexip-ui/commit/00a54a4404e303f17a2c240781f573d954fedaa3))
* **table:** ensure refresh vertical scrollbar when data changed ([9ffeab8](https://github.com/vexip-ui/vexip-ui/commit/9ffeab864ecef568d64362260da9ace9e6c312e1))
* **table:** incorrect fixed columns width calculate ([39e2ee3](https://github.com/vexip-ui/vexip-ui/commit/39e2ee394cd83ca6a7095a6dee22901ceefa315c))
* **table:** infinite watch when dynamically render columns ([d134812](https://github.com/vexip-ui/vexip-ui/commit/d1348123875b7dd1adc00e70a252e8a183587577))
* **table:** missing right border when merging cells ([16550b9](https://github.com/vexip-ui/vexip-ui/commit/16550b95f6589b0a53bf4137c9153ff6a7425a7a))


### Features

* **auto-complete:** add debounce and delay props ([12ae1af](https://github.com/vexip-ui/vexip-ui/commit/12ae1af4733b5d747519bd82ed03cf1564acb5d4))
* **contextmenu:** support set renderer for each menu ([e29c538](https://github.com/vexip-ui/vexip-ui/commit/e29c5385a9fdd96676684b51d0033a28a288f5ff))
* **input:** support custom input throttle or debounce delay ([f220e82](https://github.com/vexip-ui/vexip-ui/commit/f220e8260f0ea2b913f29b6617c9630b7cf1625c))
* **number-input:** support custom input throttle or debounce delay ([274f906](https://github.com/vexip-ui/vexip-ui/commit/274f906a45de029b5f7392900590a83a7418cd7e))
* **renderer:** support store variables and resue them via slot ([322cb6e](https://github.com/vexip-ui/vexip-ui/commit/322cb6e4a01790a6078dc611a16a7bedcbc173d1))
* **textarea:** support custom input throttle or debounce delay ([d0cc62c](https://github.com/vexip-ui/vexip-ui/commit/d0cc62cdbaab53d205a207fb7f361774053c5467))
* **utils:** toFixed supports scientific notation ([62485f7](https://github.com/vexip-ui/vexip-ui/commit/62485f74f01bfe330317df0e9b3e4a5c21515681))


### Performance Improvements

* **table:** improve table horizontal scroll performance ([9916a44](https://github.com/vexip-ui/vexip-ui/commit/9916a4406f213c32229eb34179cf1b38b1882719))



## [2.1.24](https://github.com/vexip-ui/vexip-ui/compare/v2.1.23...v2.1.24) (2023-06-13)


### Bug Fixes

* adjust `update:` events emitted order ([#388](https://github.com/vexip-ui/vexip-ui/issues/388)) ([b6d826b](https://github.com/vexip-ui/vexip-ui/commit/b6d826b0c1bd4ebeb08a59e03fb1a40ec6c8e9f9))
* **anchor:** effect working with window scroll ([d1cb5b6](https://github.com/vexip-ui/vexip-ui/commit/d1cb5b684d3b6b02ab5b33f6bea400fddbae83c8))
* **anchor:** incorrect track-color-active variable ([#378](https://github.com/vexip-ui/vexip-ui/issues/378)) ([4e14a6a](https://github.com/vexip-ui/vexip-ui/commit/4e14a6a1815e86d7a5cf36c02ec5805c69830115))
* **drawer:** remove internal --vxp-drawer-hanlder-offset variable ([7c32a6a](https://github.com/vexip-ui/vexip-ui/commit/7c32a6abe22c64ea09bfc51f1892f740cc59ae6e))
* enable hardware acceleration for masker, modal, drawer ([2f99288](https://github.com/vexip-ui/vexip-ui/commit/2f992885581507635ea24d83436edce856e325d6))
* **layout:** ensure emit resize event in fit-window ([b634de5](https://github.com/vexip-ui/vexip-ui/commit/b634de53b6a78bc6400dd50edf7b01accb4c285d))
* **pagination:** center page items missing title ([5135a87](https://github.com/vexip-ui/vexip-ui/commit/5135a8751d2a06d99d5d8d0d648926136a1d3635))
* **radio:** normalize button and border type style ([24cb6c0](https://github.com/vexip-ui/vexip-ui/commit/24cb6c000a983cf7dc7838dbd59255d60bd2a020))
* **tab-nav:** incorrect active content border style ([2f6d78d](https://github.com/vexip-ui/vexip-ui/commit/2f6d78dbba88daf4ff5d52f3b7c7ce7a740ccd54))


### Code Refactoring

* **table:** rename `meta-data` prop to `meta` ([6f03cf1](https://github.com/vexip-ui/vexip-ui/commit/6f03cf1cce27cfe5e7ca7c80c81b3c2060e77c23))


### Features

* **config-provider:** support specify the scope theme ([1f5387b](https://github.com/vexip-ui/vexip-ui/commit/1f5387b61c38253c77fe119cf7f89def8befd770)), closes [#380](https://github.com/vexip-ui/vexip-ui/issues/380)
* **layout:** add fit-window prop ([d610f36](https://github.com/vexip-ui/vexip-ui/commit/d610f36286e5d8bb53984a5de48dca2f94589dcc))
* **layout:** add inner-classes prop ([874f9a4](https://github.com/vexip-ui/vexip-ui/commit/874f9a4b21cee716045332e948c812a6662797b5))
* **table:** support add table summaries (footer) ([#386](https://github.com/vexip-ui/vexip-ui/issues/386)) ([27d0fd6](https://github.com/vexip-ui/vexip-ui/commit/27d0fd683bf7c5ad438d257301339f6d7e94d936))
* **table:** support merge cells ([#384](https://github.com/vexip-ui/vexip-ui/issues/384)) ([5ce3280](https://github.com/vexip-ui/vexip-ui/commit/5ce3280eb902c6719678ad19d512b53da3bed504))


### BREAKING CHANGES

* **table:** TableColumn's `meta-data` prop has been deprecated,
please use `meta` prop to replace it.



## [2.1.23](https://github.com/vexip-ui/vexip-ui/compare/v2.1.22...v2.1.23) (2023-06-02)


### Bug Fixes

* **collapse:** adjust the border radius of the last panel of a card type ([#366](https://github.com/vexip-ui/vexip-ui/issues/366)) ([6e422fd](https://github.com/vexip-ui/vexip-ui/commit/6e422fd5a206ba7936b7d2ab7f22f7f3f10267cf))
* **confirm:** explicitly specify auto-remove false ([c5565ea](https://github.com/vexip-ui/vexip-ui/commit/c5565eae95e8067d24c27494e13112d9efe6d7a2))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))
* **input:** incorrect count-color-disabled variable ([#373](https://github.com/vexip-ui/vexip-ui/issues/373)) ([3bf3204](https://github.com/vexip-ui/vexip-ui/commit/3bf32044e14473985114eb5f39feebf51e91efef))
* **layout:** adjust aside class to be compatible with nested ([88fc9c0](https://github.com/vexip-ui/vexip-ui/commit/88fc9c07c7bbdce39bfbc0e1ef44a1491c711494))
* **layout:** aside main scroll not refresh ([89e58e5](https://github.com/vexip-ui/vexip-ui/commit/89e58e5811c8a25de9f56d9e22f5626282c741f9))
* **layout:** subtract border width when recording height ([31fb537](https://github.com/vexip-ui/vexip-ui/commit/31fb537f057859b1f8536924c2b2ab3763ee41ad)), closes [#364](https://github.com/vexip-ui/vexip-ui/issues/364)
* **locale:** confirm typo in English ([#337](https://github.com/vexip-ui/vexip-ui/issues/337)) ([e256ca9](https://github.com/vexip-ui/vexip-ui/commit/e256ca9f6b8a6d3ad483880450f8d1370be14ab1))
* normalize props export of all components ([558db00](https://github.com/vexip-ui/vexip-ui/commit/558db00d2b8a55a7d108a06cd95f52e4250ed89e))
* **number-input:** props.value precision lose efficacy ([#365](https://github.com/vexip-ui/vexip-ui/issues/365)) ([64650e8](https://github.com/vexip-ui/vexip-ui/commit/64650e8e67bfc82e75af22699ef4a80ec38b4970))
* **tab-nav:** add missing scroll style dependency ([3d396fa](https://github.com/vexip-ui/vexip-ui/commit/3d396fa4f3be2f92974e418fd8c3cf99d2fb255f))
* **tab-nav:** incorrect pad display ([560790a](https://github.com/vexip-ui/vexip-ui/commit/560790a3d405a9db84e18faa64d4e2e030ec5e2c))
* **textarea:** incorrect count-color-disabled variable ([#372](https://github.com/vexip-ui/vexip-ui/issues/372)) ([8b9ac41](https://github.com/vexip-ui/vexip-ui/commit/8b9ac416deff0347ad5b20a5fe5a6c9a0ea8ee06))
* **timeline:** effect alternate work correctly ([ff77266](https://github.com/vexip-ui/vexip-ui/commit/ff77266e3841d524be9f25f9639fdaecb46ceced))
* **utils:** incorrect leap year function name ([#345](https://github.com/vexip-ui/vexip-ui/issues/345)) ([1958a46](https://github.com/vexip-ui/vexip-ui/commit/1958a46a63ce5f26f6d16e46d328abe7f019fe92))


### Features

* **layout:** add content-resize event ([0eda095](https://github.com/vexip-ui/vexip-ui/commit/0eda0954232047c1826d3626a870eb12dc57e314))
* **select:** add fit-popper prop ([#357](https://github.com/vexip-ui/vexip-ui/issues/357)) ([5c2c0cd](https://github.com/vexip-ui/vexip-ui/commit/5c2c0cd0733e5c43518500f1e114f52c944144ea))
* **table:** support resize table columns' width ([#343](https://github.com/vexip-ui/vexip-ui/issues/343)) ([1a9f493](https://github.com/vexip-ui/vexip-ui/commit/1a9f4931189c871ec750e34afbc303a1f35a993e))
* **timeline:** using alternate to replace both-sides prop ([5f81887](https://github.com/vexip-ui/vexip-ui/commit/5f8188742197bd100dcf9833d1aeaa685b41b9d0))
* **utils:** add getXBorder and getYBorder methods ([6f360d2](https://github.com/vexip-ui/vexip-ui/commit/6f360d2cc0a61280e13ff9d22f4103dc02ef6a43))


### Performance Improvements

* **native-scroll:** debounce resize process ([ac8e61d](https://github.com/vexip-ui/vexip-ui/commit/ac8e61d66fa279f6f74773222e6e3e8af34bcc83))
* **native-scroll:** disable observe children resize by default ([7ac1d74](https://github.com/vexip-ui/vexip-ui/commit/7ac1d74e93523912254cbf59d8e342274c410ac6))
* **tree:** improve internal reactive variables ([92ba459](https://github.com/vexip-ui/vexip-ui/commit/92ba4591e0ab40c5784a5d49380c6223e67207d7))


### BREAKING CHANGES

* **native-scroll:** NativeScroll no longer observes children resize by default,
you can add `observe-deep` prop to enable it.
* **timeline:** Timeline's `both-sides` prop has been deprecated,
please using `alternate` prop to replace it.



## [2.1.22](https://github.com/vexip-ui/vexip-ui/compare/v2.1.21...v2.1.22) (2023-05-25)


### Bug Fixes

* **cascader:** should reset hitting when panel options changed ([d4180f2](https://github.com/vexip-ui/vexip-ui/commit/d4180f2921af9d49564c28366aae68c99507ae1d))
* **config:** ensure props exec validator at once ([#328](https://github.com/vexip-ui/vexip-ui/issues/328)) ([bcdf759](https://github.com/vexip-ui/vexip-ui/commit/bcdf759083903b0aa85cef6d963f20dcfb8a4c76))
* **dropdown:** disable transfer for nested dropdown ([1c65cfd](https://github.com/vexip-ui/vexip-ui/commit/1c65cfd8000afe58b2f0e8f513c333f21a50f1d9))
* **menu:** improve and fix menu item style ([9a780f4](https://github.com/vexip-ui/vexip-ui/commit/9a780f4117474c8460e8a5235a6b521038fd9274))
* **menu:** incorrect menu item style in rest ([afa3e56](https://github.com/vexip-ui/vexip-ui/commit/afa3e560926b8abd86bd6f4fd2378d1e5e6964f3))
* **menu:** missing meta payload when using options ([f8bcc0d](https://github.com/vexip-ui/vexip-ui/commit/f8bcc0daf486f11bd97c7702e5f260d20b366e7d))
* **menu:** popper cannot disappear after quickly hover twice ([d644b54](https://github.com/vexip-ui/vexip-ui/commit/d644b54a4aa777645961054afd72caeaaffd77ec))
* **tooltip:** radius variable typo ([cb978ee](https://github.com/vexip-ui/vexip-ui/commit/cb978ee3743112c3eb13860963f14149c64b2bd4))
* **typography:** exactly using kbd tag for keyboard text ([f288ef6](https://github.com/vexip-ui/vexip-ui/commit/f288ef69796ef88d84b115f3d8f9468d8352b631))


### Features

* **dropdown:** add custom prop to mark to disable nested process ([f29ba14](https://github.com/vexip-ui/vexip-ui/commit/f29ba145aaa1a556c5aa262e81f35f7ece659388))
* exports all props definitions to support extends ([0186871](https://github.com/vexip-ui/vexip-ui/commit/018687198aae791c63eb897305d96aa6354eb52e))
* **style:** use new font-family for mono ([9f88146](https://github.com/vexip-ui/vexip-ui/commit/9f881468ddc48dc63d84b316b1f9bacc8a87f889))



## [2.1.21](https://github.com/vexip-ui/vexip-ui/compare/v2.1.20...v2.1.21) (2023-05-21)


### Bug Fixes

* **date-picker:** add header titles for range select datetime ([dfc2401](https://github.com/vexip-ui/vexip-ui/commit/dfc2401b111fee7915976c40030ca365cfe74103))
* **layout:** disable transition when not mounted ([5fe7030](https://github.com/vexip-ui/vexip-ui/commit/5fe703004b64aae4fef07fd7ee6c45ef2e9f4b50))
* **radio:** ensure effective loading icon in button mode ([a59eb8e](https://github.com/vexip-ui/vexip-ui/commit/a59eb8eb4f93703409b135eb457a0c6e563d5f38))
* **radio:** normailze line-height in button mode ([7835c93](https://github.com/vexip-ui/vexip-ui/commit/7835c9382558c54f00a3ae3c012b8d349dbed3eb))
* **text:** incorrect style of thin mode ([dc1ccce](https://github.com/vexip-ui/vexip-ui/commit/dc1ccce0e5315cb7a55cd045015d369761fe3aad))


### Features

* **auto-complete:** add focus and blur events ([a5873a1](https://github.com/vexip-ui/vexip-ui/commit/a5873a1b13c2d93d0e4e381b0de4885086561ea6))
* **bem-helper:** create bem-helper package ([f91208e](https://github.com/vexip-ui/vexip-ui/commit/f91208e661ac1ecb0d14289dc57286683392f212))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* **input:** add copyValue api method ([29fda06](https://github.com/vexip-ui/vexip-ui/commit/29fda06748aaa22e916ab5e37c75287c3d6ec089))
* normalize focus and blur methods for form components ([718090c](https://github.com/vexip-ui/vexip-ui/commit/718090c4cadee00496717f04e4a73cc599393332))
* **select:** add api focus and blur methods ([638fc3c](https://github.com/vexip-ui/vexip-ui/commit/638fc3c45c1d72f1ce862110aee8c4167ab48a51))
* **time-picker:** support click item to select ([6f58387](https://github.com/vexip-ui/vexip-ui/commit/6f583871b635a77a41ba5b1bf6f229156da50823))
* **utils:** add runQueueFrame method ([a376a15](https://github.com/vexip-ui/vexip-ui/commit/a376a15bbcb29ab93224d1fe1f13e0b8442ddb4e))
* **wheel:** emit item-click event ([9c84084](https://github.com/vexip-ui/vexip-ui/commit/9c84084c0214e7abd816d2b817feadb100de0158))



## [2.1.20](https://github.com/vexip-ui/vexip-ui/compare/v2.1.19...v2.1.20) (2023-05-14)


### Bug Fixes

* **scrollbar:** incorrect style import path ([5e2a8c9](https://github.com/vexip-ui/vexip-ui/commit/5e2a8c9cf4e556144445de13386b63b8273012c4))



## [2.1.19](https://github.com/vexip-ui/vexip-ui/compare/v2.1.17...v2.1.19) (2023-05-14)


### Bug Fixes

* **card:** unexpected content collapse ([e063a40](https://github.com/vexip-ui/vexip-ui/commit/e063a408632639d4c19fcb4e2343a8accb9d67d2))
* **color-picker:** alpha cannot be confirmed to 0 ([9921700](https://github.com/vexip-ui/vexip-ui/commit/9921700cf2a09490259159a03900ba8ea53be1fe))
* **layout:** correct timing of mediaQuery call in ssr ([62b5443](https://github.com/vexip-ui/vexip-ui/commit/62b5443e97d5e0bcaa59ac4dc74ff703040c17bd))
* **layout:** emit expanded change event when breakpoint changed ([94f2716](https://github.com/vexip-ui/vexip-ui/commit/94f2716c167db3a21eaffe8967d1ea47923270cd))
* **scrollbar:** remove incorrect style dependency ([7213a5c](https://github.com/vexip-ui/vexip-ui/commit/7213a5c71bb15c0e7ae94600431712a6b39bfe26))
* **table:** correct filter trigger style ([c9fc151](https://github.com/vexip-ui/vexip-ui/commit/c9fc1510be5e223b01d42ab407cb306f598fed49))
* **table:** correct using native scroll exposed ([ef58f8a](https://github.com/vexip-ui/vexip-ui/commit/ef58f8a85a1580230a6b4faa9456416c0f63df8d))
* **table:** effect re-render when column slots' content changed ([ca79311](https://github.com/vexip-ui/vexip-ui/commit/ca79311d31a234736c182f7afe576ecaf79c92fd))
* **utils:** correct flatTree filter method ([94dacad](https://github.com/vexip-ui/vexip-ui/commit/94dacad0625fbd2e520d646a4afaad2692909c47))


### Code Refactoring

* **layout:** normalize slot params and exposed ([5abb6a3](https://github.com/vexip-ui/vexip-ui/commit/5abb6a36636162c9c1affa3a86e33f9c98408651))


### Features

* **ellipsis:** add tip-disabled prop ([e24cd7d](https://github.com/vexip-ui/vexip-ui/commit/e24cd7d87c6cb34535bd4beba81ca4e4e0af741d))
* **table:** add text-align prop for TableColumn ([479abaa](https://github.com/vexip-ui/vexip-ui/commit/479abaaba9b165d1947faf174f3af4d927f8a8b1))
* **table:** support custom filter renderer ([241d8aa](https://github.com/vexip-ui/vexip-ui/commit/241d8aa9f1bccae97ae2a50534ae6157f2c3b827))
* **table:** use class prop replace class-name ([10b32ec](https://github.com/vexip-ui/vexip-ui/commit/10b32ec7496d6928e350150676261e758b342896))
* **tooltip:** provide api methods from slots ([879cc0a](https://github.com/vexip-ui/vexip-ui/commit/879cc0ad477830ad72955bf41129fbf33a1861a2))
* **utils:** enhance flatTree to support depth first and filter ([c5a5728](https://github.com/vexip-ui/vexip-ui/commit/c5a57284863de973dc0480243af114cc02217b44))


### BREAKING CHANGES

* **layout:** Api methods renamed:  `toggleReduce` -> `toggleReduced`,
`toggleUserDrop` -> `toggleUserDropped`



## [2.1.17](https://github.com/vexip-ui/vexip-ui/compare/v2.1.16...v2.1.17) (2023-05-03)


### Bug Fixes

* **card:** correct header flex style ([43d509a](https://github.com/vexip-ui/vexip-ui/commit/43d509a5f2164e0c0a9567058453c12dd89cc1a6))
* **scroll:** content shaking when init or resized ([1c8b818](https://github.com/vexip-ui/vexip-ui/commit/1c8b81821e9c3f80bb77dddacfb1912793952555))


### Features

* **config-provider:** support config z-index ([8772bc2](https://github.com/vexip-ui/vexip-ui/commit/8772bc2d9d964ef5c0b864a69bead5493cd76a23))
* **config:** support provide config via hook functions ([8222299](https://github.com/vexip-ui/vexip-ui/commit/8222299e99769d416d6e04af5c6fab23c109e87a))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))


### Performance Improvements

* **scroll:** refactor slot params to improve content render ([5838d8f](https://github.com/vexip-ui/vexip-ui/commit/5838d8fe62a8abcb70bbfcbdfd55d6528d36e04f)), closes [#316](https://github.com/vexip-ui/vexip-ui/issues/316)


### BREAKING CHANGES

* **scroll:** Slot parameters of Scroll (also NativeScroll) is changed
to methods only, and now using the getState method to get scroll state.
And the modifier class names of Scroll's wrapper are transfered to the
Scroll root element.



## [2.1.16](https://github.com/vexip-ui/vexip-ui/compare/v2.1.15...v2.1.16) (2023-04-23)


### Bug Fixes

* **anchor:** ensure get scroll methods and element ([8b9b180](https://github.com/vexip-ui/vexip-ui/commit/8b9b1807274c12e386f8f70aa66ad606eb1526b4))
* **auto-complate:** ensure effect ignore-case prop ([#312](https://github.com/vexip-ui/vexip-ui/issues/312)) ([398c681](https://github.com/vexip-ui/vexip-ui/commit/398c681796c5adf655782bd83d152e1cfb3b49a5))
* **auto-complete:** no hover effect when using filter ([20d4f73](https://github.com/vexip-ui/vexip-ui/commit/20d4f73bd76d0ee9a77eb385d3a519c0659ef2f3))
* **card:** flexible height for content ([dba86b6](https://github.com/vexip-ui/vexip-ui/commit/dba86b6eb297cbe488e43dc9ed7dd111dcc3c237))
* **form-submit:** missing button style dependency ([02f3f04](https://github.com/vexip-ui/vexip-ui/commit/02f3f048d24311451aa06a83e257af45b22665c9))
* **layout:** ensure aside-main using y scrollbar ([131573c](https://github.com/vexip-ui/vexip-ui/commit/131573c88df3aa8e4a7d79de98bf168e43d5979c))
* **layout:** incorrect main section min-height ([a3c325f](https://github.com/vexip-ui/vexip-ui/commit/a3c325fb861d37e3c09a62672493e83e2da17293))
* **masker:** set valid z-index if default active ([2d4f613](https://github.com/vexip-ui/vexip-ui/commit/2d4f6131a174c76bdaf0ef5b377be50526c0e799))
* **utils:** flatTree don't set parent if parentField is empty ([a1d51a5](https://github.com/vexip-ui/vexip-ui/commit/a1d51a52de5d82b251e63e829499d6f35aa4db0b))



## [2.1.15](https://github.com/vexip-ui/vexip-ui/compare/v2.1.14...v2.1.15) (2023-04-17)


### Bug Fixes

* **layout:** fixed wrapper height when `fixed-main` ([f47d9a6](https://github.com/vexip-ui/vexip-ui/commit/f47d9a689b284a6eb1c73b6390b323442d0273f3))
* **table:** ensure ignore when row drop to its parent ([3543510](https://github.com/vexip-ui/vexip-ui/commit/354351024c242119fc9f8043e941e21b321813e9))
* **table:** ensure render indicator when using drag column ([388ffec](https://github.com/vexip-ui/vexip-ui/commit/388ffecaa9d77367fac775d049b5969770422dc3))
* **table:** infinitely rerender when using primitive object in TableColumn ([19f5f55](https://github.com/vexip-ui/vexip-ui/commit/19f5f5534b38de71553e6ad5798ffe57b1a97d0b)), closes [#303](https://github.com/vexip-ui/vexip-ui/issues/303)



## [2.1.14](https://github.com/vexip-ui/vexip-ui/compare/v2.1.13...v2.1.14) (2023-04-13)


### Features

* **icons:** upgrate font-awesome to 6.4.0 ([74a47cb](https://github.com/vexip-ui/vexip-ui/commit/74a47cb9efefdb696835b41828515eaac6e23aaf))
* **layout:** add fixed-main prop ([969f512](https://github.com/vexip-ui/vexip-ui/commit/969f512874356d24fb26a711047ef1c1928648b4))
* **utils:** add normalizePath method ([4411b49](https://github.com/vexip-ui/vexip-ui/commit/4411b496bef1548d7c48c2dc8999d642dd1f2b75))



## [2.1.13](https://github.com/vexip-ui/vexip-ui/compare/v2.1.12...v2.1.13) (2023-04-12)


### Bug Fixes

* **scroll:** improve extra slot not render when no content ([4dfccb8](https://github.com/vexip-ui/vexip-ui/commit/4dfccb8a7725023117ace6dfed4910c23dafb6c8))
* **style:** topological sorting for style import ([a36d606](https://github.com/vexip-ui/vexip-ui/commit/a36d6064d544b33da331ea760f1419f83c391f11))



## [2.1.12](https://github.com/vexip-ui/vexip-ui/compare/v2.1.11...v2.1.12) (2023-04-06)


### Bug Fixes

* **number-input:** ensure emit change event in sync mode ([aab42ab](https://github.com/vexip-ui/vexip-ui/commit/aab42ab4170859ee89d2896eca2d9944d4b42f38)), closes [#296](https://github.com/vexip-ui/vexip-ui/issues/296)
* **number-input:** unexpected behavior in sync mode ([9c77dc3](https://github.com/vexip-ui/vexip-ui/commit/9c77dc3b1b37719987e15175ac5b20c4c6e47559)), closes [#299](https://github.com/vexip-ui/vexip-ui/issues/299)
* **select:** correctly emit focus and blur events ([e9ee8ce](https://github.com/vexip-ui/vexip-ui/commit/e9ee8ce265e975b3b3a869c966d892ec17fe8f24)), closes [#300](https://github.com/vexip-ui/vexip-ui/issues/300)
* specific type value for internal buttons ([0a39d69](https://github.com/vexip-ui/vexip-ui/commit/0a39d697b434aa7b55afe502da0b649a48c16c32)), closes [#297](https://github.com/vexip-ui/vexip-ui/issues/297)


### Code Refactoring

* **config:** external locale config for on demand import ([#302](https://github.com/vexip-ui/vexip-ui/issues/302)) ([86eab10](https://github.com/vexip-ui/vexip-ui/commit/86eab101f4fbf1579e2ac2cf7abe299e1faf6583))


### Features

* **number-input:** add out of range effect for input control ([078681c](https://github.com/vexip-ui/vexip-ui/commit/078681c23a4158c35ec4e9714601b504ef8c359c))
* **select:** support remote mode ([#301](https://github.com/vexip-ui/vexip-ui/issues/301)) ([e5da199](https://github.com/vexip-ui/vexip-ui/commit/e5da1993f0f2110128570abb08b09835b19c75da))


### BREAKING CHANGES

* **config:** `en-US` and `ta-IN` isn't included in internal locale config no longer.
Now these config are exported independently, using e.g. `import { enUSLocale } from 'vexip-ui'` 
to import locale config that you want to use. See docs about global config for more details.



## [2.1.11](https://github.com/vexip-ui/vexip-ui/compare/v2.1.10...v2.1.11) (2023-04-03)


### Bug Fixes

* **plugins:** support vexip-ui version lower than 2.1.10 ([7e747d2](https://github.com/vexip-ui/vexip-ui/commit/7e747d2882e22aa1acc9b36e082a256675911259))


### Features

* **locale:** internally support Tamil language ([#293](https://github.com/vexip-ui/vexip-ui/issues/293)) ([0331ec7](https://github.com/vexip-ui/vexip-ui/commit/0331ec75caac7f7b0c63598c352125dfcd0c5831))
* **table:** support add column with drag type to create handler ([89df1fc](https://github.com/vexip-ui/vexip-ui/commit/89df1fc2a57ef370d43be7cabca7ff6730e5518e))



## [2.1.10](https://github.com/vexip-ui/vexip-ui/compare/v2.1.9...v2.1.10) (2023-03-29)


### Bug Fixes

* **button:** incorrect style in circle group when with tooltip ([947c360](https://github.com/vexip-ui/vexip-ui/commit/947c360ce12ab4cd7a14cbe9546d2c5bc99e7683)), closes [#289](https://github.com/vexip-ui/vexip-ui/issues/289)
* content shrink when body too long in Modal and Drawer ([43cfd87](https://github.com/vexip-ui/vexip-ui/commit/43cfd8746d82f61a83f2637bf3a1d5f296e8e750))
* **wheel:** arrows not render with warning ([0e7d4cd](https://github.com/vexip-ui/vexip-ui/commit/0e7d4cd9663eb3404b2a7cbdccd14f7336c82586)), closes [#292](https://github.com/vexip-ui/vexip-ui/issues/292)


### Code Refactoring

* switch to use es module to export style files ([#290](https://github.com/vexip-ui/vexip-ui/issues/290)) ([26eb0df](https://github.com/vexip-ui/vexip-ui/commit/26eb0dfbd4a3b862fb4b212aa6d20f3010e74357))


### Features

* **select:** support dynamic preview current hitting option's label ([a27ba4a](https://github.com/vexip-ui/vexip-ui/commit/a27ba4a39d9209940038d3ae1b1f9217efe862f5))


### BREAKING CHANGES

* The scss and css style files no longer contains dependent 
styles for  its component. Currently the relationship of styles are included in ts 
(js) files which are use to import the styles. Change the import way of style like: 
`vexip-ui/css/button.css` -> `vexip-ui/es/css/button` and unnecessary to import 
preset style manually.



## [2.1.9](https://github.com/vexip-ui/vexip-ui/compare/v2.1.8...v2.1.9) (2023-03-23)


### Bug Fixes

* **config:** passing default null to avoid warning ([44c813b](https://github.com/vexip-ui/vexip-ui/commit/44c813b98a9aac9697573c9bfa70cee86ccf6f61))
* **form:** unexpected display using with Column when hmr ([fc9318d](https://github.com/vexip-ui/vexip-ui/commit/fc9318d835263d43f0e2cbb4d524b9a1ef90a9d1))
* **number-input:** incoorect suffix icon position ([b759fea](https://github.com/vexip-ui/vexip-ui/commit/b759feac6dce1ee5f9871109b4409923802916d3)), closes [#284](https://github.com/vexip-ui/vexip-ui/issues/284)
* **tabs:** header will shrink if content too height ([cc46454](https://github.com/vexip-ui/vexip-ui/commit/cc46454ea738f3790448d2c4ca14ce34a17dd6c9))


### Features

* **config:** support custom icons via config ([#287](https://github.com/vexip-ui/vexip-ui/issues/287)) ([d665f10](https://github.com/vexip-ui/vexip-ui/commit/d665f103c6ba76571dd146496358d0de481a1752))
* **date-picker:** support set week start for panel ([619385e](https://github.com/vexip-ui/vexip-ui/commit/619385e8aedcbab83da8c1506ba562d8d2b2ffc0)), closes [#286](https://github.com/vexip-ui/vexip-ui/issues/286)



## [2.1.8](https://github.com/vexip-ui/vexip-ui/compare/v2.1.7...v2.1.8) (2023-03-13)


### Bug Fixes

* **number-input:** expected render vaild unit of number ([e7612b3](https://github.com/vexip-ui/vexip-ui/commit/e7612b3f875c10bd772b34c645ee0ef1258ab538)), closes [#281](https://github.com/vexip-ui/vexip-ui/issues/281)
* prevent submit event of inner input elements ([66ce737](https://github.com/vexip-ui/vexip-ui/commit/66ce737cf8d9c3d9702f62094a90b6cb5c33c0a5)), closes [#275](https://github.com/vexip-ui/vexip-ui/issues/275)
* **scroll:** incorrect extra content z-index ([8bfb9f4](https://github.com/vexip-ui/vexip-ui/commit/8bfb9f4f020a78949a53c57e12b0b95986dcd334))


### Features

* **number-input:** support custom empty value type ([a07b245](https://github.com/vexip-ui/vexip-ui/commit/a07b24595ab113dbb3ae7201ec69ad15f8034d69))



## [2.1.7](https://github.com/vexip-ui/vexip-ui/compare/v2.1.6...v2.1.7) (2023-03-11)


### Bug Fixes

* **sapce:** render nothing when no items ([858a55b](https://github.com/vexip-ui/vexip-ui/commit/858a55bbb12e1d262493263a7edd3296f4cd818e))
* table tree rendering async data cannot be expanded ([#280](https://github.com/vexip-ui/vexip-ui/issues/280)) ([285539b](https://github.com/vexip-ui/vexip-ui/commit/285539b7d9ac0a6f0ba672a08f190b0a1b61140f))
* **table:** unexpect horizontal scroll appear ([84598bf](https://github.com/vexip-ui/vexip-ui/commit/84598bfe41e1318a037f7c5be2e8f7731ee0aa5f)), closes [#278](https://github.com/vexip-ui/vexip-ui/issues/278)


### Features

* **native-scroll:** support add extra content via slot ([54de8b5](https://github.com/vexip-ui/vexip-ui/commit/54de8b5ad538ae77a147a99b17b6f8a3038f95ac))
* **scroll:** support add extra content via slot ([931b4d1](https://github.com/vexip-ui/vexip-ui/commit/931b4d177e43c4d01fa942e20e3ff57bb443cd1d))
* **tree:** support post process each node when created ([7292d64](https://github.com/vexip-ui/vexip-ui/commit/7292d64629c8b4dbff7ab7ab6c360e1a67a3a60a))
* **utils:** add flatVNodes method ([35bd9e6](https://github.com/vexip-ui/vexip-ui/commit/35bd9e6c9acedd4be60df5bc2638a1ceb73139c0))


### types

* **table:** normalize all types start with `Table` ([ca375b7](https://github.com/vexip-ui/vexip-ui/commit/ca375b7ffb492b0ec18fbe2d40a225e1de6b2c2d))


### BREAKING CHANGES

* **table:** All types of Table component currently start with
`Table` prefix, e.g. `FilterOptions` -> `TableFilterOptions`



## [2.1.6](https://github.com/vexip-ui/vexip-ui/compare/v2.1.5...v2.1.6) (2023-03-08)


### Bug Fixes

* **checkbox:** improve signal background color in dark mode ([6fbbc22](https://github.com/vexip-ui/vexip-ui/commit/6fbbc22b0db0c92f3eae7e5017656df3cde031cb))
* **modal:** custom position not effective ([b144f9c](https://github.com/vexip-ui/vexip-ui/commit/b144f9cd014f782b706536ded0afa761f3cdbf5d))
* **select:** incorrect label color when delay set value in filter mode ([68169c0](https://github.com/vexip-ui/vexip-ui/commit/68169c068adbeb6bbe44c28c80a443895b10f719))
* **table:** ensure fill entire table when columns total width small than table ([b69cdb5](https://github.com/vexip-ui/vexip-ui/commit/b69cdb5c7e4bada0ad230037bbbf652cf38cccbf))
* **table:** incorrect scroll width when have not fixed width column ([e93bd1c](https://github.com/vexip-ui/vexip-ui/commit/e93bd1cc8921de452fd3c572c8bb20ca73ac4fc4)), closes [#278](https://github.com/vexip-ui/vexip-ui/issues/278)
* **upload:** infinite read not image file when using card type ([eceb63c](https://github.com/vexip-ui/vexip-ui/commit/eceb63c9d4087009dc73a7ce55d2a2b986f5612f))


### Features

* **table:** add key-config prop ([da36218](https://github.com/vexip-ui/vexip-ui/commit/da36218a7f51b0d34e218b50cc9c42042ebca979))
* **table:** support parsing tree data ([#279](https://github.com/vexip-ui/vexip-ui/issues/279)) ([763f50b](https://github.com/vexip-ui/vexip-ui/commit/763f50b49afbb58ae89aef21ff79848def8911d1))
* **tree:** support create link line for nodes ([ea3110a](https://github.com/vexip-ui/vexip-ui/commit/ea3110a44bcda2b8cce4b09f55ee3fb96daa9ad2))
* **tree:** support more fine grained disabled options ([82d4877](https://github.com/vexip-ui/vexip-ui/commit/82d487755c8018e906694170fd069fd66b01e819))



## [2.1.5](https://github.com/vexip-ui/vexip-ui/compare/v2.1.4...v2.1.5) (2023-02-28)


### Bug Fixes

* **form:** dynamic remove array type fields fail ([5c810fe](https://github.com/vexip-ui/vexip-ui/commit/5c810fea5d19fb8e2238edc24709468aaaf6f3ab)), closes [#274](https://github.com/vexip-ui/vexip-ui/issues/274)
* **select:** ensure label clear when using filter in signle select ([35e11c2](https://github.com/vexip-ui/vexip-ui/commit/35e11c2248035909f2ffc43c4559f25f83ec0d07)), closes [#277](https://github.com/vexip-ui/vexip-ui/issues/277)
* **table:** improve table horizontal scroll ([b99aaa1](https://github.com/vexip-ui/vexip-ui/commit/b99aaa143a25c58869197bd2b5843301aae33547)), closes [#273](https://github.com/vexip-ui/vexip-ui/issues/273)



## [2.1.4](https://github.com/vexip-ui/vexip-ui/compare/v2.1.3...v2.1.4) (2023-02-25)


### Bug Fixes

* **date-picker:** cannot focus end input when in range mode ([5ea7b59](https://github.com/vexip-ui/vexip-ui/commit/5ea7b59bc23043ebc5e06f0407feb6a1b160e996))
* **date-picker:** ensure clearable prop wroks when no passing value ([68854b8](https://github.com/vexip-ui/vexip-ui/commit/68854b8f2505cbbf992b5ef535292382d51ed048)), closes [#258](https://github.com/vexip-ui/vexip-ui/issues/258)
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **input:** make sync effective when under FormItem ([207ef20](https://github.com/vexip-ui/vexip-ui/commit/207ef20b4b624d8e4717f151b410de1e7e03009e)), closes [#267](https://github.com/vexip-ui/vexip-ui/issues/267)
* **layout:** improve user dropdown position ([b91291b](https://github.com/vexip-ui/vexip-ui/commit/b91291b73208ca6414f8cead5410fa1c03404ecf))
* **radio:** should not be selected when in loading and loading-lock ([#260](https://github.com/vexip-ui/vexip-ui/issues/260)) ([3d79c9f](https://github.com/vexip-ui/vexip-ui/commit/3d79c9f256c09bb44c5e69489ac1e90926e921d5))
* **select:** internal filter should filter by label ([bf39188](https://github.com/vexip-ui/vexip-ui/commit/bf391884d7a086ddd6915663c998bb8cd568c398)), closes [#265](https://github.com/vexip-ui/vexip-ui/issues/265)
* **select:** normalize space and enter key behavior ([75ee99b](https://github.com/vexip-ui/vexip-ui/commit/75ee99beb13b26309027dd8b6cb5efdd4d7dbccb))
* **select:** unexpect emit focus event when blur ([3e0afca](https://github.com/vexip-ui/vexip-ui/commit/3e0afca821060305891f257e1324412824bb57a3)), closes [#264](https://github.com/vexip-ui/vexip-ui/issues/264)
* **table:** cannot refresh row states by data directly ([b9bb46d](https://github.com/vexip-ui/vexip-ui/commit/b9bb46d40fe1ce1ad4a23e790f70bcf178353297))
* **table:** improve column sorter and filter able default true ([688dba4](https://github.com/vexip-ui/vexip-ui/commit/688dba40524ec5d56b10aa669329a7973ba45bfd))


### Features

* **calendar:** support two way binding for year and month ([f7469e9](https://github.com/vexip-ui/vexip-ui/commit/f7469e9d4bcc4ed91e9e1a157083a4bbab3a0485)), closes [#259](https://github.com/vexip-ui/vexip-ui/issues/259)
* **native-scroll:** add ensureInView api method ([cb860d4](https://github.com/vexip-ui/vexip-ui/commit/cb860d496ce9401b0f6c98af469c8bd57cec560c))
* **select:** emit filter-input event ([12bcfb3](https://github.com/vexip-ui/vexip-ui/commit/12bcfb36a9b0746ca5e8e145b0dcf9973ca6a977)), closes [#271](https://github.com/vexip-ui/vexip-ui/issues/271)
* **spin:** add icon-effect prop ([0d9470f](https://github.com/vexip-ui/vexip-ui/commit/0d9470fe92469e2ce9802856dcfd3f37461a1d13))
* **table:** support custom sorter and filter ([bb0f4af](https://github.com/vexip-ui/vexip-ui/commit/bb0f4afda1b43d4f4bfdac526bf6721b0410c08e)), closes [#269](https://github.com/vexip-ui/vexip-ui/issues/269)



## [2.1.3](https://github.com/vexip-ui/vexip-ui/compare/v2.1.2...v2.1.3) (2023-02-08)


### Bug Fixes

* **menu:** incorrect group indent css var ([45ebf73](https://github.com/vexip-ui/vexip-ui/commit/45ebf7380ce08e386c825fd26ffbe4d0d8d3cd8d))



## [2.1.2](https://github.com/vexip-ui/vexip-ui/compare/v2.1.1...v2.1.2) (2023-02-08)


### Bug Fixes

* **calendar:** reactive for week-start prop changed ([bf8c9a5](https://github.com/vexip-ui/vexip-ui/commit/bf8c9a5d3d6249739e83ce89e5a7deec5d54d175)), closes [#255](https://github.com/vexip-ui/vexip-ui/issues/255)
* **layout:** normalize layout main z-index ([e4d1e1a](https://github.com/vexip-ui/vexip-ui/commit/e4d1e1a032f7c82677023d6e2c572cb2a091d22b)), closes [#253](https://github.com/vexip-ui/vexip-ui/issues/253)
* **locale:** corrent inject locale word space config ([aee45aa](https://github.com/vexip-ui/vexip-ui/commit/aee45aae8b93a54ac5f14bd6476584b52e12f045))
* **menu:** correct selected style in horizontal mode ([1e56461](https://github.com/vexip-ui/vexip-ui/commit/1e56461e305af966ecd4cdb31c6136b85f90d6bf))
* **plugins:** correct css file path for dark mode ([#254](https://github.com/vexip-ui/vexip-ui/issues/254)) ([f3aa29b](https://github.com/vexip-ui/vexip-ui/commit/f3aa29b6467fd846c017850e81f588928ac8de8e))
* **select:** correct cursor style ([9e0d6a4](https://github.com/vexip-ui/vexip-ui/commit/9e0d6a4d2fca5f8aaed6a4590e53324a19308dad))


### Features

* **date-picker:** support set input unit controls readonly ([c55ea0d](https://github.com/vexip-ui/vexip-ui/commit/c55ea0dd83e4ac1ae37ef2663099399c8b3de6d7))
* **menu:** support custom menu item indentation ([f385042](https://github.com/vexip-ui/vexip-ui/commit/f38504209696c4591e396e70f5786ab5d7d1785f)), closes [#252](https://github.com/vexip-ui/vexip-ui/issues/252)
* **time-picker:** support set input unit controls readonly ([6eaaac0](https://github.com/vexip-ui/vexip-ui/commit/6eaaac073a8907d0595208e0f1d340394c2925d1))



## [2.1.1](https://github.com/vexip-ui/vexip-ui/compare/v2.1.0...v2.1.1) (2023-02-07)


### Bug Fixes

* **menu:** active menu not follow router when init ([75772ed](https://github.com/vexip-ui/vexip-ui/commit/75772ed1a2db804a729429629c9bf4bb03ca733b)), closes [#246](https://github.com/vexip-ui/vexip-ui/issues/246)
* **menu:** improve group visible item style ([48c7166](https://github.com/vexip-ui/vexip-ui/commit/48c716602ab08ef83d889088c48ada26f35407a4)), closes [#248](https://github.com/vexip-ui/vexip-ui/issues/248)
* **time-picker:** full controllable control value via value prop ([90ca68c](https://github.com/vexip-ui/vexip-ui/commit/90ca68c4b5615c6bae6ddbe59d63ee15bb18d19c))


### Features

* **layout:** support manually control dark mode ([04c199e](https://github.com/vexip-ui/vexip-ui/commit/04c199e91904546906502755786aba9e2e95855f)), closes [#245](https://github.com/vexip-ui/vexip-ui/issues/245)
* **time-picker:** add placholder prop ([b5ca190](https://github.com/vexip-ui/vexip-ui/commit/b5ca1909bc409039d5cd79c9e08427e6408ce4bc))



# [2.1.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.20...v2.1.0) (2023-01-30)


### Bug Fixes

* **confirm:** fallback to create app when without mounted app ([064cc52](https://github.com/vexip-ui/vexip-ui/commit/064cc525d3aa0158b856655fed8119d9fb31ca7e))
* **contextmenu:** should have default z-index ([debaa3d](https://github.com/vexip-ui/vexip-ui/commit/debaa3d7107b38355207759dc8840a0ca5169c6e))
* **form:** icon and loading slots for submit and reset not effective ([260001c](https://github.com/vexip-ui/vexip-ui/commit/260001cb7d32402e835a1b1a5c2336816af9de90))
* **form:** submit loading cannot follow form loading ([6bfcc69](https://github.com/vexip-ui/vexip-ui/commit/6bfcc6950f7f294ca932e7e959d0b636022988c5))
* **input:** plain-password button cannot click when clearable ([ac33af5](https://github.com/vexip-ui/vexip-ui/commit/ac33af5d5dad5e9252acb8878cfdbc5dfdf24462)), closes [#229](https://github.com/vexip-ui/vexip-ui/issues/229)
* **layout:** media query not correct when set to xs ([53c0150](https://github.com/vexip-ui/vexip-ui/commit/53c0150ccaa4982b2cc53b7919480604e787c8ed))
* **menu:** menu item icon slot not effective ([9c20725](https://github.com/vexip-ui/vexip-ui/commit/9c2072517a1cffa4beb6e311b9a295e5ad5c063a))
* **select:** cannot reset selected when passing empty value ([c46805a](https://github.com/vexip-ui/vexip-ui/commit/c46805a4fbba76d4b0de9c2bb9d54e4df00016b7))
* **toast:** fallback to create app when without mounted app ([c6330a9](https://github.com/vexip-ui/vexip-ui/commit/c6330a90593d12af8311b09b27b6aeae6b5226cb))
* **utils:** using pointerdown event for touch action ([e03462f](https://github.com/vexip-ui/vexip-ui/commit/e03462fa2eabbfc247cfc206a6a26fc4d33169ab))


### Features

* **full-screen:** add FullScreen component ([#212](https://github.com/vexip-ui/vexip-ui/issues/212)) ([46ebb3e](https://github.com/vexip-ui/vexip-ui/commit/46ebb3edc69eacfa8147bb2a26b27162cc1473a8))
* **icons:** upgrade to font-awesome@6.2.1 ([a9e5950](https://github.com/vexip-ui/vexip-ui/commit/a9e59501d0a145c28814f96f9fbfb717130105b1))
* **Image:** add Image component ([#225](https://github.com/vexip-ui/vexip-ui/issues/225)) ([e26a75e](https://github.com/vexip-ui/vexip-ui/commit/e26a75eb4c714ae6e49193724b4f20f2bb7a5d38))
* **input:** add plain password button slot ([e74cee3](https://github.com/vexip-ui/vexip-ui/commit/e74cee38f19a27c85b1fc3c5cf360946ea499a80))
* **layout:** emitted toggle-theme event ([e89f6c2](https://github.com/vexip-ui/vexip-ui/commit/e89f6c2d10d747b175f48e0087520cb97bfb0446)), closes [#242](https://github.com/vexip-ui/vexip-ui/issues/242)
* **native-scroll:** add scroll-attrs prop ([68c4490](https://github.com/vexip-ui/vexip-ui/commit/68c4490c83839a067ad3b3868052c245dceda2b9))
* **Result:** add Result component ([#238](https://github.com/vexip-ui/vexip-ui/issues/238)) ([0812183](https://github.com/vexip-ui/vexip-ui/commit/0812183fc0d4b5f716b9b03498aa0891b9cd6353))
* **scroll:** add scroll-attrs prop ([d10d24e](https://github.com/vexip-ui/vexip-ui/commit/d10d24e55707328c09c39820eacf7a802fa3f132))
* **scroll:** add scroll-style prop ([3a3d1b3](https://github.com/vexip-ui/vexip-ui/commit/3a3d1b32dea5377d1de705d82e58e18f6942bcfd))
* **scroll:** support custom scroll wrapper tag (include NativeScroll) ([1182e21](https://github.com/vexip-ui/vexip-ui/commit/1182e218cb2dae13518f2c283ec981fb20db42f9))
* **select:** add max-tag-count, no-rest-tip and tag-type props ([#224](https://github.com/vexip-ui/vexip-ui/issues/224)) ([bdc7517](https://github.com/vexip-ui/vexip-ui/commit/bdc751789ebee18353900bcab1436d7d352739b0))
* support specify locale config via `locale` prop ([#239](https://github.com/vexip-ui/vexip-ui/issues/239)) ([e483dea](https://github.com/vexip-ui/vexip-ui/commit/e483deab8f58b0859ea310020973f990d83a720a))
* **tab-nav:** support scroll when items size large than wrapper ([#234](https://github.com/vexip-ui/vexip-ui/issues/234)) ([066a985](https://github.com/vexip-ui/vexip-ui/commit/066a985d9bc976bf06a01fcc69c7e0411b0af86b))
* **tag:** support add extra content ([#222](https://github.com/vexip-ui/vexip-ui/issues/222)) ([9fb911c](https://github.com/vexip-ui/vexip-ui/commit/9fb911cdc5624b8f9f83e6ba95b3c2567f44e871))



## [2.0.20](https://github.com/vexip-ui/vexip-ui/compare/v2.0.19...v2.0.20) (2023-01-10)


### Bug Fixes

* **date-picker:** reset activated when set value to falsy ([ea2e74e](https://github.com/vexip-ui/vexip-ui/commit/ea2e74ebc222f193be59efb5a95b58a4dc73de72))
* **locale:** per page typo ([bf85f8b](https://github.com/vexip-ui/vexip-ui/commit/bf85f8b6f9560bf055e32844f7d2c59cbd363811))
* **modal:** close button cannot be clicked in touch mode ([d0a24a4](https://github.com/vexip-ui/vexip-ui/commit/d0a24a4693dc0e3cd9a615f168c4cd3998bca7f1))
* **switch:** misalignment of signal occurs during transition ([1bd5da5](https://github.com/vexip-ui/vexip-ui/commit/1bd5da56346844a9091c89020ffee78cf107c9c6))
* **table:** column fixed effect displayed when scroll not enable ([6d75dcf](https://github.com/vexip-ui/vexip-ui/commit/6d75dcf160c268d6bac339f3c1208518ac850798))
* **upload:** count-limit not effective in image mode ([f356f11](https://github.com/vexip-ui/vexip-ui/commit/f356f11919e1bb86a7bd2e066b398cdf728f0d50))


### Features

* **date-picker:** add outside-close and outside-cancel props ([5a62a8a](https://github.com/vexip-ui/vexip-ui/commit/5a62a8a554c3518dcd66eaca99a50a791eb81a5d))



## [2.0.19](https://github.com/vexip-ui/vexip-ui/compare/v2.0.18...v2.0.19) (2022-12-19)


### Bug Fixes

* **cascader:** ensure effective max-tag-count ([4d1e6c4](https://github.com/vexip-ui/vexip-ui/commit/4d1e6c4ddc542a676c7b64f71b6f0a617f981b22))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **overflow:** counter not hidden when max count equals to items count ([f4c3540](https://github.com/vexip-ui/vexip-ui/commit/f4c3540f38a9a593454570f6c9533756c5785e0d))
* **select:** cannot re-select option in multiple mode ([c124596](https://github.com/vexip-ui/vexip-ui/commit/c1245964e39240ffd4611feafc71dd839ed08e31))
* **skeleton:** attrs cannot be set ([69ee0d1](https://github.com/vexip-ui/vexip-ui/commit/69ee0d1382e4def9e0b485391d95c0b061b723ff))
* **table:** height not correct when filter with row height set ([ca84f12](https://github.com/vexip-ui/vexip-ui/commit/ca84f12d489114691897182b16ec4f5658ec6c87))
* **virtual-list:** items element height not refresh ([d3c0944](https://github.com/vexip-ui/vexip-ui/commit/d3c0944c0b7b03fce26db2c78f7ad25a44a78957))


### Features

* **overflow:** add max-count prop ([f982420](https://github.com/vexip-ui/vexip-ui/commit/f9824208a7a670d413b57b10c37745929c4529f4))
* **overflow:** support add suffix content via slot ([6754072](https://github.com/vexip-ui/vexip-ui/commit/6754072803653c7b2654931425a44426d93022e3))
* **playground:** support format codes via prettier ([5ff663c](https://github.com/vexip-ui/vexip-ui/commit/5ff663cda3963534fec687c06ed28a12803d4e0e))
* **playground:** support select cdn address ([8d70fd6](https://github.com/vexip-ui/vexip-ui/commit/8d70fd686bafc8468a03320fc9e46ead549b5e7a))



## [2.0.18](https://github.com/vexip-ui/vexip-ui/compare/v2.0.17...v2.0.18) (2022-12-09)


### Bug Fixes

* **input:** null value will be transformed to string null ([33f10e6](https://github.com/vexip-ui/vexip-ui/commit/33f10e6118bec2092aa2279ab86234bdd07ddee2))
* **style:** color should not auto inherit ([e896107](https://github.com/vexip-ui/vexip-ui/commit/e8961077f188cb59c6e93cc302af850bf0001b09))


### Features

* **timeline:** support flip item content ([c605012](https://github.com/vexip-ui/vexip-ui/commit/c6050128a234e2317777223c8ca57a6200afba39))
* **timeline:** support horizontal line ([210a3a5](https://github.com/vexip-ui/vexip-ui/commit/210a3a546d1d4f32524d1835f99cd2222c13a54b)), closes [#195](https://github.com/vexip-ui/vexip-ui/issues/195)



## [2.0.17](https://github.com/vexip-ui/vexip-ui/compare/v2.0.16...v2.0.17) (2022-12-07)


### Bug Fixes

* **input:** ensure focus when click input area ([a0b7ff8](https://github.com/vexip-ui/vexip-ui/commit/a0b7ff86afad948e27eb4892a46f2fa9db342308))
* **playground:** compiler version should follow vue version ([51715cd](https://github.com/vexip-ui/vexip-ui/commit/51715cd64816df81aa8da9fb88b814293dab3c6b))
* **select:** space down should not enter the input ([670a68e](https://github.com/vexip-ui/vexip-ui/commit/670a68e1b4d60d3bdd4d20f3fd5380f84150daa4))
* **table:** should assign row data when set new data ([2518203](https://github.com/vexip-ui/vexip-ui/commit/2518203c45bd9c91b29a562d7857574bdd87270f))


### Features

* **input:** support number type value ([a145079](https://github.com/vexip-ui/vexip-ui/commit/a145079863786edc94ecc3657273c48dded14729))
* **number:** add control-type prop ([1a588ac](https://github.com/vexip-ui/vexip-ui/commit/1a588ac2ed3bdcf5ad5474c39cad831019c53485))



## [2.0.16](https://github.com/vexip-ui/vexip-ui/compare/v2.0.15...v2.0.16) (2022-12-01)


### Bug Fixes

* **column:** cannot show when set span 0 with other brank points ([b73cc5a](https://github.com/vexip-ui/vexip-ui/commit/b73cc5adbaefdf4060eed6fb263b6f36ea03afa6))
* **Grid:** provided state should not penetrate deep ([0a6b1fe](https://github.com/vexip-ui/vexip-ui/commit/0a6b1fe098f6be15c9924f4d91ccd00159ac75fc)), closes [#219](https://github.com/vexip-ui/vexip-ui/issues/219)
* **select:** unsync input value when using filter with default value ([fd5e6a0](https://github.com/vexip-ui/vexip-ui/commit/fd5e6a07a3ed91f465aedbab3b8d10fb15d9965c))
* **upload:** file list not sync when using select-to-add ([50784d8](https://github.com/vexip-ui/vexip-ui/commit/50784d850f6e7e5affebc66fa54ca787e0da47b9))


### Features

* export currentBreakPoint ref ([570b6f7](https://github.com/vexip-ui/vexip-ui/commit/570b6f769320c77f670a994334b08303df17b951))
* **playground:** support change version and toggle ssr ([#221](https://github.com/vexip-ui/vexip-ui/issues/221)) ([065dcf3](https://github.com/vexip-ui/vexip-ui/commit/065dcf33fd4a6b2aac862687b5f5e650337025b7))
* **scroll:** support horizontal exact mode ([a712cf9](https://github.com/vexip-ui/vexip-ui/commit/a712cf916c3e195e161d27f43df61b64404e06f7))
* support components to inherit parent base style ([#220](https://github.com/vexip-ui/vexip-ui/issues/220)) ([ca26d3b](https://github.com/vexip-ui/vexip-ui/commit/ca26d3b12499a0313d5c325befc2baadba3280ee))



## [2.0.15](https://github.com/vexip-ui/vexip-ui/compare/v2.0.14...v2.0.15) (2022-11-24)


### Bug Fixes

* **table:** should use wrapper width to compute when width not set ([d628403](https://github.com/vexip-ui/vexip-ui/commit/d6284032aa91bc4a1e89ba0c9075516167aad0db))
* **upload:** error when passing null to file-list ([b6f5df4](https://github.com/vexip-ui/vexip-ui/commit/b6f5df44a707bd2c239ef3c26fd2c2835869fb13))


### Features

* **confirm:** add fast open method for using title ([8f47f7e](https://github.com/vexip-ui/vexip-ui/commit/8f47f7e522ab2d32bef91955b476865e24ce7aa8))
* **confirm:** support add title and set content or actions align ([cb2b767](https://github.com/vexip-ui/vexip-ui/commit/cb2b7675efb5d2d5c05dc689d05e8c99866816c1))
* **upload:** add list-style prop ([94089e7](https://github.com/vexip-ui/vexip-ui/commit/94089e72a9cd823ca7699cd15916908a770b2824))



## [2.0.14](https://github.com/vexip-ui/vexip-ui/compare/v2.0.13...v2.0.14) (2022-11-21)


### Bug Fixes

* **input:** correct size for before and after content ([54c8bf8](https://github.com/vexip-ui/vexip-ui/commit/54c8bf8e8f00ca6930811b29995aa286503e1a70))


### Features

* **confirm:** support parse content as html ([6053b7b](https://github.com/vexip-ui/vexip-ui/commit/6053b7b2b39ac92419f1c4160167e48a31165c04))
* **date-picker:** add exchange slot for range select ([1166e70](https://github.com/vexip-ui/vexip-ui/commit/1166e70fa70d166a9dfd514391f9cf9e092e1108))
* **date-picker:** support min and max props to bound date ([#216](https://github.com/vexip-ui/vexip-ui/issues/216)) ([9cfd677](https://github.com/vexip-ui/vexip-ui/commit/9cfd6772ce6da6b5e20a11eff7c29b88c29ffb5a))
* **message:** support parse content as html ([7bd4def](https://github.com/vexip-ui/vexip-ui/commit/7bd4def4b144975f92a3e4a1574a3ed024392f65))
* **notice:** support parse title and content as html ([18929a9](https://github.com/vexip-ui/vexip-ui/commit/18929a966e355ad290cf949bc3fa1d1838b07216))
* **time-picker:** add exchange slot for range select ([2431a64](https://github.com/vexip-ui/vexip-ui/commit/2431a64a3d06cef53ecf397639e315333146e89d))
* **time-picker:** support min and max props to bound time ([87dfc32](https://github.com/vexip-ui/vexip-ui/commit/87dfc32c920b980f9f55db5d819bcaae32a6e37f)), closes [#215](https://github.com/vexip-ui/vexip-ui/issues/215)
* **toast:** support parse content as html ([2609809](https://github.com/vexip-ui/vexip-ui/commit/26098090751e97d02c24ac6ead1c298d4c3306ef))



## [2.0.13](https://github.com/vexip-ui/vexip-ui/compare/v2.0.12...v2.0.13) (2022-11-09)


### Bug Fixes

* **drawer:** size abruptly change on resize when using percentage size ([4f81bd0](https://github.com/vexip-ui/vexip-ui/commit/4f81bd08ccb2ca62a31d928cabaf0fa0dacb3d86))
* improve input like components state style ([456f6bf](https://github.com/vexip-ui/vexip-ui/commit/456f6bf3bde9c6147b962a6c5c8f06fb76bb6d89))
* **select:** label not render when value is falsy ([5cbc2bf](https://github.com/vexip-ui/vexip-ui/commit/5cbc2bf00d576069b724888441a39a862cff4bb4)), closes [#207](https://github.com/vexip-ui/vexip-ui/issues/207)


### Features

* **tab-nav:** add placement prop ([8148eb0](https://github.com/vexip-ui/vexip-ui/commit/8148eb04cfc3ad3276852cdb5ac3ecf53d95949e)), closes [#176](https://github.com/vexip-ui/vexip-ui/issues/176)
* **tab-nav:** support built-in close button ([7ef0787](https://github.com/vexip-ui/vexip-ui/commit/7ef0787a8e72a73fc4f7c6b167b1f226b3ec2a4c)), closes [#201](https://github.com/vexip-ui/vexip-ui/issues/201)
* **tab-nav:** support create built-in add button ([f45d47c](https://github.com/vexip-ui/vexip-ui/commit/f45d47cf79e4d6c617a9db43e0254f9e0e1573ae)), closes [#208](https://github.com/vexip-ui/vexip-ui/issues/208)
* **tabs:** add closable and show-add props ([908abaa](https://github.com/vexip-ui/vexip-ui/commit/908abaa4f6a92e0eb5a14505b5e276d35519a8fe))
* **tabs:** add placement prop ([9d35443](https://github.com/vexip-ui/vexip-ui/commit/9d35443d61d20eeef82f11b1fa5fab9c5ababb7d))



## [2.0.12](https://github.com/vexip-ui/vexip-ui/compare/v2.0.11...v2.0.12) (2022-11-02)


### Bug Fixes

* **input:** value not clear when in sync mode ([81af6c6](https://github.com/vexip-ui/vexip-ui/commit/81af6c6a6e280282fa3386744bfbb96763e28207))
* **menu:** cache and reset group expanded when menu reduced change ([eca0dbb](https://github.com/vexip-ui/vexip-ui/commit/eca0dbb38660fba71968b1ed70ac7551b3d55be2))
* **menu:** item selected not update when label change ([6c97c83](https://github.com/vexip-ui/vexip-ui/commit/6c97c835945aae7306275763796391c9ff35db8c))
* **number-input:** value not clear when in sync mode ([608f2b5](https://github.com/vexip-ui/vexip-ui/commit/608f2b5527bd2b5fde6d88e20737db1eeb8e0eee))
* **overflow:** should refresh when wrapper resize ([5102c40](https://github.com/vexip-ui/vexip-ui/commit/5102c40d3fea565eca0a91277333e3439b5bd0d1))
* **tabs:** panel height should follow content ([e9a25ea](https://github.com/vexip-ui/vexip-ui/commit/e9a25eac42a16e1aec52610c22f20ffd00979592)), closes [#191](https://github.com/vexip-ui/vexip-ui/issues/191)


### Features

* **input:** add count slot ([0a27106](https://github.com/vexip-ui/vexip-ui/commit/0a271066a3603416ff179ed0495af86de1e0a193))
* **table:** aad checked class for rows ([0e02ac8](https://github.com/vexip-ui/vexip-ui/commit/0e02ac8ee38b7be61968dee7456675e881435886))
* **textarea:** add count slot ([70387be](https://github.com/vexip-ui/vexip-ui/commit/70387beb61d136ae9466c1ce1780ebe4d081a524))



## [2.0.11](https://github.com/vexip-ui/vexip-ui/compare/v2.0.10...v2.0.11) (2022-10-28)


### Bug Fixes

* **number-input:** should emit change event when enter ([83d7054](https://github.com/vexip-ui/vexip-ui/commit/83d7054606d277031de729efd7114b5743ec38df))
* **pagination:** explicitly plugins props values ([be46519](https://github.com/vexip-ui/vexip-ui/commit/be4651995e132a6cd3937bdc5a0ba098e29f4f5a))
* **pagination:** incorrect focus when change page with ellipsis show ([8ee696e](https://github.com/vexip-ui/vexip-ui/commit/8ee696e1abb09cb3e87467ec76f02023ed6d0189))
* **upload:** improve card type list style ([9119dbf](https://github.com/vexip-ui/vexip-ui/commit/9119dbf95f1e42cb1efa27d65f562d8c80bde56d))
* **upload:** incorrct control disabled style in image mode ([489f710](https://github.com/vexip-ui/vexip-ui/commit/489f710c33a76ca669696911c1e841ad586d5dc5))
* **wheel:** improve border style when disabled ([7d305bb](https://github.com/vexip-ui/vexip-ui/commit/7d305bbab63f4e407d99c6f117a1635d5d11ca56))


### Features

* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **layout:** add theme mode config ([394fa8c](https://github.com/vexip-ui/vexip-ui/commit/394fa8c720ef40ee993ac449af2f8ba6a4f0c0ee))
* **pagination:** add no-title prop ([c57fb2c](https://github.com/vexip-ui/vexip-ui/commit/c57fb2c427f1b950d6a2956d36e791944e0e906f))
* **tab-nav:** support specify tab items alignment ([19bf1b5](https://github.com/vexip-ui/vexip-ui/commit/19bf1b54fc1831007d63d74ec3ce6155502c86e4)), closes [#190](https://github.com/vexip-ui/vexip-ui/issues/190)



## [2.0.10](https://github.com/vexip-ui/vexip-ui/compare/v2.0.9...v2.0.10) (2022-10-25)


### Bug Fixes

* **pagination:** out of bounds when pages more then 4 digits ([638b2fd](https://github.com/vexip-ui/vexip-ui/commit/638b2fd124e3f1a0c67918f85fd2d5a99c9e7577))
* **split:** improve full button angles color ([9c92f74](https://github.com/vexip-ui/vexip-ui/commit/9c92f74f9793d2d0be618b51156a3d63011666a3))
* **tab-nav:** active not update when dynamic with using index as key ([aacc76a](https://github.com/vexip-ui/vexip-ui/commit/aacc76a250388dd096050e4f6d3d37de80305649))
* **table:** missing body bottom border style ([8aaf0a3](https://github.com/vexip-ui/vexip-ui/commit/8aaf0a3056769d0ba1a277338dd9c3eed1a227b5))
* **upload:** should show thumbnial when only non-base64 url ([18c26de](https://github.com/vexip-ui/vexip-ui/commit/18c26def771898cc4ca49cd4f8ae9a4ff71a1e26))


### Features

* **menu:** support passing a function as icon options ([257a150](https://github.com/vexip-ui/vexip-ui/commit/257a150b88fa3dd59e608892550bce4a3fdaeb42))
* **textarea:** add sync prop ([be5a73a](https://github.com/vexip-ui/vexip-ui/commit/be5a73aa8e10738db54a693248874fc2ff0f4c8e))



## [2.0.9](https://github.com/vexip-ui/vexip-ui/compare/v2.0.8...v2.0.9) (2022-10-24)


### Bug Fixes

* **alert:** incomplete content when using scroll with prefix icon ([f03da86](https://github.com/vexip-ui/vexip-ui/commit/f03da86dfa649dc96762bb149973c72ea0fc1e1c))
* **upload:** unexpectedly refresh router when delete file with thumbnail type ([15ea453](https://github.com/vexip-ui/vexip-ui/commit/15ea45368b27ce7cb1f341296e01434a519e3620))


### Features

* **breadcrumb:** support passing a function as name in options ([a60c663](https://github.com/vexip-ui/vexip-ui/commit/a60c663d82c6104126ea2b3eaf39b93548a1253f))
* **menu:** support passing a function as name in options ([ef240b7](https://github.com/vexip-ui/vexip-ui/commit/ef240b7b1120d5d4fc0236434567b0742658e0e2))
* **utils:** add ensureArray and callIfFunc methods ([2b4e986](https://github.com/vexip-ui/vexip-ui/commit/2b4e986bcce50a620c9dd2d71a96f025123d70fb))


### Performance Improvements

* **menu:** adjust to dynamic render poppers ([3805628](https://github.com/vexip-ui/vexip-ui/commit/380562862296566b7ecab4e5eec316b6ca46ba33))



## [2.0.8](https://github.com/vexip-ui/vexip-ui/compare/v2.0.7...v2.0.8) (2022-10-23)


### Bug Fixes

* **alert:** content display direction should be column ([1d208c5](https://github.com/vexip-ui/vexip-ui/commit/1d208c5c2044dfdc2b75afc9c9c52e3d3db83f6f))
* **cascader:** counter fails to disappear when passing empty array ([2589335](https://github.com/vexip-ui/vexip-ui/commit/258933545f220ad7d008b0dbcb0c58d9f76b7774)), closes [#181](https://github.com/vexip-ui/vexip-ui/issues/181)
* incorrect form control components init value ([24909c0](https://github.com/vexip-ui/vexip-ui/commit/24909c0c5f34fb30642340078b9c15a4de83e0c0))
* **input:** should hide native toggle plaintext button in Edge ([6bc0554](https://github.com/vexip-ui/vexip-ui/commit/6bc05540f3a5b3dc1cae30657309f975c5faa549)), closes [#178](https://github.com/vexip-ui/vexip-ui/issues/178)
* **overflow:** unexpectedly render slot when items passed empty array ([f3af8e2](https://github.com/vexip-ui/vexip-ui/commit/f3af8e23269800788ad368793641596f288be031))
* **pagination:** sync height of plugin controls to item height ([2de1fc9](https://github.com/vexip-ui/vexip-ui/commit/2de1fc9d707f40111859f9dc77602ed6344b02d9))
* **tab-nav:** not nested divider css vars ([77765dc](https://github.com/vexip-ui/vexip-ui/commit/77765dc5f55d3ed7fba54f99e04ec152101385dd))
* **table:** clearFilter method fails to reset options active ([865a69f](https://github.com/vexip-ui/vexip-ui/commit/865a69f9b91b67188ec2663478443fdc6b8782c7)), closes [#183](https://github.com/vexip-ui/vexip-ui/issues/183)
* **table:** maker double-click events work ([#186](https://github.com/vexip-ui/vexip-ui/issues/186)) ([137db89](https://github.com/vexip-ui/vexip-ui/commit/137db8910239ac6062884ebf4b2657754334bb43))
* **table:** rows in table head should not highlight ([ef091dc](https://github.com/vexip-ui/vexip-ui/commit/ef091dc17fdee17119bb7b1211bb4cf8a9bc11cd))
* **upload:** image thumbnail not effective ([b71b5dc](https://github.com/vexip-ui/vexip-ui/commit/b71b5dc231949542a3a0ad54ff9161675dfde786))


### Features

* **pagination:** support customize plugins position ([48cd1fd](https://github.com/vexip-ui/vexip-ui/commit/48cd1fd11ff553fd66719a3fdd597bf914159242))
* **pagination:** support page-size two way binding ([16f1750](https://github.com/vexip-ui/vexip-ui/commit/16f17508afa9d09cf6265c36a4aa0225394ff407))
* **table:** improve type columns will have default key if not define ([1cdcc6f](https://github.com/vexip-ui/vexip-ui/commit/1cdcc6f3cffca840f3a9bdf9573490bbfe09ce28))
* **upload:** add image upload mode ([#180](https://github.com/vexip-ui/vexip-ui/issues/180)) ([d1e3201](https://github.com/vexip-ui/vexip-ui/commit/d1e3201d1b62e9feba9cf41249bed637c7da1f42))


### Performance Improvements

* **table:** improve to precisely deep watch column props ([f74c4df](https://github.com/vexip-ui/vexip-ui/commit/f74c4dfc98ac85d2a959a030741eff9dd427e1fd))



## [2.0.7](https://github.com/vexip-ui/vexip-ui/compare/v2.0.6...v2.0.7) (2022-10-17)


### Bug Fixes

* **config:** ensure responsive variables namespace ([4b334c9](https://github.com/vexip-ui/vexip-ui/commit/4b334c9a0602524f65d9921e6c4f837dcdd5a766))
* **space:** items should default flex display ([2b34b10](https://github.com/vexip-ui/vexip-ui/commit/2b34b107eae5a815f19b278e7149e7b402f87883))
* **tab-nav:** list should default no margin ([4dad8da](https://github.com/vexip-ui/vexip-ui/commit/4dad8da121c0719381884fb32a14539f20ec469c))


### Features

* **layout:** add header-avatar slot ([7574693](https://github.com/vexip-ui/vexip-ui/commit/7574693663e8f53c1451165404fff53216d7f957))
* **tab-nav:** add options prop ([d9f868f](https://github.com/vexip-ui/vexip-ui/commit/d9f868fb0f67d67d6bd3e533230a18ecc5d4f558))
* **tab-nav:** add prefix and suffix slots ([f6034cd](https://github.com/vexip-ui/vexip-ui/commit/f6034cd3c263ff29480042b183326d70f5c5fb3a))
* **tabs:** add prefix and suffix slots ([db8a5ab](https://github.com/vexip-ui/vexip-ui/commit/db8a5ab2e8637f663c7921238c32e49c1bd34d04))
* **utils:** add randomColor method ([adc3878](https://github.com/vexip-ui/vexip-ui/commit/adc387828749bd4426f5ffc14123a75e2d874111))
* **utils:** add series log once methods ([c4fc460](https://github.com/vexip-ui/vexip-ui/commit/c4fc4608ebd72fa516700f032cca22d3df67d673))



## [2.0.6](https://github.com/vexip-ui/vexip-ui/compare/v2.0.4...v2.0.6) (2022-10-13)


### Bug Fixes

* **bubble:** keep consistent behavior for newline ([7bb25a2](https://github.com/vexip-ui/vexip-ui/commit/7bb25a24109d14a0468ac94deed1f144b5211966)), closes [#164](https://github.com/vexip-ui/vexip-ui/issues/164)
* **button:** missing button badge color css var ([bdb22c7](https://github.com/vexip-ui/vexip-ui/commit/bdb22c72b99fd97674ff42afada9cd12ce5f0e68))
* **divider:** missing text-color css var ([509f932](https://github.com/vexip-ui/vexip-ui/commit/509f932c34872108ded8ba638eed5626f774a4c1))
* **form:** add submit and reset style deps ([a8ac3ec](https://github.com/vexip-ui/vexip-ui/commit/a8ac3ec6787f006a22ac269d0f30ba2ce2c3e17c))
* **input:** not effective debounce prop ([46c5d31](https://github.com/vexip-ui/vexip-ui/commit/46c5d31f29aa390f441e278874f6bbcebddee093))
* **layout:** add style dependencies ([04edd03](https://github.com/vexip-ui/vexip-ui/commit/04edd03b4dfcb7079d6d51ecc19a53cdca6116d6))
* **plugins:** support typography style alias ([f89cfef](https://github.com/vexip-ui/vexip-ui/commit/f89cfefbe43da61c4fce258e5d55166f89b9b152))


### Features

* **input:** add sync prop ([7dc7289](https://github.com/vexip-ui/vexip-ui/commit/7dc7289b12820a4ba74ce092dd45c11b2cb40d75)), closes [#169](https://github.com/vexip-ui/vexip-ui/issues/169)
* **number-input:** add sync prop ([7b50304](https://github.com/vexip-ui/vexip-ui/commit/7b50304abfb38a8d47a5e84ba456b43ec7757c08))
* **plugins:** add iconPrefix option for resolver ([11ccffd](https://github.com/vexip-ui/vexip-ui/commit/11ccffd91bee0f4491990045b94855bd76db375b))
* **plugins:** support auto resolve icon components ([#167](https://github.com/vexip-ui/vexip-ui/issues/167)) ([fef768c](https://github.com/vexip-ui/vexip-ui/commit/fef768cd14ccf1245ec3db9e45c3651bc8ca1ca6))



## [2.0.4](https://github.com/vexip-ui/vexip-ui/compare/v2.0.3...v2.0.4) (2022-09-23)


### Bug Fixes

* **color-picker:** incorrect inner input style ([b49bb49](https://github.com/vexip-ui/vexip-ui/commit/b49bb494dde6bfa297ad00f2091c0d0ce14d6b6b))
* **form:** should not submit when form is not native ([8b27f2a](https://github.com/vexip-ui/vexip-ui/commit/8b27f2a7277fd0eabac1139e6d68484dc2894847))
* **menu:** content disappears not in time when collapsing ([cfd93c1](https://github.com/vexip-ui/vexip-ui/commit/cfd93c1e1e74bfcad231d9d4e2dd63c7c6f0f412)), closes [#162](https://github.com/vexip-ui/vexip-ui/issues/162)


### Features

* **alert:** support auto scroll for content ([a3594c0](https://github.com/vexip-ui/vexip-ui/commit/a3594c09a1836dc523ee02901ab81e3ae1c79ebb))
* **button:** support create inner badge ([3353761](https://github.com/vexip-ui/vexip-ui/commit/33537615b64bce84fea5285cf33588dffa10f702))


### Performance Improvements

* lazy render popper for select type components ([f7b96cc](https://github.com/vexip-ui/vexip-ui/commit/f7b96cca8a58b95586d64572c7cae6d1634f4449))



## [2.0.3](https://github.com/vexip-ui/vexip-ui/compare/v2.0.2...v2.0.3) (2022-09-20)


### Features

* **carousel:** add ignore-hover prop ([0c1c221](https://github.com/vexip-ui/vexip-ui/commit/0c1c221b9c9c8542508af5f2e497cc0f24c53d02))
* **utils:** add compute dom react methods ([20fcb71](https://github.com/vexip-ui/vexip-ui/commit/20fcb7134286b7ad99a8e3f5e39ca695354b944f))



## [2.0.2](https://github.com/vexip-ui/vexip-ui/compare/v2.0.1...v2.0.2) (2022-09-19)


### Bug Fixes

* **carousel:** confusion when switch left or top in loop ([0483eeb](https://github.com/vexip-ui/vexip-ui/commit/0483eebe23cf9ff4e518498b855581b9fd666590))
* **table:** incorrect bg color when transparent in dark theme ([c197979](https://github.com/vexip-ui/vexip-ui/commit/c197979fea6cef7e56f6ed06d0643e19928c68e2))


### Features

* **auto-complete:** add transparent prop ([1111b96](https://github.com/vexip-ui/vexip-ui/commit/1111b96b4766bf38ac7e24e33e6c968d434673f3))
* **cascader:** add transparent prop ([379c862](https://github.com/vexip-ui/vexip-ui/commit/379c862a6b497f9a870faa81dcc8a24289a75c55))
* **input:** add transparent prop ([cdc6e08](https://github.com/vexip-ui/vexip-ui/commit/cdc6e087e1246f1bde12a74abcbca277dea9b7fb))
* **layout:** add expandMenuByLabel api method ([bd864b0](https://github.com/vexip-ui/vexip-ui/commit/bd864b0d777b06344058b082aee14cc85a686e71)), closes [#156](https://github.com/vexip-ui/vexip-ui/issues/156)
* **select:** add transparent prop ([972ca83](https://github.com/vexip-ui/vexip-ui/commit/972ca834670afbc059458e330487ecdc8b8a9c95))



## [2.0.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0...v2.0.1) (2022-09-18)


### Bug Fixes

* **slider:** missing width when in flex layout ([7506916](https://github.com/vexip-ui/vexip-ui/commit/75069164ea8bfdac51acc33f0cda1d116b07e344))


### Features

* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **table:** support series of class, style, attrs and events ([d7291d8](https://github.com/vexip-ui/vexip-ui/commit/d7291d86490d2dc7ace6f8e06aee58a59f43df0e)), closes [#154](https://github.com/vexip-ui/vexip-ui/issues/154)



# [2.0.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-rc.1...v2.0.0) (2022-09-16)


### Bug Fixes

* **button:** missing icon when has any content ([26e199b](https://github.com/vexip-ui/vexip-ui/commit/26e199bf4ec79347bea9d594ade4c75b937cfccb))
* **checkbox-group:** incorrect update value from props.value ([9513ad7](https://github.com/vexip-ui/vexip-ui/commit/9513ad7cc054769e85d4082cc77c5d67bb443bfe)), closes [#147](https://github.com/vexip-ui/vexip-ui/issues/147)
* **config:** incorrect event prop regexp ([849ac5b](https://github.com/vexip-ui/vexip-ui/commit/849ac5bc033751e706a329f8c745862c995ecaa0)), closes [#139](https://github.com/vexip-ui/vexip-ui/issues/139)
* **form:** correctly delete form item ([4ce34e8](https://github.com/vexip-ui/vexip-ui/commit/4ce34e8110cbbae297f534fc230e838a43c05770))
* **form:** rename label-position to label-align ([ad593bb](https://github.com/vexip-ui/vexip-ui/commit/ad593bb29c9ba56c67b78c0f43b87ddc3dc8cecb))
* **slider:** incorrect judge to emit input event ([f13656e](https://github.com/vexip-ui/vexip-ui/commit/f13656e97ddf96b19675d698b60bdb23bc0a5591))
* **table:** unstable row rendering ([4546389](https://github.com/vexip-ui/vexip-ui/commit/45463890af9b120eb587563dda813a2084f604a5))


### Code Refactoring

* **upload:** all callbacks and events first param change to FileState ([069edae](https://github.com/vexip-ui/vexip-ui/commit/069edae351b6992b4949a8f0d636d376f0221ad0))


### Features

* add Typography components ([#146](https://github.com/vexip-ui/vexip-ui/issues/146)) ([8cca389](https://github.com/vexip-ui/vexip-ui/commit/8cca38939c7517af0b9e4b56007073d4a95d90df))
* **anchor:** add force-active prop ([ecdc9e3](https://github.com/vexip-ui/vexip-ui/commit/ecdc9e3568d51159c884245aaa80f789f786f5aa))
* **form:** add help prop for item ([69e4996](https://github.com/vexip-ui/vexip-ui/commit/69e499661c2f5611bf0a14200903108645c44015))
* **form:** add inline prop ([f2db62a](https://github.com/vexip-ui/vexip-ui/commit/f2db62a17bb32795f572d18c1096b041550d44ad))
* **form:** support pure form item render ([65d6b30](https://github.com/vexip-ui/vexip-ui/commit/65d6b30dfed4277859234f288eb23e6ce3f1ac76))
* **form:** support set size for all controls under form ([a332eca](https://github.com/vexip-ui/vexip-ui/commit/a332ecaad8993b1aac9c658b685570ebae198409))
* **menu:** add expandItemByLabel api method ([38003cd](https://github.com/vexip-ui/vexip-ui/commit/38003cdd8b0493b428d14adb8bdc1e9b02aaf619)), closes [#141](https://github.com/vexip-ui/vexip-ui/issues/141)
* **slider:** add reverse prop ([a1ee27e](https://github.com/vexip-ui/vexip-ui/commit/a1ee27efcdc13df1807a0dee2fbef3035d23601a)), closes [#142](https://github.com/vexip-ui/vexip-ui/issues/142)
* **slider:** support add markers and only-marker select ([ea1be6b](https://github.com/vexip-ui/vexip-ui/commit/ea1be6ba83e507faff9b7cd367c262bb41fc3030))
* **slider:** support range select mode ([b5534f9](https://github.com/vexip-ui/vexip-ui/commit/b5534f97945334262862fc37870fc3c8c67c6990)), closes [#77](https://github.com/vexip-ui/vexip-ui/issues/77)
* **tree:** add label-click event ([61f2f7a](https://github.com/vexip-ui/vexip-ui/commit/61f2f7a022caa08eced7ff4fa88f5120963c499b)), closes [#149](https://github.com/vexip-ui/vexip-ui/issues/149)


### BREAKING CHANGES

* **upload:** Upload component all callbacks and events first param
change from SourceFile to FileState, this will make the states of files
inside the component controllable. This change also fix cannot init
file list via urls.
* **form:** To better fit the description of this feature, change
the `label-position` name to `label-align`



# [2.0.0-rc.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2022-09-06)


### Bug Fixes

* **breadcrumb:** unexpected page reloads when item clicked ([19f387e](https://github.com/vexip-ui/vexip-ui/commit/19f387ebcd720ce09d9c7c4bf7d271820d872414)), closes [#131](https://github.com/vexip-ui/vexip-ui/issues/131)
* **ellipsis:** html attributes not effective ([a2b7857](https://github.com/vexip-ui/vexip-ui/commit/a2b7857243794ed837fc2cab87561958e51919b0)), closes [#129](https://github.com/vexip-ui/vexip-ui/issues/129)
* **upload:** should not prevent default when keydown ([b4b92f4](https://github.com/vexip-ui/vexip-ui/commit/b4b92f43b0265ec749ca60337a883fbdd3c41fa8)), closes [#130](https://github.com/vexip-ui/vexip-ui/issues/130)


### Features

* **anchor:** support bind url hash ([797bd87](https://github.com/vexip-ui/vexip-ui/commit/797bd871c2c0d9d4a25948f37abfc2aaeb8cf7ab))
* **toast:** add toast plugin (manager) ([#128](https://github.com/vexip-ui/vexip-ui/issues/128)) ([a3be410](https://github.com/vexip-ui/vexip-ui/commit/a3be4101f870fe0eab242ad2bccf22f584d1dc78))
* **viewer:** add on-transition prop ([689ecd0](https://github.com/vexip-ui/vexip-ui/commit/689ecd0ceff2be465b9b3812fcd6b619c1330f9c))
* **Viewer:** using mouse position as transform origin for zooming ([#73](https://github.com/vexip-ui/vexip-ui/issues/73)) ([2ed544e](https://github.com/vexip-ui/vexip-ui/commit/2ed544e4a90b09be3fb047a6ff52687d9dccfdbe))



# [2.0.0-rc.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.21...v2.0.0-rc.0) (2022-08-31)


### Bug Fixes

* **button:** incorrect render when loading with icon-only prop ([c051bc5](https://github.com/vexip-ui/vexip-ui/commit/c051bc56b0b2bddbb6a70690d7787c70b560ad9e))
* **cascader:** options hitting init not in time ([36df57c](https://github.com/vexip-ui/vexip-ui/commit/36df57cd4f2ebf20850c19baf029d4c652e4b63f))
* **color-picker:** hide panel when disabled change to true ([c152d67](https://github.com/vexip-ui/vexip-ui/commit/c152d67b2dcdcd8cc52afc59e71f83fcb6dd0c88))
* **date-picker:** effect shortcut when using range select ([9fbfc71](https://github.com/vexip-ui/vexip-ui/commit/9fbfc7153cc51386fd22549a1d3b4e05bff82ffa)), closes [#105](https://github.com/vexip-ui/vexip-ui/issues/105)
* **icon:** spin and pulse not effective ([11c6d69](https://github.com/vexip-ui/vexip-ui/commit/11c6d6961d22c341b456edba61aab19e15f1b5a6)), closes [#112](https://github.com/vexip-ui/vexip-ui/issues/112)
* **option:** correct selected style priority ([48fd2f3](https://github.com/vexip-ui/vexip-ui/commit/48fd2f3f4e0c9194ffdc8a62fd4da22c78ae2f00))
* **table:** incorrect y scroll after adding any row ([a597fea](https://github.com/vexip-ui/vexip-ui/commit/a597fea5fbb02f2b370e66885c737c3e235c1479)), closes [#121](https://github.com/vexip-ui/vexip-ui/issues/121)
* **transfer:** correct params for select event ([c2d0d6f](https://github.com/vexip-ui/vexip-ui/commit/c2d0d6f86340da0a0b13f2437eb261c4d772cfdf))
* **tree:** not trigger async load when click label with floor-select ([d4e63cc](https://github.com/vexip-ui/vexip-ui/commit/d4e63cccb4a82e7ec82aab37bfc6c8ba0cca7194))
* **tree:** parent node will disappear when drop to its child node ([e0440fd](https://github.com/vexip-ui/vexip-ui/commit/e0440fd96b0e555e6d25c14dbb3734c449f94053)), closes [#125](https://github.com/vexip-ui/vexip-ui/issues/125)
* **tree:** render empty tip when filter result is empty ([3d9cfb6](https://github.com/vexip-ui/vexip-ui/commit/3d9cfb6c16eb8d0beaecede5467f07d8c400c0b8)), closes [#123](https://github.com/vexip-ui/vexip-ui/issues/123)


### Code Refactoring

* export types of components in top ([092ffff](https://github.com/vexip-ui/vexip-ui/commit/092ffff033b3812bef9555052f50685ec6c63c82)), closes [#84](https://github.com/vexip-ui/vexip-ui/issues/84)


### Features

* **anchor:** support create links via using options prop ([1f712f6](https://github.com/vexip-ui/vexip-ui/commit/1f712f68231d26ab07a6ca5e900474e79c5e7604)), closes [#94](https://github.com/vexip-ui/vexip-ui/issues/94)
* **checkbox:** support quickly add control via prop ([4d13ec2](https://github.com/vexip-ui/vexip-ui/commit/4d13ec23db7095415b8d24d17c0c56be564d1298)), closes [#104](https://github.com/vexip-ui/vexip-ui/issues/104)
* **drawer:** support add footer with default action buttons ([ddbc8a3](https://github.com/vexip-ui/vexip-ui/commit/ddbc8a34526c1f9549e1a067795a488de43c3eaa)), closes [#117](https://github.com/vexip-ui/vexip-ui/issues/117)
* **select:** add update:label event to quickly get label ([77f8372](https://github.com/vexip-ui/vexip-ui/commit/77f837279ad9d650db8c8516989726effd2b109c)), closes [#127](https://github.com/vexip-ui/vexip-ui/issues/127)


### BREAKING CHANGES

* **tree:** To unify the signatures of tree's function parameters,
`on-async-load` parameters is changed from `(node)` to `(data, node)`.
* Currently can import types from `vexip-ui`, no longger
imports will be from `vexip-ui/es/xxx`.



# [2.0.0-beta.21](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2022-08-15)


### Bug Fixes

* **checkbox:** effective using control to check all ([70a5bb2](https://github.com/vexip-ui/vexip-ui/commit/70a5bb2778f3c9d441b5f072ab1762b4ed197381)), closes [#103](https://github.com/vexip-ui/vexip-ui/issues/103)
* **date-picker:** effect key number input value ([75e1510](https://github.com/vexip-ui/vexip-ui/commit/75e1510f4bdec72fe71c021e47ffba927877666a))
* **date-picker:** emit change column event when open panel ([1045cb4](https://github.com/vexip-ui/vexip-ui/commit/1045cb4674ef965dd8a8de78635dc0818c2e73fa))
* **modal:** resize start event payload ([d04ebe6](https://github.com/vexip-ui/vexip-ui/commit/d04ebe69f17cf981be44e6a6c638e40086d174fd))
* **select:** using string schema to match option value when filter ([470600e](https://github.com/vexip-ui/vexip-ui/commit/470600ebf0cb41d76a667f4969912abfa26bf576))
* **time-picker:** minute column step is invaild ([02051e6](https://github.com/vexip-ui/vexip-ui/commit/02051e6df939cf5c5d280cda7a123e38a0814bca))


### Features

* **date-picker:** add focus and blur api methods ([2aeca22](https://github.com/vexip-ui/vexip-ui/commit/2aeca227976e5b7a116b23ef31a68299a4b876b7))
* **ellipsis:** support multiple rows to ellipsis  ([#108](https://github.com/vexip-ui/vexip-ui/issues/108)) ([5d78541](https://github.com/vexip-ui/vexip-ui/commit/5d78541c99aeaee6982a4b02da44efe75c8f0c22))
* **time-picker:** add focus and blur api methods ([2080779](https://github.com/vexip-ui/vexip-ui/commit/20807791178caf39bbf14ecd0d4fe57eef1c8bb9))



# [2.0.0-beta.20](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2022-08-04)


### Bug Fixes

* **auto-complete:** correctly init input control value ([99669a2](https://github.com/vexip-ui/vexip-ui/commit/99669a2b7b4ef6fdcfa90f51cd8cad4e745b96ee))
* **breadcrumb:** using `<a>` as label tag ([63832d2](https://github.com/vexip-ui/vexip-ui/commit/63832d2e8bd10af4257dc41e00e221953b3ff515))
* **cascader:** correct focus when mixed using mouse and keyboard ([7e9535c](https://github.com/vexip-ui/vexip-ui/commit/7e9535ce37ec282721ec386061bc3f862d576046))
* **layout:** auto adjust menu width when no aside ([a218943](https://github.com/vexip-ui/vexip-ui/commit/a21894303869124dd515e519251791ce4835be8d))
* **masker:** using visibility hidden instead v-show ([a0d41bd](https://github.com/vexip-ui/vexip-ui/commit/a0d41bd14d763997d722c9326ba6ee73bbd22f3d))
* **textarea:** missing Icon register ([b04627a](https://github.com/vexip-ui/vexip-ui/commit/b04627ac03f9c0c128b8d08c8f5f328432ea2072))


### Features

* **button:** add no-pulse and icon-only props ([342655c](https://github.com/vexip-ui/vexip-ui/commit/342655cff8728c7c39010475eb0e7fdd8f5115af))
* **form:** add built in row layout ([561ff23](https://github.com/vexip-ui/vexip-ui/commit/561ff231edc04bf00ebed3653442f4b679d98e90))
* **form:** support responsive label width ([e1ae713](https://github.com/vexip-ui/vexip-ui/commit/e1ae7132c06c9ab49720650ab81f598f72057356))
* **layout:** auto toggle links layout when footer resize ([f5786ff](https://github.com/vexip-ui/vexip-ui/commit/f5786ffe2ff1938d64c65022c63aa4222e412268))
* **layout:** auto toggle sign name show when header resize ([bceb75d](https://github.com/vexip-ui/vexip-ui/commit/bceb75d65a02ea3d7406a4b66ac5fa437eaab33f))
* **scroll:** add ensureInView api method ([090367d](https://github.com/vexip-ui/vexip-ui/commit/090367d71c0d0ccdb54afd88a60feb1ffe7826d7))
* **select:** support dynamic create options ([3673b83](https://github.com/vexip-ui/vexip-ui/commit/3673b83e344fb018ba495bd974d75497c4ef5c2d)), closes [#99](https://github.com/vexip-ui/vexip-ui/issues/99)
* **select:** support filter options ([31d1cd8](https://github.com/vexip-ui/vexip-ui/commit/31d1cd89ddaec9197315c75456b51744cf2e7350))
* **select:** support use backspace to delete tag ([f05e8f4](https://github.com/vexip-ui/vexip-ui/commit/f05e8f41bf03183e891d6b1fb6acdeb97ac7e098))



# [2.0.0-beta.19](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2022-08-01)


### Bug Fixes

* fixed css vars prefix to '--vxp' ([e4c1da3](https://github.com/vexip-ui/vexip-ui/commit/e4c1da34964bfde8faf3f4bb3f96df51d1625a6d))
* improve input-like control styles ([fb6ec62](https://github.com/vexip-ui/vexip-ui/commit/fb6ec626c4a17a390b6907f8e6e14ef57010a65e))
* **layout:** router menu not effective in aside ([de2aec9](https://github.com/vexip-ui/vexip-ui/commit/de2aec9d6c67bd8dfb250ed6679a885409745987)), closes [#100](https://github.com/vexip-ui/vexip-ui/issues/100)
* **menu:** improve menu focus and styles ([d905e9b](https://github.com/vexip-ui/vexip-ui/commit/d905e9b87795ae6badfcf33c263c27d486fcf7b5))


### Code Refactoring

* **menu:** improve class names to flat styles ([5f9eb15](https://github.com/vexip-ui/vexip-ui/commit/5f9eb157276c43d02b77a72c9a460ed70a0ebb5e)), closes [#91](https://github.com/vexip-ui/vexip-ui/issues/91)


### Features

* **auto-complete:** support control loading state ([0dc2098](https://github.com/vexip-ui/vexip-ui/commit/0dc20984488778d3294e6a270d908bde96941232))
* **checkbox:** support control loading state ([0a2b4be](https://github.com/vexip-ui/vexip-ui/commit/0a2b4be78676cd17c66a9ac1e6f84cf13f67e7ce))
* **form:** support set loading for all controls under form ([a43ca86](https://github.com/vexip-ui/vexip-ui/commit/a43ca86d1a3338df7f33b33f9bc3f8000c1e9f3e))
* **layout:** add color and colors props ([f639db3](https://github.com/vexip-ui/vexip-ui/commit/f639db3390d94e9a2fb32afa40122593bebf692c))
* **layout:** export header, aside and footer components ([7a1bdae](https://github.com/vexip-ui/vexip-ui/commit/7a1bdae080c902c257131fc363c661b6835e64aa))
* **radio:** support control loading state ([eefc325](https://github.com/vexip-ui/vexip-ui/commit/eefc325580b2c098405e771f6e60189a46ba4f09))
* **slider:** support control loading state ([4c121cc](https://github.com/vexip-ui/vexip-ui/commit/4c121cc6ac14c97bc0d2bc653abd85071a5b2f23))
* **switch:** support custom loading icon ([c1aa3da](https://github.com/vexip-ui/vexip-ui/commit/c1aa3da06ac5fe4f9ff77b81d740cdc0bb1a72ae))
* **transfer:** support control loading state ([69c93f9](https://github.com/vexip-ui/vexip-ui/commit/69c93f9f435b04bfc032c7af96b1f5df338c1471))
* **upload:** support control loading state ([1a289f1](https://github.com/vexip-ui/vexip-ui/commit/1a289f199c92066d49ffc2aa5231b8943148c022))
* **wheel:** support control loading state ([3e3c517](https://github.com/vexip-ui/vexip-ui/commit/3e3c517a9cecdffd06f063772b8b2ff33c3ea889))


### BREAKING CHANGES

* **menu:** `theme` prop has deprecated, using css vars to adjust
menu styles. `tooltipTheme` rename to `tooltipReverse`.



# [2.0.0-beta.18](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2022-07-29)


### Bug Fixes

* **cascader:** correct panels class name ([fef30d8](https://github.com/vexip-ui/vexip-ui/commit/fef30d839e03327f656ee437f3b540721e4585bb))
* **icon:** add `<g>` wrapper to isolate transform styles ([4f88644](https://github.com/vexip-ui/vexip-ui/commit/4f8864444c75f5de8d0a276d651bcc0c4242ca4d))
* **icon:** improve inner `<g>` styles ([1d961f4](https://github.com/vexip-ui/vexip-ui/commit/1d961f44eb4df5451947fd3d0a5ef2f0241b2a6a))
* **input:** before/after-button rename to before/after-action ([a4f202b](https://github.com/vexip-ui/vexip-ui/commit/a4f202bf48aa4b8bcba1102e14fa5fc899062346))


### Features

* **cascader:** support control loading state ([18cca8e](https://github.com/vexip-ui/vexip-ui/commit/18cca8e268b9a64da87e49cf0013dba556216144))
* **color-picker:** support control loading state ([55ffc55](https://github.com/vexip-ui/vexip-ui/commit/55ffc553b4190995749a514744bf585f194d6373))
* **date-picker:** support control loading state ([0389a80](https://github.com/vexip-ui/vexip-ui/commit/0389a80980ee618e6d329d206410f237f8e6de15))
* **input:** add custom slots to place button in before or after ([6c0a1f7](https://github.com/vexip-ui/vexip-ui/commit/6c0a1f7e651c8b85ebbbb0d0e556a347486408f8))
* **input:** support control loading state ([3ec0e59](https://github.com/vexip-ui/vexip-ui/commit/3ec0e59e34f9000f62fbd296c36966c36b07ea9b))
* **number-input:** suport control loading state ([a3ba14d](https://github.com/vexip-ui/vexip-ui/commit/a3ba14d3430fb795e951563c209b2fe956baf142))
* **select:** support control loading state ([77083f4](https://github.com/vexip-ui/vexip-ui/commit/77083f4e32327c1caae780a94ea3bd269f94541f))
* **textarea:** support control loading state ([a889b18](https://github.com/vexip-ui/vexip-ui/commit/a889b1873343c5cdaa71759da1fd8b353fea8262))



# [2.0.0-beta.17](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2022-07-26)


### Bug Fixes

* all transition names using injected namespace ([432f0f7](https://github.com/vexip-ui/vexip-ui/commit/432f0f7bf2e2f41fab7712cbd8e4ea5cf92f1158))
* **layout:** correct main size when aside reduced ([1b9d350](https://github.com/vexip-ui/vexip-ui/commit/1b9d350ab61a257e5a8cf3d683218657216a0628))
* **mixins:** useVirtual sync scroll top after item resize ([fe7122e](https://github.com/vexip-ui/vexip-ui/commit/fe7122e2a4449608a267959ecc4a874db4480d30))
* **select:** auto scroll to active option ([1e72722](https://github.com/vexip-ui/vexip-ui/commit/1e727223698006a35c7a88af207f2e3027fef0e4))
* **transfer:** improve panel resize ([c695607](https://github.com/vexip-ui/vexip-ui/commit/c69560728dffceb0e291bd992b95f16cd39a540d))
* **virtual-list:** not emit resize event ([17caeec](https://github.com/vexip-ui/vexip-ui/commit/17caeec1f71d1bb70aab5b6a56bf1e196df9c690))


### Features

* **auto-complete:** support group options ([ee94d77](https://github.com/vexip-ui/vexip-ui/commit/ee94d77b9d0d2b5c0c7f31230258c46735d0dcf2))
* **mixins:** useVirtual add methods to ensure item in view ([e77fc2c](https://github.com/vexip-ui/vexip-ui/commit/e77fc2cab89811c9aafee60152879cc95715453d))
* **select:** support group options via using prop ([9a37e0d](https://github.com/vexip-ui/vexip-ui/commit/9a37e0d126aa07889136531ed1cbcf7c1dd2aaad))



# [2.0.0-beta.16](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2022-07-25)


### Bug Fixes

* **auto-complete:** correct input value when enter without hitting ([2e9fb90](https://github.com/vexip-ui/vexip-ui/commit/2e9fb9046de5e96029a784568df9a62e787885f6))
* **collapse:** infinite loop when toggle in accordion mode ([973c522](https://github.com/vexip-ui/vexip-ui/commit/973c522be26f1b40621219c53f40bedff790d2eb)), closes [#50](https://github.com/vexip-ui/vexip-ui/issues/50)
* **contextmenu:** adjust promise returns to array ([165681b](https://github.com/vexip-ui/vexip-ui/commit/165681b37cf5bf19ae840c935e9eb1667bdfe55f))
* **mixins:** useModifier support auto reset when blur ([0f6a993](https://github.com/vexip-ui/vexip-ui/commit/0f6a993096fd81b5d6254137247463fc889f44fd))
* **mixins:** useModifier unable to read activeKeys ([5c36e65](https://github.com/vexip-ui/vexip-ui/commit/5c36e658b97914f8d09c3aec39b8768329049ff1))
* **mixins:** useVirtual implement scroll api methods ([012258a](https://github.com/vexip-ui/vexip-ui/commit/012258a61bf3965d43e36a635b597e819a6e96b0))
* **transfer:** correct panel tab index ([a27aa27](https://github.com/vexip-ui/vexip-ui/commit/a27aa27dca215b3b24fe627eef1d756133b9b9ae))
* **transfer:** follow hitting option when using keyboard ([75d7284](https://github.com/vexip-ui/vexip-ui/commit/75d72843da49d62a0aaef38179678bc8a1dae6bf))
* **virtual-list:** auto refresh when item count change ([2860b32](https://github.com/vexip-ui/vexip-ui/commit/2860b329ac451d7ce8a2699540aa3715e27e3872))
* **virtual-list:** expose scroll api methods ([5010651](https://github.com/vexip-ui/vexip-ui/commit/50106515154b9eae8ccb02896b1275da4b7765ef))
* **virtual-list:** normalize items tag styles ([5f8638d](https://github.com/vexip-ui/vexip-ui/commit/5f8638d77742eb49ce9fde42963795d5c49f1909))


### Code Refactoring

* `pane` rename to `panel` ([9a150f2](https://github.com/vexip-ui/vexip-ui/commit/9a150f28f4c614c85000198974043819440f97b3))


### Features

* **checkbox:** add tab-index prop ([7b574f2](https://github.com/vexip-ui/vexip-ui/commit/7b574f243be9d957c61acee6011b50b3ac66dded))
* **form:** support disable all controls under form ([998c219](https://github.com/vexip-ui/vexip-ui/commit/998c2199504bd3637e1053f04f6ba4aa7818eba6))
* **menu:** support accessible keyboard ([ede2772](https://github.com/vexip-ui/vexip-ui/commit/ede2772a41b523f335670217d364a93505b21071))
* **native-scroll:** add wrapper-tag prop ([700e07d](https://github.com/vexip-ui/vexip-ui/commit/700e07d7b8df63f440ef480478298643c9aa4893))
* **scroll:** add wrapper-tag prop ([ad364e6](https://github.com/vexip-ui/vexip-ui/commit/ad364e685203a6e37f00b679fdc49f39c2bfcc32))
* support accessibility for components ([#97](https://github.com/vexip-ui/vexip-ui/issues/97)) ([51d5556](https://github.com/vexip-ui/vexip-ui/commit/51d555612d72ae495569cfbf56472d6764ac3dce))
* **transfer:** add Transfer component ([#96](https://github.com/vexip-ui/vexip-ui/issues/96)) ([454e05b](https://github.com/vexip-ui/vexip-ui/commit/454e05b937106767522f83c7d2fee16095eda3ca))
* **utils:** add dom utils ([b461c9a](https://github.com/vexip-ui/vexip-ui/commit/b461c9a133365f3c4fa786bc669ddabd18c05724))


### BREAKING CHANGES

* CollapsePane and TabPane deprecated, using
CollapsePanel and TabPanel instead.



# [2.0.0-beta.15](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2022-07-18)


### Bug Fixes

* **dropdown:** sync drop stata when using hover trigger ([0d8ed5e](https://github.com/vexip-ui/vexip-ui/commit/0d8ed5ebf61516f2f79800c2a2e0e61107076133))
* **menu:** marker show when disabled in horizontal mode ([e1b1153](https://github.com/vexip-ui/vexip-ui/commit/e1b115350e155f91e27a04ea57ad1acd10fddde0))
* **menu:** title padding error when horizontal ([b834295](https://github.com/vexip-ui/vexip-ui/commit/b834295b6ee0e069be5919f3505c4a52f9bb0e3e))
* **overflow:** consider the padding of wrapper ([ee9327d](https://github.com/vexip-ui/vexip-ui/commit/ee9327ddbf829391465dca8192543fd9b4a2757d))
* **overflow:** support directly render children ([c17c20b](https://github.com/vexip-ui/vexip-ui/commit/c17c20b5e94467bd1e6675e974f9bf8df9b4aba5))
* **renderer:** misisng component name ([b2607aa](https://github.com/vexip-ui/vexip-ui/commit/b2607aaff93f8e87f13602472d85cae2f8228a43))
* **tooltip:** support fragment when using wrapper ([68be420](https://github.com/vexip-ui/vexip-ui/commit/68be420456f5f0a7b4ef0862b4fac5fea6ab05ab))
* useClickoutside directly passing a callback ([ebf4842](https://github.com/vexip-ui/vexip-ui/commit/ebf4842eafab6175a929e0e2cb26cca88a6b2347))


### Code Refactoring

* **tooltip:** improve component structure, add multiple features ([e44f327](https://github.com/vexip-ui/vexip-ui/commit/e44f32765647db52d05d3acbd07454b92164f34e))


### Features

* **Layout:** create Layout component ([#88](https://github.com/vexip-ui/vexip-ui/issues/88)) ([22c2b6d](https://github.com/vexip-ui/vexip-ui/commit/22c2b6d53f0ae27e64b320e49e6b088edd92b057)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **menu:** support auto ellipsis when horizontal mode ([ad429c8](https://github.com/vexip-ui/vexip-ui/commit/ad429c8896158447a1e80cbb51ae4ae1f0346b60))
* **menu:** support parse options from router ([28d13f1](https://github.com/vexip-ui/vexip-ui/commit/28d13f1b9dddffd238128145a6fe2ea74967a9c2)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **mixins:** usePopper support virtual reference ([da51364](https://github.com/vexip-ui/vexip-ui/commit/da513643010732d0f36cafb5b01efc9bbe04628e))
* **overflow:** add Overflow component ([665f250](https://github.com/vexip-ui/vexip-ui/commit/665f2501c2d4204973c155f7b6bbb95280f72162))


### BREAKING CHANGES

* **tooltip:** `theme` prop deprecated, use `reverse` prop instead
`theme="dark"` case. `tip` slot deprecated, currently the trigger part
use `trigger` slot and the tip part use default slot. Now Tooltip will
not render wrapper element by default.



# [2.0.0-beta.14](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2022-07-10)


### Bug Fixes

* **calendar:** using locale config for date labels ([7d58232](https://github.com/vexip-ui/vexip-ui/commit/7d58232267895e413badd44f063f96270f52b6cc))
* improve prefix resolve when install ([a418794](https://github.com/vexip-ui/vexip-ui/commit/a4187947cc4c73dad2d28175482df868f622223e))
* **mixins:** add both key and code into activeKeys for useModifier ([c2593e5](https://github.com/vexip-ui/vexip-ui/commit/c2593e5aebb65e8c7619a27cd975eb1b80ff8c09))
* **scroll:** not auto refresh when content size change ([846f4f0](https://github.com/vexip-ui/vexip-ui/commit/846f4f061979462d05e1cda30d65b51f903aa3e1))
* **table:** scroll not reset when data changed ([7814b08](https://github.com/vexip-ui/vexip-ui/commit/7814b0831da938155e135a396649829ebff78d0e))
* **time-ago:** cannot resolve locale config ([b073ff8](https://github.com/vexip-ui/vexip-ui/commit/b073ff840d9d7eaec0d496dc718ff8409486cfea))
* **utils:** imrpove number operations loop ([5d10739](https://github.com/vexip-ui/vexip-ui/commit/5d10739ec7a1fe1d083128c469f10e7d845bf681))
* **wheel:** cannot scroll when min or max value effectively ([05198d4](https://github.com/vexip-ui/vexip-ui/commit/05198d45ec2051516561a21ec5ba9049617223f4))


### Features

* **config:** add global z-index config ([#62](https://github.com/vexip-ui/vexip-ui/issues/62)) ([82b90f2](https://github.com/vexip-ui/vexip-ui/commit/82b90f26a893df43b1bb607dc94b753a36b74b36))
* **loading:** add close method ([286a4a0](https://github.com/vexip-ui/vexip-ui/commit/286a4a0fc9e0cd2b26b49719b2c4b1412d6329d8))
* **menu:** support create items via options prop ([927c185](https://github.com/vexip-ui/vexip-ui/commit/927c1854aa00a7a824d3ac57a94e7e4d5449024f)), closes [#83](https://github.com/vexip-ui/vexip-ui/issues/83)
* **mixins:** add useModifier mixin ([#75](https://github.com/vexip-ui/vexip-ui/issues/75)) ([d90e021](https://github.com/vexip-ui/vexip-ui/commit/d90e02157525c3d0b8bf6e5b15873b076a4f9dee))
* **number-input:** support keyboard actions to change number ([fd9bed5](https://github.com/vexip-ui/vexip-ui/commit/fd9bed5fdf2886f2011df75fc27fbe715e9f52f8))
* **time-age:** internal prop support boolean and default to false ([1918efd](https://github.com/vexip-ui/vexip-ui/commit/1918efd896e777166b218343b23e13a03b8b5f04))
* **utils:** add exact number operate methods ([504ffb6](https://github.com/vexip-ui/vexip-ui/commit/504ffb6b9a4f6971d6777be8d0ebf3119e5e8687))
* **Viewer:** add zoom range props ([#67](https://github.com/vexip-ui/vexip-ui/issues/67)) ([65c4240](https://github.com/vexip-ui/vexip-ui/commit/65c42406986f07c323f7a23776d2e793fc80f0f6))
* **Viewer:** support flip actions ([#69](https://github.com/vexip-ui/vexip-ui/issues/69)) ([b8275e5](https://github.com/vexip-ui/vexip-ui/commit/b8275e5f26934a23c42035a207d8c5da56058816))



# [2.0.0-beta.13](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2022-06-29)


### Bug Fixes

* **confirm:** cannot open confrim ([7939674](https://github.com/vexip-ui/vexip-ui/commit/7939674c29390de072bd3c359128c294b628ae3c))
* **utils:** improve toFixed method ([4234dbc](https://github.com/vexip-ui/vexip-ui/commit/4234dbc5f4766ec75d020e34ee1d72c44cb2567f))



# [2.0.0-beta.12](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2022-06-27)


### Bug Fixes

* **avatar:** ensure no shrink ([d336fdc](https://github.com/vexip-ui/vexip-ui/commit/d336fdcde00b389fcde5977fe2d7b8cf23047b27))
* **cascader:** init checkbox in no-cascader with single select mode ([1b9ba45](https://github.com/vexip-ui/vexip-ui/commit/1b9ba45c707651872a4f46dadd3f12897b301115)), closes [#52](https://github.com/vexip-ui/vexip-ui/issues/52)
* **cascader:** panes display using flex ([efc1cee](https://github.com/vexip-ui/vexip-ui/commit/efc1cee40a3d7fa2df95185760fd60df49d67f21))
* **collapse:** pane expanded class always exists ([4271190](https://github.com/vexip-ui/vexip-ui/commit/427119015a427b009037d66e271c075e80ee2419))
* **color-picker:** pane transfer not effective ([3e59f6b](https://github.com/vexip-ui/vexip-ui/commit/3e59f6bec100a91933c470682454800b67be765c))
* **confirm:** will render two components when open ([289d79f](https://github.com/vexip-ui/vexip-ui/commit/289d79ff1eb547734e4e6b2dc74a9c51d2df46c8))
* **date-picker:** item range style incorrectly ([c6ed7b3](https://github.com/vexip-ui/vexip-ui/commit/c6ed7b3be735aae12c7135a3580472fbe734b2e3))
* **divider:** text position not effective ([21da414](https://github.com/vexip-ui/vexip-ui/commit/21da414f6c7ecc46b4409425c1bce57c675132b4))
* effect Scroll and Scrollbar with touch actions ([6e80fd6](https://github.com/vexip-ui/vexip-ui/commit/6e80fd6f95a2630ab3a81150f3e1833f03f1801e))
* **form:** add not nullable locale config ([6fb27c6](https://github.com/vexip-ui/vexip-ui/commit/6fb27c63089ca1076e40cb3335dbab3efb7bbb0f))
* **masker:** disable transfer when using inner mode ([351cc4d](https://github.com/vexip-ui/vexip-ui/commit/351cc4d244d8b6b11a4f492a40e053c14f533a12))
* **mixins:** add delta states and supoort capture config ([b1fd988](https://github.com/vexip-ui/vexip-ui/commit/b1fd988548689f047fe6a48954830ff9639b1c6e))
* **mixins:** useFullScreen should return the target ([ecdf647](https://github.com/vexip-ui/vexip-ui/commit/ecdf647174d391c937525bb5cd0bd33ceba66a1a))
* **mixins:** useMouse ensure cancelable before disable events ([4aa5686](https://github.com/vexip-ui/vexip-ui/commit/4aa5686a682ea8f5857303dc1e23db3bedac4899))
* **mixins:** useMoving default prevent mouse and touch events ([3cb1674](https://github.com/vexip-ui/vexip-ui/commit/3cb167467d95d16c1f5f8cc1ae2ef35f34cdf8af))
* **modal:** effect drag and resize to mobile ([373082a](https://github.com/vexip-ui/vexip-ui/commit/373082aab8103a5c7ac66d474c6b943646445c1f))
* **modal:** emitted drag events when not draggable ([fa6275d](https://github.com/vexip-ui/vexip-ui/commit/fa6275d62c919717786e3a2232531da1e5468f8f))
* **pagination:** total and page size plugins style incorrectly ([df6d556](https://github.com/vexip-ui/vexip-ui/commit/df6d55683463b0539de8d92228a470a4eed968bf))
* **scroll:** pointer prop default value base on touch supported ([64770b7](https://github.com/vexip-ui/vexip-ui/commit/64770b78f1f8d8f685672b400f6c8296a9d1b861))
* **slider:** effect touch actions ([805c0f2](https://github.com/vexip-ui/vexip-ui/commit/805c0f2a7f03a3ffa1d940029070f49d6bcd4503))
* **split:** adjust using useMoving mixin to implement ([cfc94d8](https://github.com/vexip-ui/vexip-ui/commit/cfc94d870af33bdb141b6b65a730852ff587cb1c))
* **time-ago:** compatibility for ios when parse string date ([098228a](https://github.com/vexip-ui/vexip-ui/commit/098228a884272833fcca4630fb013897bb3101fc))
* **time-picker:** effect touch actions ([3060e18](https://github.com/vexip-ui/vexip-ui/commit/3060e18d4885fca8015707a144910c07d769a284))
* **upload:** default 2 precision for upload progress ([ccf4f5c](https://github.com/vexip-ui/vexip-ui/commit/ccf4f5c58adc84b245a5571f18b1be5137de54b6))
* **wheel:** pointer prop default value base on touch supported ([36ecbbb](https://github.com/vexip-ui/vexip-ui/commit/36ecbbb7b43a84d2fbec85cc38f8d58973be4455))


### Features

* add auto-remove prop for Masker, Drawer and Modal ([b83f150](https://github.com/vexip-ui/vexip-ui/commit/b83f1505b1c2e74658db07f6797b522710132940))
* **mixin:** add useMoving mixin ([2e48731](https://github.com/vexip-ui/vexip-ui/commit/2e4873162aea74d54972e2cbc6de751db588ec6c))
* **mixins:** add useFullScreen mixin ([0c8ac3a](https://github.com/vexip-ui/vexip-ui/commit/0c8ac3a23335828a3a1d9b8db0562e58115853de))
* **mixins:** add useListener mixin ([8a483b3](https://github.com/vexip-ui/vexip-ui/commit/8a483b3d3195f216c8501f5f5297555c1b769494))
* **mixins:** add usePointer mixin ([c6c3112](https://github.com/vexip-ui/vexip-ui/commit/c6c3112f65a6e245296ff3ba6eadd98274dfa80d))
* **progress:** add precision prop ([f51dff2](https://github.com/vexip-ui/vexip-ui/commit/f51dff22efaac99d4af8e6a4960843c4c7a944c0))
* **tree:** add dragging and drop over classes ([a2aca8e](https://github.com/vexip-ui/vexip-ui/commit/a2aca8ee7e159629113823399675c61d38ec848c)), closes [#55](https://github.com/vexip-ui/vexip-ui/issues/55)
* **tree:** add filter and ignore-case props ([df04a2e](https://github.com/vexip-ui/vexip-ui/commit/df04a2e5ee2b5469802eba6efd7154dbc8968ffb)), closes [#54](https://github.com/vexip-ui/vexip-ui/issues/54)
* **tree:** add node-props prop ([9023743](https://github.com/vexip-ui/vexip-ui/commit/902374376aa49958f1762e585d3961341eeabbe2))
* **tree:** support using method expand node and its all upstream nodes ([e9e9ede](https://github.com/vexip-ui/vexip-ui/commit/e9e9ededad3155fcebffe378d8419d5863c92020)), closes [#53](https://github.com/vexip-ui/vexip-ui/issues/53)
* **Viewer:** add Viewer component ([#56](https://github.com/vexip-ui/vexip-ui/issues/56)) ([f1c16af](https://github.com/vexip-ui/vexip-ui/commit/f1c16af7f2de4f0315d3c5111f2e53bfb276ceb0))



# [2.0.0-beta.11](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2022-06-21)


### Bug Fixes

* ensure Modal and Drawer max sizes less then window sizes ([faade51](https://github.com/vexip-ui/vexip-ui/commit/faade5190cc7dd82417c65f778b2f7cec7a9d61c))
* ensure scope when Scroll or NativeScroll nesting ([b81585d](https://github.com/vexip-ui/vexip-ui/commit/b81585d3c2ce3d46421149307a14cdaf4c5e076e))
* **menu:** nesting popper padding and icon flex-shrink ([4dc29ea](https://github.com/vexip-ui/vexip-ui/commit/4dc29ea88cba23ed42e1bfcd15482f9b8b2d7bde))
* missing style to space-evenly justify ([bda3704](https://github.com/vexip-ui/vexip-ui/commit/bda370476c0b183b85db2322a3e16d46cd263e6a))
* **number-input:** range prop split to min and max props ([62447a6](https://github.com/vexip-ui/vexip-ui/commit/62447a69dde716ee20f07d614e3d37bdac4234ac))
* **scroll:** click event not be emitted ([eaa5cc7](https://github.com/vexip-ui/vexip-ui/commit/eaa5cc7c6c661dae58c98b6658f4698b0bf6be0e))
* **style:** forward design to esaier modify variables ([5a67967](https://github.com/vexip-ui/vexip-ui/commit/5a67967c4ce09b137728f8acdb32308f3800c291))
* support array type class and style props ([317fbff](https://github.com/vexip-ui/vexip-ui/commit/317fbff212847cf3d7054af99102656779e37a8e))


### Features

* **config:** auto warning when validator returns false ([2b7712d](https://github.com/vexip-ui/vexip-ui/commit/2b7712d7d25ef1ef7905934d9d5faf44c4c6003a))
* **config:** support common props config ([86c8fd8](https://github.com/vexip-ui/vexip-ui/commit/86c8fd801643f9919e074bd4d1d7825ad7eae355))
* **config:** support custom class namespace ([#48](https://github.com/vexip-ui/vexip-ui/issues/48)) ([da29ae3](https://github.com/vexip-ui/vexip-ui/commit/da29ae3e4e0c80d59d379274ccb8dbcb15254715))


### BREAKING CHANGES

* **number-input:** NumberInput `range` prop has removed, using min and
max props to instead it.



# [2.0.0-beta.10](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2022-06-18)


### Bug Fixes

* **row:** add space-evenly for justify, stretch for align ([01024a4](https://github.com/vexip-ui/vexip-ui/commit/01024a48c7c2af2b0204e9a741a703acee3139e7))


### Features

* add Skeleton and SkeletonGroup components ([#46](https://github.com/vexip-ui/vexip-ui/issues/46)) ([92c011f](https://github.com/vexip-ui/vexip-ui/commit/92c011f1a3bf9ecade03304409728ee73cc2de7d))
* **Space:** add Space component ([#47](https://github.com/vexip-ui/vexip-ui/issues/47)) ([cedc5b3](https://github.com/vexip-ui/vexip-ui/commit/cedc5b3a4d3133f95138d9715bb2bd95c8be519a))
* **tree:** add no-cascaded prop ([fa07fdd](https://github.com/vexip-ui/vexip-ui/commit/fa07fdd59c4b28ae9b07e8160e9dc586fc797af2))
* **tree:** add suffix-checkbox prop ([d82a531](https://github.com/vexip-ui/vexip-ui/commit/d82a53199d489a36e4b58d2074dd2bed577be7c4))
* **utils:** add supportFlexGap method ([ff158dc](https://github.com/vexip-ui/vexip-ui/commit/ff158dcb2dcbeccb3fc384be5d0085b2f1dda0b4))



# [2.0.0-beta.9](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2022-06-16)


### Bug Fixes

* **button:** ensure size effective when not set group size ([171e9bf](https://github.com/vexip-ui/vexip-ui/commit/171e9bf2ff767736deffbfbf62186ff0ec291e97)), closes [#39](https://github.com/vexip-ui/vexip-ui/issues/39)
* **cascader:** add empty tip when options is empty ([682cbec](https://github.com/vexip-ui/vexip-ui/commit/682cbec67ba2f0e54156c383d39b13799aaeeaa8)), closes [#40](https://github.com/vexip-ui/vexip-ui/issues/40)
* **cascader:** no-cascaded effective in single select mode ([9d17d96](https://github.com/vexip-ui/vexip-ui/commit/9d17d966b7cc5f0f9a1fea89dd80ff7f0821f6ee)), closes [#43](https://github.com/vexip-ui/vexip-ui/issues/43)
* **config:** support function as default value ([f44047e](https://github.com/vexip-ui/vexip-ui/commit/f44047e5362ec5d5374dbcd1d4ad87f51b84ca21)), closes [#41](https://github.com/vexip-ui/vexip-ui/issues/41)
* **form:** item field config not init ([16651fc](https://github.com/vexip-ui/vexip-ui/commit/16651fc4e5c58896bdd3de8d7e81856f5e142e5c))
* **modal:** close icon color transition not effective ([a1e7fff](https://github.com/vexip-ui/vexip-ui/commit/a1e7fff99886d072a6b89ac10e0fad1995031c90)), closes [#42](https://github.com/vexip-ui/vexip-ui/issues/42)
* **native-scroll:** bar not hide when not available ([005ba93](https://github.com/vexip-ui/vexip-ui/commit/005ba934d7f77b26c6f83cf234402209472b5ec1)), closes [#44](https://github.com/vexip-ui/vexip-ui/issues/44)



# [2.0.0-beta.8](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2022-06-15)



# [2.0.0-beta.7](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2022-06-15)


### Bug Fixes

* **config:** unexpected merge global locale config ([e43d8e8](https://github.com/vexip-ui/vexip-ui/commit/e43d8e89c7fb131dde6bdf0eb8613736ed13905d))
* **select:** ensure init value when async load options ([f4e44b3](https://github.com/vexip-ui/vexip-ui/commit/f4e44b3238fa0043e7b3588417ba980e28d55620)), closes [#38](https://github.com/vexip-ui/vexip-ui/issues/38)



# [2.0.0-beta.6](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2022-06-14)


### Bug Fixes

* **alert:** icon prop error when set unknown type ([a989838](https://github.com/vexip-ui/vexip-ui/commit/a9898385e90c4f24825af68e72cc427133a9823d))
* **button:** change size unit to px ([5cf8421](https://github.com/vexip-ui/vexip-ui/commit/5cf8421c5787c6eb9eb1d3427e8daa06fba7e6f6))
* **cascader:** option changed not trigger update ([97a1aff](https://github.com/vexip-ui/vexip-ui/commit/97a1affd6cfed8dddeaaf4e9d8f96c16ed018f65))
* change input like size unit to px ([8f566e6](https://github.com/vexip-ui/vexip-ui/commit/8f566e63e94ef3f01a81a175c7fc327ce3783dfc))
* change size unit from `em` to `px` ([#31](https://github.com/vexip-ui/vexip-ui/issues/31)) ([1370057](https://github.com/vexip-ui/vexip-ui/commit/137005766de6f20989eb02105d189cf25923f504))
* clear internal timer when unmount ([9c2f462](https://github.com/vexip-ui/vexip-ui/commit/9c2f4628efeef62db4fbe73dca7228aa84e824cc))
* **config:** init config not reactive ([47298a5](https://github.com/vexip-ui/vexip-ui/commit/47298a58472d6f8a08d204add8c311a6fcd99fcb))
* **config:** should exist global locale ([b7a5546](https://github.com/vexip-ui/vexip-ui/commit/b7a554652b10dbe0529f3901c229511b19c878c8))
* **select:** ensure sync init values and labels ([ae04af0](https://github.com/vexip-ui/vexip-ui/commit/ae04af0842babbf067d782c6f26eca33ca173620)), closes [#36](https://github.com/vexip-ui/vexip-ui/issues/36)
* **style:** remove unnecessary padding vars ([ae30e20](https://github.com/vexip-ui/vexip-ui/commit/ae30e20d2d12a90aceb6c88e9f07df0be98a9701))
* **tree:** improve node padding style ([6db9bed](https://github.com/vexip-ui/vexip-ui/commit/6db9bedfa66d036beec7f12b0baed0427b7aece0))
* **utils:** flatTree not init id when nonexists ([e298729](https://github.com/vexip-ui/vexip-ui/commit/e29872966070450c17c28f6882f9c1e6dd662d29))


### Code Refactoring

* **select:** support bind data to options, add key-config prop ([39b261c](https://github.com/vexip-ui/vexip-ui/commit/39b261ce384043767274093b83125d4d7d4d271e))


### Features

* **auto-complete:** add key-config prop ([2ff15cb](https://github.com/vexip-ui/vexip-ui/commit/2ff15cb1a840f30a8e2cdf590874c73917748c3b))
* **auto-complete:** support custom value and label keys ([3a7bfc8](https://github.com/vexip-ui/vexip-ui/commit/3a7bfc80b0fef7ed14fb405855924db1ab2d4a41))
* **button:** add size and type props to ButtonGroup ([1b8ca9c](https://github.com/vexip-ui/vexip-ui/commit/1b8ca9c0d1322fce7783489f583ab6a444efc910))
* **Cascader:** add Cascader component ([#37](https://github.com/vexip-ui/vexip-ui/issues/37)) ([237f3cf](https://github.com/vexip-ui/vexip-ui/commit/237f3cf8232172c920fcca01ce84a0f8ef0f8d69))
* **mixins:** add useSetTimeout and useSetInterval ([44b63e7](https://github.com/vexip-ui/vexip-ui/commit/44b63e7bdb5c31f0d7712cf4f8dcf9535ac581d4))
* **select:** support value-key and label-key props ([2039f25](https://github.com/vexip-ui/vexip-ui/commit/2039f2518d2f7ed177218c99d7a55091fa9135a8))
* **tree:** add key-config prop to config key alias ([2ce3ec7](https://github.com/vexip-ui/vexip-ui/commit/2ce3ec7e07f42532d5b20e425881a075e36f3e09))


### Performance Improvements

* improve for loop memory ([acb10d7](https://github.com/vexip-ui/vexip-ui/commit/acb10d7c6fde619846f4b4b487cf89ce20232592))


### BREAKING CHANGES

* **select:** `value-key` and `label-key` props of Select component
is deprecated and removed, using `key-config` to instead.
* **tree:** `id-key`, `label-key`, `children-key` and `parent-key`
props of Tree component is deprecated and removed, using `key-config`
to instead.



# [2.0.0-beta.5](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2022-06-08)


### Bug Fixes

* **calendar:** index hover background color ([014c904](https://github.com/vexip-ui/vexip-ui/commit/014c90499c2c12d75a22568735a06db762f32269))
* correctly export style files ([c33e29f](https://github.com/vexip-ui/vexip-ui/commit/c33e29f1889ebcc2264a8bdc13d494e631834ba8))
* **locale:** correct calendar week locale ([9e1b25b](https://github.com/vexip-ui/vexip-ui/commit/9e1b25b9bb03e6b18ec970eb8f232b9cafd046a0))
* **masker:** improve disabled style ([0fc78df](https://github.com/vexip-ui/vexip-ui/commit/0fc78dfd8a29e4b8ecabf90824b559f788711151))


### Features

* add Avatar and AvatarGroup components ([#27](https://github.com/vexip-ui/vexip-ui/issues/27)) ([426aa67](https://github.com/vexip-ui/vexip-ui/commit/426aa67958f1b2107e59adf71243c9c6795415e8))



# [2.0.0-beta.4](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-06-07)


### Bug Fixes

* **badge:** adjust defective style ([d99be40](https://github.com/vexip-ui/vexip-ui/commit/d99be402cf5ebdb7ef16c9139290d5535de5928d))
* boolean with other type props ignore default value ([5cf9b12](https://github.com/vexip-ui/vexip-ui/commit/5cf9b12c00515428a48672929110a661f52a674b))
* **calendar:** hover and selected background color ([7789025](https://github.com/vexip-ui/vexip-ui/commit/7789025c800a18d98b323350e7bd466fd35a84c7))
* **confrim:** binding instance to installed app ([bb6dc38](https://github.com/vexip-ui/vexip-ui/commit/bb6dc38818c5d6f45bf80fd5492d846a634cb458))
* **icons:** mark icon components to raw ([2b98f9f](https://github.com/vexip-ui/vexip-ui/commit/2b98f9ff51aa081796724c816778a8c2550f4cee))
* **menu:** incorrect propper style ([dfe9f30](https://github.com/vexip-ui/vexip-ui/commit/dfe9f303703f828f9e2726e072a67b31015980b9))
* **mixins:** assert type for HTMLElement refs ([c4bf386](https://github.com/vexip-ui/vexip-ui/commit/c4bf3866a14d341761ececc97a441c2206ffb398))
* **pagination:** page size count select label ([3375be5](https://github.com/vexip-ui/vexip-ui/commit/3375be51a98802858b7dfa65f21deb5aeffb815c))
* **pagination:** total items display error ([1434bc4](https://github.com/vexip-ui/vexip-ui/commit/1434bc4505eb97522c6efc47034134eb29dd9888))
* **select:** max-list-height not effective ([bc559c7](https://github.com/vexip-ui/vexip-ui/commit/bc559c7662e3c7f3cf3675d714c0ff8b1c2497da))
* **select:** suffix arrow no transition when drop ([a90701d](https://github.com/vexip-ui/vexip-ui/commit/a90701d5c2840e7686e4132dbe31e1d90ce657ba))
* **style:** adjust shadow color in dark theme ([7f34bc0](https://github.com/vexip-ui/vexip-ui/commit/7f34bc01616d2bbed5fa20a0ecc969c0f7cfd7d5))
* **tree:** selected node label background color ([3186024](https://github.com/vexip-ui/vexip-ui/commit/31860241951cb877714e42ba49d69e34170861a4))
* unable to prevent mask close for Modal and Drawer ([332f286](https://github.com/vexip-ui/vexip-ui/commit/332f2869eef817b53265512c58efd619970fc488))


### Features

* **config-provider:** support partial provide config ([#25](https://github.com/vexip-ui/vexip-ui/issues/25)) ([75cbc86](https://github.com/vexip-ui/vexip-ui/commit/75cbc8671df4c8d73c0b659955a98a5a3b5deef9))
* **config:** support internal en-US locale ([2a5b2d3](https://github.com/vexip-ui/vexip-ui/commit/2a5b2d3a84f13197dbfdf1ae2d08156a3e1d7999))
* **progress:** add activated prop ([38b3d7a](https://github.com/vexip-ui/vexip-ui/commit/38b3d7a1ed2ede6305692f4925d68cd47113e490))
* **select:** add static-suffix prop ([862ea5a](https://github.com/vexip-ui/vexip-ui/commit/862ea5a3cb7fcb4a03bab956eefa8e8fc6479eef))
* **spin:** add transition-name prop ([7014d35](https://github.com/vexip-ui/vexip-ui/commit/7014d35469d1238e94a46742c42a43413581326b))
* **upload:** add button-label prop ([5657427](https://github.com/vexip-ui/vexip-ui/commit/5657427af9e44b633ac7f123d76a357a56994685))



# [2.0.0-beta.3](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-06-06)


### Bug Fixes

* **form:** sync FormSubmit and FormReset props to Button ([a9ab65f](https://github.com/vexip-ui/vexip-ui/commit/a9ab65f2647c1e3eabb882e58d193f52d2ba5195))
* **icons:** support export full icons package ([a136d47](https://github.com/vexip-ui/vexip-ui/commit/a136d471957fc85100fef6391970340904023931))
* **modal:** event `ok` rename to `confirm` ([a6610a7](https://github.com/vexip-ui/vexip-ui/commit/a6610a7db19a3a2fa4297dd86e7560ad105a3a31))
* **native-scroll:** scroll event barType to type ([3dce3c7](https://github.com/vexip-ui/vexip-ui/commit/3dce3c79f91e340aacaef578af84cfd0b10f53e8))
* **number-input:** autocomplete prop change type to boolean ([be2f838](https://github.com/vexip-ui/vexip-ui/commit/be2f83809b2c4bfce29508116b11c008a8714e73))
* **radio:** group options prop to string or number array ([56b2e78](https://github.com/vexip-ui/vexip-ui/commit/56b2e78306944fe08423aed8da7a403e85a1c727))
* **select:** label not update when value prop changed ([4c61493](https://github.com/vexip-ui/vexip-ui/commit/4c61493a2008b4ef4bfb63f25e72c60fe50d15b6))
* **split:** remove 	op and ottom slots ([c50515e](https://github.com/vexip-ui/vexip-ui/commit/c50515e649b4083e00d13ac6b8cf3384f7f964bc))
* **tabs:** icon prop of TabPane defautl to null ([a46f173](https://github.com/vexip-ui/vexip-ui/commit/a46f173d7313f4e1fa9b399e5f6991ffdf63844e))
* **tabs:** pane icon prop type should be object ([a409731](https://github.com/vexip-ui/vexip-ui/commit/a409731186df065a172677b5b12d3fc832ad09d9))
* **tag:** content default no wrap ([ef5a1c0](https://github.com/vexip-ui/vexip-ui/commit/ef5a1c0ded6f4ffaa4308715f31dfab4f01651be))
* **tag:** remove built-in transition ([74af492](https://github.com/vexip-ui/vexip-ui/commit/74af4925b4ca388ae3ff5b8d71d83153f99a375b))
* **tree:** controllable slot params ([eb8421e](https://github.com/vexip-ui/vexip-ui/commit/eb8421e628fc534cb36f9ea8430c1f1007573071))


### Features

* **playground:** add action to reset codes ([a91d77b](https://github.com/vexip-ui/vexip-ui/commit/a91d77b8e8e1a1285694a3cd4b69cc617ab4a715))
* **tag:** color prop custom major color, remove border-color prop ([749a7a8](https://github.com/vexip-ui/vexip-ui/commit/749a7a8c331e7a9d6aacf783e2b238618c2d65f0))



# [2.0.0-beta.2](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-06-01)


### Bug Fixes

* missing global types.d.ts ([1a00515](https://github.com/vexip-ui/vexip-ui/commit/1a0051584ad7c1954b69484f513d17f97289ae0a))



# [2.0.0-beta.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2022-06-01)


### Bug Fixes

* adjust component internal button text type ([e0fac63](https://github.com/vexip-ui/vexip-ui/commit/e0fac63bf89777b54efb646e3551bff4ab156183))
* **auto-complete:** can-drop refactor to drop-disabled ([fd2783a](https://github.com/vexip-ui/vexip-ui/commit/fd2783a019fd36707ee432e777f95ab4a45a2295))
* **auto-complete:** drop-disabled default to false ([40469de](https://github.com/vexip-ui/vexip-ui/commit/40469de045fe7ee966d5c58b115a2f408eb20912))
* **auto-complete:** part of options blank when filter ([01c169e](https://github.com/vexip-ui/vexip-ui/commit/01c169e414be241dee71351948624e683afe5165))
* **color-picker:** incorrect marker color when change value ([f63daec](https://github.com/vexip-ui/vexip-ui/commit/f63daec73375948e6baa0a52cad1354343b409b3))
* **dropdown:** add border for dropdown list ([c786b34](https://github.com/vexip-ui/vexip-ui/commit/c786b3457a2f1ddec06d81746ee6ca25e2224dc7))
* **dropdown:** trigger display default to flex ([3242cb4](https://github.com/vexip-ui/vexip-ui/commit/3242cb468e8813aeb905317375a3aa93c1370371))
* **menu:** adjust item padding-left when inside group ([670fd33](https://github.com/vexip-ui/vexip-ui/commit/670fd334cd99fcf7c507696e634908e4f3f78cba))
* **select:** accurately parse option props ([7d8d8cf](https://github.com/vexip-ui/vexip-ui/commit/7d8d8cfcc09ffce7e0b86838050207c0825c20cb))
* **table:** endless loop when using page-size ([e6c2337](https://github.com/vexip-ui/vexip-ui/commit/e6c23375bcc6e66a6153ae5584e1586cafeeec3f))
* **utils:** rename toPascalCase to toCapitalCase ([b0efc84](https://github.com/vexip-ui/vexip-ui/commit/b0efc84ec4f0791af497600550e2cfc1440f726e))
* **utils:** use color name set to check named color ([6e3df86](https://github.com/vexip-ui/vexip-ui/commit/6e3df86433971ff76955c67937131800e90672e0))


### Features

* **breadcrumb:** add options prop to quick set items ([083ed56](https://github.com/vexip-ui/vexip-ui/commit/083ed56ffddb0a8bd37143acc51850c10f0c9b6c))
* **scrollbar:** support custom width and track-color from props ([f2a01c9](https://github.com/vexip-ui/vexip-ui/commit/f2a01c9c9f924408446da753f40c8ffeda8315ab))
* **style:** add --vxp-content-color-third var ([b5b5adc](https://github.com/vexip-ui/vexip-ui/commit/b5b5adc94b71c17a05945805d72193cfb847c128))
* **utils:** add escapeHtml method ([75ee4a9](https://github.com/vexip-ui/vexip-ui/commit/75ee4a956b2d7d69ee500fb508ba37135a1f637f))
* **utils:** add formatByteSize method ([0f2458a](https://github.com/vexip-ui/vexip-ui/commit/0f2458aa6fd8494cfea4feab62420cc0092719d1))



# [2.0.0-beta.0](https://github.com/vexip-ui/vexip-ui/compare/v1.3.1...v2.0.0-beta.0) (2022-05-28)


### Bug Fixes

* **button:** icon only style not effective ([a4d671c](https://github.com/vexip-ui/vexip-ui/commit/a4d671c0b9fd4c4d5488f1609b7962eba6bee20f))
* **button:** use render function to effect dynamic tag ([12b8c00](https://github.com/vexip-ui/vexip-ui/commit/12b8c00dfa07b4d3dbdb505ef21eb00644f02b35))
* **ellipsis:** exactly compare width using bounding rect ([194fd56](https://github.com/vexip-ui/vexip-ui/commit/194fd56fe8e2c3e0634f0b9e9f4a690f8498d295))
* **grid:** correct cell width default behavior ([23a904c](https://github.com/vexip-ui/vexip-ui/commit/23a904cb5858e34bb403ca993649c944c4836ee4))
* **native-scroll:** incorrectly record content offsetWidth ([6cb2d19](https://github.com/vexip-ui/vexip-ui/commit/6cb2d19fe7523fbd684404dad9ee64ac997a468f))
* **scroll:** autoplay cannot start when mounted ([90f1934](https://github.com/vexip-ui/vexip-ui/commit/90f1934708f8efade6b456fc60349d4bfbc696d0))
* **scrollbar:** cannot find wrapper in production mode ([d903b15](https://github.com/vexip-ui/vexip-ui/commit/d903b1573b096866ca9e22809765b9e89ce01e2a))
* stop propagation when dragging only for Table and Tree ([7ca6f53](https://github.com/vexip-ui/vexip-ui/commit/7ca6f53fa6b88c8336850e65998db9963a2219ef))
* **style:** transition-box-shadow rename to transition-shadow ([191f089](https://github.com/vexip-ui/vexip-ui/commit/191f089f55a193b2242e6257a9fc6aade0f9b78f))
* **table:** body height flicker when first render ([aec5cea](https://github.com/vexip-ui/vexip-ui/commit/aec5cea99ab062f64ecee16e95edb51e37c43c1c))
* **table:** incorrect head height and total rows height not reactive ([03d20b3](https://github.com/vexip-ui/vexip-ui/commit/03d20b3c02d3af24dc62118d1b6c9c86a36c6c88))
* **table:** incorrect height when using expand and fixed ([b689578](https://github.com/vexip-ui/vexip-ui/commit/b689578c085d01ba92a6aa804c1e06d0bdf09960))
* **table:** stripe error when using virtual ([d1b3108](https://github.com/vexip-ui/vexip-ui/commit/d1b310897487b0c8cfcdf8d7b69074c078b5e6af))
* **table:** thead and tbody border missing ([acf1a3e](https://github.com/vexip-ui/vexip-ui/commit/acf1a3e46bbf1415fa92c29d4d99b8290e478c04))
* **upload-file:** decoupling the style from Upload class name ([f62a417](https://github.com/vexip-ui/vexip-ui/commit/f62a4174f1c8a22d012077b504e10b1247830be2))
* **utils:** debounceMinor not effective ([0873b28](https://github.com/vexip-ui/vexip-ui/commit/0873b28f5abcc634226d07c99061f34fa81d03a9))
* **utils:** using string schema to process toFixed ([7135f82](https://github.com/vexip-ui/vexip-ui/commit/7135f82bcf7a6314b47285fc240aa70a982ed20b))


### Code Refactoring

* all `beforeXxx` props adjust to `onBeforeXxx` ([2bee7cf](https://github.com/vexip-ui/vexip-ui/commit/2bee7cff0a2935213270657fc929c3e5408285bf))
* all events adjust `on-xxx` to `xxx` ([a684401](https://github.com/vexip-ui/vexip-ui/commit/a684401725e3f85ab79256dab385e01103fd1fbd))
* **button:** support custom color ([06658f7](https://github.com/vexip-ui/vexip-ui/commit/06658f7e8fa20daa05d6b4afb09de25b16bd5bf5))
* icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* add VirtualList and ResizeObserver components ([db0d26c](https://github.com/vexip-ui/vexip-ui/commit/db0d26cb44c16384792ba0a98f69be68dcfcb380))
* **alert:** add manual prop ([a459974](https://github.com/vexip-ui/vexip-ui/commit/a459974640ae9ed99e14a20ebea051b13fb9edbc))
* **button:** add tag and attr-type props ([5e7317e](https://github.com/vexip-ui/vexip-ui/commit/5e7317ef4f82127b085f351821301b06b2ac10af))
* **color:** add mixColor method ([8c7cdda](https://github.com/vexip-ui/vexip-ui/commit/8c7cddaa3d2d4c76c186d8d61156c67d32a7bfb6))
* **grid:** add Grid and Cell components ([#19](https://github.com/vexip-ui/vexip-ui/issues/19)) ([64670fa](https://github.com/vexip-ui/vexip-ui/commit/64670fa983558f38808bebf044222135ce8b2a4f))
* **grid:** add use-flex prop ([01a95a0](https://github.com/vexip-ui/vexip-ui/commit/01a95a0cb72e081a2043522b968f66fa13ee31a6))
* **icons:** sync icons to vue-awesome@4.5.0 ([3f0c915](https://github.com/vexip-ui/vexip-ui/commit/3f0c915a4d5bc97e5fd6a2aa5f028408d0c9b6db))
* **icons:** upgrade to fontawesome v6 ([#23](https://github.com/vexip-ui/vexip-ui/issues/23)) ([6770468](https://github.com/vexip-ui/vexip-ui/commit/67704686ff935e531f3b529c202232ef8fc14a09))
* **mixins:** add useMounted mixin ([a89cdeb](https://github.com/vexip-ui/vexip-ui/commit/a89cdeb61a6eb9c5e7ff0455f017a72d944e5509))
* **mixins:** add useResize mixin ([5d139e3](https://github.com/vexip-ui/vexip-ui/commit/5d139e3cca81bf5803e467fddf56f36befc41765))
* **mixins:** add useVirtual mixin ([01827aa](https://github.com/vexip-ui/vexip-ui/commit/01827aa25611c737d50d9e62b6b98d1e951abd6e))
* **playground:** support runtime toggle dark theme ([51c6b44](https://github.com/vexip-ui/vexip-ui/commit/51c6b447e9abdace90635e1c0da86df940f2a041))
* **row:** add column-flex prop ([42312ec](https://github.com/vexip-ui/vexip-ui/commit/42312ec6ccb7efd1c6069debdbb992424dc6b988))
* **style:** add built in dark theme ([#24](https://github.com/vexip-ui/vexip-ui/issues/24)) ([e388387](https://github.com/vexip-ui/vexip-ui/commit/e38838720a730f64af3a0e22bc7149d829b0d7e7))
* **style:** transfer to use css vars ([#20](https://github.com/vexip-ui/vexip-ui/issues/20)) ([76bef3e](https://github.com/vexip-ui/vexip-ui/commit/76bef3e393e6c366bc0b90b1b980844ddb4d8dae))
* support virtual scroll for Select and AutoComplete ([30dba08](https://github.com/vexip-ui/vexip-ui/commit/30dba084ec0b9b866327b69498f3f98f35f3032f))
* **table:** add clearSelected method ([1b3d75e](https://github.com/vexip-ui/vexip-ui/commit/1b3d75e545950ae665dc09ee38d44605fd80dd18))
* **table:** add singleSorter and singleFilter props ([b477a61](https://github.com/vexip-ui/vexip-ui/commit/b477a61797e80c7b74b246b6d821787e658331d0))
* **table:** emit on-row-sort event ([e5306cc](https://github.com/vexip-ui/vexip-ui/commit/e5306ccca2b8821ddb22b3fbce79d5102d8fc7c1))
* **table:** export clearSort and clearFilter methods ([6202825](https://github.com/vexip-ui/vexip-ui/commit/620282563ae8e28c3c123488ee7ee684ac47050f))
* **table:** support virtual rendering rows ([5479c12](https://github.com/vexip-ui/vexip-ui/commit/5479c12dc490462f2ec0c7ceb221fa0d7ddb858d))
* **upload:** add isDragOver prop to default slot ([1a0020a](https://github.com/vexip-ui/vexip-ui/commit/1a0020afa949abfd32a7cba7955ee6b2a07e2ac8))
* **upload:** export UploadList and UploadFile components ([8b6ced2](https://github.com/vexip-ui/vexip-ui/commit/8b6ced29dcf97e15bda356bf4d4203e6ac0db55c))
* **upload:** support upload directories and only-dary mode ([042d6db](https://github.com/vexip-ui/vexip-ui/commit/042d6db4e9bbe1b0a075b1a25af25fb33689741b))
* **utils:** add adjustAlpha method ([107023a](https://github.com/vexip-ui/vexip-ui/commit/107023a83edb7abec8461bcc433cae79f8c83c91))
* **utils:** add createBITree method ([dbf76b2](https://github.com/vexip-ui/vexip-ui/commit/dbf76b2116e9ca59ce05afa09b06691b2703a2ff))
* **utils:** add debounceFrame, nextTickOnce and nextFrameOnce ([7204479](https://github.com/vexip-ui/vexip-ui/commit/7204479082899bdfe28bd5ac93aba9b430e49a32))
* **utils:** add isBigInt function ([259a990](https://github.com/vexip-ui/vexip-ui/commit/259a990e73091bfcc9bfbfe9c8a55fafeece22db))


### Performance Improvements

* **table:** optimize scrolling performance ([3f96507](https://github.com/vexip-ui/vexip-ui/commit/3f96507b1b009e2de876a19e65cb6f53715a8550))
* **table:** optimize virtual scroll by BITree ([46e7ac5](https://github.com/vexip-ui/vexip-ui/commit/46e7ac5bb3efc9686b7962c759f045a76d7817fa))


### BREAKING CHANGES

* Using `onBeforeXxx` to replace `beforeXxx` props, the
purpose is to support `@beforeXxx` alias to bind callback.
* All component events are removed the `on` prefix,
currently using `@xxx` to replace `@on-xxx`, its purpose is to better
bind events in t/jsx (no `onOnXxx`).
* **button:** extract text and dashed types as props from Button component,
text-color prop has removed, using color prop to customize the button.
* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.
* **style:** All scss variables in components have been removed, all preset scss variables in 
`design/variables.scss` have removed the `vxp-` prefix and change to use scss map to define. All 
style imports in scss are currently using `@use` and `@forward`, do not use `@import` to import 
styles anymore.



## [1.3.1](https://github.com/vexip-ui/vexip-ui/compare/v1.3.0...v1.3.1) (2022-04-19)


### Bug Fixes

* export Hightlight and NativeScroll components ([55ab1c7](https://github.com/vexip-ui/vexip-ui/commit/55ab1c71bd1073b79b68706a28d985e43d7c2194))
* **native-scroll:** refresh content size when observer callback ([ff2a732](https://github.com/vexip-ui/vexip-ui/commit/ff2a7326bf14b8c8159a48a49bf65538760181e7))
* **native-scroll:** stop wheel event propagation when can scroll ([d13b4d6](https://github.com/vexip-ui/vexip-ui/commit/d13b4d6912a63ca1f99d1d241164fcbae1f74353))
* **native-scroll:** unable to scroll after call scroll api mathods ([bca3d51](https://github.com/vexip-ui/vexip-ui/commit/bca3d5181d74036face7fe4ff990581d36bd86f0))
* **native-scroll:** unexpected reset scroll when content style change ([dabbd49](https://github.com/vexip-ui/vexip-ui/commit/dabbd49b4e66400e20340a84234c08527202b40a))
* **scrollbar:** unexpected show track when use-track not true ([6bf2dda](https://github.com/vexip-ui/vexip-ui/commit/6bf2dda3f1b6e0a40777e0059b4f20b4c77ad957))
* **scrollbar:** use-track should default false ([d6f8e6c](https://github.com/vexip-ui/vexip-ui/commit/d6f8e6ca444fd163b6c460c2772c86c5c61f843a))


### Features

* add use-bar-track prop to Scroll and NativeScroll ([59c94f8](https://github.com/vexip-ui/vexip-ui/commit/59c94f82226e3f4ae722916eacb14b9ae5390a33))
* **calendar:** add header, title and week slots ([340194a](https://github.com/vexip-ui/vexip-ui/commit/340194aca45ba656a211a019350061743150252b))


### Performance Improvements

* **tooltip:** no render tip elements when disabled ([6a7a50d](https://github.com/vexip-ui/vexip-ui/commit/6a7a50de1c78706d8add1d6c3d3cc2e51ae79cda))



# [1.3.0](https://github.com/vexip-ui/vexip-ui/compare/v1.2.1...v1.3.0) (2022-04-18)


### Bug Fixes

* **auto-complete:** no options rendered when null value ([49af9d4](https://github.com/vexip-ui/vexip-ui/commit/49af9d4d66d909a4035e27be2ecebb9ea5445f26))
* **date-picker:** cannot parse number value in date type ([0b0e3a7](https://github.com/vexip-ui/vexip-ui/commit/0b0e3a7eb7a09ef1cb43ea7fec6b897bd9250dd0))
* **date-picker:** disabled-date prop not work ([6496175](https://github.com/vexip-ui/vexip-ui/commit/6496175ba037d741237cea7500772fa9b4d62db3))
* **date-picker:** format should ignore content in quotations ([31d7f16](https://github.com/vexip-ui/vexip-ui/commit/31d7f1689a1229582f6f2a71ae80e47d63011ac8))
* **linker:** vertical align should inherit parent ([9943e5e](https://github.com/vexip-ui/vexip-ui/commit/9943e5ed39d0a4cf5b225050eae3919a8675159a))
* **modal:** header slot is not effective ([2af3df6](https://github.com/vexip-ui/vexip-ui/commit/2af3df6cd6e9eca5919860cebb08c26494ba9dff))
* **modal:** use offset value to compute position ([07d0dc6](https://github.com/vexip-ui/vexip-ui/commit/07d0dc64bad7c8f097447d9b5d481f5d9727a4c2))
* **number-input:** should not format when inputting ([0f58739](https://github.com/vexip-ui/vexip-ui/commit/0f5873906424b07bfd9b72daf94479316871f4d7))
* **spin:** mask add default z-index ([943f3c6](https://github.com/vexip-ui/vexip-ui/commit/943f3c6d35a2585d7df4580360dd6222c5e124ad))
* **table:** disableRow should base on rendered rows ([c483386](https://github.com/vexip-ui/vexip-ui/commit/c4833864ec96d9d5fc9deee4f8a1f9eeb80691b3))
* **table:** row check all event add partial param ([a9cc1c5](https://github.com/vexip-ui/vexip-ui/commit/a9cc1c5e9acd665cc576da10f5d8d8856fc2b49e))
* **table:** row check all event add partial param ([7d7bede](https://github.com/vexip-ui/vexip-ui/commit/7d7bede86701fb534c57b974e3268c981f1b3aaf))
* **tree:** incorrect variable usage when get id map ([c94714e](https://github.com/vexip-ui/vexip-ui/commit/c94714ed08294b208af320e61921e1247543d491))
* **tree:** root-id prop not effective ([7494291](https://github.com/vexip-ui/vexip-ui/commit/74942916e542163855195e209c2059d11db33dbd))
* **tree:** use id-node map when update data ([8d5d843](https://github.com/vexip-ui/vexip-ui/commit/8d5d843572a44fa4c546959bd8fb70496b70a91a))
* **utils:** incorrect matching rootId in tree transform ([4e9d253](https://github.com/vexip-ui/vexip-ui/commit/4e9d2537170761d3a29cdcec63f5443fdb002c95))


### Features

* **calendar:** add Calendar component ([495e6b4](https://github.com/vexip-ui/vexip-ui/commit/495e6b49168cf1ae8647b5231f060eb383ec96d6))
* **ellipsis:** add tip-max-width prop ([32254d5](https://github.com/vexip-ui/vexip-ui/commit/32254d549fa3d3e48e610bab8b03da01c6924c05))
* **form:** add hide-label prop ([08f65ff](https://github.com/vexip-ui/vexip-ui/commit/08f65ff5407db7932660468ba6a6e92bc2208724))
* **form:** form actions add before hook prop ([2b31f25](https://github.com/vexip-ui/vexip-ui/commit/2b31f25520f27ac8e313bee9aa137bf6193ebbca))
* **form:** form item add action type prop ([e85baf2](https://github.com/vexip-ui/vexip-ui/commit/e85baf2cc7c49f29d592412ce97e450e5a4cd8a2))
* **highlight:** add Highlight component ([901a5ad](https://github.com/vexip-ui/vexip-ui/commit/901a5ad7a10325f630961178df839317984493b8))
* **native-scroll:** add NativeScroll component ([68bfe20](https://github.com/vexip-ui/vexip-ui/commit/68bfe20441dede8152ecc3c10d58ce8f8dc09139))
* **playground:** add vexip-ui playground ([#16](https://github.com/vexip-ui/vexip-ui/issues/16)) ([989a2c7](https://github.com/vexip-ui/vexip-ui/commit/989a2c7d99d565d107aba6ecf8d9a78c675095e9))
* **scrollbar:** add appear prop ([743483c](https://github.com/vexip-ui/vexip-ui/commit/743483ca3ce131bdc4ca6bdd2e76d70541198e6e))
* **scrollbar:** add use-track and track-speed props ([2820c77](https://github.com/vexip-ui/vexip-ui/commit/2820c777b855462b5d1c2da0e3e7f8f77b06f614))
* **spin:** add Spin component ([784605c](https://github.com/vexip-ui/vexip-ui/commit/784605ce4d087cb55af2d8ba2263b66b7be03e32))
* **table:** add tooltip-width and column's no-ellipsis props ([b95e59d](https://github.com/vexip-ui/vexip-ui/commit/b95e59dc9a0f2e03efbb47dc5bfccbcdcc4723be))
* **tree:** add cache-node and root-id props ([13e721e](https://github.com/vexip-ui/vexip-ui/commit/13e721eb3ff2072ec90c1c38ea82a2c751793c76))
* **tree:** export parseAndTransformData method ([dc5a1e3](https://github.com/vexip-ui/vexip-ui/commit/dc5a1e3e0ff4d6bd6c5de17e1afb904624bd99b5))



## [1.2.1](https://github.com/vexip-ui/vexip-ui/compare/v1.2.0...v1.2.1) (2022-01-14)


### Bug Fixes

* **tree:** incorrect expanded when using asyncLoad ([31c3ba5](https://github.com/vexip-ui/vexip-ui/commit/31c3ba509ab5c3c57a9a04e84a8cb806ff6389d7))



# [1.2.0](https://github.com/vexip-ui/vexip-ui/compare/v1.1.3...v1.2.0) (2022-01-07)


### Bug Fixes

* **config:** global defaults config no effective ([6eba983](https://github.com/vexip-ui/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
* **date:** limit range values starkly in modification ([68cc1c8](https://github.com/vexip-ui/vexip-ui/commit/68cc1c8b64d54ff0bb218104d626e6eed86d14cc))
* install options should be optional ([0934c3c](https://github.com/vexip-ui/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
* support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/vexip-ui/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))
* **table:** no recalculate when add rows ([741400e](https://github.com/vexip-ui/vexip-ui/commit/741400e112bf4437d47c7ed6898956a08a230021))


### Features

* add judge method for Message and Notice ([cb4062b](https://github.com/vexip-ui/vexip-ui/commit/cb4062b36096162b519b5a853726a259c4dd46a9))
* add locale config ([0a0ec74](https://github.com/vexip-ui/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **form:** support native html form submit ([497c3e3](https://github.com/vexip-ui/vexip-ui/commit/497c3e3115632c09bcb10ac9c9d98aa334b61547))
* **table:** add row enter and leave events ([b9fb4c2](https://github.com/vexip-ui/vexip-ui/commit/b9fb4c21e61d739ec4fd2b69a8ac1363d545c244))


### BREAKING CHANGES

* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



## [1.1.3](https://github.com/vexip-ui/vexip-ui/compare/v1.1.2...v1.1.3) (2021-10-20)


### Bug Fixes

* **checkbox:** only use margins within group ([22d3d9e](https://github.com/vexip-ui/vexip-ui/commit/22d3d9e80a7a254b72ccc5ef08732c6098cc41d5))
* **table:** incorrect height when using height prop ([d5143ac](https://github.com/vexip-ui/vexip-ui/commit/d5143accb4c243a2910c2693485408bd61cabe8e))


### Features

* **ellipsis:** add ellipsis component ([1fefc1b](https://github.com/vexip-ui/vexip-ui/commit/1fefc1b1546db69299952d957e15de842f89eab8))
* **select:** show empty text without any option ([5efe942](https://github.com/vexip-ui/vexip-ui/commit/5efe942b9ee6e075799501bbbc5a46c08a8a3304))
* **table:** add ellipsis tooltip for long content ([270df96](https://github.com/vexip-ui/vexip-ui/commit/270df9667e90455f7c6e6915286e78f742cd62b0))
* **table:** show empty text without any row ([ecb0ee7](https://github.com/vexip-ui/vexip-ui/commit/ecb0ee773e50efc00bbf6fb56c1420fe913e32d5))



## [1.1.2](https://github.com/vexip-ui/vexip-ui/compare/v1.1.1...v1.1.2) (2021-07-19)


### Bug Fixes

* **table:** effect expandRenderer prop ([857af57](https://github.com/vexip-ui/vexip-ui/commit/857af572b0ede815727aaf51222ec12dfc48b412))
* **table:** scroll height incorrect ([66f4804](https://github.com/vexip-ui/vexip-ui/commit/66f48046b506ba11065ce046bc463c37ec6caef4))


### Code Refactoring

* select and auto-complete no longer depend on input ([4c6af54](https://github.com/vexip-ui/vexip-ui/commit/4c6af54d09d918fb948cce3e0e459cf1777398e7))


### Features

* **select:** add multiple and option-check props ([da2f78a](https://github.com/vexip-ui/vexip-ui/commit/da2f78a0b234d8d0a7064e77374e230c3a9bf073))
* **tag:** add circle prop ([f2e0cf2](https://github.com/vexip-ui/vexip-ui/commit/f2e0cf2457272b5c3eeef102051e609454d96331))
* **tag:** add size prop ([79c5290](https://github.com/vexip-ui/vexip-ui/commit/79c5290d9223d189379019cad637d0efb3d0115c))


### BREAKING CHANGES

* select remove on-focus and on-blur events



## [1.1.1](https://github.com/vexip-ui/vexip-ui/compare/v1.1.0...v1.1.1) (2021-07-12)


### Bug Fixes

* **alert:** icon misplaced when no title ([8fd2f7d](https://github.com/vexip-ui/vexip-ui/commit/8fd2f7db9f6122e69f32dd64f7fdfbee34f6b03a))
* **badge:** title attr error when no content ([5bb6a86](https://github.com/vexip-ui/vexip-ui/commit/5bb6a86732c5f3c955c8360902350ba33b461185))
* **button:** missing simple class name ([4e91993](https://github.com/vexip-ui/vexip-ui/commit/4e91993ba3aa6fb740cdd55631aa797e44709f46))
* **color-picker:** cannot parse rgba color value ([8f4c57f](https://github.com/vexip-ui/vexip-ui/commit/8f4c57f4cf2c4ba4ab1b2f6f07f46209b1ff8b82))
* **date-picker:** clear should trigger change event ([1b1fec5](https://github.com/vexip-ui/vexip-ui/commit/1b1fec53d41afa430848dc983001ac7b565e9905))
* **date-picker:** intuitively update activated ([f4c9efb](https://github.com/vexip-ui/vexip-ui/commit/f4c9efb1f44cb4a416e2616f0be3ae384f5ae3c9))
* **input:** add ::placeholder color style ([54ce94b](https://github.com/vexip-ui/vexip-ui/commit/54ce94be7a595ec3065f78804a6133fa30c3f095))
* **masker:** closable not work without beforeClose ([77b00c0](https://github.com/vexip-ui/vexip-ui/commit/77b00c09f7225eb07fc25b028f8ca248bd65a515))
* **progress:** progress tip display error ([22eb709](https://github.com/vexip-ui/vexip-ui/commit/22eb709a681cbbdb5fb5861a137cfbb3f979aa85))
* **scroll:** start autoplay when mounted ([5d6dfa6](https://github.com/vexip-ui/vexip-ui/commit/5d6dfa6f84e06107344e7d9d9272635f69d45061))
* **slider:** error value when step is not 1 ([4c2b2b9](https://github.com/vexip-ui/vexip-ui/commit/4c2b2b996d6b4611ecdc117375d009a34d879b8b))
* **time-picker:** clear should trigger change event ([92e9ba7](https://github.com/vexip-ui/vexip-ui/commit/92e9ba7e573ae924e911cd2361613b42e9195981))


### Features

* **checkbox:** remove bindGroup api ([5b3aafa](https://github.com/vexip-ui/vexip-ui/commit/5b3aafaddda1c0130a5db50cad2ae58d35e9ed7a))
* **table:** add defineColumns helper ([10d3a8d](https://github.com/vexip-ui/vexip-ui/commit/10d3a8d45f8a24d7b02f04d64aa015c886a4a1ea))


### BREAKING CHANGES

* **checkbox:** no longer support bindGroup api



# [1.1.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.3...v1.1.0) (2021-07-08)


### Bug Fixes

* **dropdown:** flush nested drop first item ([3992b7f](https://github.com/vexip-ui/vexip-ui/commit/3992b7f20d5a5a93e400dec123b787fb73a36d81))
* **dropdown:** item position relative incorrect divider ([53f1f91](https://github.com/vexip-ui/vexip-ui/commit/53f1f91715088e9a3e8b3e912585618f3c4edcda))
* **dropdown:** nested drop should not toggle select ([ece9d4e](https://github.com/vexip-ui/vexip-ui/commit/ece9d4eaeca646681781f851c9d77cd14e46cb9d))
* **popper:** watch wrapper and popper el change ([4fb0ca5](https://github.com/vexip-ui/vexip-ui/commit/4fb0ca568322df5b2046b5f985337f8dc78ef381))
* **table:** export refresh api ([f0dab34](https://github.com/vexip-ui/vexip-ui/commit/f0dab34f02b9d28d968674bb1d58e6a09ac6c08d))
* **table:** incorrect row count of data change ([7af4d5a](https://github.com/vexip-ui/vexip-ui/commit/7af4d5a2a90d573ad4ae370e1b3b820b2bc41fd1))


### Features

* add contextmenu component ([#13](https://github.com/vexip-ui/vexip-ui/issues/13)) ([1571dc3](https://github.com/vexip-ui/vexip-ui/commit/1571dc34d4830a1a515c15378bf7b7db3e72219b))
* **dropdown:** add appear prop ([e230054](https://github.com/vexip-ui/vexip-ui/commit/e230054a585141d9b88901f65589dbf5578b8890))
* **loading:** create global loading component ([caedc67](https://github.com/vexip-ui/vexip-ui/commit/caedc67a883cd0f1683612e25d71d4f0e279480d))
* **tag:** add build in color type ([02fd360](https://github.com/vexip-ui/vexip-ui/commit/02fd36026fec4de39349252b0fa03dde4aa820ca))
* **tag:** add simple style tag ([b316888](https://github.com/vexip-ui/vexip-ui/commit/b3168886ea40f6cbaa3a83ea8278ed5d89d8c953))
* **time-ago:** add time-ago component ([b639c2e](https://github.com/vexip-ui/vexip-ui/commit/b639c2eb13c62b00d72010cc4c30328d09b2835a))


### Performance Improvements

* **scrollbar:** use transform replace top and left ([5a0e272](https://github.com/vexip-ui/vexip-ui/commit/5a0e2721ce54beb4b203013db19301d732c34f39))



## [1.0.3](https://github.com/vexip-ui/vexip-ui/compare/v1.0.2...v1.0.3) (2021-06-26)


### Bug Fixes

* **input:** no emit on-clear event ([64ca93f](https://github.com/vexip-ui/vexip-ui/commit/64ca93f507fb5628f91e977d1154687bfe736ceb))
* **input:** should not clearable when disabled ([6b58a0c](https://github.com/vexip-ui/vexip-ui/commit/6b58a0cfcb43c22245c7e031ac591e945be6bb10))
* **number-input:** support clearable and on-clear ([ebb8235](https://github.com/vexip-ui/vexip-ui/commit/ebb8235f742c3237634fdd6704071992dc664c2a))


### Performance Improvements

* **progress:** using transfrom to improve performance ([7ba3d8d](https://github.com/vexip-ui/vexip-ui/commit/7ba3d8db07cb32d1e3e65cd9a2e6ca38ac49c05b))



## [1.0.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.1...v1.0.2) (2021-06-25)


### Bug Fixes

* **dropdown:** add dropClass prop ([46a9ccf](https://github.com/vexip-ui/vexip-ui/commit/46a9ccf3bb3bd7b5bf025cda9857563225577c63))
* **dropdown:** set placement prop not work ([9bd32e8](https://github.com/vexip-ui/vexip-ui/commit/9bd32e81116a5d27aa85892fab14aaef5f144cd1))
* **dropdown:** support v-model:vivisble ([cfbf2dc](https://github.com/vexip-ui/vexip-ui/commit/cfbf2dcac7944df95e745ac097151b6836078478))
* **tab-nav:** card style order in using router ([825c7db](https://github.com/vexip-ui/vexip-ui/commit/825c7db18238617fcb55f981a79ae0ac3e705952))



## [1.0.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0...v1.0.1) (2021-06-17)


### Bug Fixes

* **button:** style order in using router ([421512e](https://github.com/vexip-ui/vexip-ui/commit/421512e88972ace7f57b1d03641e9d7b94220780))



# [1.0.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.3...v1.0.0) (2021-06-10)


### Bug Fixes

* **message:** config placement not effective ([85fd771](https://github.com/vexip-ui/vexip-ui/commit/85fd771d3c1e3f6bc1c57db69c418ab433f9c58f))
* **notice:** config placement not effective ([833933b](https://github.com/vexip-ui/vexip-ui/commit/833933b26c26f061fedacee76b576daac067c330))


### Features

* **collapse-transition:** add mode and timing props ([9fe1862](https://github.com/vexip-ui/vexip-ui/commit/9fe1862045530a20b4c84156e78ca0b890d6b76b))
* **message:** add property config to install options ([be64ae3](https://github.com/vexip-ui/vexip-ui/commit/be64ae3699f6915b8124f3e7639c8f7ada2d0174))



# [1.0.0-beta.3](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-06-09)


### Bug Fixes

* **message:** install global property name ([af21d31](https://github.com/vexip-ui/vexip-ui/commit/af21d31867d3679a2d86b2fdbc519d0f421ecbb1))



# [1.0.0-beta.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-06-05)


### Bug Fixes

* **style:** relate style for import-on-demand ([194f32b](https://github.com/vexip-ui/vexip-ui/commit/194f32b6fda7264a52da9835faae8d4dd0875282))



# [1.0.0-beta.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2021-06-05)


### Bug Fixes

* **auto-complete:** hitting wrong after filter options ([7317ed6](https://github.com/vexip-ui/vexip-ui/commit/7317ed6848484505a3c61fa2f0cc2d9b60d84e4b))
* **masker:** transfer prop has no effect ([fd2173e](https://github.com/vexip-ui/vexip-ui/commit/fd2173e1c45599305d8e8abda0a93d423e222cd6))


### Features

* **scroll:** add on-ready event ([288ec9a](https://github.com/vexip-ui/vexip-ui/commit/288ec9abcc7a40374b5e788f89b89ec275a1124d))
* **table:** add filter and column define helpers ([5e85594](https://github.com/vexip-ui/vexip-ui/commit/5e855944082094e6509e9bed6ad3abf52efd8e03))



# [1.0.0-beta.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.4...v1.0.0-beta.0) (2021-06-03)


### Bug Fixes

* **checkbox-group:** sync value when values porp change ([1bdaa9f](https://github.com/vexip-ui/vexip-ui/commit/1bdaa9ff4d3ffa746f1c22222c851761be51685c))
* **date-picker:** calendar pane focus on selected date ([6a61c99](https://github.com/vexip-ui/vexip-ui/commit/6a61c9947df68e2ade844ec8a74a3111160eba73))
* **date-picker:** incorrect item display when range select year and month ([55ccf76](https://github.com/vexip-ui/vexip-ui/commit/55ccf7660dad24030ddefff6669c305066e34f51))
* **date-picker:** supply labels prop, includes time picker ([3cd5735](https://github.com/vexip-ui/vexip-ui/commit/3cd57352454998d77eb56c0a341dadcbeacdffec))
* **icon:** adjust default size about 1.05x ([ce90294](https://github.com/vexip-ui/vexip-ui/commit/ce902949ef1d193d80f2c58d67ee9cc635678875))
* **menu:** menu list margin set to 0 ([9ddab57](https://github.com/vexip-ui/vexip-ui/commit/9ddab5789ac42af1491a1797433f62c2bd4b276e))
* **select:** visible not to false when option v-for ([7208f42](https://github.com/vexip-ui/vexip-ui/commit/7208f42c69f5102f103f1cbf3387d27d1f029e09))
* **table:** column width incorrect width multiple talbe ([6fb8f65](https://github.com/vexip-ui/vexip-ui/commit/6fb8f65c7a122c6574dc85d5222cd9526ec3b4e1))
* **tree:** arrow transform act at icon svg ([14b53cc](https://github.com/vexip-ui/vexip-ui/commit/14b53ccfd6ee609aff66ac556f51a1080e374b26))


### Features

* **textarea:** add control state style ([e8d6bfc](https://github.com/vexip-ui/vexip-ui/commit/e8d6bfc6b6ee3fc141fa42620e6458856b9e0f86))



# [1.0.0-alpha.4](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.2...v1.0.0-alpha.4) (2021-05-29)


### Bug Fixes

* **animation:** lose spin animation ([dd72b56](https://github.com/vexip-ui/vexip-ui/commit/dd72b564393fbd9600a9eef2f0a74b90d4029cc9))
* **button:** loading icon missing collapse transion ([f713351](https://github.com/vexip-ui/vexip-ui/commit/f713351aa9dea125bcd6d04e1589588bcc3199b9))
* **collapse-transition:** appear props ([46a09b5](https://github.com/vexip-ui/vexip-ui/commit/46a09b521caf1996b0b080ad18bd167b6448e293))
* **menu:** can not support horizontal mode ([d7b9b38](https://github.com/vexip-ui/vexip-ui/commit/d7b9b38b48fa44eb0c6562387f029ef2dc4ad0b9))
* **portal:** render teleport after mounted next tick ([8971a9b](https://github.com/vexip-ui/vexip-ui/commit/8971a9b493056e212c3da1043008ec339be69114))
* **scroll:** ensure wrapper and content element ([6e0f0de](https://github.com/vexip-ui/vexip-ui/commit/6e0f0deeec7c27d0224869b4a324779858ea4d78))
* **scss:** themes at import use relative path ([f283e68](https://github.com/vexip-ui/vexip-ui/commit/f283e68986a35a93b6ee7ec75cc12a3e2e2a19c4))



# [1.0.0-alpha.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-05-29)


### Bug Fixes

* complete missing components export ([cb88cf9](https://github.com/vexip-ui/vexip-ui/commit/cb88cf96056c87a77711b98898c415d54adac577))



# [1.0.0-alpha.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-05-28)



# 1.0.0-alpha.0 (2021-05-27)



## [2.1.26](https://github.com/vexip-ui/vexip-ui/compare/v2.1.25...v2.1.26) (2023-07-03)


### Bug Fixes

* **message:** improve default type border style ([3ef56d9](https://github.com/vexip-ui/vexip-ui/commit/3ef56d9d31835ae7222c6a01ea57b09f0ba5c230))
* **modal:** ensure effect position calculate when hide mask ([0bccd9b](https://github.com/vexip-ui/vexip-ui/commit/0bccd9bde6bae27ad648f4f16a69917d65317297))
* **notice:** improve default type border style ([5e238e1](https://github.com/vexip-ui/vexip-ui/commit/5e238e119efd035569975b0346345a6c1900702f))
* **option:** improve to without title by default, support custom ([3ca9b67](https://github.com/vexip-ui/vexip-ui/commit/3ca9b67e5e0c78e5be59c9ca94bec7d53b35837b))
* **tab-nav:** marker not update when manully change active ([2356a44](https://github.com/vexip-ui/vexip-ui/commit/2356a44b7c3e90fa6244136fceac9c135a699bf5))
* **textarea:** improve overflow-y to auto ([5407d11](https://github.com/vexip-ui/vexip-ui/commit/5407d111c32a6593c9ca33d08403f11c29e0f099))
* **virtual-list:** unexpected style not be merged ([53c02d5](https://github.com/vexip-ui/vexip-ui/commit/53c02d5c2a7b07cd2d68051e86eb3b329fa520b5))



## [2.1.25](https://github.com/vexip-ui/vexip-ui/compare/v2.1.24...v2.1.25) (2023-06-21)


### Bug Fixes

* **modal:** should responsive when no draggable or resizable ([bf5b646](https://github.com/vexip-ui/vexip-ui/commit/bf5b6462a86bfe4343501c3fea7bef852acea3eb))
* **native-scroll:** deprecated on-before-scroll prop ([7e2062d](https://github.com/vexip-ui/vexip-ui/commit/7e2062de5cd1b477440505dbc5602c6284e8c64a))
* **table:** add missing foot cell style ([cc7a12d](https://github.com/vexip-ui/vexip-ui/commit/cc7a12d159afcaf160a1ed592c29b70c92d27782))
* **table:** ensure refresh all horizontal scrolls ([00a54a4](https://github.com/vexip-ui/vexip-ui/commit/00a54a4404e303f17a2c240781f573d954fedaa3))
* **table:** ensure refresh vertical scrollbar when data changed ([9ffeab8](https://github.com/vexip-ui/vexip-ui/commit/9ffeab864ecef568d64362260da9ace9e6c312e1))
* **table:** incorrect fixed columns width calculate ([39e2ee3](https://github.com/vexip-ui/vexip-ui/commit/39e2ee394cd83ca6a7095a6dee22901ceefa315c))
* **table:** infinite watch when dynamically render columns ([d134812](https://github.com/vexip-ui/vexip-ui/commit/d1348123875b7dd1adc00e70a252e8a183587577))
* **table:** missing right border when merging cells ([16550b9](https://github.com/vexip-ui/vexip-ui/commit/16550b95f6589b0a53bf4137c9153ff6a7425a7a))


### Features

* **auto-complete:** add debounce and delay props ([12ae1af](https://github.com/vexip-ui/vexip-ui/commit/12ae1af4733b5d747519bd82ed03cf1564acb5d4))
* **contextmenu:** support set renderer for each menu ([e29c538](https://github.com/vexip-ui/vexip-ui/commit/e29c5385a9fdd96676684b51d0033a28a288f5ff))
* **input:** support custom input throttle or debounce delay ([f220e82](https://github.com/vexip-ui/vexip-ui/commit/f220e8260f0ea2b913f29b6617c9630b7cf1625c))
* **number-input:** support custom input throttle or debounce delay ([274f906](https://github.com/vexip-ui/vexip-ui/commit/274f906a45de029b5f7392900590a83a7418cd7e))
* **renderer:** support store variables and resue them via slot ([322cb6e](https://github.com/vexip-ui/vexip-ui/commit/322cb6e4a01790a6078dc611a16a7bedcbc173d1))
* **textarea:** support custom input throttle or debounce delay ([d0cc62c](https://github.com/vexip-ui/vexip-ui/commit/d0cc62cdbaab53d205a207fb7f361774053c5467))
* **utils:** toFixed supports scientific notation ([62485f7](https://github.com/vexip-ui/vexip-ui/commit/62485f74f01bfe330317df0e9b3e4a5c21515681))


### Performance Improvements

* **table:** improve table horizontal scroll performance ([9916a44](https://github.com/vexip-ui/vexip-ui/commit/9916a4406f213c32229eb34179cf1b38b1882719))



## [2.1.24](https://github.com/vexip-ui/vexip-ui/compare/v2.1.23...v2.1.24) (2023-06-13)


### Bug Fixes

* adjust `update:` events emitted order ([#388](https://github.com/vexip-ui/vexip-ui/issues/388)) ([b6d826b](https://github.com/vexip-ui/vexip-ui/commit/b6d826b0c1bd4ebeb08a59e03fb1a40ec6c8e9f9))
* **anchor:** effect working with window scroll ([d1cb5b6](https://github.com/vexip-ui/vexip-ui/commit/d1cb5b684d3b6b02ab5b33f6bea400fddbae83c8))
* **anchor:** incorrect track-color-active variable ([#378](https://github.com/vexip-ui/vexip-ui/issues/378)) ([4e14a6a](https://github.com/vexip-ui/vexip-ui/commit/4e14a6a1815e86d7a5cf36c02ec5805c69830115))
* **drawer:** remove internal --vxp-drawer-hanlder-offset variable ([7c32a6a](https://github.com/vexip-ui/vexip-ui/commit/7c32a6abe22c64ea09bfc51f1892f740cc59ae6e))
* enable hardware acceleration for masker, modal, drawer ([2f99288](https://github.com/vexip-ui/vexip-ui/commit/2f992885581507635ea24d83436edce856e325d6))
* **layout:** ensure emit resize event in fit-window ([b634de5](https://github.com/vexip-ui/vexip-ui/commit/b634de53b6a78bc6400dd50edf7b01accb4c285d))
* **pagination:** center page items missing title ([5135a87](https://github.com/vexip-ui/vexip-ui/commit/5135a8751d2a06d99d5d8d0d648926136a1d3635))
* **radio:** normalize button and border type style ([24cb6c0](https://github.com/vexip-ui/vexip-ui/commit/24cb6c000a983cf7dc7838dbd59255d60bd2a020))
* **tab-nav:** incorrect active content border style ([2f6d78d](https://github.com/vexip-ui/vexip-ui/commit/2f6d78dbba88daf4ff5d52f3b7c7ce7a740ccd54))


### Code Refactoring

* **table:** rename `meta-data` prop to `meta` ([6f03cf1](https://github.com/vexip-ui/vexip-ui/commit/6f03cf1cce27cfe5e7ca7c80c81b3c2060e77c23))


### Features

* **config-provider:** support specify the scope theme ([1f5387b](https://github.com/vexip-ui/vexip-ui/commit/1f5387b61c38253c77fe119cf7f89def8befd770)), closes [#380](https://github.com/vexip-ui/vexip-ui/issues/380)
* **layout:** add fit-window prop ([d610f36](https://github.com/vexip-ui/vexip-ui/commit/d610f36286e5d8bb53984a5de48dca2f94589dcc))
* **layout:** add inner-classes prop ([874f9a4](https://github.com/vexip-ui/vexip-ui/commit/874f9a4b21cee716045332e948c812a6662797b5))
* **table:** support add table summaries (footer) ([#386](https://github.com/vexip-ui/vexip-ui/issues/386)) ([27d0fd6](https://github.com/vexip-ui/vexip-ui/commit/27d0fd683bf7c5ad438d257301339f6d7e94d936))
* **table:** support merge cells ([#384](https://github.com/vexip-ui/vexip-ui/issues/384)) ([5ce3280](https://github.com/vexip-ui/vexip-ui/commit/5ce3280eb902c6719678ad19d512b53da3bed504))


### BREAKING CHANGES

* **table:** TableColumn's `meta-data` prop has been deprecated,
please use `meta` prop to replace it.



## [2.1.23](https://github.com/vexip-ui/vexip-ui/compare/v2.1.22...v2.1.23) (2023-06-02)


### Bug Fixes

* **collapse:** adjust the border radius of the last panel of a card type ([#366](https://github.com/vexip-ui/vexip-ui/issues/366)) ([6e422fd](https://github.com/vexip-ui/vexip-ui/commit/6e422fd5a206ba7936b7d2ab7f22f7f3f10267cf))
* **confirm:** explicitly specify auto-remove false ([c5565ea](https://github.com/vexip-ui/vexip-ui/commit/c5565eae95e8067d24c27494e13112d9efe6d7a2))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))
* **input:** incorrect count-color-disabled variable ([#373](https://github.com/vexip-ui/vexip-ui/issues/373)) ([3bf3204](https://github.com/vexip-ui/vexip-ui/commit/3bf32044e14473985114eb5f39feebf51e91efef))
* **layout:** adjust aside class to be compatible with nested ([88fc9c0](https://github.com/vexip-ui/vexip-ui/commit/88fc9c07c7bbdce39bfbc0e1ef44a1491c711494))
* **layout:** aside main scroll not refresh ([89e58e5](https://github.com/vexip-ui/vexip-ui/commit/89e58e5811c8a25de9f56d9e22f5626282c741f9))
* **layout:** subtract border width when recording height ([31fb537](https://github.com/vexip-ui/vexip-ui/commit/31fb537f057859b1f8536924c2b2ab3763ee41ad)), closes [#364](https://github.com/vexip-ui/vexip-ui/issues/364)
* **locale:** confirm typo in English ([#337](https://github.com/vexip-ui/vexip-ui/issues/337)) ([e256ca9](https://github.com/vexip-ui/vexip-ui/commit/e256ca9f6b8a6d3ad483880450f8d1370be14ab1))
* normalize props export of all components ([558db00](https://github.com/vexip-ui/vexip-ui/commit/558db00d2b8a55a7d108a06cd95f52e4250ed89e))
* **number-input:** props.value precision lose efficacy ([#365](https://github.com/vexip-ui/vexip-ui/issues/365)) ([64650e8](https://github.com/vexip-ui/vexip-ui/commit/64650e8e67bfc82e75af22699ef4a80ec38b4970))
* **tab-nav:** add missing scroll style dependency ([3d396fa](https://github.com/vexip-ui/vexip-ui/commit/3d396fa4f3be2f92974e418fd8c3cf99d2fb255f))
* **tab-nav:** incorrect pad display ([560790a](https://github.com/vexip-ui/vexip-ui/commit/560790a3d405a9db84e18faa64d4e2e030ec5e2c))
* **textarea:** incorrect count-color-disabled variable ([#372](https://github.com/vexip-ui/vexip-ui/issues/372)) ([8b9ac41](https://github.com/vexip-ui/vexip-ui/commit/8b9ac416deff0347ad5b20a5fe5a6c9a0ea8ee06))
* **timeline:** effect alternate work correctly ([ff77266](https://github.com/vexip-ui/vexip-ui/commit/ff77266e3841d524be9f25f9639fdaecb46ceced))
* **utils:** incorrect leap year function name ([#345](https://github.com/vexip-ui/vexip-ui/issues/345)) ([1958a46](https://github.com/vexip-ui/vexip-ui/commit/1958a46a63ce5f26f6d16e46d328abe7f019fe92))


### Features

* **layout:** add content-resize event ([0eda095](https://github.com/vexip-ui/vexip-ui/commit/0eda0954232047c1826d3626a870eb12dc57e314))
* **select:** add fit-popper prop ([#357](https://github.com/vexip-ui/vexip-ui/issues/357)) ([5c2c0cd](https://github.com/vexip-ui/vexip-ui/commit/5c2c0cd0733e5c43518500f1e114f52c944144ea))
* **table:** support resize table columns' width ([#343](https://github.com/vexip-ui/vexip-ui/issues/343)) ([1a9f493](https://github.com/vexip-ui/vexip-ui/commit/1a9f4931189c871ec750e34afbc303a1f35a993e))
* **timeline:** using alternate to replace both-sides prop ([5f81887](https://github.com/vexip-ui/vexip-ui/commit/5f8188742197bd100dcf9833d1aeaa685b41b9d0))
* **utils:** add getXBorder and getYBorder methods ([6f360d2](https://github.com/vexip-ui/vexip-ui/commit/6f360d2cc0a61280e13ff9d22f4103dc02ef6a43))


### Performance Improvements

* **native-scroll:** debounce resize process ([ac8e61d](https://github.com/vexip-ui/vexip-ui/commit/ac8e61d66fa279f6f74773222e6e3e8af34bcc83))
* **native-scroll:** disable observe children resize by default ([7ac1d74](https://github.com/vexip-ui/vexip-ui/commit/7ac1d74e93523912254cbf59d8e342274c410ac6))
* **tree:** improve internal reactive variables ([92ba459](https://github.com/vexip-ui/vexip-ui/commit/92ba4591e0ab40c5784a5d49380c6223e67207d7))


### BREAKING CHANGES

* **native-scroll:** NativeScroll no longer observes children resize by default,
you can add `observe-deep` prop to enable it.
* **timeline:** Timeline's `both-sides` prop has been deprecated,
please using `alternate` prop to replace it.



## [2.1.22](https://github.com/vexip-ui/vexip-ui/compare/v2.1.21...v2.1.22) (2023-05-25)


### Bug Fixes

* **cascader:** should reset hitting when panel options changed ([d4180f2](https://github.com/vexip-ui/vexip-ui/commit/d4180f2921af9d49564c28366aae68c99507ae1d))
* **config:** ensure props exec validator at once ([#328](https://github.com/vexip-ui/vexip-ui/issues/328)) ([bcdf759](https://github.com/vexip-ui/vexip-ui/commit/bcdf759083903b0aa85cef6d963f20dcfb8a4c76))
* **dropdown:** disable transfer for nested dropdown ([1c65cfd](https://github.com/vexip-ui/vexip-ui/commit/1c65cfd8000afe58b2f0e8f513c333f21a50f1d9))
* **menu:** improve and fix menu item style ([9a780f4](https://github.com/vexip-ui/vexip-ui/commit/9a780f4117474c8460e8a5235a6b521038fd9274))
* **menu:** incorrect menu item style in rest ([afa3e56](https://github.com/vexip-ui/vexip-ui/commit/afa3e560926b8abd86bd6f4fd2378d1e5e6964f3))
* **menu:** missing meta payload when using options ([f8bcc0d](https://github.com/vexip-ui/vexip-ui/commit/f8bcc0daf486f11bd97c7702e5f260d20b366e7d))
* **menu:** popper cannot disappear after quickly hover twice ([d644b54](https://github.com/vexip-ui/vexip-ui/commit/d644b54a4aa777645961054afd72caeaaffd77ec))
* **tooltip:** radius variable typo ([cb978ee](https://github.com/vexip-ui/vexip-ui/commit/cb978ee3743112c3eb13860963f14149c64b2bd4))
* **typography:** exactly using kbd tag for keyboard text ([f288ef6](https://github.com/vexip-ui/vexip-ui/commit/f288ef69796ef88d84b115f3d8f9468d8352b631))


### Features

* **dropdown:** add custom prop to mark to disable nested process ([f29ba14](https://github.com/vexip-ui/vexip-ui/commit/f29ba145aaa1a556c5aa262e81f35f7ece659388))
* exports all props definitions to support extends ([0186871](https://github.com/vexip-ui/vexip-ui/commit/018687198aae791c63eb897305d96aa6354eb52e))
* **style:** use new font-family for mono ([9f88146](https://github.com/vexip-ui/vexip-ui/commit/9f881468ddc48dc63d84b316b1f9bacc8a87f889))



## [2.1.21](https://github.com/vexip-ui/vexip-ui/compare/v2.1.20...v2.1.21) (2023-05-21)


### Bug Fixes

* **date-picker:** add header titles for range select datetime ([dfc2401](https://github.com/vexip-ui/vexip-ui/commit/dfc2401b111fee7915976c40030ca365cfe74103))
* **layout:** disable transition when not mounted ([5fe7030](https://github.com/vexip-ui/vexip-ui/commit/5fe703004b64aae4fef07fd7ee6c45ef2e9f4b50))
* **radio:** ensure effective loading icon in button mode ([a59eb8e](https://github.com/vexip-ui/vexip-ui/commit/a59eb8eb4f93703409b135eb457a0c6e563d5f38))
* **radio:** normailze line-height in button mode ([7835c93](https://github.com/vexip-ui/vexip-ui/commit/7835c9382558c54f00a3ae3c012b8d349dbed3eb))
* **text:** incorrect style of thin mode ([dc1ccce](https://github.com/vexip-ui/vexip-ui/commit/dc1ccce0e5315cb7a55cd045015d369761fe3aad))


### Features

* **auto-complete:** add focus and blur events ([a5873a1](https://github.com/vexip-ui/vexip-ui/commit/a5873a1b13c2d93d0e4e381b0de4885086561ea6))
* **bem-helper:** create bem-helper package ([f91208e](https://github.com/vexip-ui/vexip-ui/commit/f91208e661ac1ecb0d14289dc57286683392f212))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* **input:** add copyValue api method ([29fda06](https://github.com/vexip-ui/vexip-ui/commit/29fda06748aaa22e916ab5e37c75287c3d6ec089))
* normalize focus and blur methods for form components ([718090c](https://github.com/vexip-ui/vexip-ui/commit/718090c4cadee00496717f04e4a73cc599393332))
* **select:** add api focus and blur methods ([638fc3c](https://github.com/vexip-ui/vexip-ui/commit/638fc3c45c1d72f1ce862110aee8c4167ab48a51))
* **time-picker:** support click item to select ([6f58387](https://github.com/vexip-ui/vexip-ui/commit/6f583871b635a77a41ba5b1bf6f229156da50823))
* **utils:** add runQueueFrame method ([a376a15](https://github.com/vexip-ui/vexip-ui/commit/a376a15bbcb29ab93224d1fe1f13e0b8442ddb4e))
* **wheel:** emit item-click event ([9c84084](https://github.com/vexip-ui/vexip-ui/commit/9c84084c0214e7abd816d2b817feadb100de0158))



## [2.1.20](https://github.com/vexip-ui/vexip-ui/compare/v2.1.19...v2.1.20) (2023-05-14)


### Bug Fixes

* **scrollbar:** incorrect style import path ([5e2a8c9](https://github.com/vexip-ui/vexip-ui/commit/5e2a8c9cf4e556144445de13386b63b8273012c4))



## [2.1.19](https://github.com/vexip-ui/vexip-ui/compare/v2.1.17...v2.1.19) (2023-05-14)


### Bug Fixes

* **card:** unexpected content collapse ([e063a40](https://github.com/vexip-ui/vexip-ui/commit/e063a408632639d4c19fcb4e2343a8accb9d67d2))
* **color-picker:** alpha cannot be confirmed to 0 ([9921700](https://github.com/vexip-ui/vexip-ui/commit/9921700cf2a09490259159a03900ba8ea53be1fe))
* **layout:** correct timing of mediaQuery call in ssr ([62b5443](https://github.com/vexip-ui/vexip-ui/commit/62b5443e97d5e0bcaa59ac4dc74ff703040c17bd))
* **layout:** emit expanded change event when breakpoint changed ([94f2716](https://github.com/vexip-ui/vexip-ui/commit/94f2716c167db3a21eaffe8967d1ea47923270cd))
* **scrollbar:** remove incorrect style dependency ([7213a5c](https://github.com/vexip-ui/vexip-ui/commit/7213a5c71bb15c0e7ae94600431712a6b39bfe26))
* **table:** correct filter trigger style ([c9fc151](https://github.com/vexip-ui/vexip-ui/commit/c9fc1510be5e223b01d42ab407cb306f598fed49))
* **table:** correct using native scroll exposed ([ef58f8a](https://github.com/vexip-ui/vexip-ui/commit/ef58f8a85a1580230a6b4faa9456416c0f63df8d))
* **table:** effect re-render when column slots' content changed ([ca79311](https://github.com/vexip-ui/vexip-ui/commit/ca79311d31a234736c182f7afe576ecaf79c92fd))
* **utils:** correct flatTree filter method ([94dacad](https://github.com/vexip-ui/vexip-ui/commit/94dacad0625fbd2e520d646a4afaad2692909c47))


### Code Refactoring

* **layout:** normalize slot params and exposed ([5abb6a3](https://github.com/vexip-ui/vexip-ui/commit/5abb6a36636162c9c1affa3a86e33f9c98408651))


### Features

* **ellipsis:** add tip-disabled prop ([e24cd7d](https://github.com/vexip-ui/vexip-ui/commit/e24cd7d87c6cb34535bd4beba81ca4e4e0af741d))
* **table:** add text-align prop for TableColumn ([479abaa](https://github.com/vexip-ui/vexip-ui/commit/479abaaba9b165d1947faf174f3af4d927f8a8b1))
* **table:** support custom filter renderer ([241d8aa](https://github.com/vexip-ui/vexip-ui/commit/241d8aa9f1bccae97ae2a50534ae6157f2c3b827))
* **table:** use class prop replace class-name ([10b32ec](https://github.com/vexip-ui/vexip-ui/commit/10b32ec7496d6928e350150676261e758b342896))
* **tooltip:** provide api methods from slots ([879cc0a](https://github.com/vexip-ui/vexip-ui/commit/879cc0ad477830ad72955bf41129fbf33a1861a2))
* **utils:** enhance flatTree to support depth first and filter ([c5a5728](https://github.com/vexip-ui/vexip-ui/commit/c5a57284863de973dc0480243af114cc02217b44))


### BREAKING CHANGES

* **layout:** Api methods renamed:  `toggleReduce` -> `toggleReduced`,
`toggleUserDrop` -> `toggleUserDropped`



## [2.1.17](https://github.com/vexip-ui/vexip-ui/compare/v2.1.16...v2.1.17) (2023-05-03)


### Bug Fixes

* **card:** correct header flex style ([43d509a](https://github.com/vexip-ui/vexip-ui/commit/43d509a5f2164e0c0a9567058453c12dd89cc1a6))
* **scroll:** content shaking when init or resized ([1c8b818](https://github.com/vexip-ui/vexip-ui/commit/1c8b81821e9c3f80bb77dddacfb1912793952555))


### Features

* **config-provider:** support config z-index ([8772bc2](https://github.com/vexip-ui/vexip-ui/commit/8772bc2d9d964ef5c0b864a69bead5493cd76a23))
* **config:** support provide config via hook functions ([8222299](https://github.com/vexip-ui/vexip-ui/commit/8222299e99769d416d6e04af5c6fab23c109e87a))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))


### Performance Improvements

* **scroll:** refactor slot params to improve content render ([5838d8f](https://github.com/vexip-ui/vexip-ui/commit/5838d8fe62a8abcb70bbfcbdfd55d6528d36e04f)), closes [#316](https://github.com/vexip-ui/vexip-ui/issues/316)


### BREAKING CHANGES

* **scroll:** Slot parameters of Scroll (also NativeScroll) is changed
to methods only, and now using the getState method to get scroll state.
And the modifier class names of Scroll's wrapper are transfered to the
Scroll root element.



## [2.1.16](https://github.com/vexip-ui/vexip-ui/compare/v2.1.15...v2.1.16) (2023-04-23)


### Bug Fixes

* **anchor:** ensure get scroll methods and element ([8b9b180](https://github.com/vexip-ui/vexip-ui/commit/8b9b1807274c12e386f8f70aa66ad606eb1526b4))
* **auto-complate:** ensure effect ignore-case prop ([#312](https://github.com/vexip-ui/vexip-ui/issues/312)) ([398c681](https://github.com/vexip-ui/vexip-ui/commit/398c681796c5adf655782bd83d152e1cfb3b49a5))
* **auto-complete:** no hover effect when using filter ([20d4f73](https://github.com/vexip-ui/vexip-ui/commit/20d4f73bd76d0ee9a77eb385d3a519c0659ef2f3))
* **card:** flexible height for content ([dba86b6](https://github.com/vexip-ui/vexip-ui/commit/dba86b6eb297cbe488e43dc9ed7dd111dcc3c237))
* **form-submit:** missing button style dependency ([02f3f04](https://github.com/vexip-ui/vexip-ui/commit/02f3f048d24311451aa06a83e257af45b22665c9))
* **layout:** ensure aside-main using y scrollbar ([131573c](https://github.com/vexip-ui/vexip-ui/commit/131573c88df3aa8e4a7d79de98bf168e43d5979c))
* **layout:** incorrect main section min-height ([a3c325f](https://github.com/vexip-ui/vexip-ui/commit/a3c325fb861d37e3c09a62672493e83e2da17293))
* **masker:** set valid z-index if default active ([2d4f613](https://github.com/vexip-ui/vexip-ui/commit/2d4f6131a174c76bdaf0ef5b377be50526c0e799))
* **utils:** flatTree don't set parent if parentField is empty ([a1d51a5](https://github.com/vexip-ui/vexip-ui/commit/a1d51a52de5d82b251e63e829499d6f35aa4db0b))



## [2.1.15](https://github.com/vexip-ui/vexip-ui/compare/v2.1.14...v2.1.15) (2023-04-17)


### Bug Fixes

* **layout:** fixed wrapper height when `fixed-main` ([f47d9a6](https://github.com/vexip-ui/vexip-ui/commit/f47d9a689b284a6eb1c73b6390b323442d0273f3))
* **table:** ensure ignore when row drop to its parent ([3543510](https://github.com/vexip-ui/vexip-ui/commit/354351024c242119fc9f8043e941e21b321813e9))
* **table:** ensure render indicator when using drag column ([388ffec](https://github.com/vexip-ui/vexip-ui/commit/388ffecaa9d77367fac775d049b5969770422dc3))
* **table:** infinitely rerender when using primitive object in TableColumn ([19f5f55](https://github.com/vexip-ui/vexip-ui/commit/19f5f5534b38de71553e6ad5798ffe57b1a97d0b)), closes [#303](https://github.com/vexip-ui/vexip-ui/issues/303)



## [2.1.14](https://github.com/vexip-ui/vexip-ui/compare/v2.1.13...v2.1.14) (2023-04-13)


### Features

* **icons:** upgrate font-awesome to 6.4.0 ([74a47cb](https://github.com/vexip-ui/vexip-ui/commit/74a47cb9efefdb696835b41828515eaac6e23aaf))
* **layout:** add fixed-main prop ([969f512](https://github.com/vexip-ui/vexip-ui/commit/969f512874356d24fb26a711047ef1c1928648b4))
* **utils:** add normalizePath method ([4411b49](https://github.com/vexip-ui/vexip-ui/commit/4411b496bef1548d7c48c2dc8999d642dd1f2b75))



## [2.1.13](https://github.com/vexip-ui/vexip-ui/compare/v2.1.12...v2.1.13) (2023-04-12)


### Bug Fixes

* **scroll:** improve extra slot not render when no content ([4dfccb8](https://github.com/vexip-ui/vexip-ui/commit/4dfccb8a7725023117ace6dfed4910c23dafb6c8))
* **style:** topological sorting for style import ([a36d606](https://github.com/vexip-ui/vexip-ui/commit/a36d6064d544b33da331ea760f1419f83c391f11))



## [2.1.12](https://github.com/vexip-ui/vexip-ui/compare/v2.1.11...v2.1.12) (2023-04-06)


### Bug Fixes

* **number-input:** ensure emit change event in sync mode ([aab42ab](https://github.com/vexip-ui/vexip-ui/commit/aab42ab4170859ee89d2896eca2d9944d4b42f38)), closes [#296](https://github.com/vexip-ui/vexip-ui/issues/296)
* **number-input:** unexpected behavior in sync mode ([9c77dc3](https://github.com/vexip-ui/vexip-ui/commit/9c77dc3b1b37719987e15175ac5b20c4c6e47559)), closes [#299](https://github.com/vexip-ui/vexip-ui/issues/299)
* **select:** correctly emit focus and blur events ([e9ee8ce](https://github.com/vexip-ui/vexip-ui/commit/e9ee8ce265e975b3b3a869c966d892ec17fe8f24)), closes [#300](https://github.com/vexip-ui/vexip-ui/issues/300)
* specific type value for internal buttons ([0a39d69](https://github.com/vexip-ui/vexip-ui/commit/0a39d697b434aa7b55afe502da0b649a48c16c32)), closes [#297](https://github.com/vexip-ui/vexip-ui/issues/297)


### Code Refactoring

* **config:** external locale config for on demand import ([#302](https://github.com/vexip-ui/vexip-ui/issues/302)) ([86eab10](https://github.com/vexip-ui/vexip-ui/commit/86eab101f4fbf1579e2ac2cf7abe299e1faf6583))


### Features

* **number-input:** add out of range effect for input control ([078681c](https://github.com/vexip-ui/vexip-ui/commit/078681c23a4158c35ec4e9714601b504ef8c359c))
* **select:** support remote mode ([#301](https://github.com/vexip-ui/vexip-ui/issues/301)) ([e5da199](https://github.com/vexip-ui/vexip-ui/commit/e5da1993f0f2110128570abb08b09835b19c75da))


### BREAKING CHANGES

* **config:** `en-US` and `ta-IN` isn't included in internal locale config no longer.
Now these config are exported independently, using e.g. `import { enUSLocale } from 'vexip-ui'` 
to import locale config that you want to use. See docs about global config for more details.



## [2.1.11](https://github.com/vexip-ui/vexip-ui/compare/v2.1.10...v2.1.11) (2023-04-03)


### Bug Fixes

* **plugins:** support vexip-ui version lower than 2.1.10 ([7e747d2](https://github.com/vexip-ui/vexip-ui/commit/7e747d2882e22aa1acc9b36e082a256675911259))


### Features

* **locale:** internally support Tamil language ([#293](https://github.com/vexip-ui/vexip-ui/issues/293)) ([0331ec7](https://github.com/vexip-ui/vexip-ui/commit/0331ec75caac7f7b0c63598c352125dfcd0c5831))
* **table:** support add column with drag type to create handler ([89df1fc](https://github.com/vexip-ui/vexip-ui/commit/89df1fc2a57ef370d43be7cabca7ff6730e5518e))



## [2.1.10](https://github.com/vexip-ui/vexip-ui/compare/v2.1.9...v2.1.10) (2023-03-29)


### Bug Fixes

* **button:** incorrect style in circle group when with tooltip ([947c360](https://github.com/vexip-ui/vexip-ui/commit/947c360ce12ab4cd7a14cbe9546d2c5bc99e7683)), closes [#289](https://github.com/vexip-ui/vexip-ui/issues/289)
* content shrink when body too long in Modal and Drawer ([43cfd87](https://github.com/vexip-ui/vexip-ui/commit/43cfd8746d82f61a83f2637bf3a1d5f296e8e750))
* **wheel:** arrows not render with warning ([0e7d4cd](https://github.com/vexip-ui/vexip-ui/commit/0e7d4cd9663eb3404b2a7cbdccd14f7336c82586)), closes [#292](https://github.com/vexip-ui/vexip-ui/issues/292)


### Code Refactoring

* switch to use es module to export style files ([#290](https://github.com/vexip-ui/vexip-ui/issues/290)) ([26eb0df](https://github.com/vexip-ui/vexip-ui/commit/26eb0dfbd4a3b862fb4b212aa6d20f3010e74357))


### Features

* **select:** support dynamic preview current hitting option's label ([a27ba4a](https://github.com/vexip-ui/vexip-ui/commit/a27ba4a39d9209940038d3ae1b1f9217efe862f5))


### BREAKING CHANGES

* The scss and css style files no longer contains dependent 
styles for  its component. Currently the relationship of styles are included in ts 
(js) files which are use to import the styles. Change the import way of style like: 
`vexip-ui/css/button.css` -> `vexip-ui/es/css/button` and unnecessary to import 
preset style manually.



## [2.1.9](https://github.com/vexip-ui/vexip-ui/compare/v2.1.8...v2.1.9) (2023-03-23)


### Bug Fixes

* **config:** passing default null to avoid warning ([44c813b](https://github.com/vexip-ui/vexip-ui/commit/44c813b98a9aac9697573c9bfa70cee86ccf6f61))
* **form:** unexpected display using with Column when hmr ([fc9318d](https://github.com/vexip-ui/vexip-ui/commit/fc9318d835263d43f0e2cbb4d524b9a1ef90a9d1))
* **number-input:** incoorect suffix icon position ([b759fea](https://github.com/vexip-ui/vexip-ui/commit/b759feac6dce1ee5f9871109b4409923802916d3)), closes [#284](https://github.com/vexip-ui/vexip-ui/issues/284)
* **tabs:** header will shrink if content too height ([cc46454](https://github.com/vexip-ui/vexip-ui/commit/cc46454ea738f3790448d2c4ca14ce34a17dd6c9))


### Features

* **config:** support custom icons via config ([#287](https://github.com/vexip-ui/vexip-ui/issues/287)) ([d665f10](https://github.com/vexip-ui/vexip-ui/commit/d665f103c6ba76571dd146496358d0de481a1752))
* **date-picker:** support set week start for panel ([619385e](https://github.com/vexip-ui/vexip-ui/commit/619385e8aedcbab83da8c1506ba562d8d2b2ffc0)), closes [#286](https://github.com/vexip-ui/vexip-ui/issues/286)



## [2.1.8](https://github.com/vexip-ui/vexip-ui/compare/v2.1.7...v2.1.8) (2023-03-13)


### Bug Fixes

* **number-input:** expected render vaild unit of number ([e7612b3](https://github.com/vexip-ui/vexip-ui/commit/e7612b3f875c10bd772b34c645ee0ef1258ab538)), closes [#281](https://github.com/vexip-ui/vexip-ui/issues/281)
* prevent submit event of inner input elements ([66ce737](https://github.com/vexip-ui/vexip-ui/commit/66ce737cf8d9c3d9702f62094a90b6cb5c33c0a5)), closes [#275](https://github.com/vexip-ui/vexip-ui/issues/275)
* **scroll:** incorrect extra content z-index ([8bfb9f4](https://github.com/vexip-ui/vexip-ui/commit/8bfb9f4f020a78949a53c57e12b0b95986dcd334))


### Features

* **number-input:** support custom empty value type ([a07b245](https://github.com/vexip-ui/vexip-ui/commit/a07b24595ab113dbb3ae7201ec69ad15f8034d69))



## [2.1.7](https://github.com/vexip-ui/vexip-ui/compare/v2.1.6...v2.1.7) (2023-03-11)


### Bug Fixes

* **sapce:** render nothing when no items ([858a55b](https://github.com/vexip-ui/vexip-ui/commit/858a55bbb12e1d262493263a7edd3296f4cd818e))
* table tree rendering async data cannot be expanded ([#280](https://github.com/vexip-ui/vexip-ui/issues/280)) ([285539b](https://github.com/vexip-ui/vexip-ui/commit/285539b7d9ac0a6f0ba672a08f190b0a1b61140f))
* **table:** unexpect horizontal scroll appear ([84598bf](https://github.com/vexip-ui/vexip-ui/commit/84598bfe41e1318a037f7c5be2e8f7731ee0aa5f)), closes [#278](https://github.com/vexip-ui/vexip-ui/issues/278)


### Features

* **native-scroll:** support add extra content via slot ([54de8b5](https://github.com/vexip-ui/vexip-ui/commit/54de8b5ad538ae77a147a99b17b6f8a3038f95ac))
* **scroll:** support add extra content via slot ([931b4d1](https://github.com/vexip-ui/vexip-ui/commit/931b4d177e43c4d01fa942e20e3ff57bb443cd1d))
* **tree:** support post process each node when created ([7292d64](https://github.com/vexip-ui/vexip-ui/commit/7292d64629c8b4dbff7ab7ab6c360e1a67a3a60a))
* **utils:** add flatVNodes method ([35bd9e6](https://github.com/vexip-ui/vexip-ui/commit/35bd9e6c9acedd4be60df5bc2638a1ceb73139c0))


### types

* **table:** normalize all types start with `Table` ([ca375b7](https://github.com/vexip-ui/vexip-ui/commit/ca375b7ffb492b0ec18fbe2d40a225e1de6b2c2d))


### BREAKING CHANGES

* **table:** All types of Table component currently start with
`Table` prefix, e.g. `FilterOptions` -> `TableFilterOptions`



## [2.1.6](https://github.com/vexip-ui/vexip-ui/compare/v2.1.5...v2.1.6) (2023-03-08)


### Bug Fixes

* **checkbox:** improve signal background color in dark mode ([6fbbc22](https://github.com/vexip-ui/vexip-ui/commit/6fbbc22b0db0c92f3eae7e5017656df3cde031cb))
* **modal:** custom position not effective ([b144f9c](https://github.com/vexip-ui/vexip-ui/commit/b144f9cd014f782b706536ded0afa761f3cdbf5d))
* **select:** incorrect label color when delay set value in filter mode ([68169c0](https://github.com/vexip-ui/vexip-ui/commit/68169c068adbeb6bbe44c28c80a443895b10f719))
* **table:** ensure fill entire table when columns total width small than table ([b69cdb5](https://github.com/vexip-ui/vexip-ui/commit/b69cdb5c7e4bada0ad230037bbbf652cf38cccbf))
* **table:** incorrect scroll width when have not fixed width column ([e93bd1c](https://github.com/vexip-ui/vexip-ui/commit/e93bd1cc8921de452fd3c572c8bb20ca73ac4fc4)), closes [#278](https://github.com/vexip-ui/vexip-ui/issues/278)
* **upload:** infinite read not image file when using card type ([eceb63c](https://github.com/vexip-ui/vexip-ui/commit/eceb63c9d4087009dc73a7ce55d2a2b986f5612f))


### Features

* **table:** add key-config prop ([da36218](https://github.com/vexip-ui/vexip-ui/commit/da36218a7f51b0d34e218b50cc9c42042ebca979))
* **table:** support parsing tree data ([#279](https://github.com/vexip-ui/vexip-ui/issues/279)) ([763f50b](https://github.com/vexip-ui/vexip-ui/commit/763f50b49afbb58ae89aef21ff79848def8911d1))
* **tree:** support create link line for nodes ([ea3110a](https://github.com/vexip-ui/vexip-ui/commit/ea3110a44bcda2b8cce4b09f55ee3fb96daa9ad2))
* **tree:** support more fine grained disabled options ([82d4877](https://github.com/vexip-ui/vexip-ui/commit/82d487755c8018e906694170fd069fd66b01e819))



## [2.1.5](https://github.com/vexip-ui/vexip-ui/compare/v2.1.4...v2.1.5) (2023-02-28)


### Bug Fixes

* **form:** dynamic remove array type fields fail ([5c810fe](https://github.com/vexip-ui/vexip-ui/commit/5c810fea5d19fb8e2238edc24709468aaaf6f3ab)), closes [#274](https://github.com/vexip-ui/vexip-ui/issues/274)
* **select:** ensure label clear when using filter in signle select ([35e11c2](https://github.com/vexip-ui/vexip-ui/commit/35e11c2248035909f2ffc43c4559f25f83ec0d07)), closes [#277](https://github.com/vexip-ui/vexip-ui/issues/277)
* **table:** improve table horizontal scroll ([b99aaa1](https://github.com/vexip-ui/vexip-ui/commit/b99aaa143a25c58869197bd2b5843301aae33547)), closes [#273](https://github.com/vexip-ui/vexip-ui/issues/273)



## [2.1.4](https://github.com/vexip-ui/vexip-ui/compare/v2.1.3...v2.1.4) (2023-02-25)


### Bug Fixes

* **date-picker:** cannot focus end input when in range mode ([5ea7b59](https://github.com/vexip-ui/vexip-ui/commit/5ea7b59bc23043ebc5e06f0407feb6a1b160e996))
* **date-picker:** ensure clearable prop wroks when no passing value ([68854b8](https://github.com/vexip-ui/vexip-ui/commit/68854b8f2505cbbf992b5ef535292382d51ed048)), closes [#258](https://github.com/vexip-ui/vexip-ui/issues/258)
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **input:** make sync effective when under FormItem ([207ef20](https://github.com/vexip-ui/vexip-ui/commit/207ef20b4b624d8e4717f151b410de1e7e03009e)), closes [#267](https://github.com/vexip-ui/vexip-ui/issues/267)
* **layout:** improve user dropdown position ([b91291b](https://github.com/vexip-ui/vexip-ui/commit/b91291b73208ca6414f8cead5410fa1c03404ecf))
* **radio:** should not be selected when in loading and loading-lock ([#260](https://github.com/vexip-ui/vexip-ui/issues/260)) ([3d79c9f](https://github.com/vexip-ui/vexip-ui/commit/3d79c9f256c09bb44c5e69489ac1e90926e921d5))
* **select:** internal filter should filter by label ([bf39188](https://github.com/vexip-ui/vexip-ui/commit/bf391884d7a086ddd6915663c998bb8cd568c398)), closes [#265](https://github.com/vexip-ui/vexip-ui/issues/265)
* **select:** normalize space and enter key behavior ([75ee99b](https://github.com/vexip-ui/vexip-ui/commit/75ee99beb13b26309027dd8b6cb5efdd4d7dbccb))
* **select:** unexpect emit focus event when blur ([3e0afca](https://github.com/vexip-ui/vexip-ui/commit/3e0afca821060305891f257e1324412824bb57a3)), closes [#264](https://github.com/vexip-ui/vexip-ui/issues/264)
* **table:** cannot refresh row states by data directly ([b9bb46d](https://github.com/vexip-ui/vexip-ui/commit/b9bb46d40fe1ce1ad4a23e790f70bcf178353297))
* **table:** improve column sorter and filter able default true ([688dba4](https://github.com/vexip-ui/vexip-ui/commit/688dba40524ec5d56b10aa669329a7973ba45bfd))


### Features

* **calendar:** support two way binding for year and month ([f7469e9](https://github.com/vexip-ui/vexip-ui/commit/f7469e9d4bcc4ed91e9e1a157083a4bbab3a0485)), closes [#259](https://github.com/vexip-ui/vexip-ui/issues/259)
* **native-scroll:** add ensureInView api method ([cb860d4](https://github.com/vexip-ui/vexip-ui/commit/cb860d496ce9401b0f6c98af469c8bd57cec560c))
* **select:** emit filter-input event ([12bcfb3](https://github.com/vexip-ui/vexip-ui/commit/12bcfb36a9b0746ca5e8e145b0dcf9973ca6a977)), closes [#271](https://github.com/vexip-ui/vexip-ui/issues/271)
* **spin:** add icon-effect prop ([0d9470f](https://github.com/vexip-ui/vexip-ui/commit/0d9470fe92469e2ce9802856dcfd3f37461a1d13))
* **table:** support custom sorter and filter ([bb0f4af](https://github.com/vexip-ui/vexip-ui/commit/bb0f4afda1b43d4f4bfdac526bf6721b0410c08e)), closes [#269](https://github.com/vexip-ui/vexip-ui/issues/269)



## [2.1.3](https://github.com/vexip-ui/vexip-ui/compare/v2.1.2...v2.1.3) (2023-02-08)


### Bug Fixes

* **menu:** incorrect group indent css var ([45ebf73](https://github.com/vexip-ui/vexip-ui/commit/45ebf7380ce08e386c825fd26ffbe4d0d8d3cd8d))



## [2.1.2](https://github.com/vexip-ui/vexip-ui/compare/v2.1.1...v2.1.2) (2023-02-08)


### Bug Fixes

* **calendar:** reactive for week-start prop changed ([bf8c9a5](https://github.com/vexip-ui/vexip-ui/commit/bf8c9a5d3d6249739e83ce89e5a7deec5d54d175)), closes [#255](https://github.com/vexip-ui/vexip-ui/issues/255)
* **layout:** normalize layout main z-index ([e4d1e1a](https://github.com/vexip-ui/vexip-ui/commit/e4d1e1a032f7c82677023d6e2c572cb2a091d22b)), closes [#253](https://github.com/vexip-ui/vexip-ui/issues/253)
* **locale:** corrent inject locale word space config ([aee45aa](https://github.com/vexip-ui/vexip-ui/commit/aee45aae8b93a54ac5f14bd6476584b52e12f045))
* **menu:** correct selected style in horizontal mode ([1e56461](https://github.com/vexip-ui/vexip-ui/commit/1e56461e305af966ecd4cdb31c6136b85f90d6bf))
* **plugins:** correct css file path for dark mode ([#254](https://github.com/vexip-ui/vexip-ui/issues/254)) ([f3aa29b](https://github.com/vexip-ui/vexip-ui/commit/f3aa29b6467fd846c017850e81f588928ac8de8e))
* **select:** correct cursor style ([9e0d6a4](https://github.com/vexip-ui/vexip-ui/commit/9e0d6a4d2fca5f8aaed6a4590e53324a19308dad))


### Features

* **date-picker:** support set input unit controls readonly ([c55ea0d](https://github.com/vexip-ui/vexip-ui/commit/c55ea0dd83e4ac1ae37ef2663099399c8b3de6d7))
* **menu:** support custom menu item indentation ([f385042](https://github.com/vexip-ui/vexip-ui/commit/f38504209696c4591e396e70f5786ab5d7d1785f)), closes [#252](https://github.com/vexip-ui/vexip-ui/issues/252)
* **time-picker:** support set input unit controls readonly ([6eaaac0](https://github.com/vexip-ui/vexip-ui/commit/6eaaac073a8907d0595208e0f1d340394c2925d1))



## [2.1.1](https://github.com/vexip-ui/vexip-ui/compare/v2.1.0...v2.1.1) (2023-02-07)


### Bug Fixes

* **menu:** active menu not follow router when init ([75772ed](https://github.com/vexip-ui/vexip-ui/commit/75772ed1a2db804a729429629c9bf4bb03ca733b)), closes [#246](https://github.com/vexip-ui/vexip-ui/issues/246)
* **menu:** improve group visible item style ([48c7166](https://github.com/vexip-ui/vexip-ui/commit/48c716602ab08ef83d889088c48ada26f35407a4)), closes [#248](https://github.com/vexip-ui/vexip-ui/issues/248)
* **time-picker:** full controllable control value via value prop ([90ca68c](https://github.com/vexip-ui/vexip-ui/commit/90ca68c4b5615c6bae6ddbe59d63ee15bb18d19c))


### Features

* **layout:** support manually control dark mode ([04c199e](https://github.com/vexip-ui/vexip-ui/commit/04c199e91904546906502755786aba9e2e95855f)), closes [#245](https://github.com/vexip-ui/vexip-ui/issues/245)
* **time-picker:** add placholder prop ([b5ca190](https://github.com/vexip-ui/vexip-ui/commit/b5ca1909bc409039d5cd79c9e08427e6408ce4bc))



# [2.1.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.20...v2.1.0) (2023-01-30)


### Bug Fixes

* **confirm:** fallback to create app when without mounted app ([064cc52](https://github.com/vexip-ui/vexip-ui/commit/064cc525d3aa0158b856655fed8119d9fb31ca7e))
* **contextmenu:** should have default z-index ([debaa3d](https://github.com/vexip-ui/vexip-ui/commit/debaa3d7107b38355207759dc8840a0ca5169c6e))
* **form:** icon and loading slots for submit and reset not effective ([260001c](https://github.com/vexip-ui/vexip-ui/commit/260001cb7d32402e835a1b1a5c2336816af9de90))
* **form:** submit loading cannot follow form loading ([6bfcc69](https://github.com/vexip-ui/vexip-ui/commit/6bfcc6950f7f294ca932e7e959d0b636022988c5))
* **input:** plain-password button cannot click when clearable ([ac33af5](https://github.com/vexip-ui/vexip-ui/commit/ac33af5d5dad5e9252acb8878cfdbc5dfdf24462)), closes [#229](https://github.com/vexip-ui/vexip-ui/issues/229)
* **layout:** media query not correct when set to xs ([53c0150](https://github.com/vexip-ui/vexip-ui/commit/53c0150ccaa4982b2cc53b7919480604e787c8ed))
* **menu:** menu item icon slot not effective ([9c20725](https://github.com/vexip-ui/vexip-ui/commit/9c2072517a1cffa4beb6e311b9a295e5ad5c063a))
* **select:** cannot reset selected when passing empty value ([c46805a](https://github.com/vexip-ui/vexip-ui/commit/c46805a4fbba76d4b0de9c2bb9d54e4df00016b7))
* **toast:** fallback to create app when without mounted app ([c6330a9](https://github.com/vexip-ui/vexip-ui/commit/c6330a90593d12af8311b09b27b6aeae6b5226cb))
* **utils:** using pointerdown event for touch action ([e03462f](https://github.com/vexip-ui/vexip-ui/commit/e03462fa2eabbfc247cfc206a6a26fc4d33169ab))


### Features

* **full-screen:** add FullScreen component ([#212](https://github.com/vexip-ui/vexip-ui/issues/212)) ([46ebb3e](https://github.com/vexip-ui/vexip-ui/commit/46ebb3edc69eacfa8147bb2a26b27162cc1473a8))
* **icons:** upgrade to font-awesome@6.2.1 ([a9e5950](https://github.com/vexip-ui/vexip-ui/commit/a9e59501d0a145c28814f96f9fbfb717130105b1))
* **Image:** add Image component ([#225](https://github.com/vexip-ui/vexip-ui/issues/225)) ([e26a75e](https://github.com/vexip-ui/vexip-ui/commit/e26a75eb4c714ae6e49193724b4f20f2bb7a5d38))
* **input:** add plain password button slot ([e74cee3](https://github.com/vexip-ui/vexip-ui/commit/e74cee38f19a27c85b1fc3c5cf360946ea499a80))
* **layout:** emitted toggle-theme event ([e89f6c2](https://github.com/vexip-ui/vexip-ui/commit/e89f6c2d10d747b175f48e0087520cb97bfb0446)), closes [#242](https://github.com/vexip-ui/vexip-ui/issues/242)
* **native-scroll:** add scroll-attrs prop ([68c4490](https://github.com/vexip-ui/vexip-ui/commit/68c4490c83839a067ad3b3868052c245dceda2b9))
* **Result:** add Result component ([#238](https://github.com/vexip-ui/vexip-ui/issues/238)) ([0812183](https://github.com/vexip-ui/vexip-ui/commit/0812183fc0d4b5f716b9b03498aa0891b9cd6353))
* **scroll:** add scroll-attrs prop ([d10d24e](https://github.com/vexip-ui/vexip-ui/commit/d10d24e55707328c09c39820eacf7a802fa3f132))
* **scroll:** add scroll-style prop ([3a3d1b3](https://github.com/vexip-ui/vexip-ui/commit/3a3d1b32dea5377d1de705d82e58e18f6942bcfd))
* **scroll:** support custom scroll wrapper tag (include NativeScroll) ([1182e21](https://github.com/vexip-ui/vexip-ui/commit/1182e218cb2dae13518f2c283ec981fb20db42f9))
* **select:** add max-tag-count, no-rest-tip and tag-type props ([#224](https://github.com/vexip-ui/vexip-ui/issues/224)) ([bdc7517](https://github.com/vexip-ui/vexip-ui/commit/bdc751789ebee18353900bcab1436d7d352739b0))
* support specify locale config via `locale` prop ([#239](https://github.com/vexip-ui/vexip-ui/issues/239)) ([e483dea](https://github.com/vexip-ui/vexip-ui/commit/e483deab8f58b0859ea310020973f990d83a720a))
* **tab-nav:** support scroll when items size large than wrapper ([#234](https://github.com/vexip-ui/vexip-ui/issues/234)) ([066a985](https://github.com/vexip-ui/vexip-ui/commit/066a985d9bc976bf06a01fcc69c7e0411b0af86b))
* **tag:** support add extra content ([#222](https://github.com/vexip-ui/vexip-ui/issues/222)) ([9fb911c](https://github.com/vexip-ui/vexip-ui/commit/9fb911cdc5624b8f9f83e6ba95b3c2567f44e871))



## [2.0.20](https://github.com/vexip-ui/vexip-ui/compare/v2.0.19...v2.0.20) (2023-01-10)


### Bug Fixes

* **date-picker:** reset activated when set value to falsy ([ea2e74e](https://github.com/vexip-ui/vexip-ui/commit/ea2e74ebc222f193be59efb5a95b58a4dc73de72))
* **locale:** per page typo ([bf85f8b](https://github.com/vexip-ui/vexip-ui/commit/bf85f8b6f9560bf055e32844f7d2c59cbd363811))
* **modal:** close button cannot be clicked in touch mode ([d0a24a4](https://github.com/vexip-ui/vexip-ui/commit/d0a24a4693dc0e3cd9a615f168c4cd3998bca7f1))
* **switch:** misalignment of signal occurs during transition ([1bd5da5](https://github.com/vexip-ui/vexip-ui/commit/1bd5da56346844a9091c89020ffee78cf107c9c6))
* **table:** column fixed effect displayed when scroll not enable ([6d75dcf](https://github.com/vexip-ui/vexip-ui/commit/6d75dcf160c268d6bac339f3c1208518ac850798))
* **upload:** count-limit not effective in image mode ([f356f11](https://github.com/vexip-ui/vexip-ui/commit/f356f11919e1bb86a7bd2e066b398cdf728f0d50))


### Features

* **date-picker:** add outside-close and outside-cancel props ([5a62a8a](https://github.com/vexip-ui/vexip-ui/commit/5a62a8a554c3518dcd66eaca99a50a791eb81a5d))



## [2.0.19](https://github.com/vexip-ui/vexip-ui/compare/v2.0.18...v2.0.19) (2022-12-19)


### Bug Fixes

* **cascader:** ensure effective max-tag-count ([4d1e6c4](https://github.com/vexip-ui/vexip-ui/commit/4d1e6c4ddc542a676c7b64f71b6f0a617f981b22))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **overflow:** counter not hidden when max count equals to items count ([f4c3540](https://github.com/vexip-ui/vexip-ui/commit/f4c3540f38a9a593454570f6c9533756c5785e0d))
* **select:** cannot re-select option in multiple mode ([c124596](https://github.com/vexip-ui/vexip-ui/commit/c1245964e39240ffd4611feafc71dd839ed08e31))
* **skeleton:** attrs cannot be set ([69ee0d1](https://github.com/vexip-ui/vexip-ui/commit/69ee0d1382e4def9e0b485391d95c0b061b723ff))
* **table:** height not correct when filter with row height set ([ca84f12](https://github.com/vexip-ui/vexip-ui/commit/ca84f12d489114691897182b16ec4f5658ec6c87))
* **virtual-list:** items element height not refresh ([d3c0944](https://github.com/vexip-ui/vexip-ui/commit/d3c0944c0b7b03fce26db2c78f7ad25a44a78957))


### Features

* **overflow:** add max-count prop ([f982420](https://github.com/vexip-ui/vexip-ui/commit/f9824208a7a670d413b57b10c37745929c4529f4))
* **overflow:** support add suffix content via slot ([6754072](https://github.com/vexip-ui/vexip-ui/commit/6754072803653c7b2654931425a44426d93022e3))
* **playground:** support format codes via prettier ([5ff663c](https://github.com/vexip-ui/vexip-ui/commit/5ff663cda3963534fec687c06ed28a12803d4e0e))
* **playground:** support select cdn address ([8d70fd6](https://github.com/vexip-ui/vexip-ui/commit/8d70fd686bafc8468a03320fc9e46ead549b5e7a))



## [2.0.18](https://github.com/vexip-ui/vexip-ui/compare/v2.0.17...v2.0.18) (2022-12-09)


### Bug Fixes

* **input:** null value will be transformed to string null ([33f10e6](https://github.com/vexip-ui/vexip-ui/commit/33f10e6118bec2092aa2279ab86234bdd07ddee2))
* **style:** color should not auto inherit ([e896107](https://github.com/vexip-ui/vexip-ui/commit/e8961077f188cb59c6e93cc302af850bf0001b09))


### Features

* **timeline:** support flip item content ([c605012](https://github.com/vexip-ui/vexip-ui/commit/c6050128a234e2317777223c8ca57a6200afba39))
* **timeline:** support horizontal line ([210a3a5](https://github.com/vexip-ui/vexip-ui/commit/210a3a546d1d4f32524d1835f99cd2222c13a54b)), closes [#195](https://github.com/vexip-ui/vexip-ui/issues/195)



## [2.0.17](https://github.com/vexip-ui/vexip-ui/compare/v2.0.16...v2.0.17) (2022-12-07)


### Bug Fixes

* **input:** ensure focus when click input area ([a0b7ff8](https://github.com/vexip-ui/vexip-ui/commit/a0b7ff86afad948e27eb4892a46f2fa9db342308))
* **playground:** compiler version should follow vue version ([51715cd](https://github.com/vexip-ui/vexip-ui/commit/51715cd64816df81aa8da9fb88b814293dab3c6b))
* **select:** space down should not enter the input ([670a68e](https://github.com/vexip-ui/vexip-ui/commit/670a68e1b4d60d3bdd4d20f3fd5380f84150daa4))
* **table:** should assign row data when set new data ([2518203](https://github.com/vexip-ui/vexip-ui/commit/2518203c45bd9c91b29a562d7857574bdd87270f))


### Features

* **input:** support number type value ([a145079](https://github.com/vexip-ui/vexip-ui/commit/a145079863786edc94ecc3657273c48dded14729))
* **number:** add control-type prop ([1a588ac](https://github.com/vexip-ui/vexip-ui/commit/1a588ac2ed3bdcf5ad5474c39cad831019c53485))



## [2.0.16](https://github.com/vexip-ui/vexip-ui/compare/v2.0.15...v2.0.16) (2022-12-01)


### Bug Fixes

* **column:** cannot show when set span 0 with other brank points ([b73cc5a](https://github.com/vexip-ui/vexip-ui/commit/b73cc5adbaefdf4060eed6fb263b6f36ea03afa6))
* **Grid:** provided state should not penetrate deep ([0a6b1fe](https://github.com/vexip-ui/vexip-ui/commit/0a6b1fe098f6be15c9924f4d91ccd00159ac75fc)), closes [#219](https://github.com/vexip-ui/vexip-ui/issues/219)
* **select:** unsync input value when using filter with default value ([fd5e6a0](https://github.com/vexip-ui/vexip-ui/commit/fd5e6a07a3ed91f465aedbab3b8d10fb15d9965c))
* **upload:** file list not sync when using select-to-add ([50784d8](https://github.com/vexip-ui/vexip-ui/commit/50784d850f6e7e5affebc66fa54ca787e0da47b9))


### Features

* export currentBreakPoint ref ([570b6f7](https://github.com/vexip-ui/vexip-ui/commit/570b6f769320c77f670a994334b08303df17b951))
* **playground:** support change version and toggle ssr ([#221](https://github.com/vexip-ui/vexip-ui/issues/221)) ([065dcf3](https://github.com/vexip-ui/vexip-ui/commit/065dcf33fd4a6b2aac862687b5f5e650337025b7))
* **scroll:** support horizontal exact mode ([a712cf9](https://github.com/vexip-ui/vexip-ui/commit/a712cf916c3e195e161d27f43df61b64404e06f7))
* support components to inherit parent base style ([#220](https://github.com/vexip-ui/vexip-ui/issues/220)) ([ca26d3b](https://github.com/vexip-ui/vexip-ui/commit/ca26d3b12499a0313d5c325befc2baadba3280ee))



## [2.0.15](https://github.com/vexip-ui/vexip-ui/compare/v2.0.14...v2.0.15) (2022-11-24)


### Bug Fixes

* **table:** should use wrapper width to compute when width not set ([d628403](https://github.com/vexip-ui/vexip-ui/commit/d6284032aa91bc4a1e89ba0c9075516167aad0db))
* **upload:** error when passing null to file-list ([b6f5df4](https://github.com/vexip-ui/vexip-ui/commit/b6f5df44a707bd2c239ef3c26fd2c2835869fb13))


### Features

* **confirm:** add fast open method for using title ([8f47f7e](https://github.com/vexip-ui/vexip-ui/commit/8f47f7e522ab2d32bef91955b476865e24ce7aa8))
* **confirm:** support add title and set content or actions align ([cb2b767](https://github.com/vexip-ui/vexip-ui/commit/cb2b7675efb5d2d5c05dc689d05e8c99866816c1))
* **upload:** add list-style prop ([94089e7](https://github.com/vexip-ui/vexip-ui/commit/94089e72a9cd823ca7699cd15916908a770b2824))



## [2.0.14](https://github.com/vexip-ui/vexip-ui/compare/v2.0.13...v2.0.14) (2022-11-21)


### Bug Fixes

* **input:** correct size for before and after content ([54c8bf8](https://github.com/vexip-ui/vexip-ui/commit/54c8bf8e8f00ca6930811b29995aa286503e1a70))


### Features

* **confirm:** support parse content as html ([6053b7b](https://github.com/vexip-ui/vexip-ui/commit/6053b7b2b39ac92419f1c4160167e48a31165c04))
* **date-picker:** add exchange slot for range select ([1166e70](https://github.com/vexip-ui/vexip-ui/commit/1166e70fa70d166a9dfd514391f9cf9e092e1108))
* **date-picker:** support min and max props to bound date ([#216](https://github.com/vexip-ui/vexip-ui/issues/216)) ([9cfd677](https://github.com/vexip-ui/vexip-ui/commit/9cfd6772ce6da6b5e20a11eff7c29b88c29ffb5a))
* **message:** support parse content as html ([7bd4def](https://github.com/vexip-ui/vexip-ui/commit/7bd4def4b144975f92a3e4a1574a3ed024392f65))
* **notice:** support parse title and content as html ([18929a9](https://github.com/vexip-ui/vexip-ui/commit/18929a966e355ad290cf949bc3fa1d1838b07216))
* **time-picker:** add exchange slot for range select ([2431a64](https://github.com/vexip-ui/vexip-ui/commit/2431a64a3d06cef53ecf397639e315333146e89d))
* **time-picker:** support min and max props to bound time ([87dfc32](https://github.com/vexip-ui/vexip-ui/commit/87dfc32c920b980f9f55db5d819bcaae32a6e37f)), closes [#215](https://github.com/vexip-ui/vexip-ui/issues/215)
* **toast:** support parse content as html ([2609809](https://github.com/vexip-ui/vexip-ui/commit/26098090751e97d02c24ac6ead1c298d4c3306ef))



## [2.0.13](https://github.com/vexip-ui/vexip-ui/compare/v2.0.12...v2.0.13) (2022-11-09)


### Bug Fixes

* **drawer:** size abruptly change on resize when using percentage size ([4f81bd0](https://github.com/vexip-ui/vexip-ui/commit/4f81bd08ccb2ca62a31d928cabaf0fa0dacb3d86))
* improve input like components state style ([456f6bf](https://github.com/vexip-ui/vexip-ui/commit/456f6bf3bde9c6147b962a6c5c8f06fb76bb6d89))
* **select:** label not render when value is falsy ([5cbc2bf](https://github.com/vexip-ui/vexip-ui/commit/5cbc2bf00d576069b724888441a39a862cff4bb4)), closes [#207](https://github.com/vexip-ui/vexip-ui/issues/207)


### Features

* **tab-nav:** add placement prop ([8148eb0](https://github.com/vexip-ui/vexip-ui/commit/8148eb04cfc3ad3276852cdb5ac3ecf53d95949e)), closes [#176](https://github.com/vexip-ui/vexip-ui/issues/176)
* **tab-nav:** support built-in close button ([7ef0787](https://github.com/vexip-ui/vexip-ui/commit/7ef0787a8e72a73fc4f7c6b167b1f226b3ec2a4c)), closes [#201](https://github.com/vexip-ui/vexip-ui/issues/201)
* **tab-nav:** support create built-in add button ([f45d47c](https://github.com/vexip-ui/vexip-ui/commit/f45d47cf79e4d6c617a9db43e0254f9e0e1573ae)), closes [#208](https://github.com/vexip-ui/vexip-ui/issues/208)
* **tabs:** add closable and show-add props ([908abaa](https://github.com/vexip-ui/vexip-ui/commit/908abaa4f6a92e0eb5a14505b5e276d35519a8fe))
* **tabs:** add placement prop ([9d35443](https://github.com/vexip-ui/vexip-ui/commit/9d35443d61d20eeef82f11b1fa5fab9c5ababb7d))



## [2.0.12](https://github.com/vexip-ui/vexip-ui/compare/v2.0.11...v2.0.12) (2022-11-02)


### Bug Fixes

* **input:** value not clear when in sync mode ([81af6c6](https://github.com/vexip-ui/vexip-ui/commit/81af6c6a6e280282fa3386744bfbb96763e28207))
* **menu:** cache and reset group expanded when menu reduced change ([eca0dbb](https://github.com/vexip-ui/vexip-ui/commit/eca0dbb38660fba71968b1ed70ac7551b3d55be2))
* **menu:** item selected not update when label change ([6c97c83](https://github.com/vexip-ui/vexip-ui/commit/6c97c835945aae7306275763796391c9ff35db8c))
* **number-input:** value not clear when in sync mode ([608f2b5](https://github.com/vexip-ui/vexip-ui/commit/608f2b5527bd2b5fde6d88e20737db1eeb8e0eee))
* **overflow:** should refresh when wrapper resize ([5102c40](https://github.com/vexip-ui/vexip-ui/commit/5102c40d3fea565eca0a91277333e3439b5bd0d1))
* **tabs:** panel height should follow content ([e9a25ea](https://github.com/vexip-ui/vexip-ui/commit/e9a25eac42a16e1aec52610c22f20ffd00979592)), closes [#191](https://github.com/vexip-ui/vexip-ui/issues/191)


### Features

* **input:** add count slot ([0a27106](https://github.com/vexip-ui/vexip-ui/commit/0a271066a3603416ff179ed0495af86de1e0a193))
* **table:** aad checked class for rows ([0e02ac8](https://github.com/vexip-ui/vexip-ui/commit/0e02ac8ee38b7be61968dee7456675e881435886))
* **textarea:** add count slot ([70387be](https://github.com/vexip-ui/vexip-ui/commit/70387beb61d136ae9466c1ce1780ebe4d081a524))



## [2.0.11](https://github.com/vexip-ui/vexip-ui/compare/v2.0.10...v2.0.11) (2022-10-28)


### Bug Fixes

* **number-input:** should emit change event when enter ([83d7054](https://github.com/vexip-ui/vexip-ui/commit/83d7054606d277031de729efd7114b5743ec38df))
* **pagination:** explicitly plugins props values ([be46519](https://github.com/vexip-ui/vexip-ui/commit/be4651995e132a6cd3937bdc5a0ba098e29f4f5a))
* **pagination:** incorrect focus when change page with ellipsis show ([8ee696e](https://github.com/vexip-ui/vexip-ui/commit/8ee696e1abb09cb3e87467ec76f02023ed6d0189))
* **upload:** improve card type list style ([9119dbf](https://github.com/vexip-ui/vexip-ui/commit/9119dbf95f1e42cb1efa27d65f562d8c80bde56d))
* **upload:** incorrct control disabled style in image mode ([489f710](https://github.com/vexip-ui/vexip-ui/commit/489f710c33a76ca669696911c1e841ad586d5dc5))
* **wheel:** improve border style when disabled ([7d305bb](https://github.com/vexip-ui/vexip-ui/commit/7d305bbab63f4e407d99c6f117a1635d5d11ca56))


### Features

* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **layout:** add theme mode config ([394fa8c](https://github.com/vexip-ui/vexip-ui/commit/394fa8c720ef40ee993ac449af2f8ba6a4f0c0ee))
* **pagination:** add no-title prop ([c57fb2c](https://github.com/vexip-ui/vexip-ui/commit/c57fb2c427f1b950d6a2956d36e791944e0e906f))
* **tab-nav:** support specify tab items alignment ([19bf1b5](https://github.com/vexip-ui/vexip-ui/commit/19bf1b54fc1831007d63d74ec3ce6155502c86e4)), closes [#190](https://github.com/vexip-ui/vexip-ui/issues/190)



## [2.0.10](https://github.com/vexip-ui/vexip-ui/compare/v2.0.9...v2.0.10) (2022-10-25)


### Bug Fixes

* **pagination:** out of bounds when pages more then 4 digits ([638b2fd](https://github.com/vexip-ui/vexip-ui/commit/638b2fd124e3f1a0c67918f85fd2d5a99c9e7577))
* **split:** improve full button angles color ([9c92f74](https://github.com/vexip-ui/vexip-ui/commit/9c92f74f9793d2d0be618b51156a3d63011666a3))
* **tab-nav:** active not update when dynamic with using index as key ([aacc76a](https://github.com/vexip-ui/vexip-ui/commit/aacc76a250388dd096050e4f6d3d37de80305649))
* **table:** missing body bottom border style ([8aaf0a3](https://github.com/vexip-ui/vexip-ui/commit/8aaf0a3056769d0ba1a277338dd9c3eed1a227b5))
* **upload:** should show thumbnial when only non-base64 url ([18c26de](https://github.com/vexip-ui/vexip-ui/commit/18c26def771898cc4ca49cd4f8ae9a4ff71a1e26))


### Features

* **menu:** support passing a function as icon options ([257a150](https://github.com/vexip-ui/vexip-ui/commit/257a150b88fa3dd59e608892550bce4a3fdaeb42))
* **textarea:** add sync prop ([be5a73a](https://github.com/vexip-ui/vexip-ui/commit/be5a73aa8e10738db54a693248874fc2ff0f4c8e))



## [2.0.9](https://github.com/vexip-ui/vexip-ui/compare/v2.0.8...v2.0.9) (2022-10-24)


### Bug Fixes

* **alert:** incomplete content when using scroll with prefix icon ([f03da86](https://github.com/vexip-ui/vexip-ui/commit/f03da86dfa649dc96762bb149973c72ea0fc1e1c))
* **upload:** unexpectedly refresh router when delete file with thumbnail type ([15ea453](https://github.com/vexip-ui/vexip-ui/commit/15ea45368b27ce7cb1f341296e01434a519e3620))


### Features

* **breadcrumb:** support passing a function as name in options ([a60c663](https://github.com/vexip-ui/vexip-ui/commit/a60c663d82c6104126ea2b3eaf39b93548a1253f))
* **menu:** support passing a function as name in options ([ef240b7](https://github.com/vexip-ui/vexip-ui/commit/ef240b7b1120d5d4fc0236434567b0742658e0e2))
* **utils:** add ensureArray and callIfFunc methods ([2b4e986](https://github.com/vexip-ui/vexip-ui/commit/2b4e986bcce50a620c9dd2d71a96f025123d70fb))


### Performance Improvements

* **menu:** adjust to dynamic render poppers ([3805628](https://github.com/vexip-ui/vexip-ui/commit/380562862296566b7ecab4e5eec316b6ca46ba33))



## [2.0.8](https://github.com/vexip-ui/vexip-ui/compare/v2.0.7...v2.0.8) (2022-10-23)


### Bug Fixes

* **alert:** content display direction should be column ([1d208c5](https://github.com/vexip-ui/vexip-ui/commit/1d208c5c2044dfdc2b75afc9c9c52e3d3db83f6f))
* **cascader:** counter fails to disappear when passing empty array ([2589335](https://github.com/vexip-ui/vexip-ui/commit/258933545f220ad7d008b0dbcb0c58d9f76b7774)), closes [#181](https://github.com/vexip-ui/vexip-ui/issues/181)
* incorrect form control components init value ([24909c0](https://github.com/vexip-ui/vexip-ui/commit/24909c0c5f34fb30642340078b9c15a4de83e0c0))
* **input:** should hide native toggle plaintext button in Edge ([6bc0554](https://github.com/vexip-ui/vexip-ui/commit/6bc05540f3a5b3dc1cae30657309f975c5faa549)), closes [#178](https://github.com/vexip-ui/vexip-ui/issues/178)
* **overflow:** unexpectedly render slot when items passed empty array ([f3af8e2](https://github.com/vexip-ui/vexip-ui/commit/f3af8e23269800788ad368793641596f288be031))
* **pagination:** sync height of plugin controls to item height ([2de1fc9](https://github.com/vexip-ui/vexip-ui/commit/2de1fc9d707f40111859f9dc77602ed6344b02d9))
* **tab-nav:** not nested divider css vars ([77765dc](https://github.com/vexip-ui/vexip-ui/commit/77765dc5f55d3ed7fba54f99e04ec152101385dd))
* **table:** clearFilter method fails to reset options active ([865a69f](https://github.com/vexip-ui/vexip-ui/commit/865a69f9b91b67188ec2663478443fdc6b8782c7)), closes [#183](https://github.com/vexip-ui/vexip-ui/issues/183)
* **table:** maker double-click events work ([#186](https://github.com/vexip-ui/vexip-ui/issues/186)) ([137db89](https://github.com/vexip-ui/vexip-ui/commit/137db8910239ac6062884ebf4b2657754334bb43))
* **table:** rows in table head should not highlight ([ef091dc](https://github.com/vexip-ui/vexip-ui/commit/ef091dc17fdee17119bb7b1211bb4cf8a9bc11cd))
* **upload:** image thumbnail not effective ([b71b5dc](https://github.com/vexip-ui/vexip-ui/commit/b71b5dc231949542a3a0ad54ff9161675dfde786))


### Features

* **pagination:** support customize plugins position ([48cd1fd](https://github.com/vexip-ui/vexip-ui/commit/48cd1fd11ff553fd66719a3fdd597bf914159242))
* **pagination:** support page-size two way binding ([16f1750](https://github.com/vexip-ui/vexip-ui/commit/16f17508afa9d09cf6265c36a4aa0225394ff407))
* **table:** improve type columns will have default key if not define ([1cdcc6f](https://github.com/vexip-ui/vexip-ui/commit/1cdcc6f3cffca840f3a9bdf9573490bbfe09ce28))
* **upload:** add image upload mode ([#180](https://github.com/vexip-ui/vexip-ui/issues/180)) ([d1e3201](https://github.com/vexip-ui/vexip-ui/commit/d1e3201d1b62e9feba9cf41249bed637c7da1f42))


### Performance Improvements

* **table:** improve to precisely deep watch column props ([f74c4df](https://github.com/vexip-ui/vexip-ui/commit/f74c4dfc98ac85d2a959a030741eff9dd427e1fd))



## [2.0.7](https://github.com/vexip-ui/vexip-ui/compare/v2.0.6...v2.0.7) (2022-10-17)


### Bug Fixes

* **config:** ensure responsive variables namespace ([4b334c9](https://github.com/vexip-ui/vexip-ui/commit/4b334c9a0602524f65d9921e6c4f837dcdd5a766))
* **space:** items should default flex display ([2b34b10](https://github.com/vexip-ui/vexip-ui/commit/2b34b107eae5a815f19b278e7149e7b402f87883))
* **tab-nav:** list should default no margin ([4dad8da](https://github.com/vexip-ui/vexip-ui/commit/4dad8da121c0719381884fb32a14539f20ec469c))


### Features

* **layout:** add header-avatar slot ([7574693](https://github.com/vexip-ui/vexip-ui/commit/7574693663e8f53c1451165404fff53216d7f957))
* **tab-nav:** add options prop ([d9f868f](https://github.com/vexip-ui/vexip-ui/commit/d9f868fb0f67d67d6bd3e533230a18ecc5d4f558))
* **tab-nav:** add prefix and suffix slots ([f6034cd](https://github.com/vexip-ui/vexip-ui/commit/f6034cd3c263ff29480042b183326d70f5c5fb3a))
* **tabs:** add prefix and suffix slots ([db8a5ab](https://github.com/vexip-ui/vexip-ui/commit/db8a5ab2e8637f663c7921238c32e49c1bd34d04))
* **utils:** add randomColor method ([adc3878](https://github.com/vexip-ui/vexip-ui/commit/adc387828749bd4426f5ffc14123a75e2d874111))
* **utils:** add series log once methods ([c4fc460](https://github.com/vexip-ui/vexip-ui/commit/c4fc4608ebd72fa516700f032cca22d3df67d673))



## [2.0.6](https://github.com/vexip-ui/vexip-ui/compare/v2.0.4...v2.0.6) (2022-10-13)


### Bug Fixes

* **bubble:** keep consistent behavior for newline ([7bb25a2](https://github.com/vexip-ui/vexip-ui/commit/7bb25a24109d14a0468ac94deed1f144b5211966)), closes [#164](https://github.com/vexip-ui/vexip-ui/issues/164)
* **button:** missing button badge color css var ([bdb22c7](https://github.com/vexip-ui/vexip-ui/commit/bdb22c72b99fd97674ff42afada9cd12ce5f0e68))
* **divider:** missing text-color css var ([509f932](https://github.com/vexip-ui/vexip-ui/commit/509f932c34872108ded8ba638eed5626f774a4c1))
* **form:** add submit and reset style deps ([a8ac3ec](https://github.com/vexip-ui/vexip-ui/commit/a8ac3ec6787f006a22ac269d0f30ba2ce2c3e17c))
* **input:** not effective debounce prop ([46c5d31](https://github.com/vexip-ui/vexip-ui/commit/46c5d31f29aa390f441e278874f6bbcebddee093))
* **layout:** add style dependencies ([04edd03](https://github.com/vexip-ui/vexip-ui/commit/04edd03b4dfcb7079d6d51ecc19a53cdca6116d6))
* **plugins:** support typography style alias ([f89cfef](https://github.com/vexip-ui/vexip-ui/commit/f89cfefbe43da61c4fce258e5d55166f89b9b152))


### Features

* **input:** add sync prop ([7dc7289](https://github.com/vexip-ui/vexip-ui/commit/7dc7289b12820a4ba74ce092dd45c11b2cb40d75)), closes [#169](https://github.com/vexip-ui/vexip-ui/issues/169)
* **number-input:** add sync prop ([7b50304](https://github.com/vexip-ui/vexip-ui/commit/7b50304abfb38a8d47a5e84ba456b43ec7757c08))
* **plugins:** add iconPrefix option for resolver ([11ccffd](https://github.com/vexip-ui/vexip-ui/commit/11ccffd91bee0f4491990045b94855bd76db375b))
* **plugins:** support auto resolve icon components ([#167](https://github.com/vexip-ui/vexip-ui/issues/167)) ([fef768c](https://github.com/vexip-ui/vexip-ui/commit/fef768cd14ccf1245ec3db9e45c3651bc8ca1ca6))



## [2.0.4](https://github.com/vexip-ui/vexip-ui/compare/v2.0.3...v2.0.4) (2022-09-23)


### Bug Fixes

* **color-picker:** incorrect inner input style ([b49bb49](https://github.com/vexip-ui/vexip-ui/commit/b49bb494dde6bfa297ad00f2091c0d0ce14d6b6b))
* **form:** should not submit when form is not native ([8b27f2a](https://github.com/vexip-ui/vexip-ui/commit/8b27f2a7277fd0eabac1139e6d68484dc2894847))
* **menu:** content disappears not in time when collapsing ([cfd93c1](https://github.com/vexip-ui/vexip-ui/commit/cfd93c1e1e74bfcad231d9d4e2dd63c7c6f0f412)), closes [#162](https://github.com/vexip-ui/vexip-ui/issues/162)


### Features

* **alert:** support auto scroll for content ([a3594c0](https://github.com/vexip-ui/vexip-ui/commit/a3594c09a1836dc523ee02901ab81e3ae1c79ebb))
* **button:** support create inner badge ([3353761](https://github.com/vexip-ui/vexip-ui/commit/33537615b64bce84fea5285cf33588dffa10f702))


### Performance Improvements

* lazy render popper for select type components ([f7b96cc](https://github.com/vexip-ui/vexip-ui/commit/f7b96cca8a58b95586d64572c7cae6d1634f4449))



## [2.0.3](https://github.com/vexip-ui/vexip-ui/compare/v2.0.2...v2.0.3) (2022-09-20)


### Features

* **carousel:** add ignore-hover prop ([0c1c221](https://github.com/vexip-ui/vexip-ui/commit/0c1c221b9c9c8542508af5f2e497cc0f24c53d02))
* **utils:** add compute dom react methods ([20fcb71](https://github.com/vexip-ui/vexip-ui/commit/20fcb7134286b7ad99a8e3f5e39ca695354b944f))



## [2.0.2](https://github.com/vexip-ui/vexip-ui/compare/v2.0.1...v2.0.2) (2022-09-19)


### Bug Fixes

* **carousel:** confusion when switch left or top in loop ([0483eeb](https://github.com/vexip-ui/vexip-ui/commit/0483eebe23cf9ff4e518498b855581b9fd666590))
* **table:** incorrect bg color when transparent in dark theme ([c197979](https://github.com/vexip-ui/vexip-ui/commit/c197979fea6cef7e56f6ed06d0643e19928c68e2))


### Features

* **auto-complete:** add transparent prop ([1111b96](https://github.com/vexip-ui/vexip-ui/commit/1111b96b4766bf38ac7e24e33e6c968d434673f3))
* **cascader:** add transparent prop ([379c862](https://github.com/vexip-ui/vexip-ui/commit/379c862a6b497f9a870faa81dcc8a24289a75c55))
* **input:** add transparent prop ([cdc6e08](https://github.com/vexip-ui/vexip-ui/commit/cdc6e087e1246f1bde12a74abcbca277dea9b7fb))
* **layout:** add expandMenuByLabel api method ([bd864b0](https://github.com/vexip-ui/vexip-ui/commit/bd864b0d777b06344058b082aee14cc85a686e71)), closes [#156](https://github.com/vexip-ui/vexip-ui/issues/156)
* **select:** add transparent prop ([972ca83](https://github.com/vexip-ui/vexip-ui/commit/972ca834670afbc059458e330487ecdc8b8a9c95))



## [2.0.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0...v2.0.1) (2022-09-18)


### Bug Fixes

* **slider:** missing width when in flex layout ([7506916](https://github.com/vexip-ui/vexip-ui/commit/75069164ea8bfdac51acc33f0cda1d116b07e344))


### Features

* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **table:** support series of class, style, attrs and events ([d7291d8](https://github.com/vexip-ui/vexip-ui/commit/d7291d86490d2dc7ace6f8e06aee58a59f43df0e)), closes [#154](https://github.com/vexip-ui/vexip-ui/issues/154)



# [2.0.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-rc.1...v2.0.0) (2022-09-16)


### Bug Fixes

* **button:** missing icon when has any content ([26e199b](https://github.com/vexip-ui/vexip-ui/commit/26e199bf4ec79347bea9d594ade4c75b937cfccb))
* **checkbox-group:** incorrect update value from props.value ([9513ad7](https://github.com/vexip-ui/vexip-ui/commit/9513ad7cc054769e85d4082cc77c5d67bb443bfe)), closes [#147](https://github.com/vexip-ui/vexip-ui/issues/147)
* **config:** incorrect event prop regexp ([849ac5b](https://github.com/vexip-ui/vexip-ui/commit/849ac5bc033751e706a329f8c745862c995ecaa0)), closes [#139](https://github.com/vexip-ui/vexip-ui/issues/139)
* **form:** correctly delete form item ([4ce34e8](https://github.com/vexip-ui/vexip-ui/commit/4ce34e8110cbbae297f534fc230e838a43c05770))
* **form:** rename label-position to label-align ([ad593bb](https://github.com/vexip-ui/vexip-ui/commit/ad593bb29c9ba56c67b78c0f43b87ddc3dc8cecb))
* **slider:** incorrect judge to emit input event ([f13656e](https://github.com/vexip-ui/vexip-ui/commit/f13656e97ddf96b19675d698b60bdb23bc0a5591))
* **table:** unstable row rendering ([4546389](https://github.com/vexip-ui/vexip-ui/commit/45463890af9b120eb587563dda813a2084f604a5))


### Code Refactoring

* **upload:** all callbacks and events first param change to FileState ([069edae](https://github.com/vexip-ui/vexip-ui/commit/069edae351b6992b4949a8f0d636d376f0221ad0))


### Features

* add Typography components ([#146](https://github.com/vexip-ui/vexip-ui/issues/146)) ([8cca389](https://github.com/vexip-ui/vexip-ui/commit/8cca38939c7517af0b9e4b56007073d4a95d90df))
* **anchor:** add force-active prop ([ecdc9e3](https://github.com/vexip-ui/vexip-ui/commit/ecdc9e3568d51159c884245aaa80f789f786f5aa))
* **form:** add help prop for item ([69e4996](https://github.com/vexip-ui/vexip-ui/commit/69e499661c2f5611bf0a14200903108645c44015))
* **form:** add inline prop ([f2db62a](https://github.com/vexip-ui/vexip-ui/commit/f2db62a17bb32795f572d18c1096b041550d44ad))
* **form:** support pure form item render ([65d6b30](https://github.com/vexip-ui/vexip-ui/commit/65d6b30dfed4277859234f288eb23e6ce3f1ac76))
* **form:** support set size for all controls under form ([a332eca](https://github.com/vexip-ui/vexip-ui/commit/a332ecaad8993b1aac9c658b685570ebae198409))
* **menu:** add expandItemByLabel api method ([38003cd](https://github.com/vexip-ui/vexip-ui/commit/38003cdd8b0493b428d14adb8bdc1e9b02aaf619)), closes [#141](https://github.com/vexip-ui/vexip-ui/issues/141)
* **slider:** add reverse prop ([a1ee27e](https://github.com/vexip-ui/vexip-ui/commit/a1ee27efcdc13df1807a0dee2fbef3035d23601a)), closes [#142](https://github.com/vexip-ui/vexip-ui/issues/142)
* **slider:** support add markers and only-marker select ([ea1be6b](https://github.com/vexip-ui/vexip-ui/commit/ea1be6ba83e507faff9b7cd367c262bb41fc3030))
* **slider:** support range select mode ([b5534f9](https://github.com/vexip-ui/vexip-ui/commit/b5534f97945334262862fc37870fc3c8c67c6990)), closes [#77](https://github.com/vexip-ui/vexip-ui/issues/77)
* **tree:** add label-click event ([61f2f7a](https://github.com/vexip-ui/vexip-ui/commit/61f2f7a022caa08eced7ff4fa88f5120963c499b)), closes [#149](https://github.com/vexip-ui/vexip-ui/issues/149)


### BREAKING CHANGES

* **upload:** Upload component all callbacks and events first param
change from SourceFile to FileState, this will make the states of files
inside the component controllable. This change also fix cannot init
file list via urls.
* **form:** To better fit the description of this feature, change
the `label-position` name to `label-align`



# [2.0.0-rc.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2022-09-06)


### Bug Fixes

* **breadcrumb:** unexpected page reloads when item clicked ([19f387e](https://github.com/vexip-ui/vexip-ui/commit/19f387ebcd720ce09d9c7c4bf7d271820d872414)), closes [#131](https://github.com/vexip-ui/vexip-ui/issues/131)
* **ellipsis:** html attributes not effective ([a2b7857](https://github.com/vexip-ui/vexip-ui/commit/a2b7857243794ed837fc2cab87561958e51919b0)), closes [#129](https://github.com/vexip-ui/vexip-ui/issues/129)
* **upload:** should not prevent default when keydown ([b4b92f4](https://github.com/vexip-ui/vexip-ui/commit/b4b92f43b0265ec749ca60337a883fbdd3c41fa8)), closes [#130](https://github.com/vexip-ui/vexip-ui/issues/130)


### Features

* **anchor:** support bind url hash ([797bd87](https://github.com/vexip-ui/vexip-ui/commit/797bd871c2c0d9d4a25948f37abfc2aaeb8cf7ab))
* **toast:** add toast plugin (manager) ([#128](https://github.com/vexip-ui/vexip-ui/issues/128)) ([a3be410](https://github.com/vexip-ui/vexip-ui/commit/a3be4101f870fe0eab242ad2bccf22f584d1dc78))
* **viewer:** add on-transition prop ([689ecd0](https://github.com/vexip-ui/vexip-ui/commit/689ecd0ceff2be465b9b3812fcd6b619c1330f9c))
* **Viewer:** using mouse position as transform origin for zooming ([#73](https://github.com/vexip-ui/vexip-ui/issues/73)) ([2ed544e](https://github.com/vexip-ui/vexip-ui/commit/2ed544e4a90b09be3fb047a6ff52687d9dccfdbe))



# [2.0.0-rc.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.21...v2.0.0-rc.0) (2022-08-31)


### Bug Fixes

* **button:** incorrect render when loading with icon-only prop ([c051bc5](https://github.com/vexip-ui/vexip-ui/commit/c051bc56b0b2bddbb6a70690d7787c70b560ad9e))
* **cascader:** options hitting init not in time ([36df57c](https://github.com/vexip-ui/vexip-ui/commit/36df57cd4f2ebf20850c19baf029d4c652e4b63f))
* **color-picker:** hide panel when disabled change to true ([c152d67](https://github.com/vexip-ui/vexip-ui/commit/c152d67b2dcdcd8cc52afc59e71f83fcb6dd0c88))
* **date-picker:** effect shortcut when using range select ([9fbfc71](https://github.com/vexip-ui/vexip-ui/commit/9fbfc7153cc51386fd22549a1d3b4e05bff82ffa)), closes [#105](https://github.com/vexip-ui/vexip-ui/issues/105)
* **icon:** spin and pulse not effective ([11c6d69](https://github.com/vexip-ui/vexip-ui/commit/11c6d6961d22c341b456edba61aab19e15f1b5a6)), closes [#112](https://github.com/vexip-ui/vexip-ui/issues/112)
* **option:** correct selected style priority ([48fd2f3](https://github.com/vexip-ui/vexip-ui/commit/48fd2f3f4e0c9194ffdc8a62fd4da22c78ae2f00))
* **table:** incorrect y scroll after adding any row ([a597fea](https://github.com/vexip-ui/vexip-ui/commit/a597fea5fbb02f2b370e66885c737c3e235c1479)), closes [#121](https://github.com/vexip-ui/vexip-ui/issues/121)
* **transfer:** correct params for select event ([c2d0d6f](https://github.com/vexip-ui/vexip-ui/commit/c2d0d6f86340da0a0b13f2437eb261c4d772cfdf))
* **tree:** not trigger async load when click label with floor-select ([d4e63cc](https://github.com/vexip-ui/vexip-ui/commit/d4e63cccb4a82e7ec82aab37bfc6c8ba0cca7194))
* **tree:** parent node will disappear when drop to its child node ([e0440fd](https://github.com/vexip-ui/vexip-ui/commit/e0440fd96b0e555e6d25c14dbb3734c449f94053)), closes [#125](https://github.com/vexip-ui/vexip-ui/issues/125)
* **tree:** render empty tip when filter result is empty ([3d9cfb6](https://github.com/vexip-ui/vexip-ui/commit/3d9cfb6c16eb8d0beaecede5467f07d8c400c0b8)), closes [#123](https://github.com/vexip-ui/vexip-ui/issues/123)


### Code Refactoring

* export types of components in top ([092ffff](https://github.com/vexip-ui/vexip-ui/commit/092ffff033b3812bef9555052f50685ec6c63c82)), closes [#84](https://github.com/vexip-ui/vexip-ui/issues/84)


### Features

* **anchor:** support create links via using options prop ([1f712f6](https://github.com/vexip-ui/vexip-ui/commit/1f712f68231d26ab07a6ca5e900474e79c5e7604)), closes [#94](https://github.com/vexip-ui/vexip-ui/issues/94)
* **checkbox:** support quickly add control via prop ([4d13ec2](https://github.com/vexip-ui/vexip-ui/commit/4d13ec23db7095415b8d24d17c0c56be564d1298)), closes [#104](https://github.com/vexip-ui/vexip-ui/issues/104)
* **drawer:** support add footer with default action buttons ([ddbc8a3](https://github.com/vexip-ui/vexip-ui/commit/ddbc8a34526c1f9549e1a067795a488de43c3eaa)), closes [#117](https://github.com/vexip-ui/vexip-ui/issues/117)
* **select:** add update:label event to quickly get label ([77f8372](https://github.com/vexip-ui/vexip-ui/commit/77f837279ad9d650db8c8516989726effd2b109c)), closes [#127](https://github.com/vexip-ui/vexip-ui/issues/127)


### BREAKING CHANGES

* **tree:** To unify the signatures of tree's function parameters,
`on-async-load` parameters is changed from `(node)` to `(data, node)`.
* Currently can import types from `vexip-ui`, no longger
imports will be from `vexip-ui/es/xxx`.



# [2.0.0-beta.21](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2022-08-15)


### Bug Fixes

* **checkbox:** effective using control to check all ([70a5bb2](https://github.com/vexip-ui/vexip-ui/commit/70a5bb2778f3c9d441b5f072ab1762b4ed197381)), closes [#103](https://github.com/vexip-ui/vexip-ui/issues/103)
* **date-picker:** effect key number input value ([75e1510](https://github.com/vexip-ui/vexip-ui/commit/75e1510f4bdec72fe71c021e47ffba927877666a))
* **date-picker:** emit change column event when open panel ([1045cb4](https://github.com/vexip-ui/vexip-ui/commit/1045cb4674ef965dd8a8de78635dc0818c2e73fa))
* **modal:** resize start event payload ([d04ebe6](https://github.com/vexip-ui/vexip-ui/commit/d04ebe69f17cf981be44e6a6c638e40086d174fd))
* **select:** using string schema to match option value when filter ([470600e](https://github.com/vexip-ui/vexip-ui/commit/470600ebf0cb41d76a667f4969912abfa26bf576))
* **time-picker:** minute column step is invaild ([02051e6](https://github.com/vexip-ui/vexip-ui/commit/02051e6df939cf5c5d280cda7a123e38a0814bca))


### Features

* **date-picker:** add focus and blur api methods ([2aeca22](https://github.com/vexip-ui/vexip-ui/commit/2aeca227976e5b7a116b23ef31a68299a4b876b7))
* **ellipsis:** support multiple rows to ellipsis  ([#108](https://github.com/vexip-ui/vexip-ui/issues/108)) ([5d78541](https://github.com/vexip-ui/vexip-ui/commit/5d78541c99aeaee6982a4b02da44efe75c8f0c22))
* **time-picker:** add focus and blur api methods ([2080779](https://github.com/vexip-ui/vexip-ui/commit/20807791178caf39bbf14ecd0d4fe57eef1c8bb9))



# [2.0.0-beta.20](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2022-08-04)


### Bug Fixes

* **auto-complete:** correctly init input control value ([99669a2](https://github.com/vexip-ui/vexip-ui/commit/99669a2b7b4ef6fdcfa90f51cd8cad4e745b96ee))
* **breadcrumb:** using `<a>` as label tag ([63832d2](https://github.com/vexip-ui/vexip-ui/commit/63832d2e8bd10af4257dc41e00e221953b3ff515))
* **cascader:** correct focus when mixed using mouse and keyboard ([7e9535c](https://github.com/vexip-ui/vexip-ui/commit/7e9535ce37ec282721ec386061bc3f862d576046))
* **layout:** auto adjust menu width when no aside ([a218943](https://github.com/vexip-ui/vexip-ui/commit/a21894303869124dd515e519251791ce4835be8d))
* **masker:** using visibility hidden instead v-show ([a0d41bd](https://github.com/vexip-ui/vexip-ui/commit/a0d41bd14d763997d722c9326ba6ee73bbd22f3d))
* **textarea:** missing Icon register ([b04627a](https://github.com/vexip-ui/vexip-ui/commit/b04627ac03f9c0c128b8d08c8f5f328432ea2072))


### Features

* **button:** add no-pulse and icon-only props ([342655c](https://github.com/vexip-ui/vexip-ui/commit/342655cff8728c7c39010475eb0e7fdd8f5115af))
* **form:** add built in row layout ([561ff23](https://github.com/vexip-ui/vexip-ui/commit/561ff231edc04bf00ebed3653442f4b679d98e90))
* **form:** support responsive label width ([e1ae713](https://github.com/vexip-ui/vexip-ui/commit/e1ae7132c06c9ab49720650ab81f598f72057356))
* **layout:** auto toggle links layout when footer resize ([f5786ff](https://github.com/vexip-ui/vexip-ui/commit/f5786ffe2ff1938d64c65022c63aa4222e412268))
* **layout:** auto toggle sign name show when header resize ([bceb75d](https://github.com/vexip-ui/vexip-ui/commit/bceb75d65a02ea3d7406a4b66ac5fa437eaab33f))
* **scroll:** add ensureInView api method ([090367d](https://github.com/vexip-ui/vexip-ui/commit/090367d71c0d0ccdb54afd88a60feb1ffe7826d7))
* **select:** support dynamic create options ([3673b83](https://github.com/vexip-ui/vexip-ui/commit/3673b83e344fb018ba495bd974d75497c4ef5c2d)), closes [#99](https://github.com/vexip-ui/vexip-ui/issues/99)
* **select:** support filter options ([31d1cd8](https://github.com/vexip-ui/vexip-ui/commit/31d1cd89ddaec9197315c75456b51744cf2e7350))
* **select:** support use backspace to delete tag ([f05e8f4](https://github.com/vexip-ui/vexip-ui/commit/f05e8f41bf03183e891d6b1fb6acdeb97ac7e098))



# [2.0.0-beta.19](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2022-08-01)


### Bug Fixes

* fixed css vars prefix to '--vxp' ([e4c1da3](https://github.com/vexip-ui/vexip-ui/commit/e4c1da34964bfde8faf3f4bb3f96df51d1625a6d))
* improve input-like control styles ([fb6ec62](https://github.com/vexip-ui/vexip-ui/commit/fb6ec626c4a17a390b6907f8e6e14ef57010a65e))
* **layout:** router menu not effective in aside ([de2aec9](https://github.com/vexip-ui/vexip-ui/commit/de2aec9d6c67bd8dfb250ed6679a885409745987)), closes [#100](https://github.com/vexip-ui/vexip-ui/issues/100)
* **menu:** improve menu focus and styles ([d905e9b](https://github.com/vexip-ui/vexip-ui/commit/d905e9b87795ae6badfcf33c263c27d486fcf7b5))


### Code Refactoring

* **menu:** improve class names to flat styles ([5f9eb15](https://github.com/vexip-ui/vexip-ui/commit/5f9eb157276c43d02b77a72c9a460ed70a0ebb5e)), closes [#91](https://github.com/vexip-ui/vexip-ui/issues/91)


### Features

* **auto-complete:** support control loading state ([0dc2098](https://github.com/vexip-ui/vexip-ui/commit/0dc20984488778d3294e6a270d908bde96941232))
* **checkbox:** support control loading state ([0a2b4be](https://github.com/vexip-ui/vexip-ui/commit/0a2b4be78676cd17c66a9ac1e6f84cf13f67e7ce))
* **form:** support set loading for all controls under form ([a43ca86](https://github.com/vexip-ui/vexip-ui/commit/a43ca86d1a3338df7f33b33f9bc3f8000c1e9f3e))
* **layout:** add color and colors props ([f639db3](https://github.com/vexip-ui/vexip-ui/commit/f639db3390d94e9a2fb32afa40122593bebf692c))
* **layout:** export header, aside and footer components ([7a1bdae](https://github.com/vexip-ui/vexip-ui/commit/7a1bdae080c902c257131fc363c661b6835e64aa))
* **radio:** support control loading state ([eefc325](https://github.com/vexip-ui/vexip-ui/commit/eefc325580b2c098405e771f6e60189a46ba4f09))
* **slider:** support control loading state ([4c121cc](https://github.com/vexip-ui/vexip-ui/commit/4c121cc6ac14c97bc0d2bc653abd85071a5b2f23))
* **switch:** support custom loading icon ([c1aa3da](https://github.com/vexip-ui/vexip-ui/commit/c1aa3da06ac5fe4f9ff77b81d740cdc0bb1a72ae))
* **transfer:** support control loading state ([69c93f9](https://github.com/vexip-ui/vexip-ui/commit/69c93f9f435b04bfc032c7af96b1f5df338c1471))
* **upload:** support control loading state ([1a289f1](https://github.com/vexip-ui/vexip-ui/commit/1a289f199c92066d49ffc2aa5231b8943148c022))
* **wheel:** support control loading state ([3e3c517](https://github.com/vexip-ui/vexip-ui/commit/3e3c517a9cecdffd06f063772b8b2ff33c3ea889))


### BREAKING CHANGES

* **menu:** `theme` prop has deprecated, using css vars to adjust
menu styles. `tooltipTheme` rename to `tooltipReverse`.



# [2.0.0-beta.18](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2022-07-29)


### Bug Fixes

* **cascader:** correct panels class name ([fef30d8](https://github.com/vexip-ui/vexip-ui/commit/fef30d839e03327f656ee437f3b540721e4585bb))
* **icon:** add `<g>` wrapper to isolate transform styles ([4f88644](https://github.com/vexip-ui/vexip-ui/commit/4f8864444c75f5de8d0a276d651bcc0c4242ca4d))
* **icon:** improve inner `<g>` styles ([1d961f4](https://github.com/vexip-ui/vexip-ui/commit/1d961f44eb4df5451947fd3d0a5ef2f0241b2a6a))
* **input:** before/after-button rename to before/after-action ([a4f202b](https://github.com/vexip-ui/vexip-ui/commit/a4f202bf48aa4b8bcba1102e14fa5fc899062346))


### Features

* **cascader:** support control loading state ([18cca8e](https://github.com/vexip-ui/vexip-ui/commit/18cca8e268b9a64da87e49cf0013dba556216144))
* **color-picker:** support control loading state ([55ffc55](https://github.com/vexip-ui/vexip-ui/commit/55ffc553b4190995749a514744bf585f194d6373))
* **date-picker:** support control loading state ([0389a80](https://github.com/vexip-ui/vexip-ui/commit/0389a80980ee618e6d329d206410f237f8e6de15))
* **input:** add custom slots to place button in before or after ([6c0a1f7](https://github.com/vexip-ui/vexip-ui/commit/6c0a1f7e651c8b85ebbbb0d0e556a347486408f8))
* **input:** support control loading state ([3ec0e59](https://github.com/vexip-ui/vexip-ui/commit/3ec0e59e34f9000f62fbd296c36966c36b07ea9b))
* **number-input:** suport control loading state ([a3ba14d](https://github.com/vexip-ui/vexip-ui/commit/a3ba14d3430fb795e951563c209b2fe956baf142))
* **select:** support control loading state ([77083f4](https://github.com/vexip-ui/vexip-ui/commit/77083f4e32327c1caae780a94ea3bd269f94541f))
* **textarea:** support control loading state ([a889b18](https://github.com/vexip-ui/vexip-ui/commit/a889b1873343c5cdaa71759da1fd8b353fea8262))



# [2.0.0-beta.17](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2022-07-26)


### Bug Fixes

* all transition names using injected namespace ([432f0f7](https://github.com/vexip-ui/vexip-ui/commit/432f0f7bf2e2f41fab7712cbd8e4ea5cf92f1158))
* **layout:** correct main size when aside reduced ([1b9d350](https://github.com/vexip-ui/vexip-ui/commit/1b9d350ab61a257e5a8cf3d683218657216a0628))
* **mixins:** useVirtual sync scroll top after item resize ([fe7122e](https://github.com/vexip-ui/vexip-ui/commit/fe7122e2a4449608a267959ecc4a874db4480d30))
* **select:** auto scroll to active option ([1e72722](https://github.com/vexip-ui/vexip-ui/commit/1e727223698006a35c7a88af207f2e3027fef0e4))
* **transfer:** improve panel resize ([c695607](https://github.com/vexip-ui/vexip-ui/commit/c69560728dffceb0e291bd992b95f16cd39a540d))
* **virtual-list:** not emit resize event ([17caeec](https://github.com/vexip-ui/vexip-ui/commit/17caeec1f71d1bb70aab5b6a56bf1e196df9c690))


### Features

* **auto-complete:** support group options ([ee94d77](https://github.com/vexip-ui/vexip-ui/commit/ee94d77b9d0d2b5c0c7f31230258c46735d0dcf2))
* **mixins:** useVirtual add methods to ensure item in view ([e77fc2c](https://github.com/vexip-ui/vexip-ui/commit/e77fc2cab89811c9aafee60152879cc95715453d))
* **select:** support group options via using prop ([9a37e0d](https://github.com/vexip-ui/vexip-ui/commit/9a37e0d126aa07889136531ed1cbcf7c1dd2aaad))



# [2.0.0-beta.16](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2022-07-25)


### Bug Fixes

* **auto-complete:** correct input value when enter without hitting ([2e9fb90](https://github.com/vexip-ui/vexip-ui/commit/2e9fb9046de5e96029a784568df9a62e787885f6))
* **collapse:** infinite loop when toggle in accordion mode ([973c522](https://github.com/vexip-ui/vexip-ui/commit/973c522be26f1b40621219c53f40bedff790d2eb)), closes [#50](https://github.com/vexip-ui/vexip-ui/issues/50)
* **contextmenu:** adjust promise returns to array ([165681b](https://github.com/vexip-ui/vexip-ui/commit/165681b37cf5bf19ae840c935e9eb1667bdfe55f))
* **mixins:** useModifier support auto reset when blur ([0f6a993](https://github.com/vexip-ui/vexip-ui/commit/0f6a993096fd81b5d6254137247463fc889f44fd))
* **mixins:** useModifier unable to read activeKeys ([5c36e65](https://github.com/vexip-ui/vexip-ui/commit/5c36e658b97914f8d09c3aec39b8768329049ff1))
* **mixins:** useVirtual implement scroll api methods ([012258a](https://github.com/vexip-ui/vexip-ui/commit/012258a61bf3965d43e36a635b597e819a6e96b0))
* **transfer:** correct panel tab index ([a27aa27](https://github.com/vexip-ui/vexip-ui/commit/a27aa27dca215b3b24fe627eef1d756133b9b9ae))
* **transfer:** follow hitting option when using keyboard ([75d7284](https://github.com/vexip-ui/vexip-ui/commit/75d72843da49d62a0aaef38179678bc8a1dae6bf))
* **virtual-list:** auto refresh when item count change ([2860b32](https://github.com/vexip-ui/vexip-ui/commit/2860b329ac451d7ce8a2699540aa3715e27e3872))
* **virtual-list:** expose scroll api methods ([5010651](https://github.com/vexip-ui/vexip-ui/commit/50106515154b9eae8ccb02896b1275da4b7765ef))
* **virtual-list:** normalize items tag styles ([5f8638d](https://github.com/vexip-ui/vexip-ui/commit/5f8638d77742eb49ce9fde42963795d5c49f1909))


### Code Refactoring

* `pane` rename to `panel` ([9a150f2](https://github.com/vexip-ui/vexip-ui/commit/9a150f28f4c614c85000198974043819440f97b3))


### Features

* **checkbox:** add tab-index prop ([7b574f2](https://github.com/vexip-ui/vexip-ui/commit/7b574f243be9d957c61acee6011b50b3ac66dded))
* **form:** support disable all controls under form ([998c219](https://github.com/vexip-ui/vexip-ui/commit/998c2199504bd3637e1053f04f6ba4aa7818eba6))
* **menu:** support accessible keyboard ([ede2772](https://github.com/vexip-ui/vexip-ui/commit/ede2772a41b523f335670217d364a93505b21071))
* **native-scroll:** add wrapper-tag prop ([700e07d](https://github.com/vexip-ui/vexip-ui/commit/700e07d7b8df63f440ef480478298643c9aa4893))
* **scroll:** add wrapper-tag prop ([ad364e6](https://github.com/vexip-ui/vexip-ui/commit/ad364e685203a6e37f00b679fdc49f39c2bfcc32))
* support accessibility for components ([#97](https://github.com/vexip-ui/vexip-ui/issues/97)) ([51d5556](https://github.com/vexip-ui/vexip-ui/commit/51d555612d72ae495569cfbf56472d6764ac3dce))
* **transfer:** add Transfer component ([#96](https://github.com/vexip-ui/vexip-ui/issues/96)) ([454e05b](https://github.com/vexip-ui/vexip-ui/commit/454e05b937106767522f83c7d2fee16095eda3ca))
* **utils:** add dom utils ([b461c9a](https://github.com/vexip-ui/vexip-ui/commit/b461c9a133365f3c4fa786bc669ddabd18c05724))


### BREAKING CHANGES

* CollapsePane and TabPane deprecated, using
CollapsePanel and TabPanel instead.



# [2.0.0-beta.15](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2022-07-18)


### Bug Fixes

* **dropdown:** sync drop stata when using hover trigger ([0d8ed5e](https://github.com/vexip-ui/vexip-ui/commit/0d8ed5ebf61516f2f79800c2a2e0e61107076133))
* **menu:** marker show when disabled in horizontal mode ([e1b1153](https://github.com/vexip-ui/vexip-ui/commit/e1b115350e155f91e27a04ea57ad1acd10fddde0))
* **menu:** title padding error when horizontal ([b834295](https://github.com/vexip-ui/vexip-ui/commit/b834295b6ee0e069be5919f3505c4a52f9bb0e3e))
* **overflow:** consider the padding of wrapper ([ee9327d](https://github.com/vexip-ui/vexip-ui/commit/ee9327ddbf829391465dca8192543fd9b4a2757d))
* **overflow:** support directly render children ([c17c20b](https://github.com/vexip-ui/vexip-ui/commit/c17c20b5e94467bd1e6675e974f9bf8df9b4aba5))
* **renderer:** misisng component name ([b2607aa](https://github.com/vexip-ui/vexip-ui/commit/b2607aaff93f8e87f13602472d85cae2f8228a43))
* **tooltip:** support fragment when using wrapper ([68be420](https://github.com/vexip-ui/vexip-ui/commit/68be420456f5f0a7b4ef0862b4fac5fea6ab05ab))
* useClickoutside directly passing a callback ([ebf4842](https://github.com/vexip-ui/vexip-ui/commit/ebf4842eafab6175a929e0e2cb26cca88a6b2347))


### Code Refactoring

* **tooltip:** improve component structure, add multiple features ([e44f327](https://github.com/vexip-ui/vexip-ui/commit/e44f32765647db52d05d3acbd07454b92164f34e))


### Features

* **Layout:** create Layout component ([#88](https://github.com/vexip-ui/vexip-ui/issues/88)) ([22c2b6d](https://github.com/vexip-ui/vexip-ui/commit/22c2b6d53f0ae27e64b320e49e6b088edd92b057)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **menu:** support auto ellipsis when horizontal mode ([ad429c8](https://github.com/vexip-ui/vexip-ui/commit/ad429c8896158447a1e80cbb51ae4ae1f0346b60))
* **menu:** support parse options from router ([28d13f1](https://github.com/vexip-ui/vexip-ui/commit/28d13f1b9dddffd238128145a6fe2ea74967a9c2)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **mixins:** usePopper support virtual reference ([da51364](https://github.com/vexip-ui/vexip-ui/commit/da513643010732d0f36cafb5b01efc9bbe04628e))
* **overflow:** add Overflow component ([665f250](https://github.com/vexip-ui/vexip-ui/commit/665f2501c2d4204973c155f7b6bbb95280f72162))


### BREAKING CHANGES

* **tooltip:** `theme` prop deprecated, use `reverse` prop instead
`theme="dark"` case. `tip` slot deprecated, currently the trigger part
use `trigger` slot and the tip part use default slot. Now Tooltip will
not render wrapper element by default.



# [2.0.0-beta.14](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2022-07-10)


### Bug Fixes

* **calendar:** using locale config for date labels ([7d58232](https://github.com/vexip-ui/vexip-ui/commit/7d58232267895e413badd44f063f96270f52b6cc))
* improve prefix resolve when install ([a418794](https://github.com/vexip-ui/vexip-ui/commit/a4187947cc4c73dad2d28175482df868f622223e))
* **mixins:** add both key and code into activeKeys for useModifier ([c2593e5](https://github.com/vexip-ui/vexip-ui/commit/c2593e5aebb65e8c7619a27cd975eb1b80ff8c09))
* **scroll:** not auto refresh when content size change ([846f4f0](https://github.com/vexip-ui/vexip-ui/commit/846f4f061979462d05e1cda30d65b51f903aa3e1))
* **table:** scroll not reset when data changed ([7814b08](https://github.com/vexip-ui/vexip-ui/commit/7814b0831da938155e135a396649829ebff78d0e))
* **time-ago:** cannot resolve locale config ([b073ff8](https://github.com/vexip-ui/vexip-ui/commit/b073ff840d9d7eaec0d496dc718ff8409486cfea))
* **utils:** imrpove number operations loop ([5d10739](https://github.com/vexip-ui/vexip-ui/commit/5d10739ec7a1fe1d083128c469f10e7d845bf681))
* **wheel:** cannot scroll when min or max value effectively ([05198d4](https://github.com/vexip-ui/vexip-ui/commit/05198d45ec2051516561a21ec5ba9049617223f4))


### Features

* **config:** add global z-index config ([#62](https://github.com/vexip-ui/vexip-ui/issues/62)) ([82b90f2](https://github.com/vexip-ui/vexip-ui/commit/82b90f26a893df43b1bb607dc94b753a36b74b36))
* **loading:** add close method ([286a4a0](https://github.com/vexip-ui/vexip-ui/commit/286a4a0fc9e0cd2b26b49719b2c4b1412d6329d8))
* **menu:** support create items via options prop ([927c185](https://github.com/vexip-ui/vexip-ui/commit/927c1854aa00a7a824d3ac57a94e7e4d5449024f)), closes [#83](https://github.com/vexip-ui/vexip-ui/issues/83)
* **mixins:** add useModifier mixin ([#75](https://github.com/vexip-ui/vexip-ui/issues/75)) ([d90e021](https://github.com/vexip-ui/vexip-ui/commit/d90e02157525c3d0b8bf6e5b15873b076a4f9dee))
* **number-input:** support keyboard actions to change number ([fd9bed5](https://github.com/vexip-ui/vexip-ui/commit/fd9bed5fdf2886f2011df75fc27fbe715e9f52f8))
* **time-age:** internal prop support boolean and default to false ([1918efd](https://github.com/vexip-ui/vexip-ui/commit/1918efd896e777166b218343b23e13a03b8b5f04))
* **utils:** add exact number operate methods ([504ffb6](https://github.com/vexip-ui/vexip-ui/commit/504ffb6b9a4f6971d6777be8d0ebf3119e5e8687))
* **Viewer:** add zoom range props ([#67](https://github.com/vexip-ui/vexip-ui/issues/67)) ([65c4240](https://github.com/vexip-ui/vexip-ui/commit/65c42406986f07c323f7a23776d2e793fc80f0f6))
* **Viewer:** support flip actions ([#69](https://github.com/vexip-ui/vexip-ui/issues/69)) ([b8275e5](https://github.com/vexip-ui/vexip-ui/commit/b8275e5f26934a23c42035a207d8c5da56058816))



# [2.0.0-beta.13](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2022-06-29)


### Bug Fixes

* **confirm:** cannot open confrim ([7939674](https://github.com/vexip-ui/vexip-ui/commit/7939674c29390de072bd3c359128c294b628ae3c))
* **utils:** improve toFixed method ([4234dbc](https://github.com/vexip-ui/vexip-ui/commit/4234dbc5f4766ec75d020e34ee1d72c44cb2567f))



# [2.0.0-beta.12](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2022-06-27)


### Bug Fixes

* **avatar:** ensure no shrink ([d336fdc](https://github.com/vexip-ui/vexip-ui/commit/d336fdcde00b389fcde5977fe2d7b8cf23047b27))
* **cascader:** init checkbox in no-cascader with single select mode ([1b9ba45](https://github.com/vexip-ui/vexip-ui/commit/1b9ba45c707651872a4f46dadd3f12897b301115)), closes [#52](https://github.com/vexip-ui/vexip-ui/issues/52)
* **cascader:** panes display using flex ([efc1cee](https://github.com/vexip-ui/vexip-ui/commit/efc1cee40a3d7fa2df95185760fd60df49d67f21))
* **collapse:** pane expanded class always exists ([4271190](https://github.com/vexip-ui/vexip-ui/commit/427119015a427b009037d66e271c075e80ee2419))
* **color-picker:** pane transfer not effective ([3e59f6b](https://github.com/vexip-ui/vexip-ui/commit/3e59f6bec100a91933c470682454800b67be765c))
* **confirm:** will render two components when open ([289d79f](https://github.com/vexip-ui/vexip-ui/commit/289d79ff1eb547734e4e6b2dc74a9c51d2df46c8))
* **date-picker:** item range style incorrectly ([c6ed7b3](https://github.com/vexip-ui/vexip-ui/commit/c6ed7b3be735aae12c7135a3580472fbe734b2e3))
* **divider:** text position not effective ([21da414](https://github.com/vexip-ui/vexip-ui/commit/21da414f6c7ecc46b4409425c1bce57c675132b4))
* effect Scroll and Scrollbar with touch actions ([6e80fd6](https://github.com/vexip-ui/vexip-ui/commit/6e80fd6f95a2630ab3a81150f3e1833f03f1801e))
* **form:** add not nullable locale config ([6fb27c6](https://github.com/vexip-ui/vexip-ui/commit/6fb27c63089ca1076e40cb3335dbab3efb7bbb0f))
* **masker:** disable transfer when using inner mode ([351cc4d](https://github.com/vexip-ui/vexip-ui/commit/351cc4d244d8b6b11a4f492a40e053c14f533a12))
* **mixins:** add delta states and supoort capture config ([b1fd988](https://github.com/vexip-ui/vexip-ui/commit/b1fd988548689f047fe6a48954830ff9639b1c6e))
* **mixins:** useFullScreen should return the target ([ecdf647](https://github.com/vexip-ui/vexip-ui/commit/ecdf647174d391c937525bb5cd0bd33ceba66a1a))
* **mixins:** useMouse ensure cancelable before disable events ([4aa5686](https://github.com/vexip-ui/vexip-ui/commit/4aa5686a682ea8f5857303dc1e23db3bedac4899))
* **mixins:** useMoving default prevent mouse and touch events ([3cb1674](https://github.com/vexip-ui/vexip-ui/commit/3cb167467d95d16c1f5f8cc1ae2ef35f34cdf8af))
* **modal:** effect drag and resize to mobile ([373082a](https://github.com/vexip-ui/vexip-ui/commit/373082aab8103a5c7ac66d474c6b943646445c1f))
* **modal:** emitted drag events when not draggable ([fa6275d](https://github.com/vexip-ui/vexip-ui/commit/fa6275d62c919717786e3a2232531da1e5468f8f))
* **pagination:** total and page size plugins style incorrectly ([df6d556](https://github.com/vexip-ui/vexip-ui/commit/df6d55683463b0539de8d92228a470a4eed968bf))
* **scroll:** pointer prop default value base on touch supported ([64770b7](https://github.com/vexip-ui/vexip-ui/commit/64770b78f1f8d8f685672b400f6c8296a9d1b861))
* **slider:** effect touch actions ([805c0f2](https://github.com/vexip-ui/vexip-ui/commit/805c0f2a7f03a3ffa1d940029070f49d6bcd4503))
* **split:** adjust using useMoving mixin to implement ([cfc94d8](https://github.com/vexip-ui/vexip-ui/commit/cfc94d870af33bdb141b6b65a730852ff587cb1c))
* **time-ago:** compatibility for ios when parse string date ([098228a](https://github.com/vexip-ui/vexip-ui/commit/098228a884272833fcca4630fb013897bb3101fc))
* **time-picker:** effect touch actions ([3060e18](https://github.com/vexip-ui/vexip-ui/commit/3060e18d4885fca8015707a144910c07d769a284))
* **upload:** default 2 precision for upload progress ([ccf4f5c](https://github.com/vexip-ui/vexip-ui/commit/ccf4f5c58adc84b245a5571f18b1be5137de54b6))
* **wheel:** pointer prop default value base on touch supported ([36ecbbb](https://github.com/vexip-ui/vexip-ui/commit/36ecbbb7b43a84d2fbec85cc38f8d58973be4455))


### Features

* add auto-remove prop for Masker, Drawer and Modal ([b83f150](https://github.com/vexip-ui/vexip-ui/commit/b83f1505b1c2e74658db07f6797b522710132940))
* **mixin:** add useMoving mixin ([2e48731](https://github.com/vexip-ui/vexip-ui/commit/2e4873162aea74d54972e2cbc6de751db588ec6c))
* **mixins:** add useFullScreen mixin ([0c8ac3a](https://github.com/vexip-ui/vexip-ui/commit/0c8ac3a23335828a3a1d9b8db0562e58115853de))
* **mixins:** add useListener mixin ([8a483b3](https://github.com/vexip-ui/vexip-ui/commit/8a483b3d3195f216c8501f5f5297555c1b769494))
* **mixins:** add usePointer mixin ([c6c3112](https://github.com/vexip-ui/vexip-ui/commit/c6c3112f65a6e245296ff3ba6eadd98274dfa80d))
* **progress:** add precision prop ([f51dff2](https://github.com/vexip-ui/vexip-ui/commit/f51dff22efaac99d4af8e6a4960843c4c7a944c0))
* **tree:** add dragging and drop over classes ([a2aca8e](https://github.com/vexip-ui/vexip-ui/commit/a2aca8ee7e159629113823399675c61d38ec848c)), closes [#55](https://github.com/vexip-ui/vexip-ui/issues/55)
* **tree:** add filter and ignore-case props ([df04a2e](https://github.com/vexip-ui/vexip-ui/commit/df04a2e5ee2b5469802eba6efd7154dbc8968ffb)), closes [#54](https://github.com/vexip-ui/vexip-ui/issues/54)
* **tree:** add node-props prop ([9023743](https://github.com/vexip-ui/vexip-ui/commit/902374376aa49958f1762e585d3961341eeabbe2))
* **tree:** support using method expand node and its all upstream nodes ([e9e9ede](https://github.com/vexip-ui/vexip-ui/commit/e9e9ededad3155fcebffe378d8419d5863c92020)), closes [#53](https://github.com/vexip-ui/vexip-ui/issues/53)
* **Viewer:** add Viewer component ([#56](https://github.com/vexip-ui/vexip-ui/issues/56)) ([f1c16af](https://github.com/vexip-ui/vexip-ui/commit/f1c16af7f2de4f0315d3c5111f2e53bfb276ceb0))



# [2.0.0-beta.11](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2022-06-21)


### Bug Fixes

* ensure Modal and Drawer max sizes less then window sizes ([faade51](https://github.com/vexip-ui/vexip-ui/commit/faade5190cc7dd82417c65f778b2f7cec7a9d61c))
* ensure scope when Scroll or NativeScroll nesting ([b81585d](https://github.com/vexip-ui/vexip-ui/commit/b81585d3c2ce3d46421149307a14cdaf4c5e076e))
* **menu:** nesting popper padding and icon flex-shrink ([4dc29ea](https://github.com/vexip-ui/vexip-ui/commit/4dc29ea88cba23ed42e1bfcd15482f9b8b2d7bde))
* missing style to space-evenly justify ([bda3704](https://github.com/vexip-ui/vexip-ui/commit/bda370476c0b183b85db2322a3e16d46cd263e6a))
* **number-input:** range prop split to min and max props ([62447a6](https://github.com/vexip-ui/vexip-ui/commit/62447a69dde716ee20f07d614e3d37bdac4234ac))
* **scroll:** click event not be emitted ([eaa5cc7](https://github.com/vexip-ui/vexip-ui/commit/eaa5cc7c6c661dae58c98b6658f4698b0bf6be0e))
* **style:** forward design to esaier modify variables ([5a67967](https://github.com/vexip-ui/vexip-ui/commit/5a67967c4ce09b137728f8acdb32308f3800c291))
* support array type class and style props ([317fbff](https://github.com/vexip-ui/vexip-ui/commit/317fbff212847cf3d7054af99102656779e37a8e))


### Features

* **config:** auto warning when validator returns false ([2b7712d](https://github.com/vexip-ui/vexip-ui/commit/2b7712d7d25ef1ef7905934d9d5faf44c4c6003a))
* **config:** support common props config ([86c8fd8](https://github.com/vexip-ui/vexip-ui/commit/86c8fd801643f9919e074bd4d1d7825ad7eae355))
* **config:** support custom class namespace ([#48](https://github.com/vexip-ui/vexip-ui/issues/48)) ([da29ae3](https://github.com/vexip-ui/vexip-ui/commit/da29ae3e4e0c80d59d379274ccb8dbcb15254715))


### BREAKING CHANGES

* **number-input:** NumberInput `range` prop has removed, using min and
max props to instead it.



# [2.0.0-beta.10](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2022-06-18)


### Bug Fixes

* **row:** add space-evenly for justify, stretch for align ([01024a4](https://github.com/vexip-ui/vexip-ui/commit/01024a48c7c2af2b0204e9a741a703acee3139e7))


### Features

* add Skeleton and SkeletonGroup components ([#46](https://github.com/vexip-ui/vexip-ui/issues/46)) ([92c011f](https://github.com/vexip-ui/vexip-ui/commit/92c011f1a3bf9ecade03304409728ee73cc2de7d))
* **Space:** add Space component ([#47](https://github.com/vexip-ui/vexip-ui/issues/47)) ([cedc5b3](https://github.com/vexip-ui/vexip-ui/commit/cedc5b3a4d3133f95138d9715bb2bd95c8be519a))
* **tree:** add no-cascaded prop ([fa07fdd](https://github.com/vexip-ui/vexip-ui/commit/fa07fdd59c4b28ae9b07e8160e9dc586fc797af2))
* **tree:** add suffix-checkbox prop ([d82a531](https://github.com/vexip-ui/vexip-ui/commit/d82a53199d489a36e4b58d2074dd2bed577be7c4))
* **utils:** add supportFlexGap method ([ff158dc](https://github.com/vexip-ui/vexip-ui/commit/ff158dcb2dcbeccb3fc384be5d0085b2f1dda0b4))



# [2.0.0-beta.9](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2022-06-16)


### Bug Fixes

* **button:** ensure size effective when not set group size ([171e9bf](https://github.com/vexip-ui/vexip-ui/commit/171e9bf2ff767736deffbfbf62186ff0ec291e97)), closes [#39](https://github.com/vexip-ui/vexip-ui/issues/39)
* **cascader:** add empty tip when options is empty ([682cbec](https://github.com/vexip-ui/vexip-ui/commit/682cbec67ba2f0e54156c383d39b13799aaeeaa8)), closes [#40](https://github.com/vexip-ui/vexip-ui/issues/40)
* **cascader:** no-cascaded effective in single select mode ([9d17d96](https://github.com/vexip-ui/vexip-ui/commit/9d17d966b7cc5f0f9a1fea89dd80ff7f0821f6ee)), closes [#43](https://github.com/vexip-ui/vexip-ui/issues/43)
* **config:** support function as default value ([f44047e](https://github.com/vexip-ui/vexip-ui/commit/f44047e5362ec5d5374dbcd1d4ad87f51b84ca21)), closes [#41](https://github.com/vexip-ui/vexip-ui/issues/41)
* **form:** item field config not init ([16651fc](https://github.com/vexip-ui/vexip-ui/commit/16651fc4e5c58896bdd3de8d7e81856f5e142e5c))
* **modal:** close icon color transition not effective ([a1e7fff](https://github.com/vexip-ui/vexip-ui/commit/a1e7fff99886d072a6b89ac10e0fad1995031c90)), closes [#42](https://github.com/vexip-ui/vexip-ui/issues/42)
* **native-scroll:** bar not hide when not available ([005ba93](https://github.com/vexip-ui/vexip-ui/commit/005ba934d7f77b26c6f83cf234402209472b5ec1)), closes [#44](https://github.com/vexip-ui/vexip-ui/issues/44)



# [2.0.0-beta.8](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2022-06-15)



# [2.0.0-beta.7](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2022-06-15)


### Bug Fixes

* **config:** unexpected merge global locale config ([e43d8e8](https://github.com/vexip-ui/vexip-ui/commit/e43d8e89c7fb131dde6bdf0eb8613736ed13905d))
* **select:** ensure init value when async load options ([f4e44b3](https://github.com/vexip-ui/vexip-ui/commit/f4e44b3238fa0043e7b3588417ba980e28d55620)), closes [#38](https://github.com/vexip-ui/vexip-ui/issues/38)



# [2.0.0-beta.6](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2022-06-14)


### Bug Fixes

* **alert:** icon prop error when set unknown type ([a989838](https://github.com/vexip-ui/vexip-ui/commit/a9898385e90c4f24825af68e72cc427133a9823d))
* **button:** change size unit to px ([5cf8421](https://github.com/vexip-ui/vexip-ui/commit/5cf8421c5787c6eb9eb1d3427e8daa06fba7e6f6))
* **cascader:** option changed not trigger update ([97a1aff](https://github.com/vexip-ui/vexip-ui/commit/97a1affd6cfed8dddeaaf4e9d8f96c16ed018f65))
* change input like size unit to px ([8f566e6](https://github.com/vexip-ui/vexip-ui/commit/8f566e63e94ef3f01a81a175c7fc327ce3783dfc))
* change size unit from `em` to `px` ([#31](https://github.com/vexip-ui/vexip-ui/issues/31)) ([1370057](https://github.com/vexip-ui/vexip-ui/commit/137005766de6f20989eb02105d189cf25923f504))
* clear internal timer when unmount ([9c2f462](https://github.com/vexip-ui/vexip-ui/commit/9c2f4628efeef62db4fbe73dca7228aa84e824cc))
* **config:** init config not reactive ([47298a5](https://github.com/vexip-ui/vexip-ui/commit/47298a58472d6f8a08d204add8c311a6fcd99fcb))
* **config:** should exist global locale ([b7a5546](https://github.com/vexip-ui/vexip-ui/commit/b7a554652b10dbe0529f3901c229511b19c878c8))
* **select:** ensure sync init values and labels ([ae04af0](https://github.com/vexip-ui/vexip-ui/commit/ae04af0842babbf067d782c6f26eca33ca173620)), closes [#36](https://github.com/vexip-ui/vexip-ui/issues/36)
* **style:** remove unnecessary padding vars ([ae30e20](https://github.com/vexip-ui/vexip-ui/commit/ae30e20d2d12a90aceb6c88e9f07df0be98a9701))
* **tree:** improve node padding style ([6db9bed](https://github.com/vexip-ui/vexip-ui/commit/6db9bedfa66d036beec7f12b0baed0427b7aece0))
* **utils:** flatTree not init id when nonexists ([e298729](https://github.com/vexip-ui/vexip-ui/commit/e29872966070450c17c28f6882f9c1e6dd662d29))


### Code Refactoring

* **select:** support bind data to options, add key-config prop ([39b261c](https://github.com/vexip-ui/vexip-ui/commit/39b261ce384043767274093b83125d4d7d4d271e))


### Features

* **auto-complete:** add key-config prop ([2ff15cb](https://github.com/vexip-ui/vexip-ui/commit/2ff15cb1a840f30a8e2cdf590874c73917748c3b))
* **auto-complete:** support custom value and label keys ([3a7bfc8](https://github.com/vexip-ui/vexip-ui/commit/3a7bfc80b0fef7ed14fb405855924db1ab2d4a41))
* **button:** add size and type props to ButtonGroup ([1b8ca9c](https://github.com/vexip-ui/vexip-ui/commit/1b8ca9c0d1322fce7783489f583ab6a444efc910))
* **Cascader:** add Cascader component ([#37](https://github.com/vexip-ui/vexip-ui/issues/37)) ([237f3cf](https://github.com/vexip-ui/vexip-ui/commit/237f3cf8232172c920fcca01ce84a0f8ef0f8d69))
* **mixins:** add useSetTimeout and useSetInterval ([44b63e7](https://github.com/vexip-ui/vexip-ui/commit/44b63e7bdb5c31f0d7712cf4f8dcf9535ac581d4))
* **select:** support value-key and label-key props ([2039f25](https://github.com/vexip-ui/vexip-ui/commit/2039f2518d2f7ed177218c99d7a55091fa9135a8))
* **tree:** add key-config prop to config key alias ([2ce3ec7](https://github.com/vexip-ui/vexip-ui/commit/2ce3ec7e07f42532d5b20e425881a075e36f3e09))


### Performance Improvements

* improve for loop memory ([acb10d7](https://github.com/vexip-ui/vexip-ui/commit/acb10d7c6fde619846f4b4b487cf89ce20232592))


### BREAKING CHANGES

* **select:** `value-key` and `label-key` props of Select component
is deprecated and removed, using `key-config` to instead.
* **tree:** `id-key`, `label-key`, `children-key` and `parent-key`
props of Tree component is deprecated and removed, using `key-config`
to instead.



# [2.0.0-beta.5](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2022-06-08)


### Bug Fixes

* **calendar:** index hover background color ([014c904](https://github.com/vexip-ui/vexip-ui/commit/014c90499c2c12d75a22568735a06db762f32269))
* correctly export style files ([c33e29f](https://github.com/vexip-ui/vexip-ui/commit/c33e29f1889ebcc2264a8bdc13d494e631834ba8))
* **locale:** correct calendar week locale ([9e1b25b](https://github.com/vexip-ui/vexip-ui/commit/9e1b25b9bb03e6b18ec970eb8f232b9cafd046a0))
* **masker:** improve disabled style ([0fc78df](https://github.com/vexip-ui/vexip-ui/commit/0fc78dfd8a29e4b8ecabf90824b559f788711151))


### Features

* add Avatar and AvatarGroup components ([#27](https://github.com/vexip-ui/vexip-ui/issues/27)) ([426aa67](https://github.com/vexip-ui/vexip-ui/commit/426aa67958f1b2107e59adf71243c9c6795415e8))



# [2.0.0-beta.4](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-06-07)


### Bug Fixes

* **badge:** adjust defective style ([d99be40](https://github.com/vexip-ui/vexip-ui/commit/d99be402cf5ebdb7ef16c9139290d5535de5928d))
* boolean with other type props ignore default value ([5cf9b12](https://github.com/vexip-ui/vexip-ui/commit/5cf9b12c00515428a48672929110a661f52a674b))
* **calendar:** hover and selected background color ([7789025](https://github.com/vexip-ui/vexip-ui/commit/7789025c800a18d98b323350e7bd466fd35a84c7))
* **confrim:** binding instance to installed app ([bb6dc38](https://github.com/vexip-ui/vexip-ui/commit/bb6dc38818c5d6f45bf80fd5492d846a634cb458))
* **icons:** mark icon components to raw ([2b98f9f](https://github.com/vexip-ui/vexip-ui/commit/2b98f9ff51aa081796724c816778a8c2550f4cee))
* **menu:** incorrect propper style ([dfe9f30](https://github.com/vexip-ui/vexip-ui/commit/dfe9f303703f828f9e2726e072a67b31015980b9))
* **mixins:** assert type for HTMLElement refs ([c4bf386](https://github.com/vexip-ui/vexip-ui/commit/c4bf3866a14d341761ececc97a441c2206ffb398))
* **pagination:** page size count select label ([3375be5](https://github.com/vexip-ui/vexip-ui/commit/3375be51a98802858b7dfa65f21deb5aeffb815c))
* **pagination:** total items display error ([1434bc4](https://github.com/vexip-ui/vexip-ui/commit/1434bc4505eb97522c6efc47034134eb29dd9888))
* **select:** max-list-height not effective ([bc559c7](https://github.com/vexip-ui/vexip-ui/commit/bc559c7662e3c7f3cf3675d714c0ff8b1c2497da))
* **select:** suffix arrow no transition when drop ([a90701d](https://github.com/vexip-ui/vexip-ui/commit/a90701d5c2840e7686e4132dbe31e1d90ce657ba))
* **style:** adjust shadow color in dark theme ([7f34bc0](https://github.com/vexip-ui/vexip-ui/commit/7f34bc01616d2bbed5fa20a0ecc969c0f7cfd7d5))
* **tree:** selected node label background color ([3186024](https://github.com/vexip-ui/vexip-ui/commit/31860241951cb877714e42ba49d69e34170861a4))
* unable to prevent mask close for Modal and Drawer ([332f286](https://github.com/vexip-ui/vexip-ui/commit/332f2869eef817b53265512c58efd619970fc488))


### Features

* **config-provider:** support partial provide config ([#25](https://github.com/vexip-ui/vexip-ui/issues/25)) ([75cbc86](https://github.com/vexip-ui/vexip-ui/commit/75cbc8671df4c8d73c0b659955a98a5a3b5deef9))
* **config:** support internal en-US locale ([2a5b2d3](https://github.com/vexip-ui/vexip-ui/commit/2a5b2d3a84f13197dbfdf1ae2d08156a3e1d7999))
* **progress:** add activated prop ([38b3d7a](https://github.com/vexip-ui/vexip-ui/commit/38b3d7a1ed2ede6305692f4925d68cd47113e490))
* **select:** add static-suffix prop ([862ea5a](https://github.com/vexip-ui/vexip-ui/commit/862ea5a3cb7fcb4a03bab956eefa8e8fc6479eef))
* **spin:** add transition-name prop ([7014d35](https://github.com/vexip-ui/vexip-ui/commit/7014d35469d1238e94a46742c42a43413581326b))
* **upload:** add button-label prop ([5657427](https://github.com/vexip-ui/vexip-ui/commit/5657427af9e44b633ac7f123d76a357a56994685))



# [2.0.0-beta.3](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-06-06)


### Bug Fixes

* **form:** sync FormSubmit and FormReset props to Button ([a9ab65f](https://github.com/vexip-ui/vexip-ui/commit/a9ab65f2647c1e3eabb882e58d193f52d2ba5195))
* **icons:** support export full icons package ([a136d47](https://github.com/vexip-ui/vexip-ui/commit/a136d471957fc85100fef6391970340904023931))
* **modal:** event `ok` rename to `confirm` ([a6610a7](https://github.com/vexip-ui/vexip-ui/commit/a6610a7db19a3a2fa4297dd86e7560ad105a3a31))
* **native-scroll:** scroll event barType to type ([3dce3c7](https://github.com/vexip-ui/vexip-ui/commit/3dce3c79f91e340aacaef578af84cfd0b10f53e8))
* **number-input:** autocomplete prop change type to boolean ([be2f838](https://github.com/vexip-ui/vexip-ui/commit/be2f83809b2c4bfce29508116b11c008a8714e73))
* **radio:** group options prop to string or number array ([56b2e78](https://github.com/vexip-ui/vexip-ui/commit/56b2e78306944fe08423aed8da7a403e85a1c727))
* **select:** label not update when value prop changed ([4c61493](https://github.com/vexip-ui/vexip-ui/commit/4c61493a2008b4ef4bfb63f25e72c60fe50d15b6))
* **split:** remove 	op and ottom slots ([c50515e](https://github.com/vexip-ui/vexip-ui/commit/c50515e649b4083e00d13ac6b8cf3384f7f964bc))
* **tabs:** icon prop of TabPane defautl to null ([a46f173](https://github.com/vexip-ui/vexip-ui/commit/a46f173d7313f4e1fa9b399e5f6991ffdf63844e))
* **tabs:** pane icon prop type should be object ([a409731](https://github.com/vexip-ui/vexip-ui/commit/a409731186df065a172677b5b12d3fc832ad09d9))
* **tag:** content default no wrap ([ef5a1c0](https://github.com/vexip-ui/vexip-ui/commit/ef5a1c0ded6f4ffaa4308715f31dfab4f01651be))
* **tag:** remove built-in transition ([74af492](https://github.com/vexip-ui/vexip-ui/commit/74af4925b4ca388ae3ff5b8d71d83153f99a375b))
* **tree:** controllable slot params ([eb8421e](https://github.com/vexip-ui/vexip-ui/commit/eb8421e628fc534cb36f9ea8430c1f1007573071))


### Features

* **playground:** add action to reset codes ([a91d77b](https://github.com/vexip-ui/vexip-ui/commit/a91d77b8e8e1a1285694a3cd4b69cc617ab4a715))
* **tag:** color prop custom major color, remove border-color prop ([749a7a8](https://github.com/vexip-ui/vexip-ui/commit/749a7a8c331e7a9d6aacf783e2b238618c2d65f0))



# [2.0.0-beta.2](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-06-01)


### Bug Fixes

* missing global types.d.ts ([1a00515](https://github.com/vexip-ui/vexip-ui/commit/1a0051584ad7c1954b69484f513d17f97289ae0a))



# [2.0.0-beta.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2022-06-01)


### Bug Fixes

* adjust component internal button text type ([e0fac63](https://github.com/vexip-ui/vexip-ui/commit/e0fac63bf89777b54efb646e3551bff4ab156183))
* **auto-complete:** can-drop refactor to drop-disabled ([fd2783a](https://github.com/vexip-ui/vexip-ui/commit/fd2783a019fd36707ee432e777f95ab4a45a2295))
* **auto-complete:** drop-disabled default to false ([40469de](https://github.com/vexip-ui/vexip-ui/commit/40469de045fe7ee966d5c58b115a2f408eb20912))
* **auto-complete:** part of options blank when filter ([01c169e](https://github.com/vexip-ui/vexip-ui/commit/01c169e414be241dee71351948624e683afe5165))
* **color-picker:** incorrect marker color when change value ([f63daec](https://github.com/vexip-ui/vexip-ui/commit/f63daec73375948e6baa0a52cad1354343b409b3))
* **dropdown:** add border for dropdown list ([c786b34](https://github.com/vexip-ui/vexip-ui/commit/c786b3457a2f1ddec06d81746ee6ca25e2224dc7))
* **dropdown:** trigger display default to flex ([3242cb4](https://github.com/vexip-ui/vexip-ui/commit/3242cb468e8813aeb905317375a3aa93c1370371))
* **menu:** adjust item padding-left when inside group ([670fd33](https://github.com/vexip-ui/vexip-ui/commit/670fd334cd99fcf7c507696e634908e4f3f78cba))
* **select:** accurately parse option props ([7d8d8cf](https://github.com/vexip-ui/vexip-ui/commit/7d8d8cfcc09ffce7e0b86838050207c0825c20cb))
* **table:** endless loop when using page-size ([e6c2337](https://github.com/vexip-ui/vexip-ui/commit/e6c23375bcc6e66a6153ae5584e1586cafeeec3f))
* **utils:** rename toPascalCase to toCapitalCase ([b0efc84](https://github.com/vexip-ui/vexip-ui/commit/b0efc84ec4f0791af497600550e2cfc1440f726e))
* **utils:** use color name set to check named color ([6e3df86](https://github.com/vexip-ui/vexip-ui/commit/6e3df86433971ff76955c67937131800e90672e0))


### Features

* **breadcrumb:** add options prop to quick set items ([083ed56](https://github.com/vexip-ui/vexip-ui/commit/083ed56ffddb0a8bd37143acc51850c10f0c9b6c))
* **scrollbar:** support custom width and track-color from props ([f2a01c9](https://github.com/vexip-ui/vexip-ui/commit/f2a01c9c9f924408446da753f40c8ffeda8315ab))
* **style:** add --vxp-content-color-third var ([b5b5adc](https://github.com/vexip-ui/vexip-ui/commit/b5b5adc94b71c17a05945805d72193cfb847c128))
* **utils:** add escapeHtml method ([75ee4a9](https://github.com/vexip-ui/vexip-ui/commit/75ee4a956b2d7d69ee500fb508ba37135a1f637f))
* **utils:** add formatByteSize method ([0f2458a](https://github.com/vexip-ui/vexip-ui/commit/0f2458aa6fd8494cfea4feab62420cc0092719d1))



# [2.0.0-beta.0](https://github.com/vexip-ui/vexip-ui/compare/v1.3.1...v2.0.0-beta.0) (2022-05-28)


### Bug Fixes

* **button:** icon only style not effective ([a4d671c](https://github.com/vexip-ui/vexip-ui/commit/a4d671c0b9fd4c4d5488f1609b7962eba6bee20f))
* **button:** use render function to effect dynamic tag ([12b8c00](https://github.com/vexip-ui/vexip-ui/commit/12b8c00dfa07b4d3dbdb505ef21eb00644f02b35))
* **ellipsis:** exactly compare width using bounding rect ([194fd56](https://github.com/vexip-ui/vexip-ui/commit/194fd56fe8e2c3e0634f0b9e9f4a690f8498d295))
* **grid:** correct cell width default behavior ([23a904c](https://github.com/vexip-ui/vexip-ui/commit/23a904cb5858e34bb403ca993649c944c4836ee4))
* **native-scroll:** incorrectly record content offsetWidth ([6cb2d19](https://github.com/vexip-ui/vexip-ui/commit/6cb2d19fe7523fbd684404dad9ee64ac997a468f))
* **scroll:** autoplay cannot start when mounted ([90f1934](https://github.com/vexip-ui/vexip-ui/commit/90f1934708f8efade6b456fc60349d4bfbc696d0))
* **scrollbar:** cannot find wrapper in production mode ([d903b15](https://github.com/vexip-ui/vexip-ui/commit/d903b1573b096866ca9e22809765b9e89ce01e2a))
* stop propagation when dragging only for Table and Tree ([7ca6f53](https://github.com/vexip-ui/vexip-ui/commit/7ca6f53fa6b88c8336850e65998db9963a2219ef))
* **style:** transition-box-shadow rename to transition-shadow ([191f089](https://github.com/vexip-ui/vexip-ui/commit/191f089f55a193b2242e6257a9fc6aade0f9b78f))
* **table:** body height flicker when first render ([aec5cea](https://github.com/vexip-ui/vexip-ui/commit/aec5cea99ab062f64ecee16e95edb51e37c43c1c))
* **table:** incorrect head height and total rows height not reactive ([03d20b3](https://github.com/vexip-ui/vexip-ui/commit/03d20b3c02d3af24dc62118d1b6c9c86a36c6c88))
* **table:** incorrect height when using expand and fixed ([b689578](https://github.com/vexip-ui/vexip-ui/commit/b689578c085d01ba92a6aa804c1e06d0bdf09960))
* **table:** stripe error when using virtual ([d1b3108](https://github.com/vexip-ui/vexip-ui/commit/d1b310897487b0c8cfcdf8d7b69074c078b5e6af))
* **table:** thead and tbody border missing ([acf1a3e](https://github.com/vexip-ui/vexip-ui/commit/acf1a3e46bbf1415fa92c29d4d99b8290e478c04))
* **upload-file:** decoupling the style from Upload class name ([f62a417](https://github.com/vexip-ui/vexip-ui/commit/f62a4174f1c8a22d012077b504e10b1247830be2))
* **utils:** debounceMinor not effective ([0873b28](https://github.com/vexip-ui/vexip-ui/commit/0873b28f5abcc634226d07c99061f34fa81d03a9))
* **utils:** using string schema to process toFixed ([7135f82](https://github.com/vexip-ui/vexip-ui/commit/7135f82bcf7a6314b47285fc240aa70a982ed20b))


### Code Refactoring

* all `beforeXxx` props adjust to `onBeforeXxx` ([2bee7cf](https://github.com/vexip-ui/vexip-ui/commit/2bee7cff0a2935213270657fc929c3e5408285bf))
* all events adjust `on-xxx` to `xxx` ([a684401](https://github.com/vexip-ui/vexip-ui/commit/a684401725e3f85ab79256dab385e01103fd1fbd))
* **button:** support custom color ([06658f7](https://github.com/vexip-ui/vexip-ui/commit/06658f7e8fa20daa05d6b4afb09de25b16bd5bf5))
* icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* add VirtualList and ResizeObserver components ([db0d26c](https://github.com/vexip-ui/vexip-ui/commit/db0d26cb44c16384792ba0a98f69be68dcfcb380))
* **alert:** add manual prop ([a459974](https://github.com/vexip-ui/vexip-ui/commit/a459974640ae9ed99e14a20ebea051b13fb9edbc))
* **button:** add tag and attr-type props ([5e7317e](https://github.com/vexip-ui/vexip-ui/commit/5e7317ef4f82127b085f351821301b06b2ac10af))
* **color:** add mixColor method ([8c7cdda](https://github.com/vexip-ui/vexip-ui/commit/8c7cddaa3d2d4c76c186d8d61156c67d32a7bfb6))
* **grid:** add Grid and Cell components ([#19](https://github.com/vexip-ui/vexip-ui/issues/19)) ([64670fa](https://github.com/vexip-ui/vexip-ui/commit/64670fa983558f38808bebf044222135ce8b2a4f))
* **grid:** add use-flex prop ([01a95a0](https://github.com/vexip-ui/vexip-ui/commit/01a95a0cb72e081a2043522b968f66fa13ee31a6))
* **icons:** sync icons to vue-awesome@4.5.0 ([3f0c915](https://github.com/vexip-ui/vexip-ui/commit/3f0c915a4d5bc97e5fd6a2aa5f028408d0c9b6db))
* **icons:** upgrade to fontawesome v6 ([#23](https://github.com/vexip-ui/vexip-ui/issues/23)) ([6770468](https://github.com/vexip-ui/vexip-ui/commit/67704686ff935e531f3b529c202232ef8fc14a09))
* **mixins:** add useMounted mixin ([a89cdeb](https://github.com/vexip-ui/vexip-ui/commit/a89cdeb61a6eb9c5e7ff0455f017a72d944e5509))
* **mixins:** add useResize mixin ([5d139e3](https://github.com/vexip-ui/vexip-ui/commit/5d139e3cca81bf5803e467fddf56f36befc41765))
* **mixins:** add useVirtual mixin ([01827aa](https://github.com/vexip-ui/vexip-ui/commit/01827aa25611c737d50d9e62b6b98d1e951abd6e))
* **playground:** support runtime toggle dark theme ([51c6b44](https://github.com/vexip-ui/vexip-ui/commit/51c6b447e9abdace90635e1c0da86df940f2a041))
* **row:** add column-flex prop ([42312ec](https://github.com/vexip-ui/vexip-ui/commit/42312ec6ccb7efd1c6069debdbb992424dc6b988))
* **style:** add built in dark theme ([#24](https://github.com/vexip-ui/vexip-ui/issues/24)) ([e388387](https://github.com/vexip-ui/vexip-ui/commit/e38838720a730f64af3a0e22bc7149d829b0d7e7))
* **style:** transfer to use css vars ([#20](https://github.com/vexip-ui/vexip-ui/issues/20)) ([76bef3e](https://github.com/vexip-ui/vexip-ui/commit/76bef3e393e6c366bc0b90b1b980844ddb4d8dae))
* support virtual scroll for Select and AutoComplete ([30dba08](https://github.com/vexip-ui/vexip-ui/commit/30dba084ec0b9b866327b69498f3f98f35f3032f))
* **table:** add clearSelected method ([1b3d75e](https://github.com/vexip-ui/vexip-ui/commit/1b3d75e545950ae665dc09ee38d44605fd80dd18))
* **table:** add singleSorter and singleFilter props ([b477a61](https://github.com/vexip-ui/vexip-ui/commit/b477a61797e80c7b74b246b6d821787e658331d0))
* **table:** emit on-row-sort event ([e5306cc](https://github.com/vexip-ui/vexip-ui/commit/e5306ccca2b8821ddb22b3fbce79d5102d8fc7c1))
* **table:** export clearSort and clearFilter methods ([6202825](https://github.com/vexip-ui/vexip-ui/commit/620282563ae8e28c3c123488ee7ee684ac47050f))
* **table:** support virtual rendering rows ([5479c12](https://github.com/vexip-ui/vexip-ui/commit/5479c12dc490462f2ec0c7ceb221fa0d7ddb858d))
* **upload:** add isDragOver prop to default slot ([1a0020a](https://github.com/vexip-ui/vexip-ui/commit/1a0020afa949abfd32a7cba7955ee6b2a07e2ac8))
* **upload:** export UploadList and UploadFile components ([8b6ced2](https://github.com/vexip-ui/vexip-ui/commit/8b6ced29dcf97e15bda356bf4d4203e6ac0db55c))
* **upload:** support upload directories and only-dary mode ([042d6db](https://github.com/vexip-ui/vexip-ui/commit/042d6db4e9bbe1b0a075b1a25af25fb33689741b))
* **utils:** add adjustAlpha method ([107023a](https://github.com/vexip-ui/vexip-ui/commit/107023a83edb7abec8461bcc433cae79f8c83c91))
* **utils:** add createBITree method ([dbf76b2](https://github.com/vexip-ui/vexip-ui/commit/dbf76b2116e9ca59ce05afa09b06691b2703a2ff))
* **utils:** add debounceFrame, nextTickOnce and nextFrameOnce ([7204479](https://github.com/vexip-ui/vexip-ui/commit/7204479082899bdfe28bd5ac93aba9b430e49a32))
* **utils:** add isBigInt function ([259a990](https://github.com/vexip-ui/vexip-ui/commit/259a990e73091bfcc9bfbfe9c8a55fafeece22db))


### Performance Improvements

* **table:** optimize scrolling performance ([3f96507](https://github.com/vexip-ui/vexip-ui/commit/3f96507b1b009e2de876a19e65cb6f53715a8550))
* **table:** optimize virtual scroll by BITree ([46e7ac5](https://github.com/vexip-ui/vexip-ui/commit/46e7ac5bb3efc9686b7962c759f045a76d7817fa))


### BREAKING CHANGES

* Using `onBeforeXxx` to replace `beforeXxx` props, the
purpose is to support `@beforeXxx` alias to bind callback.
* All component events are removed the `on` prefix,
currently using `@xxx` to replace `@on-xxx`, its purpose is to better
bind events in t/jsx (no `onOnXxx`).
* **button:** extract text and dashed types as props from Button component,
text-color prop has removed, using color prop to customize the button.
* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.
* **style:** All scss variables in components have been removed, all preset scss variables in 
`design/variables.scss` have removed the `vxp-` prefix and change to use scss map to define. All 
style imports in scss are currently using `@use` and `@forward`, do not use `@import` to import 
styles anymore.



## [1.3.1](https://github.com/vexip-ui/vexip-ui/compare/v1.3.0...v1.3.1) (2022-04-19)


### Bug Fixes

* export Hightlight and NativeScroll components ([55ab1c7](https://github.com/vexip-ui/vexip-ui/commit/55ab1c71bd1073b79b68706a28d985e43d7c2194))
* **native-scroll:** refresh content size when observer callback ([ff2a732](https://github.com/vexip-ui/vexip-ui/commit/ff2a7326bf14b8c8159a48a49bf65538760181e7))
* **native-scroll:** stop wheel event propagation when can scroll ([d13b4d6](https://github.com/vexip-ui/vexip-ui/commit/d13b4d6912a63ca1f99d1d241164fcbae1f74353))
* **native-scroll:** unable to scroll after call scroll api mathods ([bca3d51](https://github.com/vexip-ui/vexip-ui/commit/bca3d5181d74036face7fe4ff990581d36bd86f0))
* **native-scroll:** unexpected reset scroll when content style change ([dabbd49](https://github.com/vexip-ui/vexip-ui/commit/dabbd49b4e66400e20340a84234c08527202b40a))
* **scrollbar:** unexpected show track when use-track not true ([6bf2dda](https://github.com/vexip-ui/vexip-ui/commit/6bf2dda3f1b6e0a40777e0059b4f20b4c77ad957))
* **scrollbar:** use-track should default false ([d6f8e6c](https://github.com/vexip-ui/vexip-ui/commit/d6f8e6ca444fd163b6c460c2772c86c5c61f843a))


### Features

* add use-bar-track prop to Scroll and NativeScroll ([59c94f8](https://github.com/vexip-ui/vexip-ui/commit/59c94f82226e3f4ae722916eacb14b9ae5390a33))
* **calendar:** add header, title and week slots ([340194a](https://github.com/vexip-ui/vexip-ui/commit/340194aca45ba656a211a019350061743150252b))


### Performance Improvements

* **tooltip:** no render tip elements when disabled ([6a7a50d](https://github.com/vexip-ui/vexip-ui/commit/6a7a50de1c78706d8add1d6c3d3cc2e51ae79cda))



# [1.3.0](https://github.com/vexip-ui/vexip-ui/compare/v1.2.1...v1.3.0) (2022-04-18)


### Bug Fixes

* **auto-complete:** no options rendered when null value ([49af9d4](https://github.com/vexip-ui/vexip-ui/commit/49af9d4d66d909a4035e27be2ecebb9ea5445f26))
* **date-picker:** cannot parse number value in date type ([0b0e3a7](https://github.com/vexip-ui/vexip-ui/commit/0b0e3a7eb7a09ef1cb43ea7fec6b897bd9250dd0))
* **date-picker:** disabled-date prop not work ([6496175](https://github.com/vexip-ui/vexip-ui/commit/6496175ba037d741237cea7500772fa9b4d62db3))
* **date-picker:** format should ignore content in quotations ([31d7f16](https://github.com/vexip-ui/vexip-ui/commit/31d7f1689a1229582f6f2a71ae80e47d63011ac8))
* **linker:** vertical align should inherit parent ([9943e5e](https://github.com/vexip-ui/vexip-ui/commit/9943e5ed39d0a4cf5b225050eae3919a8675159a))
* **modal:** header slot is not effective ([2af3df6](https://github.com/vexip-ui/vexip-ui/commit/2af3df6cd6e9eca5919860cebb08c26494ba9dff))
* **modal:** use offset value to compute position ([07d0dc6](https://github.com/vexip-ui/vexip-ui/commit/07d0dc64bad7c8f097447d9b5d481f5d9727a4c2))
* **number-input:** should not format when inputting ([0f58739](https://github.com/vexip-ui/vexip-ui/commit/0f5873906424b07bfd9b72daf94479316871f4d7))
* **spin:** mask add default z-index ([943f3c6](https://github.com/vexip-ui/vexip-ui/commit/943f3c6d35a2585d7df4580360dd6222c5e124ad))
* **table:** disableRow should base on rendered rows ([c483386](https://github.com/vexip-ui/vexip-ui/commit/c4833864ec96d9d5fc9deee4f8a1f9eeb80691b3))
* **table:** row check all event add partial param ([a9cc1c5](https://github.com/vexip-ui/vexip-ui/commit/a9cc1c5e9acd665cc576da10f5d8d8856fc2b49e))
* **table:** row check all event add partial param ([7d7bede](https://github.com/vexip-ui/vexip-ui/commit/7d7bede86701fb534c57b974e3268c981f1b3aaf))
* **tree:** incorrect variable usage when get id map ([c94714e](https://github.com/vexip-ui/vexip-ui/commit/c94714ed08294b208af320e61921e1247543d491))
* **tree:** root-id prop not effective ([7494291](https://github.com/vexip-ui/vexip-ui/commit/74942916e542163855195e209c2059d11db33dbd))
* **tree:** use id-node map when update data ([8d5d843](https://github.com/vexip-ui/vexip-ui/commit/8d5d843572a44fa4c546959bd8fb70496b70a91a))
* **utils:** incorrect matching rootId in tree transform ([4e9d253](https://github.com/vexip-ui/vexip-ui/commit/4e9d2537170761d3a29cdcec63f5443fdb002c95))


### Features

* **calendar:** add Calendar component ([495e6b4](https://github.com/vexip-ui/vexip-ui/commit/495e6b49168cf1ae8647b5231f060eb383ec96d6))
* **ellipsis:** add tip-max-width prop ([32254d5](https://github.com/vexip-ui/vexip-ui/commit/32254d549fa3d3e48e610bab8b03da01c6924c05))
* **form:** add hide-label prop ([08f65ff](https://github.com/vexip-ui/vexip-ui/commit/08f65ff5407db7932660468ba6a6e92bc2208724))
* **form:** form actions add before hook prop ([2b31f25](https://github.com/vexip-ui/vexip-ui/commit/2b31f25520f27ac8e313bee9aa137bf6193ebbca))
* **form:** form item add action type prop ([e85baf2](https://github.com/vexip-ui/vexip-ui/commit/e85baf2cc7c49f29d592412ce97e450e5a4cd8a2))
* **highlight:** add Highlight component ([901a5ad](https://github.com/vexip-ui/vexip-ui/commit/901a5ad7a10325f630961178df839317984493b8))
* **native-scroll:** add NativeScroll component ([68bfe20](https://github.com/vexip-ui/vexip-ui/commit/68bfe20441dede8152ecc3c10d58ce8f8dc09139))
* **playground:** add vexip-ui playground ([#16](https://github.com/vexip-ui/vexip-ui/issues/16)) ([989a2c7](https://github.com/vexip-ui/vexip-ui/commit/989a2c7d99d565d107aba6ecf8d9a78c675095e9))
* **scrollbar:** add appear prop ([743483c](https://github.com/vexip-ui/vexip-ui/commit/743483ca3ce131bdc4ca6bdd2e76d70541198e6e))
* **scrollbar:** add use-track and track-speed props ([2820c77](https://github.com/vexip-ui/vexip-ui/commit/2820c777b855462b5d1c2da0e3e7f8f77b06f614))
* **spin:** add Spin component ([784605c](https://github.com/vexip-ui/vexip-ui/commit/784605ce4d087cb55af2d8ba2263b66b7be03e32))
* **table:** add tooltip-width and column's no-ellipsis props ([b95e59d](https://github.com/vexip-ui/vexip-ui/commit/b95e59dc9a0f2e03efbb47dc5bfccbcdcc4723be))
* **tree:** add cache-node and root-id props ([13e721e](https://github.com/vexip-ui/vexip-ui/commit/13e721eb3ff2072ec90c1c38ea82a2c751793c76))
* **tree:** export parseAndTransformData method ([dc5a1e3](https://github.com/vexip-ui/vexip-ui/commit/dc5a1e3e0ff4d6bd6c5de17e1afb904624bd99b5))



## [1.2.1](https://github.com/vexip-ui/vexip-ui/compare/v1.2.0...v1.2.1) (2022-01-14)


### Bug Fixes

* **tree:** incorrect expanded when using asyncLoad ([31c3ba5](https://github.com/vexip-ui/vexip-ui/commit/31c3ba509ab5c3c57a9a04e84a8cb806ff6389d7))



# [1.2.0](https://github.com/vexip-ui/vexip-ui/compare/v1.1.3...v1.2.0) (2022-01-07)


### Bug Fixes

* **config:** global defaults config no effective ([6eba983](https://github.com/vexip-ui/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
* **date:** limit range values starkly in modification ([68cc1c8](https://github.com/vexip-ui/vexip-ui/commit/68cc1c8b64d54ff0bb218104d626e6eed86d14cc))
* install options should be optional ([0934c3c](https://github.com/vexip-ui/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
* support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/vexip-ui/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))
* **table:** no recalculate when add rows ([741400e](https://github.com/vexip-ui/vexip-ui/commit/741400e112bf4437d47c7ed6898956a08a230021))


### Features

* add judge method for Message and Notice ([cb4062b](https://github.com/vexip-ui/vexip-ui/commit/cb4062b36096162b519b5a853726a259c4dd46a9))
* add locale config ([0a0ec74](https://github.com/vexip-ui/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **form:** support native html form submit ([497c3e3](https://github.com/vexip-ui/vexip-ui/commit/497c3e3115632c09bcb10ac9c9d98aa334b61547))
* **table:** add row enter and leave events ([b9fb4c2](https://github.com/vexip-ui/vexip-ui/commit/b9fb4c21e61d739ec4fd2b69a8ac1363d545c244))


### BREAKING CHANGES

* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



## [1.1.3](https://github.com/vexip-ui/vexip-ui/compare/v1.1.2...v1.1.3) (2021-10-20)


### Bug Fixes

* **checkbox:** only use margins within group ([22d3d9e](https://github.com/vexip-ui/vexip-ui/commit/22d3d9e80a7a254b72ccc5ef08732c6098cc41d5))
* **table:** incorrect height when using height prop ([d5143ac](https://github.com/vexip-ui/vexip-ui/commit/d5143accb4c243a2910c2693485408bd61cabe8e))


### Features

* **ellipsis:** add ellipsis component ([1fefc1b](https://github.com/vexip-ui/vexip-ui/commit/1fefc1b1546db69299952d957e15de842f89eab8))
* **select:** show empty text without any option ([5efe942](https://github.com/vexip-ui/vexip-ui/commit/5efe942b9ee6e075799501bbbc5a46c08a8a3304))
* **table:** add ellipsis tooltip for long content ([270df96](https://github.com/vexip-ui/vexip-ui/commit/270df9667e90455f7c6e6915286e78f742cd62b0))
* **table:** show empty text without any row ([ecb0ee7](https://github.com/vexip-ui/vexip-ui/commit/ecb0ee773e50efc00bbf6fb56c1420fe913e32d5))



## [1.1.2](https://github.com/vexip-ui/vexip-ui/compare/v1.1.1...v1.1.2) (2021-07-19)


### Bug Fixes

* **table:** effect expandRenderer prop ([857af57](https://github.com/vexip-ui/vexip-ui/commit/857af572b0ede815727aaf51222ec12dfc48b412))
* **table:** scroll height incorrect ([66f4804](https://github.com/vexip-ui/vexip-ui/commit/66f48046b506ba11065ce046bc463c37ec6caef4))


### Code Refactoring

* select and auto-complete no longer depend on input ([4c6af54](https://github.com/vexip-ui/vexip-ui/commit/4c6af54d09d918fb948cce3e0e459cf1777398e7))


### Features

* **select:** add multiple and option-check props ([da2f78a](https://github.com/vexip-ui/vexip-ui/commit/da2f78a0b234d8d0a7064e77374e230c3a9bf073))
* **tag:** add circle prop ([f2e0cf2](https://github.com/vexip-ui/vexip-ui/commit/f2e0cf2457272b5c3eeef102051e609454d96331))
* **tag:** add size prop ([79c5290](https://github.com/vexip-ui/vexip-ui/commit/79c5290d9223d189379019cad637d0efb3d0115c))


### BREAKING CHANGES

* select remove on-focus and on-blur events



## [1.1.1](https://github.com/vexip-ui/vexip-ui/compare/v1.1.0...v1.1.1) (2021-07-12)


### Bug Fixes

* **alert:** icon misplaced when no title ([8fd2f7d](https://github.com/vexip-ui/vexip-ui/commit/8fd2f7db9f6122e69f32dd64f7fdfbee34f6b03a))
* **badge:** title attr error when no content ([5bb6a86](https://github.com/vexip-ui/vexip-ui/commit/5bb6a86732c5f3c955c8360902350ba33b461185))
* **button:** missing simple class name ([4e91993](https://github.com/vexip-ui/vexip-ui/commit/4e91993ba3aa6fb740cdd55631aa797e44709f46))
* **color-picker:** cannot parse rgba color value ([8f4c57f](https://github.com/vexip-ui/vexip-ui/commit/8f4c57f4cf2c4ba4ab1b2f6f07f46209b1ff8b82))
* **date-picker:** clear should trigger change event ([1b1fec5](https://github.com/vexip-ui/vexip-ui/commit/1b1fec53d41afa430848dc983001ac7b565e9905))
* **date-picker:** intuitively update activated ([f4c9efb](https://github.com/vexip-ui/vexip-ui/commit/f4c9efb1f44cb4a416e2616f0be3ae384f5ae3c9))
* **input:** add ::placeholder color style ([54ce94b](https://github.com/vexip-ui/vexip-ui/commit/54ce94be7a595ec3065f78804a6133fa30c3f095))
* **masker:** closable not work without beforeClose ([77b00c0](https://github.com/vexip-ui/vexip-ui/commit/77b00c09f7225eb07fc25b028f8ca248bd65a515))
* **progress:** progress tip display error ([22eb709](https://github.com/vexip-ui/vexip-ui/commit/22eb709a681cbbdb5fb5861a137cfbb3f979aa85))
* **scroll:** start autoplay when mounted ([5d6dfa6](https://github.com/vexip-ui/vexip-ui/commit/5d6dfa6f84e06107344e7d9d9272635f69d45061))
* **slider:** error value when step is not 1 ([4c2b2b9](https://github.com/vexip-ui/vexip-ui/commit/4c2b2b996d6b4611ecdc117375d009a34d879b8b))
* **time-picker:** clear should trigger change event ([92e9ba7](https://github.com/vexip-ui/vexip-ui/commit/92e9ba7e573ae924e911cd2361613b42e9195981))


### Features

* **checkbox:** remove bindGroup api ([5b3aafa](https://github.com/vexip-ui/vexip-ui/commit/5b3aafaddda1c0130a5db50cad2ae58d35e9ed7a))
* **table:** add defineColumns helper ([10d3a8d](https://github.com/vexip-ui/vexip-ui/commit/10d3a8d45f8a24d7b02f04d64aa015c886a4a1ea))


### BREAKING CHANGES

* **checkbox:** no longer support bindGroup api



# [1.1.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.3...v1.1.0) (2021-07-08)


### Bug Fixes

* **dropdown:** flush nested drop first item ([3992b7f](https://github.com/vexip-ui/vexip-ui/commit/3992b7f20d5a5a93e400dec123b787fb73a36d81))
* **dropdown:** item position relative incorrect divider ([53f1f91](https://github.com/vexip-ui/vexip-ui/commit/53f1f91715088e9a3e8b3e912585618f3c4edcda))
* **dropdown:** nested drop should not toggle select ([ece9d4e](https://github.com/vexip-ui/vexip-ui/commit/ece9d4eaeca646681781f851c9d77cd14e46cb9d))
* **popper:** watch wrapper and popper el change ([4fb0ca5](https://github.com/vexip-ui/vexip-ui/commit/4fb0ca568322df5b2046b5f985337f8dc78ef381))
* **table:** export refresh api ([f0dab34](https://github.com/vexip-ui/vexip-ui/commit/f0dab34f02b9d28d968674bb1d58e6a09ac6c08d))
* **table:** incorrect row count of data change ([7af4d5a](https://github.com/vexip-ui/vexip-ui/commit/7af4d5a2a90d573ad4ae370e1b3b820b2bc41fd1))


### Features

* add contextmenu component ([#13](https://github.com/vexip-ui/vexip-ui/issues/13)) ([1571dc3](https://github.com/vexip-ui/vexip-ui/commit/1571dc34d4830a1a515c15378bf7b7db3e72219b))
* **dropdown:** add appear prop ([e230054](https://github.com/vexip-ui/vexip-ui/commit/e230054a585141d9b88901f65589dbf5578b8890))
* **loading:** create global loading component ([caedc67](https://github.com/vexip-ui/vexip-ui/commit/caedc67a883cd0f1683612e25d71d4f0e279480d))
* **tag:** add build in color type ([02fd360](https://github.com/vexip-ui/vexip-ui/commit/02fd36026fec4de39349252b0fa03dde4aa820ca))
* **tag:** add simple style tag ([b316888](https://github.com/vexip-ui/vexip-ui/commit/b3168886ea40f6cbaa3a83ea8278ed5d89d8c953))
* **time-ago:** add time-ago component ([b639c2e](https://github.com/vexip-ui/vexip-ui/commit/b639c2eb13c62b00d72010cc4c30328d09b2835a))


### Performance Improvements

* **scrollbar:** use transform replace top and left ([5a0e272](https://github.com/vexip-ui/vexip-ui/commit/5a0e2721ce54beb4b203013db19301d732c34f39))



## [1.0.3](https://github.com/vexip-ui/vexip-ui/compare/v1.0.2...v1.0.3) (2021-06-26)


### Bug Fixes

* **input:** no emit on-clear event ([64ca93f](https://github.com/vexip-ui/vexip-ui/commit/64ca93f507fb5628f91e977d1154687bfe736ceb))
* **input:** should not clearable when disabled ([6b58a0c](https://github.com/vexip-ui/vexip-ui/commit/6b58a0cfcb43c22245c7e031ac591e945be6bb10))
* **number-input:** support clearable and on-clear ([ebb8235](https://github.com/vexip-ui/vexip-ui/commit/ebb8235f742c3237634fdd6704071992dc664c2a))


### Performance Improvements

* **progress:** using transfrom to improve performance ([7ba3d8d](https://github.com/vexip-ui/vexip-ui/commit/7ba3d8db07cb32d1e3e65cd9a2e6ca38ac49c05b))



## [1.0.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.1...v1.0.2) (2021-06-25)


### Bug Fixes

* **dropdown:** add dropClass prop ([46a9ccf](https://github.com/vexip-ui/vexip-ui/commit/46a9ccf3bb3bd7b5bf025cda9857563225577c63))
* **dropdown:** set placement prop not work ([9bd32e8](https://github.com/vexip-ui/vexip-ui/commit/9bd32e81116a5d27aa85892fab14aaef5f144cd1))
* **dropdown:** support v-model:vivisble ([cfbf2dc](https://github.com/vexip-ui/vexip-ui/commit/cfbf2dcac7944df95e745ac097151b6836078478))
* **tab-nav:** card style order in using router ([825c7db](https://github.com/vexip-ui/vexip-ui/commit/825c7db18238617fcb55f981a79ae0ac3e705952))



## [1.0.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0...v1.0.1) (2021-06-17)


### Bug Fixes

* **button:** style order in using router ([421512e](https://github.com/vexip-ui/vexip-ui/commit/421512e88972ace7f57b1d03641e9d7b94220780))



# [1.0.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.3...v1.0.0) (2021-06-10)


### Bug Fixes

* **message:** config placement not effective ([85fd771](https://github.com/vexip-ui/vexip-ui/commit/85fd771d3c1e3f6bc1c57db69c418ab433f9c58f))
* **notice:** config placement not effective ([833933b](https://github.com/vexip-ui/vexip-ui/commit/833933b26c26f061fedacee76b576daac067c330))


### Features

* **collapse-transition:** add mode and timing props ([9fe1862](https://github.com/vexip-ui/vexip-ui/commit/9fe1862045530a20b4c84156e78ca0b890d6b76b))
* **message:** add property config to install options ([be64ae3](https://github.com/vexip-ui/vexip-ui/commit/be64ae3699f6915b8124f3e7639c8f7ada2d0174))



# [1.0.0-beta.3](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-06-09)


### Bug Fixes

* **message:** install global property name ([af21d31](https://github.com/vexip-ui/vexip-ui/commit/af21d31867d3679a2d86b2fdbc519d0f421ecbb1))



# [1.0.0-beta.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-06-05)


### Bug Fixes

* **style:** relate style for import-on-demand ([194f32b](https://github.com/vexip-ui/vexip-ui/commit/194f32b6fda7264a52da9835faae8d4dd0875282))



# [1.0.0-beta.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2021-06-05)


### Bug Fixes

* **auto-complete:** hitting wrong after filter options ([7317ed6](https://github.com/vexip-ui/vexip-ui/commit/7317ed6848484505a3c61fa2f0cc2d9b60d84e4b))
* **masker:** transfer prop has no effect ([fd2173e](https://github.com/vexip-ui/vexip-ui/commit/fd2173e1c45599305d8e8abda0a93d423e222cd6))


### Features

* **scroll:** add on-ready event ([288ec9a](https://github.com/vexip-ui/vexip-ui/commit/288ec9abcc7a40374b5e788f89b89ec275a1124d))
* **table:** add filter and column define helpers ([5e85594](https://github.com/vexip-ui/vexip-ui/commit/5e855944082094e6509e9bed6ad3abf52efd8e03))



# [1.0.0-beta.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.4...v1.0.0-beta.0) (2021-06-03)


### Bug Fixes

* **checkbox-group:** sync value when values porp change ([1bdaa9f](https://github.com/vexip-ui/vexip-ui/commit/1bdaa9ff4d3ffa746f1c22222c851761be51685c))
* **date-picker:** calendar pane focus on selected date ([6a61c99](https://github.com/vexip-ui/vexip-ui/commit/6a61c9947df68e2ade844ec8a74a3111160eba73))
* **date-picker:** incorrect item display when range select year and month ([55ccf76](https://github.com/vexip-ui/vexip-ui/commit/55ccf7660dad24030ddefff6669c305066e34f51))
* **date-picker:** supply labels prop, includes time picker ([3cd5735](https://github.com/vexip-ui/vexip-ui/commit/3cd57352454998d77eb56c0a341dadcbeacdffec))
* **icon:** adjust default size about 1.05x ([ce90294](https://github.com/vexip-ui/vexip-ui/commit/ce902949ef1d193d80f2c58d67ee9cc635678875))
* **menu:** menu list margin set to 0 ([9ddab57](https://github.com/vexip-ui/vexip-ui/commit/9ddab5789ac42af1491a1797433f62c2bd4b276e))
* **select:** visible not to false when option v-for ([7208f42](https://github.com/vexip-ui/vexip-ui/commit/7208f42c69f5102f103f1cbf3387d27d1f029e09))
* **table:** column width incorrect width multiple talbe ([6fb8f65](https://github.com/vexip-ui/vexip-ui/commit/6fb8f65c7a122c6574dc85d5222cd9526ec3b4e1))
* **tree:** arrow transform act at icon svg ([14b53cc](https://github.com/vexip-ui/vexip-ui/commit/14b53ccfd6ee609aff66ac556f51a1080e374b26))


### Features

* **textarea:** add control state style ([e8d6bfc](https://github.com/vexip-ui/vexip-ui/commit/e8d6bfc6b6ee3fc141fa42620e6458856b9e0f86))



# [1.0.0-alpha.4](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.2...v1.0.0-alpha.4) (2021-05-29)


### Bug Fixes

* **animation:** lose spin animation ([dd72b56](https://github.com/vexip-ui/vexip-ui/commit/dd72b564393fbd9600a9eef2f0a74b90d4029cc9))
* **button:** loading icon missing collapse transion ([f713351](https://github.com/vexip-ui/vexip-ui/commit/f713351aa9dea125bcd6d04e1589588bcc3199b9))
* **collapse-transition:** appear props ([46a09b5](https://github.com/vexip-ui/vexip-ui/commit/46a09b521caf1996b0b080ad18bd167b6448e293))
* **menu:** can not support horizontal mode ([d7b9b38](https://github.com/vexip-ui/vexip-ui/commit/d7b9b38b48fa44eb0c6562387f029ef2dc4ad0b9))
* **portal:** render teleport after mounted next tick ([8971a9b](https://github.com/vexip-ui/vexip-ui/commit/8971a9b493056e212c3da1043008ec339be69114))
* **scroll:** ensure wrapper and content element ([6e0f0de](https://github.com/vexip-ui/vexip-ui/commit/6e0f0deeec7c27d0224869b4a324779858ea4d78))
* **scss:** themes at import use relative path ([f283e68](https://github.com/vexip-ui/vexip-ui/commit/f283e68986a35a93b6ee7ec75cc12a3e2e2a19c4))



# [1.0.0-alpha.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-05-29)


### Bug Fixes

* complete missing components export ([cb88cf9](https://github.com/vexip-ui/vexip-ui/commit/cb88cf96056c87a77711b98898c415d54adac577))



# [1.0.0-alpha.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-05-28)



# 1.0.0-alpha.0 (2021-05-27)



## [2.1.25](https://github.com/vexip-ui/vexip-ui/compare/v2.1.24...v2.1.25) (2023-06-21)


### ⚡ Performance Improvements

* **table:** improve table horizontal scroll performance ([9916a44](https://github.com/vexip-ui/vexip-ui/commit/9916a4406f213c32229eb34179cf1b38b1882719))


### ✨ Features

* **auto-complete:** add debounce and delay props ([12ae1af](https://github.com/vexip-ui/vexip-ui/commit/12ae1af4733b5d747519bd82ed03cf1564acb5d4))
* **contextmenu:** support set renderer for each menu ([e29c538](https://github.com/vexip-ui/vexip-ui/commit/e29c5385a9fdd96676684b51d0033a28a288f5ff))
* **input:** support custom input throttle or debounce delay ([f220e82](https://github.com/vexip-ui/vexip-ui/commit/f220e8260f0ea2b913f29b6617c9630b7cf1625c))
* **number-input:** support custom input throttle or debounce delay ([274f906](https://github.com/vexip-ui/vexip-ui/commit/274f906a45de029b5f7392900590a83a7418cd7e))
* **renderer:** support store variables and resue them via slot ([322cb6e](https://github.com/vexip-ui/vexip-ui/commit/322cb6e4a01790a6078dc611a16a7bedcbc173d1))
* **textarea:** support custom input throttle or debounce delay ([d0cc62c](https://github.com/vexip-ui/vexip-ui/commit/d0cc62cdbaab53d205a207fb7f361774053c5467))
* **utils:** toFixed supports scientific notation ([62485f7](https://github.com/vexip-ui/vexip-ui/commit/62485f74f01bfe330317df0e9b3e4a5c21515681))


### 🐞 Bug Fixes

* **modal:** should responsive when no draggable or resizable ([bf5b646](https://github.com/vexip-ui/vexip-ui/commit/bf5b6462a86bfe4343501c3fea7bef852acea3eb))
* **native-scroll:** deprecated on-before-scroll prop ([7e2062d](https://github.com/vexip-ui/vexip-ui/commit/7e2062de5cd1b477440505dbc5602c6284e8c64a))
* **table:** add missing foot cell style ([cc7a12d](https://github.com/vexip-ui/vexip-ui/commit/cc7a12d159afcaf160a1ed592c29b70c92d27782))
* **table:** ensure refresh all horizontal scrolls ([00a54a4](https://github.com/vexip-ui/vexip-ui/commit/00a54a4404e303f17a2c240781f573d954fedaa3))
* **table:** ensure refresh vertical scrollbar when data changed ([9ffeab8](https://github.com/vexip-ui/vexip-ui/commit/9ffeab864ecef568d64362260da9ace9e6c312e1))
* **table:** incorrect fixed columns width calculate ([39e2ee3](https://github.com/vexip-ui/vexip-ui/commit/39e2ee394cd83ca6a7095a6dee22901ceefa315c))
* **table:** infinite watch when dynamically render columns ([d134812](https://github.com/vexip-ui/vexip-ui/commit/d1348123875b7dd1adc00e70a252e8a183587577))
* **table:** missing right border when merging cells ([16550b9](https://github.com/vexip-ui/vexip-ui/commit/16550b95f6589b0a53bf4137c9153ff6a7425a7a))


### 🔨 Code Refactoring

* **input:** using control-class prop replace input-class prop ([8aba1ee](https://github.com/vexip-ui/vexip-ui/commit/8aba1ee72a106389f708f62f81e61356654be789))



## [2.1.24](https://github.com/vexip-ui/vexip-ui/compare/v2.1.23...v2.1.24) (2023-06-13)


### ✨ Features

* **config-provider:** support specify the scope theme ([1f5387b](https://github.com/vexip-ui/vexip-ui/commit/1f5387b61c38253c77fe119cf7f89def8befd770)), closes [#380](https://github.com/vexip-ui/vexip-ui/issues/380)
* **layout:** add fit-window prop ([d610f36](https://github.com/vexip-ui/vexip-ui/commit/d610f36286e5d8bb53984a5de48dca2f94589dcc))
* **layout:** add inner-classes prop ([874f9a4](https://github.com/vexip-ui/vexip-ui/commit/874f9a4b21cee716045332e948c812a6662797b5))
* **table:** support add table summaries (footer) ([#386](https://github.com/vexip-ui/vexip-ui/issues/386)) ([27d0fd6](https://github.com/vexip-ui/vexip-ui/commit/27d0fd683bf7c5ad438d257301339f6d7e94d936))
* **table:** support merge cells ([#384](https://github.com/vexip-ui/vexip-ui/issues/384)) ([5ce3280](https://github.com/vexip-ui/vexip-ui/commit/5ce3280eb902c6719678ad19d512b53da3bed504))


### 🐞 Bug Fixes

* adjust `update:` events emitted order ([#388](https://github.com/vexip-ui/vexip-ui/issues/388)) ([b6d826b](https://github.com/vexip-ui/vexip-ui/commit/b6d826b0c1bd4ebeb08a59e03fb1a40ec6c8e9f9))
* **anchor:** effect working with window scroll ([d1cb5b6](https://github.com/vexip-ui/vexip-ui/commit/d1cb5b684d3b6b02ab5b33f6bea400fddbae83c8))
* **anchor:** incorrect track-color-active variable ([#378](https://github.com/vexip-ui/vexip-ui/issues/378)) ([4e14a6a](https://github.com/vexip-ui/vexip-ui/commit/4e14a6a1815e86d7a5cf36c02ec5805c69830115))
* **drawer:** remove internal --vxp-drawer-hanlder-offset variable ([7c32a6a](https://github.com/vexip-ui/vexip-ui/commit/7c32a6abe22c64ea09bfc51f1892f740cc59ae6e))
* enable hardware acceleration for masker, modal, drawer ([2f99288](https://github.com/vexip-ui/vexip-ui/commit/2f992885581507635ea24d83436edce856e325d6))
* **layout:** ensure emit resize event in fit-window ([b634de5](https://github.com/vexip-ui/vexip-ui/commit/b634de53b6a78bc6400dd50edf7b01accb4c285d))
* **pagination:** center page items missing title ([5135a87](https://github.com/vexip-ui/vexip-ui/commit/5135a8751d2a06d99d5d8d0d648926136a1d3635))
* **radio:** normalize button and border type style ([24cb6c0](https://github.com/vexip-ui/vexip-ui/commit/24cb6c000a983cf7dc7838dbd59255d60bd2a020))
* **tab-nav:** incorrect active content border style ([2f6d78d](https://github.com/vexip-ui/vexip-ui/commit/2f6d78dbba88daf4ff5d52f3b7c7ce7a740ccd54))


### 🔨 Code Refactoring

* **table:** rename `meta-data` prop to `meta` ([6f03cf1](https://github.com/vexip-ui/vexip-ui/commit/6f03cf1cce27cfe5e7ca7c80c81b3c2060e77c23))
* **table:** simplify code and improve columns layout ([#383](https://github.com/vexip-ui/vexip-ui/issues/383)) ([48608d9](https://github.com/vexip-ui/vexip-ui/commit/48608d9afe45f03d286267024194c7171f7cfc4c))


### ❌ Breaking Changes

* **table:** TableColumn's `meta-data` prop has been deprecated,
please use `meta` prop to replace it.



## [2.1.23](https://github.com/vexip-ui/vexip-ui/compare/v2.1.22...v2.1.23) (2023-06-02)


### ⚡ Performance Improvements

* **native-scroll:** debounce resize process ([ac8e61d](https://github.com/vexip-ui/vexip-ui/commit/ac8e61d66fa279f6f74773222e6e3e8af34bcc83))
* **native-scroll:** disable observe children resize by default ([7ac1d74](https://github.com/vexip-ui/vexip-ui/commit/7ac1d74e93523912254cbf59d8e342274c410ac6))
* **tree:** improve internal reactive variables ([92ba459](https://github.com/vexip-ui/vexip-ui/commit/92ba4591e0ab40c5784a5d49380c6223e67207d7))


### ✨ Features

* **layout:** add content-resize event ([0eda095](https://github.com/vexip-ui/vexip-ui/commit/0eda0954232047c1826d3626a870eb12dc57e314))
* **select:** add fit-popper prop ([#357](https://github.com/vexip-ui/vexip-ui/issues/357)) ([5c2c0cd](https://github.com/vexip-ui/vexip-ui/commit/5c2c0cd0733e5c43518500f1e114f52c944144ea))
* **table:** support resize table columns' width ([#343](https://github.com/vexip-ui/vexip-ui/issues/343)) ([1a9f493](https://github.com/vexip-ui/vexip-ui/commit/1a9f4931189c871ec750e34afbc303a1f35a993e))
* **timeline:** using alternate to replace both-sides prop ([5f81887](https://github.com/vexip-ui/vexip-ui/commit/5f8188742197bd100dcf9833d1aeaa685b41b9d0))
* **utils:** add getXBorder and getYBorder methods ([6f360d2](https://github.com/vexip-ui/vexip-ui/commit/6f360d2cc0a61280e13ff9d22f4103dc02ef6a43))


### 🐞 Bug Fixes

* **collapse:** adjust the border radius of the last panel of a card type ([#366](https://github.com/vexip-ui/vexip-ui/issues/366)) ([6e422fd](https://github.com/vexip-ui/vexip-ui/commit/6e422fd5a206ba7936b7d2ab7f22f7f3f10267cf))
* **confirm:** explicitly specify auto-remove false ([c5565ea](https://github.com/vexip-ui/vexip-ui/commit/c5565eae95e8067d24c27494e13112d9efe6d7a2))
* **hooks:** useMoving incorrect delay move process ([f58a173](https://github.com/vexip-ui/vexip-ui/commit/f58a1733e9f8f9736ac2d44f42e07c56ca0be3af))
* **input:** incorrect count-color-disabled variable ([#373](https://github.com/vexip-ui/vexip-ui/issues/373)) ([3bf3204](https://github.com/vexip-ui/vexip-ui/commit/3bf32044e14473985114eb5f39feebf51e91efef))
* **layout:** adjust aside class to be compatible with nested ([88fc9c0](https://github.com/vexip-ui/vexip-ui/commit/88fc9c07c7bbdce39bfbc0e1ef44a1491c711494))
* **layout:** aside main scroll not refresh ([89e58e5](https://github.com/vexip-ui/vexip-ui/commit/89e58e5811c8a25de9f56d9e22f5626282c741f9))
* **layout:** subtract border width when recording height ([31fb537](https://github.com/vexip-ui/vexip-ui/commit/31fb537f057859b1f8536924c2b2ab3763ee41ad)), closes [#364](https://github.com/vexip-ui/vexip-ui/issues/364)
* **locale:** confirm typo in English ([#337](https://github.com/vexip-ui/vexip-ui/issues/337)) ([e256ca9](https://github.com/vexip-ui/vexip-ui/commit/e256ca9f6b8a6d3ad483880450f8d1370be14ab1))
* normalize props export of all components ([558db00](https://github.com/vexip-ui/vexip-ui/commit/558db00d2b8a55a7d108a06cd95f52e4250ed89e))
* **number-input:** props.value precision lose efficacy ([#365](https://github.com/vexip-ui/vexip-ui/issues/365)) ([64650e8](https://github.com/vexip-ui/vexip-ui/commit/64650e8e67bfc82e75af22699ef4a80ec38b4970))
* **tab-nav:** add missing scroll style dependency ([3d396fa](https://github.com/vexip-ui/vexip-ui/commit/3d396fa4f3be2f92974e418fd8c3cf99d2fb255f))
* **tab-nav:** incorrect pad display ([560790a](https://github.com/vexip-ui/vexip-ui/commit/560790a3d405a9db84e18faa64d4e2e030ec5e2c))
* **textarea:** incorrect count-color-disabled variable ([#372](https://github.com/vexip-ui/vexip-ui/issues/372)) ([8b9ac41](https://github.com/vexip-ui/vexip-ui/commit/8b9ac416deff0347ad5b20a5fe5a6c9a0ea8ee06))
* **timeline:** effect alternate work correctly ([ff77266](https://github.com/vexip-ui/vexip-ui/commit/ff77266e3841d524be9f25f9639fdaecb46ceced))
* **utils:** incorrect leap year function name ([#345](https://github.com/vexip-ui/vexip-ui/issues/345)) ([1958a46](https://github.com/vexip-ui/vexip-ui/commit/1958a46a63ce5f26f6d16e46d328abe7f019fe92))


### 👓 Types

* **form:** incorrect ValidatorResult type ([#350](https://github.com/vexip-ui/vexip-ui/issues/350)) ([828bd61](https://github.com/vexip-ui/vexip-ui/commit/828bd61cc82eab006b552cbc4341538fe7061be1))
* **timeline:** incorrect TimelineItem type ([#346](https://github.com/vexip-ui/vexip-ui/issues/346)) ([5853e99](https://github.com/vexip-ui/vexip-ui/commit/5853e99b2b0c3b52121b56b414e46df66bbe3e88))
* **tooltip:** incorrect TooltipTrigger type ([#348](https://github.com/vexip-ui/vexip-ui/issues/348)) ([59864aa](https://github.com/vexip-ui/vexip-ui/commit/59864aa7724de98b948aef5c22b4e0e9a1eb2e07))


### 🔨 Code Refactoring

* **ellipsis:** switch to use Tooltip as base ([f522626](https://github.com/vexip-ui/vexip-ui/commit/f522626957012dec91e7aaed9c68294493b664b0))


### ❌ Breaking Changes

* **native-scroll:** NativeScroll no longer observes children resize by default,
you can add `observe-deep` prop to enable it.
* **timeline:** Timeline's `both-sides` prop has been deprecated,
please using `alternate` prop to replace it.



## [2.1.22](https://github.com/vexip-ui/vexip-ui/compare/v2.1.21...v2.1.22) (2023-05-25)


### ✨ Features

* **dropdown:** add custom prop to mark to disable nested process ([f29ba14](https://github.com/vexip-ui/vexip-ui/commit/f29ba145aaa1a556c5aa262e81f35f7ece659388))
* exports all props definitions to support extends ([0186871](https://github.com/vexip-ui/vexip-ui/commit/018687198aae791c63eb897305d96aa6354eb52e))
* **style:** use new font-family for mono ([9f88146](https://github.com/vexip-ui/vexip-ui/commit/9f881468ddc48dc63d84b316b1f9bacc8a87f889))


### 🐞 Bug Fixes

* **cascader:** should reset hitting when panel options changed ([d4180f2](https://github.com/vexip-ui/vexip-ui/commit/d4180f2921af9d49564c28366aae68c99507ae1d))
* **config:** ensure props exec validator at once ([#328](https://github.com/vexip-ui/vexip-ui/issues/328)) ([bcdf759](https://github.com/vexip-ui/vexip-ui/commit/bcdf759083903b0aa85cef6d963f20dcfb8a4c76))
* **dropdown:** disable transfer for nested dropdown ([1c65cfd](https://github.com/vexip-ui/vexip-ui/commit/1c65cfd8000afe58b2f0e8f513c333f21a50f1d9))
* **menu:** improve and fix menu item style ([9a780f4](https://github.com/vexip-ui/vexip-ui/commit/9a780f4117474c8460e8a5235a6b521038fd9274))
* **menu:** incorrect menu item style in rest ([afa3e56](https://github.com/vexip-ui/vexip-ui/commit/afa3e560926b8abd86bd6f4fd2378d1e5e6964f3))
* **menu:** missing meta payload when using options ([f8bcc0d](https://github.com/vexip-ui/vexip-ui/commit/f8bcc0daf486f11bd97c7702e5f260d20b366e7d))
* **menu:** popper cannot disappear after quickly hover twice ([d644b54](https://github.com/vexip-ui/vexip-ui/commit/d644b54a4aa777645961054afd72caeaaffd77ec))
* **tooltip:** radius variable typo ([cb978ee](https://github.com/vexip-ui/vexip-ui/commit/cb978ee3743112c3eb13860963f14149c64b2bd4))
* **typography:** exactly using kbd tag for keyboard text ([f288ef6](https://github.com/vexip-ui/vexip-ui/commit/f288ef69796ef88d84b115f3d8f9468d8352b631))


### 👓 Types

* **table:** improve column type inferring for definitions ([#325](https://github.com/vexip-ui/vexip-ui/issues/325)) ([07b138d](https://github.com/vexip-ui/vexip-ui/commit/07b138d1232e56e27bc9f7478efdb9705c95d537))



## [2.1.21](https://github.com/vexip-ui/vexip-ui/compare/v2.1.20...v2.1.21) (2023-05-21)


### ✨ Features

* **auto-complete:** add focus and blur events ([a5873a1](https://github.com/vexip-ui/vexip-ui/commit/a5873a1b13c2d93d0e4e381b0de4885086561ea6))
* **bem-helper:** create bem-helper package ([f91208e](https://github.com/vexip-ui/vexip-ui/commit/f91208e661ac1ecb0d14289dc57286683392f212))
* **hooks:** useMounted support wait a tick or frame ([ccd77f6](https://github.com/vexip-ui/vexip-ui/commit/ccd77f696db86502b83f8071a1db99436ebb4c41))
* **input:** add copyValue api method ([29fda06](https://github.com/vexip-ui/vexip-ui/commit/29fda06748aaa22e916ab5e37c75287c3d6ec089))
* normalize focus and blur methods for form components ([718090c](https://github.com/vexip-ui/vexip-ui/commit/718090c4cadee00496717f04e4a73cc599393332))
* **select:** add api focus and blur methods ([638fc3c](https://github.com/vexip-ui/vexip-ui/commit/638fc3c45c1d72f1ce862110aee8c4167ab48a51))
* **time-picker:** support click item to select ([6f58387](https://github.com/vexip-ui/vexip-ui/commit/6f583871b635a77a41ba5b1bf6f229156da50823))
* **utils:** add runQueueFrame method ([a376a15](https://github.com/vexip-ui/vexip-ui/commit/a376a15bbcb29ab93224d1fe1f13e0b8442ddb4e))
* **wheel:** emit item-click event ([9c84084](https://github.com/vexip-ui/vexip-ui/commit/9c84084c0214e7abd816d2b817feadb100de0158))


### 🐞 Bug Fixes

* **date-picker:** add header titles for range select datetime ([dfc2401](https://github.com/vexip-ui/vexip-ui/commit/dfc2401b111fee7915976c40030ca365cfe74103))
* **layout:** disable transition when not mounted ([5fe7030](https://github.com/vexip-ui/vexip-ui/commit/5fe703004b64aae4fef07fd7ee6c45ef2e9f4b50))
* **radio:** ensure effective loading icon in button mode ([a59eb8e](https://github.com/vexip-ui/vexip-ui/commit/a59eb8eb4f93703409b135eb457a0c6e563d5f38))
* **radio:** normailze line-height in button mode ([7835c93](https://github.com/vexip-ui/vexip-ui/commit/7835c9382558c54f00a3ae3c012b8d349dbed3eb))
* **text:** incorrect style of thin mode ([dc1ccce](https://github.com/vexip-ui/vexip-ui/commit/dc1ccce0e5315cb7a55cd045015d369761fe3aad))


### 👓 Types

* **config:** use bem helper to improve namespace types ([d7ca7aa](https://github.com/vexip-ui/vexip-ui/commit/d7ca7aacbda74d580408c71be8aed07a1eb110b7))



## [2.1.20](https://github.com/vexip-ui/vexip-ui/compare/v2.1.19...v2.1.20) (2023-05-14)


### 🐞 Bug Fixes

* **scrollbar:** incorrect style import path ([5e2a8c9](https://github.com/vexip-ui/vexip-ui/commit/5e2a8c9cf4e556144445de13386b63b8273012c4))



## [2.1.19](https://github.com/vexip-ui/vexip-ui/compare/v2.1.17...v2.1.19) (2023-05-14)


### ✨ Features

* **ellipsis:** add tip-disabled prop ([e24cd7d](https://github.com/vexip-ui/vexip-ui/commit/e24cd7d87c6cb34535bd4beba81ca4e4e0af741d))
* **table:** add text-align prop for TableColumn ([479abaa](https://github.com/vexip-ui/vexip-ui/commit/479abaaba9b165d1947faf174f3af4d927f8a8b1))
* **table:** support custom filter renderer ([241d8aa](https://github.com/vexip-ui/vexip-ui/commit/241d8aa9f1bccae97ae2a50534ae6157f2c3b827))
* **table:** use class prop replace class-name ([10b32ec](https://github.com/vexip-ui/vexip-ui/commit/10b32ec7496d6928e350150676261e758b342896))
* **tooltip:** provide api methods from slots ([879cc0a](https://github.com/vexip-ui/vexip-ui/commit/879cc0ad477830ad72955bf41129fbf33a1861a2))
* **utils:** enhance flatTree to support depth first and filter ([c5a5728](https://github.com/vexip-ui/vexip-ui/commit/c5a57284863de973dc0480243af114cc02217b44))


### 🐞 Bug Fixes

* **card:** unexpected content collapse ([e063a40](https://github.com/vexip-ui/vexip-ui/commit/e063a408632639d4c19fcb4e2343a8accb9d67d2))
* **color-picker:** alpha cannot be confirmed to 0 ([9921700](https://github.com/vexip-ui/vexip-ui/commit/9921700cf2a09490259159a03900ba8ea53be1fe))
* **layout:** correct timing of mediaQuery call in ssr ([62b5443](https://github.com/vexip-ui/vexip-ui/commit/62b5443e97d5e0bcaa59ac4dc74ff703040c17bd))
* **layout:** emit expanded change event when breakpoint changed ([94f2716](https://github.com/vexip-ui/vexip-ui/commit/94f2716c167db3a21eaffe8967d1ea47923270cd))
* **scrollbar:** remove incorrect style dependency ([7213a5c](https://github.com/vexip-ui/vexip-ui/commit/7213a5c71bb15c0e7ae94600431712a6b39bfe26))
* **table:** correct filter trigger style ([c9fc151](https://github.com/vexip-ui/vexip-ui/commit/c9fc1510be5e223b01d42ab407cb306f598fed49))
* **table:** correct using native scroll exposed ([ef58f8a](https://github.com/vexip-ui/vexip-ui/commit/ef58f8a85a1580230a6b4faa9456416c0f63df8d))
* **table:** effect re-render when column slots' content changed ([ca79311](https://github.com/vexip-ui/vexip-ui/commit/ca79311d31a234736c182f7afe576ecaf79c92fd))
* **utils:** correct flatTree filter method ([94dacad](https://github.com/vexip-ui/vexip-ui/commit/94dacad0625fbd2e520d646a4afaad2692909c47))


### 👓 Types

* **native-scroll:** correct instance exposed types ([b59e019](https://github.com/vexip-ui/vexip-ui/commit/b59e01994961f2f164a2739bab08f88ce6ff2d22))
* **table:** change default data type to any to improve infer ([695b2c1](https://github.com/vexip-ui/vexip-ui/commit/695b2c1306ff6c427f04c0c4d521b4a555562d62))


### 🔨 Code Refactoring

* **layout:** normalize slot params and exposed ([5abb6a3](https://github.com/vexip-ui/vexip-ui/commit/5abb6a36636162c9c1affa3a86e33f9c98408651))
* **transfer:** imporve slot params and change to tsx ([68f81f0](https://github.com/vexip-ui/vexip-ui/commit/68f81f0db7b3345504fc033e46a71bc906144130))


### ❌ Breaking Changes

* **layout:** Api methods renamed:  `toggleReduce` -> `toggleReduced`,
`toggleUserDrop` -> `toggleUserDropped`



## [2.1.17](https://github.com/vexip-ui/vexip-ui/compare/v2.1.16...v2.1.17) (2023-05-03)


### ⚡ Performance Improvements

* **scroll:** refactor slot params to improve content render ([5838d8f](https://github.com/vexip-ui/vexip-ui/commit/5838d8fe62a8abcb70bbfcbdfd55d6528d36e04f)), closes [#316](https://github.com/vexip-ui/vexip-ui/issues/316)


### ✨ Features

* **config-provider:** support config z-index ([8772bc2](https://github.com/vexip-ui/vexip-ui/commit/8772bc2d9d964ef5c0b864a69bead5493cd76a23))
* **config:** support provide config via hook functions ([8222299](https://github.com/vexip-ui/vexip-ui/commit/8222299e99769d416d6e04af5c6fab23c109e87a))
* **hooks:** add useManualRef hook ([da0cd38](https://github.com/vexip-ui/vexip-ui/commit/da0cd387593c49d05408147c1f58ff9900ec93b3))


### 🐞 Bug Fixes

* **card:** correct header flex style ([43d509a](https://github.com/vexip-ui/vexip-ui/commit/43d509a5f2164e0c0a9567058453c12dd89cc1a6))
* **scroll:** content shaking when init or resized ([1c8b818](https://github.com/vexip-ui/vexip-ui/commit/1c8b81821e9c3f80bb77dddacfb1912793952555))


### ❌ Breaking Changes

* **scroll:** Slot parameters of Scroll (also NativeScroll) is changed
to methods only, and now using the getState method to get scroll state.
And the modifier class names of Scroll's wrapper are transfered to the
Scroll root element.



## [2.1.16](https://github.com/vexip-ui/vexip-ui/compare/v2.1.15...v2.1.16) (2023-04-23)


### 🐞 Bug Fixes

* **anchor:** ensure get scroll methods and element ([8b9b180](https://github.com/vexip-ui/vexip-ui/commit/8b9b1807274c12e386f8f70aa66ad606eb1526b4))
* **auto-complate:** ensure effect ignore-case prop ([#312](https://github.com/vexip-ui/vexip-ui/issues/312)) ([398c681](https://github.com/vexip-ui/vexip-ui/commit/398c681796c5adf655782bd83d152e1cfb3b49a5))
* **auto-complete:** no hover effect when using filter ([20d4f73](https://github.com/vexip-ui/vexip-ui/commit/20d4f73bd76d0ee9a77eb385d3a519c0659ef2f3))
* **card:** flexible height for content ([dba86b6](https://github.com/vexip-ui/vexip-ui/commit/dba86b6eb297cbe488e43dc9ed7dd111dcc3c237))
* **form-submit:** missing button style dependency ([02f3f04](https://github.com/vexip-ui/vexip-ui/commit/02f3f048d24311451aa06a83e257af45b22665c9))
* **layout:** ensure aside-main using y scrollbar ([131573c](https://github.com/vexip-ui/vexip-ui/commit/131573c88df3aa8e4a7d79de98bf168e43d5979c))
* **layout:** incorrect main section min-height ([a3c325f](https://github.com/vexip-ui/vexip-ui/commit/a3c325fb861d37e3c09a62672493e83e2da17293))
* **masker:** set valid z-index if default active ([2d4f613](https://github.com/vexip-ui/vexip-ui/commit/2d4f6131a174c76bdaf0ef5b377be50526c0e799))
* **utils:** flatTree don't set parent if parentField is empty ([a1d51a5](https://github.com/vexip-ui/vexip-ui/commit/a1d51a52de5d82b251e63e829499d6f35aa4db0b))


### 👓 Types

* **menu:** make meta type to any for compatibility ([be948c8](https://github.com/vexip-ui/vexip-ui/commit/be948c88df785c36e4e4c2836173d311ca1e9896))
* **select:** make raw option type to any for compatibility ([b9c27a7](https://github.com/vexip-ui/vexip-ui/commit/b9c27a7d4aa123555778c10e5c8f248bb8dbda1f))



## [2.1.15](https://github.com/vexip-ui/vexip-ui/compare/v2.1.14...v2.1.15) (2023-04-17)


### 🐞 Bug Fixes

* **layout:** fixed wrapper height when `fixed-main` ([f47d9a6](https://github.com/vexip-ui/vexip-ui/commit/f47d9a689b284a6eb1c73b6390b323442d0273f3))
* **table:** ensure ignore when row drop to its parent ([3543510](https://github.com/vexip-ui/vexip-ui/commit/354351024c242119fc9f8043e941e21b321813e9))
* **table:** ensure render indicator when using drag column ([388ffec](https://github.com/vexip-ui/vexip-ui/commit/388ffecaa9d77367fac775d049b5969770422dc3))
* **table:** infinitely rerender when using primitive object in TableColumn ([19f5f55](https://github.com/vexip-ui/vexip-ui/commit/19f5f5534b38de71553e6ad5798ffe57b1a97d0b)), closes [#303](https://github.com/vexip-ui/vexip-ui/issues/303)


### 👓 Types

* **auto-complete:** improve scalability for events ([4b4357c](https://github.com/vexip-ui/vexip-ui/commit/4b4357cfad93b8aae2f605b12ec68ce865ac0605))
* **breadcrumb:** improve scalability for events ([70b9224](https://github.com/vexip-ui/vexip-ui/commit/70b9224315019f5dddfc70686c4ea678c5900f18))
* **cascader:** improve scalability for events ([9a67006](https://github.com/vexip-ui/vexip-ui/commit/9a6700675d7700886ed29b90c2219c4c81e94820))
* **select:** improve scalability for events ([db88b69](https://github.com/vexip-ui/vexip-ui/commit/db88b69120ee366dad12583097d21067225e10a8))



## [2.1.14](https://github.com/vexip-ui/vexip-ui/compare/v2.1.13...v2.1.14) (2023-04-13)


### ✨ Features

* **icons:** upgrate font-awesome to 6.4.0 ([74a47cb](https://github.com/vexip-ui/vexip-ui/commit/74a47cb9efefdb696835b41828515eaac6e23aaf))
* **layout:** add fixed-main prop ([969f512](https://github.com/vexip-ui/vexip-ui/commit/969f512874356d24fb26a711047ef1c1928648b4))
* **utils:** add normalizePath method ([4411b49](https://github.com/vexip-ui/vexip-ui/commit/4411b496bef1548d7c48c2dc8999d642dd1f2b75))



## [2.1.13](https://github.com/vexip-ui/vexip-ui/compare/v2.1.12...v2.1.13) (2023-04-12)


### 🐞 Bug Fixes

* **scroll:** improve extra slot not render when no content ([4dfccb8](https://github.com/vexip-ui/vexip-ui/commit/4dfccb8a7725023117ace6dfed4910c23dafb6c8))
* **style:** topological sorting for style import ([a36d606](https://github.com/vexip-ui/vexip-ui/commit/a36d6064d544b33da331ea760f1419f83c391f11))


### 🔨 Code Refactoring

* **config:** dynamic z-index for popper-type components ([#305](https://github.com/vexip-ui/vexip-ui/issues/305)) ([2ce5cec](https://github.com/vexip-ui/vexip-ui/commit/2ce5cec0de293a2db390cf977df7229026851e86))
* **table:** switch to using NativeScroll ([4e10ea2](https://github.com/vexip-ui/vexip-ui/commit/4e10ea2e9c254fd87469c27c695e248f759cd6bf))



## [2.1.12](https://github.com/vexip-ui/vexip-ui/compare/v2.1.11...v2.1.12) (2023-04-06)


### ✨ Features

* **number-input:** add out of range effect for input control ([078681c](https://github.com/vexip-ui/vexip-ui/commit/078681c23a4158c35ec4e9714601b504ef8c359c))
* **select:** support remote mode ([#301](https://github.com/vexip-ui/vexip-ui/issues/301)) ([e5da199](https://github.com/vexip-ui/vexip-ui/commit/e5da1993f0f2110128570abb08b09835b19c75da))


### 🐞 Bug Fixes

* **number-input:** ensure emit change event in sync mode ([aab42ab](https://github.com/vexip-ui/vexip-ui/commit/aab42ab4170859ee89d2896eca2d9944d4b42f38)), closes [#296](https://github.com/vexip-ui/vexip-ui/issues/296)
* **number-input:** unexpected behavior in sync mode ([9c77dc3](https://github.com/vexip-ui/vexip-ui/commit/9c77dc3b1b37719987e15175ac5b20c4c6e47559)), closes [#299](https://github.com/vexip-ui/vexip-ui/issues/299)
* **select:** correctly emit focus and blur events ([e9ee8ce](https://github.com/vexip-ui/vexip-ui/commit/e9ee8ce265e975b3b3a869c966d892ec17fe8f24)), closes [#300](https://github.com/vexip-ui/vexip-ui/issues/300)
* specific type value for internal buttons ([0a39d69](https://github.com/vexip-ui/vexip-ui/commit/0a39d697b434aa7b55afe502da0b649a48c16c32)), closes [#297](https://github.com/vexip-ui/vexip-ui/issues/297)


### 🔨 Code Refactoring

* **config:** external locale config for on demand import ([#302](https://github.com/vexip-ui/vexip-ui/issues/302)) ([86eab10](https://github.com/vexip-ui/vexip-ui/commit/86eab101f4fbf1579e2ac2cf7abe299e1faf6583))


### ❌ Breaking Changes

* **config:** `en-US` and `ta-IN` isn't included in internal locale config no longer.
Now these config are exported independently, using e.g. `import { enUSLocale } from 'vexip-ui'` 
to import locale config that you want to use. See docs about global config for more details.



## [2.1.11](https://github.com/vexip-ui/vexip-ui/compare/v2.1.10...v2.1.11) (2023-04-03)


### ✨ Features

* **locale:** internally support Tamil language ([#293](https://github.com/vexip-ui/vexip-ui/issues/293)) ([0331ec7](https://github.com/vexip-ui/vexip-ui/commit/0331ec75caac7f7b0c63598c352125dfcd0c5831))
* **table:** support add column with drag type to create handler ([89df1fc](https://github.com/vexip-ui/vexip-ui/commit/89df1fc2a57ef370d43be7cabca7ff6730e5518e))


### 🐞 Bug Fixes

* **plugins:** support vexip-ui version lower than 2.1.10 ([7e747d2](https://github.com/vexip-ui/vexip-ui/commit/7e747d2882e22aa1acc9b36e082a256675911259))



## [2.1.10](https://github.com/vexip-ui/vexip-ui/compare/v2.1.9...v2.1.10) (2023-03-29)


### ✨ Features

* **select:** support dynamic preview current hitting option's label ([a27ba4a](https://github.com/vexip-ui/vexip-ui/commit/a27ba4a39d9209940038d3ae1b1f9217efe862f5))


### 🐞 Bug Fixes

* **button:** incorrect style in circle group when with tooltip ([947c360](https://github.com/vexip-ui/vexip-ui/commit/947c360ce12ab4cd7a14cbe9546d2c5bc99e7683)), closes [#289](https://github.com/vexip-ui/vexip-ui/issues/289)
* content shrink when body too long in Modal and Drawer ([43cfd87](https://github.com/vexip-ui/vexip-ui/commit/43cfd8746d82f61a83f2637bf3a1d5f296e8e750))
* **wheel:** arrows not render with warning ([0e7d4cd](https://github.com/vexip-ui/vexip-ui/commit/0e7d4cd9663eb3404b2a7cbdccd14f7336c82586)), closes [#292](https://github.com/vexip-ui/vexip-ui/issues/292)


### 🔨 Code Refactoring

* switch to use es module to export style files ([#290](https://github.com/vexip-ui/vexip-ui/issues/290)) ([26eb0df](https://github.com/vexip-ui/vexip-ui/commit/26eb0dfbd4a3b862fb4b212aa6d20f3010e74357))


### ❌ Breaking Changes

* The scss and css style files no longer contains dependent 
styles for  its component. Currently the relationship of styles are included in ts 
(js) files which are use to import the styles. Change the import way of style like: 
`vexip-ui/css/button.css` -> `vexip-ui/es/css/button` and unnecessary to import 
preset style manually.



## [2.1.9](https://github.com/vexip-ui/vexip-ui/compare/v2.1.8...v2.1.9) (2023-03-23)


### ✨ Features

* **config:** support custom icons via config ([#287](https://github.com/vexip-ui/vexip-ui/issues/287)) ([d665f10](https://github.com/vexip-ui/vexip-ui/commit/d665f103c6ba76571dd146496358d0de481a1752))
* **date-picker:** support set week start for panel ([619385e](https://github.com/vexip-ui/vexip-ui/commit/619385e8aedcbab83da8c1506ba562d8d2b2ffc0)), closes [#286](https://github.com/vexip-ui/vexip-ui/issues/286)


### 🐞 Bug Fixes

* **config:** passing default null to avoid warning ([44c813b](https://github.com/vexip-ui/vexip-ui/commit/44c813b98a9aac9697573c9bfa70cee86ccf6f61))
* **form:** unexpected display using with Column when hmr ([fc9318d](https://github.com/vexip-ui/vexip-ui/commit/fc9318d835263d43f0e2cbb4d524b9a1ef90a9d1))
* **number-input:** incoorect suffix icon position ([b759fea](https://github.com/vexip-ui/vexip-ui/commit/b759feac6dce1ee5f9871109b4409923802916d3)), closes [#284](https://github.com/vexip-ui/vexip-ui/issues/284)
* **tabs:** header will shrink if content too height ([cc46454](https://github.com/vexip-ui/vexip-ui/commit/cc46454ea738f3790448d2c4ca14ce34a17dd6c9))


### 👓 Types

* manual exposed should exnted ComponentPublicInstance ([783a8e9](https://github.com/vexip-ui/vexip-ui/commit/783a8e9f3671c799f319c725cc97f84cfd14db54))


### 🔨 Code Refactoring

* **Layout:** adjust structure of elements for more concise ([#288](https://github.com/vexip-ui/vexip-ui/issues/288)) ([06e82ec](https://github.com/vexip-ui/vexip-ui/commit/06e82ec1d179ab91d780041763fe8ff40daf08e9)), closes [#285](https://github.com/vexip-ui/vexip-ui/issues/285)



## [2.1.8](https://github.com/vexip-ui/vexip-ui/compare/v2.1.7...v2.1.8) (2023-03-13)


### ✨ Features

* **number-input:** support custom empty value type ([a07b245](https://github.com/vexip-ui/vexip-ui/commit/a07b24595ab113dbb3ae7201ec69ad15f8034d69))


### 🐞 Bug Fixes

* **number-input:** expected render vaild unit of number ([e7612b3](https://github.com/vexip-ui/vexip-ui/commit/e7612b3f875c10bd772b34c645ee0ef1258ab538)), closes [#281](https://github.com/vexip-ui/vexip-ui/issues/281)
* prevent submit event of inner input elements ([66ce737](https://github.com/vexip-ui/vexip-ui/commit/66ce737cf8d9c3d9702f62094a90b6cb5c33c0a5)), closes [#275](https://github.com/vexip-ui/vexip-ui/issues/275)
* **scroll:** incorrect extra content z-index ([8bfb9f4](https://github.com/vexip-ui/vexip-ui/commit/8bfb9f4f020a78949a53c57e12b0b95986dcd334))



## [2.1.7](https://github.com/vexip-ui/vexip-ui/compare/v2.1.6...v2.1.7) (2023-03-11)


### ✨ Features

* **native-scroll:** support add extra content via slot ([54de8b5](https://github.com/vexip-ui/vexip-ui/commit/54de8b5ad538ae77a147a99b17b6f8a3038f95ac))
* **scroll:** support add extra content via slot ([931b4d1](https://github.com/vexip-ui/vexip-ui/commit/931b4d177e43c4d01fa942e20e3ff57bb443cd1d))
* **tree:** support post process each node when created ([7292d64](https://github.com/vexip-ui/vexip-ui/commit/7292d64629c8b4dbff7ab7ab6c360e1a67a3a60a))
* **utils:** add flatVNodes method ([35bd9e6](https://github.com/vexip-ui/vexip-ui/commit/35bd9e6c9acedd4be60df5bc2638a1ceb73139c0))


### 🐞 Bug Fixes

* **sapce:** render nothing when no items ([858a55b](https://github.com/vexip-ui/vexip-ui/commit/858a55bbb12e1d262493263a7edd3296f4cd818e))
* table tree rendering async data cannot be expanded ([#280](https://github.com/vexip-ui/vexip-ui/issues/280)) ([285539b](https://github.com/vexip-ui/vexip-ui/commit/285539b7d9ac0a6f0ba672a08f190b0a1b61140f))
* **table:** unexpect horizontal scroll appear ([84598bf](https://github.com/vexip-ui/vexip-ui/commit/84598bfe41e1318a037f7c5be2e8f7731ee0aa5f)), closes [#278](https://github.com/vexip-ui/vexip-ui/issues/278)


### 👓 Types

* **native-scroll:** multiple define instance type ([bd5a408](https://github.com/vexip-ui/vexip-ui/commit/bd5a408d375a3f8cf8e320e45b29fcf84bcf07d2))
* **table:** normalize all types start with `Table` ([ca375b7](https://github.com/vexip-ui/vexip-ui/commit/ca375b7ffb492b0ec18fbe2d40a225e1de6b2c2d))


### ❌ Breaking Changes

* **table:** All types of Table component currently start with
`Table` prefix, e.g. `FilterOptions` -> `TableFilterOptions`



## [2.1.6](https://github.com/vexip-ui/vexip-ui/compare/v2.1.5...v2.1.6) (2023-03-08)


### ✨ Features

* **table:** add key-config prop ([da36218](https://github.com/vexip-ui/vexip-ui/commit/da36218a7f51b0d34e218b50cc9c42042ebca979))
* **table:** support parsing tree data ([#279](https://github.com/vexip-ui/vexip-ui/issues/279)) ([763f50b](https://github.com/vexip-ui/vexip-ui/commit/763f50b49afbb58ae89aef21ff79848def8911d1))
* **tree:** support create link line for nodes ([ea3110a](https://github.com/vexip-ui/vexip-ui/commit/ea3110a44bcda2b8cce4b09f55ee3fb96daa9ad2))
* **tree:** support more fine grained disabled options ([82d4877](https://github.com/vexip-ui/vexip-ui/commit/82d487755c8018e906694170fd069fd66b01e819))


### 🐞 Bug Fixes

* **checkbox:** improve signal background color in dark mode ([6fbbc22](https://github.com/vexip-ui/vexip-ui/commit/6fbbc22b0db0c92f3eae7e5017656df3cde031cb))
* **modal:** custom position not effective ([b144f9c](https://github.com/vexip-ui/vexip-ui/commit/b144f9cd014f782b706536ded0afa761f3cdbf5d))
* **select:** incorrect label color when delay set value in filter mode ([68169c0](https://github.com/vexip-ui/vexip-ui/commit/68169c068adbeb6bbe44c28c80a443895b10f719))
* **table:** ensure fill entire table when columns total width small than table ([b69cdb5](https://github.com/vexip-ui/vexip-ui/commit/b69cdb5c7e4bada0ad230037bbbf652cf38cccbf))
* **table:** incorrect scroll width when have not fixed width column ([e93bd1c](https://github.com/vexip-ui/vexip-ui/commit/e93bd1cc8921de452fd3c572c8bb20ca73ac4fc4)), closes [#278](https://github.com/vexip-ui/vexip-ui/issues/278)
* **upload:** infinite read not image file when using card type ([eceb63c](https://github.com/vexip-ui/vexip-ui/commit/eceb63c9d4087009dc73a7ce55d2a2b986f5612f))



## [2.1.5](https://github.com/vexip-ui/vexip-ui/compare/v2.1.4...v2.1.5) (2023-02-28)


### 🐞 Bug Fixes

* **form:** dynamic remove array type fields fail ([5c810fe](https://github.com/vexip-ui/vexip-ui/commit/5c810fea5d19fb8e2238edc24709468aaaf6f3ab)), closes [#274](https://github.com/vexip-ui/vexip-ui/issues/274)
* **select:** ensure label clear when using filter in signle select ([35e11c2](https://github.com/vexip-ui/vexip-ui/commit/35e11c2248035909f2ffc43c4559f25f83ec0d07)), closes [#277](https://github.com/vexip-ui/vexip-ui/issues/277)
* **table:** improve table horizontal scroll ([b99aaa1](https://github.com/vexip-ui/vexip-ui/commit/b99aaa143a25c58869197bd2b5843301aae33547)), closes [#273](https://github.com/vexip-ui/vexip-ui/issues/273)



## [2.1.4](https://github.com/vexip-ui/vexip-ui/compare/v2.1.3...v2.1.4) (2023-02-25)


### ✨ Features

* **calendar:** support two way binding for year and month ([f7469e9](https://github.com/vexip-ui/vexip-ui/commit/f7469e9d4bcc4ed91e9e1a157083a4bbab3a0485)), closes [#259](https://github.com/vexip-ui/vexip-ui/issues/259)
* **native-scroll:** add ensureInView api method ([cb860d4](https://github.com/vexip-ui/vexip-ui/commit/cb860d496ce9401b0f6c98af469c8bd57cec560c))
* **select:** emit filter-input event ([12bcfb3](https://github.com/vexip-ui/vexip-ui/commit/12bcfb36a9b0746ca5e8e145b0dcf9973ca6a977)), closes [#271](https://github.com/vexip-ui/vexip-ui/issues/271)
* **spin:** add icon-effect prop ([0d9470f](https://github.com/vexip-ui/vexip-ui/commit/0d9470fe92469e2ce9802856dcfd3f37461a1d13))
* **table:** support custom sorter and filter ([bb0f4af](https://github.com/vexip-ui/vexip-ui/commit/bb0f4afda1b43d4f4bfdac526bf6721b0410c08e)), closes [#269](https://github.com/vexip-ui/vexip-ui/issues/269)


### 🐞 Bug Fixes

* **date-picker:** cannot focus end input when in range mode ([5ea7b59](https://github.com/vexip-ui/vexip-ui/commit/5ea7b59bc23043ebc5e06f0407feb6a1b160e996))
* **date-picker:** ensure clearable prop wroks when no passing value ([68854b8](https://github.com/vexip-ui/vexip-ui/commit/68854b8f2505cbbf992b5ef535292382d51ed048)), closes [#258](https://github.com/vexip-ui/vexip-ui/issues/258)
* **hooks:** improve useHover using useListener ([007dba8](https://github.com/vexip-ui/vexip-ui/commit/007dba8308e3199d08f9e65c4a3d96297031d6e5))
* **input:** make sync effective when under FormItem ([207ef20](https://github.com/vexip-ui/vexip-ui/commit/207ef20b4b624d8e4717f151b410de1e7e03009e)), closes [#267](https://github.com/vexip-ui/vexip-ui/issues/267)
* **layout:** improve user dropdown position ([b91291b](https://github.com/vexip-ui/vexip-ui/commit/b91291b73208ca6414f8cead5410fa1c03404ecf))
* **radio:** should not be selected when in loading and loading-lock ([#260](https://github.com/vexip-ui/vexip-ui/issues/260)) ([3d79c9f](https://github.com/vexip-ui/vexip-ui/commit/3d79c9f256c09bb44c5e69489ac1e90926e921d5))
* **select:** internal filter should filter by label ([bf39188](https://github.com/vexip-ui/vexip-ui/commit/bf391884d7a086ddd6915663c998bb8cd568c398)), closes [#265](https://github.com/vexip-ui/vexip-ui/issues/265)
* **select:** normalize space and enter key behavior ([75ee99b](https://github.com/vexip-ui/vexip-ui/commit/75ee99beb13b26309027dd8b6cb5efdd4d7dbccb))
* **select:** unexpect emit focus event when blur ([3e0afca](https://github.com/vexip-ui/vexip-ui/commit/3e0afca821060305891f257e1324412824bb57a3)), closes [#264](https://github.com/vexip-ui/vexip-ui/issues/264)
* **table:** cannot refresh row states by data directly ([b9bb46d](https://github.com/vexip-ui/vexip-ui/commit/b9bb46d40fe1ce1ad4a23e790f70bcf178353297))
* **table:** improve column sorter and filter able default true ([688dba4](https://github.com/vexip-ui/vexip-ui/commit/688dba40524ec5d56b10aa669329a7973ba45bfd))


### 👓 Types

* **table:** improve row event payload (TableRowPayload) ([07f5a30](https://github.com/vexip-ui/vexip-ui/commit/07f5a308993d3f3fc9bb856d5bb2bfec248d7bc7))



## [2.1.3](https://github.com/vexip-ui/vexip-ui/compare/v2.1.2...v2.1.3) (2023-02-08)


### 🐞 Bug Fixes

* **menu:** incorrect group indent css var ([45ebf73](https://github.com/vexip-ui/vexip-ui/commit/45ebf7380ce08e386c825fd26ffbe4d0d8d3cd8d))


### 🔨 Code Refactoring

* **date-picker:** improve no-action selection mode ([a04e131](https://github.com/vexip-ui/vexip-ui/commit/a04e13102481b973bdfa7176a6d17c9117714638)), closes [#256](https://github.com/vexip-ui/vexip-ui/issues/256)



## [2.1.2](https://github.com/vexip-ui/vexip-ui/compare/v2.1.1...v2.1.2) (2023-02-08)


### ✨ Features

* **date-picker:** support set input unit controls readonly ([c55ea0d](https://github.com/vexip-ui/vexip-ui/commit/c55ea0dd83e4ac1ae37ef2663099399c8b3de6d7))
* **menu:** support custom menu item indentation ([f385042](https://github.com/vexip-ui/vexip-ui/commit/f38504209696c4591e396e70f5786ab5d7d1785f)), closes [#252](https://github.com/vexip-ui/vexip-ui/issues/252)
* **time-picker:** support set input unit controls readonly ([6eaaac0](https://github.com/vexip-ui/vexip-ui/commit/6eaaac073a8907d0595208e0f1d340394c2925d1))


### 🐞 Bug Fixes

* **calendar:** reactive for week-start prop changed ([bf8c9a5](https://github.com/vexip-ui/vexip-ui/commit/bf8c9a5d3d6249739e83ce89e5a7deec5d54d175)), closes [#255](https://github.com/vexip-ui/vexip-ui/issues/255)
* **layout:** normalize layout main z-index ([e4d1e1a](https://github.com/vexip-ui/vexip-ui/commit/e4d1e1a032f7c82677023d6e2c572cb2a091d22b)), closes [#253](https://github.com/vexip-ui/vexip-ui/issues/253)
* **locale:** corrent inject locale word space config ([aee45aa](https://github.com/vexip-ui/vexip-ui/commit/aee45aae8b93a54ac5f14bd6476584b52e12f045))
* **menu:** correct selected style in horizontal mode ([1e56461](https://github.com/vexip-ui/vexip-ui/commit/1e56461e305af966ecd4cdb31c6136b85f90d6bf))
* **plugins:** correct css file path for dark mode ([#254](https://github.com/vexip-ui/vexip-ui/issues/254)) ([f3aa29b](https://github.com/vexip-ui/vexip-ui/commit/f3aa29b6467fd846c017850e81f588928ac8de8e))
* **select:** correct cursor style ([9e0d6a4](https://github.com/vexip-ui/vexip-ui/commit/9e0d6a4d2fca5f8aaed6a4590e53324a19308dad))



## [2.1.1](https://github.com/vexip-ui/vexip-ui/compare/v2.1.0...v2.1.1) (2023-02-07)


### ✨ Features

* **layout:** support manually control dark mode ([04c199e](https://github.com/vexip-ui/vexip-ui/commit/04c199e91904546906502755786aba9e2e95855f)), closes [#245](https://github.com/vexip-ui/vexip-ui/issues/245)
* **time-picker:** add placholder prop ([b5ca190](https://github.com/vexip-ui/vexip-ui/commit/b5ca1909bc409039d5cd79c9e08427e6408ce4bc))


### 🐞 Bug Fixes

* **menu:** active menu not follow router when init ([75772ed](https://github.com/vexip-ui/vexip-ui/commit/75772ed1a2db804a729429629c9bf4bb03ca733b)), closes [#246](https://github.com/vexip-ui/vexip-ui/issues/246)
* **menu:** improve group visible item style ([48c7166](https://github.com/vexip-ui/vexip-ui/commit/48c716602ab08ef83d889088c48ada26f35407a4)), closes [#248](https://github.com/vexip-ui/vexip-ui/issues/248)
* **time-picker:** full controllable control value via value prop ([90ca68c](https://github.com/vexip-ui/vexip-ui/commit/90ca68c4b5615c6bae6ddbe59d63ee15bb18d19c))


### 🔨 Code Refactoring

* **date-picker:** remove mandatory linkage between input control and panel ([#247](https://github.com/vexip-ui/vexip-ui/issues/247)) ([a748b6d](https://github.com/vexip-ui/vexip-ui/commit/a748b6ddb0d4ad89cad17b6eba80200202a43718))



# [2.1.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.20...v2.1.0) (2023-01-30)


### ✨ Features

* **full-screen:** add FullScreen component ([#212](https://github.com/vexip-ui/vexip-ui/issues/212)) ([46ebb3e](https://github.com/vexip-ui/vexip-ui/commit/46ebb3edc69eacfa8147bb2a26b27162cc1473a8))
* **icons:** upgrade to font-awesome@6.2.1 ([a9e5950](https://github.com/vexip-ui/vexip-ui/commit/a9e59501d0a145c28814f96f9fbfb717130105b1))
* **Image:** add Image component ([#225](https://github.com/vexip-ui/vexip-ui/issues/225)) ([e26a75e](https://github.com/vexip-ui/vexip-ui/commit/e26a75eb4c714ae6e49193724b4f20f2bb7a5d38))
* **input:** add plain password button slot ([e74cee3](https://github.com/vexip-ui/vexip-ui/commit/e74cee38f19a27c85b1fc3c5cf360946ea499a80))
* **layout:** emitted toggle-theme event ([e89f6c2](https://github.com/vexip-ui/vexip-ui/commit/e89f6c2d10d747b175f48e0087520cb97bfb0446)), closes [#242](https://github.com/vexip-ui/vexip-ui/issues/242)
* **native-scroll:** add scroll-attrs prop ([68c4490](https://github.com/vexip-ui/vexip-ui/commit/68c4490c83839a067ad3b3868052c245dceda2b9))
* **Result:** add Result component ([#238](https://github.com/vexip-ui/vexip-ui/issues/238)) ([0812183](https://github.com/vexip-ui/vexip-ui/commit/0812183fc0d4b5f716b9b03498aa0891b9cd6353))
* **scroll:** add scroll-attrs prop ([d10d24e](https://github.com/vexip-ui/vexip-ui/commit/d10d24e55707328c09c39820eacf7a802fa3f132))
* **scroll:** add scroll-style prop ([3a3d1b3](https://github.com/vexip-ui/vexip-ui/commit/3a3d1b32dea5377d1de705d82e58e18f6942bcfd))
* **scroll:** support custom scroll wrapper tag (include NativeScroll) ([1182e21](https://github.com/vexip-ui/vexip-ui/commit/1182e218cb2dae13518f2c283ec981fb20db42f9))
* **select:** add max-tag-count, no-rest-tip and tag-type props ([#224](https://github.com/vexip-ui/vexip-ui/issues/224)) ([bdc7517](https://github.com/vexip-ui/vexip-ui/commit/bdc751789ebee18353900bcab1436d7d352739b0))
* support specify locale config via `locale` prop ([#239](https://github.com/vexip-ui/vexip-ui/issues/239)) ([e483dea](https://github.com/vexip-ui/vexip-ui/commit/e483deab8f58b0859ea310020973f990d83a720a))
* **tab-nav:** support scroll when items size large than wrapper ([#234](https://github.com/vexip-ui/vexip-ui/issues/234)) ([066a985](https://github.com/vexip-ui/vexip-ui/commit/066a985d9bc976bf06a01fcc69c7e0411b0af86b))
* **tag:** support add extra content ([#222](https://github.com/vexip-ui/vexip-ui/issues/222)) ([9fb911c](https://github.com/vexip-ui/vexip-ui/commit/9fb911cdc5624b8f9f83e6ba95b3c2567f44e871))


### 🐞 Bug Fixes

* **confirm:** fallback to create app when without mounted app ([064cc52](https://github.com/vexip-ui/vexip-ui/commit/064cc525d3aa0158b856655fed8119d9fb31ca7e))
* **contextmenu:** should have default z-index ([debaa3d](https://github.com/vexip-ui/vexip-ui/commit/debaa3d7107b38355207759dc8840a0ca5169c6e))
* **form:** icon and loading slots for submit and reset not effective ([260001c](https://github.com/vexip-ui/vexip-ui/commit/260001cb7d32402e835a1b1a5c2336816af9de90))
* **form:** submit loading cannot follow form loading ([6bfcc69](https://github.com/vexip-ui/vexip-ui/commit/6bfcc6950f7f294ca932e7e959d0b636022988c5))
* **input:** plain-password button cannot click when clearable ([ac33af5](https://github.com/vexip-ui/vexip-ui/commit/ac33af5d5dad5e9252acb8878cfdbc5dfdf24462)), closes [#229](https://github.com/vexip-ui/vexip-ui/issues/229)
* **layout:** media query not correct when set to xs ([53c0150](https://github.com/vexip-ui/vexip-ui/commit/53c0150ccaa4982b2cc53b7919480604e787c8ed))
* **menu:** menu item icon slot not effective ([9c20725](https://github.com/vexip-ui/vexip-ui/commit/9c2072517a1cffa4beb6e311b9a295e5ad5c063a))
* **select:** cannot reset selected when passing empty value ([c46805a](https://github.com/vexip-ui/vexip-ui/commit/c46805a4fbba76d4b0de9c2bb9d54e4df00016b7))
* **toast:** fallback to create app when without mounted app ([c6330a9](https://github.com/vexip-ui/vexip-ui/commit/c6330a90593d12af8311b09b27b6aeae6b5226cb))
* **utils:** using pointerdown event for touch action ([e03462f](https://github.com/vexip-ui/vexip-ui/commit/e03462fa2eabbfc247cfc206a6a26fc4d33169ab))


### 👓 Types

* export exposed type for all components ([#233](https://github.com/vexip-ui/vexip-ui/issues/233)) ([dc38c14](https://github.com/vexip-ui/vexip-ui/commit/dc38c14bfb7698d9daeac0214b0755c4caa5a682))
* imporve components prop type to show the original definition ([70a17be](https://github.com/vexip-ui/vexip-ui/commit/70a17be085590ce4c440f3c985fec2cfe78923aa))
* improve Object.freeze type inferring ([c20c3a8](https://github.com/vexip-ui/vexip-ui/commit/c20c3a8820b7178a9e8c9b252f19dd5f08bd8800))
* **utils:** improve toCapitalCase type inferring ([#236](https://github.com/vexip-ui/vexip-ui/issues/236)) ([de29f21](https://github.com/vexip-ui/vexip-ui/commit/de29f21c18bfa15ecb4c4fec2da9dba204d4e6b5))


### 🔨 Code Refactoring

* **icon:** migrate `spin` and `pulse` props into `effect` prop ([#213](https://github.com/vexip-ui/vexip-ui/issues/213)) ([c7443d2](https://github.com/vexip-ui/vexip-ui/commit/c7443d28bfaf47ab1e5456faf4822282630bd997))



## [2.0.20](https://github.com/vexip-ui/vexip-ui/compare/v2.0.19...v2.0.20) (2023-01-10)


### ✨ Features

* **date-picker:** add outside-close and outside-cancel props ([5a62a8a](https://github.com/vexip-ui/vexip-ui/commit/5a62a8a554c3518dcd66eaca99a50a791eb81a5d))


### 🐞 Bug Fixes

* **date-picker:** reset activated when set value to falsy ([ea2e74e](https://github.com/vexip-ui/vexip-ui/commit/ea2e74ebc222f193be59efb5a95b58a4dc73de72))
* **locale:** per page typo ([bf85f8b](https://github.com/vexip-ui/vexip-ui/commit/bf85f8b6f9560bf055e32844f7d2c59cbd363811))
* **modal:** close button cannot be clicked in touch mode ([d0a24a4](https://github.com/vexip-ui/vexip-ui/commit/d0a24a4693dc0e3cd9a615f168c4cd3998bca7f1))
* **switch:** misalignment of signal occurs during transition ([1bd5da5](https://github.com/vexip-ui/vexip-ui/commit/1bd5da56346844a9091c89020ffee78cf107c9c6))
* **table:** column fixed effect displayed when scroll not enable ([6d75dcf](https://github.com/vexip-ui/vexip-ui/commit/6d75dcf160c268d6bac339f3c1208518ac850798))
* **upload:** count-limit not effective in image mode ([f356f11](https://github.com/vexip-ui/vexip-ui/commit/f356f11919e1bb86a7bd2e066b398cdf728f0d50))


### 👓 Types

* **input:** improve change and input event types ([c2ad375](https://github.com/vexip-ui/vexip-ui/commit/c2ad375e853653e0e720f6501a6019b0378542c8))
* **tab-nav:** improve change and close event types ([cfb72b0](https://github.com/vexip-ui/vexip-ui/commit/cfb72b05b07ff8cccbc83deedaeec54224e6c1fa))



## [2.0.19](https://github.com/vexip-ui/vexip-ui/compare/v2.0.18...v2.0.19) (2022-12-19)


### ✨ Features

* **overflow:** add max-count prop ([f982420](https://github.com/vexip-ui/vexip-ui/commit/f9824208a7a670d413b57b10c37745929c4529f4))
* **overflow:** support add suffix content via slot ([6754072](https://github.com/vexip-ui/vexip-ui/commit/6754072803653c7b2654931425a44426d93022e3))
* **playground:** support format codes via prettier ([5ff663c](https://github.com/vexip-ui/vexip-ui/commit/5ff663cda3963534fec687c06ed28a12803d4e0e))
* **playground:** support select cdn address ([8d70fd6](https://github.com/vexip-ui/vexip-ui/commit/8d70fd686bafc8468a03320fc9e46ead549b5e7a))


### 🐞 Bug Fixes

* **cascader:** ensure effective max-tag-count ([4d1e6c4](https://github.com/vexip-ui/vexip-ui/commit/4d1e6c4ddc542a676c7b64f71b6f0a617f981b22))
* **hooks:** improve intersection count record ([2d2f360](https://github.com/vexip-ui/vexip-ui/commit/2d2f360ba3401d82b81f1952edce5faf7c22ca3d))
* **overflow:** counter not hidden when max count equals to items count ([f4c3540](https://github.com/vexip-ui/vexip-ui/commit/f4c3540f38a9a593454570f6c9533756c5785e0d))
* **select:** cannot re-select option in multiple mode ([c124596](https://github.com/vexip-ui/vexip-ui/commit/c1245964e39240ffd4611feafc71dd839ed08e31))
* **skeleton:** attrs cannot be set ([69ee0d1](https://github.com/vexip-ui/vexip-ui/commit/69ee0d1382e4def9e0b485391d95c0b061b723ff))
* **table:** height not correct when filter with row height set ([ca84f12](https://github.com/vexip-ui/vexip-ui/commit/ca84f12d489114691897182b16ec4f5658ec6c87))
* **virtual-list:** items element height not refresh ([d3c0944](https://github.com/vexip-ui/vexip-ui/commit/d3c0944c0b7b03fce26db2c78f7ad25a44a78957))



## [2.0.18](https://github.com/vexip-ui/vexip-ui/compare/v2.0.17...v2.0.18) (2022-12-09)


### ✨ Features

* **timeline:** support flip item content ([c605012](https://github.com/vexip-ui/vexip-ui/commit/c6050128a234e2317777223c8ca57a6200afba39))
* **timeline:** support horizontal line ([210a3a5](https://github.com/vexip-ui/vexip-ui/commit/210a3a546d1d4f32524d1835f99cd2222c13a54b)), closes [#195](https://github.com/vexip-ui/vexip-ui/issues/195)


### 🐞 Bug Fixes

* **input:** null value will be transformed to string null ([33f10e6](https://github.com/vexip-ui/vexip-ui/commit/33f10e6118bec2092aa2279ab86234bdd07ddee2))
* **style:** color should not auto inherit ([e896107](https://github.com/vexip-ui/vexip-ui/commit/e8961077f188cb59c6e93cc302af850bf0001b09))



## [2.0.17](https://github.com/vexip-ui/vexip-ui/compare/v2.0.16...v2.0.17) (2022-12-07)


### ✨ Features

* **input:** support number type value ([a145079](https://github.com/vexip-ui/vexip-ui/commit/a145079863786edc94ecc3657273c48dded14729))
* **number:** add control-type prop ([1a588ac](https://github.com/vexip-ui/vexip-ui/commit/1a588ac2ed3bdcf5ad5474c39cad831019c53485))


### 🐞 Bug Fixes

* **input:** ensure focus when click input area ([a0b7ff8](https://github.com/vexip-ui/vexip-ui/commit/a0b7ff86afad948e27eb4892a46f2fa9db342308))
* **playground:** compiler version should follow vue version ([51715cd](https://github.com/vexip-ui/vexip-ui/commit/51715cd64816df81aa8da9fb88b814293dab3c6b))
* **select:** space down should not enter the input ([670a68e](https://github.com/vexip-ui/vexip-ui/commit/670a68e1b4d60d3bdd4d20f3fd5380f84150daa4))
* **table:** should assign row data when set new data ([2518203](https://github.com/vexip-ui/vexip-ui/commit/2518203c45bd9c91b29a562d7857574bdd87270f))


### 👓 Types

* support config functional default props ([05b08ff](https://github.com/vexip-ui/vexip-ui/commit/05b08ffc315259b247c9ebb625d3377a1ee32c17))



## [2.0.16](https://github.com/vexip-ui/vexip-ui/compare/v2.0.15...v2.0.16) (2022-12-01)


### ✨ Features

* export currentBreakPoint ref ([570b6f7](https://github.com/vexip-ui/vexip-ui/commit/570b6f769320c77f670a994334b08303df17b951))
* **playground:** support change version and toggle ssr ([#221](https://github.com/vexip-ui/vexip-ui/issues/221)) ([065dcf3](https://github.com/vexip-ui/vexip-ui/commit/065dcf33fd4a6b2aac862687b5f5e650337025b7))
* **scroll:** support horizontal exact mode ([a712cf9](https://github.com/vexip-ui/vexip-ui/commit/a712cf916c3e195e161d27f43df61b64404e06f7))
* support components to inherit parent base style ([#220](https://github.com/vexip-ui/vexip-ui/issues/220)) ([ca26d3b](https://github.com/vexip-ui/vexip-ui/commit/ca26d3b12499a0313d5c325befc2baadba3280ee))


### 🐞 Bug Fixes

* **column:** cannot show when set span 0 with other brank points ([b73cc5a](https://github.com/vexip-ui/vexip-ui/commit/b73cc5adbaefdf4060eed6fb263b6f36ea03afa6))
* **Grid:** provided state should not penetrate deep ([0a6b1fe](https://github.com/vexip-ui/vexip-ui/commit/0a6b1fe098f6be15c9924f4d91ccd00159ac75fc)), closes [#219](https://github.com/vexip-ui/vexip-ui/issues/219)
* **select:** unsync input value when using filter with default value ([fd5e6a0](https://github.com/vexip-ui/vexip-ui/commit/fd5e6a07a3ed91f465aedbab3b8d10fb15d9965c))
* **upload:** file list not sync when using select-to-add ([50784d8](https://github.com/vexip-ui/vexip-ui/commit/50784d850f6e7e5affebc66fa54ca787e0da47b9))



## [2.0.15](https://github.com/vexip-ui/vexip-ui/compare/v2.0.14...v2.0.15) (2022-11-24)


### ✨ Features

* **confirm:** add fast open method for using title ([8f47f7e](https://github.com/vexip-ui/vexip-ui/commit/8f47f7e522ab2d32bef91955b476865e24ce7aa8))
* **confirm:** support add title and set content or actions align ([cb2b767](https://github.com/vexip-ui/vexip-ui/commit/cb2b7675efb5d2d5c05dc689d05e8c99866816c1))
* **upload:** add list-style prop ([94089e7](https://github.com/vexip-ui/vexip-ui/commit/94089e72a9cd823ca7699cd15916908a770b2824))


### 🐞 Bug Fixes

* **table:** should use wrapper width to compute when width not set ([d628403](https://github.com/vexip-ui/vexip-ui/commit/d6284032aa91bc4a1e89ba0c9075516167aad0db))
* **upload:** error when passing null to file-list ([b6f5df4](https://github.com/vexip-ui/vexip-ui/commit/b6f5df44a707bd2c239ef3c26fd2c2835869fb13))


### 👓 Types

* **config:** add default property for PropsOptions ([f3e4580](https://github.com/vexip-ui/vexip-ui/commit/f3e45802ccbef1793e4c5e563dd019d19d92c534))



## [2.0.14](https://github.com/vexip-ui/vexip-ui/compare/v2.0.13...v2.0.14) (2022-11-21)


### ✨ Features

* **confirm:** support parse content as html ([6053b7b](https://github.com/vexip-ui/vexip-ui/commit/6053b7b2b39ac92419f1c4160167e48a31165c04))
* **date-picker:** add exchange slot for range select ([1166e70](https://github.com/vexip-ui/vexip-ui/commit/1166e70fa70d166a9dfd514391f9cf9e092e1108))
* **date-picker:** support min and max props to bound date ([#216](https://github.com/vexip-ui/vexip-ui/issues/216)) ([9cfd677](https://github.com/vexip-ui/vexip-ui/commit/9cfd6772ce6da6b5e20a11eff7c29b88c29ffb5a))
* **message:** support parse content as html ([7bd4def](https://github.com/vexip-ui/vexip-ui/commit/7bd4def4b144975f92a3e4a1574a3ed024392f65))
* **notice:** support parse title and content as html ([18929a9](https://github.com/vexip-ui/vexip-ui/commit/18929a966e355ad290cf949bc3fa1d1838b07216))
* **time-picker:** add exchange slot for range select ([2431a64](https://github.com/vexip-ui/vexip-ui/commit/2431a64a3d06cef53ecf397639e315333146e89d))
* **time-picker:** support min and max props to bound time ([87dfc32](https://github.com/vexip-ui/vexip-ui/commit/87dfc32c920b980f9f55db5d819bcaae32a6e37f)), closes [#215](https://github.com/vexip-ui/vexip-ui/issues/215)
* **toast:** support parse content as html ([2609809](https://github.com/vexip-ui/vexip-ui/commit/26098090751e97d02c24ac6ead1c298d4c3306ef))


### 🐞 Bug Fixes

* **input:** correct size for before and after content ([54c8bf8](https://github.com/vexip-ui/vexip-ui/commit/54c8bf8e8f00ca6930811b29995aa286503e1a70))



## [2.0.13](https://github.com/vexip-ui/vexip-ui/compare/v2.0.12...v2.0.13) (2022-11-09)


### ✨ Features

* **tab-nav:** add placement prop ([8148eb0](https://github.com/vexip-ui/vexip-ui/commit/8148eb04cfc3ad3276852cdb5ac3ecf53d95949e)), closes [#176](https://github.com/vexip-ui/vexip-ui/issues/176)
* **tab-nav:** support built-in close button ([7ef0787](https://github.com/vexip-ui/vexip-ui/commit/7ef0787a8e72a73fc4f7c6b167b1f226b3ec2a4c)), closes [#201](https://github.com/vexip-ui/vexip-ui/issues/201)
* **tab-nav:** support create built-in add button ([f45d47c](https://github.com/vexip-ui/vexip-ui/commit/f45d47cf79e4d6c617a9db43e0254f9e0e1573ae)), closes [#208](https://github.com/vexip-ui/vexip-ui/issues/208)
* **tabs:** add closable and show-add props ([908abaa](https://github.com/vexip-ui/vexip-ui/commit/908abaa4f6a92e0eb5a14505b5e276d35519a8fe))
* **tabs:** add placement prop ([9d35443](https://github.com/vexip-ui/vexip-ui/commit/9d35443d61d20eeef82f11b1fa5fab9c5ababb7d))


### 🐞 Bug Fixes

* **drawer:** size abruptly change on resize when using percentage size ([4f81bd0](https://github.com/vexip-ui/vexip-ui/commit/4f81bd08ccb2ca62a31d928cabaf0fa0dacb3d86))
* improve input like components state style ([456f6bf](https://github.com/vexip-ui/vexip-ui/commit/456f6bf3bde9c6147b962a6c5c8f06fb76bb6d89))
* **select:** label not render when value is falsy ([5cbc2bf](https://github.com/vexip-ui/vexip-ui/commit/5cbc2bf00d576069b724888441a39a862cff4bb4)), closes [#207](https://github.com/vexip-ui/vexip-ui/issues/207)


### 👓 Types

* **modal:** improve size and position props types ([f5acd3d](https://github.com/vexip-ui/vexip-ui/commit/f5acd3d73bed39fcd58844e79878c646aa783cd9))
* **table:** improve helper functions type inferring ([141ca48](https://github.com/vexip-ui/vexip-ui/commit/141ca488c93889a503b97af853741e6025671b5f))


### 🔨 Code Refactoring

* extract props definitions and create props config types ([#205](https://github.com/vexip-ui/vexip-ui/issues/205)) ([8f2f5e8](https://github.com/vexip-ui/vexip-ui/commit/8f2f5e8f58d846b72d42d960d28f76805cdda572))



## [2.0.12](https://github.com/vexip-ui/vexip-ui/compare/v2.0.11...v2.0.12) (2022-11-02)


### ✨ Features

* **input:** add count slot ([0a27106](https://github.com/vexip-ui/vexip-ui/commit/0a271066a3603416ff179ed0495af86de1e0a193))
* **table:** aad checked class for rows ([0e02ac8](https://github.com/vexip-ui/vexip-ui/commit/0e02ac8ee38b7be61968dee7456675e881435886))
* **textarea:** add count slot ([70387be](https://github.com/vexip-ui/vexip-ui/commit/70387beb61d136ae9466c1ce1780ebe4d081a524))


### 🐞 Bug Fixes

* **input:** value not clear when in sync mode ([81af6c6](https://github.com/vexip-ui/vexip-ui/commit/81af6c6a6e280282fa3386744bfbb96763e28207))
* **menu:** cache and reset group expanded when menu reduced change ([eca0dbb](https://github.com/vexip-ui/vexip-ui/commit/eca0dbb38660fba71968b1ed70ac7551b3d55be2))
* **menu:** item selected not update when label change ([6c97c83](https://github.com/vexip-ui/vexip-ui/commit/6c97c835945aae7306275763796391c9ff35db8c))
* **number-input:** value not clear when in sync mode ([608f2b5](https://github.com/vexip-ui/vexip-ui/commit/608f2b5527bd2b5fde6d88e20737db1eeb8e0eee))
* **overflow:** should refresh when wrapper resize ([5102c40](https://github.com/vexip-ui/vexip-ui/commit/5102c40d3fea565eca0a91277333e3439b5bd0d1))
* **tabs:** panel height should follow content ([e9a25ea](https://github.com/vexip-ui/vexip-ui/commit/e9a25eac42a16e1aec52610c22f20ffd00979592)), closes [#191](https://github.com/vexip-ui/vexip-ui/issues/191)


### 👓 Types

* add InputExposed and UploadExposed ([4ca0cbe](https://github.com/vexip-ui/vexip-ui/commit/4ca0cbefd1fdd1a42531689673c28cfa0c202e71))



## [2.0.11](https://github.com/vexip-ui/vexip-ui/compare/v2.0.10...v2.0.11) (2022-10-28)


### ✨ Features

* **hooks:** add useIntersection hook ([37b6147](https://github.com/vexip-ui/vexip-ui/commit/37b6147a5913215b49cd388b222bc0e14c23f937))
* **layout:** add theme mode config ([394fa8c](https://github.com/vexip-ui/vexip-ui/commit/394fa8c720ef40ee993ac449af2f8ba6a4f0c0ee))
* **pagination:** add no-title prop ([c57fb2c](https://github.com/vexip-ui/vexip-ui/commit/c57fb2c427f1b950d6a2956d36e791944e0e906f))
* **tab-nav:** support specify tab items alignment ([19bf1b5](https://github.com/vexip-ui/vexip-ui/commit/19bf1b54fc1831007d63d74ec3ce6155502c86e4)), closes [#190](https://github.com/vexip-ui/vexip-ui/issues/190)


### 🐞 Bug Fixes

* **number-input:** should emit change event when enter ([83d7054](https://github.com/vexip-ui/vexip-ui/commit/83d7054606d277031de729efd7114b5743ec38df))
* **pagination:** explicitly plugins props values ([be46519](https://github.com/vexip-ui/vexip-ui/commit/be4651995e132a6cd3937bdc5a0ba098e29f4f5a))
* **pagination:** incorrect focus when change page with ellipsis show ([8ee696e](https://github.com/vexip-ui/vexip-ui/commit/8ee696e1abb09cb3e87467ec76f02023ed6d0189))
* **upload:** improve card type list style ([9119dbf](https://github.com/vexip-ui/vexip-ui/commit/9119dbf95f1e42cb1efa27d65f562d8c80bde56d))
* **upload:** incorrct control disabled style in image mode ([489f710](https://github.com/vexip-ui/vexip-ui/commit/489f710c33a76ca669696911c1e841ad586d5dc5))
* **wheel:** improve border style when disabled ([7d305bb](https://github.com/vexip-ui/vexip-ui/commit/7d305bbab63f4e407d99c6f117a1635d5d11ca56))



## [2.0.10](https://github.com/vexip-ui/vexip-ui/compare/v2.0.9...v2.0.10) (2022-10-25)


### ✨ Features

* **menu:** support passing a function as icon options ([257a150](https://github.com/vexip-ui/vexip-ui/commit/257a150b88fa3dd59e608892550bce4a3fdaeb42))
* **textarea:** add sync prop ([be5a73a](https://github.com/vexip-ui/vexip-ui/commit/be5a73aa8e10738db54a693248874fc2ff0f4c8e))


### 🐞 Bug Fixes

* **pagination:** out of bounds when pages more then 4 digits ([638b2fd](https://github.com/vexip-ui/vexip-ui/commit/638b2fd124e3f1a0c67918f85fd2d5a99c9e7577))
* **split:** improve full button angles color ([9c92f74](https://github.com/vexip-ui/vexip-ui/commit/9c92f74f9793d2d0be618b51156a3d63011666a3))
* **tab-nav:** active not update when dynamic with using index as key ([aacc76a](https://github.com/vexip-ui/vexip-ui/commit/aacc76a250388dd096050e4f6d3d37de80305649))
* **table:** missing body bottom border style ([8aaf0a3](https://github.com/vexip-ui/vexip-ui/commit/8aaf0a3056769d0ba1a277338dd9c3eed1a227b5))
* **upload:** should show thumbnial when only non-base64 url ([18c26de](https://github.com/vexip-ui/vexip-ui/commit/18c26def771898cc4ca49cd4f8ae9a4ff71a1e26))


### 👓 Types

* **layout:** fix menu options type ([e909ea3](https://github.com/vexip-ui/vexip-ui/commit/e909ea35ea5541da7a61d8da9fbca554beb991c2))



## [2.0.9](https://github.com/vexip-ui/vexip-ui/compare/v2.0.8...v2.0.9) (2022-10-24)


### ⚡ Performance Improvements

* **menu:** adjust to dynamic render poppers ([3805628](https://github.com/vexip-ui/vexip-ui/commit/380562862296566b7ecab4e5eec316b6ca46ba33))


### ✨ Features

* **breadcrumb:** support passing a function as name in options ([a60c663](https://github.com/vexip-ui/vexip-ui/commit/a60c663d82c6104126ea2b3eaf39b93548a1253f))
* **menu:** support passing a function as name in options ([ef240b7](https://github.com/vexip-ui/vexip-ui/commit/ef240b7b1120d5d4fc0236434567b0742658e0e2))
* **utils:** add ensureArray and callIfFunc methods ([2b4e986](https://github.com/vexip-ui/vexip-ui/commit/2b4e986bcce50a620c9dd2d71a96f025123d70fb))


### 🐞 Bug Fixes

* **alert:** incomplete content when using scroll with prefix icon ([f03da86](https://github.com/vexip-ui/vexip-ui/commit/f03da86dfa649dc96762bb149973c72ea0fc1e1c))
* **upload:** unexpectedly refresh router when delete file with thumbnail type ([15ea453](https://github.com/vexip-ui/vexip-ui/commit/15ea45368b27ce7cb1f341296e01434a519e3620))



## [2.0.8](https://github.com/vexip-ui/vexip-ui/compare/v2.0.7...v2.0.8) (2022-10-23)


### ⚡ Performance Improvements

* **table:** improve to precisely deep watch column props ([f74c4df](https://github.com/vexip-ui/vexip-ui/commit/f74c4dfc98ac85d2a959a030741eff9dd427e1fd))


### ✨ Features

* **pagination:** support customize plugins position ([48cd1fd](https://github.com/vexip-ui/vexip-ui/commit/48cd1fd11ff553fd66719a3fdd597bf914159242))
* **pagination:** support page-size two way binding ([16f1750](https://github.com/vexip-ui/vexip-ui/commit/16f17508afa9d09cf6265c36a4aa0225394ff407))
* **table:** improve type columns will have default key if not define ([1cdcc6f](https://github.com/vexip-ui/vexip-ui/commit/1cdcc6f3cffca840f3a9bdf9573490bbfe09ce28))
* **upload:** add image upload mode ([#180](https://github.com/vexip-ui/vexip-ui/issues/180)) ([d1e3201](https://github.com/vexip-ui/vexip-ui/commit/d1e3201d1b62e9feba9cf41249bed637c7da1f42))


### 🐞 Bug Fixes

* **alert:** content display direction should be column ([1d208c5](https://github.com/vexip-ui/vexip-ui/commit/1d208c5c2044dfdc2b75afc9c9c52e3d3db83f6f))
* **cascader:** counter fails to disappear when passing empty array ([2589335](https://github.com/vexip-ui/vexip-ui/commit/258933545f220ad7d008b0dbcb0c58d9f76b7774)), closes [#181](https://github.com/vexip-ui/vexip-ui/issues/181)
* incorrect form control components init value ([24909c0](https://github.com/vexip-ui/vexip-ui/commit/24909c0c5f34fb30642340078b9c15a4de83e0c0))
* **input:** should hide native toggle plaintext button in Edge ([6bc0554](https://github.com/vexip-ui/vexip-ui/commit/6bc05540f3a5b3dc1cae30657309f975c5faa549)), closes [#178](https://github.com/vexip-ui/vexip-ui/issues/178)
* **overflow:** unexpectedly render slot when items passed empty array ([f3af8e2](https://github.com/vexip-ui/vexip-ui/commit/f3af8e23269800788ad368793641596f288be031))
* **pagination:** sync height of plugin controls to item height ([2de1fc9](https://github.com/vexip-ui/vexip-ui/commit/2de1fc9d707f40111859f9dc77602ed6344b02d9))
* **tab-nav:** not nested divider css vars ([77765dc](https://github.com/vexip-ui/vexip-ui/commit/77765dc5f55d3ed7fba54f99e04ec152101385dd))
* **table:** clearFilter method fails to reset options active ([865a69f](https://github.com/vexip-ui/vexip-ui/commit/865a69f9b91b67188ec2663478443fdc6b8782c7)), closes [#183](https://github.com/vexip-ui/vexip-ui/issues/183)
* **table:** maker double-click events work ([#186](https://github.com/vexip-ui/vexip-ui/issues/186)) ([137db89](https://github.com/vexip-ui/vexip-ui/commit/137db8910239ac6062884ebf4b2657754334bb43))
* **table:** rows in table head should not highlight ([ef091dc](https://github.com/vexip-ui/vexip-ui/commit/ef091dc17fdee17119bb7b1211bb4cf8a9bc11cd))
* **upload:** image thumbnail not effective ([b71b5dc](https://github.com/vexip-ui/vexip-ui/commit/b71b5dc231949542a3a0ad54ff9161675dfde786))


### 👓 Types

* improve to support `ref<HTMLElement>()` ([#188](https://github.com/vexip-ui/vexip-ui/issues/188)) ([5c50d3b](https://github.com/vexip-ui/vexip-ui/commit/5c50d3b8a8bebd1381ff9bf0901238c26d9a9297))
* **layout:** fix LayoutMenuProps type ([cbc9191](https://github.com/vexip-ui/vexip-ui/commit/cbc9191c5c8e525ea5dddfa7b139f50e0915c885))
* **props:** refactor ClassType and StyleType ([d54ea6f](https://github.com/vexip-ui/vexip-ui/commit/d54ea6faec2425bb7cc152153483c35f529af33d))


### 🔨 Code Refactoring

* **row:** switch to use css vars to control gap ([4fd998d](https://github.com/vexip-ui/vexip-ui/commit/4fd998d56271390e82472afd7bfa8d3a9bd0589c)), closes [#187](https://github.com/vexip-ui/vexip-ui/issues/187)



## [2.0.7](https://github.com/vexip-ui/vexip-ui/compare/v2.0.6...v2.0.7) (2022-10-17)


### ✨ Features

* **layout:** add header-avatar slot ([7574693](https://github.com/vexip-ui/vexip-ui/commit/7574693663e8f53c1451165404fff53216d7f957))
* **tab-nav:** add options prop ([d9f868f](https://github.com/vexip-ui/vexip-ui/commit/d9f868fb0f67d67d6bd3e533230a18ecc5d4f558))
* **tab-nav:** add prefix and suffix slots ([f6034cd](https://github.com/vexip-ui/vexip-ui/commit/f6034cd3c263ff29480042b183326d70f5c5fb3a))
* **tabs:** add prefix and suffix slots ([db8a5ab](https://github.com/vexip-ui/vexip-ui/commit/db8a5ab2e8637f663c7921238c32e49c1bd34d04))
* **utils:** add randomColor method ([adc3878](https://github.com/vexip-ui/vexip-ui/commit/adc387828749bd4426f5ffc14123a75e2d874111))
* **utils:** add series log once methods ([c4fc460](https://github.com/vexip-ui/vexip-ui/commit/c4fc4608ebd72fa516700f032cca22d3df67d673))


### 🐞 Bug Fixes

* **config:** ensure responsive variables namespace ([4b334c9](https://github.com/vexip-ui/vexip-ui/commit/4b334c9a0602524f65d9921e6c4f837dcdd5a766))
* **space:** items should default flex display ([2b34b10](https://github.com/vexip-ui/vexip-ui/commit/2b34b107eae5a815f19b278e7149e7b402f87883))
* **tab-nav:** list should default no margin ([4dad8da](https://github.com/vexip-ui/vexip-ui/commit/4dad8da121c0719381884fb32a14539f20ec469c))



## [2.0.6](https://github.com/vexip-ui/vexip-ui/compare/v2.0.4...v2.0.6) (2022-10-13)


### ✨ Features

* **input:** add sync prop ([7dc7289](https://github.com/vexip-ui/vexip-ui/commit/7dc7289b12820a4ba74ce092dd45c11b2cb40d75)), closes [#169](https://github.com/vexip-ui/vexip-ui/issues/169)
* **number-input:** add sync prop ([7b50304](https://github.com/vexip-ui/vexip-ui/commit/7b50304abfb38a8d47a5e84ba456b43ec7757c08))
* **plugins:** add iconPrefix option for resolver ([11ccffd](https://github.com/vexip-ui/vexip-ui/commit/11ccffd91bee0f4491990045b94855bd76db375b))
* **plugins:** support auto resolve icon components ([#167](https://github.com/vexip-ui/vexip-ui/issues/167)) ([fef768c](https://github.com/vexip-ui/vexip-ui/commit/fef768cd14ccf1245ec3db9e45c3651bc8ca1ca6))


### 🐞 Bug Fixes

* **bubble:** keep consistent behavior for newline ([7bb25a2](https://github.com/vexip-ui/vexip-ui/commit/7bb25a24109d14a0468ac94deed1f144b5211966)), closes [#164](https://github.com/vexip-ui/vexip-ui/issues/164)
* **button:** missing button badge color css var ([bdb22c7](https://github.com/vexip-ui/vexip-ui/commit/bdb22c72b99fd97674ff42afada9cd12ce5f0e68))
* **divider:** missing text-color css var ([509f932](https://github.com/vexip-ui/vexip-ui/commit/509f932c34872108ded8ba638eed5626f774a4c1))
* **form:** add submit and reset style deps ([a8ac3ec](https://github.com/vexip-ui/vexip-ui/commit/a8ac3ec6787f006a22ac269d0f30ba2ce2c3e17c))
* **input:** not effective debounce prop ([46c5d31](https://github.com/vexip-ui/vexip-ui/commit/46c5d31f29aa390f441e278874f6bbcebddee093))
* **layout:** add style dependencies ([04edd03](https://github.com/vexip-ui/vexip-ui/commit/04edd03b4dfcb7079d6d51ecc19a53cdca6116d6))
* **plugins:** support typography style alias ([f89cfef](https://github.com/vexip-ui/vexip-ui/commit/f89cfefbe43da61c4fce258e5d55166f89b9b152))


### 👓 Types

* fix type errors ([8b0a24d](https://github.com/vexip-ui/vexip-ui/commit/8b0a24d9a7cba27b76a5cc46e9d276ea5a6e0a59))



## [2.0.4](https://github.com/vexip-ui/vexip-ui/compare/v2.0.3...v2.0.4) (2022-09-23)


### ⚡ Performance Improvements

* lazy render popper for select type components ([f7b96cc](https://github.com/vexip-ui/vexip-ui/commit/f7b96cca8a58b95586d64572c7cae6d1634f4449))


### ✨ Features

* **alert:** support auto scroll for content ([a3594c0](https://github.com/vexip-ui/vexip-ui/commit/a3594c09a1836dc523ee02901ab81e3ae1c79ebb))
* **button:** support create inner badge ([3353761](https://github.com/vexip-ui/vexip-ui/commit/33537615b64bce84fea5285cf33588dffa10f702))


### 🐞 Bug Fixes

* **color-picker:** incorrect inner input style ([b49bb49](https://github.com/vexip-ui/vexip-ui/commit/b49bb494dde6bfa297ad00f2091c0d0ce14d6b6b))
* **form:** should not submit when form is not native ([8b27f2a](https://github.com/vexip-ui/vexip-ui/commit/8b27f2a7277fd0eabac1139e6d68484dc2894847))
* **menu:** content disappears not in time when collapsing ([cfd93c1](https://github.com/vexip-ui/vexip-ui/commit/cfd93c1e1e74bfcad231d9d4e2dd63c7c6f0f412)), closes [#162](https://github.com/vexip-ui/vexip-ui/issues/162)


### 🔨 Code Refactoring

* **button:** simplify css variables ([d260dd9](https://github.com/vexip-ui/vexip-ui/commit/d260dd99e0b700e4147dafd07279e66e3516ac28))



## [2.0.3](https://github.com/vexip-ui/vexip-ui/compare/v2.0.2...v2.0.3) (2022-09-20)


### ✨ Features

* **carousel:** add ignore-hover prop ([0c1c221](https://github.com/vexip-ui/vexip-ui/commit/0c1c221b9c9c8542508af5f2e497cc0f24c53d02))
* **utils:** add compute dom react methods ([20fcb71](https://github.com/vexip-ui/vexip-ui/commit/20fcb7134286b7ad99a8e3f5e39ca695354b944f))



## [2.0.2](https://github.com/vexip-ui/vexip-ui/compare/v2.0.1...v2.0.2) (2022-09-19)


### ✨ Features

* **auto-complete:** add transparent prop ([1111b96](https://github.com/vexip-ui/vexip-ui/commit/1111b96b4766bf38ac7e24e33e6c968d434673f3))
* **cascader:** add transparent prop ([379c862](https://github.com/vexip-ui/vexip-ui/commit/379c862a6b497f9a870faa81dcc8a24289a75c55))
* **input:** add transparent prop ([cdc6e08](https://github.com/vexip-ui/vexip-ui/commit/cdc6e087e1246f1bde12a74abcbca277dea9b7fb))
* **layout:** add expandMenuByLabel api method ([bd864b0](https://github.com/vexip-ui/vexip-ui/commit/bd864b0d777b06344058b082aee14cc85a686e71)), closes [#156](https://github.com/vexip-ui/vexip-ui/issues/156)
* **select:** add transparent prop ([972ca83](https://github.com/vexip-ui/vexip-ui/commit/972ca834670afbc059458e330487ecdc8b8a9c95))


### 🐞 Bug Fixes

* **carousel:** confusion when switch left or top in loop ([0483eeb](https://github.com/vexip-ui/vexip-ui/commit/0483eebe23cf9ff4e518498b855581b9fd666590))
* **table:** incorrect bg color when transparent in dark theme ([c197979](https://github.com/vexip-ui/vexip-ui/commit/c197979fea6cef7e56f6ed06d0643e19928c68e2))



## [2.0.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0...v2.0.1) (2022-09-18)


### ✨ Features

* support ssr for components ([#153](https://github.com/vexip-ui/vexip-ui/issues/153)) ([c0c4fd8](https://github.com/vexip-ui/vexip-ui/commit/c0c4fd82a8c2aeda7462ccb936d9564038598a71))
* **table:** support series of class, style, attrs and events ([d7291d8](https://github.com/vexip-ui/vexip-ui/commit/d7291d86490d2dc7ace6f8e06aee58a59f43df0e)), closes [#154](https://github.com/vexip-ui/vexip-ui/issues/154)


### 🐞 Bug Fixes

* **slider:** missing width when in flex layout ([7506916](https://github.com/vexip-ui/vexip-ui/commit/75069164ea8bfdac51acc33f0cda1d116b07e344))



# [2.0.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-rc.1...v2.0.0) (2022-09-16)


### ✨ Features

* add Typography components ([#146](https://github.com/vexip-ui/vexip-ui/issues/146)) ([8cca389](https://github.com/vexip-ui/vexip-ui/commit/8cca38939c7517af0b9e4b56007073d4a95d90df))
* **anchor:** add force-active prop ([ecdc9e3](https://github.com/vexip-ui/vexip-ui/commit/ecdc9e3568d51159c884245aaa80f789f786f5aa))
* **form:** add help prop for item ([69e4996](https://github.com/vexip-ui/vexip-ui/commit/69e499661c2f5611bf0a14200903108645c44015))
* **form:** add inline prop ([f2db62a](https://github.com/vexip-ui/vexip-ui/commit/f2db62a17bb32795f572d18c1096b041550d44ad))
* **form:** support pure form item render ([65d6b30](https://github.com/vexip-ui/vexip-ui/commit/65d6b30dfed4277859234f288eb23e6ce3f1ac76))
* **form:** support set size for all controls under form ([a332eca](https://github.com/vexip-ui/vexip-ui/commit/a332ecaad8993b1aac9c658b685570ebae198409))
* **menu:** add expandItemByLabel api method ([38003cd](https://github.com/vexip-ui/vexip-ui/commit/38003cdd8b0493b428d14adb8bdc1e9b02aaf619)), closes [#141](https://github.com/vexip-ui/vexip-ui/issues/141)
* **slider:** add reverse prop ([a1ee27e](https://github.com/vexip-ui/vexip-ui/commit/a1ee27efcdc13df1807a0dee2fbef3035d23601a)), closes [#142](https://github.com/vexip-ui/vexip-ui/issues/142)
* **slider:** support add markers and only-marker select ([ea1be6b](https://github.com/vexip-ui/vexip-ui/commit/ea1be6ba83e507faff9b7cd367c262bb41fc3030))
* **slider:** support range select mode ([b5534f9](https://github.com/vexip-ui/vexip-ui/commit/b5534f97945334262862fc37870fc3c8c67c6990)), closes [#77](https://github.com/vexip-ui/vexip-ui/issues/77)
* **tree:** add label-click event ([61f2f7a](https://github.com/vexip-ui/vexip-ui/commit/61f2f7a022caa08eced7ff4fa88f5120963c499b)), closes [#149](https://github.com/vexip-ui/vexip-ui/issues/149)


### 🐞 Bug Fixes

* **button:** missing icon when has any content ([26e199b](https://github.com/vexip-ui/vexip-ui/commit/26e199bf4ec79347bea9d594ade4c75b937cfccb))
* **checkbox-group:** incorrect update value from props.value ([9513ad7](https://github.com/vexip-ui/vexip-ui/commit/9513ad7cc054769e85d4082cc77c5d67bb443bfe)), closes [#147](https://github.com/vexip-ui/vexip-ui/issues/147)
* **config:** incorrect event prop regexp ([849ac5b](https://github.com/vexip-ui/vexip-ui/commit/849ac5bc033751e706a329f8c745862c995ecaa0)), closes [#139](https://github.com/vexip-ui/vexip-ui/issues/139)
* **form:** correctly delete form item ([4ce34e8](https://github.com/vexip-ui/vexip-ui/commit/4ce34e8110cbbae297f534fc230e838a43c05770))
* **form:** rename label-position to label-align ([ad593bb](https://github.com/vexip-ui/vexip-ui/commit/ad593bb29c9ba56c67b78c0f43b87ddc3dc8cecb))
* **slider:** incorrect judge to emit input event ([f13656e](https://github.com/vexip-ui/vexip-ui/commit/f13656e97ddf96b19675d698b60bdb23bc0a5591))
* **table:** unstable row rendering ([4546389](https://github.com/vexip-ui/vexip-ui/commit/45463890af9b120eb587563dda813a2084f604a5))


### 👓 Types

* **menu:** add MenuExposed interface ([c8e05b6](https://github.com/vexip-ui/vexip-ui/commit/c8e05b6dee7e1b9caad63e440017d3f192ab9381))
* normalize timer types ([c885e1c](https://github.com/vexip-ui/vexip-ui/commit/c885e1c0f0a179e2db3cbc1c48112c069ac489e9))


### 🔨 Code Refactoring

* common/mixins rename to common/hooks ([#150](https://github.com/vexip-ui/vexip-ui/issues/150)) ([eb5605e](https://github.com/vexip-ui/vexip-ui/commit/eb5605ec1862984bdffdec284e7b0c939a3233d4))
* **upload:** all callbacks and events first param change to FileState ([069edae](https://github.com/vexip-ui/vexip-ui/commit/069edae351b6992b4949a8f0d636d376f0221ad0))


### ❌ Breaking Changes

* **upload:** Upload component all callbacks and events first param
change from SourceFile to FileState, this will make the states of files
inside the component controllable. This change also fix cannot init
file list via urls.
* **form:** To better fit the description of this feature, change
the `label-position` name to `label-align`



# [2.0.0-rc.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2022-09-06)


### ✨ Features

* **anchor:** support bind url hash ([797bd87](https://github.com/vexip-ui/vexip-ui/commit/797bd871c2c0d9d4a25948f37abfc2aaeb8cf7ab))
* **toast:** add toast plugin (manager) ([#128](https://github.com/vexip-ui/vexip-ui/issues/128)) ([a3be410](https://github.com/vexip-ui/vexip-ui/commit/a3be4101f870fe0eab242ad2bccf22f584d1dc78))
* **viewer:** add on-transition prop ([689ecd0](https://github.com/vexip-ui/vexip-ui/commit/689ecd0ceff2be465b9b3812fcd6b619c1330f9c))
* **Viewer:** using mouse position as transform origin for zooming ([#73](https://github.com/vexip-ui/vexip-ui/issues/73)) ([2ed544e](https://github.com/vexip-ui/vexip-ui/commit/2ed544e4a90b09be3fb047a6ff52687d9dccfdbe))


### 🐞 Bug Fixes

* **breadcrumb:** unexpected page reloads when item clicked ([19f387e](https://github.com/vexip-ui/vexip-ui/commit/19f387ebcd720ce09d9c7c4bf7d271820d872414)), closes [#131](https://github.com/vexip-ui/vexip-ui/issues/131)
* **ellipsis:** html attributes not effective ([a2b7857](https://github.com/vexip-ui/vexip-ui/commit/a2b7857243794ed837fc2cab87561958e51919b0)), closes [#129](https://github.com/vexip-ui/vexip-ui/issues/129)
* **upload:** should not prevent default when keydown ([b4b92f4](https://github.com/vexip-ui/vexip-ui/commit/b4b92f43b0265ec749ca60337a883fbdd3c41fa8)), closes [#130](https://github.com/vexip-ui/vexip-ui/issues/130)



# [2.0.0-rc.0](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.21...v2.0.0-rc.0) (2022-08-31)


### ✨ Features

* **anchor:** support create links via using options prop ([1f712f6](https://github.com/vexip-ui/vexip-ui/commit/1f712f68231d26ab07a6ca5e900474e79c5e7604)), closes [#94](https://github.com/vexip-ui/vexip-ui/issues/94)
* **checkbox:** support quickly add control via prop ([4d13ec2](https://github.com/vexip-ui/vexip-ui/commit/4d13ec23db7095415b8d24d17c0c56be564d1298)), closes [#104](https://github.com/vexip-ui/vexip-ui/issues/104)
* **drawer:** support add footer with default action buttons ([ddbc8a3](https://github.com/vexip-ui/vexip-ui/commit/ddbc8a34526c1f9549e1a067795a488de43c3eaa)), closes [#117](https://github.com/vexip-ui/vexip-ui/issues/117)
* **select:** add update:label event to quickly get label ([77f8372](https://github.com/vexip-ui/vexip-ui/commit/77f837279ad9d650db8c8516989726effd2b109c)), closes [#127](https://github.com/vexip-ui/vexip-ui/issues/127)


### 🐞 Bug Fixes

* **button:** incorrect render when loading with icon-only prop ([c051bc5](https://github.com/vexip-ui/vexip-ui/commit/c051bc56b0b2bddbb6a70690d7787c70b560ad9e))
* **cascader:** options hitting init not in time ([36df57c](https://github.com/vexip-ui/vexip-ui/commit/36df57cd4f2ebf20850c19baf029d4c652e4b63f))
* **color-picker:** hide panel when disabled change to true ([c152d67](https://github.com/vexip-ui/vexip-ui/commit/c152d67b2dcdcd8cc52afc59e71f83fcb6dd0c88))
* **date-picker:** effect shortcut when using range select ([9fbfc71](https://github.com/vexip-ui/vexip-ui/commit/9fbfc7153cc51386fd22549a1d3b4e05bff82ffa)), closes [#105](https://github.com/vexip-ui/vexip-ui/issues/105)
* **icon:** spin and pulse not effective ([11c6d69](https://github.com/vexip-ui/vexip-ui/commit/11c6d6961d22c341b456edba61aab19e15f1b5a6)), closes [#112](https://github.com/vexip-ui/vexip-ui/issues/112)
* **option:** correct selected style priority ([48fd2f3](https://github.com/vexip-ui/vexip-ui/commit/48fd2f3f4e0c9194ffdc8a62fd4da22c78ae2f00))
* **table:** incorrect y scroll after adding any row ([a597fea](https://github.com/vexip-ui/vexip-ui/commit/a597fea5fbb02f2b370e66885c737c3e235c1479)), closes [#121](https://github.com/vexip-ui/vexip-ui/issues/121)
* **transfer:** correct params for select event ([c2d0d6f](https://github.com/vexip-ui/vexip-ui/commit/c2d0d6f86340da0a0b13f2437eb261c4d772cfdf))
* **tree:** not trigger async load when click label with floor-select ([d4e63cc](https://github.com/vexip-ui/vexip-ui/commit/d4e63cccb4a82e7ec82aab37bfc6c8ba0cca7194))
* **tree:** parent node will disappear when drop to its child node ([e0440fd](https://github.com/vexip-ui/vexip-ui/commit/e0440fd96b0e555e6d25c14dbb3734c449f94053)), closes [#125](https://github.com/vexip-ui/vexip-ui/issues/125)
* **tree:** render empty tip when filter result is empty ([3d9cfb6](https://github.com/vexip-ui/vexip-ui/commit/3d9cfb6c16eb8d0beaecede5467f07d8c400c0b8)), closes [#123](https://github.com/vexip-ui/vexip-ui/issues/123)


### 🔨 Code Refactoring

* export types of components in top ([092ffff](https://github.com/vexip-ui/vexip-ui/commit/092ffff033b3812bef9555052f50685ec6c63c82)), closes [#84](https://github.com/vexip-ui/vexip-ui/issues/84)


### ❌ Breaking Changes

* **tree:** To unify the signatures of tree's function parameters,
`on-async-load` parameters is changed from `(node)` to `(data, node)`.
* Currently can import types from `vexip-ui`, no longger
imports will be from `vexip-ui/es/xxx`.



# [2.0.0-beta.21](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2022-08-15)


### ✨ Features

* **date-picker:** add focus and blur api methods ([2aeca22](https://github.com/vexip-ui/vexip-ui/commit/2aeca227976e5b7a116b23ef31a68299a4b876b7))
* **ellipsis:** support multiple rows to ellipsis  ([#108](https://github.com/vexip-ui/vexip-ui/issues/108)) ([5d78541](https://github.com/vexip-ui/vexip-ui/commit/5d78541c99aeaee6982a4b02da44efe75c8f0c22))
* **time-picker:** add focus and blur api methods ([2080779](https://github.com/vexip-ui/vexip-ui/commit/20807791178caf39bbf14ecd0d4fe57eef1c8bb9))


### 🐞 Bug Fixes

* **checkbox:** effective using control to check all ([70a5bb2](https://github.com/vexip-ui/vexip-ui/commit/70a5bb2778f3c9d441b5f072ab1762b4ed197381)), closes [#103](https://github.com/vexip-ui/vexip-ui/issues/103)
* **date-picker:** effect key number input value ([75e1510](https://github.com/vexip-ui/vexip-ui/commit/75e1510f4bdec72fe71c021e47ffba927877666a))
* **date-picker:** emit change column event when open panel ([1045cb4](https://github.com/vexip-ui/vexip-ui/commit/1045cb4674ef965dd8a8de78635dc0818c2e73fa))
* **modal:** resize start event payload ([d04ebe6](https://github.com/vexip-ui/vexip-ui/commit/d04ebe69f17cf981be44e6a6c638e40086d174fd))
* **select:** using string schema to match option value when filter ([470600e](https://github.com/vexip-ui/vexip-ui/commit/470600ebf0cb41d76a667f4969912abfa26bf576))
* **time-picker:** minute column step is invaild ([02051e6](https://github.com/vexip-ui/vexip-ui/commit/02051e6df939cf5c5d280cda7a123e38a0814bca))



# [2.0.0-beta.20](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2022-08-04)


### ✨ Features

* **button:** add no-pulse and icon-only props ([342655c](https://github.com/vexip-ui/vexip-ui/commit/342655cff8728c7c39010475eb0e7fdd8f5115af))
* **form:** add built in row layout ([561ff23](https://github.com/vexip-ui/vexip-ui/commit/561ff231edc04bf00ebed3653442f4b679d98e90))
* **form:** support responsive label width ([e1ae713](https://github.com/vexip-ui/vexip-ui/commit/e1ae7132c06c9ab49720650ab81f598f72057356))
* **layout:** auto toggle links layout when footer resize ([f5786ff](https://github.com/vexip-ui/vexip-ui/commit/f5786ffe2ff1938d64c65022c63aa4222e412268))
* **layout:** auto toggle sign name show when header resize ([bceb75d](https://github.com/vexip-ui/vexip-ui/commit/bceb75d65a02ea3d7406a4b66ac5fa437eaab33f))
* **scroll:** add ensureInView api method ([090367d](https://github.com/vexip-ui/vexip-ui/commit/090367d71c0d0ccdb54afd88a60feb1ffe7826d7))
* **select:** support dynamic create options ([3673b83](https://github.com/vexip-ui/vexip-ui/commit/3673b83e344fb018ba495bd974d75497c4ef5c2d)), closes [#99](https://github.com/vexip-ui/vexip-ui/issues/99)
* **select:** support filter options ([31d1cd8](https://github.com/vexip-ui/vexip-ui/commit/31d1cd89ddaec9197315c75456b51744cf2e7350))
* **select:** support use backspace to delete tag ([f05e8f4](https://github.com/vexip-ui/vexip-ui/commit/f05e8f41bf03183e891d6b1fb6acdeb97ac7e098))


### 🐞 Bug Fixes

* **auto-complete:** correctly init input control value ([99669a2](https://github.com/vexip-ui/vexip-ui/commit/99669a2b7b4ef6fdcfa90f51cd8cad4e745b96ee))
* **breadcrumb:** using `<a>` as label tag ([63832d2](https://github.com/vexip-ui/vexip-ui/commit/63832d2e8bd10af4257dc41e00e221953b3ff515))
* **cascader:** correct focus when mixed using mouse and keyboard ([7e9535c](https://github.com/vexip-ui/vexip-ui/commit/7e9535ce37ec282721ec386061bc3f862d576046))
* **layout:** auto adjust menu width when no aside ([a218943](https://github.com/vexip-ui/vexip-ui/commit/a21894303869124dd515e519251791ce4835be8d))
* **masker:** using visibility hidden instead v-show ([a0d41bd](https://github.com/vexip-ui/vexip-ui/commit/a0d41bd14d763997d722c9326ba6ee73bbd22f3d))
* **textarea:** missing Icon register ([b04627a](https://github.com/vexip-ui/vexip-ui/commit/b04627ac03f9c0c128b8d08c8f5f328432ea2072))



# [2.0.0-beta.19](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2022-08-01)


### ✨ Features

* **auto-complete:** support control loading state ([0dc2098](https://github.com/vexip-ui/vexip-ui/commit/0dc20984488778d3294e6a270d908bde96941232))
* **checkbox:** support control loading state ([0a2b4be](https://github.com/vexip-ui/vexip-ui/commit/0a2b4be78676cd17c66a9ac1e6f84cf13f67e7ce))
* **form:** support set loading for all controls under form ([a43ca86](https://github.com/vexip-ui/vexip-ui/commit/a43ca86d1a3338df7f33b33f9bc3f8000c1e9f3e))
* **layout:** add color and colors props ([f639db3](https://github.com/vexip-ui/vexip-ui/commit/f639db3390d94e9a2fb32afa40122593bebf692c))
* **layout:** export header, aside and footer components ([7a1bdae](https://github.com/vexip-ui/vexip-ui/commit/7a1bdae080c902c257131fc363c661b6835e64aa))
* **radio:** support control loading state ([eefc325](https://github.com/vexip-ui/vexip-ui/commit/eefc325580b2c098405e771f6e60189a46ba4f09))
* **slider:** support control loading state ([4c121cc](https://github.com/vexip-ui/vexip-ui/commit/4c121cc6ac14c97bc0d2bc653abd85071a5b2f23))
* **switch:** support custom loading icon ([c1aa3da](https://github.com/vexip-ui/vexip-ui/commit/c1aa3da06ac5fe4f9ff77b81d740cdc0bb1a72ae))
* **transfer:** support control loading state ([69c93f9](https://github.com/vexip-ui/vexip-ui/commit/69c93f9f435b04bfc032c7af96b1f5df338c1471))
* **upload:** support control loading state ([1a289f1](https://github.com/vexip-ui/vexip-ui/commit/1a289f199c92066d49ffc2aa5231b8943148c022))
* **wheel:** support control loading state ([3e3c517](https://github.com/vexip-ui/vexip-ui/commit/3e3c517a9cecdffd06f063772b8b2ff33c3ea889))


### 🐞 Bug Fixes

* fixed css vars prefix to '--vxp' ([e4c1da3](https://github.com/vexip-ui/vexip-ui/commit/e4c1da34964bfde8faf3f4bb3f96df51d1625a6d))
* improve input-like control styles ([fb6ec62](https://github.com/vexip-ui/vexip-ui/commit/fb6ec626c4a17a390b6907f8e6e14ef57010a65e))
* **layout:** router menu not effective in aside ([de2aec9](https://github.com/vexip-ui/vexip-ui/commit/de2aec9d6c67bd8dfb250ed6679a885409745987)), closes [#100](https://github.com/vexip-ui/vexip-ui/issues/100)
* **menu:** improve menu focus and styles ([d905e9b](https://github.com/vexip-ui/vexip-ui/commit/d905e9b87795ae6badfcf33c263c27d486fcf7b5))


### 🔨 Code Refactoring

* **menu:** improve class names to flat styles ([5f9eb15](https://github.com/vexip-ui/vexip-ui/commit/5f9eb157276c43d02b77a72c9a460ed70a0ebb5e)), closes [#91](https://github.com/vexip-ui/vexip-ui/issues/91)


### ❌ Breaking Changes

* **menu:** `theme` prop has deprecated, using css vars to adjust
menu styles. `tooltipTheme` rename to `tooltipReverse`.



# [2.0.0-beta.18](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2022-07-29)


### ✨ Features

* **cascader:** support control loading state ([18cca8e](https://github.com/vexip-ui/vexip-ui/commit/18cca8e268b9a64da87e49cf0013dba556216144))
* **color-picker:** support control loading state ([55ffc55](https://github.com/vexip-ui/vexip-ui/commit/55ffc553b4190995749a514744bf585f194d6373))
* **date-picker:** support control loading state ([0389a80](https://github.com/vexip-ui/vexip-ui/commit/0389a80980ee618e6d329d206410f237f8e6de15))
* **input:** add custom slots to place button in before or after ([6c0a1f7](https://github.com/vexip-ui/vexip-ui/commit/6c0a1f7e651c8b85ebbbb0d0e556a347486408f8))
* **input:** support control loading state ([3ec0e59](https://github.com/vexip-ui/vexip-ui/commit/3ec0e59e34f9000f62fbd296c36966c36b07ea9b))
* **number-input:** suport control loading state ([a3ba14d](https://github.com/vexip-ui/vexip-ui/commit/a3ba14d3430fb795e951563c209b2fe956baf142))
* **select:** support control loading state ([77083f4](https://github.com/vexip-ui/vexip-ui/commit/77083f4e32327c1caae780a94ea3bd269f94541f))
* **textarea:** support control loading state ([a889b18](https://github.com/vexip-ui/vexip-ui/commit/a889b1873343c5cdaa71759da1fd8b353fea8262))


### 🐞 Bug Fixes

* **cascader:** correct panels class name ([fef30d8](https://github.com/vexip-ui/vexip-ui/commit/fef30d839e03327f656ee437f3b540721e4585bb))
* **icon:** add `<g>` wrapper to isolate transform styles ([4f88644](https://github.com/vexip-ui/vexip-ui/commit/4f8864444c75f5de8d0a276d651bcc0c4242ca4d))
* **icon:** improve inner `<g>` styles ([1d961f4](https://github.com/vexip-ui/vexip-ui/commit/1d961f44eb4df5451947fd3d0a5ef2f0241b2a6a))
* **input:** before/after-button rename to before/after-action ([a4f202b](https://github.com/vexip-ui/vexip-ui/commit/a4f202bf48aa4b8bcba1102e14fa5fc899062346))


### 🔨 Code Refactoring

* improve input-like component prefix and suffix styles ([8ea8ede](https://github.com/vexip-ui/vexip-ui/commit/8ea8eded8ae4c476946b12bfdd1741e9c2c5ac50))



# [2.0.0-beta.17](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2022-07-26)


### ✨ Features

* **auto-complete:** support group options ([ee94d77](https://github.com/vexip-ui/vexip-ui/commit/ee94d77b9d0d2b5c0c7f31230258c46735d0dcf2))
* **mixins:** useVirtual add methods to ensure item in view ([e77fc2c](https://github.com/vexip-ui/vexip-ui/commit/e77fc2cab89811c9aafee60152879cc95715453d))
* **select:** support group options via using prop ([9a37e0d](https://github.com/vexip-ui/vexip-ui/commit/9a37e0d126aa07889136531ed1cbcf7c1dd2aaad))


### 🐞 Bug Fixes

* all transition names using injected namespace ([432f0f7](https://github.com/vexip-ui/vexip-ui/commit/432f0f7bf2e2f41fab7712cbd8e4ea5cf92f1158))
* **layout:** correct main size when aside reduced ([1b9d350](https://github.com/vexip-ui/vexip-ui/commit/1b9d350ab61a257e5a8cf3d683218657216a0628))
* **mixins:** useVirtual sync scroll top after item resize ([fe7122e](https://github.com/vexip-ui/vexip-ui/commit/fe7122e2a4449608a267959ecc4a874db4480d30))
* **select:** auto scroll to active option ([1e72722](https://github.com/vexip-ui/vexip-ui/commit/1e727223698006a35c7a88af207f2e3027fef0e4))
* **transfer:** improve panel resize ([c695607](https://github.com/vexip-ui/vexip-ui/commit/c69560728dffceb0e291bd992b95f16cd39a540d))
* **virtual-list:** not emit resize event ([17caeec](https://github.com/vexip-ui/vexip-ui/commit/17caeec1f71d1bb70aab5b6a56bf1e196df9c690))



# [2.0.0-beta.16](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2022-07-25)


### ✨ Features

* **checkbox:** add tab-index prop ([7b574f2](https://github.com/vexip-ui/vexip-ui/commit/7b574f243be9d957c61acee6011b50b3ac66dded))
* **form:** support disable all controls under form ([998c219](https://github.com/vexip-ui/vexip-ui/commit/998c2199504bd3637e1053f04f6ba4aa7818eba6))
* **menu:** support accessible keyboard ([ede2772](https://github.com/vexip-ui/vexip-ui/commit/ede2772a41b523f335670217d364a93505b21071))
* **native-scroll:** add wrapper-tag prop ([700e07d](https://github.com/vexip-ui/vexip-ui/commit/700e07d7b8df63f440ef480478298643c9aa4893))
* **scroll:** add wrapper-tag prop ([ad364e6](https://github.com/vexip-ui/vexip-ui/commit/ad364e685203a6e37f00b679fdc49f39c2bfcc32))
* support accessibility for components ([#97](https://github.com/vexip-ui/vexip-ui/issues/97)) ([51d5556](https://github.com/vexip-ui/vexip-ui/commit/51d555612d72ae495569cfbf56472d6764ac3dce))
* **transfer:** add Transfer component ([#96](https://github.com/vexip-ui/vexip-ui/issues/96)) ([454e05b](https://github.com/vexip-ui/vexip-ui/commit/454e05b937106767522f83c7d2fee16095eda3ca))
* **utils:** add dom utils ([b461c9a](https://github.com/vexip-ui/vexip-ui/commit/b461c9a133365f3c4fa786bc669ddabd18c05724))


### 🐞 Bug Fixes

* **auto-complete:** correct input value when enter without hitting ([2e9fb90](https://github.com/vexip-ui/vexip-ui/commit/2e9fb9046de5e96029a784568df9a62e787885f6))
* **collapse:** infinite loop when toggle in accordion mode ([973c522](https://github.com/vexip-ui/vexip-ui/commit/973c522be26f1b40621219c53f40bedff790d2eb)), closes [#50](https://github.com/vexip-ui/vexip-ui/issues/50)
* **contextmenu:** adjust promise returns to array ([165681b](https://github.com/vexip-ui/vexip-ui/commit/165681b37cf5bf19ae840c935e9eb1667bdfe55f))
* **mixins:** useModifier support auto reset when blur ([0f6a993](https://github.com/vexip-ui/vexip-ui/commit/0f6a993096fd81b5d6254137247463fc889f44fd))
* **mixins:** useModifier unable to read activeKeys ([5c36e65](https://github.com/vexip-ui/vexip-ui/commit/5c36e658b97914f8d09c3aec39b8768329049ff1))
* **mixins:** useVirtual implement scroll api methods ([012258a](https://github.com/vexip-ui/vexip-ui/commit/012258a61bf3965d43e36a635b597e819a6e96b0))
* **transfer:** correct panel tab index ([a27aa27](https://github.com/vexip-ui/vexip-ui/commit/a27aa27dca215b3b24fe627eef1d756133b9b9ae))
* **transfer:** follow hitting option when using keyboard ([75d7284](https://github.com/vexip-ui/vexip-ui/commit/75d72843da49d62a0aaef38179678bc8a1dae6bf))
* **virtual-list:** auto refresh when item count change ([2860b32](https://github.com/vexip-ui/vexip-ui/commit/2860b329ac451d7ce8a2699540aa3715e27e3872))
* **virtual-list:** expose scroll api methods ([5010651](https://github.com/vexip-ui/vexip-ui/commit/50106515154b9eae8ccb02896b1275da4b7765ef))
* **virtual-list:** normalize items tag styles ([5f8638d](https://github.com/vexip-ui/vexip-ui/commit/5f8638d77742eb49ce9fde42963795d5c49f1909))


### 🔨 Code Refactoring

* `pane` rename to `panel` ([9a150f2](https://github.com/vexip-ui/vexip-ui/commit/9a150f28f4c614c85000198974043819440f97b3))
* events emitted way change to use props ([#95](https://github.com/vexip-ui/vexip-ui/issues/95)) ([a79871e](https://github.com/vexip-ui/vexip-ui/commit/a79871e966047883b78f9b4faeb0928a4c4c4135))


### ❌ Breaking Changes

* CollapsePane and TabPane deprecated, using
CollapsePanel and TabPanel instead.



# [2.0.0-beta.15](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2022-07-18)


### ✨ Features

* **Layout:** create Layout component ([#88](https://github.com/vexip-ui/vexip-ui/issues/88)) ([22c2b6d](https://github.com/vexip-ui/vexip-ui/commit/22c2b6d53f0ae27e64b320e49e6b088edd92b057)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **menu:** support auto ellipsis when horizontal mode ([ad429c8](https://github.com/vexip-ui/vexip-ui/commit/ad429c8896158447a1e80cbb51ae4ae1f0346b60))
* **menu:** support parse options from router ([28d13f1](https://github.com/vexip-ui/vexip-ui/commit/28d13f1b9dddffd238128145a6fe2ea74967a9c2)), closes [#85](https://github.com/vexip-ui/vexip-ui/issues/85)
* **mixins:** usePopper support virtual reference ([da51364](https://github.com/vexip-ui/vexip-ui/commit/da513643010732d0f36cafb5b01efc9bbe04628e))
* **overflow:** add Overflow component ([665f250](https://github.com/vexip-ui/vexip-ui/commit/665f2501c2d4204973c155f7b6bbb95280f72162))


### 🐞 Bug Fixes

* **dropdown:** sync drop stata when using hover trigger ([0d8ed5e](https://github.com/vexip-ui/vexip-ui/commit/0d8ed5ebf61516f2f79800c2a2e0e61107076133))
* **menu:** marker show when disabled in horizontal mode ([e1b1153](https://github.com/vexip-ui/vexip-ui/commit/e1b115350e155f91e27a04ea57ad1acd10fddde0))
* **menu:** title padding error when horizontal ([b834295](https://github.com/vexip-ui/vexip-ui/commit/b834295b6ee0e069be5919f3505c4a52f9bb0e3e))
* **overflow:** consider the padding of wrapper ([ee9327d](https://github.com/vexip-ui/vexip-ui/commit/ee9327ddbf829391465dca8192543fd9b4a2757d))
* **overflow:** support directly render children ([c17c20b](https://github.com/vexip-ui/vexip-ui/commit/c17c20b5e94467bd1e6675e974f9bf8df9b4aba5))
* **renderer:** misisng component name ([b2607aa](https://github.com/vexip-ui/vexip-ui/commit/b2607aaff93f8e87f13602472d85cae2f8228a43))
* **tooltip:** support fragment when using wrapper ([68be420](https://github.com/vexip-ui/vexip-ui/commit/68be420456f5f0a7b4ef0862b4fac5fea6ab05ab))
* useClickoutside directly passing a callback ([ebf4842](https://github.com/vexip-ui/vexip-ui/commit/ebf4842eafab6175a929e0e2cb26cca88a6b2347))


### 👓 Types

* **mixins:** fix useClickOutside target param type ([76e64cd](https://github.com/vexip-ui/vexip-ui/commit/76e64cd230df49238d139615957c94e994df70e0))


### 🔨 Code Refactoring

* auto bind when control component under FormItem ([#93](https://github.com/vexip-ui/vexip-ui/issues/93)) ([e04fc2f](https://github.com/vexip-ui/vexip-ui/commit/e04fc2f2ea4652f48062a75158546743994908cc))
* **tooltip:** improve component structure, add multiple features ([e44f327](https://github.com/vexip-ui/vexip-ui/commit/e44f32765647db52d05d3acbd07454b92164f34e))


### ❌ Breaking Changes

* **tooltip:** `theme` prop deprecated, use `reverse` prop instead
`theme="dark"` case. `tip` slot deprecated, currently the trigger part
use `trigger` slot and the tip part use default slot. Now Tooltip will
not render wrapper element by default.



# [2.0.0-beta.14](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2022-07-10)


### ✨ Features

* **config:** add global z-index config ([#62](https://github.com/vexip-ui/vexip-ui/issues/62)) ([82b90f2](https://github.com/vexip-ui/vexip-ui/commit/82b90f26a893df43b1bb607dc94b753a36b74b36))
* **loading:** add close method ([286a4a0](https://github.com/vexip-ui/vexip-ui/commit/286a4a0fc9e0cd2b26b49719b2c4b1412d6329d8))
* **menu:** support create items via options prop ([927c185](https://github.com/vexip-ui/vexip-ui/commit/927c1854aa00a7a824d3ac57a94e7e4d5449024f)), closes [#83](https://github.com/vexip-ui/vexip-ui/issues/83)
* **mixins:** add useModifier mixin ([#75](https://github.com/vexip-ui/vexip-ui/issues/75)) ([d90e021](https://github.com/vexip-ui/vexip-ui/commit/d90e02157525c3d0b8bf6e5b15873b076a4f9dee))
* **number-input:** support keyboard actions to change number ([fd9bed5](https://github.com/vexip-ui/vexip-ui/commit/fd9bed5fdf2886f2011df75fc27fbe715e9f52f8))
* **time-age:** internal prop support boolean and default to false ([1918efd](https://github.com/vexip-ui/vexip-ui/commit/1918efd896e777166b218343b23e13a03b8b5f04))
* **utils:** add exact number operate methods ([504ffb6](https://github.com/vexip-ui/vexip-ui/commit/504ffb6b9a4f6971d6777be8d0ebf3119e5e8687))
* **Viewer:** add zoom range props ([#67](https://github.com/vexip-ui/vexip-ui/issues/67)) ([65c4240](https://github.com/vexip-ui/vexip-ui/commit/65c42406986f07c323f7a23776d2e793fc80f0f6))
* **Viewer:** support flip actions ([#69](https://github.com/vexip-ui/vexip-ui/issues/69)) ([b8275e5](https://github.com/vexip-ui/vexip-ui/commit/b8275e5f26934a23c42035a207d8c5da56058816))


### 🐞 Bug Fixes

* **calendar:** using locale config for date labels ([7d58232](https://github.com/vexip-ui/vexip-ui/commit/7d58232267895e413badd44f063f96270f52b6cc))
* improve prefix resolve when install ([a418794](https://github.com/vexip-ui/vexip-ui/commit/a4187947cc4c73dad2d28175482df868f622223e))
* **mixins:** add both key and code into activeKeys for useModifier ([c2593e5](https://github.com/vexip-ui/vexip-ui/commit/c2593e5aebb65e8c7619a27cd975eb1b80ff8c09))
* **scroll:** not auto refresh when content size change ([846f4f0](https://github.com/vexip-ui/vexip-ui/commit/846f4f061979462d05e1cda30d65b51f903aa3e1))
* **table:** scroll not reset when data changed ([7814b08](https://github.com/vexip-ui/vexip-ui/commit/7814b0831da938155e135a396649829ebff78d0e))
* **time-ago:** cannot resolve locale config ([b073ff8](https://github.com/vexip-ui/vexip-ui/commit/b073ff840d9d7eaec0d496dc718ff8409486cfea))
* **utils:** imrpove number operations loop ([5d10739](https://github.com/vexip-ui/vexip-ui/commit/5d10739ec7a1fe1d083128c469f10e7d845bf681))
* **wheel:** cannot scroll when min or max value effectively ([05198d4](https://github.com/vexip-ui/vexip-ui/commit/05198d45ec2051516561a21ec5ba9049617223f4))


### 👓 Types

* **config:** imrpove ClassType and StyleType ([5f42e7b](https://github.com/vexip-ui/vexip-ui/commit/5f42e7bdf2fe7a9455e940b720d6cc1ca96d4cde))



# [2.0.0-beta.13](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2022-06-29)


### 🐞 Bug Fixes

* **confirm:** cannot open confrim ([7939674](https://github.com/vexip-ui/vexip-ui/commit/7939674c29390de072bd3c359128c294b628ae3c))
* **utils:** improve toFixed method ([4234dbc](https://github.com/vexip-ui/vexip-ui/commit/4234dbc5f4766ec75d020e34ee1d72c44cb2567f))



# [2.0.0-beta.12](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2022-06-27)


### ✨ Features

* add auto-remove prop for Masker, Drawer and Modal ([b83f150](https://github.com/vexip-ui/vexip-ui/commit/b83f1505b1c2e74658db07f6797b522710132940))
* **mixin:** add useMoving mixin ([2e48731](https://github.com/vexip-ui/vexip-ui/commit/2e4873162aea74d54972e2cbc6de751db588ec6c))
* **mixins:** add useFullScreen mixin ([0c8ac3a](https://github.com/vexip-ui/vexip-ui/commit/0c8ac3a23335828a3a1d9b8db0562e58115853de))
* **mixins:** add useListener mixin ([8a483b3](https://github.com/vexip-ui/vexip-ui/commit/8a483b3d3195f216c8501f5f5297555c1b769494))
* **mixins:** add usePointer mixin ([c6c3112](https://github.com/vexip-ui/vexip-ui/commit/c6c3112f65a6e245296ff3ba6eadd98274dfa80d))
* **progress:** add precision prop ([f51dff2](https://github.com/vexip-ui/vexip-ui/commit/f51dff22efaac99d4af8e6a4960843c4c7a944c0))
* **tree:** add dragging and drop over classes ([a2aca8e](https://github.com/vexip-ui/vexip-ui/commit/a2aca8ee7e159629113823399675c61d38ec848c)), closes [#55](https://github.com/vexip-ui/vexip-ui/issues/55)
* **tree:** add filter and ignore-case props ([df04a2e](https://github.com/vexip-ui/vexip-ui/commit/df04a2e5ee2b5469802eba6efd7154dbc8968ffb)), closes [#54](https://github.com/vexip-ui/vexip-ui/issues/54)
* **tree:** add node-props prop ([9023743](https://github.com/vexip-ui/vexip-ui/commit/902374376aa49958f1762e585d3961341eeabbe2))
* **tree:** support using method expand node and its all upstream nodes ([e9e9ede](https://github.com/vexip-ui/vexip-ui/commit/e9e9ededad3155fcebffe378d8419d5863c92020)), closes [#53](https://github.com/vexip-ui/vexip-ui/issues/53)
* **Viewer:** add Viewer component ([#56](https://github.com/vexip-ui/vexip-ui/issues/56)) ([f1c16af](https://github.com/vexip-ui/vexip-ui/commit/f1c16af7f2de4f0315d3c5111f2e53bfb276ceb0))


### 🐞 Bug Fixes

* **avatar:** ensure no shrink ([d336fdc](https://github.com/vexip-ui/vexip-ui/commit/d336fdcde00b389fcde5977fe2d7b8cf23047b27))
* **cascader:** init checkbox in no-cascader with single select mode ([1b9ba45](https://github.com/vexip-ui/vexip-ui/commit/1b9ba45c707651872a4f46dadd3f12897b301115)), closes [#52](https://github.com/vexip-ui/vexip-ui/issues/52)
* **cascader:** panes display using flex ([efc1cee](https://github.com/vexip-ui/vexip-ui/commit/efc1cee40a3d7fa2df95185760fd60df49d67f21))
* **collapse:** pane expanded class always exists ([4271190](https://github.com/vexip-ui/vexip-ui/commit/427119015a427b009037d66e271c075e80ee2419))
* **color-picker:** pane transfer not effective ([3e59f6b](https://github.com/vexip-ui/vexip-ui/commit/3e59f6bec100a91933c470682454800b67be765c))
* **confirm:** will render two components when open ([289d79f](https://github.com/vexip-ui/vexip-ui/commit/289d79ff1eb547734e4e6b2dc74a9c51d2df46c8))
* **date-picker:** item range style incorrectly ([c6ed7b3](https://github.com/vexip-ui/vexip-ui/commit/c6ed7b3be735aae12c7135a3580472fbe734b2e3))
* **divider:** text position not effective ([21da414](https://github.com/vexip-ui/vexip-ui/commit/21da414f6c7ecc46b4409425c1bce57c675132b4))
* effect Scroll and Scrollbar with touch actions ([6e80fd6](https://github.com/vexip-ui/vexip-ui/commit/6e80fd6f95a2630ab3a81150f3e1833f03f1801e))
* **form:** add not nullable locale config ([6fb27c6](https://github.com/vexip-ui/vexip-ui/commit/6fb27c63089ca1076e40cb3335dbab3efb7bbb0f))
* **masker:** disable transfer when using inner mode ([351cc4d](https://github.com/vexip-ui/vexip-ui/commit/351cc4d244d8b6b11a4f492a40e053c14f533a12))
* **mixins:** add delta states and supoort capture config ([b1fd988](https://github.com/vexip-ui/vexip-ui/commit/b1fd988548689f047fe6a48954830ff9639b1c6e))
* **mixins:** useFullScreen should return the target ([ecdf647](https://github.com/vexip-ui/vexip-ui/commit/ecdf647174d391c937525bb5cd0bd33ceba66a1a))
* **mixins:** useMouse ensure cancelable before disable events ([4aa5686](https://github.com/vexip-ui/vexip-ui/commit/4aa5686a682ea8f5857303dc1e23db3bedac4899))
* **mixins:** useMoving default prevent mouse and touch events ([3cb1674](https://github.com/vexip-ui/vexip-ui/commit/3cb167467d95d16c1f5f8cc1ae2ef35f34cdf8af))
* **modal:** effect drag and resize to mobile ([373082a](https://github.com/vexip-ui/vexip-ui/commit/373082aab8103a5c7ac66d474c6b943646445c1f))
* **modal:** emitted drag events when not draggable ([fa6275d](https://github.com/vexip-ui/vexip-ui/commit/fa6275d62c919717786e3a2232531da1e5468f8f))
* **pagination:** total and page size plugins style incorrectly ([df6d556](https://github.com/vexip-ui/vexip-ui/commit/df6d55683463b0539de8d92228a470a4eed968bf))
* **scroll:** pointer prop default value base on touch supported ([64770b7](https://github.com/vexip-ui/vexip-ui/commit/64770b78f1f8d8f685672b400f6c8296a9d1b861))
* **slider:** effect touch actions ([805c0f2](https://github.com/vexip-ui/vexip-ui/commit/805c0f2a7f03a3ffa1d940029070f49d6bcd4503))
* **split:** adjust using useMoving mixin to implement ([cfc94d8](https://github.com/vexip-ui/vexip-ui/commit/cfc94d870af33bdb141b6b65a730852ff587cb1c))
* **time-ago:** compatibility for ios when parse string date ([098228a](https://github.com/vexip-ui/vexip-ui/commit/098228a884272833fcca4630fb013897bb3101fc))
* **time-picker:** effect touch actions ([3060e18](https://github.com/vexip-ui/vexip-ui/commit/3060e18d4885fca8015707a144910c07d769a284))
* **upload:** default 2 precision for upload progress ([ccf4f5c](https://github.com/vexip-ui/vexip-ui/commit/ccf4f5c58adc84b245a5571f18b1be5137de54b6))
* **wheel:** pointer prop default value base on touch supported ([36ecbbb](https://github.com/vexip-ui/vexip-ui/commit/36ecbbb7b43a84d2fbec85cc38f8d58973be4455))


### 🔨 Code Refactoring

* **drawer:** resize using useMoving mixin to implement ([950ebe6](https://github.com/vexip-ui/vexip-ui/commit/950ebe6c09a882c8d1e751163fa473f6971f68c5))
* **modal:** drag and resize using useMoving mixin to implement ([89e7428](https://github.com/vexip-ui/vexip-ui/commit/89e742826a76ee72cb621d0a41f16a6131eab924))



# [2.0.0-beta.11](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2022-06-21)


### ✨ Features

* **config:** auto warning when validator returns false ([2b7712d](https://github.com/vexip-ui/vexip-ui/commit/2b7712d7d25ef1ef7905934d9d5faf44c4c6003a))
* **config:** support common props config ([86c8fd8](https://github.com/vexip-ui/vexip-ui/commit/86c8fd801643f9919e074bd4d1d7825ad7eae355))
* **config:** support custom class namespace ([#48](https://github.com/vexip-ui/vexip-ui/issues/48)) ([da29ae3](https://github.com/vexip-ui/vexip-ui/commit/da29ae3e4e0c80d59d379274ccb8dbcb15254715))


### 🐞 Bug Fixes

* ensure Modal and Drawer max sizes less then window sizes ([faade51](https://github.com/vexip-ui/vexip-ui/commit/faade5190cc7dd82417c65f778b2f7cec7a9d61c))
* ensure scope when Scroll or NativeScroll nesting ([b81585d](https://github.com/vexip-ui/vexip-ui/commit/b81585d3c2ce3d46421149307a14cdaf4c5e076e))
* **menu:** nesting popper padding and icon flex-shrink ([4dc29ea](https://github.com/vexip-ui/vexip-ui/commit/4dc29ea88cba23ed42e1bfcd15482f9b8b2d7bde))
* missing style to space-evenly justify ([bda3704](https://github.com/vexip-ui/vexip-ui/commit/bda370476c0b183b85db2322a3e16d46cd263e6a))
* **number-input:** range prop split to min and max props ([62447a6](https://github.com/vexip-ui/vexip-ui/commit/62447a69dde716ee20f07d614e3d37bdac4234ac))
* **scroll:** click event not be emitted ([eaa5cc7](https://github.com/vexip-ui/vexip-ui/commit/eaa5cc7c6c661dae58c98b6658f4698b0bf6be0e))
* **style:** forward design to esaier modify variables ([5a67967](https://github.com/vexip-ui/vexip-ui/commit/5a67967c4ce09b137728f8acdb32308f3800c291))
* support array type class and style props ([317fbff](https://github.com/vexip-ui/vexip-ui/commit/317fbff212847cf3d7054af99102656779e37a8e))


### 🔨 Code Refactoring

* **switch:** rename to Switch, icon prop split to open-icon and close-icon ([29d1e80](https://github.com/vexip-ui/vexip-ui/commit/29d1e8068e6c76aa57d6c98b6ce77bb22bace9a4))


### ❌ Breaking Changes

* **number-input:** NumberInput `range` prop has removed, using min and
max props to instead it.



# [2.0.0-beta.10](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2022-06-18)


### ✨ Features

* add Skeleton and SkeletonGroup components ([#46](https://github.com/vexip-ui/vexip-ui/issues/46)) ([92c011f](https://github.com/vexip-ui/vexip-ui/commit/92c011f1a3bf9ecade03304409728ee73cc2de7d))
* **Space:** add Space component ([#47](https://github.com/vexip-ui/vexip-ui/issues/47)) ([cedc5b3](https://github.com/vexip-ui/vexip-ui/commit/cedc5b3a4d3133f95138d9715bb2bd95c8be519a))
* **tree:** add no-cascaded prop ([fa07fdd](https://github.com/vexip-ui/vexip-ui/commit/fa07fdd59c4b28ae9b07e8160e9dc586fc797af2))
* **tree:** add suffix-checkbox prop ([d82a531](https://github.com/vexip-ui/vexip-ui/commit/d82a53199d489a36e4b58d2074dd2bed577be7c4))
* **utils:** add supportFlexGap method ([ff158dc](https://github.com/vexip-ui/vexip-ui/commit/ff158dcb2dcbeccb3fc384be5d0085b2f1dda0b4))


### 🐞 Bug Fixes

* **row:** add space-evenly for justify, stretch for align ([01024a4](https://github.com/vexip-ui/vexip-ui/commit/01024a48c7c2af2b0204e9a741a703acee3139e7))



# [2.0.0-beta.9](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2022-06-16)


### 🐞 Bug Fixes

* **button:** ensure size effective when not set group size ([171e9bf](https://github.com/vexip-ui/vexip-ui/commit/171e9bf2ff767736deffbfbf62186ff0ec291e97)), closes [#39](https://github.com/vexip-ui/vexip-ui/issues/39)
* **cascader:** add empty tip when options is empty ([682cbec](https://github.com/vexip-ui/vexip-ui/commit/682cbec67ba2f0e54156c383d39b13799aaeeaa8)), closes [#40](https://github.com/vexip-ui/vexip-ui/issues/40)
* **cascader:** no-cascaded effective in single select mode ([9d17d96](https://github.com/vexip-ui/vexip-ui/commit/9d17d966b7cc5f0f9a1fea89dd80ff7f0821f6ee)), closes [#43](https://github.com/vexip-ui/vexip-ui/issues/43)
* **config:** support function as default value ([f44047e](https://github.com/vexip-ui/vexip-ui/commit/f44047e5362ec5d5374dbcd1d4ad87f51b84ca21)), closes [#41](https://github.com/vexip-ui/vexip-ui/issues/41)
* **form:** item field config not init ([16651fc](https://github.com/vexip-ui/vexip-ui/commit/16651fc4e5c58896bdd3de8d7e81856f5e142e5c))
* **modal:** close icon color transition not effective ([a1e7fff](https://github.com/vexip-ui/vexip-ui/commit/a1e7fff99886d072a6b89ac10e0fad1995031c90)), closes [#42](https://github.com/vexip-ui/vexip-ui/issues/42)
* **native-scroll:** bar not hide when not available ([005ba93](https://github.com/vexip-ui/vexip-ui/commit/005ba934d7f77b26c6f83cf234402209472b5ec1)), closes [#44](https://github.com/vexip-ui/vexip-ui/issues/44)



# [2.0.0-beta.8](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2022-06-15)



# [2.0.0-beta.7](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2022-06-15)


### 🐞 Bug Fixes

* **config:** unexpected merge global locale config ([e43d8e8](https://github.com/vexip-ui/vexip-ui/commit/e43d8e89c7fb131dde6bdf0eb8613736ed13905d))
* **select:** ensure init value when async load options ([f4e44b3](https://github.com/vexip-ui/vexip-ui/commit/f4e44b3238fa0043e7b3588417ba980e28d55620)), closes [#38](https://github.com/vexip-ui/vexip-ui/issues/38)


### 👓 Types

* export config types ([6bfb6a2](https://github.com/vexip-ui/vexip-ui/commit/6bfb6a2822d37c9369cf1c1add1321ea10210f8c))



# [2.0.0-beta.6](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2022-06-14)


### ⚡ Performance Improvements

* improve for loop memory ([acb10d7](https://github.com/vexip-ui/vexip-ui/commit/acb10d7c6fde619846f4b4b487cf89ce20232592))


### ✨ Features

* **auto-complete:** add key-config prop ([2ff15cb](https://github.com/vexip-ui/vexip-ui/commit/2ff15cb1a840f30a8e2cdf590874c73917748c3b))
* **auto-complete:** support custom value and label keys ([3a7bfc8](https://github.com/vexip-ui/vexip-ui/commit/3a7bfc80b0fef7ed14fb405855924db1ab2d4a41))
* **button:** add size and type props to ButtonGroup ([1b8ca9c](https://github.com/vexip-ui/vexip-ui/commit/1b8ca9c0d1322fce7783489f583ab6a444efc910))
* **Cascader:** add Cascader component ([#37](https://github.com/vexip-ui/vexip-ui/issues/37)) ([237f3cf](https://github.com/vexip-ui/vexip-ui/commit/237f3cf8232172c920fcca01ce84a0f8ef0f8d69))
* **mixins:** add useSetTimeout and useSetInterval ([44b63e7](https://github.com/vexip-ui/vexip-ui/commit/44b63e7bdb5c31f0d7712cf4f8dcf9535ac581d4))
* **select:** support value-key and label-key props ([2039f25](https://github.com/vexip-ui/vexip-ui/commit/2039f2518d2f7ed177218c99d7a55091fa9135a8))
* **tree:** add key-config prop to config key alias ([2ce3ec7](https://github.com/vexip-ui/vexip-ui/commit/2ce3ec7e07f42532d5b20e425881a075e36f3e09))


### 🐞 Bug Fixes

* **alert:** icon prop error when set unknown type ([a989838](https://github.com/vexip-ui/vexip-ui/commit/a9898385e90c4f24825af68e72cc427133a9823d))
* **button:** change size unit to px ([5cf8421](https://github.com/vexip-ui/vexip-ui/commit/5cf8421c5787c6eb9eb1d3427e8daa06fba7e6f6))
* **cascader:** option changed not trigger update ([97a1aff](https://github.com/vexip-ui/vexip-ui/commit/97a1affd6cfed8dddeaaf4e9d8f96c16ed018f65))
* change input like size unit to px ([8f566e6](https://github.com/vexip-ui/vexip-ui/commit/8f566e63e94ef3f01a81a175c7fc327ce3783dfc))
* change size unit from `em` to `px` ([#31](https://github.com/vexip-ui/vexip-ui/issues/31)) ([1370057](https://github.com/vexip-ui/vexip-ui/commit/137005766de6f20989eb02105d189cf25923f504))
* clear internal timer when unmount ([9c2f462](https://github.com/vexip-ui/vexip-ui/commit/9c2f4628efeef62db4fbe73dca7228aa84e824cc))
* **config:** init config not reactive ([47298a5](https://github.com/vexip-ui/vexip-ui/commit/47298a58472d6f8a08d204add8c311a6fcd99fcb))
* **config:** should exist global locale ([b7a5546](https://github.com/vexip-ui/vexip-ui/commit/b7a554652b10dbe0529f3901c229511b19c878c8))
* **select:** ensure sync init values and labels ([ae04af0](https://github.com/vexip-ui/vexip-ui/commit/ae04af0842babbf067d782c6f26eca33ca173620)), closes [#36](https://github.com/vexip-ui/vexip-ui/issues/36)
* **style:** remove unnecessary padding vars ([ae30e20](https://github.com/vexip-ui/vexip-ui/commit/ae30e20d2d12a90aceb6c88e9f07df0be98a9701))
* **tree:** improve node padding style ([6db9bed](https://github.com/vexip-ui/vexip-ui/commit/6db9bedfa66d036beec7f12b0baed0427b7aece0))
* **utils:** flatTree not init id when nonexists ([e298729](https://github.com/vexip-ui/vexip-ui/commit/e29872966070450c17c28f6882f9c1e6dd662d29))


### 👓 Types

* **utils:** change mergeObjects param type ([f2b3b7b](https://github.com/vexip-ui/vexip-ui/commit/f2b3b7b7fc9e12ef656e640a30baf9f0afded3ac))


### 🔨 Code Refactoring

* **select:** support bind data to options, add key-config prop ([39b261c](https://github.com/vexip-ui/vexip-ui/commit/39b261ce384043767274093b83125d4d7d4d271e))


### ❌ Breaking Changes

* **select:** `value-key` and `label-key` props of Select component
is deprecated and removed, using `key-config` to instead.
* **tree:** `id-key`, `label-key`, `children-key` and `parent-key`
props of Tree component is deprecated and removed, using `key-config`
to instead.



# [2.0.0-beta.5](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2022-06-08)


### ✨ Features

* add Avatar and AvatarGroup components ([#27](https://github.com/vexip-ui/vexip-ui/issues/27)) ([426aa67](https://github.com/vexip-ui/vexip-ui/commit/426aa67958f1b2107e59adf71243c9c6795415e8))


### 🐞 Bug Fixes

* **calendar:** index hover background color ([014c904](https://github.com/vexip-ui/vexip-ui/commit/014c90499c2c12d75a22568735a06db762f32269))
* correctly export style files ([c33e29f](https://github.com/vexip-ui/vexip-ui/commit/c33e29f1889ebcc2264a8bdc13d494e631834ba8))
* **locale:** correct calendar week locale ([9e1b25b](https://github.com/vexip-ui/vexip-ui/commit/9e1b25b9bb03e6b18ec970eb8f232b9cafd046a0))
* **masker:** improve disabled style ([0fc78df](https://github.com/vexip-ui/vexip-ui/commit/0fc78dfd8a29e4b8ecabf90824b559f788711151))



# [2.0.0-beta.4](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-06-07)


### ✨ Features

* **config-provider:** support partial provide config ([#25](https://github.com/vexip-ui/vexip-ui/issues/25)) ([75cbc86](https://github.com/vexip-ui/vexip-ui/commit/75cbc8671df4c8d73c0b659955a98a5a3b5deef9))
* **config:** support internal en-US locale ([2a5b2d3](https://github.com/vexip-ui/vexip-ui/commit/2a5b2d3a84f13197dbfdf1ae2d08156a3e1d7999))
* **progress:** add activated prop ([38b3d7a](https://github.com/vexip-ui/vexip-ui/commit/38b3d7a1ed2ede6305692f4925d68cd47113e490))
* **select:** add static-suffix prop ([862ea5a](https://github.com/vexip-ui/vexip-ui/commit/862ea5a3cb7fcb4a03bab956eefa8e8fc6479eef))
* **spin:** add transition-name prop ([7014d35](https://github.com/vexip-ui/vexip-ui/commit/7014d35469d1238e94a46742c42a43413581326b))
* **upload:** add button-label prop ([5657427](https://github.com/vexip-ui/vexip-ui/commit/5657427af9e44b633ac7f123d76a357a56994685))


### 🐞 Bug Fixes

* **badge:** adjust defective style ([d99be40](https://github.com/vexip-ui/vexip-ui/commit/d99be402cf5ebdb7ef16c9139290d5535de5928d))
* boolean with other type props ignore default value ([5cf9b12](https://github.com/vexip-ui/vexip-ui/commit/5cf9b12c00515428a48672929110a661f52a674b))
* **calendar:** hover and selected background color ([7789025](https://github.com/vexip-ui/vexip-ui/commit/7789025c800a18d98b323350e7bd466fd35a84c7))
* **confrim:** binding instance to installed app ([bb6dc38](https://github.com/vexip-ui/vexip-ui/commit/bb6dc38818c5d6f45bf80fd5492d846a634cb458))
* **icons:** mark icon components to raw ([2b98f9f](https://github.com/vexip-ui/vexip-ui/commit/2b98f9ff51aa081796724c816778a8c2550f4cee))
* **menu:** incorrect propper style ([dfe9f30](https://github.com/vexip-ui/vexip-ui/commit/dfe9f303703f828f9e2726e072a67b31015980b9))
* **mixins:** assert type for HTMLElement refs ([c4bf386](https://github.com/vexip-ui/vexip-ui/commit/c4bf3866a14d341761ececc97a441c2206ffb398))
* **pagination:** page size count select label ([3375be5](https://github.com/vexip-ui/vexip-ui/commit/3375be51a98802858b7dfa65f21deb5aeffb815c))
* **pagination:** total items display error ([1434bc4](https://github.com/vexip-ui/vexip-ui/commit/1434bc4505eb97522c6efc47034134eb29dd9888))
* **select:** max-list-height not effective ([bc559c7](https://github.com/vexip-ui/vexip-ui/commit/bc559c7662e3c7f3cf3675d714c0ff8b1c2497da))
* **select:** suffix arrow no transition when drop ([a90701d](https://github.com/vexip-ui/vexip-ui/commit/a90701d5c2840e7686e4132dbe31e1d90ce657ba))
* **style:** adjust shadow color in dark theme ([7f34bc0](https://github.com/vexip-ui/vexip-ui/commit/7f34bc01616d2bbed5fa20a0ecc969c0f7cfd7d5))
* **tree:** selected node label background color ([3186024](https://github.com/vexip-ui/vexip-ui/commit/31860241951cb877714e42ba49d69e34170861a4))
* unable to prevent mask close for Modal and Drawer ([332f286](https://github.com/vexip-ui/vexip-ui/commit/332f2869eef817b53265512c58efd619970fc488))



# [2.0.0-beta.3](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-06-06)


### ✨ Features

* **playground:** add action to reset codes ([a91d77b](https://github.com/vexip-ui/vexip-ui/commit/a91d77b8e8e1a1285694a3cd4b69cc617ab4a715))
* **tag:** color prop custom major color, remove border-color prop ([749a7a8](https://github.com/vexip-ui/vexip-ui/commit/749a7a8c331e7a9d6aacf783e2b238618c2d65f0))


### 🐞 Bug Fixes

* **form:** sync FormSubmit and FormReset props to Button ([a9ab65f](https://github.com/vexip-ui/vexip-ui/commit/a9ab65f2647c1e3eabb882e58d193f52d2ba5195))
* **icons:** support export full icons package ([a136d47](https://github.com/vexip-ui/vexip-ui/commit/a136d471957fc85100fef6391970340904023931))
* **modal:** event `ok` rename to `confirm` ([a6610a7](https://github.com/vexip-ui/vexip-ui/commit/a6610a7db19a3a2fa4297dd86e7560ad105a3a31))
* **native-scroll:** scroll event barType to type ([3dce3c7](https://github.com/vexip-ui/vexip-ui/commit/3dce3c79f91e340aacaef578af84cfd0b10f53e8))
* **number-input:** autocomplete prop change type to boolean ([be2f838](https://github.com/vexip-ui/vexip-ui/commit/be2f83809b2c4bfce29508116b11c008a8714e73))
* **radio:** group options prop to string or number array ([56b2e78](https://github.com/vexip-ui/vexip-ui/commit/56b2e78306944fe08423aed8da7a403e85a1c727))
* **select:** label not update when value prop changed ([4c61493](https://github.com/vexip-ui/vexip-ui/commit/4c61493a2008b4ef4bfb63f25e72c60fe50d15b6))
* **split:** remove 	op and ottom slots ([c50515e](https://github.com/vexip-ui/vexip-ui/commit/c50515e649b4083e00d13ac6b8cf3384f7f964bc))
* **tabs:** icon prop of TabPane defautl to null ([a46f173](https://github.com/vexip-ui/vexip-ui/commit/a46f173d7313f4e1fa9b399e5f6991ffdf63844e))
* **tabs:** pane icon prop type should be object ([a409731](https://github.com/vexip-ui/vexip-ui/commit/a409731186df065a172677b5b12d3fc832ad09d9))
* **tag:** content default no wrap ([ef5a1c0](https://github.com/vexip-ui/vexip-ui/commit/ef5a1c0ded6f4ffaa4308715f31dfab4f01651be))
* **tag:** remove built-in transition ([74af492](https://github.com/vexip-ui/vexip-ui/commit/74af4925b4ca388ae3ff5b8d71d83153f99a375b))
* **tree:** controllable slot params ([eb8421e](https://github.com/vexip-ui/vexip-ui/commit/eb8421e628fc534cb36f9ea8430c1f1007573071))


### 👓 Types

* fix upload and wheel types ([7cd7f0d](https://github.com/vexip-ui/vexip-ui/commit/7cd7f0d07dcc9a16ec46107c84db7da709527025))
* **table:** some accurate prop types ([7b68561](https://github.com/vexip-ui/vexip-ui/commit/7b68561b78b93e9429f4a3675ec701345a07e3d7))



# [2.0.0-beta.2](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-06-01)


### 🐞 Bug Fixes

* missing global types.d.ts ([1a00515](https://github.com/vexip-ui/vexip-ui/commit/1a0051584ad7c1954b69484f513d17f97289ae0a))


### 🔨 Code Refactoring

* **style:** change --vxp-border-radius-xxx to --vxp-radius-xxx ([0e10b12](https://github.com/vexip-ui/vexip-ui/commit/0e10b12baf23949bca04049c46873f3cad6af413))



# [2.0.0-beta.1](https://github.com/vexip-ui/vexip-ui/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2022-06-01)


### ✨ Features

* **breadcrumb:** add options prop to quick set items ([083ed56](https://github.com/vexip-ui/vexip-ui/commit/083ed56ffddb0a8bd37143acc51850c10f0c9b6c))
* **scrollbar:** support custom width and track-color from props ([f2a01c9](https://github.com/vexip-ui/vexip-ui/commit/f2a01c9c9f924408446da753f40c8ffeda8315ab))
* **style:** add --vxp-content-color-third var ([b5b5adc](https://github.com/vexip-ui/vexip-ui/commit/b5b5adc94b71c17a05945805d72193cfb847c128))
* **utils:** add escapeHtml method ([75ee4a9](https://github.com/vexip-ui/vexip-ui/commit/75ee4a956b2d7d69ee500fb508ba37135a1f637f))
* **utils:** add formatByteSize method ([0f2458a](https://github.com/vexip-ui/vexip-ui/commit/0f2458aa6fd8494cfea4feab62420cc0092719d1))


### 🐞 Bug Fixes

* adjust component internal button text type ([e0fac63](https://github.com/vexip-ui/vexip-ui/commit/e0fac63bf89777b54efb646e3551bff4ab156183))
* **auto-complete:** can-drop refactor to drop-disabled ([fd2783a](https://github.com/vexip-ui/vexip-ui/commit/fd2783a019fd36707ee432e777f95ab4a45a2295))
* **auto-complete:** drop-disabled default to false ([40469de](https://github.com/vexip-ui/vexip-ui/commit/40469de045fe7ee966d5c58b115a2f408eb20912))
* **auto-complete:** part of options blank when filter ([01c169e](https://github.com/vexip-ui/vexip-ui/commit/01c169e414be241dee71351948624e683afe5165))
* **color-picker:** incorrect marker color when change value ([f63daec](https://github.com/vexip-ui/vexip-ui/commit/f63daec73375948e6baa0a52cad1354343b409b3))
* **dropdown:** add border for dropdown list ([c786b34](https://github.com/vexip-ui/vexip-ui/commit/c786b3457a2f1ddec06d81746ee6ca25e2224dc7))
* **dropdown:** trigger display default to flex ([3242cb4](https://github.com/vexip-ui/vexip-ui/commit/3242cb468e8813aeb905317375a3aa93c1370371))
* **menu:** adjust item padding-inline-start when inside group ([670fd33](https://github.com/vexip-ui/vexip-ui/commit/670fd334cd99fcf7c507696e634908e4f3f78cba))
* **select:** accurately parse option props ([7d8d8cf](https://github.com/vexip-ui/vexip-ui/commit/7d8d8cfcc09ffce7e0b86838050207c0825c20cb))
* **table:** endless loop when using page-size ([e6c2337](https://github.com/vexip-ui/vexip-ui/commit/e6c23375bcc6e66a6153ae5584e1586cafeeec3f))
* **utils:** rename toPascalCase to toCapitalCase ([b0efc84](https://github.com/vexip-ui/vexip-ui/commit/b0efc84ec4f0791af497600550e2cfc1440f726e))
* **utils:** use color name set to check named color ([6e3df86](https://github.com/vexip-ui/vexip-ui/commit/6e3df86433971ff76955c67937131800e90672e0))



# [2.0.0-beta.0](https://github.com/vexip-ui/vexip-ui/compare/v1.3.1...v2.0.0-beta.0) (2022-05-28)


### ⚡ Performance Improvements

* **table:** optimize scrolling performance ([3f96507](https://github.com/vexip-ui/vexip-ui/commit/3f96507b1b009e2de876a19e65cb6f53715a8550))
* **table:** optimize virtual scroll by BITree ([46e7ac5](https://github.com/vexip-ui/vexip-ui/commit/46e7ac5bb3efc9686b7962c759f045a76d7817fa))


### ✨ Features

* add VirtualList and ResizeObserver components ([db0d26c](https://github.com/vexip-ui/vexip-ui/commit/db0d26cb44c16384792ba0a98f69be68dcfcb380))
* **alert:** add manual prop ([a459974](https://github.com/vexip-ui/vexip-ui/commit/a459974640ae9ed99e14a20ebea051b13fb9edbc))
* **button:** add tag and attr-type props ([5e7317e](https://github.com/vexip-ui/vexip-ui/commit/5e7317ef4f82127b085f351821301b06b2ac10af))
* **color:** add mixColor method ([8c7cdda](https://github.com/vexip-ui/vexip-ui/commit/8c7cddaa3d2d4c76c186d8d61156c67d32a7bfb6))
* **grid:** add Grid and Cell components ([#19](https://github.com/vexip-ui/vexip-ui/issues/19)) ([64670fa](https://github.com/vexip-ui/vexip-ui/commit/64670fa983558f38808bebf044222135ce8b2a4f))
* **grid:** add use-flex prop ([01a95a0](https://github.com/vexip-ui/vexip-ui/commit/01a95a0cb72e081a2043522b968f66fa13ee31a6))
* **icons:** sync icons to vue-awesome@4.5.0 ([3f0c915](https://github.com/vexip-ui/vexip-ui/commit/3f0c915a4d5bc97e5fd6a2aa5f028408d0c9b6db))
* **icons:** upgrade to fontawesome v6 ([#23](https://github.com/vexip-ui/vexip-ui/issues/23)) ([6770468](https://github.com/vexip-ui/vexip-ui/commit/67704686ff935e531f3b529c202232ef8fc14a09))
* **mixins:** add useMounted mixin ([a89cdeb](https://github.com/vexip-ui/vexip-ui/commit/a89cdeb61a6eb9c5e7ff0455f017a72d944e5509))
* **mixins:** add useResize mixin ([5d139e3](https://github.com/vexip-ui/vexip-ui/commit/5d139e3cca81bf5803e467fddf56f36befc41765))
* **mixins:** add useVirtual mixin ([01827aa](https://github.com/vexip-ui/vexip-ui/commit/01827aa25611c737d50d9e62b6b98d1e951abd6e))
* **playground:** support runtime toggle dark theme ([51c6b44](https://github.com/vexip-ui/vexip-ui/commit/51c6b447e9abdace90635e1c0da86df940f2a041))
* **row:** add column-flex prop ([42312ec](https://github.com/vexip-ui/vexip-ui/commit/42312ec6ccb7efd1c6069debdbb992424dc6b988))
* **style:** add built in dark theme ([#24](https://github.com/vexip-ui/vexip-ui/issues/24)) ([e388387](https://github.com/vexip-ui/vexip-ui/commit/e38838720a730f64af3a0e22bc7149d829b0d7e7))
* **style:** transfer to use css vars ([#20](https://github.com/vexip-ui/vexip-ui/issues/20)) ([76bef3e](https://github.com/vexip-ui/vexip-ui/commit/76bef3e393e6c366bc0b90b1b980844ddb4d8dae))
* support virtual scroll for Select and AutoComplete ([30dba08](https://github.com/vexip-ui/vexip-ui/commit/30dba084ec0b9b866327b69498f3f98f35f3032f))
* **table:** add clearSelected method ([1b3d75e](https://github.com/vexip-ui/vexip-ui/commit/1b3d75e545950ae665dc09ee38d44605fd80dd18))
* **table:** add singleSorter and singleFilter props ([b477a61](https://github.com/vexip-ui/vexip-ui/commit/b477a61797e80c7b74b246b6d821787e658331d0))
* **table:** emit on-row-sort event ([e5306cc](https://github.com/vexip-ui/vexip-ui/commit/e5306ccca2b8821ddb22b3fbce79d5102d8fc7c1))
* **table:** export clearSort and clearFilter methods ([6202825](https://github.com/vexip-ui/vexip-ui/commit/620282563ae8e28c3c123488ee7ee684ac47050f))
* **table:** support virtual rendering rows ([5479c12](https://github.com/vexip-ui/vexip-ui/commit/5479c12dc490462f2ec0c7ceb221fa0d7ddb858d))
* **upload:** add isDragOver prop to default slot ([1a0020a](https://github.com/vexip-ui/vexip-ui/commit/1a0020afa949abfd32a7cba7955ee6b2a07e2ac8))
* **upload:** export UploadList and UploadFile components ([8b6ced2](https://github.com/vexip-ui/vexip-ui/commit/8b6ced29dcf97e15bda356bf4d4203e6ac0db55c))
* **upload:** support upload directories and only-dary mode ([042d6db](https://github.com/vexip-ui/vexip-ui/commit/042d6db4e9bbe1b0a075b1a25af25fb33689741b))
* **utils:** add adjustAlpha method ([107023a](https://github.com/vexip-ui/vexip-ui/commit/107023a83edb7abec8461bcc433cae79f8c83c91))
* **utils:** add createBITree method ([dbf76b2](https://github.com/vexip-ui/vexip-ui/commit/dbf76b2116e9ca59ce05afa09b06691b2703a2ff))
* **utils:** add debounceFrame, nextTickOnce and nextFrameOnce ([7204479](https://github.com/vexip-ui/vexip-ui/commit/7204479082899bdfe28bd5ac93aba9b430e49a32))
* **utils:** add isBigInt function ([259a990](https://github.com/vexip-ui/vexip-ui/commit/259a990e73091bfcc9bfbfe9c8a55fafeece22db))


### 🐞 Bug Fixes

* **button:** icon only style not effective ([a4d671c](https://github.com/vexip-ui/vexip-ui/commit/a4d671c0b9fd4c4d5488f1609b7962eba6bee20f))
* **button:** use render function to effect dynamic tag ([12b8c00](https://github.com/vexip-ui/vexip-ui/commit/12b8c00dfa07b4d3dbdb505ef21eb00644f02b35))
* **ellipsis:** exactly compare width using bounding rect ([194fd56](https://github.com/vexip-ui/vexip-ui/commit/194fd56fe8e2c3e0634f0b9e9f4a690f8498d295))
* **grid:** correct cell width default behavior ([23a904c](https://github.com/vexip-ui/vexip-ui/commit/23a904cb5858e34bb403ca993649c944c4836ee4))
* **native-scroll:** incorrectly record content offsetWidth ([6cb2d19](https://github.com/vexip-ui/vexip-ui/commit/6cb2d19fe7523fbd684404dad9ee64ac997a468f))
* **scroll:** autoplay cannot start when mounted ([90f1934](https://github.com/vexip-ui/vexip-ui/commit/90f1934708f8efade6b456fc60349d4bfbc696d0))
* **scrollbar:** cannot find wrapper in production mode ([d903b15](https://github.com/vexip-ui/vexip-ui/commit/d903b1573b096866ca9e22809765b9e89ce01e2a))
* stop propagation when dragging only for Table and Tree ([7ca6f53](https://github.com/vexip-ui/vexip-ui/commit/7ca6f53fa6b88c8336850e65998db9963a2219ef))
* **style:** transition-box-shadow rename to transition-shadow ([191f089](https://github.com/vexip-ui/vexip-ui/commit/191f089f55a193b2242e6257a9fc6aade0f9b78f))
* **table:** body height flicker when first render ([aec5cea](https://github.com/vexip-ui/vexip-ui/commit/aec5cea99ab062f64ecee16e95edb51e37c43c1c))
* **table:** incorrect head height and total rows height not reactive ([03d20b3](https://github.com/vexip-ui/vexip-ui/commit/03d20b3c02d3af24dc62118d1b6c9c86a36c6c88))
* **table:** incorrect height when using expand and fixed ([b689578](https://github.com/vexip-ui/vexip-ui/commit/b689578c085d01ba92a6aa804c1e06d0bdf09960))
* **table:** stripe error when using virtual ([d1b3108](https://github.com/vexip-ui/vexip-ui/commit/d1b310897487b0c8cfcdf8d7b69074c078b5e6af))
* **table:** thead and tbody border missing ([acf1a3e](https://github.com/vexip-ui/vexip-ui/commit/acf1a3e46bbf1415fa92c29d4d99b8290e478c04))
* **upload-file:** decoupling the style from Upload class name ([f62a417](https://github.com/vexip-ui/vexip-ui/commit/f62a4174f1c8a22d012077b504e10b1247830be2))
* **utils:** debounceMinor not effective ([0873b28](https://github.com/vexip-ui/vexip-ui/commit/0873b28f5abcc634226d07c99061f34fa81d03a9))
* **utils:** using string schema to process toFixed ([7135f82](https://github.com/vexip-ui/vexip-ui/commit/7135f82bcf7a6314b47285fc240aa70a982ed20b))


### 🔨 Code Refactoring

* all `beforeXxx` props adjust to `onBeforeXxx` ([2bee7cf](https://github.com/vexip-ui/vexip-ui/commit/2bee7cff0a2935213270657fc929c3e5408285bf))
* all events adjust `on-xxx` to `xxx` ([a684401](https://github.com/vexip-ui/vexip-ui/commit/a684401725e3f85ab79256dab385e01103fd1fbd))
* **button:** support custom color ([06658f7](https://github.com/vexip-ui/vexip-ui/commit/06658f7e8fa20daa05d6b4afb09de25b16bd5bf5))
* icon rewrite to use component ([#22](https://github.com/vexip-ui/vexip-ui/issues/22)) ([d825637](https://github.com/vexip-ui/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))
* **style:** transfer [@import](https://github.com/import) to [@use](https://github.com/use) and [@forward](https://github.com/forward) ([af597ce](https://github.com/vexip-ui/vexip-ui/commit/af597ce4f095597709a9d000533a0b7f3130cda0))


### ❌ Breaking Changes

* Using `onBeforeXxx` to replace `beforeXxx` props, the
purpose is to support `@beforeXxx` alias to bind callback.
* All component events are removed the `on` prefix,
currently using `@xxx` to replace `@on-xxx`, its purpose is to better
bind events in t/jsx (no `onOnXxx`).
* **button:** extract text and dashed types as props from Button component,
text-color prop has removed, using color prop to customize the button.
* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.
* **style:** All scss variables in components have been removed, all preset scss variables in 
`design/variables.scss` have removed the `vxp-` prefix and change to use scss map to define. All 
style imports in scss are currently using `@use` and `@forward`, do not use `@import` to import 
styles anymore.



## [1.3.1](https://github.com/vexip-ui/vexip-ui/compare/v1.3.0...v1.3.1) (2022-04-19)


### ⚡ Performance Improvements

* **tooltip:** no render tip elements when disabled ([6a7a50d](https://github.com/vexip-ui/vexip-ui/commit/6a7a50de1c78706d8add1d6c3d3cc2e51ae79cda))


### ✨ Features

* add use-bar-track prop to Scroll and NativeScroll ([59c94f8](https://github.com/vexip-ui/vexip-ui/commit/59c94f82226e3f4ae722916eacb14b9ae5390a33))
* **calendar:** add header, title and week slots ([340194a](https://github.com/vexip-ui/vexip-ui/commit/340194aca45ba656a211a019350061743150252b))


### 🐞 Bug Fixes

* export Hightlight and NativeScroll components ([55ab1c7](https://github.com/vexip-ui/vexip-ui/commit/55ab1c71bd1073b79b68706a28d985e43d7c2194))
* **native-scroll:** refresh content size when observer callback ([ff2a732](https://github.com/vexip-ui/vexip-ui/commit/ff2a7326bf14b8c8159a48a49bf65538760181e7))
* **native-scroll:** stop wheel event propagation when can scroll ([d13b4d6](https://github.com/vexip-ui/vexip-ui/commit/d13b4d6912a63ca1f99d1d241164fcbae1f74353))
* **native-scroll:** unable to scroll after call scroll api mathods ([bca3d51](https://github.com/vexip-ui/vexip-ui/commit/bca3d5181d74036face7fe4ff990581d36bd86f0))
* **native-scroll:** unexpected reset scroll when content style change ([dabbd49](https://github.com/vexip-ui/vexip-ui/commit/dabbd49b4e66400e20340a84234c08527202b40a))
* **scrollbar:** unexpected show track when use-track not true ([6bf2dda](https://github.com/vexip-ui/vexip-ui/commit/6bf2dda3f1b6e0a40777e0059b4f20b4c77ad957))
* **scrollbar:** use-track should default false ([d6f8e6c](https://github.com/vexip-ui/vexip-ui/commit/d6f8e6ca444fd163b6c460c2772c86c5c61f843a))


### 👓 Types

* **anchor:** add NativeScroll type and accurate container type ([969ef5e](https://github.com/vexip-ui/vexip-ui/commit/969ef5e09cddc18bafbeffc7eb863873576f551d))



# [1.3.0](https://github.com/vexip-ui/vexip-ui/compare/v1.2.1...v1.3.0) (2022-04-18)


### ✨ Features

* **calendar:** add Calendar component ([495e6b4](https://github.com/vexip-ui/vexip-ui/commit/495e6b49168cf1ae8647b5231f060eb383ec96d6))
* **ellipsis:** add tip-max-width prop ([32254d5](https://github.com/vexip-ui/vexip-ui/commit/32254d549fa3d3e48e610bab8b03da01c6924c05))
* **form:** add hide-label prop ([08f65ff](https://github.com/vexip-ui/vexip-ui/commit/08f65ff5407db7932660468ba6a6e92bc2208724))
* **form:** form actions add before hook prop ([2b31f25](https://github.com/vexip-ui/vexip-ui/commit/2b31f25520f27ac8e313bee9aa137bf6193ebbca))
* **form:** form item add action type prop ([e85baf2](https://github.com/vexip-ui/vexip-ui/commit/e85baf2cc7c49f29d592412ce97e450e5a4cd8a2))
* **highlight:** add Highlight component ([901a5ad](https://github.com/vexip-ui/vexip-ui/commit/901a5ad7a10325f630961178df839317984493b8))
* **native-scroll:** add NativeScroll component ([68bfe20](https://github.com/vexip-ui/vexip-ui/commit/68bfe20441dede8152ecc3c10d58ce8f8dc09139))
* **playground:** add vexip-ui playground ([#16](https://github.com/vexip-ui/vexip-ui/issues/16)) ([989a2c7](https://github.com/vexip-ui/vexip-ui/commit/989a2c7d99d565d107aba6ecf8d9a78c675095e9))
* **scrollbar:** add appear prop ([743483c](https://github.com/vexip-ui/vexip-ui/commit/743483ca3ce131bdc4ca6bdd2e76d70541198e6e))
* **scrollbar:** add use-track and track-speed props ([2820c77](https://github.com/vexip-ui/vexip-ui/commit/2820c777b855462b5d1c2da0e3e7f8f77b06f614))
* **spin:** add Spin component ([784605c](https://github.com/vexip-ui/vexip-ui/commit/784605ce4d087cb55af2d8ba2263b66b7be03e32))
* **table:** add tooltip-width and column's no-ellipsis props ([b95e59d](https://github.com/vexip-ui/vexip-ui/commit/b95e59dc9a0f2e03efbb47dc5bfccbcdcc4723be))
* **tree:** add cache-node and root-id props ([13e721e](https://github.com/vexip-ui/vexip-ui/commit/13e721eb3ff2072ec90c1c38ea82a2c751793c76))
* **tree:** export parseAndTransformData method ([dc5a1e3](https://github.com/vexip-ui/vexip-ui/commit/dc5a1e3e0ff4d6bd6c5de17e1afb904624bd99b5))


### 🐞 Bug Fixes

* **auto-complete:** no options rendered when null value ([49af9d4](https://github.com/vexip-ui/vexip-ui/commit/49af9d4d66d909a4035e27be2ecebb9ea5445f26))
* **date-picker:** cannot parse number value in date type ([0b0e3a7](https://github.com/vexip-ui/vexip-ui/commit/0b0e3a7eb7a09ef1cb43ea7fec6b897bd9250dd0))
* **date-picker:** disabled-date prop not work ([6496175](https://github.com/vexip-ui/vexip-ui/commit/6496175ba037d741237cea7500772fa9b4d62db3))
* **date-picker:** format should ignore content in quotations ([31d7f16](https://github.com/vexip-ui/vexip-ui/commit/31d7f1689a1229582f6f2a71ae80e47d63011ac8))
* **linker:** vertical align should inherit parent ([9943e5e](https://github.com/vexip-ui/vexip-ui/commit/9943e5ed39d0a4cf5b225050eae3919a8675159a))
* **modal:** header slot is not effective ([2af3df6](https://github.com/vexip-ui/vexip-ui/commit/2af3df6cd6e9eca5919860cebb08c26494ba9dff))
* **modal:** use offset value to compute position ([07d0dc6](https://github.com/vexip-ui/vexip-ui/commit/07d0dc64bad7c8f097447d9b5d481f5d9727a4c2))
* **number-input:** should not format when inputting ([0f58739](https://github.com/vexip-ui/vexip-ui/commit/0f5873906424b07bfd9b72daf94479316871f4d7))
* **spin:** mask add default z-index ([943f3c6](https://github.com/vexip-ui/vexip-ui/commit/943f3c6d35a2585d7df4580360dd6222c5e124ad))
* **table:** disableRow should base on rendered rows ([c483386](https://github.com/vexip-ui/vexip-ui/commit/c4833864ec96d9d5fc9deee4f8a1f9eeb80691b3))
* **table:** row check all event add partial param ([a9cc1c5](https://github.com/vexip-ui/vexip-ui/commit/a9cc1c5e9acd665cc576da10f5d8d8856fc2b49e))
* **table:** row check all event add partial param ([7d7bede](https://github.com/vexip-ui/vexip-ui/commit/7d7bede86701fb534c57b974e3268c981f1b3aaf))
* **tree:** incorrect variable usage when get id map ([c94714e](https://github.com/vexip-ui/vexip-ui/commit/c94714ed08294b208af320e61921e1247543d491))
* **tree:** root-id prop not effective ([7494291](https://github.com/vexip-ui/vexip-ui/commit/74942916e542163855195e209c2059d11db33dbd))
* **tree:** use id-node map when update data ([8d5d843](https://github.com/vexip-ui/vexip-ui/commit/8d5d843572a44fa4c546959bd8fb70496b70a91a))
* **utils:** incorrect matching rootId in tree transform ([4e9d253](https://github.com/vexip-ui/vexip-ui/commit/4e9d2537170761d3a29cdcec63f5443fdb002c95))



## [1.2.1](https://github.com/vexip-ui/vexip-ui/compare/v1.2.0...v1.2.1) (2022-01-14)


### 🐞 Bug Fixes

* **tree:** incorrect expanded when using asyncLoad ([31c3ba5](https://github.com/vexip-ui/vexip-ui/commit/31c3ba509ab5c3c57a9a04e84a8cb806ff6389d7))



# [1.2.0](https://github.com/vexip-ui/vexip-ui/compare/v1.1.3...v1.2.0) (2022-01-07)


### ✨ Features

* add judge method for Message and Notice ([cb4062b](https://github.com/vexip-ui/vexip-ui/commit/cb4062b36096162b519b5a853726a259c4dd46a9))
* add locale config ([0a0ec74](https://github.com/vexip-ui/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **form:** support native html form submit ([497c3e3](https://github.com/vexip-ui/vexip-ui/commit/497c3e3115632c09bcb10ac9c9d98aa334b61547))
* **table:** add row enter and leave events ([b9fb4c2](https://github.com/vexip-ui/vexip-ui/commit/b9fb4c21e61d739ec4fd2b69a8ac1363d545c244))


### 🐞 Bug Fixes

* **config:** global defaults config no effective ([6eba983](https://github.com/vexip-ui/vexip-ui/commit/6eba983679b166786528c3a4f3a93b91bcfb6ed9))
* **date:** limit range values starkly in modification ([68cc1c8](https://github.com/vexip-ui/vexip-ui/commit/68cc1c8b64d54ff0bb218104d626e6eed86d14cc))
* install options should be optional ([0934c3c](https://github.com/vexip-ui/vexip-ui/commit/0934c3c36d863c30eb27ec4f38842392b51c7486))
* support Date type for ConfiguruseConfiguredProps ([05607e6](https://github.com/vexip-ui/vexip-ui/commit/05607e66cfff949fe5a21b05d594acaeb5a776b5))
* **table:** no recalculate when add rows ([741400e](https://github.com/vexip-ui/vexip-ui/commit/741400e112bf4437d47c7ed6898956a08a230021))


### 👓 Types

* **common:** accurately sortByProps types ([c303f55](https://github.com/vexip-ui/vexip-ui/commit/c303f552a5f2ec3bfc70ae5befe9a901a60866e4))
* **common:** optimize transform utils types ([1e8e9f5](https://github.com/vexip-ui/vexip-ui/commit/1e8e9f50d8adfc256635277a3e465763754e5690))
* **table:** fix type infer errors ([e01fb37](https://github.com/vexip-ui/vexip-ui/commit/e01fb37a716ce7673fdb41bfac44a448594e0dce))
* **tree:** fix type infer errors ([ff2cff0](https://github.com/vexip-ui/vexip-ui/commit/ff2cff013d06d6d152fab7e61943b455c4717414))


### ❌ Breaking Changes

* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



## [1.1.3](https://github.com/vexip-ui/vexip-ui/compare/v1.1.2...v1.1.3) (2021-10-20)


### ✨ Features

* **ellipsis:** add ellipsis component ([1fefc1b](https://github.com/vexip-ui/vexip-ui/commit/1fefc1b1546db69299952d957e15de842f89eab8))
* **select:** show empty text without any option ([5efe942](https://github.com/vexip-ui/vexip-ui/commit/5efe942b9ee6e075799501bbbc5a46c08a8a3304))
* **table:** add ellipsis tooltip for long content ([270df96](https://github.com/vexip-ui/vexip-ui/commit/270df9667e90455f7c6e6915286e78f742cd62b0))
* **table:** show empty text without any row ([ecb0ee7](https://github.com/vexip-ui/vexip-ui/commit/ecb0ee773e50efc00bbf6fb56c1420fe913e32d5))


### 🐞 Bug Fixes

* **checkbox:** only use margins within group ([22d3d9e](https://github.com/vexip-ui/vexip-ui/commit/22d3d9e80a7a254b72ccc5ef08732c6098cc41d5))
* **table:** incorrect height when using height prop ([d5143ac](https://github.com/vexip-ui/vexip-ui/commit/d5143accb4c243a2910c2693485408bd61cabe8e))



## [1.1.2](https://github.com/vexip-ui/vexip-ui/compare/v1.1.1...v1.1.2) (2021-07-19)


### ✨ Features

* **select:** add multiple and option-check props ([da2f78a](https://github.com/vexip-ui/vexip-ui/commit/da2f78a0b234d8d0a7064e77374e230c3a9bf073))
* **tag:** add circle prop ([f2e0cf2](https://github.com/vexip-ui/vexip-ui/commit/f2e0cf2457272b5c3eeef102051e609454d96331))
* **tag:** add size prop ([79c5290](https://github.com/vexip-ui/vexip-ui/commit/79c5290d9223d189379019cad637d0efb3d0115c))


### 🐞 Bug Fixes

* **table:** effect expandRenderer prop ([857af57](https://github.com/vexip-ui/vexip-ui/commit/857af572b0ede815727aaf51222ec12dfc48b412))
* **table:** scroll height incorrect ([66f4804](https://github.com/vexip-ui/vexip-ui/commit/66f48046b506ba11065ce046bc463c37ec6caef4))


### 🔨 Code Refactoring

* select and auto-complete no longer depend on input ([4c6af54](https://github.com/vexip-ui/vexip-ui/commit/4c6af54d09d918fb948cce3e0e459cf1777398e7))


### ❌ Breaking Changes

* select remove on-focus and on-blur events



## [1.1.1](https://github.com/vexip-ui/vexip-ui/compare/v1.1.0...v1.1.1) (2021-07-12)


### ✨ Features

* **checkbox:** remove bindGroup api ([5b3aafa](https://github.com/vexip-ui/vexip-ui/commit/5b3aafaddda1c0130a5db50cad2ae58d35e9ed7a))
* **table:** add defineColumns helper ([10d3a8d](https://github.com/vexip-ui/vexip-ui/commit/10d3a8d45f8a24d7b02f04d64aa015c886a4a1ea))


### 🐞 Bug Fixes

* **alert:** icon misplaced when no title ([8fd2f7d](https://github.com/vexip-ui/vexip-ui/commit/8fd2f7db9f6122e69f32dd64f7fdfbee34f6b03a))
* **badge:** title attr error when no content ([5bb6a86](https://github.com/vexip-ui/vexip-ui/commit/5bb6a86732c5f3c955c8360902350ba33b461185))
* **button:** missing simple class name ([4e91993](https://github.com/vexip-ui/vexip-ui/commit/4e91993ba3aa6fb740cdd55631aa797e44709f46))
* **color-picker:** cannot parse rgba color value ([8f4c57f](https://github.com/vexip-ui/vexip-ui/commit/8f4c57f4cf2c4ba4ab1b2f6f07f46209b1ff8b82))
* **date-picker:** clear should trigger change event ([1b1fec5](https://github.com/vexip-ui/vexip-ui/commit/1b1fec53d41afa430848dc983001ac7b565e9905))
* **date-picker:** intuitively update activated ([f4c9efb](https://github.com/vexip-ui/vexip-ui/commit/f4c9efb1f44cb4a416e2616f0be3ae384f5ae3c9))
* **input:** add ::placeholder color style ([54ce94b](https://github.com/vexip-ui/vexip-ui/commit/54ce94be7a595ec3065f78804a6133fa30c3f095))
* **masker:** closable not work without beforeClose ([77b00c0](https://github.com/vexip-ui/vexip-ui/commit/77b00c09f7225eb07fc25b028f8ca248bd65a515))
* **progress:** progress tip display error ([22eb709](https://github.com/vexip-ui/vexip-ui/commit/22eb709a681cbbdb5fb5861a137cfbb3f979aa85))
* **scroll:** start autoplay when mounted ([5d6dfa6](https://github.com/vexip-ui/vexip-ui/commit/5d6dfa6f84e06107344e7d9d9272635f69d45061))
* **slider:** error value when step is not 1 ([4c2b2b9](https://github.com/vexip-ui/vexip-ui/commit/4c2b2b996d6b4611ecdc117375d009a34d879b8b))
* **time-picker:** clear should trigger change event ([92e9ba7](https://github.com/vexip-ui/vexip-ui/commit/92e9ba7e573ae924e911cd2361613b42e9195981))


### 👓 Types

* export global components interface ([94f16d3](https://github.com/vexip-ui/vexip-ui/commit/94f16d352126563c0f58802841301958407b9170))
* replace ChildVNode to any ([b0bbd2b](https://github.com/vexip-ui/vexip-ui/commit/b0bbd2b0aa19bdf797f4b209f8855d598ac14dad))


### ❌ Breaking Changes

* **checkbox:** no longer support bindGroup api



# [1.1.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.3...v1.1.0) (2021-07-08)


### ⚡ Performance Improvements

* **scrollbar:** use transform replace top and left ([5a0e272](https://github.com/vexip-ui/vexip-ui/commit/5a0e2721ce54beb4b203013db19301d732c34f39))


### ✨ Features

* add contextmenu component ([#13](https://github.com/vexip-ui/vexip-ui/issues/13)) ([1571dc3](https://github.com/vexip-ui/vexip-ui/commit/1571dc34d4830a1a515c15378bf7b7db3e72219b))
* **dropdown:** add appear prop ([e230054](https://github.com/vexip-ui/vexip-ui/commit/e230054a585141d9b88901f65589dbf5578b8890))
* **loading:** create global loading component ([caedc67](https://github.com/vexip-ui/vexip-ui/commit/caedc67a883cd0f1683612e25d71d4f0e279480d))
* **tag:** add build in color type ([02fd360](https://github.com/vexip-ui/vexip-ui/commit/02fd36026fec4de39349252b0fa03dde4aa820ca))
* **tag:** add simple style tag ([b316888](https://github.com/vexip-ui/vexip-ui/commit/b3168886ea40f6cbaa3a83ea8278ed5d89d8c953))
* **time-ago:** add time-ago component ([b639c2e](https://github.com/vexip-ui/vexip-ui/commit/b639c2eb13c62b00d72010cc4c30328d09b2835a))


### 🐞 Bug Fixes

* **dropdown:** flush nested drop first item ([3992b7f](https://github.com/vexip-ui/vexip-ui/commit/3992b7f20d5a5a93e400dec123b787fb73a36d81))
* **dropdown:** item position relative incorrect divider ([53f1f91](https://github.com/vexip-ui/vexip-ui/commit/53f1f91715088e9a3e8b3e912585618f3c4edcda))
* **dropdown:** nested drop should not toggle select ([ece9d4e](https://github.com/vexip-ui/vexip-ui/commit/ece9d4eaeca646681781f851c9d77cd14e46cb9d))
* **popper:** watch wrapper and popper el change ([4fb0ca5](https://github.com/vexip-ui/vexip-ui/commit/4fb0ca568322df5b2046b5f985337f8dc78ef381))
* **table:** export refresh api ([f0dab34](https://github.com/vexip-ui/vexip-ui/commit/f0dab34f02b9d28d968674bb1d58e6a09ac6c08d))
* **table:** incorrect row count of data change ([7af4d5a](https://github.com/vexip-ui/vexip-ui/commit/7af4d5a2a90d573ad4ae370e1b3b820b2bc41fd1))


### 🔨 Code Refactoring

* **scroll:** extract element calculation ([27a8fec](https://github.com/vexip-ui/vexip-ui/commit/27a8fecca111a13215d8b0e582c58180ee51e914))
* using InjectionKey to define symbol key ([e59f5d5](https://github.com/vexip-ui/vexip-ui/commit/e59f5d55bfeb87704ce8ea06ead27f2a179d273f))



## [1.0.3](https://github.com/vexip-ui/vexip-ui/compare/v1.0.2...v1.0.3) (2021-06-26)


### ⚡ Performance Improvements

* **progress:** using transfrom to improve performance ([7ba3d8d](https://github.com/vexip-ui/vexip-ui/commit/7ba3d8db07cb32d1e3e65cd9a2e6ca38ac49c05b))


### 🐞 Bug Fixes

* **input:** no emit on-clear event ([64ca93f](https://github.com/vexip-ui/vexip-ui/commit/64ca93f507fb5628f91e977d1154687bfe736ceb))
* **input:** should not clearable when disabled ([6b58a0c](https://github.com/vexip-ui/vexip-ui/commit/6b58a0cfcb43c22245c7e031ac591e945be6bb10))
* **number-input:** support clearable and on-clear ([ebb8235](https://github.com/vexip-ui/vexip-ui/commit/ebb8235f742c3237634fdd6704071992dc664c2a))



## [1.0.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.1...v1.0.2) (2021-06-25)


### 🐞 Bug Fixes

* **dropdown:** add dropClass prop ([46a9ccf](https://github.com/vexip-ui/vexip-ui/commit/46a9ccf3bb3bd7b5bf025cda9857563225577c63))
* **dropdown:** set placement prop not work ([9bd32e8](https://github.com/vexip-ui/vexip-ui/commit/9bd32e81116a5d27aa85892fab14aaef5f144cd1))
* **dropdown:** support v-model:vivisble ([cfbf2dc](https://github.com/vexip-ui/vexip-ui/commit/cfbf2dcac7944df95e745ac097151b6836078478))
* **tab-nav:** card style order in using router ([825c7db](https://github.com/vexip-ui/vexip-ui/commit/825c7db18238617fcb55f981a79ae0ac3e705952))



## [1.0.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0...v1.0.1) (2021-06-17)


### 🐞 Bug Fixes

* **button:** style order in using router ([421512e](https://github.com/vexip-ui/vexip-ui/commit/421512e88972ace7f57b1d03641e9d7b94220780))



# [1.0.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.3...v1.0.0) (2021-06-10)


### ✨ Features

* **collapse-transition:** add mode and timing props ([9fe1862](https://github.com/vexip-ui/vexip-ui/commit/9fe1862045530a20b4c84156e78ca0b890d6b76b))
* **message:** add property config to install options ([be64ae3](https://github.com/vexip-ui/vexip-ui/commit/be64ae3699f6915b8124f3e7639c8f7ada2d0174))


### 🐞 Bug Fixes

* **message:** config placement not effective ([85fd771](https://github.com/vexip-ui/vexip-ui/commit/85fd771d3c1e3f6bc1c57db69c418ab433f9c58f))
* **notice:** config placement not effective ([833933b](https://github.com/vexip-ui/vexip-ui/commit/833933b26c26f061fedacee76b576daac067c330))


### 🔨 Code Refactoring

* **row:** transform vue file to ts file ([cf46478](https://github.com/vexip-ui/vexip-ui/commit/cf46478cec3a1ab8ebb9796b697fc2dc5aae367e))



# [1.0.0-beta.3](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-06-09)


### 🐞 Bug Fixes

* **message:** install global property name ([af21d31](https://github.com/vexip-ui/vexip-ui/commit/af21d31867d3679a2d86b2fdbc519d0f421ecbb1))



# [1.0.0-beta.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-06-05)


### 🐞 Bug Fixes

* **style:** relate style for import-on-demand ([194f32b](https://github.com/vexip-ui/vexip-ui/commit/194f32b6fda7264a52da9835faae8d4dd0875282))



# [1.0.0-beta.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2021-06-05)


### ✨ Features

* **scroll:** add on-ready event ([288ec9a](https://github.com/vexip-ui/vexip-ui/commit/288ec9abcc7a40374b5e788f89b89ec275a1124d))
* **table:** add filter and column define helpers ([5e85594](https://github.com/vexip-ui/vexip-ui/commit/5e855944082094e6509e9bed6ad3abf52efd8e03))


### 🐞 Bug Fixes

* **auto-complete:** hitting wrong after filter options ([7317ed6](https://github.com/vexip-ui/vexip-ui/commit/7317ed6848484505a3c61fa2f0cc2d9b60d84e4b))
* **masker:** transfer prop has no effect ([fd2173e](https://github.com/vexip-ui/vexip-ui/commit/fd2173e1c45599305d8e8abda0a93d423e222cd6))


### 👓 Types

* exports object prop type define ([a1eb5da](https://github.com/vexip-ui/vexip-ui/commit/a1eb5da4241dfa50b14436aff6dfd3ad22cb9680))
* fix potential template type errors ([5b45744](https://github.com/vexip-ui/vexip-ui/commit/5b457445347411cc23a067f1a5d3c4baedfe91f2))



# [1.0.0-beta.0](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.4...v1.0.0-beta.0) (2021-06-03)


### ✨ Features

* **textarea:** add control state style ([e8d6bfc](https://github.com/vexip-ui/vexip-ui/commit/e8d6bfc6b6ee3fc141fa42620e6458856b9e0f86))


### 🐞 Bug Fixes

* **checkbox-group:** sync value when values porp change ([1bdaa9f](https://github.com/vexip-ui/vexip-ui/commit/1bdaa9ff4d3ffa746f1c22222c851761be51685c))
* **date-picker:** calendar pane focus on selected date ([6a61c99](https://github.com/vexip-ui/vexip-ui/commit/6a61c9947df68e2ade844ec8a74a3111160eba73))
* **date-picker:** incorrect item display when range select year and month ([55ccf76](https://github.com/vexip-ui/vexip-ui/commit/55ccf7660dad24030ddefff6669c305066e34f51))
* **date-picker:** supply labels prop, includes time picker ([3cd5735](https://github.com/vexip-ui/vexip-ui/commit/3cd57352454998d77eb56c0a341dadcbeacdffec))
* **icon:** adjust default size about 1.05x ([ce90294](https://github.com/vexip-ui/vexip-ui/commit/ce902949ef1d193d80f2c58d67ee9cc635678875))
* **menu:** menu list margin set to 0 ([9ddab57](https://github.com/vexip-ui/vexip-ui/commit/9ddab5789ac42af1491a1797433f62c2bd4b276e))
* **select:** visible not to false when option v-for ([7208f42](https://github.com/vexip-ui/vexip-ui/commit/7208f42c69f5102f103f1cbf3387d27d1f029e09))
* **table:** column width incorrect width multiple talbe ([6fb8f65](https://github.com/vexip-ui/vexip-ui/commit/6fb8f65c7a122c6574dc85d5222cd9526ec3b4e1))
* **tree:** arrow transform act at icon svg ([14b53cc](https://github.com/vexip-ui/vexip-ui/commit/14b53ccfd6ee609aff66ac556f51a1080e374b26))


### 🔨 Code Refactoring

* **carousel:** transform double tracks to single track ([1d28bf7](https://github.com/vexip-ui/vexip-ui/commit/1d28bf76e6f66563246ee5e49ec384b00438a29b))



# [1.0.0-alpha.4](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.2...v1.0.0-alpha.4) (2021-05-29)


### 🐞 Bug Fixes

* **animation:** lose spin animation ([dd72b56](https://github.com/vexip-ui/vexip-ui/commit/dd72b564393fbd9600a9eef2f0a74b90d4029cc9))
* **button:** loading icon missing collapse transion ([f713351](https://github.com/vexip-ui/vexip-ui/commit/f713351aa9dea125bcd6d04e1589588bcc3199b9))
* **collapse-transition:** appear props ([46a09b5](https://github.com/vexip-ui/vexip-ui/commit/46a09b521caf1996b0b080ad18bd167b6448e293))
* **menu:** can not support horizontal mode ([d7b9b38](https://github.com/vexip-ui/vexip-ui/commit/d7b9b38b48fa44eb0c6562387f029ef2dc4ad0b9))
* **portal:** render teleport after mounted next tick ([8971a9b](https://github.com/vexip-ui/vexip-ui/commit/8971a9b493056e212c3da1043008ec339be69114))
* **scroll:** ensure wrapper and content element ([6e0f0de](https://github.com/vexip-ui/vexip-ui/commit/6e0f0deeec7c27d0224869b4a324779858ea4d78))
* **scss:** themes at import use relative path ([f283e68](https://github.com/vexip-ui/vexip-ui/commit/f283e68986a35a93b6ee7ec75cc12a3e2e2a19c4))



# [1.0.0-alpha.2](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-05-29)


### 🐞 Bug Fixes

* complete missing components export ([cb88cf9](https://github.com/vexip-ui/vexip-ui/commit/cb88cf96056c87a77711b98898c415d54adac577))



# [1.0.0-alpha.1](https://github.com/vexip-ui/vexip-ui/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-05-28)


### 🔨 Code Refactoring

* props validator to arrow function ([a0e9ec0](https://github.com/vexip-ui/vexip-ui/commit/a0e9ec03456bb058830ec819b482ca163b240514))



# 1.0.0-alpha.0 (2021-05-27)



