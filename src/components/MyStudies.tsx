import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackParamsType } from "../types/StackParamsType";

type Props = NativeStackScreenProps<StackParamsType, 'Home'>;

const MyStudies = ({navigation, route}: Props) => {

    return (
        <View style={styles.container}>
            <Button title="Acessar meu primeiro estudo" onPress={() => navigation.navigate('SafeAreaView')} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MyStudies;
