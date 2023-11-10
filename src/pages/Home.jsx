import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
const Home = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[90%] md:w-[70%] h-[80%] flex rounded-md shadow-md overflow-hidden">
              <div className="flex-1">
                <Sidebar />
              </div>
              <div className="flex-2">
                <Chat />
              </div>
            </div>
        </div>
    );
};

export default Home;
