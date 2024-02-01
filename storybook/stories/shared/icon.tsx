import React, { SVGProps } from "react";
import { FC } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
    pathClass?: string;
    title?: string;
    strokeWidth?: string;
}

const defaultIconProps: IconProps = { size: 24, color: '#808080' };

export const SearchIcon: FC<IconProps> = ({ size, color, ...props }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
SearchIcon.defaultProps = defaultIconProps;

export const CrossIcon: FC<IconProps> = ({ size, color, ...props }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
CrossIcon.defaultProps = defaultIconProps;

export const DoubleChevronLeftIcon: FC<IconProps> = ({ size, color, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M18 17L13 12L18 7M11 17L6 12L11 7" stroke={color} strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>)
}
DoubleChevronLeftIcon.defaultProps = defaultIconProps;

export const DoublChevronRightIcon: FC<IconProps> = ({ size, color, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>)
}
DoublChevronRightIcon.defaultProps = defaultIconProps;

export const ChevronLeftIcon: FC<IconProps> = ({ size, color, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>)
}
ChevronLeftIcon.defaultProps = defaultIconProps;

export const ChevronRightIcon: FC<IconProps> = ({ size, color, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>)
}
ChevronRightIcon.defaultProps = defaultIconProps;
