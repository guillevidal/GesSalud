import React from "react";
import "./chatOnline.css";

export default function Conversation() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImage"
            src="https://otakukart.com/wp-content/uploads/2021/09/Screenshot-2021-09-22-155747.jpg"
            alt="Naruto"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName"> John Doe</span>
      </div>
    </div>
  );
}
