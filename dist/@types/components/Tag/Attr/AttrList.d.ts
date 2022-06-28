/// <reference types="react" />
import { ContainerEvents } from '../../../hooks/usePencil';
interface AttrListProps extends ContainerEvents {
    attr: Tobj<string>;
    shouldWrite: boolean;
    shouldClean: boolean | number;
}
export default function AttrList({ attr, shouldWrite, shouldClean, onEnd }: AttrListProps): JSX.Element;
export {};
//# sourceMappingURL=AttrList.d.ts.map