export function getUserData() {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('userRegisterData');
        return userData ? JSON.parse(userData) : null;
    }
}
