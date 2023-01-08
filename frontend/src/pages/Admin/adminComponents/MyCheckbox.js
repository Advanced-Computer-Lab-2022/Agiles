import React from "react";
const MyCheckbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input
      style={{
        display: "inline-block",
        margin: "10px",
        width: "17px",
        height: "17px",
      }}
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default MyCheckbox;
