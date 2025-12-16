'use client'

import Image from "next/image";
import Footer from "./Footer";
import localConfigs from "@.../configs/local.configs";
import { getUserData } from "../functions/getUserData";
import handleLogout from "../functions/signOut";

export default function UserProfile() {
    const userData = getUserData();

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex mt-15 flex-col lg:flex-row items-center justify-between w-[85%] max-w-350uto p-4 md:px-8 md:py-5 border border-gray-200 rounded-3xl bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full lg:w-auto">

                        <div className="relative shrink-0">
                            <div className="w-18 h-[7h-18nded-full overflow-hidden border rounded-full border-gray-100">
                                <Image
                                    src={localConfigs.userAvatar}
                                    alt="User Avatar"
                                    width={72}
                                    height={72}
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <button
                                className="absolute bottom-0 right-0 translate-x-1 translate-y-1 bg-gray-100 hover:bg-gray-200 border border-white rounded-full p-1.5 transition-colors cursor-pointer"
                            >
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-600"
                                >
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-16 text-center md:text-left">
                            <div className="space-y-1">
                                <p className="text-gray-900 text-[15px] font-medium">
                                    Имя фамилия
                                </p>
                                <p className="text-gray-400 text-[15px]">{userData?.fullName}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-gray-900 text-[15px] font-medium">
                                    Номер телефона
                                </p>
                                <p className="text-gray-400 text-[15px]">{userData?.phone}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-gray-900 text-[15px] font-medium">
                                    Эл. почта
                                </p>
                                <p className="text-gray-400 text-[15px]">{userData?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 lg:mt-0 w-full lg:w-auto justify-center lg:justify-end">

                        <button
                            className="flex items-center cursor-pointer justify-center w-11.5 h-11.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            </svg>
                        </button>

                        <button
                            className="h-11.5 px-6 rounded-full border cursor-pointer border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors text-[15px] whitespace-nowrap"
                        >
                            Удалить профиль
                        </button>

                        <button
                            onClick={async () => handleLogout()}
                            className="h-11.5 px-8 rounded-full cursor-pointer border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors text-[15px] whitespace-nowrap"
                        >
                            Выход
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}