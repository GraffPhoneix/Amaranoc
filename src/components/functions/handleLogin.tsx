import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@.../lib/firebase";
import { getUserData } from "./getUserData";
import type { FormEvent } from "react";

async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const userData = getUserData();
    console.log('LOGIN DATA:', userData);

    const email = userData?.email;
    const password = userData?.password;

    if (!email || !password) {
        console.log("Email или пароль не указаны");
        return;
    }

    if (!email.includes('@')) {
        console.log("Firebase email auth поддерживает только email");
        return;
    }

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log("Успешный вход:", res.user.uid);

        localStorage.setItem('isAuth', 'true');
        window.location.href = '/profile';
    } catch (error: any) {
        console.error("Ошибка входа:", error.code, error.message);
    }
}

export { handleLogin };
