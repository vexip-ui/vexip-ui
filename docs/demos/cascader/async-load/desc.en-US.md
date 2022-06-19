### Async Load

Binding a function with `on-async-load` prop enables asynchronous loading mode.

Added `merge-tags` prop in multi-select mode to make parent options selectable if children are not fully loaded.

Note that enabling `merge-tags` in asynchronous loading will cause the control value to be merged into the value of the parent option, which is different from the behavior of non-asynchronous loading.
