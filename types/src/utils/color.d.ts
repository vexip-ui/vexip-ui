interface RGB {
    r: number | string;
    g: number | string;
    b: number | string;
}
export interface RGBColor extends RGB {
    a?: number | string;
    format?: string;
}
export interface RGBAColor extends RGB {
    a: number | string;
    format?: string;
}
interface HSL {
    h: number | string;
    s: number | string;
    l: number | string;
}
export interface HSLColor extends HSL {
    a?: number | string;
    format?: string;
}
export interface HSLAColor extends HSL {
    a: number | string;
    format?: string;
}
interface HSV {
    h: number | string;
    s: number | string;
    v: number | string;
}
export interface HSVColor extends HSV {
    a?: number | string;
    format?: string;
}
export interface HSVAColor extends HSV {
    a: number | string;
    format?: string;
}
export declare type Color = RGBColor | RGBAColor | HSLColor | HSLAColor | HSVColor | HSVAColor | string;
export interface ColorObject {
    rgb: RGBColor;
    hsl: HSLColor;
    hsv: HSVColor;
    hex: string;
    alpha: number | string;
    rgba: RGBAColor;
    hsla: HSLAColor;
    hsva: HSVAColor;
    hex8: string;
    origin: Color;
}
export declare const RGB_REG: RegExp;
export declare const RGBA_REG: RegExp;
export declare const HSL_REG: RegExp;
export declare const HSLA_REG: RegExp;
export declare const HSV_REG: RegExp;
export declare const HSVA_REG: RegExp;
export declare const HEX_REG_3: RegExp;
export declare const HEX_REG_4: RegExp;
export declare const HEX_REG_6: RegExp;
export declare const HEX_REG_8: RegExp;
export declare const NAMES: {
    [name: string]: string;
};
export declare function isColor(value: string): boolean;
export declare function parseStringColor(color: string): Color | null;
export declare function parseColor(color: string | Color): ColorObject;
export declare function parseColorToRgb(originColor: string | Color): RGBColor;
export declare function hslToRgb(h: number | string, s: number | string, l: number | string): RGBColor;
export declare function rgbToHsl(r: number | string, g: number | string, b: number | string): HSLColor;
export declare function hslToHsv(h: number | string, s: number | string, l: number | string): HSVColor;
export declare function hsvToHsl(h: number | string, s: number | string, v: number | string): HSLColor;
export declare function hsvToRgb(h: number | string, s: number | string, v: number | string): RGBColor;
export declare function rgbToHsv(r: number | string, g: number | string, b: number | string): HSVColor;
export declare function rgbToHex(r: number | string, g: number | string, b: number | string, allow3Char?: boolean): string;
export declare function rgbaToHex(r: number | string, g: number | string, b: number | string, a: number | string, allow4Char?: boolean): string;
export {};
