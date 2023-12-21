const DropDownOptions = () => {
    return (
        <div className="absolute top-12 left-16 py-[5px] rounded-[4px] bg-[white] text-[14px] text-[#3B4A54] shadow-3xl flex flex-1 flex-col flex-wrap min-w-0 text">
            <ul>
                <li>
                    <div className="flex w-80 hover:bg-[#F5F5F5] cursor-pointer">
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis px-[24px] py-2">
                            Opção 1
                        </p>
                    </div>
                </li>
                <li>
                    <div className="flex w-80 hover:bg-[#F5F5F5] cursor-pointer">
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis px-[24px] py-2">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam praesentium quod enim ipsa nemo aliquid, temporibus minima fugit minus modi animi quaerat harum aspernatur vel ipsum nisi illo! Dolor, odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque ducimus vero modi, recusandae vel mollitia sit repudiandae ipsam sed iure asperiores non quaerat, voluptatum, quia fugiat culpa autem illum? Dignissimos.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default DropDownOptions;