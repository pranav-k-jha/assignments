import React from "react";

const VideoCard = (props: any) => {
  return (
    <div>
      <img src={props.image} className="rounded-xl"></img>
      <div className="grid grid-cols-12 pt-2">
        <div className="col-span-1">
          <img className="rounded-full w-20 h-20" src={props.thumbimage}></img>
        </div>
        <div className="col-span-11 pl-2">
          <div>{props.title}</div>
          <div className="col-span-11 text-gray-400 text-base">
            {props.author}
          </div>
          <div className="col-span-11 text-gray-400 text-base">
            {props.views} | {props.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
