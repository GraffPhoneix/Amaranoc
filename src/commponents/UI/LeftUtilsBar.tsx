"use client";

import { useState, useEffect } from "react";
import { getRootData } from "@.../lib/firebase";

interface FirebaseData {
    regions: string[];
    [key: string]: any;
}

export default function LeftUtils() {
    const [data, setData] = useState<FirebaseData | null>(null);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

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
        if (typeof window !== 'undefined') {
            localStorage.getItem('ActiveRegions') === null
                ? localStorage.setItem("ActiveRegions", 'all')
                : console.log(1)
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
                <div className="font-semibold mb-2">Регион</div>
                <div className="text-gray-500">Загрузка регионов...</div>
            </div>
        );
    }

    // if (!data || !data.regions || data.regions.length === 0) {
    //     return (
    //         <div className="border border-gray-300 rounded-xl mt-6 p-3.5 ml-43 w-64 h-64">
    //             <div className="font-semibold mb-2">Регион</div>
    //             <div className="text-red-500">Нет данных о регионах.</div>
    //         </div>
    //     );
    // }

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

    return (
        <div className="border border-gray-300 rounded-xl mt-6 p-3.5 ml-43 w-64 h-64">
            <div className="flex flex-col h-full">
                <div className="font-semibold mb-2">Регион</div>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200">
                    {renderRegions()}
                </div>
            </div>
        </div>
    );
}