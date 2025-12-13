"use client";

import Regions from "./regions";
import MaxPersons from "./maxPerson";
import MaxPrice from "./maxPrice";

export default function LeftUtils() {
    const renderUtilsComponents = () => (
        <div>
            <Regions />
            <hr className="my-4 border-t border-gray-200" />
            <MaxPrice />
            <hr className="my-4 border-t border-gray-200" />
            <MaxPersons />
        </div>
    );

    return (
        <div className="border border-gray-300 rounded-xl mt-6 p-3.5 ml-42 w-64">
            {renderUtilsComponents()}
        </div>
    );
}
