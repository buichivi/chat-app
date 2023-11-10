import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className="w-full h-[64px] flex items-center justify-between p-3 bg-[#302d53] text-[#ddddf7]">
            <div className="font-bold text-xl hidden md:inline-block">Chat app</div>
            <div className="flex items-center gap-3">
                <img src={currentUser.photoURL} alt="" className="w-8 h-8 object-cover rounded-full"/>
                <h3 className="text-sm font-base">{currentUser.displayName}</h3>
            </div>
        </div>
    );
};

export default NavBar;
