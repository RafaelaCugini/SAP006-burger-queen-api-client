import React from "react";

export function Button({
    children,
    type,
    className,
    onClick,
    id,
    //value,
    //label,
    data,
}) {
    return (
        <span data-testid='button'>
            <button
                data-testid={data}
                type={type}
                className={className}
                onClick={onClick}
               // value={value}
                id={id}
                //label={label}
            >
                {children}
            </button>
        </span>
    )
}