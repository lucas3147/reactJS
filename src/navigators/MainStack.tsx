import { createStackNavigator } from "@react-navigation/stack";
import SafeAreaViewTest from "../pages/studies/SafeAreaView";
import MyStudies from "../components/MyStudies";
import { StackParamsType } from "../types/StackParamsType";

const RootStack = createStackNavigator<StackParamsType>();

const MainStackView = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Home" component={MyStudies} options={{title: 'Meus estudos'}} />
            <RootStack.Screen name="SafeAreaView" component={SafeAreaViewTest} options={{title: 'Meu primeiro estudo'}} />
        </RootStack.Navigator>
    )
}

export default MainStackView;