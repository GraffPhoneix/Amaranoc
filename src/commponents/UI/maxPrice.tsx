"use client";

import { useState } from "react";
import localConfigs from "@.../configs/local.configs";

const getInitialMoneyType = (): string => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('MoneyType');
        return storedValue && localConfigs.MoneyCourses.hasOwnProperty(storedValue) ? storedValue : 'AMD';
    }
    return 'AMD';
}

const getInitialPriceValue = (key: 'MinPrice' | 'MaxPrice', initialMoneyType: string): string => {
    if (typeof window !== 'undefined') {
        const storedBaseValue = localStorage.getItem(key);

        if (storedBaseValue) {
            const basePrice = parseFloat(storedBaseValue) || 0;
            const currentCourse = localConfigs.MoneyCourses[initialMoneyType as keyof typeof localConfigs.MoneyCourses];

            if (currentCourse && currentCourse > 0) {
                const displayPrice = basePrice / currentCourse;
                return displayPrice > 0 ? Math.round(displayPrice).toString() : '';
            }
        }
    }
    return '';
}

export default function MaxPrice() {
    const initialMoneyType = getInitialMoneyType();
    const [minPrice, setMinPrice] = useState<string>(getInitialPriceValue('MinPrice', initialMoneyType));
    const [maxPrice, setMaxPrice] = useState<string>(getInitialPriceValue('MaxPrice', initialMoneyType));
    const [moneyType, setMoneyType] = useState(initialMoneyType);

    function changePriceValue(newMoneyType: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('MoneyType', newMoneyType);
            localStorage.setItem('MinPrice', '0')
            localStorage.setItem('MaxPrice', '0')
        }
        setMinPrice('');
        setMaxPrice('');
        setMoneyType(newMoneyType);
    }

    const handlePriceChange = (key: 'MinPrice' | 'MaxPrice', value: string) => {
        const setPrice = key === 'MinPrice' ? setMinPrice : setMaxPrice;
        setPrice(value);

        if (typeof window !== 'undefined') {
            const parsedValue = parseFloat(value);
            const course = localConfigs.MoneyCourses[moneyType as keyof typeof localConfigs.MoneyCourses];

            const basePrice = (isNaN(parsedValue) ? 0 : parsedValue) * (course || 1);
            localStorage.setItem(key, basePrice.toString());
        }
    };

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-base">Цена</div>
                <div className="flex space-x-2">
                    {Object.keys(localConfigs.MoneyCourses).map((type: string) => (
                        <button
                            key={type}
                            className={`h-8 w-8 rounded-full border border-gray-300 text-gray-700 font-medium text-xs flex items-center justify-center hover:cursor-pointer ${moneyType === type ? 'bg-black text-white' : 'bg-white text-black'}`}
                            onClick={() => changePriceValue(type)}
                        >{type}</button>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <input
                    type="text"
                    placeholder="От"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-center focus:ring-0 focus:border-black"
                    value={minPrice}
                    onChange={(e) => handlePriceChange('MinPrice', e.target.value)}
                />
                <div className="text-gray-500">-</div>
                <input
                    type="text"
                    placeholder="До"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-center focus:ring-0 focus:border-black"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange('MaxPrice', e.target.value)}
                />
            </div>
        </div>
    );
}