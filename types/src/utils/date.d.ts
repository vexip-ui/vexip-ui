export declare type Dateable = number | string | Date;
export declare const SECOND_ON_MILLS = 1000;
export declare const MINUTE_ON_SECONDS = 60;
export declare const MINUTE_ON_MILLS: number;
export declare const HOUR_ON_MINUTES = 60;
export declare const HOUR_ON_SECONDS: number;
export declare const HOUR_ON_MILLS: number;
export declare const DAY_ON_HOURS = 24;
export declare const DAY_ON_MINUTES: number;
export declare const DAY_ON_SECONDS: number;
export declare const DAY_ON_MILLIS: number;
export declare const WEEK_ON_DAYS = 7;
export declare const WEEK_ON_HOURS: number;
export declare const WEEK_ON_MINUTES: number;
export declare const WEEK_ON_SECONDS: number;
export declare const WEEK_ON_MILLIS: number;
export declare const QUARTER_ON_MONTHS = 3;
export declare const YEAR_ON_QUARTERS = 4;
export declare const YEAR_ON_MONTHS: number;
export declare function toDate(any: Dateable): Date;
/**
 * 将日期格式化成指定格式
 * @param {Date} date 需要格式化的Date对象
 * @param {String} format 格式化结构 年-y 月-M 日-d 时-H 分-m 秒-s 季度-q
 * @returns {String} 格式化后的日期
 */
export declare function format(date: Dateable, pattern?: string): string;
export declare function getQuarter(date: Dateable): number;
export declare function getChineseWeek(date: Date): string;
export declare function addMilliseconds(date: Dateable, amount: number): Date;
export declare function addSeconds(date: Dateable, amount: number): Date;
export declare function addMinutes(date: Dateable, amount: number): Date;
export declare function addHours(date: Dateable, amount: number): Date;
export declare function addHalfDays(date: Dateable, amount: number): Date;
export declare function addDays(date: Dateable, amount: number): Date;
export declare function addWeeks(date: Dateable, amount: number): Date;
export declare function addMonths(date: Dateable, amount: number): Date;
export declare function addQuarters(date: Dateable, amount: number): Date;
export declare function addYears(date: Dateable, amount: number): Date;
/**
 * 生成一个日期 range
 * @param {Dateable} start 开始日期
 * @param {Number} size range 的大小, 默认 42 (一般电子日历为 6 行 7 列)
 * @param {Number} step range 的跨幅
 */
export declare function rangeDate(start: Dateable, size?: number, step?: number): Date[];
/**
 * 生成一个月份 range
 * @param {Dateable} start 开始日期
 * @param {Number} size range 的大小, 默认 12 (一年)
 * @param {Number} step range 的跨幅
 */
export declare function rangeMonth(start: Dateable, size?: number, step?: number): Date[];
export declare function getLastSunday(date: Date): Date;
export declare function startOfSecond(date: Dateable): Date;
export declare function startOfMinute(date: Dateable): Date;
export declare function startOfHour(date: Dateable): Date;
export declare function startOfDay(date: Dateable): Date;
export declare function endOfDay(date: Dateable): Date;
/**
 * 获取当前时间所属周的第一天
 * @param {Date|Number|String} date 需要解析的时间
 * @param {Number} startOn 设定周的第一天
 */
export declare function startOfWeek(date: Dateable, startOn?: number): Date;
export declare function isLeepYear(date: Dateable): boolean;
/**
 * 获取当前时间所属月的第一天
 * @param {Date|Number|String} date 需要解析的时间
 * @param {Number} startOn 设定一个月的第一天
 */
export declare function startOfMonth(date: Dateable, startOn?: number): Date;
export declare function startOfQuarter(date: Dateable): Date;
/**
 * 获取当前时间所属年的第一天
 * @param {Date|Number|String} date 需要解析的时间
 * @param {Number} startOn 设定年的开始月份
 */
export declare function startOfYear(date: Dateable, startOn?: number): Date;
export declare function differenceMilliseconds(left: Dateable, right: Dateable): number;
export declare function differenceSeconds(left: Dateable, right: Dateable): number;
export declare function differenceMinutes(left: Dateable, right: Dateable): number;
export declare function differenceHours(left: Dateable, right: Dateable): number;
export declare function differenceDays(left: Dateable, right: Dateable): number;
export declare function differenceWeeks(left: Dateable, right: Dateable, weekStartOn?: number): number;
export declare function differenceMonths(left: Dateable, right: Dateable): number;
export declare function differenceQuarters(left: Dateable, right: Dateable): number;
export declare function differenceYears(left: Dateable, right: Dateable): number;
export declare enum CompareAscResult {
    LESS_THEN = -1,
    EQUAL = 0,
    GREATER_THEN = 1
}
export declare enum CompareDescResult {
    LESS_THEN = 1,
    EQUAL = 0,
    GREATER_THEN = -1
}
export declare function compareAsc(left: Dateable, right: Dateable): CompareAscResult;
export declare function compareDesc(left: Dateable, right: Dateable): CompareDescResult;
export declare function differenceFullSeconds(left: Dateable, right: Dateable): number;
export declare function differenceFullMinutes(left: Dateable, right: Dateable): number;
export declare function differenceFullHours(left: Dateable, right: Dateable): number;
export declare function differenceFullDays(left: Dateable, right: Dateable): number;
export declare function differenceFullWeeks(left: Dateable, right: Dateable): number;
export declare function differenceFullMonths(left: Dateable, right: Dateable): number;
export declare function differenceFullQuarters(left: Dateable, right: Dateable): number;
export declare function differenceFullYears(left: Dateable, right: Dateable): number;
