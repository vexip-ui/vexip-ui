# [1.1.0](https://github.com/qmhc/vexip-ui/compare/utils@1.0.0...utils@1.1.0) (2022-05-28)


### Bug Fixes

* **utils:** debounceMinor not effective ([0873b28](https://github.com/qmhc/vexip-ui/commit/0873b28f5abcc634226d07c99061f34fa81d03a9))
* **utils:** using string schema to process toFixed ([7135f82](https://github.com/qmhc/vexip-ui/commit/7135f82bcf7a6314b47285fc240aa70a982ed20b))


### Code Refactoring

* icon rewrite to use component ([#22](https://github.com/qmhc/vexip-ui/issues/22)) ([d825637](https://github.com/qmhc/vexip-ui/commit/d82563709def1c65ee548d5ecfb09e296ac6c53a))


### Features

* **color:** add mixColor method ([8c7cdda](https://github.com/qmhc/vexip-ui/commit/8c7cddaa3d2d4c76c186d8d61156c67d32a7bfb6))
* **utils:** add adjustAlpha method ([107023a](https://github.com/qmhc/vexip-ui/commit/107023a83edb7abec8461bcc433cae79f8c83c91))
* **utils:** add createBITree method ([dbf76b2](https://github.com/qmhc/vexip-ui/commit/dbf76b2116e9ca59ce05afa09b06691b2703a2ff))
* **utils:** add debounceFrame, nextTickOnce and nextFrameOnce ([7204479](https://github.com/qmhc/vexip-ui/commit/7204479082899bdfe28bd5ac93aba9b430e49a32))
* **utils:** add isBigInt function ([259a990](https://github.com/qmhc/vexip-ui/commit/259a990e73091bfcc9bfbfe9c8a55fafeece22db))


### BREAKING CHANGES

* All icons have rewrite to svg vue components, package has published to 
`@vexip-ui/icons`, using `<Icon>` default slot to provide the icon svg component instead of before 
way which import from `vexip-ui/icons/**`.



# 1.0.0 (2022-04-26)


### Bug Fixes

* **color-picker:** cannot parse rgba color value ([8f4c57f](https://github.com/qmhc/vexip-ui/commit/8f4c57f4cf2c4ba4ab1b2f6f07f46209b1ff8b82))
* **date-picker:** format should ignore content in quotations ([31d7f16](https://github.com/qmhc/vexip-ui/commit/31d7f1689a1229582f6f2a71ae80e47d63011ac8))
* **utils:** incorrect matching rootId in tree transform ([4e9d253](https://github.com/qmhc/vexip-ui/commit/4e9d2537170761d3a29cdcec63f5443fdb002c95))


### Features

* add locale config ([0a0ec74](https://github.com/qmhc/vexip-ui/commit/0a0ec7487dfc8f89e18a38c50a7e001ea7440209))
* **tree:** add cache-node and root-id props ([13e721e](https://github.com/qmhc/vexip-ui/commit/13e721eb3ff2072ec90c1c38ea82a2c751793c76))


### BREAKING CHANGES

* The original install config are
no longer supported, use `prop` attribute of the new
install config instead.



