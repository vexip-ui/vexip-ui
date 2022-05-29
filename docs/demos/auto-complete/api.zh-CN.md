## API

### 属性

| 名称         | 类型              | 说明                                                                                       | 默认值    |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------ | --------- |
| value        | String \| Number  | Input 控件的值                                                                             | ''        |
| options      | Array             | 用配置生成 Option，元素可以是字符串或者符合 `{ label, value }` 的对象                      | []        |
| filter       | Boolean, Function | 过滤 Option 的方法，参数为每个选项的值和当前输入框中的值，传入 `ture` 时会使用内置比较方法 | null      |
| prefix       | String            | 前缀图标的名称，使用前缀插槽时无效                                                         | ''        |
| prefix-color | String            | 前缀内容的颜色，会影响前缀插槽                                                             | ''        |
| suffix       | String            | 后缀图标的名称，使用后缀插槽时无效                                                         | ''        |
| suffix-color | String            | 后缀内容的颜色，会影响后缀插槽                                                             | ''        |
| placeholder  | String            | Input 控件占位符                                                                           | null      |
| size         | String            | Input 控件大小，可选值为 `small`、`default`、`large`                                       | 'default' |
| state        | String            | 输入框的状态，可选值为 `default`、`success`、`error`、`warning`                            | 'default' |
| disabled     | Boolean           | 是否禁用                                                                                   | false     |
| can-drop     | Boolean           | 是否允许下拉显示                                                                           | true      |
| placement    | String            | 选项列表出现的位置，可选值同 Popper.js                                                     | 'bottom'  |
| clearable    | Boolean           | 设置是否可以清空值                                                                         | false     |
| ignore-case  | Boolean           | 在使用内置的过滤时，设置是否忽略大小写                                                     | false     |

### 事件

| 名称      | 说明                                        | 参数    |
| --------- | ------------------------------------------- | ------- |
| on-input  | 当在 Input 控件中输入触发，返回当前输入的值 | value   |
| on-toggle | 当候选列表 visible 状态改变时，返回当前状态 | visible |
| on-change | 当值改变后并焦点消失时触发，返回当前的值    | value   |
| on-select | 当使用选项时触发，返回当前的值              | value   |
| on-enter  | 当按下回车时触发，返回当前的值              | value   |
| on-clear  | 当使用清空按钮清空时触发，无返回值          | -       |

### 插槽

| 名称    | 说明                                                                                                                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | 选项列表的插槽，使用插槽传入选项会使内置的选项过滤、按键选值等功能失效，需要手动实现这些功能                                                                                            |
| control | 输入控件的插槽，接受 `value`、`onClick`、`onInput`、`onChange`、`onEnter`、`onClear` 六个参数，分别为：当前值、点击事件回调、输入事件回调、变化事件回调、按回车事件回调、清空值事件回调 |
