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
import { CSSProperties } from 'react';

type Props = {
    type: IconType,
    style?: CSSProperties,
    onClick?: () => void
}

const IconTheme = ({type, style, onClick}: Props) => {
    return (
        <div>
            {type == 'ArrowDropDownCircleIcon' &&
                <ArrowDropDownCircleIcon style={style} onClick={onClick} />
            }
            {type == 'CloseIcon' && 
                <CloseIcon style={style} onClick={onClick} />
            }
            {type == 'SaveAltIcon' && 
                <SaveAltIcon style={style} onClick={onClick} />
            }
            {type == 'CameraOutlinedIcon' && 
                <CameraOutlinedIcon style={style} onClick={onClick} />
            }
            {type == 'MonochromePhotosOutlinedIcon' && 
                <MonochromePhotosOutlinedIcon style={style} onClick={onClick} />
            }
            {type == 'VrpanoOutlinedIcon' && 
                <VrpanoOutlinedIcon style={style} onClick={onClick} />
            }
            {type == 'DashboardOutlinedIcon' && 
                <DashboardOutlinedIcon style={style} onClick={onClick} />
            }
            {type == 'GamepadOutlinedIcon' && 
                <GamepadOutlinedIcon style={style} onClick={onClick} />
            }
            {type == 'ArrowBackIosIcon' && 
                <ArrowBackIosIcon style={style} onClick={onClick} />
            }
            {type == 'PlayCircleIcon' && 
                <PlayCircleIcon style={style} onClick={onClick} />
            }
        </div>
    )
}

export default IconTheme;