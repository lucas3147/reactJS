import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CSSProperties } from 'react';

type Props = {
    type: IconType,
    style?: CSSProperties,
    onClick?: () => void
}

type IconType = 'CloseIcon' | 'SaveAltIcon' | 'ArrowDropDownCircleIcon';

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
        </div>
    )
}

export default IconTheme;