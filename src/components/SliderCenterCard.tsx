import { ReactNode, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, PointProp, ScrollView, StyleProp, TextStyle, View } from "react-native"

type Props = {
    style?: StyleProp<TextStyle>,
    children: ReactNode,
    marginItems: number
}

const SliderCard = ({style, children, marginItems} : Props) => {
    const refScrollView = useRef<any>();
    const [scrollPosition, setScrollPosition] = useState<PointProp>({x: 0, y: 0 });

    const screenWidth = Math.round(Dimensions.get('screen').width);
    const widthCard = screenWidth / 2;
    const WidthCardInvisible = widthCard / 2;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setScrollPosition({x: event.nativeEvent.contentOffset.x, y: 0});
    }

    const handleScrollEnd = () => {
        if (refScrollView.current)
        {
            const width = (widthCard + marginItems);
            const positionBlock = scrollPosition.x / width;
            refScrollView.current.scrollTo({x: (Math.round(positionBlock) * width), y: 0});
        }
    }

    return (
        <ScrollView  
            ref={refScrollView}
            style={style}
            onMomentumScrollEnd={handleScrollEnd}
            onScroll={handleScroll}
            horizontal={true}
        >
            <View 
                style={{width: WidthCardInvisible}}
            />
            {children}
            <View 
                style={{width: WidthCardInvisible}}
            />
        </ScrollView>
    )
}

export default SliderCard;