# 样式

> 近期正在进行样式重构，后续的变量会迁移至 Css 原生变量。

Vexip UI 的样式由 `scss` 编写, 并通过抽象全局变量对一些通用样式进行控制。

## 修改样式

通过直接引入 src 下的 style 并预定义一些全局变量, 可以直接全局修改一些通用样式：

```scss
// style/index.scss
// 如果你不需要改变量，则不需要引入 design 模块
@use 'vexip-ui/design' with (
  $vxp-color-primary: #845ef7
);
@use 'vexip-ui/style';
```

随后，引入该样式文件：

```ts
import './style/index.scss'

import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App).use(install).mount('#app')
```

设置后，同名变量将会应用用户定义的值。

## 全局样式变量

下面列出了 Vexip UI 所有的通用样式全局变量：

> 每个组件都会有一些专用的变量，完成的变量列表请浏览 [此处](//github.com/qmhc/vexip-ui/blob/main/design/variables.scss)。

```scss
$vxp-color-black: #000 !default;
$vxp-color-white: #fff !default;

$vxp-color-primary: #339af0 !default;
$vxp-color-primary-light-1: mix($vxp-color-white, $vxp-color-primary, 10%) !default;
$vxp-color-primary-light-2: mix($vxp-color-white, $vxp-color-primary, 20%) !default;
$vxp-color-primary-dark-1: mix($vxp-color-black, $vxp-color-primary, 10%) !default;
$vxp-color-primary-dark-2: mix($vxp-color-black, $vxp-color-primary, 20%) !default;

$vxp-color-info: #3bc9db !default;
$vxp-color-info-light-1: mix($vxp-color-white, $vxp-color-info, 10%) !default;
$vxp-color-info-light-2: mix($vxp-color-white, $vxp-color-info, 20%) !default;
$vxp-color-info-dark-1: mix($vxp-color-black, $vxp-color-info, 10%) !default;
$vxp-color-info-dark-2: mix($vxp-color-black, $vxp-color-info, 20%) !default;

$vxp-color-success: #20c997 !default;
$vxp-color-success-light-1: mix($vxp-color-white, $vxp-color-success, 10%) !default;
$vxp-color-success-light-2: mix($vxp-color-white, $vxp-color-success, 20%) !default;
$vxp-color-success-dark-1: mix($vxp-color-black, $vxp-color-success, 10%) !default;
$vxp-color-success-dark-2: mix($vxp-color-black, $vxp-color-success, 20%) !default;

$vxp-color-warning: #fab005 !default;
$vxp-color-warning-light-1: mix($vxp-color-white, $vxp-color-warning, 10%) !default;
$vxp-color-warning-light-2: mix($vxp-color-white, $vxp-color-warning, 20%) !default;
$vxp-color-warning-dark-1: mix($vxp-color-black, $vxp-color-warning, 10%) !default;
$vxp-color-warning-dark-2: mix($vxp-color-black, $vxp-color-warning, 20%) !default;

$vxp-color-error: #f03e3e !default;
$vxp-color-error-light-1: mix($vxp-color-white, $vxp-color-error, 10%) !default;
$vxp-color-error-light-2: mix($vxp-color-white, $vxp-color-error, 20%) !default;
$vxp-color-error-dark-1: mix($vxp-color-black, $vxp-color-error, 10%) !default;
$vxp-color-error-dark-2: mix($vxp-color-black, $vxp-color-error, 20%) !default;

$vxp-color-content-primary: #212529 !default;
$vxp-color-content-normal: #495057 !default;
$vxp-color-content-secondary: #868e96 !default;
$vxp-color-content-disabled: #adb5bd !default;
$vxp-color-content-placeholder: #ced4da !default;
$vxp-color-content-humble: #dee2e6 !default;
$vxp-color-content-reverse: $vxp-color-white !default;

$vxp-color-border: #ced4da !default;
$vxp-color-border-light-1: #dee2e6 !default;
$vxp-color-border-light-2: #e9ecef !default;
$vxp-color-border-dark-1: #adb5bd !default;
$vxp-color-border-dark-2: #868e96 !default;

// 需要填充的元素的底色
$vxp-color-fill: $vxp-color-white !default;
// 填充了颜色的元素禁用时的填充
$vxp-color-fill-disabled: #dee2e6 !default;
// 填充底色元素 hover 状态的填充
$vxp-color-fill-hover: #e9ecef !default;
// 需要简单区分填充的元素的底色
$vxp-color-fill-background: #f8f9fa !default;
// 需要填充的元素的反色
$vxp-color-fill-reverse: $vxp-color-black !default;

$vxp-font-size: 0.875rem !default;
$vxp-font-size-primary: 1.2em !default;
$vxp-font-size-secondary: 0.85em !default;
$vxp-line-height: 1.5 !default;

$vxp-border-width: 1px !default;
$vxp-border-style: solid !default;
$vxp-border-appearance: $vxp-border-width $vxp-border-style !default;
$vxp-border-base: $vxp-border-appearance $vxp-color-border !default;

$vxp-border-radius-base: 4px !default;
$vxp-border-radius-large: 6px !default;
$vxp-border-radius-small: 2px !default;

$vxp-box-shadow-x-offset: 0 !default;
$vxp-box-shadow-y-offset: 0 !default;
$vxp-box-shadow-blur: 4px !default;
$vxp-box-shadow-appearance: $vxp-box-shadow-x-offset $vxp-box-shadow-y-offset $vxp-box-shadow-blur !default;
$vxp-box-shadow-fouced-appearance: 0 0 0 2px !default;
$vxp-box-shadow-base: $vxp-box-shadow-appearance $vxp-color-border !default;

$vxp-transition-duration: 200ms !default;
$vxp-transition-timing-function: ease !default;
$vxp-transition-base: $vxp-transition-duration $vxp-transition-timing-function !default;
$vxp-transition-color-base: color $vxp-transition-base !default;
$vxp-transition-background-base: background-color $vxp-transition-base !default;
$vxp-transition-border-base: border-color $vxp-transition-base !default;
$vxp-transition-box-shadow-base: box-shadow $vxp-transition-base !default;
$vxp-transition-opacity-base: opacity $vxp-transition-base !default;
$vxp-transition-transform-base: transform $vxp-transition-base !default;

$vxp-z-index-popper: 1000 !default;
$vxp-z-index-masker: 1500 !default;
$vxp-z-index-popup: 2000 !default;
```
