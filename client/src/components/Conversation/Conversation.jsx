import React, { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation?.find((m) => m !== "Guille");
  }, []);
  return (
    <div className="conversation">
      <img
        src="https://otakukart.com/wp-content/uploads/2021/09/Screenshot-2021-09-22-155747.jpg"
        alt="Naruto byron mode"
        className="conversationImage"
      />
      <span className="conversationName">Guillermo Vidal</span>
    </div>
  );
}
