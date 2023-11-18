"use client"

import Image from 'next/image'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import ChatListItem from '@/components/ChatListItem';

export default function Home() {

  const [chatList, setChatList] = useState([{}, {}, {}, {}]);

  return (
    <div className="flex h-screen bg-[#EDEDED]">
      <div className="sidebar w-2/6 max-w-[415px] flex flex-col border-r-2 border-[#ddd]">

        <header className="h-16 px-4 flex justify-between items-center">
          <img
            className="w-10 h-10 rounded-[20px] cursor-pointer"
            src="https://cdn0.iconfinder.com/data/icons/standard-characters/101/mature_male_slicked3-1024.png"
            alt="icone do avatar" />
          <div
            className="flex"
          >
            <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>

        <div className="bg-[#F6F6F6] border-b-2 border-[#EEE] py-1 px-4">
          <div className="bg-[white] h-10 rounded-[20px] flex items-center py-0 px-[10px]">
            <SearchIcon fontSize='small' style={{ color: '#919191' }} />
            <input
              className="bg-[transparent] flex-1 border-0 outline-none ml-2"
              type="search"
              placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>
        <div>
          {chatList && chatList.map((item, key) => (
            <ChatListItem
              key={key}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        ...
      </div>
    </div>
  )
}
