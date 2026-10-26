# TimeAgo

## Demos

:::demo time-ago/basis

### Basis Usage

Simplest usage.

:::

:::demo time-ago/interval

### Auto Refresh

Add the `interval` prop to enable auto refresh, by default is `10` seconds once refresh.

You can also pass in a number value greater than or equal to `5` to customize the refresh interval in seconds.

:::

## API

### TimeAgo Props

| Name         | Type                       | Description                                                                                                         | Default                 | Since   |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- |
| datetime     | `string \| number \| Date` | Set the reference time value for relative time                                                                      | `Date.now()`            | -       |
| interval     | `boolean \| number`        | Set refresh interval in seconds                                                                                     | `false`                 | -       |
| title        | `boolean \| string`        | Set whether to display the title or not. When passing in a boolean value, it will be formatted using `title-format` | `false`                 | -       |
| title-format | `string`                   | Set the date format when formatting `title`                                                                         | `'yyyy-MM-dd HH:mm:ss'` | -       |
| locale       | `LocaleConfig['timeAgo']`  | Set the locale config                                                                                               | `null`                  | `2.1.0` |
