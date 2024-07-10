import React from 'react';

const Button = ({ type = 'button', onClick, children, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex justify-center w-full text-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
