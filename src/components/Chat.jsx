import camera from '../assets/images/cam.png'
import addFriend from '../assets/images/add.png'
import more from '../assets/images/more.png'
import Messages from './Messages'
import InputMessage from './InputMessage'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className='w-full h-[64px] flex items-center justify-between px-2 bg-[#5f5b8f]'>
        <span className='font-[500] text-gray-300'>{data.user?.displayName}</span>
        <div className='flex gap-2'>
          <img src={camera} alt="" className='w-7 h-7 cursor-pointer hover:opacity-70'/>
          <img src={addFriend} alt="" className='w-7 h-7 cursor-pointer hover:opacity-70'/>
          <img src={more} alt="" className='w-7 h-7 cursor-pointer hover:opacity-70'/>
        </div>
      </div>
      <div className='flex-1 overflow-auto'>
        <Messages />
      </div>
      <div className='w-full h-14'>
        <InputMessage />
      </div>
    </div>
  )
}

export default Chat