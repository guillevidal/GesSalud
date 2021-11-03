import React from "react";
import "./message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImage"
          src="https://otakukart.com/wp-content/uploads/2021/09/Screenshot-2021-09-22-155747.jpg"
          alt="Boruto"
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
          laboriosam voluptatem eaque!
        </p>
      </div>
      <div className="messageBottom">1hour ago</div>
    </div>
  );
}
