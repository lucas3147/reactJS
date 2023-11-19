import IconItem from "./IconItem";

const ChatWindow = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="h-16 border-b-2 border-[#CCC] flex justify-between items-center">

                <div
                    className="flex items-center cursor-pointer"
                >
                    <img
                        className="h-10 w-10 rounded-[50%] ml-4 mr-4"
                        src="https://www.svgrepo.com/show/81103/avatar.svg"
                        alt=""
                    />
                    <div
                        className="text-base text-black"
                    >
                        Gustavo
                    </div>
                </div>

                <div className="flex items-center mr-4">
                    <IconItem
                        className="iconTheme"
                        type="SearchIcon"
                        style={{ color: '#919191' }}
                    />
                    <IconItem
                        className="iconTheme"
                        type="AttachFileIcon"
                        style={{ color: '#919191' }}
                    />
                    <IconItem
                        className="iconTheme"
                        type="MoreVertIcon"
                        style={{ color: '#919191' }}
                    />
                </div>
            </div>
            <div className="chatWindow--body">

            </div>
            <div className="h-[62px] flex items-center">
                <div className="flex my-0 mx-4">
                    <IconItem
                        className="iconTheme"
                        type="EmojiEmotionsIcon"
                        style={{ color: '#919191' }}
                    />

                </div>
                <div className="flex-1">
                    <input
                        className="w-full h-10 border-0 outline-none bg-white rounded-3xl text-base text-[#4A4A4A] px-4"
                        type="text"
                        placeholder="Digite uma mensagem"
                    />
                </div>
                <div className="flex my-0 mx-4">
                    <div >
                        <IconItem
                            className="iconTheme"
                            type="SendIcon"
                            style={{ color: '#919191' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;