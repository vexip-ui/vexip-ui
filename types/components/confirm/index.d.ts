export declare class ConfirmManager {
    name: string;
    defaults: {
        [x: string]: any;
    };
    private _instance;
    constructor();
    open(options?: string | {
        [x: string]: any;
    }, type?: string): Promise<unknown>;
    private _getInstance;
}
declare const _default: ConfirmManager;
export default _default;
