'use client'

import { OptionsType } from "@/types/Options";

type Props = {
    options: OptionsType[],
    submit: () => void,
    left: number
};

const DropDownOptions = ({options, submit, left} : Props) => {
    return (
        <div 
            className={`py-[5px] rounded-[4px] bg-[white] text-[14px] text-[#3B4A54] shadow-3xl flex flex-1 flex-col flex-wrap min-w-0 text`}
            style={{position: 'absolute', top: '50px', left: `${left}px`}}
        >
            <ul>
                {options.map((item) => (
                    <li key={item.id}>
                        <div className="flex w-64 hover:bg-[#F5F5F5] cursor-pointer">
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