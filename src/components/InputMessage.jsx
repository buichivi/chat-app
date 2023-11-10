import attach from "../assets/images/attach.png";
import addImg from "../assets/images/add-img.png";
import send from "../assets/images/send-svgrepo-com.png";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import {
    Timestamp,
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputMessage = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        const id = uuid();

        if (img) {
            const storageRef = ref(storage, id);

            await uploadBytesResumable(storageRef, img).then(async () => {
                await getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: id,
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        }),
                    });
                });
            });
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: id,
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };

    return (
        <div className="w-full h-full flex items-center justify-between px-2 bg-gray-50">
            <input
                type="text"
                id="message"
                placeholder="Type something..."
                className="w-3/4 border-none outline-none"
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        handleSend();
                    }
                }}
            />
            <div className="flex items-center gap-2">
                <img
                    src={attach}
                    alt=""
                    className="w-7 h-7 cursor-pointer opacity-90 hover:opacity-100"
                />
                <label htmlFor="add-img">
                    <img
                        src={addImg}
                        alt=""
                        className="w-7 h-7 cursor-pointer opacity-90 hover:opacity-100"
                    />
                    <input
                        type="file"
                        name="add-img"
                        id="add-img"
                        className="hidden"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </label>
                <button
                    className="px-3 py-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                    onClick={handleSend}
                >
                    <img src={send} alt="" className="w-12 md:w-9 h-7 cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default InputMessage;
