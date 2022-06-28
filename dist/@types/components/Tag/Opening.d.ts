/// <reference types="react" />
import { ContainerEvents } from '../../hooks/usePencil';
interface OpeningProps {
    name: string;
    attr: obj;
    shouldWrite: boolean;
    shouldClean: boolean | number;
    shouldDisplayCursor: boolean;
    isIndented?: boolean;
}
export default function Opening({ name, attr, shouldWrite, shouldClean, shouldDisplayCursor, isIndented, onEnd }: OpeningProps & ContainerEvents): JSX.Element;
export {};
//# sourceMappingURL=Opening.d.ts.map