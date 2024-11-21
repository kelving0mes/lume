import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import Dashboard from '../screens/Dashboard'
import Routines from '../screens/Routines'
import Consumption from '../screens/AvgConsumption'
import { useTheme } from '../hooks/useTheme'

const TabNavigator = createBottomTabNavigator()

export default function TabNavigation() {
  const { theme } = useTheme()
  return (
    <TabNavigator.Navigator screenOptions={{
      tabBarActiveTintColor: '#00796B',
      tabBarInactiveTintColor: theme === 'light' ? '#121212' : '#F5F5F5',
      tabBarBadgeStyle: { backgroundColor: '#00796B' },
      tabBarStyle: { backgroundColor: theme === 'light' ? '#F5F5F5' : '#121212' },
    }}>
      <TabNavigator.Screen name='Início' component={Dashboard} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <SimpleLineIcons name='home' size={size} color={color} />
      }} />
      <TabNavigator.Screen name='Rotinas' component={Routines} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <SimpleLineIcons name='calendar' size={size} color={color} />
      }} />
      <TabNavigator.Screen name='Consumo' component={Consumption} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <SimpleLineIcons name='energy' size={size} color={color} />
      }} />
    </TabNavigator.Navigator>
  )
}