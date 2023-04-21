# Avatar

The primary sign of an user, which can be displayed using picture, icon or text.

## Demos

:::demo avatar/basis

### Basis Usage

Three sizes are built in, or you can set `size` to a specific size.

:::

:::demo avatar/circle

### Image Avatar

Add the `circle` prop to make the avatar circle.

:::

:::demo avatar/icon

### Icon Avatar

Pass an icon to the `icon` prop to use the icon as an avatar.

Set the value of `icon-scale` prop to adjust the scaling of the icon.

:::

:::demo avatar/text

### Text Avatar

Using the default slot allows using text as an avatar, and the text is automatically scaled based on the avatar size.

You can combine the `gap` prop to set the padding on both sides of the avatar.

:::

:::demo avatar/badge

### With Badge

Can be combined with Badge component.

:::

:::demo avatar/error

### Fallback

When using an image, an error event will be emiited if the image load fails.

it will try to reload using the value as the source address if you set `fallback-src` prop.

:::

:::demo avatar/group

### Avatar Group

Combined with the AvatarGroup component, you can flexibly create avatar groups.

:::

:::demo avatar/tip

### Custom Tip

the content of the tip bubble can be customized via the `tip` slot when using avatar group.

:::

:::demo avatar/vertical

### Vertical Group

Add the `vertical` prop to make the avatar group vertical.

:::

## API

### Avatar Props

| Name         | Type                                                       | Description                                                                                        | Default     | Since |
| ------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- | ----- |
| size         | `number \| 'small' \| 'default' \| 'large'`                | The size of the avatar, the size of the group is used first when it is applied to the avatar group | `'default'` | -     |
| src          | `string`                                                   | The source address of the avatar image                                                             | `''`        | -     |
| icon         | `Record<string, any>`                                      | The icon object of the avatar                                                                      | `null`      | -     |
| circle       | `boolean`                                                  | Set whether the avatar is a circle                                                                 | `false`     | -     |
| alt          | `string`                                                   | Set the `alt` attribute of the avatar image                                                        | `''`        | -     |
| fit          | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | Set how to fill the image of the avatar, same as `object-fit` of `css`                             | `'cover'`   | -     |
| src-set      | `string`                                                   | Set the `srcset` attribute of the avatar image                                                     | `''`        | -     |
| gap          | `number`                                                   | Set the `px` value of the left and right inner borders of the text avatar                          | `4`         | -     |
| icon-scale   | `number`                                                   | Set the scaling value of the avatar icon                                                           | `1.4`       | -     |
| fallback-src | `string`                                                   | The fallback source address when the avatar image fails to load                                    | `''`        | -     |
| color        | `string`                                                   | Set the color of the icon and text of the avatar                                                   | `null`      | -     |
| background   | `string`                                                   | Set the background color of the avatar                                                             | `null`      | -     |

### Alert Events

| Name  | Description                                                       | Parameters       | Since |
| ----- | ----------------------------------------------------------------- | ---------------- | ----- |
| error | Emitted when the image used fails to load, returns an error event | `(event: Event)` | -     |

### Alert Slots

| Name    | Description                                                                                                                        | Parameters | Since |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| default | The text content slot of the avatar, it is valid only when the image is not used or the image is invalid, and the icon is not used | -          | -     |

### AvatarGroup Props

| Name            | Type                                                                                                  | Description                                                                                     | Default     | Since |
| --------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- | ----- |
| size            | `number \| 'small' \| 'default' \| 'large'`                                                           | Set the size of the avatar in the group                                                         | `'default'` | -     |
| options         | `Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>` | avatar group options                                                                            | `[]`        | -     |
| circle          | `boolean`                                                                                             | The size of the avatar group, which will override the size property of the avatars in the group | `false`     | -     |
| max             | `number`                                                                                              | Set the maximum number of avatars to display                                                    | `null`      | -     |
| show-tip        | `boolean`                                                                                             | Set whether to show the tip bubble for the excess part                                          | `false`     | -     |
| tip-trigger     | `'hover' \| 'click'`                                                                                  | How to trigger the tip bubble                                                                   | `'hover'`   | -     |
| vertical        | `boolean`                                                                                             | Set whether the avatar group is arranged vertically                                             | `false`     | -     |
| offset          | `number`                                                                                              | Set the offset of the avatar in the group                                                       | `null`      | -     |
| rest-color      | `string`                                                                                              | Set the icon and text color of the extra avatar                                                 | `null`      | -     |
| rest-background | `string`                                                                                              | Set the background color of the rest-background avatar                                          | `null`      | -     |

### AlertGroup Slots

| Name    | Description                                                                         | Parameters                                                                                                                         | Since |
| ------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- |
| default | Slot for regular display avatar                                                     | `{ option: ({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>, index: number }`          | -     |
| rest    | Slot for overshoot avatar, receiving overshoot options and the number of overshoots | `{ options: Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>, count: number }`  | -     |
| tip     | Slot for the tip bubble, receiving options for the excess and the number of excess  | `{ options: Array<({ src: string } \| { icon: Record<string, any> } \| { text: string } ) & Record<string, any>>, count: number }` | -     |
