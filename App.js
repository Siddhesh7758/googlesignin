import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Login from './components/Login';

export default function App() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Login />
    </View>
  );
}

