import { useTheme } from "@/Context/ThemeContext";

type Props = {
    label: string;
    onClick: () => void;
}

export const Button = ({label, onClick}: Props) => {
    return (
        <button
            className="
                border 
                px-4 
                py-3 
                rounded-md
                bg-black text-white
                dark:bg-white dark:text-black
                "
            onClick={onClick}
        >
                {label}
        </button>
    )
}