const ChatListItem = () => {
    return (
        <div className="h-[68px] flex cursor-pointer items-center hover:bg-[#F5F5F5]">
            <img
                className="h-12 w-12 rounded-3xl ml-4"
                src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                alt=""
            />
            <div
                className="flex flex-1 flex-col flex-wrap min-w-0 h-full justify-center border-b-2 border-[#EEE] pr-4 ml-4"
            >
                <div
                    className="flex justify-between items-center w-full"
                >
                    <div className="text-base">Lucas Lima</div>
                    <div className="text-xs text-[#999]">19:00</div>
                </div>
                <div className="text-sm text-[#999] w-full">
                    <p
                        className="overflow-hidden whitespace-nowrap text-ellipsis m-0"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, fugit quasi expedita laboriosam nihil aliquam tenetur saepe eveniet atque modi officiis quibusdam alias facere repellendus corporis enim excepturi dolorem numquam.
                        ?</p>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem