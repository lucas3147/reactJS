"use client"

import { useState } from 'react';
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
  const [users, setUsers] = useState<UserType[]>([]);
  const [showNewChat, setShowNewChat] = useState(false);

  const handleLoginData = async (newUser: UserType) => {
    await Api.addUser(newUser);
    setUser(newUser);
  }

  const handleNewChat = async () => {
    if (user){
      const listUsers = await Api.getContactList(user.id);
      setUsers(listUsers);
      setShowNewChat(true);
    }
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
          users={users}
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
              active={activeChat?.id == chatList[key].id}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="flex-1">
        {activeChat?.id !== undefined &&
          <ChatWindow 
            user={user}
          />
        }
        {activeChat?.id == undefined &&
          <ChatIntro />
        }

      </div>
    </div>
  )
}
