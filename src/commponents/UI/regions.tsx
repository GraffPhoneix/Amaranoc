"use client";

import { useState, useEffect } from "react";
import { getRootData } from "@.../lib/firebase";

interface FirebaseData {
    regions: string[];
    [key: string]: any;
}

interface RegionsProps {
    data: FirebaseData | null;
    setData: React.Dispatch<React.SetStateAction<FirebaseData | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Regions({ data, setData, loading, setLoading }: RegionsProps) {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
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
                            const parsedRegions = storedRegions ? JSON.parse(storedRegions) : [];
                            setSelectedRegions(parsedRegions);
                        } catch (e) {
                            console.error("Ошибка парсинга ActiveRegions из LocalStorage:", e);
                            setSelectedRegions([]);
                        }
                    }
                } else {
                    localStorage.setItem("ActiveRegions", '');
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [setData, setLoading]);

    const handleCheckboxChange = (region: string, checked: boolean) => {
        const newSelected = checked
            ? [...selectedRegions, region]
            : selectedRegions.filter((rg) => rg !== region);

        setSelectedRegions(newSelected);
        localStorage.setItem("ActiveRegions", JSON.stringify(newSelected));
    };

    if (loading) {
        return (
            <div className="text-gray-500">Загрузка регионов...</div>
        );
    }

    if (!data || !data.regions) {
        return <div className="text-gray-500">Нет данных о регионах.</div>;
    }

    return (
        <div className="flex flex-col h-48 mb-6">
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200 pr-2">
                {data.regions.map((region) => (
                    <label key={region} className="flex items-center p-2 h-8 cursor-pointer">
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