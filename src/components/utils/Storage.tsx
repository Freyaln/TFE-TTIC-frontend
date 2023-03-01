export const setStorageToken = (token: string, remember: boolean) => {
    if (remember) {
        localStorage.setItem('token', token);
    }
    sessionStorage.setItem('token', token);
};

export const getStorageToken = () => {
    return localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
};

export const clearStorageToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};
