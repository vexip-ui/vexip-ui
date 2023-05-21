# BEM Helper

Help you quickly get various BEM names and values.

## Install

```sh
pnpm i @vexip-ui/bem-helper
```

## Usage

Without namespace:

```ts
import { useBEM } from '@vexip-ui/bem-helper'

const bem = useBEM('button')

bem.b() // button
bem.be('icon') // button__icon
bem.bm('active') // button--active
bem.bem('icon', 'active') // button__icon--active
bem.cb() // .button
bem.cv('color') // --button-color
```

With namespace:

```ts
import { useBEM } from '@vexip-ui/bem-helper'

const bem = useBEM('button', 'vxp')

bem.b() // vxp-button
bem.be('icon') // vxp-button__icon
bem.bm('active') // vxp-button--active
bem.bem('icon', 'active') // vxp-button__icon--active
bem.cb() // .vxp-button
bem.cv('color') // --vxp-button-color
```

## Methods

You can view the [definition of types](./src/types.ts). There are detailed comments in this file.

## License

All in [MIT](./LICENSE.md) license.
