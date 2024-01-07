import { useNavigation } from "@react-navigation/native"
import { Button, StyleSheet, Text, View } from "react-native"
import { StackParamsType } from "../../types/StackParamsType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<StackParamsType, 'SafeAreaView'>;

const SafeAreaViewTest = ({navigation, route}: Props) => {

    const handleBack = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text>Olá mundo !!!!</Text>
            <Button title="Voltar" onPress={handleBack} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})

export default SafeAreaViewTest;