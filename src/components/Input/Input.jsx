// TextInput.js
import React from 'react';

const Input = ({ label, id, name, value, onChange, required, type = 'text' }) => {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    );
  };

export default Input;
