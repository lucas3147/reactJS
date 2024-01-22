import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';
import { CSSProperties } from 'react';

type Props = {
    type: IconType,
    style: CSSProperties,
    className?: string
}

type IconType = 'CloseIcon' | 'ArrowDropDownCircleIcon';

const IconTheme = ({type, style, className}: Props) => {
    return (
        <div className={className}>
            {type == 'ArrowDropDownCircleIcon' &&
                <ArrowDropDownCircleIcon style={style} />
            }
            {type == 'CloseIcon' && 
                <CloseIcon style={style} />
            }
        </div>
    )
}

export default IconTheme;