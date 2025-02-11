// src/utils/formatters.ts

export const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};