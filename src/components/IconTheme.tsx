import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type Props = {
    type: IconType,
    style: {},
    className?: string
}

type IconType = 'ArrowDropDownCircleIcon';

const IconTheme = ({type, style, className}: Props) => {
    return (
        <div className={className}>
            {type == 'ArrowDropDownCircleIcon' &&
                <ArrowDropDownCircleIcon style={style} />
            }
        </div>
    )
}

export default IconTheme;