declare type FuzzyOptions = string | {
    [x: string]: any;
};
export declare class MessageManager {
    name: string;
    defaults: {
        [x: string]: any;
    };
    private _instance;
    constructor();
    open(content: FuzzyOptions, duration: number): () => void;
    close(key: string | number): void;
    info(content: FuzzyOptions, duration: number): () => void;
    success(content: FuzzyOptions, duration: number): () => void;
    warning(content: FuzzyOptions, duration: number): () => void;
    error(content: FuzzyOptions, duration: number): () => void;
    config({ placement, ...others }: {
        [x: string]: any;
    }): void;
    clone(): MessageManager;
    clearAll(): void;
    private _getInstance;
    private _open;
}
declare const _default: MessageManager;
export default _default;
