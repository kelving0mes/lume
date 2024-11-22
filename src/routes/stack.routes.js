import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import NewDevice from '../screens/NewDevice'
import TabNavigation from './tabs.routes'
import NewRoutine from '../screens/NewRoutine'

const StackNavigator = createStackNavigator()

export default function StackNavigation() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <StackNavigator.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
      <StackNavigator.Screen name="NewDevice" component={NewDevice} options={{ title: 'Adicionar Dispositivo' }} />
      <StackNavigator.Screen name="NewRoutine" component={NewRoutine} options={{ title: 'Adicionar uma nova rotina' }} />
    </StackNavigator.Navigator>
  )
}