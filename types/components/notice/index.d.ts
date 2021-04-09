declare type FuzzyOptions = string | {
    [x: string]: any;
};
export declare class NoticeManager {
    name: string;
    defaults: {
        [x: string]: any;
    };
    private _instance;
    constructor();
    open(title: FuzzyOptions, content: FuzzyOptions, duration: number): () => void;
    close(key: string | string): void;
    info(title: FuzzyOptions, content: FuzzyOptions, duration: number): () => void;
    success(title: FuzzyOptions, content: FuzzyOptions, duration: number): () => void;
    warning(title: FuzzyOptions, content: FuzzyOptions, duration: number): () => void;
    error(title: FuzzyOptions, content: FuzzyOptions, duration: number): () => void;
    config({ placement, ...others }: {
        [x: string]: any;
    }): void;
    clone(): NoticeManager;
    clearAll(): void;
    private _getInstance;
    private _open;
}
declare const _default: NoticeManager;
export default _default;
