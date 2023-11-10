import { useContext, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unsub();
        };
    }, [data.chatId]);


    return (
        <div className="messages w-full min-h-full bg-[#ddddf7] p-2">
            {messages.map((message) => {
                return <Message message={message} key={message.id}/>;
            })}
        </div>
    );
};

export default Messages;
