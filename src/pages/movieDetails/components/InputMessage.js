import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addMessages } from "../../../redux/slice/liveChatSlice";

const InputMessage = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      dispatch(
        addMessages({ name: "Theo Kuttan", text: inputRef.current.value })
      );
    }
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-row justify-between gap-3">
      <input
        ref={inputRef}
        className="rounded-md bg-transparent border border-gray-400 p-1 text-xs flex-grow"
        placeholder="Type a message.."
      />
      <button
        className="px-1 text-xs bg-green-400 text-black font-bold rounded-md w-10"
        onClick={submitHandler}
      >
        Send
      </button>
    </div>
  );
};

export default InputMessage;
