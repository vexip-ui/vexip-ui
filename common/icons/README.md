# @vexip-ui/icons

This package provides svg icons witch vue component (`.vue`), its icons are base the free icons of `fontawesome@6`.

## Usage

You can search icons in this [page](https://fontawesome.com/search?m=free).

Icon component name is transformed according to certain rules from the original name which in the search page:

- Normally, icon is default from solid type, it is changed to pascal-case from kebab-case (eg. `angle-down` -> `AngleDown`)
- If you want to use the `regular` or `brands` types, you can add a suffix `R` or `B` in the end of component name (eg. `rugular/bell` -> `BellR`, `brands/github` -> `GithubB`)
- Some icons start with number, you need to add a prefix `I` in the front of component name (eg. `7` -> `I7`, `brands/500px` -> `I500pxB`)

```ts
import { AngleDown, BellR, GithubB, I500pxB } from '@vexip-ui/icons'
```

> Notes: All icons is default scale to 0.85x (0.85em), because they are so large.
