import { PropOptions } from 'vue';
export interface Config {
    defaults: {
        [x: string]: any;
    };
    [x: string]: any;
}
export declare const config: Config;
export declare function useConfigurableProps(props: {
    [x: string]: PropOptions;
}): {
    [x: string]: PropOptions;
};
