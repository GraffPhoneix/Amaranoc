import { signOut } from "firebase/auth";
import { auth } from "@.../lib/firebase";

async function handleLogout() {
    try {
        await signOut(auth);
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userLoginData');
        localStorage.removeItem('userRegisterData');
        console.log("Пользователь вышел из системы");

        window.location.href = '/login';
    } catch (error) {
        console.error("Ошибка при выходе:", error);
    }
}
export default handleLogout;