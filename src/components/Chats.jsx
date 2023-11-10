import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import logoutImg from "../assets/images/logout.svg";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(db, "userChats", currentUser.uid),
                (doc) => {
                    setChats(doc.data());
                }
            );
            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);


    const handleSelect = (userInfo) => {
      dispatch({type: "CHANGE_USER", payLoad: userInfo})
    }

    return (
        <div className="w-full h-chats">
            <div className="userchats w-full overflow-auto border-b h-[90%] border-b-gray-500 border-t border-t-gray-500">
                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                        return (
                            <div
                                key={chat[0]}
                                className="flex items-center gap-2 px-2 py-2 cursor-pointer text-gray-300 hover:bg-[#302d53] transition-all"
                                onClick={() => handleSelect(chat[1].userInfo)}
                            >
                                <img
                                    src={chat[1].userInfo.photoURL}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <span className="block text-sm font-[500]">{chat[1].userInfo.displayName}</span>
                                    <p className="text-[12px]">{chat[1].lastMessage?.text}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <button
                className="text-gray-300 w-max h-[10%] inline-flex items-center text-sm px-3 py-2 hover:font-[700] transition-all"
                onClick={() => signOut(auth)}
            >
                <img src={logoutImg} alt="" className="w-6 h-6" />
                Log out
            </button>
        </div>
    );
};

export default Chats;
