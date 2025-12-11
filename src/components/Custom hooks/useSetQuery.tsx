'use client'

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function useSetQuery() {
    const router = useRouter()
    const pathname = usePathname()

    function getStoredData() {
        if (typeof window === "undefined") return {}
        return {
            MaxPersons: localStorage.getItem("MaxPersons"),
            ActiveRegions: localStorage.getItem("ActiveRegions"),
            hotelsGrid: localStorage.getItem("hotelsGrid"),
            MaxPrice: localStorage.getItem("MaxPrice"),
            MinPrice: localStorage.getItem("MinPrice"),
            MoneyType: localStorage.getItem("MoneyType"),
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const storedParams = getStoredData()
            const currentParams = new URLSearchParams(window.location.search)

            let changed = false
            Object.entries(storedParams).forEach(([key, value]) => {
                if (value != null && currentParams.get(key) !== value) {
                    currentParams.set(key, value)
                    changed = true
                }
            })

            if (changed && pathname === '/') {
                router.replace(`${pathname}?${currentParams.toString()}`)
            }
        }, 500)

        return () => clearInterval(intervalId)
    }, [router, pathname])
}
