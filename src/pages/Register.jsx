import { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import addImage from "../assets/images/add-image.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].files[0];

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(response);

            const storageRef = ref(storage, userName);

            await uploadBytesResumable(storageRef, avatar).then(
                async () => {
                    await getDownloadURL(storageRef).then(
                        async (downloadURL) => {
                            await updateProfile(response.user, {
                                displayName: userName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", response.user.uid), {
                                uid: response.user.uid,
                                userName,
                                email,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "userChats", response.user.uid),{});
                            navigate("/");
                        }
                    );
                }
            );
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="min-w-[400px] bg-white rounded-lg ring-1 ring-inset shadow-sm">
                <h1 className="text-center font-bold text-2xl text-gray-700 mt-[16px]">
                    Chat app
                </h1>
                <h4 className="text-center text-sm mt-2 mb-3">Register</h4>
                <form
                    className="flex flex-col w-[70%] mx-auto gap-2 mb-4"
                    onSubmit={handleSubmit}
                >
                    <label className="text-sm  text-gray-900 font-medium">
                        Name
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className="block w-full font-normal text-sm rounded-lg py-2 pl-3 outline-none ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </label>
                    <label className="text-sm  text-gray-900 font-medium">
                        Email
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="block w-full font-normal text-sm rounded-lg py-2 pl-3 outline-none ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </label>
                    <label className="text-sm  text-gray-900 font-medium">
                        Password
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="block w-full font-normal text-sm rounded-lg py-2 pl-3 outline-none ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </label>
                    <label className="flex items-center text-sm text-gray-900 font-normal">
                        <img
                            src={addImage}
                            alt=""
                            className="w-12 h-12 opacity-70"
                        />
                        <span className="px-3 py-2 cursor-pointer text-gray-500">
                            Add avatar
                        </span>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            placeholder="Avatar"
                            className="hidden"
                        />
                    </label>
                    {err && (
                        <span className="text-red-500 text-sm">
                            Somthing went wrong
                        </span>
                    )}
                    <button className="block py-2 text-sm mt-2 font-bold text-gray-50 bg-purple-500 rounded-md hover:opacity-80">
                        Sign up
                    </button>
                </form>
                <p className="text-center text-sm mb-3 text-gray-500">
                    You do have an account?{" "}
                    <Link to="/login" className="text-purple-700">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
