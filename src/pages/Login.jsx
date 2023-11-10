import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="min-w-[400px] bg-[#ffffff] rounded-lg ring-1 ring-inset shadow-sm">
                <h1 className="text-center font-bold text-2xl text-gray-700 mt-[16px]">
                    Chat app
                </h1>
                <h4 className="text-center text-sm mt-2 mb-3">Login</h4>
                <form
                    className="flex flex-col w-[70%] mx-auto gap-2 mb-4"
                    onSubmit={handleSubmit}
                >
                    <label className="text-sm  text-gray-900 font-[500]">
                        Email
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="block font-normal w-full rounded-lg pl-3 py-2 outline-none ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </label>
                    <label className="text-sm  text-gray-900 font-[500]">
                        Password
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="block font-normal w-full rounded-lg pl-3 py-2 outline-none ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </label>
                    {err && (
                        <span className="text-red-500 text-sm">
                            Email or password is incorrect
                        </span>
                    )}
                    <button className="block py-2 text-sm mt-2 font-bold text-gray-50 bg-purple-500 rounded-md hover:opacity-80">
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mb-3 text-gray-500">
                    You don't have an account? <Link to="/register" className="text-purple-700">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
