import { StyleSheet, Text, View } from 'react-native';
import MyStudies from './src/pages/StudyHomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainStackView from './src/navigators/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <MainStackView/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
