export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
    return value.trim() !== '';
};