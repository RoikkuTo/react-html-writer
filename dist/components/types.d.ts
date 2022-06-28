export interface PrimaryComponent {
    shouldWrite?: boolean;
    shouldClean?: boolean | number;
    isChild?: boolean;
    isIndented?: boolean;
    loop?: boolean | number;
}
