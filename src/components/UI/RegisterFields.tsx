'use client'

import localConfigs from "@.../configs/local.configs";
import { useState, useEffect } from "react";

export function RegisterFields() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(fieldContent: string, value: string) {
        if (fieldContent === 'fullName') setFullName(value);
        else if (fieldContent === 'email') setEmail(value);
        else if (fieldContent === 'phone') setPhone(value);
        else if (fieldContent === 'password') setPassword(value);
    };

    useEffect(() => {
        if (fullName !== '' && email !== '' && phone !== '' && password !== '') {
            localStorage.setItem('userRegisterData', JSON.stringify({
                fullName: fullName,
                email: email,
                phone: phone,
                password: password,
            }));
        }
    }, [fullName, email, phone, password]);

    return localConfigs.registerFormFilds.map((field) => (
        <div key={field.content}>
            <input
                type={field.type}
                placeholder={field.placeholderContent}
                value={
                    field.content === 'fullName' ? fullName :
                        field.content === 'email' ? email :
                            field.content === 'phone' ? phone :
                                field.content === 'password' ? password :
                                    ''
                }
                onChange={(e) => handleChange(field.content, e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
        </div>
    ));
}
