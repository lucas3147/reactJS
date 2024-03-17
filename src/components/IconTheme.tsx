import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import MonochromePhotosOutlinedIcon from '@mui/icons-material/MonochromePhotosOutlined';
import VrpanoOutlinedIcon from '@mui/icons-material/VrpanoOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GamepadOutlinedIcon from '@mui/icons-material/GamepadOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import LeakRemoveIcon from '@mui/icons-material/LeakRemove';
import { CSSProperties } from 'react';

type Props = {
    type: IconType,
    style?: CSSProperties, 
    className?: string,
    onClick?: () => void
}

const IconTheme = ({type, style, className, onClick}: Props) => {
    return (
        <div>
            {type == 'ArrowDropDownCircleIcon' &&
                <ArrowDropDownCircleIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'CloseIcon' && 
                <CloseIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'SaveAltIcon' && 
                <SaveAltIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'CameraOutlinedIcon' && 
                <CameraOutlinedIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'MonochromePhotosOutlinedIcon' && 
                <MonochromePhotosOutlinedIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'VrpanoOutlinedIcon' && 
                <VrpanoOutlinedIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'DashboardOutlinedIcon' && 
                <DashboardOutlinedIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'GamepadOutlinedIcon' && 
                <GamepadOutlinedIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'ArrowBackIosIcon' && 
                <ArrowBackIosIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'PlayCircleIcon' && 
                <PlayCircleIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'DoDisturbOnIcon' && 
                <DoDisturbOnIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'LeakAddIcon' && 
                <LeakAddIcon style={style} className={className} onClick={onClick} />
            }
            {type == 'LeakRemoveIcon' && 
                <LeakRemoveIcon style={style} className={className} onClick={onClick} />
            }
        </div>
    )
}

export default IconTheme;