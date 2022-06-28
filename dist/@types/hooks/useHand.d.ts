/// <reference types="react" />
import { ContainerEvents } from './usePencil';
export default function useHand(init: number, max: number, e?: Exclude<ContainerEvents, 'onPause'>): {
    hand: number;
    init: number;
    max: number;
    setHand: import("react").Dispatch<import("react").SetStateAction<number>>;
    isFinished: boolean;
    incrementHand: (condition?: boolean | ((prev: number, init: number) => boolean)) => void;
    derementHand: (condition: boolean | ((prev: number, init: number) => boolean)) => void;
    reset: () => void;
};
//# sourceMappingURL=useHand.d.ts.map