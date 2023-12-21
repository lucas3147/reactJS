import { OptionsType } from "@/types/Options";

type Props = {
    options: OptionsType[],
    submit: () => void
};

const DropDownOptions = ({options, submit} : Props) => {
    return (
        <div className="absolute top-12 left-16 py-[5px] rounded-[4px] bg-[white] text-[14px] text-[#3B4A54] shadow-3xl flex flex-1 flex-col flex-wrap min-w-0 text">
            <ul>
                {options.map((item) => (
                    <li key={item.id}>
                        <div className="flex w-80 hover:bg-[#F5F5F5] cursor-pointer">
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis px-[24px] py-2">
                                {item.name}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropDownOptions;