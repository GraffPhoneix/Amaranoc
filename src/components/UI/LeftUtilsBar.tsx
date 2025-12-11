"use client";

import { useState } from "react";
import Regions from "./regions";
import MaxPersons from "./maxPerson";
import MaxPrice from "./maxPrice";

interface FirebaseData {
    regions: string[];
    [key: string]: any;
}

export default function LeftUtils() {
    const [data, setData] = useState<FirebaseData | null>(null);
    const [loading, setLoading] = useState(true);
    const renderUtilsComponents = () => (
        <div>
            <Regions
                data={data}
                setData={setData}
                loading={loading}
                setLoading={setLoading}
            />

            <hr className="my-4 border-t border-gray-200" />
            <MaxPrice />
            <hr className="my-4 border-t border-gray-200" />
            <MaxPersons />
        </div>
    );

    return (
        <div className="border border-gray-300 rounded-xl mt-6 p-3.5 ml-43 w-64">
            {renderUtilsComponents()}
        </div>
    );
}