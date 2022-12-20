### Preset Types

```ts
type ImageObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
type ImageSkeletonProps = Pick<
  SkeletonProps,
  'tag' | 'activated' | 'iconScale' | 'imageIcon'
> & {
  class?: ClassType,
  StyleType?: StyleType
}
```

### Image Props

| Name            | Type                            | Description                                                                              | Default   | Since |
| --------------- | ------------------------------- | ---------------------------------------------------------------------------------------- | --------- | ----- |
| src             | `string`                        | The image source                                                                         | `''`      | -     |
| fallback-src    | `string`                        | The fallback source when the image load fails                                            | `''`      | -     |
| alt             | `string`                        | image description                                                                        | `''`      | -     |
| fit             | `ImageObjectFit`                | Set the image how to fill, same as `object-fit` of `css`                                 | `'cover'` | -     |
| width           | `string \| number`              | The width of image                                                                       | `''`      | -     |
| height          | `string \| number`              | The height of image                                                                      | `''`      | -     |
| img-attrs       | `Record<string, any>`           | Set attributes of the inner `<img>`                                                      | `{}`      | -     |
| lazy            | `string`                        | Whether to enable lazy load                                                              | `false`   | -     |
| root            | `unknown`                       | Same as `root` option of `IntersectionObserver`                                          | `null`    | -     |
| root-margin     | `string`                        | Same as `rootMargin` option of `IntersectionObserver`                                    | `''`      | -     |
| preview         | `boolean`                       | Whether to enable preview                                                                | `false`   | -     |
| skeleton        | `boolean \| ImageSkeletonProps` | Whether to fill a skeleton when loading                                                  | `false`   | -     |
| placeholder     | `string`                        | The placeholder content when loading                                                     | `''`      | -     |
| error-tip       | `string`                        | The tip content when load error                                                          | `''`      | -     |
| radius          | `number`                        | Set the border radius of the image                                                       | `0`       | -     |
| border          | `boolean \| string`             | Whether the image has border, support passing a color string to specify the border color | `false`   | -     |
| preview-src     | `string`                        | The preview source of image                                                              | `''`      | -     |
| viewer-transfer | `boolean \| string`             | Set the `transfer` prop of the image viewer                                              | `false`   | -     |

### Image Events

| Name    | Description                                                          | Parameters       | Since |
| ------- | -------------------------------------------------------------------- | ---------------- | ----- |
| load    | Emitted when the image is loaded, returns the event object           | `(event: Event)` | -     |
| error   | Emitted when the image loading fails, return event object            | `(event: Event)` | -     |
| preview | Emitted when the image is previewed, returns the used preview source | `(src: string)`  | -     |

### Image Slots

| Name        | Description                                                   | Parameters        | Since |
| ----------- | ------------------------------------------------------------- | ----------------- | ----- |
| placeholder | The slot for the placeholder content when the image is loaded | -                 | -     |
| error       | The slot for the image error content                          | -                 | -     |
| preview     | The slot for content of the image is previewed                | `{ src: string }` | -     |

### ImageGroup Props

| Name            | Type                | Description                                 | Default | Since |
| --------------- | ------------------- | ------------------------------------------- | ------- | ----- |
| show-all        | `boolean`           | Whether to show all images                  | `false` | -     |
| preview         | `boolean`           | Whether to enable preview                   | `false` | -     |
| viewer-transfer | `boolean \| string` | Set the `transfer` prop of the image viewer | `false` | -     |

### ImageGroup Events

| Name    | Description                                                                                 | Parameters                         | Since |
| ------- | ------------------------------------------------------------------------------------------- | ---------------------------------- | ----- |
| preview | Emitted when an image is previewed, returns the used preview source and preview source list | `(src: string, srcList: string[])` | -     |

### ImageGroup Slots

| Name    | Description                                   | Parameters        | Since |
| ------- | --------------------------------------------- | ----------------- | ----- |
| default | The slot for image group content              | -                 | -     |
| preview | The slot for content of an image is previewed | `{ src: string }` | -     |

### ImageViewer Props

| Name     | Type                 | Description                                                                                               | Default | Since |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------- | ------- | ----- |
| active   | `boolean`            | Set whether the image viewer is displayed, you can use `v-model` two-way binding                          | `false` | -     |
| index    | `number`             | The index of the currently viewed image, you can use `v-model` two-way binding                            | `0`     | -     |
| srcs     | `string \| string[]` | The source list of viewed images                                                                          | `''`    | -     |
| transfer | `boolean \| string`  | Set the rendering position of the image viewer, when set to `true`, it will render to `<body>` by default | `false` | -     |

### ImageViewer Events

| Name   | Description                                                                                         | Parameters                     | Since |
| ------ | --------------------------------------------------------------------------------------------------- | ------------------------------ | ----- |
| toggle | Emitted when the active state of the image viewer changes, returns the current active state         | `(active: boolean)`            | -     |
| change | Emitted when the viewed image changes, returns the index and source of the currently viewed image   | `(index: number, src: string)` | -     |
| prev   | Emitted when viewing the previous image, returns the index and source of the currently viewed image | `(index: number, src: string)` | -     |
| next   | Emitted when viewing the next image, returns the index and source of the currently viewed image     | `(index: number, src: string)` | -     |
| close  | Emitted when close is triggered by the close button, no return value                                | -                              | -     |
| show   | Emitted when the image viewer is opened and the transition effect ends, no return value             | -                              | -     |
| hide   | Emitted when the image viewer is closed and the transition effect ends, no return value             | -                              | -     |

### ImageViewer Slots

| Name    | Description                      | Parameters              | Since |
| ------- | -------------------------------- | ----------------------- | ----- |
| default | The slot for viewed content      | -                       | -     |
| prev    | The slot for the previous button | `{ disabled: boolean }` | -     |
| next    | The slot for the next button     | `{ disabled: boolean }` | -     |
| close   | The slot for the close button    | -                       | -     |
