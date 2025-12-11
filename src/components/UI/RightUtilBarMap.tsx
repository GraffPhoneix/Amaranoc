import Image from "next/image"

export default function RightUtilBarMap() {
    return (
        <div className="flex">
            <button
                className="border p-2.5 px-7 rounded-3xl ml-19.5 mt-6.5 flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-100 duration-150"
            >
                <span>Карта</span>
                <Image
                    className="mt-1"
                    src='https://amaranoc.am/images/map.svg'
                    alt='map-logo'
                    width={17}
                    height={17}
                />
            </button>
            <button
                className="border p-3.5 rounded-3xl ml-2 mt-6 flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-100 duration-150"
            >
                <Image
                    src='https://amaranoc.am/images/calendar.svg'
                    alt='cal-logo'
                    width={17}
                    height={17}
                />
            </button>
        </div>
    )
}