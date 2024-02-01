import React from "react";
import './checkbox.scss';

interface CheckboxProps {
    size: 'sm' | 'md'
}

export const BuildCheckbox = ({ size = 'sm' }: CheckboxProps) => {
    return <input type='checkbox' className={`checkbox-input checkbox-${size}`} />
}