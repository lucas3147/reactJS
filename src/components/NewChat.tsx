import { Props } from "@/types/NewChatType";
import IconItem from "./IconItem";
import { useState, useEffect } from "react";
import { UserType } from "@/types/UserType";
import Api from "@/Api";

const NewChat = ({chatList, user, show, setShow}: Props) => {
    const [list, setList] = useState<UserType[]>([])

    useEffect(() => {
        const getList = async () => {
            if (user){
                const listUsers = await Api.getContactList(user.id);
                setList(listUsers);
            }
        }
        getList();
    }, [user]);

    const addNewChat = async (otherUser: UserType) => {
        await Api.addNewChat(user, otherUser);

        setShow(false);
    }

    return (
        <div
            className="transition-all duration-500 w-[35%] max-w-[415px] fixed top-0 bottom-0 bg-[white] flex flex-col border-r-[1px] border-[#DDD]"
            style={{left: show ? '0' : '-415px'}}
        >
            <div
                className="flex bg-[#00BFA5] items-center px-4 pb-4 pt-[60px]">

                <div onClick={() => setShow(false)}>
                    <IconItem
                        className="iconTheme"
                        type="ArrowBackIcon"
                        style={{ color: '#FFF' }}
                    />
                </div>

                <div 
                    className="text-[19px] leading-10 h-10 flex-1 font-bold text-white ml-5"
                >
                    Nova conversa
                </div>
            </div>
            
            <div 
                className="newChat--list">
                {list.map((item, key) => (
                    <div 
                        key={key}
                        className="flex items-center p-4 cursor-pointer hover:bg-[#F5F5F5]"
                        onClick={() => addNewChat(item)}
                    >
                        <img 
                            className="w-[50px] h-[50px] rounded-[50%] mr-4" 
                            src={item.photoURL ? item.photoURL : ''} 
                            alt="avatar do perfil" />
                        <div 
                            className="text-[17px] text-black"
                        >
                            {item.displayName}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewChat;