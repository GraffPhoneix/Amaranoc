"use client";

import Regions from "./regions";
import MaxPersons from "./maxPerson";
import MaxPrice from "./maxPrice";

export default function LeftUtils() {
    const renderUtilsComponents = () => (
        <div className="border border-gray-300 p-3.5 py-4.5 rounded-t-xl">
            <Regions />
            <hr className="my-4 border-t border-gray-200" />
            <MaxPrice />
            <hr className="my-4 border-t border-gray-200" />
            <MaxPersons />
        </div>
    );

    return (
        <div className="mt-6 p-3.5 ml-42 w-64">
            {renderUtilsComponents()}
            <button
                className="border-b border-l border-r border-gray-300 w-full text-gray-600 font-semibold p-2 py-3 rounded-b-3xl hover:cursor-pointer"
                onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}
            >
                Сбросить фильтры
            </button>
        </div>
    );
}
