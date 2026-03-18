export type DebounceFunction = (() => void) & { cancel: () => void };

export function debounce<T extends () => void>(fn: T, delay: number): DebounceFunction {
    let timeout: undefined | number;

    const debounce = () => {
        clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            fn();
        }, delay);
    };

    debounce.cancel = () => {
        clearTimeout(timeout);
    };

    return debounce;
}
