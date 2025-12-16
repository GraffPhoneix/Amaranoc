'use client'

import handleGoogleRegister from '@.../components/functions/handleGoogleRegister';
import { handleLogin } from '@.../components/functions/handleLogin';
import LoginFields from '@.../components/UI/loginFields';
import Link from 'next/link';

export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-110 space-y-8">
                <div className="text-center">
                    <h2 className="text-[22px] font-medium text-gray-900">Вход</h2>
                </div>

                <form className="mt-8 space-y-5">
                    <div className="space-y-5">
                        <LoginFields />
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900 hover:text-gray-700">
                                Забыли пароль?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={async () => handleLogin()}
                            className="flex w-full justify-center rounded-full bg-[#FF9E40] px-3 py-4 text-sm font-medium text-white shadow-sm hover:bg-[#e88e35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9E40] transition-colors"
                        >
                            Вход
                        </button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-sm text-gray-500">Или</span>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={async () => handleGoogleRegister()}
                        className="flex w-full items-center justify-center gap-3 rounded-full border border-[#FF9E40] bg-white px-3 py-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9E40] transition-colors"
                    >
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                            <path
                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36004 16.6053 6.54996L20.0853 3.06996C17.9203 1.04996 15.1203 0 12.0003 0C7.31028 0 3.25527 2.69004 1.28027 6.60996L5.27028 9.70496C6.21525 6.86004 8.87028 4.75 12.0003 4.75Z"
                                fill="#EA4335"
                            />
                            <path
                                d="M23.49 12.275C23.49 11.49 23.35 10.735 23.11 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M5.26498 14.2949C5.02498 13.5699 4.88498 12.7999 4.88498 11.9999C4.88498 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.26538 14.295L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                fill="#34A853"
                            />
                        </svg>
                        <span className="text-sm font-medium leading-6">
                            Вход с помощью Google
                        </span>
                    </button>
                </div>
                <div className="text-center text-sm">
                    <span className="text-gray-900">Еще не зарегистрированы </span>
                    <Link
                        href="/profile"
                        className="font-medium text-[#FF9E40] hover:text-[#e88e35] transition-colors"
                    >
                        Регистрация
                    </Link>
                </div>
            </div>
        </div>
    );
}