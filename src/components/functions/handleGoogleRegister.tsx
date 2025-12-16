'use client';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@.../lib/firebase";

const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem(
            'userRegisterData',
            JSON.stringify({
                fullName: user.displayName,
                email: user.email,
                phone: user.phoneNumber || '',
            })
        );

        console.log("Пользователь зарегистрирован через Google:", user.uid, user.email);

        window.location.href = '/profile';

    } catch (error: any) {
        console.error("Ошибка при регистрации через Google:", error.message);
    }
};

export default handleGoogleRegister;