import { signOut } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState();
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        if (!userName) {
            setUser();
            return;
        }
        const q = query(
            collection(db, "users"),
            where("userName", "==", userName)
        );
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                });
            } else setUser(null);
        } catch (err) {
            throw new Error(err);
        }
    };

    const handleSelect = async () => {
        const combindId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combindId));
            if (!res.exists()) {
                // create a chat in chats collections
                await setDoc(doc(db, "chats", combindId), { messages: [] });
                // create user chats

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combindId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.userName,
                        photoURL: user.photoURL,
                    },
                    [combindId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combindId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combindId + ".date"]: serverTimestamp(),
                });
            }
        } catch (error) {
            throw new Error(error);
        }
        setUser();
        setUserName("");
    };

    return (
        <div className="w-full">
            <input
                type="text"
                id="search"
                name="search"
                className="w-full bg-transparent outline-none text-sm py-2 px-2 text-gray-200"
                placeholder="Find a user"
                value={userName}
                onChange={(e) => {
                    setUserName(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        handleSearch();
                    }
                }}
            />
            {user && (
                <div
                    className="flex items-center gap-2 px-2 py-2 cursor-pointer text-gray-300 hover:bg-[#302d53] transition-all"
                    onClick={handleSelect}
                >
                    <img
                        src={user.photoURL}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <span className="block text-sm font-[500]">
                            {user.userName}
                        </span>
                    </div>
                </div>
            )}
            {user === null && (
                <span className="text-sm text-gray-500 text-center">
                    User not found
                </span>
            )}
        </div>
    );
};

export default Search;
