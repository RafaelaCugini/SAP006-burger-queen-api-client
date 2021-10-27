import React from "react";

export function Input({
    value,
    type,
    name,
    inputPlaceholder,
    inputRequired,
    inputClass,
    labelInfo,
    labelValue,
    divForm,
    onChange,
    max,
    data,
    min,

}) {
    return (
        <div className={divForm} data-test-id='input-div'>
            <input
                data-testid={data}
                name={name}
                value={value}
                type={type}
                placeholder={inputPlaceholder}
                required={inputRequired}
                className={inputClass}
                onChange={onChange}
                max={max}
                min={min} />

            <label className={labelInfo}>
                {labelValue}
            </label>
        </div>
    )
}