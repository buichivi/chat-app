import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const newMessage = useRef();

    useEffect(() => {
        newMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const showTime = () => {
        const time = new Date(message.date.seconds * 1000);
        // Hours part from the timestamp
        var hours = time.getHours();

        // Minutes part from the timestamp
        var minutes = "0" + time.getMinutes();

        // Will display time in 10:30:23 format
        var formattedTime =
            hours + ":" + minutes.substr(-2);

        if (time.toDateString() === new Date().toDateString()) {
            return formattedTime;
        }
        return time.toUTCString();
    };
    const time = showTime();

    return (
        <div
            ref={newMessage}
            className={`message flex items-start gap-4 ${
                message.senderId === currentUser.uid && "owner"
            }`}
        >
            <div className="flex flex-col items-center gap-1">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                />
                <span className="text-[12px] text-gray-400">{time}</span>
            </div>
            <div className="w-[50%]">
                {message.text !== "" && (
                    <p className="max-w-max mr-auto py-2 px-4 relative bg-white rounded-lg before:content-[''] before:absolute before:top-[50%] before:translate-y-[-50%] before:right-full before:border-transparent before:border-[6px] before:border-t-white before:border-r-white">
                        {message.text}
                    </p>
                )}

                {message.img && (
                    <img
                        src={message.img}
                        alt=""
                        className="object-cover py-2"
                    />
                )}
            </div>
        </div>
    );
};

export default Message;
