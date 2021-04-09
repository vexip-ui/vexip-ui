interface TransferNode extends Element {
    __transferNode?: Element;
}
interface EventPayload extends EventInit {
    type: string;
    [prop: string]: any;
}
export declare const USE_TOUCH: boolean;
export declare const CLICK_TYPE: string;
export declare const CLICK_OUTSIDE = "clickoutside";
export declare function observe(el: TransferNode, types: string | string[]): void;
export declare function disconnect(el: TransferNode, types: string | string[]): void;
export declare function dispatchEvent(el: TransferNode, payload: EventPayload, Event?: {
    new (type: string, eventInitDict?: EventInit | undefined): Event;
    prototype: Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
}): boolean;
export {};
