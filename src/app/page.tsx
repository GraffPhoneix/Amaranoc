'use client'

import { useSetQuery } from "@.../components/functions/useSetQuery";
import UtilBar from "@.../components/UI/UtilsBar";

export default function Main() {
    useSetQuery()

    return (
        <div>
            <UtilBar />
        </div>
    )
}
