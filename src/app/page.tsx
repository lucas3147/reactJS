"use client"

import { useEffect, useState } from 'react';
import ChatListItem from '@/components/ChatListItem';
import ChatIntro from '@/components/ChatIntro';
import ChatWindow from '@/components/ChatWindow';
import { ChatItem } from '@/types/ChatType';
import IconItem from '@/components/IconItem';
import NewChat from '@/components/NewChat';
import { UserType } from '@/types/UserType';
import Login from '@/components/Login';
import Api from '@/Api';

export default function Home() {

  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [activeChat, setActiveChat] = useState<ChatItem>();
  const [user, setUser] = useState<UserType | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      let onsub = Api.onChatList(user.codeDataBase, setChatList);
      return onsub;
    }
  },[user]);

  const handleLoginData = async (newUser: UserType) => {
    await Api.addUser(newUser);
    setUser(newUser);
  }

  const handleNewChat = async () => {
    setShowNewChat(true);
  }

  if (user === null) {
    return (
      <Login onReceive={handleLoginData}/>
    );
  }

  return (
    <div className="flex h-screen bg-[#EDEDED]">
      <div className="sidebar w-2/6 max-w-[415px] flex flex-col border-r-2 border-[#ddd]">
        <NewChat 
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header className="h-16 px-4 flex justify-between items-center">
          <img
            className="w-10 h-10 rounded-[20px] cursor-pointer"
            src={user.photoURL ? user.photoURL : ""}
            alt="icone do avatar" />
          <div
            className="flex"
          >
            <IconItem
              className="iconTheme"
              type='DonutLargeIcon'
              style={{ color: '#919191' }}
            />
            <div onClick={handleNewChat}>
              <IconItem
                className="iconTheme"
                type='ChatIcon'
                style={{ color: '#919191' }}
              />
            </div>
            <IconItem
              className="iconTheme"
              type='MoreVertIcon'
              style={{ color: '#919191' }}
            />
          </div>
        </header>

        <div className="bg-[#F6F6F6] border-b-2 border-[#EEE] py-1 px-4">
          <div className="bg-[white] h-10 rounded-[20px] flex items-center py-0 px-[10px]">
            <IconItem
              className="iconTheme"
              type='SearchIcon'
              style={{ color: '#919191' }}
            />
            <input
              className="bg-[transparent] flex-1 border-0 outline-none ml-2 overflow-hidden whitespace-nowrap"
              type="search"
              placeholder="Procurar ou começar uma nova conversa" />
          </div>
          
        </div>
        <div className="chatList">
          {chatList && chatList.map((item, key) => (
            <ChatListItem
              key={key}
              chatItem={chatList[key]}
              active={activeChat?.chatId == chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="flex-1">
        {activeChat?.chatId !== undefined &&
          <ChatWindow 
            user={user}
            activeChat={activeChat}
          />
        }
        {activeChat?.chatId == undefined &&
          <ChatIntro />
        }

      </div>
    </div>
  )
}
