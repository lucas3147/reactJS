import { ReactNode } from 'react';

type Props = {
    children: ReactNode,
    style: string
}

const IconItem = ({children, style}: Props) => {
    return (
        <div className={style}>
            {children}
        </div>
    )
}