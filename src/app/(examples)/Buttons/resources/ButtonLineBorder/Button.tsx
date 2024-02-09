import './style.css';

const ButtonLineBorder = () => {
    return (
        <button className="lineborder">
            <svg 
                width="180px" 
                height="60px" 
                viewBox="0 0 180 60"
            >
                <polyline stroke='white' stroke-width="3" points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                <polyline stroke='white' stroke-width="3" points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span>HOVER ME</span>
      </button>
    )
}

export default ButtonLineBorder;