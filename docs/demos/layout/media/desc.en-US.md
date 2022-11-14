### Media Query

By default, the behavior of the header and aside will change at the `lg` breakpoint, the header will be collapsed after the main content is scrolled, and the aside will be directly collapsed and expanded through the handler.

These behaviors can be customized via the `header-fixed` and `aside-fixed` props.

When passing a boolean value, you can explicitly specify whether the header and aside are always fixed or not, and you can also pass a breakpoint or media query string to specify when the behavior change should occur.

When passing a string, there are two special values `max` and `min`, which are equivalent to `true` and `false`.
