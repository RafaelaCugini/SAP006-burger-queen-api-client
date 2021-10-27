import React from "react";
import './index.css';
import './responsive.css'

export function Modal({
    children
}) {

    return (
        <div className="modal">
            {children}
        </div >
    )

}