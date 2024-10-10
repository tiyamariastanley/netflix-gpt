import React from "react";

const LiveComment = ({ data }) => {
  return (
    <div className="flex flex-row items-center gap-3 mb-5 text-xs border-b border-b-gray-500 pb-2">
      <img
        className="rounded-full bg-gray-400 w-5 h-5"
        alt="user-icon"
        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      ></img>
      <h4 className="font-bold">{data.name}</h4>
      <p>{data.text}</p>
    </div>
  );
};

export default LiveComment;
