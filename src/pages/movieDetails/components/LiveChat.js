import React, { useEffect, useRef } from "react";
import LiveComment from "./LiveComment";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../../../redux/slice/liveChatSlice";
import { getRandomMessage } from "../../../utils/helper";
import InputMessage from "./InputMessage";

const LiveChat = () => {
  const liveMessages = useSelector((store) => store.liveChat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addMessages(getRandomMessage()));
    }, [1000]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white col-span-2 px-5 bg-gradient-to-b from-black mr-16 h-[45%]">
      <div className="sticky top-0 bg-black p-5 pl-0">
        <h1 className="text-base font-bold">🔴 LiveChat</h1>
      </div>
      <div className="h-[80%] overflow-y-scroll flex flex-col-reverse">
        {liveMessages.map((item, index) => (
          <LiveComment key={index} data={item} />
        ))}
      </div>
      <div className="sticky bottom-0 py-2">
        <InputMessage />
      </div>
    </div>
  );
};

export default LiveChat;
