import React from 'react';
import { ContainerEvents } from '@lib/hooks/usePencil';
import { PrimaryComponent } from '../types';
import { HTMLWriterTheme } from '@lib/types';
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
