import { useRef } from "react";

const ButtonRipple = () => {
    const button = useRef<any>()

    const handleRipple = (e: any) => {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        button.current.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    return (
        <button 
            className="relative bg-gradient-to-r from-sky-500 to-indigo-500 px-8 py-4 overflow-hidden rounded-[30px]"
            onClick={(e) => handleRipple(e)}
            ref={button}
        >
            Ondulação
        </button>
    )
}

export default ButtonRipple;