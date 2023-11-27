export const isAuthenticated = () => localStorage.getItem("gamelab") !== null;

export const getToken = () => localStorage.getItem("gamelab");

export const getLocal = () => localStorage.getItem("local");

export const logout = () => localStorage.removeItem("gamelab");
