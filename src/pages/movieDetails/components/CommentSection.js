import { isEmpty } from "lodash";
import React from "react";

const commentsData = [
  {
    id: 1,
    name: "Tiya",
    text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
    reply: [
      {
        id: 1.1,
        name: "Tiya",
        text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
        reply: [
          {
            id: 1.12,
            name: "Tiya",
            text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
            reply: [],
          },
        ],
      },
      {
        id: 1.2,
        name: "Tiya",
        text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
        reply: [],
      },
    ],
  },
  {
    id: 2,
    name: "Tiya",
    text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
    reply: [],
  },
  {
    id: 3,
    name: "Tiya",
    text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
    reply: [],
  },
  {
    id: 4,
    name: "Tiya",
    text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
    reply: [
      {
        id: 4.1,
        name: "Tiya",
        text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
        reply: [],
      },
    ],
  },
  {
    id: 5,
    name: "Tiya",
    text: "Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry",
    reply: [],
  },
];

const DisplayReplies = ({ data }) => {
  return (
    <>
      <div
        className="flex flex-row align-middle gap-3 mb-5"
        data-testid="comment-card"
      >
        <img
          className="rounded-full bg-gray-400 w-8 h-8"
          alt="user-icon"
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
        ></img>
        <div className="flex flex-col gap-1 align-middle text-white text-xs">
          <h4 className="font-bold">{data.name}</h4>
          <p>{data.text}</p>
        </div>
      </div>
      {!isEmpty(data.reply) && (
        <div className="ml-3 pl-5 border-l">
          {data.reply.map((item) => (
            <DisplayReplies key={item.id} data={item} />
          ))}
        </div>
      )}
    </>
  );
};

const CommentSection = () => {
  return (
    <div>
      <h1 className="text-white font-bold text-lg mt-5">126 Comments</h1>
      <div className="mt-5">
        {commentsData.map((item) => (
          <DisplayReplies key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
