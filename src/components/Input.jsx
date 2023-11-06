import React from "react";

const Input = ({
  title,
  type,
  placeholder,
  onChange,
  onKeyDown,
  value,
  id,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-[700] text-[18px]" htmlFor={id}>
        {title}:
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-96 p-2 border mt-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
        value={value}
      />
    </div>
  );
};

export default Input;
