interface AnyObject {
    [prop: string]: any;
}
interface AnyFunction {
    (...any: any[]): any;
}
export declare function isNull(any: unknown): any is null | undefined;
export declare function isDefined(any: unknown): boolean;
export declare function isPromise(any: unknown): any is Promise<any>;
export declare function isMethod(any: unknown): any is (...args: any[]) => any;
export declare function toNumber(value: number | string): number;
export declare function noop(): void;
/**
 * 生成一个 range 数组
 * @param {Number} size 大小
 * @param {Number} start 开始的数值
 * @param {Number} step 跨度
 */
export declare function range(size: number, start?: number, step?: number): number[];
/**
 * 获取变量类型
 * @param {any} any 任意变量
 * @returns {String} 小写的类型名字
 */
export declare function getType(any: unknown): string;
export declare function broadcast(context: Vue, componentName: string, eventName: string, ...params: any[]): void;
export declare function dispatch(context: Vue, componentName: string, eventName: string, ...params: any[]): void;
export declare function findComponentUpward(context: Vue, componentName: string): Vue;
export declare function findComponentDownward(context: Vue, componentName: string): Vue | null;
export declare function findComponentsDownward(context: Vue, componentName: string): Vue[];
/**
 * 将数字格式化为三位阶
 * @param {Number} number 需要格式化的数字
 */
export declare function formatNumber(number: number): string;
/**
 * 深度拷贝对象或数组 (避免一层死循环)
 * @param {Object|Array} obj 需要拷贝的对象或数组
 * @returns {Object|Array} 克隆后的对象或数组
 */
export declare function deepClone(obj: AnyObject | any[]): AnyObject | any[];
/**
 * 将一个实数扩大一定的倍数并保留一定的小数
 * @param {Number} number 要处理的实数
 * @param {Number} multiple 要扩大的倍数
 * @param {Number} decimal 要保留的小数
 */
export declare function multipleFixed(number: number, multiple: number, decimal: number): number;
/**
 * 按照一定顺序的属性对数据进行分组
 * @param {Array} list 需要分数的数据
 * @param {String|Array}} props 需要按顺序分组的属性
 */
export declare function groupByProps(list: any[], props?: string[] | string): AnyObject;
interface TreeOptions {
    keyField?: string;
    childField?: string;
    parentField?: string;
}
/**
 * 转换扁平结构为树形结构
 * @param {Array} list 需要转换的扁平数据
 * @param {Object} options 转化配置项
 */
export declare function transformTree(list: any[], options?: TreeOptions): any[];
/**
 * 转换树形结构为扁平结构
 * @param {Array} tree 需要转换的树形数据
 * @param {Object} options 转化配置项
 */
export declare function flatTree(tree: any[], options?: TreeOptions): any[];
interface SortPropOptions {
    key: string;
    method?: AnyFunction;
    accessor?: AnyFunction;
    type?: string;
    params?: any[];
}
/**
 * 根据依赖的属性逐层排序
 * @param {Array} obj 需要排序的数组
 * @param {Array|String} props 排序依赖的属性 key-属性名 method-排序方法 accessor-数据获取方法 type-升降序
 */
export declare function sortByProps(obj: any[], props: string | Array<string | SortPropOptions>): any[];
/**
 * 将一个函数或方法进行节流
 * @param {Function} method 需要节流的方法, 需自行绑定 this
 * @param {Number} delay 节流后的触发间隔, 默认 16 ms (1 帧/秒)
 */
export declare function throttle(method: AnyFunction, delay?: number): AnyFunction;
/**
 * 将一个函数或方法进行防抖
 * @param {Function} method 需要防抖的方法, 需自定绑定 this
 * @param {Number} delay 防抖的限制时间, 默认 300 ms
 */
export declare function debounce(method: AnyFunction, delay?: number): AnyFunction;
/**
 * 移除数组中的某个元素
 * @param {Array} array 需要被移除元素的数组
 * @param {Any} item 需要被移除的元素, 或一个查找方法
 */
export declare function removeArrayItem(array: any[], item: unknown): boolean;
/**
 * 根据路径读取对象中的值 (实现 ?. 的逻辑)
 * @param {Object|Array} obj 需要被读取的对象
 * @param {Array|String} path 读取的路径
 * @param {Boolean} strict 是否开启严格模式 (非法路径报错)
 */
export declare function getValueByPath(obj: AnyObject, path: string | string[], strict?: boolean): unknown;
/**
 * 根据路径设置对象中的值
 * @param {Object|Array} obj 需要被设置的对象
 * @param {Array|String} path 设置的路径
 * @param {Any} value 需要设置的值
 * @param {Boolean} strict 是否开启严格模式 (非法路径报错)
 */
export declare function setValueByPath(obj: AnyObject, path: string | string[], value: unknown, strict?: boolean): boolean;
/**
 * 根据长度生成一串随机的字符串
 * @param {Number} length 字符串的长度
 */
export declare function getRandomString(length?: number): string;
interface ScrollElement {
    scrollTo(x: number, y: number): void;
    [prop: string]: any;
}
export declare function animateScrollTo(el: ScrollElement, from: number, to: number, duration: number, callback: unknown): void;
export declare function toCamelCase(value: string): string;
export {};
