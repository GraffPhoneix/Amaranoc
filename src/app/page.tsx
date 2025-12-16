'use client'

import SendHotel from "@.../components/UI/sendHotel";
import { useSetQuery } from "@.../components/functions/useSetQuery";
import UtilBar from "@.../components/UI/UtilsBar";
import Footer from "@.../components/UI/Footer";

export default function Main() {
    useSetQuery()

    return (
        <div>
            <UtilBar />
            <Footer />
        </div>
    )
}
