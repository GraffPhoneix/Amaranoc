'use client';

import { useState, useEffect } from "react";
import { getData } from "@.../lib/firebase";

export default function Regions() {
    const [data, setData] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const regionsData: string[] | null = await getData('regions');
                setData(regionsData);

                // Load selected regions from localStorage
                const storedRegions = localStorage.getItem('ActiveRegions');
                if (storedRegions) {
                    if (storedRegions === 'all') {
                        setSelectedRegions([]);
                    } else {
                        try {
                            const parsedRegions = JSON.parse(storedRegions) || [];
                            setSelectedRegions(parsedRegions);
                        } catch {
                            setSelectedRegions([]);
                        }
                    }
                } else {
                    localStorage.setItem("ActiveRegions", JSON.stringify([]));
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

    const handleCheckboxChange = (region: string, checked: boolean) => {
        const newSelected = checked
            ? [...selectedRegions, region]
            : selectedRegions.filter((rg) => rg !== region);

        setSelectedRegions(newSelected);
        localStorage.setItem("ActiveRegions", JSON.stringify(newSelected));
    };

    if (loading) {
        return <div className="text-gray-500">Загрузка регионов...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="text-gray-500">Нет данных о регионах.</div>;
    }

    return (
        <div className="flex flex-col h-48 mb-6">
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200 pr-2">
                {data.map((region) => (
                    <label
                        key={region}
                        className="flex items-center p-2 h-8 cursor-pointer hover:bg-gray-100 rounded"
                    >
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedRegions.includes(region)}
                            onChange={(e) => handleCheckboxChange(region, e.target.checked)}
                        />
                        <span className="text-gray-600 text-sm">{region}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
