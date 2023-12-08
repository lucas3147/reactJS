import { ChatItem } from "@/types/ChatType"

type Props = {
    onClick: () => void,
    active: boolean,
    chatItem: ChatItem
}

const ChatListItem = ({onClick, active, chatItem}: Props) => {
    return (
        <div 
            className={"h-[68px] flex cursor-pointer items-center hover:bg-[#F5F5F5] " + (active ? "bg-[#EBEBEB]" : "")}
            onClick={onClick}
            >
            <img
                className="h-12 w-12 rounded-3xl ml-4"
                src={chatItem.image}
                alt=""
            />
            <div
                className="flex flex-1 flex-col flex-wrap min-w-0 h-full justify-center border-b-2 border-[#EEE] pr-4 ml-4"
            >
                <div
                    className="flex justify-between items-center w-full"
                >
                    <div className="text-base">{chatItem.title}</div>
                    <div className="text-xs text-[#999]">{`${chatItem.lastMessageDate.toDate().getHours()}:${chatItem.lastMessageDate.toDate().getMinutes()}`}</div>
                </div>
                <div className="text-sm text-[#999] w-full">
                    <p
                        className="overflow-hidden whitespace-nowrap text-ellipsis m-0"
                    >
                        {chatItem.lastMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem