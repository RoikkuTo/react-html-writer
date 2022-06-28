/// <reference types="react" />
import { PencilEvents } from '../../../hooks/usePencil';
interface AttrProps extends PencilEvents {
    content: Record<'key' | 'symbol' | 'quote1' | 'value' | 'quote2', string>;
    shouldWrite: boolean;
    shouldClean: boolean | number;
}
export default function Attr({ content, shouldWrite, shouldClean, onStart, onEnd }: AttrProps): JSX.Element;
export {};
//# sourceMappingURL=Attr.d.ts.map