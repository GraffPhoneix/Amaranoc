'use client'

import { useState } from "react";

const grids = [2, 3]

export function HotelsHeader() {
    const [localGrid, setLocalGrid] = useState(3)
    function setGridInLocalStorage(grid: number) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('hotelsGrid', grid.toString());
        }
    }

    setGridInLocalStorage(localGrid)

    function buttonsRender() {
        return grids.map((grid) => {
            return (
                <button key={grid} className={`border-gray-500 border mt-5 py-1 px-3 rounded-lg ml-2 hover:cursor-pointer ${localGrid === grid ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => setLocalGrid(grid)}>grid:{grid}</button>
            )
        })
    }

    return (
        <div className="flex">
            <div className="ml-18 mt-5 text-lg border-b border-gray-200 pb-4">Лучшие предложения</div>
            <div className="flex  border-b border-gray-200 pb-4 ml-178">
                {buttonsRender()}
            </div>
        </div>
    )
}
