import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors';
    const variantStyles = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}; 