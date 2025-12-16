'use client';

import localConfigs from "@.../configs/local.configs";
import { useState, useEffect } from "react";

export default function LoginFields() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (emailOrPhone === '' && password === '') {
            localStorage.removeItem('userLoginData');
            return;
        }

        localStorage.setItem('userLoginData', JSON.stringify({ emailOrPhone, password }));
    }, [emailOrPhone, password]);

    return localConfigs.loginFormFilds.map((field) => {
        const isPasswordField = field.content === 'password';

        const value = isPasswordField ? password : emailOrPhone;

        return (
            <div key={field.content}>
                <label htmlFor={field.content} className="sr-only">
                    {field.placeholderContent}
                </label>
                <input
                    id={field.content}
                    name={field.content}
                    type={field.type}
                    value={value}
                    onChange={(e) => {
                        if (isPasswordField) setPassword(e.target.value);
                        else setEmailOrPhone(e.target.value);
                    }}
                    autoComplete={isPasswordField ? 'current-password' : (field.type === 'tel' ? 'tel' : 'email')}
                    required
                    className="block w-full rounded-md border border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 sm:text-sm sm:leading-6 outline-none transition-colors"
                    placeholder={field.placeholderContent}
                />
            </div>
        );
    });
}
