### TimeAgo Props

| Name         | Type                       | Description                                                                                                         | Default                 | Since |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----- |
| datetime     | `string \| number \| Date` | Set the reference time value for relative time                                                                      | `Date.now()`            | -     |
| interval     | `boolean \| number`        | Set refresh interval in seconds                                                                                     | `false`                 | -     |
| title        | `boolean \| string`        | Set whether to display the title or not. When passing in a boolean value, it will be formatted using `title-format` | `false`                 | -     |
| title-format | `string`                   | Set the date format when formatting `title`                                                                         | `'yyyy-MM-dd HH:mm:ss'` | -     |
