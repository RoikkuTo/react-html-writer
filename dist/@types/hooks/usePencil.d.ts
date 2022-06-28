declare type pencilTarget = {
    idx: number;
    keys: string[];
    readonly key: string;
};
export interface ContainerEvents {
    onStart?: () => void;
    onChange?: (i: number) => void;
    onPause?: () => void;
    onEnd?: () => void;
    deps?: any[];
}
export interface PencilEvents {
    onStart?: (pencilTarget: pencilTarget) => void;
    onPause?: (pencilTarget: pencilTarget) => void;
    onEnd?: (pencilTarget: pencilTarget) => void;
    deps?: any[];
}
export default function usePencil<T extends Tobj<string>>(content: T, e?: PencilEvents): {
    pencil: {
        [k: string]: string;
    };
    play: (delay?: number | boolean | undefined) => void;
    pause: () => void;
    clean: () => void;
    pencilTarget: {
        idx: number;
        keys: string[];
        readonly key: string;
    };
    isRunning: boolean;
    isPaused: boolean;
};
export {};
//# sourceMappingURL=usePencil.d.ts.map