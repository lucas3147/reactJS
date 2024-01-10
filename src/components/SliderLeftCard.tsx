import { ReactNode, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, PointProp, ScrollView, StyleProp, TextStyle } from "react-native"

type Props = {
    style?: StyleProp<TextStyle>,
    children: ReactNode
}

const SliderCard = ({style, children} : Props) => {
    const refScrollView = useRef<any>();
    const [scrollPosition, setScrollPosition] = useState<PointProp>({x: 0, y: 0 });

    const screenWidth = Math.round(Dimensions.get('window').width);
    let thirdW = screenWidth / 2;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setScrollPosition({x: event.nativeEvent.contentOffset.x, y: 0});
    }

    const handleScrollEnd = () => {
        if (refScrollView.current)
        {
            const width = (thirdW + 20);
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
            centerContent={true}
            horizontal={true}>
            {children}
        </ScrollView>
    )
}

export default SliderCard;