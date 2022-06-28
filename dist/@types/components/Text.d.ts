import React from 'react';
import { ContainerEvents } from '@lib/hooks/usePencil';
import { PrimaryComponent } from './types';
interface StringPropsCore {
    text: string;
    style?: React.CSSProperties;
}
declare type StringProps = StringPropsCore & PrimaryComponent & ContainerEvents;
export default function Text({ text, style, shouldWrite, shouldClean, isChild, isIndented, loop, onEnd }: StringProps): JSX.Element;
export {};
