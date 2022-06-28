import React from 'react';
import { Theme } from 'styled-components';
interface ParentProps {
    theme?: Theme;
    isChild?: boolean;
    children: React.ReactNode;
}
export default function Parent({ isChild, theme, children }: ParentProps): JSX.Element;
export {};
//# sourceMappingURL=Parent.d.ts.map