import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import Dashboard from '../screens/Dashboard'
import Routines from '../screens/Routines'
import Consumption from '../screens/AvgConsumption'
import { useTheme } from '@react-navigation/native'


const TabNavigator = createBottomTabNavigator()

export default function TabNavigation() {
    const {theme} = useTheme()
    return (
      <TabNavigator.Navigator screenOptions={{
        tabBarActiveTintColor: '#F2600C',
        tabBarInactiveTintColor: theme === 'light'? '#1B1A26' : '#F5F5F5',
        tabBarBadgeStyle: { backgroundColor: '#F2600C'} ,
        tabBarStyle: { backgroundColor: theme === 'light'? '#F5F5F5' :'#1B1A26' },
      }}>
        <TabNavigator.Screen name='Início' component={Dashboard} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <SimpleLineIcons name='home' size={size} color={color} />
        }} />
        <TabNavigator.Screen name='Rotinas' component={Routines} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <SimpleLineIcons name='globe' size={size} color={color} />
        }} />
        <TabNavigator.Screen name='Consumo' component={Consumption} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <SimpleLineIcons name='exclamation' size={size} color={color} />
        }} />
      </TabNavigator.Navigator>
    )
  }