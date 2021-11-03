import React, { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import axios from "axios";
import "./messenger.css";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversaciones/Guille");
        console.log(res.data);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, []);
  return (
    <div className="messengerContent">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input type="text" placeholder="search" className="chatMenuInput" />
          {conversations?.map((e) => (
            <Conversation conversation={e} />
          ))}
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Write Something "
            ></textarea>
            <button className="chatSubmitButtom">Send</button>
          </div>
        </div>
      </div>

      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}
