import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, StyleSheet, Dimensions } from "react-native";
import { StackParamsType } from "../types/StackParamsType";
import { useState } from "react";
import { myStudies } from "../resources/ListStudies";
import { ViewBox, ViewHomeContainer, PressableDefault, ScrollViewDefault } from "../styles/style";
import SliderCard from "../components/SliderCenterCard";

type Props = NativeStackScreenProps<StackParamsType, 'Home'>;

const MyStudies = ({navigation, route}: Props) => {

    const [studies, setStudies] = useState([{
        title: 'Meu primeiro estudo',
        nameRoot: 'SafeAreaView'
    },
    {
        title: 'Estudo 02',
        nameRoot: 'Home'
    },
    {
        title: 'Estudo 03',
        nameRoot: 'Home'
    },
    {
        title: 'Estudo 04',
        nameRoot: 'Home'
    },
    {
        title: 'Estudo 05',
        nameRoot: 'Home'
    }
    ,
    {
        title: 'Estudo 06',
        nameRoot: 'Home'
    },
    {
        title: 'Estudo 07',
        nameRoot: 'Home'
    }
    ,
    {
        title: 'Estudo 08',
        nameRoot: 'Home'
    },
    {
        title: 'Estudo 09',
        nameRoot: 'Home'
    },
    {
        title: 'Estudo 10',
        nameRoot: 'Home'
    }]);
    

    const screenWidth = Math.round(Dimensions.get('screen').width);
    const widthCard = screenWidth / 2;

    return (
        <ViewHomeContainer>
            <SliderCard
                style={{ paddingVertical: 15 }}
                marginItems={20}
            >
                {studies.map((item, key) => (
                    <ViewBox
                        key={key}
                        style={{width: widthCard}}
                    >
                        <Text
                            style={styles.studyTitle}
                        >
                            {item.title}
                        </Text>
                        <PressableDefault
                            style={{ shadowColor: 'black', shadowOpacity: 0.5, elevation: 20 }}
                            onPress={() => navigation.navigate(item.nameRoot)}
                        >
                            <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 15 }}>Acessar</Text>
                        </PressableDefault>
                    </ViewBox>
                ))
                }
            </SliderCard>
        </ViewHomeContainer>
    )
}


const styles = StyleSheet.create({
    studyTitle: {
        marginBottom: 20,
        fontSize: 17
    },
    scrollView: {
        top: 250,
        height: 170
    }
})

export default MyStudies;
