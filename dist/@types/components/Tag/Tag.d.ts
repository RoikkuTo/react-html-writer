import React from 'react';
import { ContainerEvents } from '../../hooks/usePencil';
import { PrimaryComponent, HTMLWriterTheme } from '../../components/types';
interface TagPropsCore {
    name: string;
    attr?: Tobj<string>;
    theme?: HTMLWriterTheme;
    open?: boolean;
    children?: React.ReactNode;
}
declare type TagProps = TagPropsCore & PrimaryComponent & ContainerEvents;
export default function Tag({ name, open, attr, loop, theme, shouldWrite, shouldClean, isChild, isIndented, children, onEnd }: TagProps): JSX.Element;
export {};
//# sourceMappingURL=Tag.d.ts.map