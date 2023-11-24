type Props = {
    data: { 
        body: string
        author: number
    };
    user: {
        id: number,
        avatar: string,
        name: string
    }
}

const MessageItem = ({data, user}: Props) => {
    return (
        <div 
            className="mb-2 flex"
            style={
                {justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'}
            }
            >
            
            <div 
                className="bg-[white] rounded-[10px] shadow-[0_1px_1px_1px_#CCC] flex flex-col p-1 max-w-[90%]"
                style={
                    {backgroundColor: user.id === data.author ? '#DCF8C6' : 'white'}
                }
                >
                <div className="text-sm my-[5px] mr-10 ml-[5px]">{data.body}</div>
                <div className="text-[11px] text-[#999] mt-[-15px] mr-[5px] text-right h-4">13:00</div>
            </div>

        </div>
    )
}

export default MessageItem;