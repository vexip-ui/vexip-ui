### Async Load

Nodes can async load via `on-async-load` prop. Since `data` is a fully controlled prop, you need to update the `data` prop directly.

You need to return `false` to inform the component when the node failed to load, otherwise the node is considered to be successfully loaded and the node will be marked as loaded.
