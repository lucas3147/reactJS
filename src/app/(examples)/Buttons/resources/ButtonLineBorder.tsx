const ButtonLineBorder = () => {
    return (
        <button className="w-[180px] h-[60px] cursor-pointer bg-transparent border-[1px] border-solid border-[#91C9FF] outline-none transition-1000 ease-linear">
            <svg 
                width="180px" 
                height="60px" 
                viewBox="0 0 180 60" 
                className="border"
            >
                <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span
                className="text-white text-[18px] font-[100]"
            >HOVER ME</span>
      </button>
    )
}

export default ButtonLineBorder;