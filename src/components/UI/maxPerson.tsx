"use client";

import { useState, useEffect } from "react";

export default function MaxPersons() {
    const [maxPersons, setMaxPersons] = useState<number>(10);

    useEffect(() => {
        const storedValue = localStorage.getItem('MaxPersons');
        const parsedValue = storedValue ? parseInt(storedValue, 10) : 10;
        const safeValue = isNaN(parsedValue) || parsedValue < 1 ? 10 : parsedValue;

        setMaxPersons(safeValue);
    }, []);

    const updateMaxPersons = (newValue: number) => {
        const safeValue = newValue < 1 ? 1 : newValue;
        setMaxPersons(safeValue);
        localStorage.setItem('MaxPersons', safeValue.toString());
    };
    return (
        <div>
            <div className="font-semibold text-base mb-3">Допустимое количество человек</div>
            <div className="flex space-x-1">
                <button
                    className="h-10 w-10 bg-gray-200 text-black text-2xl rounded-4xl flex items-center justify-center hover:cursor-pointer"
                    onClick={() => updateMaxPersons(maxPersons - 1)}
                    disabled={maxPersons <= 1}
                >-</button>
                <div className="flex mx-2">
                    <input
                        type="text"
                        value={maxPersons.toString()}
                        readOnly
                        className="w-15 h-10 border border-gray-300 rounded-lg text-center font-medium text-base focus:ring-0 focus:border-black"
                    />
                </div>
                <button
                    className="h-10 w-10 bg-gray-200 text-black text-2xl rounded-4xl flex items-center justify-center hover:cursor-pointer"
                    onClick={() => updateMaxPersons(maxPersons + 1)}
                >+</button>
            </div>
        </div>
    );
}