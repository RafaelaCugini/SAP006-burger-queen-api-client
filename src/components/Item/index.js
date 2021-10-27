import React from "react";
import './index.css'

export function Item({
    children,
    className
}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}