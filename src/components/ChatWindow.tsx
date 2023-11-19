import IconItem from "./IconItem";

const ChatWindow = () => {
    return (
        <div>
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
                    <div className="w-10 h-10 rounded-[50%] flex justify-center items-center cursor-pointer">
                        <IconItem
                            type="SearchIcon"
                            style={{color: '#919191'}}
                        />
                    </div>
                    <div className="w-10 h-10 rounded-[50%] flex justify-center items-center cursor-pointer">
                        <IconItem
                            type="AttachFileIcon"
                            style={{color: '#919191'}}
                        />
                    </div>
                    <div className="w-10 h-10 rounded-[50%] flex justify-center items-center cursor-pointer">
                        <IconItem
                            type="MoreVertIcon"
                            style={{color: '#919191'}}
                        />
                    </div>
                </div>
            </div>
            <div className="body">

            </div>
            <div className="footer">

            </div>
        </div>
    )
}

export default ChatWindow;