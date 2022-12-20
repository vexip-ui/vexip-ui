### 懒加载

添加 `lazy` 属性可以开启懒加载。

默认会使用 `<img>` 的原生 `loading` 属性，在不支持的情况下将回退至使用 `IntersectionObserver`。
