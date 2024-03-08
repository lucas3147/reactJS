import IconTheme from "./IconTheme";

type Props = {
    resources?: string[];
    about?: {title: string, link: string}[]
}

const DescriptiveItem = ({resources, about}: Props) => {
    return (
        <div
            className="transition-all right-[-214px] hover:right-[0px] top-[50%] translate-y-[-50%] absolute min-w-[200px] min-h-[150px] bg-zinc-600 rounded-tl-md rounded-bl-md py-6 px-6 z-10"
        >
            <div className="w-10 h-10 absolute left-[-25px] top-0 bg-zinc-600 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center">
                <IconTheme
                    type="ArrowBackIosIcon"
                    style={{
                        width: '20px',
                        height: '20px'
                    }}
                />
            </div>
            <div
                className="font-mono mb-8"
            >
                <p className="uppercase font-bold">Recursos utilizados:</p>
                {resources &&
                    <ul className="list-disc list-inside">
                        {resources.map((item, key) => (
                            <li key={key}>{item}</li>
                        ))}
                    </ul>
                }
            </div>
            <div
                className="font-mono"
            >
                {about &&
                    <>
                        <p className="uppercase font-bold">Visite os sites:</p>

                        <ul className="list-disc list-inside">
                            {about.map((item, key) => (
                                <li key={key}>
                                    <a
                                        className="underline underline-offset-4"
                                        href={item.link}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                }
            </div>
        </div>
    )
}

export default DescriptiveItem;