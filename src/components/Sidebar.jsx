import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
    return <div className="w-full h-full bg-[#3e3c62]">
      <Navbar />
      <Search />
      <Chats />
    </div>;
};

export default Sidebar;
