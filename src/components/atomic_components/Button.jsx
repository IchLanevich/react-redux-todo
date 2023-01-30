import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className="hover:bg-gray-600 p-2 rounded flex justify-center items-center gap-2 text-gray-300"
    >
      {props.icon ? props.icon : null}
      {props.value ? props.value : null}
    </button>
  );
};

export default Button;
