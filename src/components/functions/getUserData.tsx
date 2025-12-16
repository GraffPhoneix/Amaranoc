export function getUserData() {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem('userRegisterData');
  return raw ? JSON.parse(raw) : null;
}
