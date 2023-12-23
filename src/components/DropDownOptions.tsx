'use client'

import { OptionsType } from "@/types/Options";

type Props = {
    options: OptionsType[],
    left?: number,
    right?: number,
};

const DropDownOptions = ({options, left, right} : Props) => {
    var myStyle: any = {
        position: 'absolute', 
        top: '50px', 
    }

    if (left) {
        myStyle = {
            ...myStyle,
            left: `${left.toFixed()}px`
        }
    }

    if (right) {
        myStyle = {
            ...myStyle,
            right: `${right.toFixed()}px`
        }
    }

    return (
        <div 
            className={`py-[5px] rounded-[4px] bg-[white] text-[14px] text-[#3B4A54] shadow-3xl flex flex-1 flex-col flex-wrap min-w-0 text`}
            style={myStyle}
        >
            <ul>
                {options.map((item) => (
                    <li key={item.id}>
                        <div 
                            className="flex w-64 hover:bg-[#F5F5F5] cursor-pointer"
                            onClick={item.action}
                        >
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