import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@.../lib/firebase";
import { getUserData } from "./getUserData";
import type { FormEvent } from "react";

async function handleLogin(e?: FormEvent) {
    if (e?.preventDefault) e.preventDefault();

    const userData = getUserData('Login');
    console.log('userData from getUserData:', userData);

    const emailOrPhone = userData?.emailOrPhone;
    const password = userData?.password;

    if (!emailOrPhone || !password) {
        console.log("Email/Телефон или пароль не указаны");
        return;
    }

    if (!emailOrPhone.includes('@')) {
        console.log("Передан телефон. signInWithEmailAndPassword поддерживает только email. Используй phone auth.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailOrPhone, password);
        const user = userCredential.user;

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userLoginData', JSON.stringify(userData));
        console.log("Пользователь вошёл в систему:", user.uid, user.email);

        window.location.href = '/profile';
    } catch (error: any) {
        console.error('Ошибка входа (подробно):', error);
        switch (error.code) {
            case "auth/user-not-found":
                console.log("Пользователь с таким email не найден");
                break;
            case "auth/wrong-password":
                console.log("Неверный пароль");
                break;
            case "auth/invalid-email":
                console.log("Неверный формат email");
                break;
            default:
                console.log("Ошибка входа:", error.message || error);
        }
    }
}

export { handleLogin };
