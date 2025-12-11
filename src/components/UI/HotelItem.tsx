import Image from "next/image"

interface Props {
    id: number,
    img: string,
    region: string,
    maxPersons: number,
    price: number,
}

export default function HotelsItem({ id, img, region, maxPersons, price }: Props) {
    return (
        <div
            key={id}
            className="rounded-xl shadow-sm flex flex-col gap-2 bg-white"
        >
            <div className="relative h-75 w-full rounded-t-lg overflow-hidden">
                <Image
                    src={img}
                    alt={region}
                    fill
                    className="rounded-b-xl"
                />
            </div>
            <div className="p-4 pt-2 flex flex-col gap-3">
                <div className="flex justify-between items-center text-gray-900">
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                            <Image
                                src='https://amaranoc.am/images/location-outlined.svg'
                                alt='cursor-logo'
                                width={16.5}
                                height={16.5}
                            />
                            <span className="font-medium px-1 mb-0.5">{region}</span>
                        </div>

                        <div className="flex items-center ml-20">
                            <Image
                                src='/people_logo.png'
                                alt='cursor-logo'
                                width={30}
                                height={30}
                                className='mt-0.5'
                            />
                            <span className="font-medium">{maxPersons}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xl font-bold font-sans text-gray-600">
                    <Image
                        src="https://amaranoc.am/images/price.svg"
                        alt="cursor-logo"
                        width={16.5}
                        height={16.5}
                        className='mt-1'
                    />
                    <span className='ml-1'>{price.toLocaleString()} ֏</span>
                </div>
            </div>
        </div>
    )
}
