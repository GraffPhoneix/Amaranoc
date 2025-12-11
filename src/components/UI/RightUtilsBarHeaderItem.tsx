'use client'

import Image from "next/image";

interface RightUtilsBarHeaderItemProps {
    logo: string;
    desc: string;
    isActive?: boolean;
}

export function RightUtilsBarHeaderItem({ logo, desc, isActive = false }: RightUtilsBarHeaderItemProps) {

    return (
        <div className="hover:cursor-pointer hover:border-b border-gray-200">
            <div className="flex justify-center">
                <Image
                    src={logo}
                    alt={desc}
                    width={43}
                    height={43}
                />
            </div>
            <div className="text-md text-center">
                {desc}
            </div>
        </div>
    );
}
