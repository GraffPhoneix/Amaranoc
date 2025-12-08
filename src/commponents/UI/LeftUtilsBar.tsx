"use client";

import { useState, useEffect } from "react";
import { getRootData } from "@.../lib/firebase";
import localConfigs from "@.../configs/local.configs";

interface FirebaseData {
    regions: string[];
    [key: string]: any;
}

const getInitialMaxPersons = (): number => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('MaxPersons');
        const parsedValue = storedValue ? parseInt(storedValue, 10) : 1;
        return isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
    }
    return 1;
};

export default function LeftUtils() {
    const [data, setData] = useState<FirebaseData | null>(null);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState<string>('')
    const [maxPrice, setMaxPrice] = useState<string>('')
    const [moneyType, setMoneyType] = useState('AMD')
    const [maxPersons, setMaxPersons] = useState<number>(getInitialMaxPersons);

    useEffect(() => {
        async function loadData() {
            try {
                const rootData: FirebaseData | null = await getRootData();
                setData(rootData);
                const storedRegions = localStorage.getItem('ActiveRegions');

                if (storedRegions) {
                    if (storedRegions === 'all') {
                        setSelectedRegions([]);
                    } else {
                        try {
                            setSelectedRegions(JSON.parse(storedRegions));
                        } catch (e) {
                            console.error("Ошибка парсинга ActiveRegions из LocalStorage:", e);
                            setSelectedRegions([]);
                        }
                    }
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setData(null);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('ActiveRegions') === null) {
            localStorage.setItem("ActiveRegions", '')
        }
    }, []);

    const handleCheckboxChange = (region: string, checked: boolean) => {
        const newSelected = checked
            ? [...selectedRegions, region]
            : selectedRegions.filter((rg) => rg !== region);

        setSelectedRegions(newSelected);
        localStorage.setItem("ActiveRegions", JSON.stringify(newSelected));
    };

    if (loading) {
        return (
            <div className="border border-gray-300 rounded-xl mt-6 p-3.5 ml-43 w-64 h-64">
                <div className="text-gray-500">Загрузка...</div>
            </div>
        );
    }

    function renderRegions() {
        return data!.regions.map((region) => (
            <label key={region} className="flex items-center p-2 h-8 cursor-pointer">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedRegions.includes(region)}
                    onChange={(e) => handleCheckboxChange(region, e.target.checked)}
                />
                <span className="text-gray-600 text-sm">{region}</span>
            </label>
        ));
    }

    function changeLocalPriceValue(newMoneyType: string) {
        type MoneyCoursesKeys = keyof typeof localConfigs.MoneyCourses;
        const currentCourse = localConfigs.MoneyCourses[newMoneyType as MoneyCoursesKeys];
        const calculatedMinPrice = ((parseFloat(minPrice) || 0) * currentCourse).toString();
        const calculatedMaxPrice = ((parseFloat(maxPrice) || 0) * currentCourse).toString();

        if (typeof window !== 'undefined') {
            localStorage.setItem('MinPrice', calculatedMinPrice);
            localStorage.setItem('MaxPrice', calculatedMaxPrice);
        }
    }

    const updateMaxPersons = (newValue: number) => {
        const safeValue = newValue < 1 ? 1 : newValue;
        setMaxPersons(safeValue);
        if (typeof window !== 'undefined') {
            localStorage.setItem('MaxPersons', safeValue.toString());
        }
    };

    return (
        <div className="border border-gray-300 rounded-xl mt-6 p-3.5 ml-43 w-64">
            <div className="flex flex-col h-48 mb-6">
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200 pr-2">
                    {renderRegions()}
                </div>
            </div>

            <hr className="my-4 border-t border-gray-200" />
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-base">Цена</div>
                    <div className="flex space-x-2">
                        {Object.keys(localConfigs.MoneyCourses).map((type: string) => {
                            return (
                                <button
                                    key={type}
                                    className={`h-8 w-8 rounded-full border border-gray-300 text-gray-700 font-medium text-xs flex items-center justify-center hover:cursor-pointer ${moneyType === type ? 'bg-black text-white' : 'bg-white text-black'}`}
                                    onClick={() => {
                                        changeLocalPriceValue(type)
                                        setMoneyType(type)
                                    }}
                                >{type}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <input
                        type="text"
                        placeholder="От"
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-center focus:ring-0 focus:border-black"
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value)
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('MinPrice', (
                                    parseInt(e.target.value) * localConfigs.MoneyCourses[moneyType as keyof typeof localConfigs.MoneyCourses]
                                ).toString())
                            }
                        }}
                    />
                    <div className="text-gray-500">-</div>
                    <input
                        type="text"
                        placeholder="До"
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-center focus:ring-0 focus:border-black"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value)
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('MaxPrice', (
                                    parseInt(e.target.value) * localConfigs.MoneyCourses[moneyType as keyof typeof localConfigs.MoneyCourses]
                                ).toString())
                            }
                        }}
                    />
                </div>
            </div>

            <hr className="my-4 border-t border-gray-200" />

            <div>
                <div className="font-semibold text-base mb-3">Допустимое количество человек</div>
                <div className="flex items-center justify-between space-x-1">
                    <button
                        className="h-10 w-10 bg-gray-100 text-black text-2xl rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
                        onClick={() => {
                            updateMaxPersons(maxPersons - 1);
                        }}
                    >-</button>
                    <div className="flex mx-2">
                        <input
                            type="text"
                            value={maxPersons.toString()}
                            readOnly
                            className="w-full h-10 border border-gray-300 rounded-lg text-center font-medium text-base focus:ring-0 focus:border-black"
                        />
                    </div>
                    <button
                        className="h-10 w-10 bg-gray-100 text-black text-2xl rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
                        onClick={() => {
                            updateMaxPersons(maxPersons + 1);
                        }}
                    >+</button>
                </div>
            </div>
        </div>
    );
}