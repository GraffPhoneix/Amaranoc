export function getUserData(DataType: 'Login' | 'Register') {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem(`user${DataType}Data`);
        return userData ? JSON.parse(userData) : null;
    }
}
