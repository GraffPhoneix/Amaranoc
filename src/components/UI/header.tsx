"use client"

import localConfigs from "@.../configs/local.configs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    function renderHeaderData() {
        const pathName = usePathname();
        return localConfigs.headerContnet.map((item) => {
            const isActive = pathName === item.href;
            return (
                <div
                    className={`${isActive ? "border-b-2 border-[#fd993a]" : "border-none"}`}
                    key={item.href}
                >
                    <Link href={item.href}>
                        {item.contnet}
                    </Link>
                </div>
            );
        });
    }

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <div className="flex">
                <Image
                    src="https://amaranoc.am/images/logo.svg"
                    alt="logo-1"
                    width={205}
                    height={135}
                    className="p-6 ml-31"
                    priority
                />
                <div className="flex space-x-13 p-7.5 ml-55">
                    {renderHeaderData()}
                </div>
                <div>
                    <Image
                        src="https://amaranoc.am/images/header/globus.svg"
                        alt="logo-2"
                        width={20}
                        height={20}
                        className="py-8 ml-63"
                    />
                </div>
                <div>
                    <Image
                        src="https://amaranoc.am/images/header/user.svg"
                        alt="logo-3"
                        width={40}
                        height={40}
                        className="py-5.5 ml-5"
                    />
                </div>
                <div className="relative my-5 ml-5">
                    <input
                        placeholder="Поиск"
                        className="p-2 w-52 pl-10 rounded-4xl border-[#10162333] border placeholder:text-gray-400"
                    />
                </div>
            </div>
        </div>
    );
}
