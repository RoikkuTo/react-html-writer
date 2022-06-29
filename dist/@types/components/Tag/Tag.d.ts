import React from 'react';
import { ContainerEvents } from '../../hooks/usePencil';
import { PrimaryComponent, HTMLWriter } from '../../components/types';
interface TagPropsCore {
    name: string;
    attr?: HTMLWriter.Attr;
    theme?: HTMLWriter.Theme;
    open?: boolean;
    children?: React.ReactNode;
}
declare type TagProps = TagPropsCore & PrimaryComponent & ContainerEvents;
export default function Tag({ name, open, attr, loop, theme, shouldWrite, shouldClean, isChild, isIndented, children, onEnd }: TagProps): JSX.Element;
export {};
//# sourceMappingURL=Tag.d.ts.map