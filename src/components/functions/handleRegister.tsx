import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@.../lib/firebase";
import { getUserData } from "./getUserData";

async function handleRegister() {
    const userData = getUserData('Register')
    const email = userData.email;
    const password = userData.password;

    if (!email || !password) {
        console.log("Email или пароль не указаны");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem('isAuth', 'true');
        console.log("Пользователь зарегистрирован:", user.uid, user.email);

        window.location.reload();

        localStorage.setItem('userRegisterData', JSON.stringify(userData));
    } catch (error: any) {
        switch (error.code) {
            case "auth/email-already-in-use":
                console.log("Этот email уже используется");
                break;
            case "auth/invalid-email":
                console.log("Неверный формат email");
                break;
            case "auth/weak-password":
                console.log("Пароль слишком слабый (минимум 6 символов)");
                break;
            default:
                console.log("Ошибка регистрации:", error.message);
        }
    }

}

export { handleRegister };