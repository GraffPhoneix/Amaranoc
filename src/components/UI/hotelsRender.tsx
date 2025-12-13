'use client'

import { getData } from '@.../lib/firebase';
import { useEffect, useState } from 'react';
import { Hotel, Hotels } from '../Types/Hotels';
import { useSearchParams } from 'next/navigation';
import HotelsItem from './HotelItem';
import HotelsLoading from './HotelsLoading';

export default function HotelsRender() {
    const [fullData, setFullData] = useState<Hotels | null>(null);
    const [loading, setLoading] = useState(true);
    const query = useSearchParams();
    const gridCols = query.get('hotelsGrid') === '3' ? 'grid-cols-3' : 'grid-cols-2';


    useEffect(() => {
        async function fetchData() {
            try {
                const hotelsData = await getData('hotels');
                setFullData(hotelsData);
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
            <HotelsLoading />
        );
    }

    const filtredHotels = fullData?.filter((hotel: Hotel) => {
        const minPrice = parseFloat(query.get('MinPrice') || '0');
        const maxPriceQuery = parseFloat(query.get('MaxPrice') || '9999999')
        const maxPrice = maxPriceQuery === 0 ? Infinity : maxPriceQuery
        const maxPersonsQuery = parseFloat(query.get('MaxPersons') || '9999999');
        const maxPersons = maxPersonsQuery === 1 ? Infinity : maxPersonsQuery;
        const activeRegions = JSON.parse(query.get('ActiveRegions') || 'error')

        const activeRegionsCheck = activeRegions.length > 0
            ? activeRegions?.includes(hotel.region)
            : true
        const priceCheck = hotel.price > minPrice && hotel.price <= maxPrice
        const maxPersonsCheck = hotel.maxPersons <= maxPersons

        return priceCheck && maxPersonsCheck && activeRegionsCheck;
    })

    const hotels = filtredHotels !== undefined && filtredHotels?.length > 0
        ? filtredHotels?.map((hotel: Hotel) => (
            <HotelsItem
                key={hotel.id}
                id={hotel.id}
                region={hotel.region}
                img={hotel.img[0]}
                maxPersons={hotel.maxPersons}
                price={hotel.price}
            />
        ))
        : <div className='text-xl'>Предложения не найдены :(</div>

    return (
        <div className={`grid ${gridCols} gap-2 ml-18 mt-5 w-280`}>
            {hotels}
        </div>
    );
}