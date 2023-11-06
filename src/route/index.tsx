import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail } from '../pages';

export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
}

const Stack = createNativeStackNavigator();

export function Route() {
  const Off = { headerShown: false }

  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={Off} />
      <Stack.Screen name='Detail' component={Detail} options={Off} />
    </Stack.Navigator>
  )
}