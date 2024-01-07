import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackParamsType } from "../types/StackParamsType";
import { useState } from "react";
import { myStudies } from "../resources/ListStudies";

type Props = NativeStackScreenProps<StackParamsType, 'Home'>;

const MyStudies = ({navigation, route}: Props) => {

    const [studies, setStudies] = useState(myStudies);

    return (
        <View style={styles.container}>
            {studies.map((item, key) => (
                <View 
                    key={key}
                    style={styles.studiesContainer}
                    >
                    <Text
                        style={styles.studyTitle}
                    >{item.title}</Text>
                    <Button
                        title="Acessar"
                        onPress={() => navigation.navigate(item.nameRoot)}
                    />
                </View>
            ))
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    studiesContainer: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10
    },
    studyTitle: {
        marginBottom: 20,
        fontSize: 17,
    },
    studyButtom: {
        borderRadius: 10
    }
})

export default MyStudies;
