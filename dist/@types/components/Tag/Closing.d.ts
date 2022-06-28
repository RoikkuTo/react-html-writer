/// <reference types="react" />
import { ContainerEvents } from '../../hooks/usePencil';
interface ClosingProps {
    name: string;
    shouldWrite: boolean;
    shouldClean: boolean | number;
    shouldDisplayCursor: boolean;
}
export default function Opening({ name, shouldWrite, shouldClean, shouldDisplayCursor, onEnd }: ClosingProps & ContainerEvents): JSX.Element;
export {};
//# sourceMappingURL=Closing.d.ts.map