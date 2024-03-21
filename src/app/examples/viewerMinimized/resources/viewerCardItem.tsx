import { CSSProperties, HTMLAttributes, ReactNode, ReactPropTypes, StyleHTMLAttributes, useEffect, useState } from "react";

type Props = {
    children?: ReactNode, 
    actived: boolean, 
    style?: CSSProperties
};

const ViewCardItem = ({children, actived,  style} : Props) => {

    style = {
        position: 'absolute',
        top: '100%',
        left: 0,
        borderRadius: '0.375rem',
        border: '1px solid rgb(212, 212, 216)',
        transformOrigin: 'top left',
        overflow: 'hidden',
        ...style,
    }

    return (
        <div
            style={style}
        >
            {children}
        </div>
    )
}

export default ViewCardItem;