"use client";

import { ChangeEventHandler, ReactNode } from "react";

export default function InputDropdown(
    {
        name,
        value,
        defaultValue,
        multiple,
        onChange,
        children
    }:
    {
        name?: string,
        value?: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        defaultValue?: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        multiple?: boolean
        onChange?: ChangeEventHandler<HTMLSelectElement>,
        children: ReactNode
    }
) {
    const styleString = `
        w-full
        p-1

        focus:bg-slate-700

        outline-none
        border-1
        border-slate-50/20
        focus:border-slate-50

        text-md
        rounded-sm
    `;
    if (value) return (
        <select
            name={name}
            onChange={onChange}
            value={value}
            className={styleString}
            multiple={multiple}
        >
            {children}
        </select>
    );

    if (defaultValue) return (
        <select
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            className={styleString}
            multiple={multiple}
        >
            {children}
        </select>
    );

    return (
        <select
            name={name}
            onChange={onChange}
            className={styleString}
            multiple={multiple}
        >
            {children}
        </select>
    );
}