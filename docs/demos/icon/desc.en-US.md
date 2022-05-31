Vexip UI uses `@vexip-ui/icons` as the icon library, which is based on the free icons of [Font Awesome](https://fontawesome.com/) 6.x and encapsulates its svg into vue components.

You can look up the icons directly on this [page](https://fontawesome.com/search?m=free) (they have always named the icons weird).

Of course you can place any svg content directly under the Icon component slot.

:::warning
All built-in icons of Font Awesome are scaled by 0.85x by default in this library, the original icons are a bit large.
:::

Icon component name is transformed according to certain rules from the original name which in the search page:

- Normally, icon is default from solid type, it is changed to pascal-case from kebab-case (eg. `angle-down` -> `AngleDown`)
- If you want to use the `regular` or `brands` types, you can add a suffix `R` or `B` in the end of component name (eg. `rugular/bell` -> `BellR`, `brands/github` -> `GithubB`)
- Some icons is starts with number, you need to add a prefix `I` in the front of component name (eg. `7` -> `I7`, `brands/500px` -> `I500pxB`)
