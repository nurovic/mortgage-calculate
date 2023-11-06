import React from "react";

const Button = ({ disable, type, title }) => {
  return (
    <button
      disabled={disable}
      className={
        disable
          ? "bg-blue-200 cursor-default mt-4 px-4 py-2 rounded-[10px] text-[#fff] "
          : "bg-blue-400 mt-4 px-4 py-2 rounded-[10px] text-[#fff] cursour-pointer"
      }
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
