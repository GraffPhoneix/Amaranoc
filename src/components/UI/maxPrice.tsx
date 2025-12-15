"use client";

import { useEffect, useState } from "react";
import localConfigs from "@.../configs/local.configs";

const DEFAULT_TYPE = "AMD";

export default function MaxPrice() {
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [moneyType, setMoneyType] = useState<string>(DEFAULT_TYPE);

    const getCourse = (type: string) => (localConfigs.MoneyCourses as Record<string, number>)[type] || 1;

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (
            localStorage.getItem('MinPrice') === null ||
            localStorage.getItem('MaxPrice') === null ||
            localStorage.getItem('MoneyType') === null
        ) {
            localStorage.setItem('MinPrice', '');
            localStorage.setItem('MaxPrice', '');
            localStorage.setItem('MoneyType', 'AMD');
        }


        const storedMoney = localStorage.getItem("MoneyType");
        const money =
            storedMoney && (localConfigs.MoneyCourses as Record<string, number>)[storedMoney]
                ? storedMoney
                : DEFAULT_TYPE;

        const course = getCourse(money);
        const baseMin = parseFloat(localStorage.getItem("MinPrice") || "0") || 0;
        const baseMax = parseFloat(localStorage.getItem("MaxPrice") || "0") || 0;

        setMoneyType(money);
        setMinPrice(baseMin > 0 ? Math.round(baseMin / course).toString() : "");
        setMaxPrice(baseMax > 0 ? Math.round(baseMax / course).toString() : "");
    }, []);

    function changePriceValue(newMoneyType: string) {
        if (typeof window === "undefined") {
            setMoneyType(newMoneyType);
            setMinPrice("");
            setMaxPrice("");
            return;
        }

        const newCourse = getCourse(newMoneyType);

        const baseMin = parseFloat(localStorage.getItem("MinPrice") || "0") || 0;
        const baseMax = parseFloat(localStorage.getItem("MaxPrice") || "0") || 0;

        const newDisplayMin = baseMin > 0 ? Math.round(baseMin / newCourse).toString() : "";
        const newDisplayMax = baseMax > 0 ? Math.round(baseMax / newCourse).toString() : "";

        localStorage.setItem("MoneyType", newMoneyType);
        setMoneyType(newMoneyType);
        setMinPrice(newDisplayMin);
        setMaxPrice(newDisplayMax);
    }

    const handlePriceChange = (key: "MinPrice" | "MaxPrice", value: string) => {
        const setPrice = key === "MinPrice" ? setMinPrice : setMaxPrice;
        setPrice(value);

        if (typeof window === "undefined") return;

        const parsedValue = parseFloat(value);
        const course = getCourse(moneyType);
        const basePrice = isNaN(parsedValue) ? 0 : parsedValue * course;
        localStorage.setItem(key, basePrice.toString());
    };

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-base">Цена</div>
                <div className="flex space-x-2">
                    {Object.keys(localConfigs.MoneyCourses).map((type: string) => (
                        <button
                            key={type}
                            suppressHydrationWarning
                            className={`h-8 w-8 rounded-full border border-gray-300 text-gray-700 font-medium text-xs flex items-center justify-center hover:cursor-pointer ${moneyType === type ? "bg-black text-white" : "bg-white text-black"
                                }`}
                            onClick={() => changePriceValue(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <input
                    type="text"
                    placeholder="От"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-center focus:ring-0 focus:border-black"
                    value={minPrice}
                    onChange={(e) => handlePriceChange("MinPrice", e.target.value)}
                />
                <div className="text-gray-500">-</div>
                <input
                    type="text"
                    placeholder="До"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-center focus:ring-0 focus:border-black"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange("MaxPrice", e.target.value)}
                />
            </div>
        </div>
    );
}
