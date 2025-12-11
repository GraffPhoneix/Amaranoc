'use client'

import { getRootData } from '@.../lib/firebase';
import { useEffect, useState } from 'react';
import { Hotel } from '../Types/Hotels';
import { useSearchParams } from 'next/navigation';
import HotelsItem from './HotelItem';


export default function HotelsRender() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const query = useSearchParams()
    const gridCols = query.get('hotelsGrid') === '3' ? 'grid-cols-3' : 'grid-cols-2'

    useEffect(() => {
        async function fetchData() {
            try {
                const rootData = await getRootData();
                setData(rootData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if (loading) {
        return (
            <div>
                <p>Loading</p>
            </div>
        );
    }

    const hotels = data.hotels.map((hotel: Hotel) => (
        <HotelsItem
            key={hotel.id}
            id={hotel.id}
            region={hotel.region}
            img={hotel.img[0]}
            maxPersons={hotel.maxPersons}
            price={hotel.price}
        />
    ));


    return (
        <div className={`grid ${gridCols} gap-2 ml-18 mt-5 w-280`}>
            {hotels}
        </div>
    );
}