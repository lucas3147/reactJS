import { ReactNode } from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

type Props = {
    type: IconType,
    style: {}
}

type IconType = 'MicIcon' | 'SendIcon' | 'CloseIcon' | 'EmojiEmotionsIcon' | 'DonutLargeIcon' |'AttachFileIcon' | 'ChatIcon' | 'MoreVertIcon' | 'SearchIcon';

const IconItem = ({type, style}: Props) => {
    return (
        <div>
            {type == 'DonutLargeIcon' &&
                <DonutLargeIcon style={style} />
            }
            {type == 'ChatIcon' &&
                <ChatIcon style={style} />
            }
            {type == 'MoreVertIcon' &&
                <MoreVertIcon style={style} />
            }
            {type == 'SearchIcon' &&
                <SearchIcon fontSize='small' style={style} />
            }
            {type == 'AttachFileIcon' &&
                <AttachFileIcon style={style}/>
            }
            {type == 'EmojiEmotionsIcon' &&
                <EmojiEmotionsIcon style={style}/>
            }
            {type == 'CloseIcon' &&
                <CloseIcon style={style}/>
            }
            {type == 'SendIcon' &&
                <SendIcon style={style}/>
            }
            {type == 'MicIcon' &&
                <MicIcon style={style}/>
            }
        </div>
    )
}

export default IconItem;